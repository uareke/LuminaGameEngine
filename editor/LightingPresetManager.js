/**
 * LightingPresetManager - Gerencia presets de iluminação
 * 
 * Fornece configurações pré-definidas para diferentes ambientes
 */
export class LightingPresetManager {
    constructor() {
        this.presets = new Map();
        this.criarPresetsIniciais();
    }

    criarPresetsIniciais() {
        // Preset 1: Caverna Escura
        this.adicionarPreset('caverna_escura', {
            nome: 'Caverna Escura',
            descricao: 'Ambiente de caverna com escuridão intensa',
            global: {
                ativo: true,
                corAmbiente: '#000000',
                intensidadeAmbiente: 0.05, // Muito escuro!
                escala: 2.5
            },
            luzPadrao: {
                tipo: 'point',
                cor: '#ff8844',
                raio: 200,
                intensidade: 1.5,
                flickering: true,
                flickerSpeed: 6.0,
                flickerAmount: 0.2
            }
        });

        // Preset 2: Floresta ao Luar
        this.adicionarPreset('floresta_luar', {
            nome: 'Floresta ao Luar',
            descricao: 'Luz azulada da lua através das árvores',
            global: {
                ativo: true,
                corAmbiente: '#0a0a1a',
                intensidadeAmbiente: 0.15,
                escala: 2.0
            },
            luzPadrao: {
                tipo: 'point',
                cor: '#88aaff',
                raio: 250,
                intensidade: 0.8,
                flickering: false
            }
        });

        // Preset 3: Dungeon
        this.adicionarPreset('dungeon', {
            nome: 'Dungeon',
            descricao: 'Masmorra com tochas nas paredes',
            global: {
                ativo: true,
                corAmbiente: '#000000',
                intensidadeAmbiente: 0.1,
                escala: 2.0
            },
            luzPadrao: {
                tipo: 'point',
                cor: '#ffaa44',
                raio: 180,
                intensidade: 1.3,
                flickering: true,
                flickerSpeed: 8.0,
                flickerAmount: 0.15
            }
        });

        // Preset 4: Fog of War
        this.adicionarPreset('fog_of_war', {
            nome: 'Fog of War',
            descricao: 'Névoa de guerra - só vê ao redor do player',
            global: {
                ativo: true,
                corAmbiente: '#1a1a1a',
                intensidadeAmbiente: 0.0, // Completamente escuro
                escala: 3.0 // Área grande
            },
            luzPadrao: {
                tipo: 'point',
                cor: '#ffffff',
                raio: 300,
                intensidade: 1.0,
                flickering: false
            }
        });

        // Preset 5: Entardecer
        this.adicionarPreset('entardecer', {
            nome: 'Entardecer',
            descricao: 'Fim de tarde com luz alaranjada',
            global: {
                ativo: true,
                corAmbiente: '#1a0a00',
                intensidadeAmbiente: 0.25,
                escala: 2.0
            },
            luzPadrao: {
                tipo: 'point',
                cor: '#ffaa66',
                raio: 300,
                intensidade: 0.7,
                flickering: false
            }
        });

        // Preset 6: Laboratório
        this.adicionarPreset('laboratorio', {
            nome: 'Laboratório',
            descricao: 'Iluminação artificial fria',
            global: {
                ativo: true,
                corAmbiente: '#0a0a14',
                intensidadeAmbiente: 0.3,
                escala: 2.0
            },
            luzPadrao: {
                tipo: 'point',
                cor: '#aaccff',
                raio: 250,
                intensidade: 1.0,
                flickering: false
            }
        });

        // Preset 7: Spotlight (Palco)
        this.adicionarPreset('spotlight', {
            nome: 'Spotlight',
            descricao: 'Holofote direcional tipo palco',
            global: {
                ativo: true,
                corAmbiente: '#000000',
                intensidadeAmbiente: 0.05,
                escala: 2.0
            },
            luzPadrao: {
                tipo: 'spotlight',
                cor: '#ffffff',
                raio: 300,
                intensidade: 1.5,
                angulo: 90, // Para baixo
                coneAngulo: 45,
                flickering: false
            }
        });

        // Preset 8: Sem Iluminação (Dia Claro)
        this.adicionarPreset('dia_claro', {
            nome: 'Dia Claro',
            descricao: 'Desativa iluminação - tudo visível',
            global: {
                ativo: false,
                corAmbiente: '#ffffff',
                intensidadeAmbiente: 1.0,
                escala: 1.0
            },
            luzPadrao: null
        });

        console.log(`✨ ${this.presets.size} presets de iluminação criados`);
    }

    adicionarPreset(id, config) {
        this.presets.set(id, config);
    }

    obterPreset(id) {
        return this.presets.get(id);
    }

    listarPresets() {
        return Array.from(this.presets.entries()).map(([id, preset]) => ({
            id,
            nome: preset.nome,
            descricao: preset.descricao
        }));
    }

    aplicarPreset(id, lightingSystem) {
        const preset = this.obterPreset(id);
        if (!preset) {
            console.warn(`Preset '${id}' não encontrado`);
            return;
        }

        // Aplicar configurações globais
        if (preset.global) {
            lightingSystem.setAtivo(preset.global.ativo);
            lightingSystem.setAmbiente(
                preset.global.corAmbiente,
                preset.global.intensidadeAmbiente
            );

            if (preset.global.escala) {
                lightingSystem.escala = preset.global.escala;
                lightingSystem.atualizarTamanho();
            }
        }

        console.log(`🌟 Preset '${preset.nome}' aplicado!`);
        return preset.luzPadrao; // Retorna configuração de luz padrão
    }
}
