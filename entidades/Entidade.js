/**
 * Entidade.js - Classe base para objetos do jogo
 */

import { SpriteComponent } from '../componentes/SpriteComponent.js';

class Entidade {
    constructor(id, nome, x, y) {
        this.id = id;
        this.nome = nome || 'Nova Entidade';
        this.x = x || 0;
        this.y = y || 0;
        this.largura = 32;
        this.altura = 32;
        this.rotacao = 0;
        this.zIndex = 0; // Profundidade

        // Física
        this.velocidadeX = 0;
        this.velocidadeY = 0;
        this.gravidade = 0; // Gravidade individual
        this.temGravidade = false;
        this.noChao = false;
        this.solido = false;

        this.startX = x; // Spawn Point
        this.startY = y;

        this.componentes = new Map();
        this.tags = []; // Tags para identificação (ex: 'player', 'inimigo')

        // Referência à engine/cena
        this.engine = null;
        this.pastaId = null; // ID da pasta pai

        // Editor
        this.selecionado = false;
        this.cor = '#ff00ff'; // Cor padrão
        this.opacidade = 1.0; // Opacidade (0 a 1)
    }

    adicionarComponente(arg1, arg2) {
        let componente = arg1;
        let chave = null;

        // Suporte para chamada da Factory: adicionarComponente('Nome', instancia)
        // Se arg1 for string e arg2 existir, usaremos arg1 como chave
        if (typeof arg1 === 'string' && arg2) {
            chave = arg1;
            componente = arg2;
        } else if (componente && componente.tipo) {
            chave = componente.tipo;
        }

        if (!componente || !chave) return;

        if (componente.inicializar) {
            componente.inicializar(this);
        } else {
            componente.entidade = this;
        }

        this.componentes.set(chave, componente);
    }

    removerComponente(tipo) {
        const comp = this.componentes.get(tipo);
        if (comp && comp.destruir) {
            comp.destruir();
        }
        this.componentes.delete(tipo);
    }

    obterComponente(tipo) {
        return this.componentes.get(tipo);
    }

    temComponente(tipo) {
        return this.componentes.has(tipo);
    }

    obterComponentesPorTipo(tipo) {
        const lista = [];
        for (const comp of this.componentes.values()) {
            if (comp.tipo === tipo) {
                lista.push(comp);
            }
        }
        return lista;
    }

    /**
     * Helper para encontrar um Script específico pelo nome da classe
     * Ex: entidade.obterScript('FloatingTextScript')
     */
    obterScript(nomeScript) {
        for (const comp of this.componentes.values()) {
            if (comp.tipo === 'ScriptComponent' && comp.instance) {
                // Verifica nome da classe ou nome do script salvo
                if (comp.instance.constructor.name === nomeScript || comp.scriptName === nomeScript) {
                    return comp.instance;
                }
            }
        }
        return null;
    }

    /**
     * Atualiza a entidade (Física e Componentes)
     */
    atualizar(deltaTime) {
        // --- SISTEMA DE FÍSICA ---
        // Aplicar Gravidade
        if (this.temGravidade) {
            this.velocidadeY += this.gravidade * deltaTime;
        }

        // Aplicar velocidade
        this.x += this.velocidadeX * deltaTime;
        this.y += this.velocidadeY * deltaTime;

        // Proteção NaN Física (Silenciosa)
        if (isNaN(this.y)) {
            this.x = this.startX || 0;
            this.y = this.startY || 0;
            this.velocidadeY = 0;
            this.velocidadeX = 0;
        }

        // Atualizar componentes
        for (const componente of this.componentes.values()) {
            if (componente.atualizar) {
                try {
                    componente.atualizar(this, deltaTime);

                    // Proteção NaN Pós-Componente
                    if (isNaN(this.y)) {
                        this.x = this.startX || 0;
                        this.y = this.startY || 0;
                        this.velocidadeY = 0;
                        this.velocidadeX = 0;
                    }
                } catch (err) {
                    // Erros de componente não devem travar o jogo, apenas logar
                    console.error(`Erro comp: ${componente.constructor.name}`, err);
                }
            }
        }

        // Limite simples de chão (fallback) - 2000px
        const limiteChao = 2000;
        const bounds = this.obterLimites();

        if (this.temGravidade && bounds.baixo > limiteChao) {
            const diff = bounds.baixo - limiteChao;
            this.y -= diff;
            this.velocidadeY = 0;
            this.noChao = true;
        }
    }

