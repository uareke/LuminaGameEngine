const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'documentation', 'manual_hud_editor.md');
console.log('Appending to:', targetFile);

const newContent = `

## 📊 Variáveis Disponíveis (StatsRPG)

O sistema de HUD (\`UIComponent\`) pode ler automaticamente qualquer variável definida no script **StatsRPG** (ou no próprio player).

Aqui está a lista completa que você pode usar nas barras ou textos:

| Variável | Descrição |
| :--- | :--- |
| **\`hp\`** | Vida Atual |
| **\`hpMax\`** | Vida Máxima |
| **\`mana\`** | Mana Atual |
| **\`manaMax\`** | Mana Máxima |
| **\`xp\`** | XP Atual |
| **\`xpProximo\`** | XP necessário para o próximo nível (Ex: 100, 250...) |
| **\`level\`** | Nível Atual (1, 2, 3...) |
| **\`forca\`** | Atributo de Força |
| **\`defesa\`** | Atributo de Defesa |

**Exemplo Prático (Barra de XP):**
- **Alvo:** \`xp\`
- **Alvo Max:** \`xpProximo\`
- **Cor:** \`#00ff00\` (Verde) ou Roxo

**Exemplo Texto:**
- "Nível: {val}" (ligado a \`level\`)

Qualquer sistema novo que você criar (ex: \`stamina\`) também vai aparecer aqui automaticamente se você definir \`this.entidade.stamina = 100\` no código.
`;

try {
    fs.appendFileSync(targetFile, newContent, 'utf8');
    console.log('Documentation updated successfully!');
} catch (e) {
    console.error('Error updating file:', e);
}
