(function () {
    return {
        construct: function (scope, html) {
            this.base();
            this.scope = scope;
            this.html = html;
        },

        destructor: function () {
            messenger.detach('maratl.terminalResponse', delegate(this, this.onResponse));

            window.startListeners = null;
            window.fromFlash = null;
            window.EITest = null;
            window.outToProvider = null;
            window.outToCategory = null;
            window.sendPayData = null;
            window.close = null;
            window.getStorage = null;
        },

        paint: function () {
            window.startListeners = function () {};
            window.fromFlash = delegate(this, this.fromFlash);
            window.EITest = delegate(this, this.saveData);

            window.outToProvider = delegate(this, this.outToProvider);
            window.outToCategory = delegate(this, this.outToCategory);
            window.sendPayData = delegate(this, this.sendPayData);
            window.close = delegate(this, this.close);
            window.getStorage = function(name){ 
                return storage.get(name) || ''; 
            };
            window.getData = (function () {
                var pay = this.scope.pay;
                return {
                    phone: pay.data.account,
                    to_prv_id: pay.data.id,
                    logo: '../img/ui_item/' + pay.provider.logo.standard,
                    min_summ: pay.data.minSum,
                    operator: pay.data.name
                };
            }).bind(this);

            messenger.top('fullscreen');
            document.body.innerHTML = this.html;

            messenger.attach('maratl.terminalResponse', delegate(this, this.onResponse));
        },

        onResponse: function (s, e) {
            try {
                flashcontent.fromMaratl(e.name, e.value);
            }
            catch (e) {}
        },

        saveData: function (name, value) {
            storage.put(name, value);
        },

        fromFlash: function (name, value) {
            switch(name){
                case 'close':
                    this.callback('out', { type: 'index' })
                break;
                case 'back':
                    this.callback('exit');
                break;
                default:
                    if (typeof value !== 'undefined') {
                        var pay = {};
                        pay[name] = value;
                        messenger.sendPayData(pay);
                    }
            }
        },

        outToProvider: function (id) {
            this.callback('out', { type: 'provider', id: id });
        },

        outToCategory: function (id) {
            this.callback('out', { type: 'category', id: id });
        },

        nextPage: function (name) {
            this.callback('next', { page: name });
        },

        sendPayData: function (name, value) {
            if (typeof value !== 'undefined') {
                var pay = {};
                pay[name] = value;
                messenger.sendPayData(pay);
            }
        }
    };
});


