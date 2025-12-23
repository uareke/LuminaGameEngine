/**
 * EditorParticle - Editor visual de templates de partículas
 */
export class EditorParticle {
    constructor(editor) {
        this.editor = editor;
        this.templateManager = editor.particleTemplateManager;
        this.templateSelecionado = null;

        // Elementos DOM
        this.modal = null;
        this.canvasPreview = null;
        this.ctxPreview = null;

        // Preview state
        this.previewEmitter = null;
        this.previewAnimationId = null;
        this.lastTime = 0;
    }

    abrir() {
        this.modal = document.getElementById('modal-particle-editor');
        if (!this.modal) {
            console.error('Modal de partículas não encontrado!');
            return;
        }

        this.modal.classList.remove('hidden');

        // Setup canvas preview
        this.canvasPreview = document.getElementById('canvas-particle-preview');
        this.ctxPreview = this.canvasPreview.getContext('2d');
        this.ctxPreview.imageSmoothingEnabled = false;

        // Configurar eventos
        this.configurarEventos();

        // Atualizar lista
        this.atualizarLista();

        // Iniciar preview loop
        this.iniciarPreview();
    }

    fechar() {
        if (this.modal) {
            this.modal.classList.add('hidden');
        }

        // Parar preview
        if (this.previewAnimationId) {
            cancelAnimationFrame(this.previewAnimationId);
            this.previewAnimationId = null;
        }

        this.templateSelecionado = null;
        this.previewEmitter = null;
    }

    configurarEventos() {
        // Remover listeners antigos clonando e substituindo os elementos
        // (técnica mais eficiente que usar removeEventListener)
        const botoes = [
            'btn-close-particle-editor',
            'btn-particle-create',
            'btn-particle-save',
            'btn-particle-delete'
        ];

        botoes.forEach(id => {
            const botao = document.getElementById(id);
            if (botao) {
                const novoBotao = botao.cloneNode(true);
                botao.parentNode.replaceChild(novoBotao, botao);
            }
        });

        // Agora adicionar os listeners nos elementos novos (sem listeners antigos)

        // Botão fechar
        document.getElementById('btn-close-particle-editor')?.addEventListener('click', () => {
            this.fechar();
        });

        // Criar template
        document.getElementById('btn-particle-create')?.addEventListener('click', () => {
            this.criarTemplate();
        });

        // Salvar
        document.getElementById('btn-particle-save')?.addEventListener('click', () => {
            this.salvarTemplate();
        });

        // Deletar
        document.getElementById('btn-particle-delete')?.addEventListener('click', () => {
            this.deletarTemplate();
        });
    }

    atualizarLista() {
        const lista = document.getElementById('particle-template-list');
        if (!lista) return;

        const templates = this.templateManager.obterTodos();

        lista.innerHTML = '';

        templates.forEach(template => {
            const item = document.createElement('div');
            const icon = template.customizado ? '⭐' : '📦';
            const bgColor = this.templateSelecionado?.id === template.id ? '#3a2a50' : '#222';

            item.style.cssText = `
                background: ${bgColor};
                padding: 10px;
                border-radius: 4px;
                border: 1px solid #444;
                cursor: pointer;
                transition: background 0.2s;
            `;

            item.innerHTML = `
                <div style="font-size: 12px; color: #c9a0ff; font-weight: bold;">${icon} ${template.nome}</div>
                <div style="font-size: 9px; color: #888;">ID: ${template.id}</div>
            `;

            item.addEventListener('click', () => {
                this.selecionarTemplate(template.id);
            });

            item.addEventListener('mouseenter', () => {
                if (this.templateSelecionado?.id !== template.id) {
                    item.style.background = '#2a2a3a';
                }
            });

            item.addEventListener('mouseleave', () => {
                if (this.templateSelecionado?.id !== template.id) {
                    item.style.background = '#222';
                }
            });

            lista.appendChild(item);
        });
    }

    criarTemplate() {
        const input = document.getElementById('particle-new-name');
        const nome = input.value.trim();

        console.log('[EditorParticle] criarTemplate() chamado. Nome:', nome);

        if (!nome) {
            alert('Por favor, digite um nome para o template de partículas.');
            return;
        }

        const id = nome.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');

        // Criar template vazio
        const config = {
            nome: nome,
            taxaEmissao: 20,
            maxParticulas: 100,
            modo: 'continuo',
            corInicial: '#ffffff',
            corFinal: '#000000',
            tamanhoInicial: 5,
            tamanhoFinal: 0,
            velocidadeMin: 50,
            velocidadeMax: 100,
            anguloMin: 0,
            anguloMax: 360,
            gravidade: 0,
            arrasto: 0.98,
            tempoVidaMin: 1.0,
            tempoVidaMax: 2.0,
            opacidadeInicial: 1.0,
            opacidadeFinal: 0.0,
            formaEmissor: 'ponto',
            larguraEmissor: 0,
            alturaEmissor: 0,
            raioEmissor: 20
        };

        this.templateManager.criarTemplateCustomizado(id, config);
        input.value = '';
        this.atualizarLista();
        this.selecionarTemplate(id);
    }

