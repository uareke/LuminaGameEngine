import translations from './translations.js';

/**
 * LanguageManager - Gerenciador de Idiomas
 * Gerencia traduções e preferências de idioma com localStorage
 */
class LanguageManager {
    constructor() {
        // Idioma padrão
        this.defaultLanguage = 'pt-BR';

        // Idioma atual (carrega do localStorage ou usa padrão)
        this.currentLanguage = this.loadLanguagePreference() || this.defaultLanguage;

        // Traduções disponíveis
        this.translations = translations;

        // Idiomas suportados
        this.supportedLanguages = {
            'pt-BR': {
                name: 'Português',
                nativeName: 'Português (Brasil)',
                flag: '🇧🇷'
            },
            'en': {
                name: 'English',
                nativeName: 'English',
                flag: '🇺🇸'
            }
        };

        // Callbacks para mudança de idioma
        this.onLanguageChangeCallbacks = [];

        console.log(`[i18n] Idioma atual: ${this.currentLanguage}`);
    }

    /**
     * Carrega preferência de idioma do localStorage
     */
    loadLanguagePreference() {
        try {
            const saved = localStorage.getItem('luminaEngine_language');
            if (saved && this.translations[saved]) {
                console.log(`[i18n] Idioma carregado do localStorage: ${saved}`);
                return saved;
            }
        } catch (e) {
            console.warn('[i18n] Erro ao carregar idioma do localStorage:', e);
        }
        return null;
    }

    /**
     * Salva preferência de idioma no localStorage
     */
    saveLanguagePreference(lang) {
        try {
            localStorage.setItem('luminaEngine_language', lang);
            console.log(`[i18n] Idioma salvo no localStorage: ${lang}`);
        } catch (e) {
            console.warn('[i18n] Erro ao salvar idioma no localStorage:', e);
        }
    }

    /**
     * Define o idioma atual
     */
    setLanguage(lang) {
        if (!this.translations[lang]) {
            console.warn(`[i18n] Idioma não suportado: ${lang}`);
            return false;
        }

        const oldLang = this.currentLanguage;
        this.currentLanguage = lang;
        this.saveLanguagePreference(lang);

        console.log(`[i18n] Idioma alterado: ${oldLang} → ${lang}`);

        // Notifica callbacks
        this.onLanguageChangeCallbacks.forEach(callback => {
            try {
                callback(lang, oldLang);
            } catch (e) {
                console.error('[i18n] Erro no callback de mudança de idioma:', e);
            }
        });

        return true;
    }

    /**
     * Obtém o idioma atual
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    /**
     * Traduz uma chave
     */
    t(key, defaultValue = null) {
        const translation = this.translations[this.currentLanguage]?.[key];

        if (translation) {
            return translation;
        }

        // Fallback para idioma padrão
        const fallback = this.translations[this.defaultLanguage]?.[key];
        if (fallback) {
            console.warn(`[i18n] Translation missing for '${key}' in ${this.currentLanguage}, using default`);
            return fallback;
        }

        // Se não encontrou tradução, retorna a chave ou valor padrão
        console.warn(`[i18n] Translation missing: '${key}'`);
        return defaultValue || key;
    }

    /**
     * Traduz com substituição de variáveis
     * Exemplo: t('msg.welcome', { name: 'João' }) -> "Bem-vindo, João!"
     */
    tVar(key, vars = {}, defaultValue = null) {
        let text = this.t(key, defaultValue);

        // Substitui variáveis no formato {{variavel}}
        Object.keys(vars).forEach(varName => {
            const regex = new RegExp(`{{\\s*${varName}\\s*}}`, 'g');
            text = text.replace(regex, vars[varName]);
        });

        return text;
    }

    /**
     * Retorna lista de idiomas suportados
     */
    getSupportedLanguages() {
        return this.supportedLanguages;
    }

    /**
     * Verifica se um idioma é suportado
     */
    isSupported(lang) {
        return !!this.translations[lang];
    }

    /**
     * Registra callback para mudança de idioma
     */
    onLanguageChange(callback) {
        this.onLanguageChangeCallbacks.push(callback);
    }

    /**
     * Remove callback
     */
    offLanguageChange(callback) {
        const index = this.onLanguageChangeCallbacks.indexOf(callback);
        if (index > -1) {
            this.onLanguageChangeCallbacks.splice(index, 1);
        }
    }

    /**
     * Atualiza todos os elementos com atributo data-i18n
     */
    updateDOM() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);

            // Atualiza texto ou placeholder
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                } else {
                    element.value = translation;
                }
            } else {
                element.textContent = translation;
            }
        });

        console.log('[i18n] DOM atualizado com traduções');
    }
}

// Exporta instância singleton
const i18n = new LanguageManager();
export default i18n;
