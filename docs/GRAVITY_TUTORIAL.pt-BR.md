# 🌍 Tutorial de Gravidade do Player

> **Guia rápido para adicionar gravidade ao seu jogador**

---

## 📺 Tutorial em Vídeo

<div align="center">
  
[![Tutorial de Gravidade](https://img.youtube.com/vi/Tpd6zxvGj38/maxresdefault.jpg)](https://youtu.be/Tpd6zxvGj38)

**[▶️ Assistir no YouTube](https://youtu.be/Tpd6zxvGj38)**

</div>

<details>
<summary><b>🎬 Player Incorporado</b></summary>

<div align="center">
  <iframe width="800" height="450" src="https://www.youtube.com/embed/Tpd6zxvGj38?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

</details>

---

## 🚀 Passos Rápidos

### 1️⃣ Selecione Seu Player
- Clique na entidade Player na hierarquia
- Abra o painel de Propriedades

### 2️⃣ Ative a Gravidade
No painel de propriedades, marque:
```
☑️ Tem Gravidade (temGravidade)
```

### 3️⃣ Ajuste o Valor da Gravidade
```
Gravidade: 980    // Gravidade padrão similar à Terra
```

### 4️⃣ Testar
Pressione **Play** ▶️ e veja seu jogador cair!

---

## ⚙️ Configurações de Gravidade

| Valor | Efeito |
|-------|--------|
| **0** | Sem gravidade (flutuando) |
| **500** | Gravidade leve (tipo lua) |
| **980** | Gravidade normal (Terra) ✅ |
| **1500** | Gravidade pesada (queda rápida) |
| **2000** | Muito pesada (queda instant ânea) |

---

## 🎯 Configuração Comum

### Para Jogos de Plataforma:
```
Tem Gravidade: ✅ Sim
Gravidade: 980
Força do Pulo: 600
```

### Para Jogos Top-Down:
```
Tem Gravidade: ❌ Não
Gravidade: 0
```

---

## 💡 Dicas

✅ **Jogos de plataforma** precisam de gravidade  
✅ **Combine com Pulo** para movimento de plataforma  
✅ **Adicione Colisão** para parar no chão  
❌ **Jogos top-down** não precisam de gravidade  

---

## 🐛 Resolução de Problemas

### Jogador cai para sempre?
**Solução**: Adicione uma caixa de colisão no fundo (chão/plataforma)

### Jogador não cai?
**Solução**: Verifique se "Tem Gravidade" está ativado

### Jogador cai muito rápido?
**Solução**: Reduza o valor da gravidade (tente 500-800)

### Jogador cai muito devagar?
**Solução**: Aumente o valor da gravidade (tente 1200-1500)

---

## 📚 Relacionados

- **[Tutorial de Plataforma](PLATFORMER_TUTORIAL.pt-BR.md)** - Setup completo de plataforma
- **[Guia de Movimento do Jogador](PLAYER_MOVEMENT_GUIDE.pt-BR.md)** - Sistema de movimento
- **[Documentação Completa](GAME_ENGINE_COMPLETA.pt-BR.md)** - Guia completo da engine

---

<div align="center">

**Feito com ❤️ usando Lumina Engine**

</div>
