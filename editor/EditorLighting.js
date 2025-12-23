/**
 * EditorLighting - Editor visual de iluminação
 * Modal para configurar iluminação e presets
 */
export class EditorLighting {
    constructor(editor) {
        this.editor = editor;
        this.lightingSystem = editor.lightingSystem;
        this.presetManager = editor.lightingPresetManager;

        this.criarModal();
    }

    criarModal() {
        // Criar modal HTML
        const modal = document.createElement('div');
        modal.id = 'lighting-editor-modal';
        modal.className = 'modal hidden';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;

        modal.innerHTML = `
            <div style="
                background: #1a1a2e;
                border: 2px solid #4ecdc4;
                border-radius: 8px;
                padding: 25px;
                width: 700px;
                max-width: 90vw;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 8px 32px rgba(0,0,0,0.9);
            ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="color: #4ecdc4; margin: 0;">💡 Editor de Iluminação</h2>
                <button id="btn-close-lighting" style="background: #ff6b6b; color: white; border: none; padding: 5px 15px; border-radius: 4px; cursor: pointer;">✕</button>
            </div>

            <!-- Seção de Presets -->
            <div style="margin-bottom: 25px;">
                <h3 style="color: #fff; margin-bottom: 10px;">🎨 Presets de Ambiente</h3>
                <select id="lighting-preset-select" style="width: 100%; padding: 8px; background: #222; color: #fff; border: 1px solid #4ecdc4; border-radius: 4px; margin-bottom: 10px;">
                    <option value="">-- Selecione um Preset --</option>
                </select>
                <button id="btn-apply-preset" style="width: 100%; padding: 10px; background: #4ecdc4; color: #000; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Aplicar Preset</button>
            </div>

            <hr style="border: 1px solid #333; margin: 20px 0;">

            <!-- Configurações Globais -->
            <div style="margin-bottom: 25px;">
                <h3 style="color: #fff; margin-bottom: 15px;">🌍 Configurações Globais</h3>
                
                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; color: #ccc;">
                    <input type="checkbox" id="lighting-ativo" checked>
                    Sistema de Iluminação Ativo
                </label>

                <div style="margin-bottom: 15px;">
                    <label style="color: #ccc; display: block; margin-bottom: 5px;">Cor da Escuridão</label>
                    <input type="color" id="lighting-cor-ambiente" value="#000000" style="width: 100%; height: 40px; border: 1px solid #4ecdc4; border-radius: 4px;">
                </div>

                <div style="margin-bottom: 15px;">
                    <label style="color: #ccc; display: block; margin-bottom: 5px;">
                        Intensidade da Escuridão: <span id="val-intensidade-ambiente">0.10</span>
                    </label>
                    <input type="range" id="lighting-intensidade-ambiente" min="0" max="1" step="0.05" value="0.1" style="width: 100%;">
                    <small style="color: #888;">0 = Escuridão Total | 1 = Totalmente Claro</small>
                </div>

                <div style="margin-bottom: 15px;">
                    <label style="color: #ccc; display: block; margin-bottom: 5px;">
                        Tamanho da Área Escura: <span id="val-escala">2.0</span>x
                    </label>
                    <input type="range" id="lighting-escala" min="1" max="5" step="0.5" value="2" style="width: 100%;">
                    <small style="color: #888;">1x = Tela | 5x = Enorme</small>
                </div>
            </div>

            <hr style="border: 1px solid #333; margin: 20px 0;">

            <!-- Configuração de Luz Padrão -->
            <div style="margin-bottom: 25px;">
                <h3 style="color: #fff; margin-bottom: 15px;">🔦 Luz Padrão (Para Novas Entidades)</h3>
                
                <div style="margin-bottom: 15px;">
                    <label style="color: #ccc; display: block; margin-bottom: 5px;">Tipo de Luz</label>
                    <select id="luz-tipo" style="width: 100%; padding: 8px; background: #222; color: #fff; border: 1px solid #4ecdc4; border-radius: 4px;">
                        <option value="point">💡 Point Light (Radial)</option>
                        <option value="spotlight">🔦 Spotlight (Direcional)</option>
                        <option value="ambient">🌍 Ambient (Global)</option>
                    </select>
                </div>

                <div style="margin-bottom: 15px;">
                    <label style="color: #ccc; display: block; margin-bottom: 5px;">Cor da Luz</label>
                    <input type="color" id="luz-cor" value="#ffdd88" style="width: 100%; height: 40px; border: 1px solid #4ecdc4; border-radius: 4px;">
                </div>

                <div style="margin-bottom: 15px;">
                    <label style="color: #ccc; display: block; margin-bottom: 5px;">
                        Raio: <span id="val-raio">250</span>px
                    </label>
                    <input type="range" id="luz-raio" min="50" max="500" step="10" value="250" style="width: 100%;">
                </div>

                <div style="margin-bottom: 15px;">
                    <label style="color: #ccc; display: block; margin-bottom: 5px;">
                        Intensidade: <span id="val-intensidade">1.5</span>
                    </label>
                    <input type="range" id="luz-intensidade" min="0" max="3" step="0.1" value="1.5" style="width: 100%;">
                </div>

                <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; color: #ccc;">
                    <input type="checkbox" id="luz-flickering">
                    Luz Tremulante (Tocha/Fogo)
                </label>

                <div id="flicker-controls" style="display: none; padding-left: 20px;">
                    <div style="margin-bottom: 10px;">
                        <label style="color: #ccc; display: block; margin-bottom: 5px;">
                            Velocidade: <span id="val-flicker-speed">5.0</span>
                        </label>
                        <input type="range" id="luz-flicker-speed" min="1" max="15" step="0.5" value="5" style="width: 100%;">
                    </div>
                    <div style="margin-bottom: 10px;">
                        <label style="color: #ccc; display: block; margin-bottom: 5px;">
                            Intensidade da Tremulação: <span id="val-flicker-amount">0.2</span>
                        </label>
                        <input type="range" id="luz-flicker-amount" min="0" max="1" step="0.05" value="0.2" style="width: 100%;">
                    </div>
                </div>
            </div>

            <hr style="border: 1px solid #333; margin: 20px 0;">

            <!-- Ações -->
            <div style="display: flex; gap: 10px;">
                <button id="btn-add-light-to-player" style="flex: 1; padding: 12px; background: #ffaa00; color: #000; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                    🔦 Adicionar Luz ao Player
                </button>
                <button id="btn-add-light-to-selected" style="flex: 1; padding: 12px; background: #4ecdc4; color: #000; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                    ✨ Adicionar à Entidade Selecionada
                </button>
            </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.modal = modal;

        this.setupEventListeners();
        this.carregarPresets();
    }

    setupEventListeners() {
        // Fechar modal
        document.getElementById('btn-close-lighting').addEventListener('click', () => {
            this.fechar();
        });

        // Carregar presets no select
        const presetSelect = document.getElementById('lighting-preset-select');

        // Aplicar preset
        document.getElementById('btn-apply-preset').addEventListener('click', () => {
            const presetId = presetSelect.value;
            if (presetId) {
                this.aplicarPreset(presetId);
            }
        });

        // Configurações globais
        document.getElementById('lighting-ativo').addEventListener('change', (e) => {
            this.lightingSystem.setAtivo(e.target.checked);
        });

        document.getElementById('lighting-cor-ambiente').addEventListener('input', (e) => {
            this.lightingSystem.setAmbiente(
                e.target.value,
                parseFloat(document.getElementById('lighting-intensidade-ambiente').value)
            );
        });

        document.getElementById('lighting-intensidade-ambiente').addEventListener('input', (e) => {
            document.getElementById('val-intensidade-ambiente').textContent = e.target.value;
            this.lightingSystem.setAmbiente(
                document.getElementById('lighting-cor-ambiente').value,
                parseFloat(e.target.value)
            );
        });

        document.getElementById('lighting-escala').addEventListener('input', (e) => {
            document.getElementById('val-escala').textContent = e.target.value;
            this.lightingSystem.escala = parseFloat(e.target.value);
            this.lightingSystem.atualizarTamanho();
        });

        // Controles de luz padrão
        document.getElementById('luz-raio').addEventListener('input', (e) => {
            document.getElementById('val-raio').textContent = e.target.value;
        });

        document.getElementById('luz-intensidade').addEventListener('input', (e) => {
            document.getElementById('val-intensidade').textContent = e.target.value;
        });

        document.getElementById('luz-flickering').addEventListener('change', (e) => {
            document.getElementById('flicker-controls').style.display = e.target.checked ? 'block' : 'none';
        });

        document.getElementById('luz-flicker-speed').addEventListener('input', (e) => {
            document.getElementById('val-flicker-speed').textContent = e.target.value;
        });

        document.getElementById('luz-flicker-amount').addEventListener('input', (e) => {
            document.getElementById('val-flicker-amount').textContent = e.target.value;
        });

        // Adicionar luz ao player
        document.getElementById('btn-add-light-to-player').addEventListener('click', () => {
            this.adicionarLuzAoPlayer();
        });

        // Adicionar luz à entidade selecionada
        document.getElementById('btn-add-light-to-selected').addEventListener('click', () => {
            this.adicionarLuzAEntidadeSelecionada();
        });
    }

    carregarPresets() {
        const select = document.getElementById('lighting-preset-select');
        const presets = this.presetManager.listarPresets();

        presets.forEach(preset => {
            const option = document.createElement('option');
            option.value = preset.id;
            option.textContent = `${preset.nome} - ${preset.descricao}`;
            select.appendChild(option);
        });
    }

    aplicarPreset(presetId) {
        const luzPadrao = this.presetManager.aplicarPreset(presetId, this.lightingSystem);

        // Atualizar UI com os valores do preset
        const preset = this.presetManager.obterPreset(presetId);

        if (preset.global) {
            document.getElementById('lighting-ativo').checked = preset.global.ativo;
            document.getElementById('lighting-cor-ambiente').value = preset.global.corAmbiente;
            document.getElementById('lighting-intensidade-ambiente').value = preset.global.intensidadeAmbiente;
            document.getElementById('val-intensidade-ambiente').textContent = preset.global.intensidadeAmbiente.toFixed(2);
            document.getElementById('lighting-escala').value = preset.global.escala;
            document.getElementById('val-escala').textContent = preset.global.escala;
        }

        if (luzPadrao) {
            document.getElementById('luz-tipo').value = luzPadrao.tipo || 'point';
            document.getElementById('luz-cor').value = luzPadrao.cor;
            document.getElementById('luz-raio').value = luzPadrao.raio;
            document.getElementById('val-raio').textContent = luzPadrao.raio;
            document.getElementById('luz-intensidade').value = luzPadrao.intensidade;
            document.getElementById('val-intensidade').textContent = luzPadrao.intensidade;
            document.getElementById('luz-flickering').checked = luzPadrao.flickering || false;
            document.getElementById('flicker-controls').style.display = luzPadrao.flickering ? 'block' : 'none';

            if (luzPadrao.flickering) {
                document.getElementById('luz-flicker-speed').value = luzPadrao.flickerSpeed || 5;
                document.getElementById('val-flicker-speed').textContent = luzPadrao.flickerSpeed || 5;
                document.getElementById('luz-flicker-amount').value = luzPadrao.flickerAmount || 0.2;
                document.getElementById('val-flicker-amount').textContent = luzPadrao.flickerAmount || 0.2;
            }
        }

        console.log(`✅ Preset "${preset.nome}" aplicado!`);
    }

    obterConfiguracaoLuz() {
        return {
            tipoLuz: document.getElementById('luz-tipo').value,
            cor: document.getElementById('luz-cor').value,
            raio: parseInt(document.getElementById('luz-raio').value),
            intensidade: parseFloat(document.getElementById('luz-intensidade').value),
            flickering: document.getElementById('luz-flickering').checked,
            flickerSpeed: parseFloat(document.getElementById('luz-flicker-speed').value),
            flickerAmount: parseFloat(document.getElementById('luz-flicker-amount').value)
        };
    }

    adicionarLuzAoPlayer() {
        const player = this.editor.entidades.find(e => e.nome?.includes('Player'));

        if (!player) {
            alert('❌ Player não encontrado!');
            return;
        }

        // Remover luz antiga se existir
        const oldLight = player.obterComponente('LightComponent');
        if (oldLight) {
            player.removerComponente('LightComponent');
        }

        const config = this.obterConfiguracaoLuz();
        const luz = new window.LightComponent();
        Object.assign(luz, config);

        player.adicionarComponente(luz);

        console.log('🔦 Luz adicionada ao player!');
        alert('✅ Luz adicionada ao player!');
    }

    adicionarLuzAEntidadeSelecionada() {
        const entidade = this.editor.entidadeSelecionada;

        if (!entidade) {
            alert('❌ Nenhuma entidade selecionada!');
            return;
        }

        // Remover luz antiga se existir
        const oldLight = entidade.obterComponente('LightComponent');
        if (oldLight) {
            entidade.removerComponente('LightComponent');
        }

        const config = this.obterConfiguracaoLuz();
        const luz = new window.LightComponent();
        Object.assign(luz, config);

        entidade.adicionarComponente(luz);

        console.log(`✨ Luz adicionada a "${entidade.nome}"!`);
        alert(`✅ Luz adicionada a "${entidade.nome}"!`);
    }

    abrir() {
        this.modal.classList.remove('hidden');
    }

    fechar() {
        this.modal.classList.add('hidden');
    }
}
