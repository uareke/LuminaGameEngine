<p align="center">
  <img src="assets/logo/lumina-logo.png" alt="Lumina Engine Logo" width="700">
</p>

<h1 align="center">✨ Lumina Engine</h1>

<p align="center">
  <strong>Illuminate Your Game Development</strong><br>
  <em>Complete 2D Game Engine with Visual Editor in Pure JavaScript</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
  <img src="https://img.shields.io/badge/javascript-ES6+-yellow" alt="JavaScript">
  <img src="https://img.shields.io/badge/2D-Game%20Engine-purple" alt="2D Game Engine">
</p>

<p align="center">
  <a href="README.md">English</a> •
  <a href="README.pt-BR.md">Português (Brasil)</a>
</p>

---

## ✨ Highlights

- 🖼️ **WYSIWYG Visual Editor** - Create games without coding
- 🧩 **ECS Architecture** - Modular Entity-Component-System
- 🎨 **Particle System** - With reusable templates
- 💡 **2D Lighting** - Dynamic lights and shadows
- 🗺️ **Tilemap Editor** - Build maps visually
- 🎬 **Animation Editor** - Configure sprites and animations
- 📜 **Script System** - Customizable behaviors
- 🎯 **2D Physics** - Collisions, gravity, and platforms

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/uareke/LuminaGameEngine.git
cd LuminaGameEngine
```

### 2. Open the Editor

Open `index.html` in a modern browser (recommended: Chrome, Firefox, Edge)

> ⚠️ **Important**: Use a local server to avoid CORS issues:
> ```bash
> # Option 1: Python
> python -m http.server 8000
> 
> # Option 2: Node.js
> npx http-server
> 
> # Option 3: VS Code Live Server
> # Install "Live Server" extension and right-click > "Open with Live Server"
> ```

### 3. Create Your First Game

1. **Add an Asset**
   - Click on the Assets panel
   - Upload an image (sprite)
   - Configure frames and animations

2. **Create an Entity**
   - Click `+ Create` → `Player`
   - Select the entity on canvas

3. **Add Components**
   - In properties panel: `+ Add Component`
   - Choose: `Sprite Renderer`, `Box Collider`, `Platform Script`

4. **Test**
   - Click `▶ Play`
   - Use arrows to move, space to jump

5. **Save**
   - `💾 Save` to export the project

---

## 📚 Documentation

### Complete Documentation
- **[📖 Complete Documentation](documentation/GAME_ENGINE_COMPLETA.md)** - Full engine guide (Portuguese)

### Specific Guides
- **[🎯 User Manual](documentation/MANUAL_DE_USO.md)** - How to use the editor (Portuguese)
- **[✨ Particle System](documentation/PARTICLE_SYSTEM.md)** - Particle guide (Portuguese)
- **[💡 Lighting System](documentation/tecnica/LIGHTING_SYSTEM.md)** - 2D Lighting (Portuguese)
- **[📜 Scripting](documentation/04_scripting.md)** - Creating scripts (Portuguese)
- **[🎬 Animations](documentation/03_animacoes.md)** - Animation system (Portuguese)

> 📝 **Note**: Documentation is currently available in Portuguese. English translation coming soon!

---

## 🏗️ Architecture

### Project Structure

```
lumina-engine/
├── index.html              # Visual editor
├── main.js                 # Entry point
├── engine/                 # Engine core
│   ├── Engine.js
│   ├── LoopJogo.js
│   ├── Renderizador.js
│   └── Camera.js
├── componentes/            # ECS Components
│   ├── SpriteComponent.js
│   ├── CollisionComponent.js
│   ├── ParticleEmitterComponent.js
│   ├── LightComponent.js
│   └── ...
├── editor/                 # Visual editor
│   ├── EditorPrincipal.js
│   ├── AssetManager.js
│   ├── EditorAnimation.js
│   └── ...
├── sistemas/               # Specialized systems
│   └── LightingSystem.js
└── documentation/          # Documentation
```

### ECS Pattern

```javascript
// Entity (Container)
const player = new Entidade('player');

