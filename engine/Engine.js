import Renderizador from './Renderizador.js';
import LoopJogo from './LoopJogo.js';

/**
 * Engine - Classe principal da game engine
 * Coordena todos os sistemas do jogo
 */
class Engine {
    constructor(canvas) {
        this.canvas = canvas;
        this.renderizador = new Renderizador(canvas);
        this.loopJogo = new LoopJogo(this);

        // Entidades do jogo
        this.entidades = [];

        // Sistema de input
        this.input = {
            teclas: {},
            teclasPrecionadas: {},
            teclasLiberadas: {}
        };

        // Controle de simulação (para o editor)
        this.simulado = true;

        this.configurarInput();
    }

    /**
     * Configura o sistema de input
     */
    configurarInput() {
        window.addEventListener('keydown', (e) => {
            // Ignora se estiver digitando em um input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            if (!this.input.teclas[e.key]) {
                this.input.teclasPrecionadas[e.key] = true;
            }
            this.input.teclas[e.key] = true;
        });

        window.addEventListener('keyup', (e) => {
            // Ignora se estiver digitando em um input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            this.input.teclas[e.key] = false;
            this.input.teclasLiberadas[e.key] = true;
        });
    }

    /**
     * Adiciona uma entidade ao jogo
     */
    adicionarEntidade(entidade) {
        entidade.engine = this;
        this.entidades.push(entidade);
        return entidade;
    }

    /**
     * Remove uma entidade do jogo
     */
    removerEntidade(entidade) {
        const index = this.entidades.indexOf(entidade);
        if (index > -1) {
            this.entidades.splice(index, 1);
        }
    }

    /**
     * Atualiza todas as entidades
     */
    atualizar(deltaTime) {
        // Se não estiver simulando, não atualiza lógica de jogo (física, scripts)
        if (!this.simulado) return;

        // Atualiza todas as entidades
        for (const entidade of this.entidades) {
            if (entidade.atualizar) {
                entidade.atualizar(deltaTime);
            }
        }

        // Limpa teclas pressionadas/liberadas neste frame
        this.input.teclasPrecionadas = {};
        this.input.teclasLiberadas = {};
    }

    /**
     * Renderiza todas as entidades
     */
    renderizar() {
        this.renderizador.limpar();

        // Prepara lista de renderização ordenada por Z-Index
        // Nota: [...this.entidades] cria uma cópia para evitar modificar a ordem de update/lógica
        const listaRender = [...this.entidades].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

        // Renderiza todas as entidades
        for (const entidade of listaRender) {
            if (entidade.renderizar) {
                entidade.renderizar(this.renderizador);
            }
        }
    }

    /**
     * Inicia a engine
     */
    iniciar() {
        this.loopJogo.iniciar();
    }

    /**
     * Para a engine
     */
    parar() {
        this.loopJogo.parar();
    }

    /**
     * Verifica se uma tecla está pressionada
     */
    teclaPressionada(tecla) {
        return this.input.teclas[tecla] || false;
    }

    /**
     * Verifica se uma tecla foi pressionada neste frame
     */
    teclaPrecionadaAgora(tecla) {
        return this.input.teclasPrecionadas[tecla] || false;
    }

    /**
     * Verifica se uma tecla foi liberada neste frame
     */
    teclaLiberadaAgora(tecla) {
        return this.input.teclasLiberadas[tecla] || false;
    }
}

export default Engine;
