# ✨ Complete Documentation - Lumina Engine

> **Version**: 2.0  
> **Date**: December 2025  
> **Author**: Alex Sandro Martins de Araujo  
> **Type**: 2D Game Engine with Visual Editor

<p align="center">
  <a href="GAME_ENGINE_COMPLETE.md">English</a> •
  <a href="GAME_ENGINE_COMPLETA.pt-BR.md">Português (Brasil)</a>
</p>

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Visual Editor](#visual-editor)
4. [Entity-Component System](#entity-component-system)
5. [Available Components](#available-components)
6. [Engine Systems](#engine-systems)
7. [Asset Management](#asset-management)
8. [Particle System](#particle-system)
9. [Lighting System](#lighting-system)
10. [Scripting System](#scripting-system)
11. [Physics and Collisions](#physics-and-collisions)
12. [Animations](#animations)
13. [Tilemap System](#tilemap-system)
14. [Development Workflow](#development-workflow)
15. [API Reference](#api-reference)
16. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

### What is it?

**Lumina Engine** is a complete 2D game engine developed in pure JavaScript, focusing on:

- **WYSIWYG Visual Editor** (What You See Is What You Get)
- **ECS Architecture** (Entity-Component-System)
- **State System** for movement management
- **Visual and Interactive Animation Editor**
- **Particle System** with reusable templates
- **2D Lighting System** with dynamic shadows
- **Integrated Tilemap Editor**
- **Customizable Script System**

### Main Features

✅ **100% JavaScript** - No external dependencies  
✅ **Complete Visual Editor** - Create games without coding  
✅ **Hot Reload** - See changes in real-time  
✅ **Modular Components** - Flexible and extensible system  
✅ **Project Export** - Save and load projects in JSON  
✅ **Asset System** - Manage sprites, animations, and sounds  
✅ **2D Physics** - Collisions, gravity, and platforms  
✅ **Custom Scripts** - Extend functionality via code  

### Use Cases

- 2D platform games
- Top-down games (RPG, roguelike)
- Puzzle games
- Rapid prototyping
- Educational projects
- Game jams

---

## 🏗️ Architecture

### Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    VISUAL EDITOR                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │  Hierarchy  │  │   Canvas    │  │ Properties  │    │
│  │   (Tree)    │  │   Editor    │  │   (Panel)   │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    GAME ENGINE                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Game Loop                           │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐      │  │
│  │  │  Update  │→ │ Physics  │→ │  Render  │      │  │
│  │  └──────────┘  └──────────┘  └──────────┘      │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Entity System (ECS)                      │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐         │  │
│  │  │ Entity  │→ │Component│→ │ System  │         │  │
│  │  └─────────┘  └─────────┘  └─────────┘         │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  AUXILIARY SYSTEMS                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │  Assets  │ │Collision │ │Particles │ │ Lighting │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Directory Structure

```
lumina-engine/
├── index.html              # Main editor page
├── main.js                 # Entry point
├── css/
│   └── editor.css         # Editor styles
├── engine/                # Engine core
│   ├── Engine.js          # Main engine
│   ├── LoopJogo.js        # Game loop
│   ├── Renderizador.js    # Rendering system
│   └── Camera.js          # Camera system
├── entidades/             # Entity system
│   ├── Entidade.js        # Base entity class
│   └── EntidadeFactory.js # Entity factory
├── componentes/           # ECS Components
│   ├── SpriteComponent.js
│   ├── CollisionComponent.js
│   ├── ParticleEmitterComponent.js
│   ├── LightComponent.js
│   ├── TilemapComponent.js
│   ├── ScriptComponent.js
│   └── ...
├── editor/                # Visual editor
│   ├── EditorPrincipal.js # Main editor
│   ├── AssetManager.js    # Asset manager
│   ├── EditorAnimation.js # Animation editor
│   ├── EditorParticle.js  # Particle editor
│   ├── EditorLighting.js  # Lighting editor
│   └── ...
├── sistemas/              # Specialized systems
│   └── LightingSystem.js  # Lighting system
├── movimentacao/          # Movement system
│   ├── Movimentacao.js    # Base classes
│   └── GeradorScript.js   # Script generator
├── estados/               # State machine
│   ├── Estado.js
│   └── MaquinaEstado.js
└── documentation/         # Documentation
    ├── MANUAL_DE_USO.md
    ├── PARTICLE_SYSTEM.md
    └── ...
```

### Data Flow

```
User Input → Editor UI → Entity → Components → Systems → Rendering
                ↓
          Asset Manager
                ↓
        Template Manager
                ↓
          Engine Core
```

---

## 🖥️ Visual Editor

### Editor Interface

The editor is divided into 4 main areas:

#### 1. **Toolbar** (Top)
- **Create**: Dropdown to create new entities (Player, NPC, Object, UI Menu)
- **Tools**: Select, Move, Tile Palette, Particle Editor, Lighting Editor
- **Controls**: Play, Pause, Stop
- **Project**: New, Save, Load, Export, Scene Settings

#### 2. **Hierarchy** (Left - Top)
- Tree list of all entities
- Folder organization
- Drag & drop to reorganize
- Visual icons by entity type

#### 3. **Assets Panel** (Left - Bottom)
- Sprite and image gallery
- Sprite Sheet Editor
- Animation Editor
- Upload new assets

#### 4. **Properties Panel** (Right)
- Selected entity properties
- Active components
- Button to add new components
- Component-specific controls

#### 5. **Canvas** (Center)
- Game/scene visualization
- Visual grid (configurable)
- Collider gizmos
- Information overlay (FPS, entities, zoom)

#### 6. **Console** (Footer - Collapsible)
- Event log
- Errors and warnings
- Debug information

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play/Pause |
| `Ctrl+S` | Save project |
| `V` | Tool: Select |
| `G` | Tool: Move |
| `Delete` | Delete selected entity |
| `Ctrl+D` | Duplicate entity |
| `Mouse Wheel` | Zoom in/out |
| `Middle Mouse` | Pan (drag camera) |

---

## 🧩 Entity-Component System

### ECS Architecture

The engine uses the **Entity-Component-System** pattern:

- **Entity**: Empty container representing a game object
- **Component**: Specific data and behaviors
- **System**: Logic that processes components

### Entity Class

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

### Lifecycle

```
Creation → Initialization → Loop (Update → Render) → Destruction
```

1. **Creation**: `new Entidade(tipo)`
2. **Add Components**: `entidade.adicionarComponente(tipo, componente)`
3. **Initialization**: `componente.inicializar(entidade)`
4. **Update Loop**: `componente.atualizar(entidade, deltaTime)`
5. **Render**: `componente.renderizar(renderizador)`
6. **Destruction**: `entidade = null` (garbage collected)

---

## 🔌 Available Components

### 1. SpriteComponent

Renders sprites and animations.

**Properties**:
- `assetId`: ID of the asset to be rendered
- `animacaoAtual`: Current animation name
- `frame`: Current animation frame
- `fps`: Animation speed
- `loop`: Whether the animation should repeat
- `offsetX/offsetY`: Rendering offset
- `largura/altura`: Rendering dimensions

**Methods**:
```javascript
sprite.definirAnimacao(nome);
sprite.pausar();
sprite.retomar();
sprite.parar();
```

### 2. CollisionComponent

Manages 2D collisions.

**Properties**:
- `largura/altura`: Collider dimensions
- `offsetX/offsetY`: Collider offset
- `isTrigger`: If it's a trigger (no physics)
- `isSolid`: If it blocks movement
- `isOneWay`: One-way platform

**Methods**:
```javascript
collider.verificarColisao(outraEntidade);
collider.resolverColisao(outraEntidade, direcao);
```

### 3. ParticleEmitterComponent

Particle system.

**Properties**:
- `templateId`: Template ID used
- `emitindo`: If it's emitting
- `modo`: 'continuo', 'burst', 'oneshot'
- `taxaEmissao`: Particles per second
- `maxParticulas`: Particle limit
- `corInicial/corFinal`: Color gradient
- `tamanhoInicial/tamanhoFinal`: Particle size
- `velocidadeMin/velocidadeMax`: Velocity
- `anguloMin/anguloMax`: Direction
- `gravidade`: Gravitational force
- `tempoVidaMin/tempoVidaMax`: Lifetime

**Methods**:
```javascript
emitter.aplicarTemplate(template);
emitter.aplicarPreset(nome); // 'fogo', 'explosao', 'fumaca', etc.
emitter.emitir(x, y);
emitter.parar();
```

### 4. LightComponent

2D lighting system.

**Properties**:
- `cor`: Light color (hex)
- `raio`: Light range
- `intensidade`: 0-1
- `tipo`: 'point', 'spot', 'ambient'
- `anguloInicio/anguloFim`: For spotlight
- `sombras`: If it casts shadows

### 5. TilemapComponent

Tilemap editor and rendering.

**Properties**:
- `tileSize`: Tile size (px)
- `largura/altura`: Map dimensions (tiles)
- `tiles`: 2D array of tiles
- `assetId`: Tileset used

**Methods**:
```javascript
tilemap.setTile(x, y, tileData);
tilemap.getTile(x, y);
tilemap.limpar();
tilemap.redimensionar(novaLargura, novaAltura);
```

### 6. CameraFollowComponent

Camera that follows the entity.

**Properties**:
- `suavizacao`: Follow speed (0-1)
- `offsetX/offsetY`: Camera offset
- `limites`: Map boundaries (optional)

### 7. DialogueComponent

Dialogue system.

**Properties**:
- `dialogos`: Array of dialogues
- `indiceAtual`: Current dialogue index
- `ativo`: If it's active

**Dialogue Structure**:
```javascript
{
    texto: "Hello, adventurer!",
    nomePersonagem: "Guardian",
    avatar: "asset_id",
    opcoes: [
        { texto: "Continue", acao: "proximo" },
        { texto: "Exit", acao: "fechar" }
    ]
}
```

### 8. ParallaxComponent

Background with parallax effect.

**Properties**:
- `layers`: Array of layers
- Each layer has:
  - `assetId`: Layer asset
  - `velocidade`: 0-1 (0 = static, 1 = moves like camera)
  - `repetir`: if it repeats horizontally
  - `offsetY`: Fixed Y position

### 9. ScriptComponent

Custom scripts.

**Properties**:
- `scriptName`: Script name
- `codigo`: JavaScript code
- `instance`: Executable script instance

**Lifecycle**:
```javascript
class MyScript {
    inicializar(entidade) {
        // Executed once
    }

    atualizar(entidade, deltaTime, engine) {
        // Executed every frame
    }
}
```

### 10. CheckpointComponent

Save points.

**Properties**:
- `ativado`: If was activated
- `respawnX/respawnY`: Respawn position

### 11. KillZoneComponent

Death zones.

**Methods**:
```javascript
killzone.onTriggerEnter(outraEntidade);
```

---

## ⚙️ Engine Systems

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
        // Initial setup
    }

    atualizar(deltaTime) {
        // Physics, scripts, animations
        this.entidades.forEach(ent => {
            ent.componentes.forEach(comp => {
                comp.atualizar?.(ent, deltaTime, this);
            });
        });
    }

    renderizar() {
        this.renderizador.limpar();
        
        // Render entities
        this.entidades
            .filter(e => e.visivel)
            .sort((a, b) => a.y - b.y) // Z-order by Y
            .forEach(ent => {
                ent.componentes.forEach(comp => {
                    comp.renderizar?.(this.renderizador);
                });
            });
    }
}
```

### Game Loop

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

### Renderer

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

    // ... more methods
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

## 📦 Asset Management

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

### Asset Structure

```javascript
{
    id: "player_sprite",
    tipo: "sprite",
    url: "data:image/png;base64,...", // or URL
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

## ✨ Particle System

### Particle Template

Templates are reusable configurations:

```javascript
{
    id: "fogo",
    nome: "Fire",
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

### Available Presets

- **Fire** (Fogo): Rising flames
- **Explosion** (Explosão): Radial burst
- **Smoke** (Fumaça): Floating particles
- **Sparkles**: Twinkling glitters
- **Rain** (Chuva): Falling drops
- **Aura**: Pulsating ring

### Particle Editor

The editor allows:
1. Create custom templates
2. Edit properties in real-time
3. Live preview
4. Save/delete templates
5. Apply textures/sprites to particles

---

## 💡 Lighting System

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
        // 1. Shadow layer (occlusion)
        this.ctx.fillStyle = this.corAmbiente;
        this.ctx.globalAlpha = 1 - this.intensidadeAmbiente;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 2. Render each light
        this.ctx.globalCompositeOperation = 'lighter';
        this.luzes.forEach(luz => this.renderizarLuz(luz));
        
        // 3. Restore
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

### Lighting Preset

Example of "Cave" preset:
```javascript
{
    corAmbiente: "#0a0a15",
    intensidadeAmbiente: 0.2,
    tipoIluminacao: "dinamica"
}
```

---

> 📝 **Note**: This is an extensive technical documentation. For a complete reference with all sections including Scripting System, Physics, Animations, Tilemap System, Development Workflow, API Reference, and Troubleshooting, please refer to the [Portuguese complete documentation](GAME_ENGINE_COMPLETA.pt-BR.md).
>
> **Translation Status**: Core sections translated. Additional sections being translated progressively.

---

**Last Updated**: December 2025  
**Version**: 2.0  
**Language**: English  
**Original Documentation**: Available in [Portuguese (Brazil)](GAME_ENGINE_COMPLETA.pt-BR.md)
