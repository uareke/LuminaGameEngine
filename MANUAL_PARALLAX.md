# Manual: Sistema de Parallax (Background Infinito)

O **Lumina Engine** possui um sistema robusto de Parallax para criar cenários de fundo com profundidade e movimento. Este guia explica como configurar fundos estáticos, céus infinitos e cenários multi-camada.

## 1. O que é Parallax?
Parallax é o efeito onde objetos ao fundo se movem mais devagar que os objetos da frente, criando uma ilusão de profundidade 3D em um jogo 2D.

---

## 2. Passo a Passo: Criando um Background

### Passo 1: Importar as Imagens
Antes de tudo, importe suas imagens de fundo no painel "Recursos" (Canto inferior esquerdo).
1. Clique em **Recursos**.
2. Clique no botão **"Novo Tileset"** (ou use uma imagem normal).
3. Selecione sua imagem de fundo (ex: `sky.png`, `mountains.png`).
   * *Dica: Para fundos que se repetem, certifique-se de que a imagem seja "tileable" (borda esquerda combina com a direita).*

### Passo 2: Criar a Entidade de Parallax
O Parallax não é aplicado na câmera, mas sim em uma **Entidade** especial na cena.
1. No menu superior, clique em **Entidades -> Nova Entidade**.
2. Renomeie a entidade para `BACKGROUND` ou `CÉU`.
3. Defina a posição `X` e `Y` como `0` (apenas para organização, o parallax ignora a posição da entidade).
4. **Importante:** Defina a **Ordem (Z)** para **Fundo** (valores negativos, ex: `-10` ou use o botão "Fundo"). Isso garante que o cenário fique atrás do jogador.

### Passo 3: Adicionar o Componente
1. Com a entidade selecionada, vá no Painel de Propriedades (Direita).
2. Clique em **"+ Adicionar Componente"**.
3. Escolha **"Visual > Parallax Background"**.

---

## 3. Configurando as Camadas (Layers)

O componente Parallax funciona com "Layers". Você pode ter várias imagens em um único componente.

### Adicionando uma Layer
1. No painel do componente Parallax, clique em **"+ Add Layer"**.
2. Uma nova caixa "Layer 1" aparecerá.
3. No dropdown **Asset**, selecione a imagem que você importou.

### Propriedades da Layer

| Propriedade | Descrição | Valor Recomendado |
| :--- | :--- | :--- |
| **Speed X** | Velocidade horizontal em relação à câmera. | `0.0` (Fixo no céu), `0.1` (Montanhas longe), `0.5` (Árvores perto). |
| **Speed Y** | Velocidade vertical. | Geralmente `0` ou valores baixos (`0.1`) para acompanhar pulos. |
| **Scale** | Tamanho da imagem. | `1.0` (Original). Aumente se a imagem for pequena. |
| **Y Offset** | Ajuste vertical manual. | Use para subir ou descer o horizonte. |
| **Opacity** | Transparência. | `1.0` (Visível), `0.5` (Semi-transparente). |

### Modos de Ajuste (Fit Modes)
Existem checkboxes especiais para controlar como a imagem preenche a tela:

*   **Fit Screen (Esticar):** Estica a imagem para cobrir a tela inteira. Bom para degradês simples ou céus estáticos que não devem se mover.
*   **Fit Height:** Ajusta a imagem para ter a mesma altura da tela, mantendo a proporção.
*   **Fit Cover:** (Recomendado para BG) Aumenta a imagem proporcionalmente até cobrir toda a tela, cortando excessos.
*   **Repeat X:** (Padrão: Ligado) Faz a imagem se repetir infinitamente na horizontal. Desligue se for um objeto único (ex: Lua/Sol).

---

## 4. Exemplo Prático: Cenário Completo

Para um cenário rico, adicione **múltiplas layers** na mesma entidade, na seguinte ordem (de cima para baixo no editor):

1.  **Layer 1 (Céu):** 
    *   Imagem: `sky.png`
    *   Speed X: `0.0` (Fixo)
    *   Fit Cover: ✅
2.  **Layer 2 (Nuvens):** 
    *   Imagem: `clouds.png`
    *   Speed X: `0.05` (Moooveeeem muito devagar)
    *   Opacity: `0.8`
3.  **Layer 3 (Montanhas Distantes):**
    *   Imagem: `mountains_far.png`
    *   Speed X: `0.1` 
    *   Y Offset: `100` (Para ficarem na linha do horizonte)
4.  **Layer 4 (Montanhas Perto/Árvores):**
    *   Imagem: `trees_bg.png`
    *   Speed X: `0.3`

---

## 5. Dicas de Solução de Problemas

*   **Minha imagem não aparece!**
    *   Verifique se o `Asset` está selecionado corretamente.
    *   Verifique se a `Opacity` está em 1.
    *   Verique se a entidade não está com `Z-Index` na frente de objetos bloqueadores.

*   **O fundo "acabou" e ficou preto.**
    *   Certifique-se de que **Repeat X** está marcado.

*   **A imagem está pixelada/borrada.**
    *   O engine tenta usar "Pixel Perfect" por padrão combinando com o zoom da câmera. Se a imagem for muito pequena e você der muito zoom, vai pixelar (estilo retrô). Isso é normal.
