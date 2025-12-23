# 🎮 Guia Prático - Criando um Player com Movimento

<p align="center">
  <a href="PLAYER_MOVEMENT_GUIDE.md">English</a> •
  <a href="PLAYER_MOVEMENT_GUIDE.pt-BR.md">Português (Brasil)</a>
</p>

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Pré-requisitos](#pré-requisitos)
3. [Método 1: Usando o Editor Visual](#método-1-usando-o-editor-visual)
4. [Método 2: Criando via Código](#método-2-criando-via-código)
5. [Tipos de Movimento Disponíveis](#tipos-de-movimento-disponíveis)
6. [Personalizando o Movimento](#personalizando-o-movimento)
7. [Exemplos Completos](#exemplos-completos)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral

Este guia ensina como criar um personagem jogável (player) e adicionar componentes de movimento no **Lumina Engine**. Você aprenderá:

- ✅ Como criar um player usando o editor visual
- ✅ Como adicionar componentes de movimento
- ✅ Diferentes tipos de movimento (plataforma, top-down, etc.)
- ✅ Como personalizar velocidade, pulo e física
- ✅ Como fazer a câmera seguir o player

---

## ✔️ Pré-requisitos

Antes de começar, certifique-se de que você tem:

1. **Lumina Engine** aberto no navegador
2. Um **sprite/imagem** para o seu player (recomendado: 32x32px ou 64x64px)
3. Conhecimento básico da interface do editor

---

## 🖱️ Método 1: Usando o Editor Visual

### **Passo 1: Adicionar um Asset (Sprite do Player)**

1. **Abra o Painel de Assets** (lado esquerdo inferior)
2. Clique em **"+ Adicionar Asset"**
3. **Upload** da imagem do seu player
4. Dê um nome ao asset (ex: `player_sprite`)
5. (Opcional) Configure animações se tiver sprite sheet

---

### **Passo 2: Criar a Entidade Player**

1. **Na toolbar** (topo), clique em **"+ Criar"**
2. Selecione **"Player"** no dropdown
3. Uma nova entidade será criada no canvas

**Ou use o atalho:**
- Clique com botão direito no canvas → **"Criar Entidade"** → **"Player"**

---

### **Passo 3: Adicionar o Sprite**

1. **Selecione a entidade Player** no canvas ou hierarquia
2. No **Painel de Propriedades** (direita), você verá os componentes
3. Se não houver um `SpriteComponent`:
   - Clique em **"+ Adicionar Componente"**
   - Selecione **"SpriteComponent"**
4. No `SpriteComponent`:
   - **Asset ID**: Selecione `player_sprite` (o asset que você criou)
   - **Largura/Altura**: Ajuste o tamanho (ex: 32x32)

---

### **Passo 4: Adicionar Componente de Colisão**

Para o player interagir com o mundo:

1. Com o player selecionado, clique **"+ Adicionar Componente"**
2. Selecione **"CollisionComponent"**
3. Configure:
   - **Largura**: 32 (mesmo que o sprite)
   - **Altura**: 32
   - **Is Solid**: ✅ (marcado)
   - **Offset X/Y**: 0, 0

---

### **Passo 5: Adicionar Movimento**

#### **Opção A: Movimento de Plataforma (Platform/Sidescroller)**

1. Clique **"+ Adicionar Componente"**
2. Selecione **"ScriptComponent"**
3. Em **"Script Name"**, escolha **"script_plataforma"**
4. Configure as propriedades:

```javascript
// Propriedades Disponíveis:
{
    velocidade: 200,          // Velocidade horizontal (px/s)
    forcaPulo: 400,           // Força do pulo (px/s)
    gravidade: 980,           // Gravidade (px/s²)
    aceleracaoAr: 0.8,        // Controle no ar (0-1)
    fricaoChao: 0.8,          // Atrito no chão (0-1)
    coyoteTime: 0.1,          // Tempo extra para pular após sair da borda (s)
    jumpBuffer: 0.1           // Buffer de input de pulo (s)
}
```

**Controles padrão:**
- **Setas Esquerda/Direita** ou **A/D**: Mover
- **Espaço** ou **Seta Cima** ou **W**: Pular

---

#### **Opção B: Movimento Top-Down (RPG/Roguelike)**

1. Clique **"+ Adicionar Componente"**
2. Selecione **"ScriptComponent"**
3. Em **"Script Name"**, escolha **"script_topdown"**
4. Configure:

```javascript
{
    velocidade: 150,          // Velocidade de movimento (px/s)
    diagonal: true,           // Permite movimento diagonal
    normalizarDiagonal: true  // Normaliza velocidade na diagonal
}
```

**Controles padrão:**
- **WASD** ou **Setas**: Mover em 4/8 direções

---

#### **Opção C: Movimento com Dash**

1. Escolha **"script_dash"**
2. Configure:

```javascript
{
    velocidade: 200,
    velocidadeDash: 500,      // Velocidade do dash
    duracaoDash: 0.2,         // Duração do dash (s)
    cooldownDash: 1.0         // Tempo de recarga (s)
}
```

**Controles:**
- **Shift** + **Direção**: Dash

---

### **Passo 6: Fazer a Câmera Seguir o Player**

Para a câmera acompanhar o player:

1. Com o player selecionado, adicione **"CameraFollowComponent"**
2. Configure:

```javascript
{
    suavizacao: 0.1,          // Suavidade do seguimento (0-1)
    offsetX: 0,               // Offset horizontal
    offsetY: -50              // Offset vertical (câmera um pouco acima)
}
```

---

### **Passo 7: Testar**

1. Clique em **"▶ Play"** na toolbar
2. Use as setas/WASD para mover
3. Espaço para pular (se plataforma)
4. **Ajuste** as propriedades em tempo real se necessário

---

## 💻 Método 2: Criando via Código

Se você preferir criar o player programaticamente:

### **Código Completo - Player de Plataforma**

```javascript
// Importar classes necessárias (se estiver em módulo)
import { Entidade } from './entidades/Entidade.js';
import { SpriteComponent } from './componentes/SpriteComponent.js';
import { CollisionComponent } from './componentes/CollisionComponent.js';
import { ScriptComponent } from './componentes/ScriptComponent.js';
import { CameraFollowComponent } from './componentes/CameraFollowComponent.js';

// 1. Criar a entidade player
const player = new Entidade('player');
player.nome = 'Player';
player.x = 100;      // Posição inicial X
player.y = 100;      // Posição inicial Y
player.largura = 32;
player.altura = 32;

// 2. Adicionar sprite
const spriteComp = new SpriteComponent();
spriteComp.assetId = 'player_sprite';  // ID do asset carregado
spriteComp.largura = 32;
spriteComp.altura = 32;
player.adicionarComponente('SpriteComponent', spriteComp);

// 3. Adicionar colisão
const collisionComp = new CollisionComponent();
collisionComp.largura = 32;
collisionComp.altura = 32;
collisionComp.isSolid = true;
player.adicionarComponente('CollisionComponent', collisionComp);

// 4. Adicionar movimento de plataforma
const scriptComp = new ScriptComponent();
scriptComp.scriptName = 'script_plataforma';
scriptComp.propriedades = {
    velocidade: 200,
    forcaPulo: 400,
    gravidade: 980,
    aceleracaoAr: 0.8,
    fricaoChao: 0.8
};
player.adicionarComponente('script_plataforma', scriptComp);

// 5. Adicionar camera follow
const cameraComp = new CameraFollowComponent();
cameraComp.suavizacao = 0.1;
cameraComp.offsetY = -50;
player.adicionarComponente('CameraFollowComponent', cameraComp);

// 6. Adicionar ao engine
engine.entidades.push(player);
```

---

### **Código Completo - Player Top-Down**

```javascript
const player = new Entidade('player');
player.nome = 'Player';
player.x = 200;
player.y = 200;
player.largura = 32;
player.altura = 32;

// Sprite
const sprite = new SpriteComponent();
sprite.assetId = 'player_sprite';
sprite.largura = 32;
sprite.altura = 32;
player.adicionarComponente('SpriteComponent', sprite);

// Colisão
const collision = new CollisionComponent();
collision.largura = 28;  // Ligeiramente menor para melhor feel
collision.altura = 28;
collision.offsetX = 2;
collision.offsetY = 2;
collision.isSolid = true;
player.adicionarComponente('CollisionComponent', collision);

// Movimento Top-Down
const movimento = new ScriptComponent();
movimento.scriptName = 'script_topdown';
movimento.propriedades = {
    velocidade: 150,
    diagonal: true,
    normalizarDiagonal: true
};
player.adicionarComponente('script_topdown', movimento);

// Camera
const camera = new CameraFollowComponent();
camera.suavizacao = 0.15;
player.adicionarComponente('CameraFollowComponent', camera);

engine.entidades.push(player);
```

---

## 🎮 Tipos de Movimento Disponíveis

### **1. script_plataforma**

**Ideal para**: Jogos de plataforma 2D, metroidvanias, sidescrollers

**Recursos**:
- ✅ Movimento horizontal suave
- ✅ Pulo com gravidade
- ✅ Coyote time (pular após sair da borda)
- ✅ Jump buffer (registra pulo antes de tocar o chão)
- ✅ Controle no ar variável
- ✅ Detecção de chão/parede

**Propriedades**:
```javascript
{
    velocidade: 200,          // Velocidade ao andar
    forcaPulo: 400,           // Altura do pulo
    gravidade: 980,           // Força da gravidade
    aceleracaoAr: 0.8,        // Controle no ar
    fricaoChao: 0.8,          // Desaceleração
    coyoteTime: 0.1,          // Tempo extra pós-queda
    jumpBuffer: 0.1,          // Buffer de input
    velocidadeMaxQueda: 500   // Velocidade terminal
}
```

---

### **2. script_topdown**

**Ideal para**: RPGs, roguelikes, zelda-likes, top-down shooters

**Recursos**:
- ✅ Movimento em 4 ou 8 direções
- ✅ Normalização diagonal opcional
- ✅ Sem gravidade
- ✅ Aceleração suave

**Propriedades**:
```javascript
{
    velocidade: 150,
    diagonal: true,           // Permite diagonal
    normalizarDiagonal: true, // Evita velocidade extra na diagonal
    aceleracao: 0.8,          // Aceleração (0-1)
    desaceleracao: 0.9        // Desaceleração (0-1)
}
```

---

### **3. script_dash**

**Ideal para**: Jogos que requerem mecânica de dash/dodge

**Recursos**:
- ✅ Todas as features do movimento base
- ✅ Dash rápido em qualquer direção
- ✅ Cooldown configurável
- ✅ Invulnerabilidade durante dash (opcional)

**Propriedades**:
```javascript
{
    velocidade: 200,
    velocidadeDash: 500,
    duracaoDash: 0.2,
    cooldownDash: 1.0,
    invulneravelDash: true    // Invulnerável durante dash
}
```

---

### **4. script_corrida**

**Ideal para**: Jogos com mecânica de corrida/sprint

**Recursos**:
- ✅ Velocidade normal e corrida
- ✅ Stamina opcional
- ✅ Transição suave

**Propriedades**:
```javascript
{
    velocidade: 150,
    velocidadeCorrida: 250,
    usaStamina: true,
    staminaMax: 100,
    gastoStaminaPorSegundo: 20,
    recuperacaoStamina: 10
}
```

---

## 🎨 Personalizando o Movimento

### **Ajustando a Sensibilidade**

Para movimento mais responsivo:
```javascript
{
    fricaoChao: 0.95,  // Mais alto = para mais rápido
    aceleracaoAr: 0.9  // Mais alto = mais controle no ar
}
```

Para movimento mais "pesado":
```javascript
{
    fricaoChao: 0.7,   // Mais baixo = desliza mais
    aceleracaoAr: 0.5  // Mais baixo = menos controle no ar
}
```

---

### **Ajustando o Pulo**

Pulo alto e flutuante (estilo Mario):
```javascript
{
    forcaPulo: 500,
    gravidade: 800,
    velocidadeMaxQueda: 400
}
```

Pulo baixo e pesado (estilo Mega Man):
```javascript
{
    forcaPulo: 350,
    gravidade: 1200,
    velocidadeMaxQueda: 600
}
```

---

### **Movimento Diagonal Suave**

Para top-down, se quiser movimento mais fluido:
```javascript
{
    diagonal: true,
    normalizarDiagonal: true,
    aceleracao: 0.85,
    desaceleracao: 0.92
}
```

---

## 📝 Exemplos Completos

### **Exemplo 1: Plataforma Clássico (Estilo Mario)**

```javascript
const player = new Entidade('player');
player.x = 100;
player.y = 100;

// Sprite (32x32 Mario-like)
const sprite = new SpriteComponent();
sprite.assetId = 'mario_sprite';
player.adicionarComponente('SpriteComponent', sprite);

// Colisão
const collision = new CollisionComponent();
collision.largura = 32;
collision.altura = 32;
collision.isSolid = true;
player.adicionarComponente('CollisionComponent', collision);

// Movimento - Configuração estilo Mario
const movimento = new ScriptComponent();
movimento.scriptName = 'script_plataforma';
movimento.propriedades = {
    velocidade: 180,
    forcaPulo: 450,
    gravidade: 900,
    aceleracaoAr: 0.7,
    fricaoChao: 0.85,
    coyoteTime: 0.1,
    jumpBuffer: 0.15
};
player.adicionarComponente('script_plataforma', movimento);

// Camera
const camera = new CameraFollowComponent();
camera.suavizacao = 0.12;
camera.offsetY = -30;
player.adicionarComponente('CameraFollowComponent', camera);

engine.entidades.push(player);
```

---

### **Exemplo 2: RPG Top-Down (Estilo Zelda)**

```javascript
const player = new Entidade('player');
player.x = 300;
player.y = 300;

// Sprite
const sprite = new SpriteComponent();
sprite.assetId = 'link_sprite';
sprite.animacaoAtual = 'idle_down';
player.adicionarComponente('SpriteComponent', sprite);

// Colisão (menor que sprite para melhor feel)
const collision = new CollisionComponent();
collision.largura = 24;
collision.altura = 24;
collision.offsetX = 4;
collision.offsetY = 8;
collision.isSolid = true;
player.adicionarComponente('CollisionComponent', collision);

// Movimento Top-Down
const movimento = new ScriptComponent();
movimento.scriptName = 'script_topdown';
movimento.propriedades = {
    velocidade: 140,
    diagonal: true,
    normalizarDiagonal: true,
    aceleracao: 0.9,
    desaceleracao: 0.92
};
player.adicionarComponente('script_topdown', movimento);

// Camera
const camera = new CameraFollowComponent();
camera.suavizacao = 0.08;  // Mais responsiva para top-down
player.adicionarComponente('CameraFollowComponent', camera);

engine.entidades.push(player);
```

---

### **Exemplo 3: Metroidvania com Dash**

```javascript
const player = new Entidade('player');
player.x = 150;
player.y = 150;

// Sprite
const sprite = new SpriteComponent();
sprite.assetId = 'samus_sprite';
player.adicionarComponente('SpriteComponent', sprite);

// Colisão
const collision = new CollisionComponent();
collision.largura = 28;
collision.altura = 40;
collision.isSolid = true;
player.adicionarComponente('CollisionComponent', collision);

// Movimento com Dash
const movimento = new ScriptComponent();
movimento.scriptName = 'script_dash';
movimento.propriedades = {
    velocidade: 200,
    forcaPulo: 380,
    gravidade: 1000,
    aceleracaoAr: 0.85,
    fricaoChao: 0.8,
    // Dash específico
    velocidadeDash: 600,
    duracaoDash: 0.18,
    cooldownDash: 0.8,
    invulneravelDash: true
};
player.adicionarComponente('script_dash', movimento);

// Camera com offset
const camera = new CameraFollowComponent();
camera.suavizacao = 0.1;
camera.offsetY = -60;
player.adicionarComponente('CameraFollowComponent', camera);

engine.entidades.push(player);
```

---

## 🐛 Troubleshooting

### **Problema: Player não se move**

**Soluções**:
1. ✅ Verifique se adicionou `ScriptComponent` com script de movimento
2. ✅ Confirme que o script está ativo (`player.ativo = true`)
3. ✅ No console (F12), veja se há erros
4. ✅ Verifique se está em modo **Play** (▶)

---

### **Problema: Player cai através do chão**

**Soluções**:
1. ✅ O chão tem `CollisionComponent`?
2. ✅ O chão tem `isSolid = true`?
3. ✅ O player tem `CollisionComponent`?
4. ✅ Verifique se o sistema de colisão está ativo

---

### **Problema: Pulo não funciona**

**Soluções**:
1. ✅ Está usando `script_plataforma`?
2. ✅ `forcaPulo` é maior que `gravidade`?
3. ✅ Player está tocando o chão?
4. ✅ Tecla de pulo correta (Space/W/Seta Cima)?

---

### **Problema: Movimento muito lento/rápido**

**Soluções**:
```javascript
// Ajuste a velocidade:
movimento.propriedades.velocidade = 250; // Mais rápido
movimento.propriedades.velocidade = 100; // Mais lento
```

---

### **Problema: Camera não segue**

**Soluções**:
1. ✅ `CameraFollowComponent` adicionado?
2. ✅ `suavizacao` não é 0 (use 0.1-0.2)
3. ✅ Camera do engine está ativa?

---

## 📚 Próximos Passos

Agora que você criou seu player, aprenda:

- **[Animações](03_animacoes.md)** - Animar o player (idle, walk, jump)
- **[Partículas](PARTICLE_SYSTEM.md)** - Adicionar efeitos (poeira ao correr)
- **[Combate](COMBAT_SYSTEM.md)** - Implementar ataque e dano
- **[Inimigos](ENEMY_AI.md)** - Criar inimigos que seguem o player

---

**Criado**: Dezembro 2025  
**Versão**: 2.0  
**Engine**: Lumina Engine  

🎮 **Boa sorte criando seu jogo!**