// Components (Data + Behavior)
player.adicionarComponente('SpriteComponent', new SpriteComponent());
player.adicionarComponente('CollisionComponent', new CollisionComponent());
player.adicionarComponente('script_movement', new ScriptComponent());

// Systems (Global Logic)
// Process components in game loop
```

---

## 🎯 Features

### ✅ Implemented

#### Editor
- [x] Complete WYSIWYG interface
- [x] Entity hierarchy (tree view)
- [x] Dynamic properties panel
- [x] Asset manager with preview
- [x] Sprite editor (slice sprite sheets)
- [x] Animation editor
- [x] Particle editor
- [x] Lighting editor
- [x] Tilemap painter
- [x] Grid and snap-to-grid
- [x] Visual gizmos
- [x] Debug console

#### Engine Core
- [x] Optimized game loop
- [x] 2D rendering system
- [x] Camera with zoom and pan
- [x] Input system (keyboard/mouse)
- [x] Precise delta time
- [x] Serialization/Deserialization

#### Components
- [x] **SpriteComponent** - Sprite rendering
- [x] **CollisionComponent** - AABB collisions
- [x] **ParticleEmitterComponent** - Particle system
- [x] **LightComponent** - 2D lighting
- [x] **TilemapComponent** - Tilemaps
- [x] **CameraFollowComponent** - Following camera
- [x] **DialogueComponent** - Dialogue system
- [x] **ParallaxComponent** - Parallax backgrounds
- [x] **ScriptComponent** - Custom scripts
- [x] **CheckpointComponent** - Checkpoints
- [x] **KillZoneComponent** - Death zones

#### Systems
- [x] **2D Physics** - Gravity, collisions
- [x] **Animations** - Frame-based sprites
- [x] **Particles** - Complete system with templates
- [x] **Lighting** - Dynamic lights and shadows
- [x] **Tilemap** - Editor and rendering
- [x] **Scripts** - Scripting system

#### Advanced Features
- [x] Reusable particle templates
- [x] Lighting presets
- [x] Script generator (movement, AI, combat)
- [x] One-way platforms
- [x] Triggers (colliders without physics)
- [x] Project export (JSON)
- [x] Project import
- [x] Drag & drop assets

### 🚧 Roadmap

- [ ] Sound/music system
- [ ] Tilemaps with auto-tiling
- [ ] Pathfinding (A*)
- [ ] Customizable shaders
- [ ] Visual scripting (nodes)
- [ ] Mobile controls
- [ ] Basic multiplayer
- [ ] Plugin system

---

## 🎨 Examples

### Platform Game

```javascript
// Player with movement and physics
const player = new Entidade('player');
player.adicionarComponente('SpriteComponent', sprite);
player.adicionarComponente('CollisionComponent', collider);
player.adicionarComponente('script_platform', scriptPlataforma);
player.adicionarComponente('CameraFollowComponent', cameraFollow);
```

### Particle System (Fire)

```javascript
const campfire = new Entidade('objeto');
const emitter = new ParticleEmitterComponent();
emitter.aplicarPreset('fogo');
emitter.emitindo = true;
campfire.adicionarComponente('ParticleEmitterComponent', emitter);
```

### NPC with Dialogue

```javascript
const npc = new Entidade('npc');
const dialogue = new DialogueComponent();
dialogue.adicionarDialogo({
    texto: "Welcome to the village!",
    nomePersonagem: "Guardian"
});
npc.adicionarComponente('DialogueComponent', dialogue);
```

More examples in the [complete documentation](documentation/GAME_ENGINE_COMPLETA.md#exemplos-de-uso) (Portuguese).

---

## 🛠️ Technologies

- **JavaScript ES6+** - Main language
- **HTML5 Canvas** - Rendering
- **CSS3** - Editor interface
- **No external dependencies** - 100% vanilla

---

## 📖 Tutorials

### Tutorial 1: Creating a Platform Game

1. **Initial Setup**
   - Create a new project
   - Upload player sprite (32x32px)
   - Configure animations: idle, walk, jump

2. **Player**
   - Create "Player" entity
   - Add: Sprite, Collision, Platform Script
   - Configure speed: 200px/s
   - Configure jump: 400px/s

3. **Scenario**
   - Create "Tilemap" entity
   - Add TilemapComponent
   - Upload tileset
   - Paint the map with solid tiles

4. **Lighting**
   - Add LightComponent to player
   - Color: #ffffff, Radius: 150, Intensity: 0.8
   - Configure scene: Dark background

5. **Test**
   - Play → Test movement and jump
   - Adjust physics if needed

6. **Save**
   - Save project → `platform_basic.json`

### Tutorial 2: Particle System

1. **Open Particle Editor** (✨ button)

2. **Create Template**
   - Name: "torch_fire"
   - Rate: 30 part/s
   - Start color: #ff6600
   - End color: #ff000000
   - Angle: 260-280° (upward)
   - Gravity: -50

3. **Apply to Scene**
   - Create "Torch" entity
   - Add ParticleEmitterComponent
   - Select "torch_fire" template
   - Enable "Emitting"

4. **Add Light**
   - Add LightComponent
   - Color: #ff6600 (same as fire)
   - Intensity: 0.7

More tutorials in the [user manual](documentation/MANUAL_DE_USO.md) (Portuguese).

---

## 🐛 Troubleshooting

### Assets don't load

- ✅ Use local server (not `file://`)
- ✅ Check console for CORS errors
- ✅ Use Base64 for quick tests

