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
- Abra o painel de Propriedades à direita

### 2️⃣ Encontre a Seção Physics Body
Desça até a seção **🏋️ Physics Body**

### 3️⃣ Ative a Gravidade
Marque a caixa:
```
☑️ Aplicar Gravidade
```

### 4️⃣ Testar
Pressione **Play** ▶️ e veja seu jogador cair!

---

## ⚙️ Como Funciona a Gravidade

### Na Lumina Engine:
- **Gravidade é ON/OFF** - Apenas um checkbox!
- **Valor padrão**: 980 (gravidade similar à Terra)
- **Sem ajuste manual** - O valor é fixo no código

### O que o checkbox faz:
- ✅ **Marcado** = Jogador cai com gravidade (980)
- ❌ **Desmarcado** = Jogador flutua (sem gravidade)

---

## 🎯 Casos de Uso Comuns

### Para Jogos de Plataforma:
```
☑️ Aplicar Gravidade: SIM
```
Jogador cairá e precisará de plataformas para ficar em pé.

### Para Jogos Top-Down (estilo Zelda):
```
☐ Aplicar Gravidade: NÃO
```
Jogador se move livremente sem cair.

### Para Jogos de Voo:
```
☐ Aplicar Gravidade: NÃO
```
Jogador controla movimento para cima/baixo manualmente.

---

## 💡 Notas Importantes

✅ A gravidade é **automaticamente definida como 980** quando ativada  
✅ Você **não pode mudar o valor** no editor (está no código)  
✅ Para modificar o valor da gravidade, é necessário **editar o código** em `Entidade.js`  
✅ A maioria dos jogos de plataforma funciona perfeitamente com o valor padrão 980  

---

## 🔧 Avançado: Mudando o Valor da Gravidade no Código

Se precisar de um valor diferente de gravidade, edite `entidades/Entidade.js`:

```javascript
// Linha ~49 em Entidade.js
this.gravidade = 980;  // Mude este valor

// Exemplos:
this.gravidade = 500;   // Mais leve (tipo lua)
this.gravidade = 1500;  // Mais pesada (queda rápida)
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
