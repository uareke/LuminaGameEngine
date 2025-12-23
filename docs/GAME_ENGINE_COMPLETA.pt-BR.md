# ✨ Documentação Completa - Lumina Engine

> **Versão**: 2.0  
> **Data**: Dezembro 2025  
> **Autor**: Alex Sandro Martins de Araujo  
> **Tipo**: Motor de Jogo 2D com Editor Visual

<p align="center">
  <a href="GAME_ENGINE_COMPLETE.md">English</a> •
  <a href="GAME_ENGINE_COMPLETA.pt-BR.md">Português (Brasil)</a>
</p>

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Editor Visual](#editor-visual)
4. [Sistema de Entidades e Componentes](#sistema-de-entidades-e-componentes)
5. [Componentes Disponíveis](#componentes-disponíveis)
6. [Sistemas da Engine](#sistemas-da-engine)
7. [Gerenciamento de Assets](#gerenciamento-de-assets)
8. [Sistema de Partículas](#sistema-de-partículas)
9. [Sistema de Iluminação](#sistema-de-iluminação)
10. [Sistema de Scripting](#sistema-de-scripting)
11. [Física e Colisões](#física-e-colisões)
12. [Animações](#animações)
13. [Tilemap System](#tilemap-system)
14. [Workflow de Desenvolvimento](#workflow-de-desenvolvimento)
15. [API Reference](#api-reference)
16. [Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral

### O que é?

A **Lumina Engine** é um motor de jogo 2D completo desenvolvido em JavaScript puro, com foco em:

- **Editor Visual WYSIWYG** (What You See Is What You Get)
- **Arquitetura ECS** (Entity-Component-System)
- **Sistema de Estados** para gerenciamento de movimentação
- **Editor de Animações** visual e interativo
- **Sistema de Partículas** com templates reutilizáveis
- **Sistema de Iluminação** 2D com sombras dinâmicas
- **Tilemap Editor** integrado
- **Sistema de Scripts** customizável

### Características Principais

✅ **100% JavaScript** - Sem dependências externas  
✅ **Editor Visual Completo** - Crie jogos sem programar  
✅ **Hot Reload** - Veja mudanças em tempo real  
✅ **Componentes Modulares** - Sistema flexível e extensível  
✅ **Exportação de Projetos** - Salve e carregue projetos em JSON  
✅ **Sistema de Assets** - Gerencie sprites, animações e sons  
✅ **Física 2D** - Colisões, gravidade e plataformas  
✅ **Scripts Customizados** - Estenda funcionalidades via código  

### Casos de Uso

- Jogos de plataforma 2D
- Jogos top-down (RPG, roguelike)
- Jogos de puzzle
- Prototipagem rápida
- Projetos educacionais
- Game jams

---

## 🏗️ Arquitetura

### Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                    EDITOR VISUAL                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │  Hierarquia │  │   Canvas    │  │ Propriedades│    │
│  │   (Tree)    │  │   Editor    │  │   (Panel)   │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    GAME ENGINE                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Loop de Jogo                        │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐      │  │
│  │  │  Update  │→ │ Physics  │→ │  Render  │      │  │
│  │  └──────────┘  └──────────┘  └──────────┘      │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Sistema de Entidades (ECS)               │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐         │  │
│  │  │ Entity  │→ │Component│→ │ System  │         │  │
│  │  └─────────┘  └─────────┘  └─────────┘         │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  SISTEMAS AUXILIARES                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │  Assets  │ │Collision │ │Particles │ │ Lighting │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Estrutura de Diretórios

```
lumina-engine/
├── index.html              # Página principal do editor
├── main.js                 # Ponto de entrada
├── css/
│   └── editor.css         # Estilos do editor
├── engine/                # Core da engine
│   ├── Engine.js          # Motor principal
│   ├── LoopJogo.js        # Game loop
│   ├── Renderizador.js    # Sistema de renderização
│   └── Camera.js          # Sistema de câmera
├── entidades/             # Sistema de entidades
│   ├── Entidade.js        # Classe base de entidade
│   └── EntidadeFactory.js # Factory de entidades
├── componentes/           # Componentes do ECS
│   ├── SpriteComponent.js
│   ├── CollisionComponent.js
│   ├── ParticleEmitterComponent.js
│   ├── LightComponent.js
│   ├── TilemapComponent.js
│   ├── ScriptComponent.js
│   └── ...
├── editor/                # Editor visual
│   ├── EditorPrincipal.js # Editor principal
│   ├── AssetManager.js    # Gerenciador de assets
│   ├── EditorAnimation.js # Editor de animações
│   ├── EditorParticle.js  # Editor de partículas
│   ├── EditorLighting.js  # Editor de iluminação
│   └── ...
├── sistemas/              # Sistemas especializados
│   └── LightingSystem.js  # Sistema de iluminação
├── movimentacao/          # Sistema de movimentação
│   ├── Movimentacao.js    # Classes base
│   └── GeradorScript.js   # Gerador de scripts
├── estados/               # Máquina de estados
│   ├── Estado.js
│   └── MaquinaEstado.js
└── documentation/         # Documentação
    ├── MANUAL_DE_USO.md
    ├── PARTICLE_SYSTEM.md
    └── ...
```

### Fluxo de Dados

```
User Input → Editor UI → Entidade → Componentes → Sistemas → Renderização
                ↓
          Asset Manager
                ↓
        Template Manager
                ↓
          Engine Core
```

---

## 🖥️ Editor Visual

### Interface do Editor

O editor é dividido em 4 áreas principais:

#### 1. **Toolbar** (Topo)
- **Criar**: Dropdown para criar novas entidades (Player, NPC, Objeto, Menu UI)
- **Ferramentas**: Selecionar, Mover, Paleta de Tiles, Editor de Partículas, Editor de Iluminação
- **Controles**: Play, Pause, Stop
- **Projeto**: Novo, Salvar, Carregar, Exportar, Configurações de Cena

#### 2. **Hierarquia** (Esquerda - Superior)
- Lista em árvore de todas as entidades
- Organização por pastas
- Drag & drop para reorganizar
- Ícones visuais por tipo de entidade

#### 3. **Painel de Assets** (Esquerda - Inferior)
- Galeria de sprites e imagens
- Editor de Sprite Sheets
- Editor de Animações
- Upload de novos assets

#### 4. **Painel de Propriedades** (Direita)
- Propriedades da entidade selecionada
- Componentes ativos
- Botão para adicionar novos componentes
- Controls específicos por componente

#### 5. **Canvas** (Centro)
- Visualização do jogo/cena
- Grid visual (configurável)
- Gizmos de colliders
- Overlay de informações (FPS, entidades, zoom)

#### 6. **Console** (Rodapé - Colapsável)
- Log de eventos
- Erros e avisos
- Informações de debug

### Atalhos de Teclado

| Tecla | Ação |
|-------|------|
| `Space` | Play/Pause |
| `Ctrl+S` | Salvar projeto |
| `V` | Ferramenta: Selecionar |
| `G` | Ferramenta: Mover |
| `Delete` | Deletar entidade selecionada |
| `Ctrl+D` | Duplicar entidade |
| `Mouse Wheel` | Zoom in/out |
| `Middle Mouse` | Pan (arrastar câmera) |

---

## 🧩 Sistema de Entidades e Componentes

### Arquitetura ECS

A engine utiliza o padrão **Entity-Component-System**:

- **Entity (Entidade)**: Container vazio que representa um objeto do jogo
- **Component (Componente)**: Dados e comportamentos específicos
- **System (Sistema)**: Lógica que processa componentes

### Classe Entidade

```javascript
class Entidade {
    constructor(tipo = 'objeto') {
        this.id = Entidade.contadorId++;
        this.tipo = tipo;
        this.nome = `${tipo}_${this.id}`;
        this.x = 0;
        this.y = 0;
        this.largura = 32;
        this.altura = 32;
        this.componentes = new Map();
        this.ativo = true;
        this.visivel = true;
    }

    adicionarComponente(tipo, componente) {
        this.componentes.set(tipo, componente);
        componente.inicializar?.(this);
    }

    obterComponente(tipo) {
        return this.componentes.get(tipo);
    }

    temComponente(tipo) {
        return this.componentes.has(tipo);
    }

    removerComponente(tipo) {
        this.componentes.delete(tipo);
    }
}
```

### Ciclo de Vida

```
Criação → Inicialização → Loop (Update → Render) → Destruição
```

1. **Criação**: `new Entidade(tipo)`
2. **Adição de Componentes**: `entidade.adicionarComponente(tipo, componente)`
3. **Inicialização**: `componente.inicializar(entidade)`
4. **Update Loop**: `componente.atualizar(entidade, deltaTime)`
5. **Render**: `componente.renderizar(renderizador)`
6. **Destruição**: `entidade = null` (garbage collected)

---

## 🔌 Componentes Disponíveis

### 1. SpriteComponent

Renderiza sprites e animações.

**Propriedades**:
- `assetId`: ID do asset a ser renderizado
- `animacaoAtual`: Nome da animação atual
- `frame`: Frame atual da animação
- `fps`: Velocidade da animação
- `loop`: Se a animação deve repetir
- `offsetX/offsetY`: Offset de renderização
- `largura/altura`: Dimensões de renderização

**Métodos**:
```javascript
sprite.definirAnimacao(nome);
sprite.pausar();
sprite.retomar();
sprite.parar();
```

### 2. CollisionComponent

Gerencia colisões 2D.

**Propriedades**:
- `largura/altura`: Dimensões do collider
- `offsetX/offsetY`: Offset do collider
- `isTrigger`: Se é trigger (sem física)
- `isSolid`: Se bloqueia movimento
- `isOneWay`: Plataforma de mão única

**Métodos**:
```javascript
collider.verificarColisao(outraEntidade);
collider.resolverColisao(outraEntidade, direcao);
```

### 3. ParticleEmitterComponent

Sistema de partículas.

**Propriedades**:
- `templateId`: ID do template usado
- `emitindo`: Se está emitindo
- `modo`: 'continuo', 'burst', 'oneshot'
- `taxaEmissao`: Partículas por segundo
- `maxParticulas`: Limite de partículas
- `corInicial/corFinal`: Gradiente de cor
- `tamanhoInicial/tamanhoFinal`: Tamanho das partículas
- `velocidadeMin/velocidadeMax`: Velocidade
- `anguloMin/anguloMax`: Direção
- `gravidade`: Força gravitacional
- `tempoVidaMin/tempoVidaMax`: Tempo de vida

**Métodos**:
```javascript
emitter.aplicarTemplate(template);
emitter.aplicarPreset(nome); // 'fogo', 'explosao', 'fumaca', etc.
emitter.emitir(x, y);
emitter.parar();
```

### 4. LightComponent

Sistema de iluminação 2D.

**Propriedades**:
- `cor`: Cor da luz (hex)
- `raio`: Alcance da luz
- `intensidade`: 0-1
- `tipo`: 'point', 'spot', 'ambient'
- `anguloInicio/anguloFim`: Para spotlight
- `sombras`: Se projeta sombras

### 5. TilemapComponent

Editor e renderização de tilemaps.

**Propriedades**:
- `tileSize`: Tamanho do tile (px)
- `largura/altura`: Dimensões do mapa (tiles)
- `tiles`: Array 2D de tiles
- `assetId`: Tileset usado

**Métodos**:
```javascript
tilemap.setTile(x, y, tileData);
tilemap.getTile(x, y);
tilemap.limpar();
tilemap.redimensionar(novaLargura, novaAltura);
```

### 6. CameraFollowComponent

Câmera que segue a entidade.

**Propriedades**:
- `suavizacao`: Velocidade de seguimento (0-1)
- `offsetX/offsetY`: Offset da câmera
- `limites`: Limites do mapa (opcional)

### 7. DialogueComponent

Sistema de diálogos.

**Propriedades**:
- `dialogos`: Array de diálogos
- `indiceAtual`: Índice do diálogo atual
- `ativo`: Se está ativo

**Estrutura de Diálogo**:
```javascript
{
    texto: "Olá, aventureiro!",
    nomePersonagem: "Guardião",
    avatar: "asset_id",
    opcoes: [
        { texto: "Continuar", acao: "proximo" },
        { texto: "Sair", acao: "fechar" }
    ]
}
```

### 8. ParallaxComponent

Fundo com efeito parallax.

**Propriedades**:
- `layers`: Array de camadas
- Cada layer tem:
  - `assetId`: Asset da camada
  - `velocidade`: 0-1 (0 = estático, 1 = move igual à câmera)
  - `repetir`: se repete horizontalmente
  - `offsetY`: Posição Y fixa

### 9. ScriptComponent

Scripts customizados.

**Propriedades**:
- `scriptName`: Nome do script
- `codigo`: Código JavaScript
- `instance`: Instância do script executável

**Ciclo de Vida**:
```javascript
class MeuScript {
    inicializar(entidade) {
        // Executado uma vez
    }

    atualizar(entidade, deltaTime, engine) {
        // Executado todo frame
    }
}
```

### 10. CheckpointComponent

Pontos de salvamento.

**Propriedades**:
- `ativado`: Se foi ativado
- `respawnX/respawnY`: Posição de respawn

### 11. KillZoneComponent

Áreas de morte.

**Métodos**:
```javascript
killzone.onTriggerEnter(outraEntidade);
```

---

## ⚙️ Sistemas da Engine

### Engine Core

```javascript
class Engine {
    constructor(canvas) {
        this.canvas = canvas;
        this.renderizador = new Renderizador(canvas);
        this.camera = new Camera();
        this.entidades = [];
        this.simulado = false;
    }

    inicializar() {
        // Setup inicial
    }

    atualizar(deltaTime) {
        // Physics, scripts, animações
        this.entidades.forEach(ent => {
            ent.componentes.forEach(comp => {
                comp.atualizar?.(ent, deltaTime, this);
            });
        });
    }

    renderizar() {
        this.renderizador.limpar();
        
        // Renderiza entidades
        this.entidades
            .filter(e => e.visivel)
            .sort((a, b) => a.y - b.y) // Z-order por Y
            .forEach(ent => {
                ent.componentes.forEach(comp => {
                    comp.renderizar?.(this.renderizador);
                });
            });
    }
}
```

### Loop de Jogo

```javascript
class LoopJogo {
    constructor(engine) {
        this.engine = engine;
        this.ultimoTempo = 0;
        this.rodando = false;
    }

    iniciar() {
        this.rodando = true;
        requestAnimationFrame(this.loop.bind(this));
    }

    loop(tempo) {
        if (!this.rodando) return;

        const deltaTime = (tempo - this.ultimoTempo) / 1000;
        this.ultimoTempo = tempo;

        this.engine.atualizar(deltaTime);
        this.engine.renderizar();

        requestAnimationFrame(this.loop.bind(this));
    }

    parar() {
        this.rodando = false;
    }
}
```

### Renderizador

```javascript
class Renderizador {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false; // Pixel art
    }

    limpar(cor = '#0a0a15') {
        this.ctx.fillStyle = cor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    desenharSprite(asset, sx, sy, sw, sh, dx, dy, dw, dh) {
        this.ctx.drawImage(asset.imagem, sx, sy, sw, sh, dx, dy, dw, dh);
    }

    desenharRetangulo(x, y, w, h, cor) {
        this.ctx.fillStyle = cor;
        this.ctx.fillRect(x, y, w, h);
    }

    // ... mais métodos
}
```

### Camera

```javascript
class Camera {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.zoom = 1;
        this.seguindoEntidade = null;
    }

    seguir(entidade, suavizacao = 0.1) {
        this.seguindoEntidade = entidade;
        this.suavizacao = suavizacao;
    }

    atualizar() {
        if (this.seguindoEntidade) {
            const targetX = this.seguindoEntidade.x + this.seguindoEntidade.largura / 2;
            const targetY = this.seguindoEntidade.y + this.seguindoEntidade.altura / 2;
            
            this.x += (targetX - this.x) * this.suavizacao;
            this.y += (targetY - this.y) * this.suavizacao;
        }
    }

    mundoParaTela(x, y) {
        return {
            x: (x - this.x) * this.zoom + this.canvas.width / 2,
            y: (y - this.y) * this.zoom + this.canvas.height / 2
        };
    }

    telaParaMundo(x, y) {
        return {
            x: (x - this.canvas.width / 2) / this.zoom + this.x,
            y: (y - this.canvas.height / 2) / this.zoom + this.y
        };
    }
}
```

---

## 📦 Gerenciamento de Assets

### AssetManager

```javascript
class AssetManager {
    constructor() {
        this.assets = new Map();
    }

    adicionarAsset(id, dados) {
        // dados: { tipo, url, animacoes, ... }
        const asset = {
            id,
            tipo: dados.tipo,
            url: dados.url,
            imagem: null,
            carregado: false,
            animacoes: dados.animacoes || {}
        };

        if (dados.tipo === 'sprite') {
            asset.imagem = new Image();
            asset.imagem.onload = () => {
                asset.carregado = true;
            };
            asset.imagem.src = dados.url;
        }

        this.assets.set(id, asset);
        return asset;
    }

    obterAsset(id) {
        return this.assets.get(id);
    }

    removerAsset(id) {
        this.assets.delete(id);
    }

    serializar() {
        const dados = [];
        this.assets.forEach((asset, id) => {
            dados.push({
                id,
                tipo: asset.tipo,
                url: asset.url,
                animacoes: asset.animacoes
            });
        });
        return dados;
    }
}
```

### Estrutura de Asset

```javascript
{
    id: "player_sprite",
    tipo: "sprite",
    url: "data:image/png;base64,...", // ou URL
    largura: 32,
    altura: 32,
    animacoes: {
        "idle": [
            { x: 0, y: 0, w: 32, h: 32, duration: 100 },
            { x: 32, y: 0, w: 32, h: 32, duration: 100 }
        ],
        "walk": [
            { x: 0, y: 32, w: 32, h: 32, duration: 80 },
            { x: 32, y: 32, w: 32, h: 32, duration: 80 },
            { x: 64, y: 32, w: 32, h: 32, duration: 80 }
        ]
    }
}
```

---

## ✨ Sistema de Partículas

### Template de Partículas

Templates são configurações reutilizáveis:

```javascript
{
    id: "fogo",
    nome: "Fogo",
    customizado: false,
    taxaEmissao: 30,
    maxParticulas: 100,
    modo: "continuo",
    corInicial: "#ff6600",
    corFinal: "#ff000000",
    tamanhoInicial: 8,
    tamanhoFinal: 2,
    velocidadeMin: 50,
    velocidadeMax: 100,
    anguloMin: 260,
    anguloMax: 280,
    gravidade: -50,
    arrasto: 0.95,
    tempoVidaMin: 0.5,
    tempoVidaMax: 1.5,
    formaEmissor: "ponto",
    raioEmissor: 10
}
```

### Presets Disponíveis

- **Fogo**: Chamas subindo
- **Explosão**: Burst radial
- **Fumaça**: Partículas flutuantes
- **Sparkles**: Brilhos cintilantes
- **Chuva**: Gotas caindo
- **Aura**: Anel pulsante

### Editor de Partículas

O editor permite:
1. Criar templates customizados
2. Editar propriedades em tempo real
3. Preview ao vivo
4. Salvar/deletar templates
5. Aplicar texturas/sprites às partículas

---

## 💡 Sistema de Iluminação

### LightingSystem

```javascript
class LightingSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.luzes = [];
        this.corAmbiente = '#1a1a2e';
        this.intensidadeAmbiente = 0.3;
    }

    adicionarLuz(luz) {
        this.luzes.push(luz);
    }

    renderizar() {
        // 1. Camada de sombra (occlusion)
        this.ctx.fillStyle = this.corAmbiente;
        this.ctx.globalAlpha = 1 - this.intensidadeAmbiente;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 2. Renderizar cada luz
        this.ctx.globalCompositeOperation = 'lighter';
        this.luzes.forEach(luz => this.renderizarLuz(luz));
        
        // 3. Restaurar
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.globalAlpha = 1;
    }

    renderizarLuz(luz) {
        const gradient = this.ctx.createRadialGradient(
            luz.x, luz.y, 0,
            luz.x, luz.y, luz.raio
        );
        
        const cor = this.hexToRgba(luz.cor, luz.intensidade);
        gradient.addColorStop(0, cor);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(luz.x, luz.y, luz.raio, 0, Math.PI * 2);
        this.ctx.fill();
    }
}
```

### Preset de Iluminação

Exemplo de preset "Caverna":
```javascript
{
    corAmbiente: "#0a0a15",
    intensidadeAmbiente: 0.2,
    luzes: [
        { tipo: "point", x: 200, y: 150, raio: 150, cor: "#ffaa00", intensidade: 0.8 }
    ]
}
```

---

## 📜 Sistema de Scripting

### GeradorScript

Gera código JavaScript executável:

```javascript
class GeradorScript {
    static gerarScriptBasico(config) {
        return `
class MovimentacaoBasica {
    inicializar(entidade) {
        this.velocidade = ${config.velocidade || 150};
    }

    atualizar(entidade, deltaTime, engine) {
        const input = engine.input;
        
        if (input.teclas['ArrowLeft']) {
            entidade.x -= this.velocidade * deltaTime;
        }
        if (input.teclas['ArrowRight']) {
            entidade.x += this.velocidade * deltaTime;
        }
        if (input.teclas['ArrowUp']) {
            entidade.y -= this.velocidade * deltaTime;
        }
        if (input.teclas['ArrowDown']) {
            entidade.y += this.velocidade * deltaTime;
        }
    }
}
        `;
    }

    static gerarScriptPlataforma(config) {
        return `
class MovimentacaoPlataforma {
    inicializar(entidade) {
        this.velocidadeX = ${config.velocidadeX || 200};
        this.forcaPulo = ${config.forcaPulo || 400};
        this.gravidade = ${config.gravidade || 800};
        this.velocidadeY = 0;
        this.noChao = false;
    }

    atualizar(entidade, deltaTime, engine) {
        const input = engine.input;
        
        // Movimento horizontal
        if (input.teclas['ArrowLeft']) {
            entidade.x -= this.velocidadeX * deltaTime;
        }
        if (input.teclas['ArrowRight']) {
            entidade.x += this.velocidadeX * deltaTime;
        }
        
        // Pulo
        if (input.teclas[' '] && this.noChao) {
            this.velocidadeY = -this.forcaPulo;
            this.noChao = false;
        }
        
        // Gravidade
        this.velocidadeY += this.gravidade * deltaTime;
        entidade.y += this.velocidadeY * deltaTime;
        
        // Colisão com chão (simplificado)
        if (entidade.y >= 500) {
            entidade.y = 500;
            this.velocidadeY = 0;
            this.noChao = true;
        }
    }
}
        `;
    }
}
```

### Scripts Disponíveis

1. **Básico (Top-Down)**: Movimento 4 direções
2. **Plataforma**: Movimento + pulo + gravidade
3. **Patrulha IA**: NPC que patrulha entre pontos
4. **Morte**: Fade out quando morre
5. **Interação**: Sistema de interação com objetos
6. **Combate Melee**: Ataque corpo a corpo
7. **Respawn**: Sistema de reaparecimento

---

## 🎯 Física e Colisões

### Sistema de Colisão

```javascript
class CollisionComponent {
    verificarColisao(outraEntidade) {
        const outro = outraEntidade.obterComponente('CollisionComponent');
        if (!outro) return null;

        const bounds1 = this.getBounds();
        const bounds2 = outro.getBounds();

        // AABB (Axis-Aligned Bounding Box)
        if (bounds1.x < bounds2.x + bounds2.w &&
            bounds1.x + bounds1.w > bounds2.x &&
            bounds1.y < bounds2.y + bounds2.h &&
            bounds1.y + bounds1.h > bounds2.y) {
            
            return this.calcularDirecaoColisao(bounds1, bounds2);
        }

        return null;
    }

    calcularDirecaoColisao(b1, b2) {
        const overlapX = Math.min(
            b1.x + b1.w - b2.x,
            b2.x + b2.w - b1.x
        );
        const overlapY = Math.min(
            b1.y + b1.h - b2.y,
            b2.y + b2.h - b1.y
        );

        if (overlapX < overlapY) {
            return b1.x < b2.x ? 'right' : 'left';
        } else {
            return b1.y < b2.y ? 'bottom' : 'top';
        }
    }

    resolverColisao(outraEntidade, direcao) {
        if (this.isTrigger || outro.isTrigger) {
            // Apenas notificar, sem física
            this.onTriggerEnter?.(outraEntidade);
            return;
        }

        // Resolver física
        switch(direcao) {
            case 'top':
                this.entidade.y = outraEntidade.y - this.altura;
                break;
            case 'bottom':
                this.entidade.y = outraEntidade.y + outro.altura;
                break;
            case 'left':
                this.entidade.x = outraEntidade.x - this.largura;
                break;
            case 'right':
                this.entidade.x = outraEntidade.x + outro.largura;
                break;
        }
    }
}
```

### Tipos de Colliders

1. **Solid**: Bloqueia movimento
2. **Trigger**: Detecta sobreposição sem bloquear
3. **One-Way Platform**: Plataforma de mão única (só colide por cima)

---

## 🎬 Animações

### Sistema de Animações

```javascript
class SpriteComponent {
    definirAnimacao(nome) {
        if (this.animacaoAtual === nome) return;
        
        this.animacaoAtual = nome;
        this.frame = 0;
        this.tempoFrame = 0;
    }

    atualizar(entidade, deltaTime) {
        if (!this.animacaoAtual) return;

        const asset = assetManager.obterAsset(this.assetId);
        const anim = asset.animacoes[this.animacaoAtual];
        if (!anim || anim.length === 0) return;

        // Atualizar frame
        this.tempoFrame += deltaTime * 1000;
        const frameDuration = anim[this.frame].duration || (1000 / this.fps);

        if (this.tempoFrame >= frameDuration) {
            this.tempoFrame = 0;
            this.frame++;

            if (this.frame >= anim.length) {
                if (this.loop) {
                    this.frame = 0;
                } else {
                    this.frame = anim.length - 1;
                    this.onAnimacaoCompleta?.();
                }
            }
        }
    }

    renderizar(renderizador) {
        const asset = assetManager.obterAsset(this.assetId);
        if (!asset || !asset.carregado) return;

        const anim = asset.animacoes[this.animacaoAtual];
        if (!anim) return;

        const frameData = anim[this.frame];
        
        renderizador.desenharSprite(
            asset,
            frameData.x, frameData.y, frameData.w, frameData.h,
            this.entidade.x - renderizador.camera.x,
            this.entidade.y - renderizador.camera.y,
            this.largura || frameData.w,
            this.altura || frameData.h
        );
    }
}
```

### Editor de Animações

Funcionalidades:
1. **Upload de Sprite Sheet**
2. **Fatiar em Grid** (configurável)
3. **Criar Animações** (sequências de frames)
4. **Preview em Tempo Real**
5. **Configurar FPS, Loop, Offset**
6. **Exportar/Importar** configurações

---

## 🗺️ Tilemap System

### TilemapComponent

```javascript
class TilemapComponent {
    constructor() {
        this.tileSize = 32;
        this.largura = 20; // tiles
        this.altura = 15;
        this.tiles = [];
        this.assetId = null;
        
        this.inicializarMapa();
    }

    inicializarMapa() {
        for (let y = 0; y < this.altura; y++) {
            this.tiles[y] = [];
            for (let x = 0; x < this.largura; x++) {
                this.tiles[y][x] = null;
            }
        }
    }

    setTile(x, y, tileData) {
        if (x < 0 || x >= this.largura || y < 0 || y >= this.altura) return;
        this.tiles[y][x] = tileData;
    }

    getTile(x, y) {
        if (x < 0 || x >= this.largura || y < 0 || y >= this.altura) return null;
        return this.tiles[y][x];
    }

    renderizar(renderizador) {
        const asset = assetManager.obterAsset(this.assetId);
        if (!asset || !asset.carregado) return;

        for (let y = 0; y < this.altura; y++) {
            for (let x = 0; x < this.largura; x++) {
                const tile = this.tiles[y][x];
                if (!tile) continue;

                const screenX = x * this.tileSize - renderizador.camera.x;
                const screenY = y * this.tileSize - renderizador.camera.y;

                renderizador.desenharSprite(
                    asset,
                    tile.x, tile.y, tile.w, tile.h,
                    screenX, screenY,
                    this.tileSize, this.tileSize
                );
            }
        }
    }
}
```

### Tile Palette

Funcionalidades:
1. **Selecionar Tiles** do tileset
2. **Pintar** no mapa
3. **Apagar** tiles
4. **Marcar como Sólido** (colisão)
5. **Big Brush** (Shift+Click para selecionar área)
6. **Grid Visual** configurável

---

## 🚀 Workflow de Desenvolvimento

### 1. Criar Novo Projeto

1. Abra o editor
2. Clique em "🆕 Novo Projeto"
3. Uma cena vazia será criada

### 2. Adicionar Assets

1. Vá para o **Painel de Assets**
2. Clique em "Adicionar Asset"
3. Faça upload de uma imagem
4. Configure o sprite sheet (se aplicável)
5. Crie animações no **Editor de Animações**

### 3. Criar Entidades

1. Clique em "+ Criar" na toolbar
2. Escolha o tipo (Player, NPC, Objeto, Menu UI)
3. A entidade aparece no canvas e na hierarquia

### 4. Adicionar Componentes

1. Selecione a entidade
2. No **Painel de Propriedades**, clique em "+ Adicionar Componente"
3. Escolha o componente desejado
4. Configure as propriedades

### 5. Configurar Comportamento

#### Opção A: Scripts Prontos
1. Adicione um componente de script pré-pronto:
   - Script RPG (Top-Down)
   - Script Plataforma
   - Script IA Patrulha
   - Etc.

#### Opção B: Script Customizado
1. Adicione "Novo Script (Vazio)"
2. Escreva o código no editor
3. Salve

### 6. Testar

1. Clique em "▶ Play"
2. Teste o jogo
3. Clique em "◼ Stop" para voltar ao modo de edição

### 7. Ajustar e Iterar

1. Modifique propriedades
2. Ajuste posições
3. Teste novamente

### 8. Salvar Projeto

1. Clique em "💾 Salvar"
2. Um arquivo `.json` será baixado
3. Para carregar: "📂 Carregar" e selecione o arquivo

### 9. Exportar

1. Clique em "📤 Exportar"
2. Escolha o formato (JSON, HTML standalone, etc.)

---

## 📚 API Reference

### Engine

```javascript
// Criar engine
const engine = new Engine(canvas);

// Inicializar
engine.inicializar();

// Adicionar entidade
engine.entidades.push(entidade);

// Remover entidade
const index = engine.entidades.indexOf(entidade);
engine.entidades.splice(index, 1);

// Obter entidade por ID
const ent = engine.entidades.find(e => e.id === id);

// Pausar/Retomar
engine.pausar();
engine.retomar();
```

### Entidade

```javascript
// Criar
const player = new Entidade('player');

// Posicionar
player.x = 100;
player.y = 200;

// Redimensionar
player.largura = 64;
player.altura = 64;

// Adicionar componente
const sprite = new SpriteComponent();
player.adicionarComponente('SpriteComponent', sprite);

// Obter componente
const sprite = player.obterComponente('SpriteComponent');

// Verificar se tem componente
if (player.temComponente('CollisionComponent')) {
    // ...
}

// Remover componente
player.removerComponente('SpriteComponent');

// Serializar
const dados = player.serializar();

// Desserializar
const player = Entidade.desserializar(dados);
```

### AssetManager

```javascript
// Adicionar asset
assetManager.adicionarAsset('player_sprite', {
    tipo: 'sprite',
    url: 'path/to/image.png',
    animacoes: { /* ... */ }
});

// Obter asset
const asset = assetManager.obterAsset('player_sprite');

// Remover asset
assetManager.removerAsset('player_sprite');

// Listar todos
const todos = assetManager.assets;
```

### Camera

```javascript
// Seguir entidade
camera.seguir(player, 0.1); // suavização

// Atualizar
camera.atualizar();

// Converter coordenadas
const tela = camera.mundoParaTela(100, 200);
const mundo = camera.telaParaMundo(400, 300);

// Zoom
camera.zoom = 2; // 200%
```

### Input

```javascript
// Verificar tecla
if (engine.input.teclas['ArrowLeft']) {
    // Mover para esquerda
}

// Verificar mouse
if (engine.input.mouseDown) {
    const x = engine.input.mouseX;
    const y = engine.input.mouseY;
}

// Eventos
engine.input.onKeyDown('Space', () => {
    // Pular
});
```

---

## 🛠️ Troubleshooting

### Problemas Comuns

#### 1. Assets não carregam

**Problema**: Imagens não aparecem
**Solução**:
- Verifique o console para erros de CORS
- Use Base64 ou hospede em servidor com CORS habilitado
- Verifique se o asset foi adicionado corretamente ao AssetManager

#### 2. Colisões não funcionam

**Problema**: Entidades passam uma pela outra
**Solução**:
- Certifique-se de que ambas têm `CollisionComponent`
- Verifique se `largura` e `altura` estão definidos
- Confirme que a física está sendo processada no update loop

#### 3. Animações não tocam

**Problema**: Sprite não anima
**Solução**:
- Verifique se `animacaoAtual` está definida
- Confirme que as animações existem no asset
- Certifique-se de que `SpriteComponent.atualizar()` é chamado

#### 4. Performance ruim

**Problema**: FPS baixo
**Solução**:
- Reduza número de partículas
- Desative gizmos/grid no modo play
- Limite número de entidades visíveis
- Use culling (não renderizar fora da tela)

#### 5. Partículas não aparecem

**Problema**: Emissor não funciona
**Solução**:
- Verifique se `emitindo` está `true`
- Confirme que há template aplicado
- Verifique `maxParticulas` e `taxaEmissao`

### Debug Tips

```javascript
// Log de debug
console.log('[Debug] Entidade:', entidade);
console.log('[Debug] Componentes:', entidade.componentes);

// Visualizar Colliders
mostrarGizmos = true;

// Pausar em frame específico
if (frameCount === 100) {
    debugger;
}

// Rastrear updates
componente.atualizar = function(ent, deltaTime) {
    console.log('Update chamado:', ent.nome, deltaTime);
    // ... código original
};
```

---

## 📖 Exemplos de Uso

### Exemplo 1: Jogo de Plataforma Simples

```javascript
// 1. Criar player
const player = new Entidade('player');
player.x = 100;
player.y = 400;
player.largura = 32;
player.altura = 32;

// 2. Adicionar sprite
const sprite = new SpriteComponent();
sprite.assetId = 'player_sprite';
sprite.definirAnimacao('idle');
player.adicionarComponente('SpriteComponent', sprite);

// 3. Adicionar física
const collider = new CollisionComponent();
collider.largura = 32;
collider.altura = 32;
player.adicionarComponente('CollisionComponent', collider);

// 4. Adicionar movimento
const script = new ScriptComponent();
script.codigo = GeradorScript.gerarScriptPlataforma({
    velocidadeX: 200,
    forcaPulo: 400,
    gravidade: 800
});
player.adicionarComponente('script_movimento', script);

//5. Adicionar câmera
const cameraFollow = new CameraFollowComponent();
cameraFollow.suavizacao = 0.1;
player.adicionarComponente('CameraFollowComponent', cameraFollow);

// 6. Adicionar à engine
engine.entidades.push(player);
```

### Exemplo 2: Sistema de Partículas (Fogueira)

```javascript
// 1. Criar entidade de fogueira
const fogueira = new Entidade('objeto');
fogueira.x = 300;
fogueira.y = 450;

// 2. Adicionar emissor
const emitter = new ParticleEmitterComponent();
emitter.aplicarPreset('fogo');
emitter.emitindo = true;
fogueira.adicionarComponente('ParticleEmitterComponent', emitter);

// 3. Adicionar luz
const luz = new LightComponent();
luz.cor = '#ff6600';
luz.raio = 150;
luz.intensidade = 0.8;
fogueira.adicionarComponente('LightComponent', luz);

engine.entidades.push(fogueira);
```

### Exemplo 3: NPC com Diálogo

```javascript
// 1. Criar NPC
const npc = new Entidade('npc');
npc.x = 500;
npc.y = 400;

// 2. Sprite
const sprite = new SpriteComponent();
sprite.assetId = 'npc_guard';
sprite.definirAnimacao('idle');
npc.adicionarComponente('SpriteComponent', sprite);

// 3. Diálogo
const dialogue = new DialogueComponent();
dialogue.adicionarDialogo({
    texto: "Bem-vindo, viajante! Esta é a vila de Elderwood.",
    nomePersonagem: "Guardião",
    avatar: "npc_guard"
});
dialogue.adicionarDialogo({
    texto: "Cuidado com os monstros na floresta!",
    nomePersonagem: "Guardião",
    avatar: "npc_guard"
});
npc.adicionarComponente('DialogueComponent', dialogue);

// 4. Trigger de interação
const trigger = new CollisionComponent();
trigger.isTrigger = true;
trigger.largura = 64;
trigger.altura = 64;
trigger.onTriggerEnter = (outraEnt) => {
    if(outraEnt.tipo === 'player') {
        dialogue.iniciar();
    }
};
npc.adicionarComponente('CollisionComponent', trigger);

engine.entidades.push(npc);
```

---

## 🎓 Conceitos Avançados

### Serialização e Persistência

Toda a cena pode ser serializada em JSON:

```javascript
// Salvar
const projeto = {
    versao: '2.0',
    entidades: engine.entidades.map(e => e.serializar()),
    assets: assetManager.serializar(),
    sceneConfig: {
        backgroundColor: '#0a0a15',
        gravidade: 800
    }
};
const json = JSON.stringify(projeto);
localStorage.setItem('meu_jogo', json);

// Carregar
const dados = JSON.parse(localStorage.getItem('meu_jogo'));
dados.entidades.forEach(dadosEnt => {
    const ent = Entidade.desserializar(dadosEnt);
    engine.entidades.push(ent);
});
assetManager.desserializar(dados.assets);
```

### Extensibilidade

Criar componentes customizados:

```javascript
class MeuComponenteCustomizado {
    constructor() {
        this.tipo = 'MeuComponenteCustomizado';
        this.propriedade1 = 0;
    }

    inicializar(entidade) {
        this.entidade = entidade;
    }

    atualizar(entidade, deltaTime, engine) {
        // Lógica custom
    }

    renderizar(renderizador) {
        // Renderização custom
    }

    serializar() {
        return {
            tipo: this.tipo,
            propriedade1: this.propriedade1
        };
    }

    static desserializar(dados) {
        const comp = new MeuComponenteCustomizado();
        comp.propriedade1 = dados.propriedade1;
        return comp;
    }
}
```

### Otimizações

#### 1. Object Pooling (Partículas)

```javascript
class ParticlePool {
    constructor(tamanho) {
        this.pool = [];
        for (let i = 0; i < tamanho; i++) {
            this.pool.push(new Particula());
        }
    }

    obter() {
        return this.pool.pop() || new Particula();
    }

    devolver(particula) {
        particula.reset();
        this.pool.push(particula);
    }
}
```

#### 2. Spatial Partitioning (Grid)

```javascript
class SpatialGrid {
    constructor(largura, altura, tamanhoCell) {
        this.cells = new Map();
        this.tamanhoCell = tamanhoCell;
    }

    inserir(entidade) {
        const cellX = Math.floor(entidade.x / this.tamanhoCell);
        const cellY = Math.floor(entidade.y / this.tamanhoCell);
        const key = `${cellX},${cellY}`;
        
        if (!this.cells.has(key)) {
            this.cells.set(key, []);
        }
        this.cells.get(key).push(entidade);
    }

    obterVizinhos(entidade) {
        // Retorna apenas entidades nas células adjacentes
    }
}
```

---

## 📝 Checklist de Recursos

### ✅ Implementado

- [x] Editor visual completo
- [x] Sistema ECS
- [x] Renderização 2D
- [x] Sistema de câmera
- [x] Colisões AABB
- [x] Animações de sprite
- [x] Sistema de partículas
- [x] Sistema de iluminação
- [x] Tilemap editor
- [x] Asset manager
- [x] Scripts customizados
- [x] Diálogos
- [x] Parallax backgrounds
- [x] Checkpoints
- [x] KillZones
- [x] Serialização/Exportação

### 🚧 Roadmap Futuro

- [ ] Sistema de som/música
- [ ] Tilemaps com auto-tiling
- [ ] Pathfinding (A*)
- [ ] Partículas com texturas animadas
- [ ] Shaders customizáveis
- [ ] Multiplayer (networking)
- [ ] Mobile controls
- [ ] Plugin system
- [ ] Visual scripting (nodes)
- [ ] Animações por bones (skeletal)

---

## 🤝 Contribuindo

Para contribuir com o projeto:

1. Fork o repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

### Diretrizes de Código

- Use **ESNext** (ES6+)
- Mantenha classes **modulares**
- Documente métodos públicos com **JSDoc**
- Siga o padrão de **nomenclatura**:
  - Classes: `PascalCase`
  - Métodos: `camelCase`
  - Constantes: `UPPER_SNAKE_CASE`

---

## 📄 Licença

Este projeto é de código aberto. Sinta-se livre para usar, modificar e distribuir.

---

## 📞 Suporte

Para dúvidas, bugs ou sugestões:

- **Issues**: Abra uma issue no GitHub
- **Documentação**: Consulte `/documentation`
- **Exemplos**: Veja `/examples` (se disponível)

---

## 🎉 Créditos

Desenvolvido com ❤️ por **Uarek**

**Tecnologias**:
- JavaScript (Vanilla)
- HTML5 Canvas
- CSS3

**Inspirações**:
- Unity Engine
- Godot Engine
- Phaser.js

---

**Última atualização**: Dezembro 2023  
**Versão da Engine**: 2.0
