import i18n from './LanguageManager.js';

/**
 * LanguageSelector - Componente visual para seleção de idioma
 * Cria um dropdown na interface para trocar o idioma
 */
class LanguageSelector {
    constructor(containerSelector = '#language-selector-container') {
        this.container = document.querySelector(containerSelector);
        if (!this.container) {
            console.error('[LanguageSelector] Container not found:', containerSelector);
            return;
        }

        this.render();
        this.attachEvents();

        // Atualiza quando idioma mudar externamente
        i18n.onLanguageChange(() => {
            this.updateSelection();
        });
    }

    /**
     * Renderiza o seletor
     */
    render() {
        const languages = i18n.getSupportedLanguages();
        const currentLang = i18n.getCurrentLanguage();

        const html = `
            <div class="language-selector">
                <select id="language-select" class="language-select">
                    ${Object.keys(languages).map(langCode => `
                        <option value="${langCode}" ${langCode === currentLang ? 'selected' : ''}>
                            ${languages[langCode].flag} ${languages[langCode].nativeName}
                        </option>
                    `).join('')}
                </select>
            </div>
        `;

        this.container.innerHTML = html;
        this.selectElement = this.container.querySelector('#language-select');
    }

    /**
     * Adiciona eventos
     */
    attachEvents() {
        if (!this.selectElement) return;

        this.selectElement.addEventListener('change', (e) => {
            const newLang = e.target.value;
            this.changeLanguage(newLang);
        });
    }

    /**
     * Muda o idioma
     */
    changeLanguage(lang) {
        if (i18n.setLanguage(lang)) {
            // Atualiza toda a interface
            i18n.updateDOM();

            // Dispara evento customizado para o editor reagir
            window.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language: lang }
            }));

            console.log(`[LanguageSelector] Idioma alterado para: ${lang}`);
        }
    }

    /**
     * Atualiza a seleção visual
     */
    updateSelection() {
        if (!this.selectElement) return;
        this.selectElement.value = i18n.getCurrentLanguage();
    }
}

export default LanguageSelector;
