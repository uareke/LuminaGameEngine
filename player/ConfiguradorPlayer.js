import MovimentacaoBasica from '../movimentacao/tipos/MovimentacaoBasica.js';
import MovimentacaoCorrida from '../movimentacao/tipos/MovimentacaoCorrida.js';
import MovimentacaoDash from '../movimentacao/tipos/MovimentacaoDash.js';
import MovimentacaoPlataforma from '../movimentacao/tipos/MovimentacaoPlataforma.js';
import GeradorScript from '../movimentacao/GeradorScript.js';

/**
 * ConfiguradorPlayer - Interface para configurar o player
 * Permite selecionar tipo de movimentação e ajustar parâmetros
 */
class ConfiguradorPlayer {
    constructor(player) {
        this.player = player;
        this.geradorScript = new GeradorScript();

        // Tipos de movimentação disponíveis
        this.tiposMovimentacao = {
            'basica': () => new MovimentacaoBasica(),
            'corrida': () => new MovimentacaoCorrida(),
            'dash': () => new MovimentacaoDash(),
            'plataforma': () => new MovimentacaoPlataforma()
        };

        this.tipoAtual = 'basica';
    }

    /**
     * Cria a interface de configuração
     */
    criarInterface(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} não encontrado`);
            return;
        }

        container.innerHTML = `
            <div class="configurador-container">
                <h2>⚙️ Configuração do Player</h2>
                
                <div class="secao">
                    <h3>Tipo de Movimentação</h3>
                    <select id="tipo-movimentacao" class="input-select">
                        <option value="basica">Movimentação Básica</option>
                        <option value="corrida">Movimentação com Corrida</option>
                        <option value="dash">Movimentação com Dash</option>
                        <option value="plataforma">Movimentação Plataforma</option>
                    </select>
                </div>

                <div class="secao">
                    <h3>Aparência</h3>
                    <div class="parametro-grupo">
                        <label>Cor:</label>
                        <input type="color" id="player-cor" value="${this.player.cor}" />
                    </div>
                    <div class="parametro-grupo">
                        <label>Tamanho:</label>
                        <input type="range" id="player-tamanho" min="16" max="64" value="${this.player.largura}" />
                        <span id="tamanho-valor">${this.player.largura}px</span>
                    </div>
                </div>

                <div class="secao" id="parametros-container">
                    <!-- Parâmetros dinâmicos serão inseridos aqui -->
                </div>

                <div class="secao acoes">
                    <button id="btn-aplicar" class="btn btn-primary">✓ Aplicar Configurações</button>
                    <button id="btn-gerar-script" class="btn btn-success">📄 Gerar Script</button>
                </div>