### Collisions don't work

- ✅ Do both entities have CollisionComponent?
- ✅ Are `width` and `height` defined?
- ✅ Colliders are not `isTrigger`?

### Poor performance

- ✅ Reduce particles (`maxParticulas`)
- ✅ Disable gizmos on Play
- ✅ Use culling (don't render off-screen)

More solutions in the [troubleshooting guide](documentation/GAME_ENGINE_COMPLETA.md#troubleshooting) (Portuguese).

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m 'Add: my feature'`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

### Guidelines

- Code in **ES6+**
- Document public functions with **JSDoc**
- Test before submitting
- Follow existing naming conventions

---

## 📜 License

This project is open source under the MIT License.

---

## 🎓 Learn More

### Educational Resources

- **[Complete Documentation](documentation/GAME_ENGINE_COMPLETA.md)** - Learn everything about the engine (Portuguese)
- **[Code Examples](documentation/GAME_ENGINE_COMPLETA.md#exemplos-de-uso)** - Ready snippets (Portuguese)
- **Source Code** - Explore and learn from the code

### Important Concepts

- **ECS (Entity-Component-System)** - Modular architecture
- **Game Loop** - Update → Render
- **Delta Time** - Consistency at any FPS
- **AABB Collision** - Rectangular collisions
- **Sprite Animation** - Frame-based
- **Particle Systems** - Visual effects

---

## 📞 Support

- **Bugs**: Open an [issue](https://github.com/uareke/LuminaGameEngine/issues)
- **Features**: Suggest in [discussions](https://github.com/uareke/LuminaGameEngine/discussions)
- **Documentation**: Check `/documentation`

---

## 🌟 Showcase

Share your games created with the engine! Open an issue with the `showcase` tag.

---

## 🙏 Acknowledgments

Inspirations:
- **Unity** - Interface and workflow
- **Godot** - Node/component system
- **Phaser.js** - API and structure

---

## 📊 Project Status

![Status](https://img.shields.io/badge/status-active-success)
![Commits](https://img.shields.io/github/commit-activity/m/uareke/LuminaGameEngine)
![Issues](https://img.shields.io/github/issues/uareke/LuminaGameEngine)

**Last Update**: December 2025  
**Version**: 2.0  
**Developer**: Alex Sandro Martins de Araujo

---

## 🚀 Let's Build Amazing Games!

**Start now** by opening `index.html` and creating your first game!

![Lumina Engine](https://via.placeholder.com/800x400/2a2a40/c9a0ff?text=Lumina+Engine)

> _"Illuminate your creativity, one game at a time"_ ✨

---

**Made with ❤️ using Vanilla JavaScript**
