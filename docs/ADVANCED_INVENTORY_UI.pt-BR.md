# Sistema de Inventário Avançado

Este documento detalha as novas funcionalidades do **Sistema de Inventário Avançado** implementado no Engine, acessível através do componente `UIComponent`.

O sistema foi atualizado para suportar layout flexível (Grid) e estilização de bordas de alta qualidade (9-Slice/8-Parts).

## 🚀 Funcionalidades Principais

1.  **Grade Customizável**: Defina livremente o número de linhas e colunas (ex: 5x4, 10x2).
2.  **Sistema 9-Slice (Bordas)**: Monte molduras complexas usando partes separadas (TopLeft, Top, TopRight, etc.), permitindo janelas de inventário com visual profissional retro/pixel-art.
3.  **Escala Global**: Ajuste o tamanho de todos os slots e textos com um único fator de escala.
4.  **Integração com Editor**: Todas as propriedades são configuráveis visualmente no painel do editor.

---

## 🛠️ Configuração no Editor

Para configurar o inventário avançado:

1.  Selecione a entidade que possui o **UIComponent**.
2.  No Painel de Propriedades, localize a seção **UI / HUD**.
3.  Abra o detalhe **🎨 Inventário Avançado**.

### Campos Disponíveis

| Propriedade | Descrição | Padrão |
| :--- | :--- | :--- |
| **Escala** | Fator de multiplicação de tamanho. Aumente para inventários maiores (UI Scaling). | `1.0` |
| **Colunas** | Quantidade de slots na horizontal. | `5` |
| **Linhas** | Quantidade de slots na vertical. | `4` |

### Configuração de Bordas (9-Slice)

O sistema permite selecionar **8 imagens individuais** para compor a moldura do inventário. Isso oferece flexibilidade total para pixel-art.

*   **Cantos**: `TopLeft`, `TopRight`, `BottomLeft`, `BottomRight`
*   **Lados**: `Top`, `Left`, `Right`, `Bottom` (Estas imagens são esticadas/repetidas para preencher o espaço).
*   **Centro**: Preenchido com a cor de fundo definida ou transparente se não houver asset.

> **Dica**: Você pode usar apenas bordas (ex: moldura de ouro) e deixar o fundo transparente para ver o jogo atrás.

---

## 💻 Referência Técnica (Scripting)

Se você preferir configurar via código (JavaScript), as propriedades estão disponíveis na instância do `UIComponent`:

```javascript
const ui = entidade.obterComponente('UIComponent');

// Configuração do Grid
ui.inventoryCols = 8;
ui.inventoryRows = 3;
ui.inventoryScale = 1.5;

// Configuração de Assets de Borda (IDs dos Assets)
ui.borderTopLeft = 'img_border_tl';
ui.borderTop = 'img_border_t';
ui.borderTopRight = 'img_border_tr';
ui.borderLeft = 'img_border_l';
// ... etc

// Imagens dos Slots
ui.imagemSlot = 'img_slot_vazio_bg';
ui.imagemSlotCheio = 'img_slot_highlight';
```

## 📐 Lógica de Renderização

O renderizador calcula o tamanho total da janela baseado em:

```javascript
LarguraTotal = (Colunas * TamanhoSlot) + ((Colunas - 1) * Espaçamento) + (Padding * 2)
```

O sistema desenha primeiro o **Background** (9-Slice), depois os **Slots Vazios**, depois os **Itens** e por fim a **Quantidade** e **Overlay de Seleção**.
