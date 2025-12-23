/**
 * ParticleTemplateManager - Gerencia templates reutilizáveis de partículas
 */
export class ParticleTemplateManager {
    constructor() {
        this.templates = new Map();

        // Templates padrão do sistema
        this.carregarTemplatesPadrao();
    }

    /**
     * Cria templates padrão (presets)
     */
    carregarTemplatesPadrao() {
        this.criarTemplate('fogo_tocha', {
            nome: 'Fogo de Tocha',
            taxaEmissao: 30,
            maxParticulas: 150,
            corInicial: '#ff6600',
            corFinal: '#ff0000',
            tamanhoInicial: 8,
            tamanhoFinal: 2,
            opacidadeInicial: 1.0,
            opacidadeFinal: 0.0,
            velocidadeMin: 20,
            velocidadeMax: 60,
            anguloMin: 240,
            anguloMax: 300,
            gravidade: -30,
            tempoVidaMin: 0.5,
            tempoVidaMax: 1.5,
            formaEmissor: 'linha',
            larguraEmissor: 20,
            modo: 'continuo',
            arrasto: 0.98
        });

        this.criarTemplate('explosao', {
            nome: 'Explosão',
            modo: 'oneshot',
            burstQuantidade: 50,
            maxParticulas: 50,
            corInicial: '#ffaa00',
            corFinal: '#ff0000',
            tamanhoInicial: 10,
            tamanhoFinal: 0,
            velocidadeMin: 100,
            velocidadeMax: 200,
            anguloMin: 0,
            anguloMax: 360,
            gravidade: 200,
            tempoVidaMin: 0.3,
            tempoVidaMax: 0.8
        });

        this.criarTemplate('fumaca', {
            nome: 'Fumaça',
            taxaEmissao: 15,
            maxParticulas: 80,
            corInicial: '#888888',
            corFinal: '#333333',
            tamanhoInicial: 5,
            tamanhoFinal: 15,
            opacidadeInicial: 0.6,
            opacidadeFinal: 0.0,
            velocidadeMin: 10,
            velocidadeMax: 30,
            anguloMin: 240,
            anguloMax: 300,
            gravidade: -20,
            arrasto: 0.95,
            tempoVidaMin: 1.0,
            tempoVidaMax: 2.5,
            modo: 'continuo'
        });

        this.criarTemplate('sparkles', {
            nome: 'Brilhos',
            taxaEmissao: 20,
            maxParticulas: 100,
            corInicial: '#ffffaa',
            corFinal: '#ffff00',
            tamanhoInicial: 3,
            tamanhoFinal: 0,
            opacidadeInicial: 1.0,
            opacidadeFinal: 0.0,
            velocidadeMin: 30,
            velocidadeMax: 80,
            anguloMin: 0,
            anguloMax: 360,
            gravidade: 50,
            tempoVidaMin: 0.5,
            tempoVidaMax: 1.0,
            formaEmissor: 'circulo',
            raioEmissor: 10,
            modo: 'continuo'
        });

        this.criarTemplate('chuva', {
            nome: 'Chuva Realista',
            taxaEmissao: 80,
            maxParticulas: 300,
            corInicial: '#88bbff',
            corFinal: '#4488cc',
            tamanhoInicial: 3,
            tamanhoFinal: 2,
            opacidadeInicial: 0.8,
            opacidadeFinal: 0.6,
            velocidadeMin: 300,
            velocidadeMax: 400,
            anguloMin: 87,
            anguloMax: 93,
            gravidade: 500,
            tempoVidaMin: 2.0,
            tempoVidaMax: 3.0,
            formaEmissor: 'linha',
            larguraEmissor: 800,
            modo: 'continuo',
            // Colisão e respingos
            colidirComChao: true,
            alturaChao: 550,
            colidirComObjetos: true,      // ✨ NOVO: Colide com plataformas e objetos!
            criarRespingo: true,
            respingoQuantidade: 4,
            respingoVelocidadeMin: 30,
            respingoVelocidadeMax: 70
        });

        this.criarTemplate('aura', {
            nome: 'Aura Mágica',
            taxaEmissao: 25,
            maxParticulas: 120,
            corInicial: '#00ffff',
            corFinal: '#0066ff',
            tamanhoInicial: 4,
            tamanhoFinal: 0,
            opacidadeInicial: 0.8,
            opacidadeFinal: 0.0,
            velocidadeMin: 20,
            velocidadeMax: 40,
            anguloMin: 0,
            anguloMax: 360,
            gravidade: -10,
            tempoVidaMin: 0.8,
            tempoVidaMax: 1.5,
            formaEmissor: 'circulo',
            raioEmissor: 30,
            modo: 'continuo'
        });
    }

    /**
     * Cria um novo template
     */
    criarTemplate(id, config) {
        this.templates.set(id, {
            id: id,
            ...config,
            customizado: false // Templates padrão não são customizados
        });
        console.log(`✨ Template "${id}" criado`);
    }

    /**
     * Cria um template customizado do usuário
     */
    criarTemplateCustomizado(id, config) {
        if (this.templates.has(id)) {
            console.warn(`⚠️ Template "${id}" já existe. Use editarTemplate para modificar.`);
            return false;
        }

        this.templates.set(id, {
            id: id,
            ...config,
            customizado: true
        });
        return true;
    }

    /**
     * Edita um template existente
     */
    editarTemplate(id, config) {
        if (!this.templates.has(id)) {
            console.warn(`⚠️ Template "${id}" não encontrado.`);
            return false;
        }

        const template = this.templates.get(id);
        Object.assign(template, config);
        return true;
    }

    /**
     * Remove um template (apenas customizados)
     */
    removerTemplate(id) {
        const template = this.templates.get(id);
        if (!template) {
            console.warn(`⚠️ Template "${id}" não encontrado.`);
            return false;
        }

        if (!template.customizado) {
            console.warn(`⚠️ Templates padrão não podem ser removidos.`);
            return false;
        }

        this.templates.delete(id);
        return true;
    }

    /**
     * Obtém um template
     */
    obterTemplate(id) {
        return this.templates.get(id);
    }

    /**
     * Obtém todos os templates
     */
    obterTodos() {
        return Array.from(this.templates.values());
    }

    /**
     * Obtém apenas templates customizados
     */
    obterCustomizados() {
        return this.obterTodos().filter(t => t.customizado);
    }

    /**
     * Serializa templates customizados para salvar
     */
    serializar() {
        const customizados = this.obterCustomizados();
        return customizados.map(t => ({
            id: t.id,
            nome: t.nome,
            config: { ...t }
        }));
    }

    /**
     * Deserializa templates salvos
     */
    desserializar(dados) {
        if (!dados || !Array.isArray(dados)) return;

        for (const item of dados) {
            this.criarTemplateCustomizado(item.id, item.config);
        }
    }

    /**
     * Duplica um template com novo ID
     */
    duplicarTemplate(idOrigem, novoId, novoNome) {
        const original = this.obterTemplate(idOrigem);
        if (!original) {
            console.warn(`⚠️ Template "${idOrigem}" não encontrado.`);
            return false;
        }

        const config = { ...original };
        config.nome = novoNome || `${original.nome} (Cópia)`;
        delete config.id;
        delete config.customizado;

        return this.criarTemplateCustomizado(novoId, config);
    }
}
