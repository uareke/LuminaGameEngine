# 🌍 Player Gravity Tutorial

> **Quick guide to add gravity to your player**

---

## 📺 Video Tutorial

<div align="center">
  
[![Gravity Tutorial](https://img.youtube.com/vi/Tpd6zxvGj38/maxresdefault.jpg)](https://youtu.be/Tpd6zxvGj38)

**[▶️ Watch on YouTube](https://youtu.be/Tpd6zxvGj38)**

</div>

<details>
<summary><b>🎬 Embedded Player</b></summary>

<div align="center">
  <iframe width="800" height="450" src="https://www.youtube.com/embed/Tpd6zxvGj38?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

</details>

---

## 🚀 Quick Steps

### 1️⃣ Select Your Player
- Click on your Player entity in the hierarchy
- Open the Properties panel on the right

### 2️⃣ Find Physics Body Section
Scroll down to the **🏋️ Physics Body** section

### 3️⃣ Enable Gravity
Check the box:
```
☑️ Aplicar Gravidade (Apply Gravity)
```

### 4️⃣ Test
Press **Play** ▶️ and watch your player fall!

---

## ⚙️ How Gravity Works

### In Lumina Engine:
- **Gravity is ON/OFF** - Just a checkbox!
- **Default value**: 980 (Earth-like gravity)
- **No manual adjustment** - The value is fixed in code

### What the checkbox does:
- ✅ **Checked** = Player falls down with gravity (980)
- ❌ **Unchecked** = Player floats (no gravity)

---

## 🎯 Common Use Cases

### For Platformer Games:
```
☑️ Aplicar Gravidade: YES
```
Player will fall and need platforms to stand on.

### For Top-Down Games (Zelda-style):
```
☐ Aplicar Gravidade: NO
```
Player moves freely without falling.

### For Flying Games:
```
☐ Aplicar Gravidade: NO
```
Player controls up/down movement manually.

---

## 💡 Important Notes

✅ Gravity is **automatically set to 980** when enabled  
✅ You **cannot change the value** in the editor (it's hardcoded)  
✅ To modify gravity value, you need to **edit the code** in `Entidade.js`  
✅ Most platformer games work perfectly with the default 980 value  

---

## 🔧 Advanced: Changing Gravity Value in Code

If you need a different gravity value, edit `entidades/Entidade.js`:

```javascript
// Line ~49 in Entidade.js
this.gravidade = 980;  // Change this value

// Examples:
this.gravidade = 500;   // Lighter (moon-like)
this.gravidade = 1500;  // Heavier (faster fall)
```

---

## 💡 Tips

✅ **Platform games** need gravity  
✅ **Combine with Jump** for platformer movement  
✅ **Add Collision** to stop at ground  
❌ **Top-down games** don't need gravity  

---

## 🐛 Troubleshooting

### Player falls forever?
**Solution**: Add a collision box at the bottom (ground/platform)

### Player doesn't fall?
**Solution**: Check if "Has Gravity" is enabled

### Player falls too fast?
**Solution**: Reduce the gravity value (try 500-800)

### Player falls too slow?
**Solution**: Increase the gravity value (try 1200-1500)

---

## 📚 Related

- **[Platformer Tutorial](PLATFORMER_TUTORIAL.md)** - Complete platformer setup
- **[Player Movement Guide](PLAYER_MOVEMENT_GUIDE.md)** - Movement system
- **[Complete Documentation](GAME_ENGINE_COMPLETE.md)** - Full engine guide

---

<div align="center">

**Made with ❤️ using Lumina Engine**

</div>