    selecionarTemplate(id) {
        const template = this.templateManager.obterTemplate(id);
        if (!template) return;

        this.templateSelecionado = template;

        // Atualizar nome exibido
        document.getElementById('particle-editing-name').textContent = template.nome;

        // Atualizar lista visual
        this.atualizarLista();

        // Criar controles dinâmicos
        this.criarControles();

        // Atualizar preview
        this.atualizarPreview();
    }

    criarControles() {
        const container = document.getElementById('particle-controls');
        if (!container || !this.templateSelecionado) return;

        const t = this.templateSelecionado;

        container.innerHTML = `
            <!-- Emissão -->
            <div style="background: #1a1a2e; padding: 10px; border-radius: 4px; margin-bottom: 10px;">
                <div style="font-size: 12px; color: #4ecdc4; margin-bottom: 8px; font-weight: bold;">⚙️ Emissão</div>
                
                <label style="font-size: 10px; color: #aaa;">Taxa: <span id="ctrl-taxa-val">${t.taxaEmissao}</span>/s</label>
                <input type="range" id="ctrl-taxa" min="1" max="100" value="${t.taxaEmissao}" style="width: 100%; margin-bottom: 8px;">
                
                <label style="font-size: 10px; color: #aaa;">Máx Partículas: <span id="ctrl-max-val">${t.maxParticulas}</span></label>
                <input type="range" id="ctrl-max" min="10" max="500" value="${t.maxParticulas}" style="width: 100%; margin-bottom: 8px;">
            </div>

            <!-- Visual -->
            <div style="background: #1a1a2e; padding: 10px; border-radius: 4px; margin-bottom: 10px;">
                <div style="font-size: 12px; color: #4ecdc4; margin-bottom: 8px; font-weight: bold;">🎨 Visual</div>
                
                <div style="display: flex; gap: 10px; margin-bottom: 8px;">
                    <div style="flex: 1;">
                        <label style="font-size: 9px; color: #aaa;">Cor Inicial</label>
                        <input type="color" id="ctrl-cor-ini" value="${t.corInicial}" style="width: 100%; height: 30px;">
                    </div>
                    <div style="flex: 1;">
                        <label style="font-size: 9px; color: #aaa;">Cor Final</label>
                        <input type="color" id="ctrl-cor-fim" value="${t.corFinal}" style="width: 100%; height: 30px;">
                    </div>
                </div>

                <label style="font-size: 10px; color: #aaa;">Tamanho Inicial: <span id="ctrl-size-ini-val">${t.tamanhoInicial}</span>px</label>
                <input type="range" id="ctrl-size-ini" min="1" max="30" value="${t.tamanhoInicial}" style="width: 100%; margin-bottom: 8px;">
                
                <label style="font-size: 10px; color: #aaa;">Tamanho Final: <span id="ctrl-size-fim-val">${t.tamanhoFinal}</span>px</label>
                <input type="range" id="ctrl-size-fim" min="0" max="30" value="${t.tamanhoFinal}" style="width: 100%; margin-bottom: 8px;">
            </div>

            <!-- Física -->
            <div style="background: #1a1a2e; padding: 10px; border-radius: 4px; margin-bottom: 10px;">
                <div style="font-size: 12px; color: #4ecdc4; margin-bottom: 8px; font-weight: bold;">⚡ Física</div>
                
                <label style="font-size: 10px; color: #aaa;">Velocidade: <span id="ctrl-vel-min-val">${t.velocidadeMin}</span> - <span id="ctrl-vel-max-val">${t.velocidadeMax}</span></label>
                <input type="range" id="ctrl-vel-min" min="0" max="500" value="${t.velocidadeMin}" style="width: 100%; margin-bottom: 4px;">
                <input type="range" id="ctrl-vel-max" min="0" max="500" value="${t.velocidadeMax}" style="width: 100%; margin-bottom: 8px;">
                
                <label style="font-size: 10px; color: #aaa;">Ângulo: <span id="ctrl-ang-min-val">${t.anguloMin}</span>° - <span id="ctrl-ang-max-val">${t.anguloMax}</span>°</label>
                <input type="range" id="ctrl-ang-min" min="0" max="360" value="${t.anguloMin}" style="width: 100%; margin-bottom: 4px;">
                <input type="range" id="ctrl-ang-max" min="0" max="360" value="${t.anguloMax}" style="width: 100%; margin-bottom: 8px;">
                
                <label style="font-size: 10px; color: #aaa;">Gravidade: <span id="ctrl-grav-val">${t.gravidade}</span></label>
                <input type="range" id="ctrl-grav" min="-200" max="400" value="${t.gravidade}" style="width: 100%;">
            </div>

            <!-- Textura/Sprite -->
            <div style="background: #1a1a2e; padding: 10px; border-radius: 4px; margin-bottom: 10px;">
                <div style="font-size: 12px; color: #4ecdc4; margin-bottom: 8px; font-weight: bold;">🖼️ Textura/Sprite</div>
                
                <label style="font-size: 11px; color: #ccc; display: flex; align-items: center; gap: 5px; margin-bottom:8px;">
                    <input type="checkbox" id="ctrl-usar-textura" ${t.usarTextura ? 'checked' : ''}> Usar Textura
                </label>

                <label style="font-size: 10px; color: #aaa; margin-bottom: 5px; display: block;">Selecionar Imagem:</label>
                <input type="file" id="ctrl-textura-file" accept="image/*" style="width: 100%; background: #111; border: 1px solid #444; color: white; padding: 5px; margin-bottom: 8px; font-size: 10px; cursor: pointer;">
                
                <div id="ctrl-textura-preview" style="margin-bottom: 8px; text-align: center; min-height: 40px; background: #000; border: 1px solid #333; border-radius: 3px; padding: 5px;">
                    ${t.texturaUrl && t.texturaUrl.startsWith('data:') ? '<img src="' + t.texturaUrl + '" style="max-width: 100%; max-height: 50px;"/>' : '<span style="color: #666; font-size: 9px;">Nenhuma imagem selecionada</span>'}
                </div>

                <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                    <div style="flex: 1;">
                        <label style="font-size: 10px; color: #aaa;">Largura: <span id="ctrl-tex-w-val">${t.texturaLargura || 16}</span>px</label>
                        <input type="range" id="ctrl-tex-w" min="4" max="64" value="${t.texturaLargura || 16}" style="width: 100%;">
                    </div>
                    <div style="flex: 1;">
                        <label style="font-size: 10px; color: #aaa;">Altura: <span id="ctrl-tex-h-val">${t.texturaAltura || 16}</span>px</label>
                        <input type="range" id="ctrl-tex-h" min="4" max="64" value="${t.texturaAltura || 16}" style="width: 100%;">
                    </div>
                </div>

                <div style="font-size: 8px; color: #666; background:#111; padding:5px; border-radius:3px;">
                    💡 Suporta PNG transparente. A imagem é convertida para Base64.
                </div>
            </div>

            <!-- Formato do Emissor -->
            <div style="background: #1a1a2e; padding: 10px; border-radius: 4px; margin-bottom: 10px;">
                <div style="font-size: 12px; color: #4ecdc4; margin-bottom: 8px; font-weight: bold;">📐 Formato do Emissor</div>
                
                <label style="font-size: 10px; color: #aaa;">Forma:</label>
                <select id="ctrl-forma-emissor" style="width: 100%; background: #111; color: white; border: 1px solid #444; padding: 5px; margin-bottom: 8px; font-size: 10px;">
                    <option value="ponto" ${t.formaEmissor === 'ponto' ? 'selected' : ''}>⚫ Ponto</option>
                    <option value="linha" ${t.formaEmissor === 'linha' ? 'selected' : ''}>➖ Linha Horizontal (Chuva)</option>
                    <option value="circulo" ${t.formaEmissor === 'circulo' ? 'selected' : ''}>⭕ Círculo</option>
                    <option value="retangulo" ${t.formaEmissor === 'retangulo' ? 'selected' : ''}>▭ Retângulo</option>
                </select>

                <div id="forma-linha-controls" style="display: ${t.formaEmissor === 'linha' ? 'block' : 'none'};">
                    <label style="font-size: 10px; color: #aaa;">Largura: <span id="ctrl-largura-emissor-val">${t.larguraEmissor || 0}</span>px</label>
                    <input type="range" id="ctrl-largura-emissor" min="0" max="2000" step="10" value="${t.larguraEmissor || 0}" style="width: 100%; margin-bottom: 8px;">
                </div>

                <div id="forma-circulo-controls" style="display: ${t.formaEmissor === 'circulo' ? 'block' : 'none'};">
                    <label style="font-size: 10px; color: #aaa;">Raio: <span id="ctrl-raio-emissor-val">${t.raioEmissor || 20}</span>px</label>
                    <input type="range" id="ctrl-raio-emissor" min="5" max="200" value="${t.raioEmissor || 20}" style="width: 100%; margin-bottom: 8px;">
                </div>

                <div id="forma-retangulo-controls" style="display: ${t.formaEmissor === 'retangulo' ? 'block' : 'none'};">
                    <label style="font-size: 10px; color: #aaa;">Largura: <span id="ctrl-ret-largura-val">${t.larguraEmissor || 100}</span>px</label>
                    <input type="range" id="ctrl-ret-largura" min="10" max="500" value="${t.larguraEmissor || 100}" style="width: 100%; margin-bottom: 4px;">
                    
                    <label style="font-size: 10px; color: #aaa;">Altura: <span id="ctrl-ret-altura-val">${t.alturaEmissor || 100}</span>px</label>
                    <input type="range" id="ctrl-ret-altura" min="10" max="500" value="${t.alturaEmissor || 100}" style="width: 100%; margin-bottom: 8px;">
                </div>

                <div style="font-size: 8px; color: #666; background:#111; padding:5px; border-radius:3px;">
                    💡 Para chuva larga, use "Linha" e aumente a largura (ex: 1500px)
                </div>
            </div>
        `;

        // Configurar listeners dos controles
        this.configurarListenersControles();
    }

