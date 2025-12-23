export class AssetManager {
    constructor(editor) {
        this.editor = editor;
        this.assets = {
            sprites: [], // Lista de { id, nome, type: 'sprite', ...config }
            sons: []
        };
        this.folders = []; // { id, nome, parentId, type: 'folder' }
        this.nextId = 1;

        // Init default folders (virtual roots) are redundant if we use null parent as root
    }

    criarPasta(nome, parentId = null) {
        const id = 'folder_' + Date.now() + Math.floor(Math.random() * 100);
        const folder = {
            id: id,
            tipo: 'folder',
            nome: nome || 'Nova Pasta',
            parentId: parentId
        };
        this.folders.push(folder);
        this.editor.log(`Pasta criada: ${folder.nome}`, 'success');
        return folder;
    }

    criarSpriteAsset(nome, categoria = 'tileset', folderId = null) {
        const id = 'asset_sprite_' + Date.now();
        const novoSprite = {
            id: id,
            tipo: 'sprite',
            categoria: categoria, // 'tileset' ou 'animacao'
            nome: nome || 'Novo Sprite',
            folderId: folderId,   // Folder Link
            source: null, // Base64 da imagem
            imagem: null, // HTMLImageElement (Runtime)
            larguraFrame: 32,
            alturaFrame: 32,
            animacoes: {}
        };
        this.assets.sprites.push(novoSprite);
        this.editor.log(`Asset criado: ${novoSprite.nome}`, 'success');
        return novoSprite;
    }

    obterAsset(id) {
        return this.assets.sprites.find(a => a.id === id) ||
            this.assets.sons.find(a => a.id === id);
    }

    listarSprites() {
        return this.assets.sprites;
    }

    atualizarAsset(id, novosDados) {
        const asset = this.obterAsset(id);
        if (asset) {
            Object.assign(asset, novosDados);

            // Se houve atualização de source, recarregar objeto Image
            if (novosDados.source) {
                asset.imagem = new Image();
                asset.imagem.src = novosDados.source;
                // Opcional: listener de onload para debug
                asset.imagem.onload = () => console.log(`[AssetManager] Imagem carregada: ${asset.nome}`);
                asset.imagem.onerror = (e) => console.error(`[AssetManager] Erro ao carregar imagem: ${asset.nome}`, e);
            }

            // Notificar listeners se houver sistema de eventos
            return true;
        }
        return false;
    }

    removerAsset(id) {
        const index = this.assets.sprites.findIndex(a => a.id === id);
        if (index > -1) {
            this.assets.sprites.splice(index, 1);
            this.editor.log('Asset removido.', 'warning');
            return true;
        }
        return false;
    }

    // Serialização para salvar projeto
    serializar() {
        return {
            sprites: this.assets.sprites,
            sons: this.assets.sons,
            folders: this.folders || []
        };
    }

    desserializar(dados) {
        if (dados) {
            this.assets.sprites = dados.sprites || [];
            this.assets.sons = dados.sons || [];
            this.folders = dados.folders || [];

            // Recarregar imagens
            this.assets.sprites.forEach(asset => {
                if (asset.source) {
                    asset.imagem = new Image();
                    asset.imagem.src = asset.source;
                }
            });
        }
    }

    limpar() {
        this.assets.sprites = [];
        this.assets.sons = [];
    }

    /**
     * Remove o fundo (cor preta ou especificada) da imagem do asset
     */
    processarTransparencia(id) {
        const asset = this.obterAsset(id);
        if (!asset || !asset.source) return;

        const img = new Image();
        img.src = asset.source;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Detectar cor do primeiro pixel para usar como chave (se quiser)
            // Por enquanto, vamos remover PRETO ABSOLUTO (0,0,0) e quase preto
            const threshold = 10; // Tolerância

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                // const a = data[i + 3];

                if (r < threshold && g < threshold && b < threshold) {
                    data[i + 3] = 0; // Alpha = 0 (Transparente)
                }
            }

            ctx.putImageData(imageData, 0, 0);

            // Atualizar asset
            const novoSource = canvas.toDataURL('image/png');
            this.atualizarAsset(id, { source: novoSource });
            this.editor.log(`Fundo preto removido do asset: ${asset.nome}`, 'success');
        };
    }
}
