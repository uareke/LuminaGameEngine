/**
 * Player - Entidade controlável do jogador
 * Integra máquina de estados e sistema de movimentação
 */
class Player {
    constructor(x, y) {
        // Posição
        this.x = x;
        this.y = y;

        // Dimensões
        this.largura = 32;
        this.altura = 32;

        // Cor
        this.cor = '#4ecdc4';

        // Velocidade
        this.velocidadeX = 0;
        this.velocidadeY = 0;

        // Sistema de movimentação (será definido externamente)
        this.movimentacao = null;

        // Referência à engine
        this.engine = null;
    }

    /**
     * Define o sistema de movimentação
     */
    definirMovimentacao(movimentacao) {
        this.movimentacao = movimentacao;
        this.movimentacao.inicializar(this);
        return this;
    }

    /**
     * Atualiza o player
     */
    atualizar(deltaTime) {
        if (this.movimentacao && this.engine) {
            // Processa input
            this.movimentacao.processarInput(this, this.engine.input);

            // Atualiza movimentação
            this.movimentacao.atualizar(this, deltaTime);
        }
    }

    /**
     * Renderiza o player
     */
    renderizar(renderizador) {
        // Desenha o player como retângulo
        renderizador.desenharRetangulo(this.x, this.y, this.largura, this.altura, this.cor);

        // Mostra estado atual
        if (this.movimentacao) {
            const estado = this.movimentacao.obterEstadoAtual();
            if (estado) {
                renderizador.desenharTexto(
                    estado.toUpperCase(),
                    this.x + this.largura / 2,
                    this.y - 10,
                    '#ffffff',
                    12,
                    'center'
                );
            }
        }
    }

    /**
     * Define a cor do player
     */
    definirCor(cor) {
        this.cor = cor;
        return this;
    }

    /**
     * Define o tamanho do player
     */
    definirTamanho(largura, altura) {
        this.largura = largura;
        this.altura = altura;
        return this;
    }

    /**
     * Retorna informações do player
     */
    obterInfo() {
        return {
            posicao: { x: this.x, y: this.y },
            tamanho: { largura: this.largura, altura: this.altura },
            cor: this.cor,
            movimentacao: this.movimentacao ? this.movimentacao.obterInfo() : null
        };
    }
}

export default Player;
