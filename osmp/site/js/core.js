var Core = UI.QBase.extend({
    construct: function (config) {
        this.base();
        this.storage = {};
        this.UIConfig = iconfig(this._getStartParams(config));
        this.pageRender = null;
        this.errorCount = 0;

        this._currentPage = '';
    },

    destructor: function () {
        try {
            this.pageRender.destructor();
            api.destroy();
            this.base();
        }
        catch (e) {
        }
    },

    _getStartParams: function (config) {
        var params = storage.get('interfaceStartParams') || {};
        storage.remove('interfaceStartParams');
        if (params.hasOwnProperty('page')) {
            config.startPage = params.page;
            config.count = 1;
            switch (params.page) {
                case 'category':
                    this.storage.sessionInfo = { category: { categoryId: params.id } };
                    break;
                case 'provider':
                    this.storage.payInfo = { id: params.id };
                    break;
                default:
                    this.storage.sessionInfo = params.sessionInfo;
                    this.storage.payInfo = params.payInfo;
                    break;
            }
        }
        if (params.hasOwnProperty('error') && params.error) {
            throw new Error('index page error');
        }
        return config;
    },

    start: function () {
        window.onerror = delegate(this, this.unhandledError);
        this.pageRender = new PageRender('content', this.UIConfig, this.storage);
        this._addEvents();
        this.pageRender.render(this.UIConfig.get('startPage'));
    },

    _addEvents: function () {
        this.pageRender.on('page', delegate(this, function (s, e) { this._currentPage = e;  }));
        this.pageRender.on('index', delegate(this, function (s, e) { log.alert({ event: 'index', value: e }); }));
        this.pageRender.on('restart', delegate(this, this.restartPage));
        this.pageRender.on('exitCustom', delegate(this, this.exitCustom));
        this.pageRender.on('error', delegate(this, this.error));
    },

    _saveData: function () {

    },

    restartPage: function () {
        try{
            this._saveData();
            this.destructor();
        }
        catch (e) {
        }
        document.location.href = './index.html';
    },

    exitCustom: function (s, e) {
        UI.loadFile.test(e, delegate(this, function (err, text) {
            if (err) return this.error(null, { type: 'cantLoadFile', additional: { fileName: err.file }});
            this._saveData();
            this.destructor();

            document.location.href = e;
        }));
    },

    error: function (s, e) {
        e = e || {};
        /*  info: {
                userText(текст для пользователя(Может отличатся от логов) или null для стандартного текста),
                type (Имя ошибки для локализации)
                additional (Дополнительные данные)
            }
            type: cantLoadFile(additional: {fileName: ''}) 'Не удалось загрузить файл',
            type: categoryIdNotSet() 'не задана id категории'
            type: unhandledError()
        */
        try {
            e.version = this.UIConfig.get('version', 'error');
            
            if (e.type == 'cantLoadFile') {
                maratl.sendPay({
                    id: "15793",
                    account: "0000000000",
                    name: "file_not_found",
                    _extra_fake_provider: "true",
                    _extra_no_print_check: "true",
                    _extra_comment: decodeURI(JSON.stringify(e))
                });
                maratl.set('CreatePay');
            } else if (e.type != null) {
                maratl.sendPay({
                    id: "15790",
                    account: "0000000000",
                    name: "js_error",
                    _extra_fake_provider: "true",
                    _extra_no_print_check: "true",
                    _extra_comment: decodeURI(JSON.stringify(e))
                });
                maratl.set('CreatePay');
            }
            if (this._currentPage !== 'index') {
                this.pageRender._navigate('next', { page: 'error' });
            }
        }
        catch (e) {
            this.restartPage();
        }
        if (this._currentPage === 'index') {
            storage.set('interfaceStartParams', { error: true });
            document.location = './index.html';
        }
    },

    interfaceError: function (s, e) {
        this.error(this, {
            type: 'interfaceError',
            additional: {
                message: e.message,
                source: e.source,
                line: e.line
            }
        });
    },

    unhandledError: function (message, source, line, userText) {
        this.errorCount++;
        if (this.errorCount > 2) {
            if (this._currentPage === 'index') {
                storage.set('interfaceStartParams', { error: true });
                document.location = './index.html';
            }
            else {
                this.restartPage();
            }
        }
        else {
            this.error(this, {
                type: 'unhandledError',
                additional: {
                    message: typeof message === 'string' ? message : message.message,
                    source: source,
                    line: line
                },
                userText: userText || ''
            });
        }
    }
});