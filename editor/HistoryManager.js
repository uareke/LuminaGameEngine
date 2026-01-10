/**
 * Sistema de Undo/Redo usando Command Pattern
 */

export class HistoryManager {
    constructor(editor) {
        this.editor = editor;
        this.undoStack = [];
        this.redoStack = [];
        this.maxHistory = 50;
    }

    /**
     * Executa um comando e o adiciona à pilha de undo
     * @param {Command} command 
     */
    execute(command) {
        if (!command) return;

        // Executa o comando (alguns comandos já são execs na criação, mas o padrão é chamar execute aqui ou ele já ter sido feito)
        // No nosso caso, geralmente a ação já aconteceu (ex: moveu), então o comando armazena o estado.
        // Mas para ações como "Colar", podemos encapsular tudo.
        // Para manter consistência: Se o comando for "State-based" (registra o que JÁ aconteceu), não chamamos execute aqui.
        // Se for "Action-based" (fazer algo novo), chamamos.
        // Vamos assumir que os comandos passados para cá representam ações JÁ EFETUADAS que precisam ser registradas,
        // OU ações que precisam ser executadas agora.

        // Vamos adotar: O chamador executa a ação e CRIA o comando com os dados 'antes' e 'depois',
        // ENTÃO chama history.push(cmd).

        this.undoStack.push(command);

        // Limpa redo ao fazer nova ação
        this.redoStack = [];

        // Limite
        if (this.undoStack.length > this.maxHistory) {
            this.undoStack.shift();
        }

        this.editor.log('Ação registrada: ' + command.name, 'info');
    }

    undo() {
        if (this.undoStack.length === 0) {
            this.editor.log('Nada para desfazer.', 'warning');
            return;
        }

        const command = this.undoStack.pop();
        this.redoStack.push(command);
        command.undo(this.editor);
        this.editor.log('Desfeito: ' + command.name, 'success');

        // Atualiza UI se necessário
        this.editor.atualizarHierarquia();
    }

    redo() {
        if (this.redoStack.length === 0) {
            this.editor.log('Nada para refazer.', 'warning');
            return;
        }

        const command = this.redoStack.pop();
        this.undoStack.push(command);
        command.execute(this.editor);
        this.editor.log('Refeito: ' + command.name, 'success');

        // Atualiza UI se necessário
        this.editor.atualizarHierarquia();
    }
}

// --- COMANDOS ---

export class CmdMoveEntity {
    constructor(entity, startX, startY, endX, endY) {
        this.name = `Mover ${entity.nome}`;
        this.entityId = entity.id;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
    }

    undo(editor) {
        const ent = editor.entidades.find(e => e.id === this.entityId);
        if (ent) {
            ent.x = this.startX;
            ent.y = this.startY;
            editor.selecionarEntidade(ent);
        }
    }

    execute(editor) {
        const ent = editor.entidades.find(e => e.id === this.entityId);
        if (ent) {
            ent.x = this.endX;
            ent.y = this.endY;
            editor.selecionarEntidade(ent);
        }
    }
}

export class CmdResizeEntity {
    constructor(entity, startW, startH, endW, endH) {
        this.name = `Redimensionar ${entity.nome}`;
        this.entityId = entity.id;
        this.startW = startW;
        this.startH = startH;
        this.endW = endW;
        this.endH = endH;
    }

    undo(editor) {
        const ent = editor.entidades.find(e => e.id === this.entityId);
        if (ent) {
            ent.largura = this.startW;
            ent.altura = this.startH;
            editor.selecionarEntidade(ent);
        }
    }

    execute(editor) {
        const ent = editor.entidades.find(e => e.id === this.entityId);
        if (ent) {
            ent.largura = this.endW;
            ent.altura = this.endH;
            editor.selecionarEntidade(ent);
        }
    }
}

export class CmdCreateEntity {
    constructor(entity) {
        this.name = `Criar ${entity.nome}`;
        this.entity = entity; // Guarda referência (ou poderia serializar)
        this.entityId = entity.id;
    }

    undo(editor) {
        // Remover
        const idx = editor.entidades.findIndex(e => e.id === this.entityId);
        if (idx !== -1) {
            editor.entidades.splice(idx, 1);
            editor.engine.removerEntidade(this.entityId);
            editor.selecionarEntidade(null);
        }
    }

    execute(editor) {
        // Recriar / Re-adicionar
        // Verifica se já não está lá (sanity check)
        if (!editor.entidades.some(e => e.id === this.entityId)) {
            editor.entidades.push(this.entity);
            editor.engine.adicionarEntidade(this.entity);
            editor.selecionarEntidade(this.entity);
        }
    }
}

export class CmdDeleteEntity {
    constructor(entity) {
        this.name = `Deletar ${entity.nome}`;
        this.entity = entity;
        this.entityId = entity.id;
        // Importante: Serializar se quisermos persistência robusta, 
        // mas manter a referência em memória funciona se não recarregarmos a página.
        // Para garantir, vamos manter a referência do objeto, pois o JS não deleta se tiver ref.
    }

    undo(editor) {
        // Restaurar (Desfazer a deleção)
        if (!editor.entidades.some(e => e.id === this.entityId)) {
            editor.entidades.push(this.entity);
            editor.engine.adicionarEntidade(this.entity);
            editor.selecionarEntidade(this.entity);
        }
    }

    execute(editor) {
        // Deletar novamente
        const idx = editor.entidades.findIndex(e => e.id === this.entityId);
        if (idx !== -1) {
            editor.entidades.splice(idx, 1);
            editor.engine.removerEntidade(this.entityId);
            editor.selecionarEntidade(null);
        }
    }
}

export class CmdChangeProperty {
    constructor(entityId, propName, oldValue, newValue, isComponent = false, componentType = null) {
        this.name = `Alterar ${propName}`;
        this.entityId = entityId;
        this.propName = propName;
        this.oldValue = oldValue;
        this.newValue = newValue;
        this.isComponent = isComponent;
        this.componentType = componentType;
    }

    undo(editor) {
        const ent = editor.entidades.find(e => e.id === this.entityId);
        if (!ent) return;

        if (this.isComponent) {
            const comp = ent.obterComponente(this.componentType);
            if (comp) {
                comp[this.propName] = this.oldValue;
                // Force UI refresh if selected
                if (editor.entidadeSelecionada === ent) editor.atualizarPainelPropriedades();
            }
        } else {
            ent[this.propName] = this.oldValue;
            if (editor.entidadeSelecionada === ent) editor.atualizarPainelPropriedades();
        }
    }

    execute(editor) {
        const ent = editor.entidades.find(e => e.id === this.entityId);
        if (!ent) return;

        if (this.isComponent) {
            const comp = ent.obterComponente(this.componentType);
            if (comp) {
                comp[this.propName] = this.newValue;
                if (editor.entidadeSelecionada === ent) editor.atualizarPainelPropriedades();
            }
        } else {
            ent[this.propName] = this.newValue;
            if (editor.entidadeSelecionada === ent) editor.atualizarPainelPropriedades();
        }
    }
}