    configurarListenersControles() {
        if (!this.templateSelecionado) return;

        const setupSlider = (id, prop, displayId, suffix = '') => {
            const slider = document.getElementById(id);
            const display = document.getElementById(displayId);
            if (slider && display) {
                slider.addEventListener('input', (e) => {
                    const val = parseFloat(e.target.value);
                    this.templateSelecionado[prop] = val;
                    display.textContent = val + suffix;
                    this.atualizarPreview();
                });
            }
        };

        setupSlider('ctrl-taxa', 'taxaEmissao', 'ctrl-taxa-val', '/s');
        setupSlider('ctrl-max', 'maxParticulas', 'ctrl-max-val');
        setupSlider('ctrl-size-ini', 'tamanhoInicial', 'ctrl-size-ini-val', 'px');
        setupSlider('ctrl-size-fim', 'tamanhoFinal', 'ctrl-size-fim-val', 'px');
        setupSlider('ctrl-vel-min', 'velocidadeMin', 'ctrl-vel-min-val');
        setupSlider('ctrl-vel-max', 'velocidadeMax', 'ctrl-vel-max-val');
        setupSlider('ctrl-ang-min', 'anguloMin', 'ctrl-ang-min-val', '°');
        setupSlider('ctrl-ang-max', 'anguloMax', 'ctrl-ang-max-val', '°');
        setupSlider('ctrl-grav', 'gravidade', 'ctrl-grav-val');

        // Cores
        document.getElementById('ctrl-cor-ini')?.addEventListener('input', (e) => {
            this.templateSelecionado.corInicial = e.target.value;
            this.atualizarPreview();
        });

        document.getElementById('ctrl-cor-fim')?.addEventListener('input', (e) => {
            this.templateSelecionado.corFinal = e.target.value;
            this.atualizarPreview();
        });

        // Textura/Sprite
        document.getElementById('ctrl-usar-textura')?.addEventListener('change', (e) => {
            // Apenas alterna flag temporariamente
            if (e.target.checked && this.templateSelecionado.texturaUrl) {
                if (this.previewEmitter) {
                    this.previewEmitter.carregarTextura(this.templateSelecionado.texturaUrl);
                }
            } else {
                this.templateSelecionado.usarTextura = false;
                if (this.previewEmitter) {
                    this.previewEmitter.usarTextura = false;
                }
            }
        });

        document.getElementById('ctrl-textura-url')?.addEventListener('change', (e) => {
            const url = e.target.value.trim();
            this.templateSelecionado.texturaUrl = url;

            if (url && this.previewEmitter) {
                this.previewEmitter.carregarTextura(url);
            }
        });

        // File input - Converter para Base64
        document.getElementById('ctrl-textura-file')?.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                alert('Selecione um arquivo de imagem válido');
                return;
            }