                <div class="secao status" id="status-container"></div>
            </div>
        `;

        this.configurarEventos();
        this.atualizarParametros();
    }

    /**
     * Configura eventos da interface
     */
    configurarEventos() {
        // Seleção de tipo
        document.getElementById('tipo-movimentacao').addEventListener('change', (e) => {
            this.tipoAtual = e.target.value;
            this.atualizarParametros();
        });

        // Cor do player
        document.getElementById('player-cor').addEventListener('input', (e) => {
            this.player.definirCor(e.target.value);
        });

        // Tamanho do player
        document.getElementById('player-tamanho').addEventListener('input', (e) => {
            const tamanho = parseInt(e.target.value);
            this.player.definirTamanho(tamanho, tamanho);
            document.getElementById('tamanho-valor').textContent = tamanho + 'px';
        });

        // Botão aplicar
        document.getElementById('btn-aplicar').addEventListener('click', () => {
            this.aplicarConfiguracao();
        });

        // Botão gerar script
        document.getElementById('btn-gerar-script').addEventListener('click', () => {
            this.gerarScript();
        });
    }

    /**
     * Atualiza os parâmetros dinâmicos baseados no tipo selecionado
     */
    atualizarParametros() {
        const container = document.getElementById('parametros-container');
        const movimentacao = this.tiposMovimentacao[this.tipoAtual]();
        const params = movimentacao.obterParametros();

        let html = '<h3>Parâmetros</h3>';

        for (const [nome, valor] of Object.entries(params)) {
            const id = `param-${nome}`;
            html += `
                <div class="parametro-grupo">
                    <label>${this.formatarNomeParametro(nome)}:</label>
                    <input type="number" id="${id}" value="${valor}" step="${typeof valor === 'number' && valor < 10 ? '0.1' : '10'}" />
                </div>
            `;
        }

        container.innerHTML = html;
    }

    /**
     * Formata o nome do parâmetro para exibição
     */
    formatarNomeParametro(nome) {
        const mapa = {
            'velocidade': 'Velocidade',
            'velocidadeNormal': 'Velocidade Normal',
            'velocidadeCorrida': 'Velocidade Corrida',
            'velocidadeDash': 'Velocidade Dash',
            'velocidadeHorizontal': 'Velocidade Horizontal',
            'forcaPulo': 'Força do Pulo',
            'gravidade': 'Gravidade',
            'duracaoDash': 'Duração do Dash (s)',
            'cooldownDash': 'Cooldown do Dash (s)',
            'alturaChao': 'Altura do Chão',
            'teclaCorrida': 'Tecla Corrida',
            'teclaDash': 'Tecla Dash',
            'teclaPulo': 'Tecla Pulo'
        };
        return mapa[nome] || nome;
    }

    /**
     * Aplica a configuração ao player
     */
    aplicarConfiguracao() {
        const movimentacao = this.tiposMovimentacao[this.tipoAtual]();
        const params = movimentacao.obterParametros();

        // Atualiza parâmetros com valores da interface
        for (const nome of Object.keys(params)) {
            const input = document.getElementById(`param-${nome}`);
            if (input) {
                const valor = parseFloat(input.value);
                movimentacao.definirParametro(nome, valor);
            }
        }

        // Aplica ao player
        this.player.definirMovimentacao(movimentacao);

        this.mostrarStatus('✓ Configuração aplicada com sucesso!', 'success');
        console.log('[ConfiguradorPlayer] Movimentação aplicada:', movimentacao.nome);
    }

    /**
     * Gera o script da movimentação atual
     */
    gerarScript() {
        if (!this.player.movimentacao) {
            this.mostrarStatus('⚠ Aplique uma configuração primeiro!', 'warning');
            return;
        }

        const script = this.geradorScript.gerar(this.player.movimentacao);

        // Mostra o script em uma modal
        this.mostrarModalScript(script);
    }

    /**
     * Mostra modal com o script gerado
     */
    mostrarModalScript(script) {
        // Remove modal existente se houver
        const modalExistente = document.getElementById('modal-script');
        if (modalExistente) {
            modalExistente.remove();
        }

        const modal = document.createElement('div');
        modal.id = 'modal-script';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>📄 Script Gerado</h2>
                    <button class="btn-fechar" id="fechar-modal">×</button>
                </div>
                <div class="modal-body">
                    <pre><code class="language-javascript">${this.escapeHtml(script)}</code></pre>
                </div>
                <div class="modal-footer">
                    <button id="btn-copiar" class="btn btn-secondary">📋 Copiar</button>
                    <button id="btn-baixar" class="btn btn-primary">💾 Baixar</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Eventos da modal
        document.getElementById('fechar-modal').addEventListener('click', () => {
            modal.remove();
        });

        document.getElementById('btn-copiar').addEventListener('click', () => {
            navigator.clipboard.writeText(script);
            this.mostrarStatus('📋 Script copiado!', 'success');
        });

        document.getElementById('btn-baixar').addEventListener('click', () => {
            const nomeArquivo = `movimentacao_${this.tipoAtual}_${Date.now()}.js`;
            this.geradorScript.baixar(nomeArquivo, script);
            this.mostrarStatus('💾 Script baixado!', 'success');
        });

        // Fecha ao clicar fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    /**
     * Mostra mensagem de status
     */
    mostrarStatus(mensagem, tipo = 'info') {
        const container = document.getElementById('status-container');
        container.innerHTML = `<div class="status-${tipo}">${mensagem}</div>`;

        setTimeout(() => {
            container.innerHTML = '';
        }, 3000);
    }

    /**
     * Escapa HTML para exibição segura
     */
    escapeHtml(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }
}

export default ConfiguradorPlayer;
