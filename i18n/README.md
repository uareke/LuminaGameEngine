# 🌍 Sistema de Internacionalização (i18n)

Sistema completo de tradução para a Lumina Engine com suporte a múltiplos idiomas e persistência em localStorage.

---

## 📚 Idiomas Suportados

- 🇧🇷 **Português (Brasil)** - `pt-BR`
- 🇺🇸 **English** - `en`

---

## 🚀 Como Usar

### 1. Importar o LanguageManager

```javascript
import i18n from './i18n/LanguageManager.js';
```

### 2. Usar Traduções no Código

```javascript
// Tradução simples
const text = i18n.t('menu.file'); // "Arquivo" ou "File"

// Com valor padrão
const text = i18n.t('key.inexistente', 'Valor Padrão');

// Com variáveis
const msg = i18n.tVar('msg.welcome', { name: 'João' });
```

### 3. Usar Traduções no HTML

```html
<!-- data-i18n é automaticamente traduzido -->
<button data-i18n="btn.save">Salvar</button>
<input data-i18n="other.search" placeholder="Buscar...">
```

### 4. Adicionar Seletor de Idioma

```html
<!-- No seu HTML -->
<div id="language-selector-container"></div>
```

```javascript
// No seu JavaScript
import LanguageSelector from './i18n/LanguageSelector.js';
new LanguageSelector('#language-selector-container');
```

---

## 🔧 API do LanguageManager

### Métodos Principais

| Método | Descrição | Exemplo |
|--------|-----------|---------|
| `t(key, default)` | Traduz uma chave | `i18n.t('menu.file')` |
| `tVar(key, vars, default)` | Traduz com variáveis | `i18n.tVar('msg.welcome', {name: 'João'})` |
| `setLanguage(lang)` | Define idioma | `i18n.setLanguage('en')` |
| `getCurrentLanguage()` | Obtém idioma atual | `i18n.getCurrentLanguage()` |
| `updateDOM()` | Atualiza elementos `[data-i18n]` | `i18n.updateDOM()` |
| `onLanguageChange(callback)` | Registra callback | `i18n.onLanguageChange((lang) => {...})` |

---

## 📝 Adicionar Novas Traduções

### 1. Editar `translations.js`

```javascript
const translations = {
    'pt-BR': {
        'nova.chave': 'Novo Texto em Português',
        // ...
    },
    'en': {
        'nova.chave': 'New Text in English',
        // ...
    }
};
```

### 2. Nomenclatura de Chaves

Use o padrão hierárquico com pontos:

```javascript
'menu.file'           // Menu > Arquivo
'component.sprite'    // Componente > Sprite
'btn.save'           // Botão > Salvar
'msg.error'          // Mensagem > Erro
```

---

## 🎯 Integração com o Editor

### No `index.html`

```html
<!-- 1. Importar CSS -->
<link rel="stylesheet" href="i18n/language-selector.css">

<!-- 2. Adicionar container -->
<div class="toolbar">
    <div id="language-selector-container"></div>
</div>
```

### No `EditorPrincipal.js`

```javascript
import i18n from './i18n/LanguageManager.js';
import LanguageSelector from './i18n/LanguageSelector.js';

class EditorPrincipal {
    constructor() {
        // Inicializa seletor de idioma
        new LanguageSelector('#language-selector-container');
        
        // Registra callback para atualizar UI
        i18n.onLanguageChange((newLang) => {
            this.atualizarInterface();
        });
        
        // Atualiza DOM inicial
        i18n.updateDOM();
    }
    
    atualizarInterface() {
        // Atualiza elementos traduzidos
        i18n.updateDOM();
        
        // Atualiza painéis específicos
        this.atualizarPainelPropriedades();
        this.atualizarHierarquia();
    }
}
```

---

## 🔄 Fluxo de Tradução

```
1. Usuário seleciona idioma no dropdown
   ↓
2. LanguageManager.setLanguage(lang)
   ↓
3. Salva no localStorage ('luminaEngine_language')
   ↓
4. Dispara callbacks onLanguageChange
   ↓
5. updateDOM() atualiza elementos [data-i18n]
   ↓
6. Editor recarrega painéis com i18n.t()
```

---

## 💾 Persistência no localStorage

```javascript
// Chave no localStorage
'luminaEngine_language' = 'pt-BR' | 'en'

// Exemplo de uso direto
localStorage.getItem('luminaEngine_language');  // 'pt-BR'
localStorage.setItem('luminaEngine_language', 'en');
```

---

## 📦 Estrutura de Arquivos

```
i18n/
├── translations.js          # Todas as traduções
├── LanguageManager.js       # Gerenciador principal
├── LanguageSelector.js      # Componente UI
├── language-selector.css    # Estilos
└── README.md               # Esta documentação
```

---

## 🎨 Exemplo Completo

```javascript
// 1. Importar
import i18n from './i18n/LanguageManager.js';

// 2. Usar no código
console.log(i18n.t('menu.file'));  // "Arquivo" (se pt-BR)

// 3. Trocar idioma
i18n.setLanguage('en');
console.log(i18n.t('menu.file'));  // "File"

// 4. HTML automático
// <button data-i18n="btn.save">Salvar</button>
// Vira: <button>Save</button> (em inglês)
```

---

## 🌐 Adicionar Novo Idioma

### 1. Adicionar ao `translations.js`

```javascript
const translations = {
    'pt-BR': { /* ... */ },
    'en': { /* ... */ },
    'es': {  // Novo idioma: Espanhol
        'menu.file': 'Archivo',
        'btn.save': 'Guardar',
        // ...
    }
};
```

### 2. Adicionar ao `LanguageManager.js`

```javascript
this.supportedLanguages = {
    'pt-BR': { name: 'Português', nativeName: 'Português (Brasil)', flag: '🇧🇷' },
    'en': { name: 'English', nativeName: 'English', flag: '🇺🇸' },
    'es': { name: 'Español', nativeName: 'Español', flag: '🇪🇸' }  // Novo
};
```

---

## 🐛 Debugging

### Ver idioma atual

```javascript
console.log(i18n.getCurrentLanguage());
```

### Ver tradução específica

```javascript
console.log(i18n.t('menu.file'));
```

### Ver todas traduções do idioma atual

```javascript
console.log(i18n.translations[i18n.getCurrentLanguage()]);
```

---

## ✅ Checklist de Integração

- [ ] Importar `LanguageManager.js` no editor
- [ ] Importar `LanguageSelector.js` e criar instância
- [ ] Adicionar CSS `language-selector.css` ao `index.html`
- [ ] Adicionar container `#language-selector-container` na toolbar
- [ ] Substituir strings hardcoded por `i18n.t()`
- [ ] Adicionar `data-i18n` em elementos HTML fixos
- [ ] Testar mudança de idioma
- [ ] Verificar persistência no localStorage

---

<div align="center">

**Made with ❤️ by Lumina Engine**

🌍 Suporte completo a internacionalização

</div>