            const reader = new FileReader();
            reader.onload = (evt) => {
                const base64 = evt.target.result;
                this.templateSelecionado.texturaUrl = base64;
                this.templateSelecionado.usarTextura = true;

                const previewDiv = document.getElementById('ctrl-textura-preview');
                if (previewDiv) {
                    previewDiv.innerHTML = `<img src="${base64}" style="max-width: 100%; max-height: 50px;"/>`;
                }

                const checkbox = document.getElementById('ctrl-usar-textura');
                if (checkbox) checkbox.checked = true;

                if (this.previewEmitter) {
                    this.previewEmitter.carregarTextura(base64);
                }
            };
            reader.readAsDataURL(file);
        });

        setupSlider('ctrl-tex-w', 'texturaLargura', 'ctrl-tex-w-val', 'px');
        setupSlider('ctrl-tex-h', 'texturaAltura', 'ctrl-tex-h-val', 'px');

        // Formato do Emissor
        document.getElementById('ctrl-forma-emissor')?.addEventListener('change', (e) => {
            const forma = e.target.value;
            this.templateSelecionado.formaEmissor = forma;

            // Show/hide controles específicos
            document.getElementById('forma-linha-controls').style.display = forma === 'linha' ? 'block' : 'none';
            document.getElementById('forma-circulo-controls').style.display = forma === 'circulo' ? 'block' : 'none';
            document.getElementById('forma-retangulo-controls').style.display = forma === 'retangulo' ? 'block' : 'none';

            this.atualizarPreview();
        });

        setupSlider('ctrl-largura-emissor', 'larguraEmissor', 'ctrl-largura-emissor-val', 'px');
        setupSlider('ctrl-raio-emissor', 'raioEmissor', 'ctrl-raio-emissor-val', 'px');
        setupSlider('ctrl-ret-largura', 'larguraEmissor', 'ctrl-ret-largura-val', 'px');
        setupSlider('ctrl-ret-altura', 'alturaEmissor', 'ctrl-ret-altura-val', 'px');
    }

    atualizarPreview() {
        // Recriar emitter com configuração atual
        if (!this.templateSelecionado) return;

        // Import dinâmico seria ideal, mas vou usar referência global
        if (window.ParticleEmitterComponent) {
            this.previewEmitter = new window.ParticleEmitterComponent();
            this.previewEmitter.aplicarTemplate(this.templateSelecionado);

            // Mock entity para preview
            this.previewEmitter.entidade = {
                x: this.canvasPreview.width / 2,
                y: this.canvasPreview.height / 2,
                largura: 32,
                altura: 32
            };
        }
    }

    iniciarPreview() {
        const loop = (time) => {
            const deltaTime = this.lastTime ? (time - this.lastTime) / 1000 : 0.016;
            this.lastTime = time;

            // Limpar canvas
            this.ctxPreview.fillStyle = '#000';
            this.ctxPreview.fillRect(0, 0, this.canvasPreview.width, this.canvasPreview.height);

            // Atualizar e renderizar preview
            if (this.previewEmitter) {
                this.previewEmitter.atualizar(this.previewEmitter.entidade, deltaTime);

                // Mock renderizador
                const mockRenderizador = {
                    ctx: this.ctxPreview,
                    camera: { x: 0, y: 0 }
                };

                this.previewEmitter.renderizar(mockRenderizador);
            }

            this.previewAnimationId = requestAnimationFrame(loop);
        };

        this.previewAnimationId = requestAnimationFrame(loop);
    }

    salvarTemplate() {
        if (!this.templateSelecionado) {
            alert('Nenhum template selecionado');
            return;
        }

        // Template já está sendo editado diretamente (referência)
        // Apenas feedback
        alert(`✅ Template "${this.templateSelecionado.nome}" salvo!`);

        // Atualizar dropdown no painel de propriedades se houver entidade selecionada
        if (this.editor.entidadeSelecionada) {
            this.editor.atualizarPainelPropriedades();
        }
    }

    deletarTemplate() {
        if (!this.templateSelecionado) {
            alert('Nenhum template selecionado');
            return;
        }

        if (!this.templateSelecionado.customizado) {
            alert('Templates padrão não podem ser deletados');
            return;
        }

        if (confirm(`Deletar template "${this.templateSelecionado.nome}"?`)) {
            this.templateManager.removerTemplate(this.templateSelecionado.id);
            this.templateSelecionado = null;
            document.getElementById('particle-editing-name').textContent = 'Nenhum selecionado';
            document.getElementById('particle-controls').innerHTML = '';
            this.atualizarLista();

            // Atualizar dropdown
            if (this.editor.entidadeSelecionada) {
                this.editor.atualizarPainelPropriedades();
            }
        }
    }
}
