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
- Open the Properties panel

### 2️⃣ Enable Gravity
In the properties panel, check:
```
☑️ Has Gravity (temGravidade)
```

### 3️⃣ Adjust Gravity Value
```
Gravity: 980    // Default Earth-like gravity
```

### 4️⃣ Test
Press **Play** ▶️ and watch your player fall!

---

## ⚙️ Gravity Settings

| Value | Effect |
|-------|--------|
| **0** | No gravity (floating) |
| **500** | Light gravity (moon-like) |
| **980** | Normal gravity (Earth) ✅ |
| **1500** | Heavy gravity (fast fall) |
| **2000** | Very heavy (instant drop) |

---

## 🎯 Common Setup

### For Platformer Games:
```
Has Gravity: ✅ Yes
Gravity: 980
Jump Force: 600
```

### For Top-Down Games:
```
Has Gravity: ❌ No
Gravity: 0
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
