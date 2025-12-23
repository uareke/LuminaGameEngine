# 🎮 Practical Guide - Creating a Player with Movement

<p align="center">
  <a href="PLAYER_MOVEMENT_GUIDE.md">English</a> •
  <a href="PLAYER_MOVEMENT_GUIDE.pt-BR.md">Português (Brasil)</a>
</p>

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Method 1: Using the Visual Editor](#method-1-using-the-visual-editor)
4. [Method 2: Creating via Code](#method-2-creating-via-code)
5. [Available Movement Types](#available-movement-types)
6. [Customizing Movement](#customizing-movement)
7. [Complete Examples](#complete-examples)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This guide teaches how to create a playable character (player) and add movement components in **Lumina Engine**. You'll learn:

- ✅ How to create a player using the visual editor
- ✅ How to add movement components
- ✅ Different movement types (platform, top-down, etc.)
- ✅ How to customize speed, jump, and physics
- ✅ How to make the camera follow the player

---

## ✔️ Prerequisites

Before starting, make sure you have:

1. **Lumina Engine** open in the browser
2. A **sprite/image** for your player (recommended: 32x32px or 64x64px)
3. Basic knowledge of the editor interface

---

## 🖱️ Method 1: Using the Visual Editor

### **Step 1: Add an Asset (Player Sprite)**

1. **Open the Assets Panel** (bottom left)
2. Click **"+ Add Asset"**
3. **Upload** your player image
4. Name the asset (e.g., `player_sprite`)
5. (Optional) Configure animations if you have a sprite sheet

---

### **Step 2: Create the Player Entity**

1. In the **toolbar** (top), click **"+ Create"**
2. Select **"Player"** from the dropdown
3. A new entity will be created on the canvas

**Or use the shortcut:**
- Right-click on canvas → **"Create Entity"** → **"Player"**

---

### **Step 3: Add the Sprite**

1. **Select the Player entity** on canvas or in hierarchy
2. In the **Properties Panel** (right), you'll see the components
3. If there's no `SpriteComponent`:
   - Click **"+ Add Component"**
   - Select **"SpriteComponent"**
4. In `SpriteComponent`:
   - **Asset ID**: Select `player_sprite` (the asset you created)
   - **Width/Height**: Adjust size (e.g., 32x32)

---

### **Step 4: Add Collision Component**

For the player to interact with the world:

1. With the player selected, click **"+ Add Component"**
2. Select **"CollisionComponent"**
3. Configure:
   - **Width**: 32 (same as sprite)
   - **Height**: 32
   - **Is Solid**: ✅ (checked)
   - **Offset X/Y**: 0, 0

---

### **Step 5: Add Movement**

#### **Option A: Platform Movement (Sidescroller)**

1. Click **"+ Add Component"**
2. Select **"ScriptComponent"**
3. In **"Script Name"**, choose **"script_plataforma"**
4. Configure the properties:

```javascript
// Available Properties:
{
    velocidade: 200,          // Horizontal speed (px/s)
    forcaPulo: 400,           // Jump force (px/s)
    gravidade: 980,           // Gravity (px/s²)
    aceleracaoAr: 0.8,        // Air control (0-1)
    fricaoChao: 0.8,          // Ground friction (0-1)
    coyoteTime: 0.1,          // Extra time to jump after ledge (s)
    jumpBuffer: 0.1           // Jump input buffer (s)
}
```

**Default controls:**
- **Arrow Keys Left/Right** or **A/D**: Move
- **Space** or **Up Arrow** or **W**: Jump

---

#### **Option B: Top-Down Movement (RPG/Roguelike)**

1. Click **"+ Add Component"**
2. Select **"ScriptComponent"**
3. In **"Script Name"**, choose **"script_topdown"**
4. Configure:

```javascript
{
    velocidade: 150,          // Movement speed (px/s)
    diagonal: true,           // Allow diagonal movement
    normalizarDiagonal: true  // Normalize diagonal speed
}
```

**Default controls:**
- **WASD** or **Arrow Keys**: Move in 4/8 directions

---

#### **Option C: Movement with Dash**

1. Choose **"script_dash"**
2. Configure:

```javascript
{
    velocidade: 200,
    velocidadeDash: 500,      // Dash speed
    duracaoDash: 0.2,         // Dash duration (s)
    cooldownDash: 1.0         // Cooldown time (s)
}
```

**Controls:**
- **Shift** + **Direction**: Dash

---

### **Step 6: Make Camera Follow Player**

To make the camera track the player:

1. With the player selected, add **"CameraFollowComponent"**
2. Configure:

```javascript
{
    suavizacao: 0.1,          // Follow smoothness (0-1)
    offsetX: 0,               // Horizontal offset
    offsetY: -50              // Vertical offset (camera slightly above)
}
```

---

### **Step 7: Test**

1. Click **"▶ Play"** in the toolbar
2. Use arrows/WASD to move
3. Space to jump (if platform)
4. **Adjust** properties in real-time if needed

---

## 💻 Method 2: Creating via Code

If you prefer to create the player programmatically:

### **Complete Code - Platform Player**

```javascript
// Import necessary classes (if using modules)
import { Entidade } from './entidades/Entidade.js';
import { SpriteComponent } from './componentes/SpriteComponent.js';
import { CollisionComponent } from './componentes/CollisionComponent.js';
import { ScriptComponent } from './componentes/ScriptComponent.js';
import { CameraFollowComponent } from './componentes/CameraFollowComponent.js';

// 1. Create player entity
const player = new Entidade('player');
player.nome = 'Player';
player.x = 100;      // Initial X position
player.y = 100;      // Initial Y position
player.largura = 32;
player.altura = 32;

// 2. Add sprite
const spriteComp = new SpriteComponent();
spriteComp.assetId = 'player_sprite';  // ID of loaded asset
spriteComp.largura = 32;
spriteComp.altura = 32;
player.adicionarComponente('SpriteComponent', spriteComp);

// 3. Add collision
const collisionComp = new CollisionComponent();
collisionComp.largura = 32;
collisionComp.altura = 32;
collisionComp.isSolid = true;
player.adicionarComponente('CollisionComponent', collisionComp);

// 4. Add platform movement
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

// 5. Add camera follow
const cameraComp = new CameraFollowComponent();
cameraComp.suavizacao = 0.1;
cameraComp.offsetY = -50;
player.adicionarComponente('CameraFollowComponent', cameraComp);

// 6. Add to engine
engine.entidades.push(player);
```

---

### **Complete Code - Top-Down Player**

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

// Collision
const collision = new CollisionComponent();
collision.largura = 28;  // Slightly smaller for better feel
collision.altura = 28;
collision.offsetX = 2;
collision.offsetY = 2;
collision.isSolid = true;
player.adicionarComponente('CollisionComponent', collision);

// Top-Down Movement
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

## 🎮 Available Movement Types

### **1. script_plataforma (Platform)**

**Ideal for**: 2D platform games, metroidvanias, sidescrollers

**Features**:
- ✅ Smooth horizontal movement
- ✅ Jump with gravity
- ✅ Coyote time (jump after leaving edge)
- ✅ Jump buffer (register jump before hitting ground)
- ✅ Variable air control
- ✅ Ground/wall detection

**Properties**:
```javascript
{
    velocidade: 200,          // Walking speed
    forcaPulo: 400,           // Jump height
    gravidade: 980,           // Gravity force
    aceleracaoAr: 0.8,        // Air control
    fricaoChao: 0.8,          // Deceleration
    coyoteTime: 0.1,          // Extra time post-fall
    jumpBuffer: 0.1,          // Input buffer
    velocidadeMaxQueda: 500   // Terminal velocity
}
```

---

### **2. script_topdown (Top-Down)**

**Ideal for**: RPGs, roguelikes, zelda-likes, top-down shooters

**Features**:
- ✅ Movement in 4 or 8 directions
- ✅ Optional diagonal normalization
- ✅ No gravity
- ✅ Smooth acceleration

**Properties**:
```javascript
{
    velocidade: 150,
    diagonal: true,           // Allow diagonal
    normalizarDiagonal: true, // Avoid extra speed in diagonal
    aceleracao: 0.8,          // Acceleration (0-1)
    desaceleracao: 0.9        // Deceleration (0-1)
}
```

---

### **3. script_dash (Dash)**

**Ideal for**: Games requiring dash/dodge mechanics

**Features**:
- ✅ All base movement features
- ✅ Quick dash in any direction
- ✅ Configurable cooldown
- ✅ Invulnerability during dash (optional)

**Properties**:
```javascript
{
    velocidade: 200,
    velocidadeDash: 500,
    duracaoDash: 0.2,
    cooldownDash: 1.0,
    invulneravelDash: true    // Invulnerable during dash
}
```

---

## 🎨 Customizing Movement

### **Adjusting Responsiveness**

For more responsive movement:
```javascript
{
    fricaoChao: 0.95,  // Higher = stops faster
    aceleracaoAr: 0.9  // Higher = more air control
}
```

For "heavier" movement:
```javascript
{
    fricaoChao: 0.7,   // Lower = slides more
    aceleracaoAr: 0.5  // Lower = less air control
}
```

---

### **Adjusting Jump**

High and floaty jump (Mario style):
```javascript
{
    forcaPulo: 500,
    gravidade: 800,
    velocidadeMaxQueda: 400
}
```

Low and heavy jump (Mega Man style):
```javascript
{
    forcaPulo: 350,
    gravidade: 1200,
    velocidadeMaxQueda: 600
}
```

---

## 📝 Complete Examples

### **Example 1: Classic Platform (Mario Style)**

```javascript
const player = new Entidade('player');
player.x = 100;
player.y = 100;

// Sprite (32x32 Mario-like)
const sprite = new SpriteComponent();
sprite.assetId = 'mario_sprite';
player.adicionarComponente('SpriteComponent', sprite);

// Collision
const collision = new CollisionComponent();
collision.largura = 32;
collision.altura = 32;
collision.isSolid = true;
player.adicionarComponente('CollisionComponent', collision);

// Movement - Mario-style configuration
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

### **Example 2: RPG Top-Down (Zelda Style)**

```javascript
const player = new Entidade('player');
player.x = 300;
player.y = 300;

// Sprite
const sprite = new SpriteComponent();
sprite.assetId = 'link_sprite';
sprite.animacaoAtual = 'idle_down';
player.adicionarComponente('SpriteComponent', sprite);

// Collision (smaller than sprite for better feel)
const collision = new CollisionComponent();
collision.largura = 24;
collision.altura = 24;
collision.offsetX = 4;
collision.offsetY = 8;
collision.isSolid = true;
player.adicionarComponente('CollisionComponent', collision);

// Top-Down Movement
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
camera.suavizacao = 0.08;  // More responsive for top-down
player.adicionarComponente('CameraFollowComponent', camera);

engine.entidades.push(player);
```

---

## 🐛 Troubleshooting

### **Problem: Player doesn't move**

**Solutions**:
1. ✅ Did you add `ScriptComponent` with movement script?
2. ✅ Confirm the script is active (`player.ativo = true`)
3. ✅ In console (F12), check for errors
4. ✅ Verify you're in **Play** mode (▶)

---

### **Problem: Player falls through floor**

**Solutions**:
1. ✅ Does the floor have `CollisionComponent`?
2. ✅ Does the floor have `isSolid = true`?
3. ✅ Does the player have `CollisionComponent`?
4. ✅ Check if collision system is active

---

### **Problem: Jump doesn't work**

**Solutions**:
1. ✅ Are you using `script_plataforma`?
2. ✅ Is `forcaPulo` greater than `gravidade`?
3. ✅ Is player touching the ground?
4. ✅ Correct jump key (Space/W/Up Arrow)?

---

### **Problem: Camera doesn't follow**

**Solutions**:
1. ✅ `CameraFollowComponent` added?
2. ✅ `suavizacao` is not 0 (use 0.1-0.2)
3. ✅ Engine's camera is active?

---

## 📚 Next Steps

Now that you've created your player, learn:

- **[Animations](03_animacoes.md)** - Animate the player (idle, walk, jump)
- **[Particles](PARTICLE_SYSTEM.md)** - Add effects (dust when running)
- **[Combat](COMBAT_SYSTEM.md)** - Implement attack and damage
- **[Enemies](ENEMY_AI.md)** - Create enemies that follow the player

---

**Created**: December 2025  
**Version**: 2.0  
**Engine**: Lumina Engine  

🎮 **Good luck creating your game!**