    renderizar(renderizador, modoEdicao = false) {
        let desenhou = false;

        // Aplicar Opacidade Global
        const ctx = renderizador.ctx;
        ctx.save();
        if (this.opacidade !== undefined) ctx.globalAlpha = this.opacidade;

        // Renderiza cada componente visual
        for (const componente of this.componentes.values()) {
            if (componente.renderizar) {
                const resultado = componente.renderizar(renderizador, this.x, this.y, this.largura, this.altura, this.rotacao);
                if (resultado) desenhou = true;
            }
        }
        ctx.restore();

        // Fallback: Se nenhum componente desenhou nada (e.g. sem sprite), desenha um retângulo
        if (!desenhou) {
            const ctx = renderizador.ctx;
            ctx.save();
            ctx.translate(this.x + this.largura / 2, this.y + this.altura / 2);
            ctx.rotate(this.rotacao);
            ctx.fillStyle = this.cor || '#ff00ff';
            ctx.fillRect(-this.largura / 2, -this.altura / 2, this.largura, this.altura);
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1;
            ctx.strokeRect(-this.largura / 2, -this.altura / 2, this.largura, this.altura);
            ctx.restore();
        }

        // GIZMOS DO EDITOR (seleção e handles)
        if (modoEdicao && this.selecionado) {
            const ctx = renderizador.ctx;
            ctx.save();

            // Caixa de seleção azul
            ctx.strokeStyle = '#00ffff';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x, this.y, this.largura, this.altura);

            // Handles nos cantos (quadrados brancos)
            const handleSize = 8;
            ctx.fillStyle = '#ffffff';

            // Top-Left
            ctx.fillRect(this.x - handleSize / 2, this.y - handleSize / 2, handleSize, handleSize);
            // Top-Right
            ctx.fillRect(this.x + this.largura - handleSize / 2, this.y - handleSize / 2, handleSize, handleSize);
            // Bottom-Left
            ctx.fillRect(this.x - handleSize / 2, this.y + this.altura - handleSize / 2, handleSize, handleSize);
            // Bottom-Right
            ctx.fillRect(this.x + this.largura - handleSize / 2, this.y + this.altura - handleSize / 2, handleSize, handleSize);

            ctx.restore();
        }
    }

    obterLimites() {
        return {
            esquerda: this.x,
            direita: this.x + this.largura,
            topo: this.y,
            baixo: this.y + this.altura
        };
    }

    obterCentro() {
        return {
            x: this.x + this.largura / 2,
            y: this.y + this.altura / 2
        };
    }

    /**
     * Define um ponto de checkpoint para a entidade
     */
    setCheckpoint(x, y) {
        this.checkpoint = { x, y };
    }

    /**
     * Verifica se um ponto está dentro da entidade
     */
    contemPonto(x, y) {
        return x >= this.x && x <= this.x + this.largura &&
            y >= this.y && y <= this.y + this.altura;
    }

    /**
     * Verifica se clicou em um handle de manipulação (Resize/Rotate)
     * Retorna código do handle ou null
     */
    verificarHandle(x, y) {
        if (!this.selecionado) return null;

        const handleSize = 8 / (this.engine?.camera?.zoom || 1);
        const tolerancia = handleSize;

        // Handles de Resize (Cantos)
        const corners = {
            tl: { x: this.x, y: this.y },
            tr: { x: this.x + this.largura, y: this.y },
            bl: { x: this.x, y: this.y + this.altura },
            br: { x: this.x + this.largura, y: this.y + this.altura }
        };

        for (const [key, pos] of Object.entries(corners)) {
            if (x >= pos.x - tolerancia && x <= pos.x + tolerancia &&
                y >= pos.y - tolerancia && y <= pos.y + tolerancia) {
                return key;
            }
        }

        return null;
    }

    serializar() {
        const componentesSerializados = [];
        for (const componente of this.componentes.values()) {
            if (componente.serializar) {
                componentesSerializados.push(componente.serializar());
            }
        }

        return {
            id: this.id,
            nome: this.nome,
            tipo: this.tipo,
            x: this.x,
            y: this.y,
            largura: this.largura,
            altura: this.altura,
            rotacao: this.rotacao,
            zIndex: this.zIndex,
            temGravidade: this.temGravidade,
            gravidade: this.gravidade,
            solido: this.solido,
            pastaId: this.pastaId,
            cor: this.cor,
            opacidade: this.opacidade,
            tags: this.tags,
            componentes: componentesSerializados
        };
    }

    /**
     * Método estático para criar uma entidade a partir de dados serializados
     */
    static desserializar(dados) {
        const entidade = new Entidade(
            dados.id,
            dados.nome,
            dados.x,
            dados.y
        );

        entidade.tipo = dados.tipo || 'objeto'; // Restaura o tipo
        entidade.largura = dados.largura || 32;
        entidade.altura = dados.altura || 32;
        entidade.rotacao = dados.rotacao || 0;
        entidade.zIndex = dados.zIndex || 0;
        entidade.temGravidade = dados.temGravidade || false;
        entidade.gravidade = dados.gravidade || 0;
        entidade.solido = dados.solido || false;
        entidade.pastaId = dados.pastaId;
        entidade.cor = dados.cor || '#ff00ff';
        entidade.opacidade = dados.opacidade !== undefined ? Number(dados.opacidade) : 1.0;
        entidade.tags = dados.tags || [];

        // Spawn point
        entidade.startX = dados.x;
        entidade.startY = dados.y;

        // Reset physics
        entidade.velocidadeX = 0;
        entidade.velocidadeY = 0;
        entidade.noChao = false;

        // NOTA: Componentes NÃO são restaurados aqui
        // O EditorPrincipal ou quem chama deve recriar componentes se necessário

        return entidade;
    }

    morrer() {
        //console.log(`[Entidade] ${this.nome} morreu!`);

        // 1. Tentar encontrar hooks de script (onDeath)
        let customDealt = false;
        const scriptComp = this.obterComponente('ScriptComponent');
        if (scriptComp && scriptComp.instance && typeof scriptComp.instance.onDeath === 'function') {
            // O script customizado pode retornar true para impedir o comportamento padrão
            const preventDefault = scriptComp.instance.onDeath(this);
            if (preventDefault) customDealt = true;
        }

        if (customDealt) return;

        // 2. Comportamento Padrão: Respawn se for Player, ou Destruição se for outro
        const isPlayer = this.nome === 'Player' || this.tipo === 'player';

        if (isPlayer) {
            // Lógica de Respawn do Player
            let targetX = this.startX || 0;
            let targetY = this.startY || 0;

            // Checkpoint (se houver)
            if (this.checkpoint) {
                targetX = this.checkpoint.x;
                targetY = this.checkpoint.y;
                // console.log('[Entidade] Respawning at Checkpoint:', targetX, targetY);
            } else {
                // console.log('[Entidade] Respawning at Start:', targetX, targetY);
            }

            this.x = targetX;
            this.y = targetY;
            this.velocidadeX = 0;
            this.velocidadeY = 0;
            this.noChao = true;

            // Debounce/Invencibilidade opcional?
            this._lastDeath = Date.now();
        } else {
            // Para inimigos/outirolas, o padrão é destruir
            //console.log('[Entidade] Destruindo entidade não-player.');
            if (this.engine) {
                this.engine.removerEntidade(this);
            }
        }
    }

    destruir() {
        // Limpar componentes
        for (const componente of this.componentes.values()) {
            if (componente.destruir) componente.destruir();
        }
        this.componentes.clear();
        this.engine = null;
    }
}

export default Entidade;
