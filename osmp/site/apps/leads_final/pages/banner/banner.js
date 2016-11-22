(function () {
    return {
        construct: function (scope, html) {
            this.base();
            this.scope = scope;
            this.html = html;
            this.list = [];
        },

        destructor: function () {
            this.base();
        },

        paint: function () {
            document.body.innerHTML = this.html;

            messenger.attach('maratl.OfflineRecommendations', delegate(this, this._loadProviders));
            messenger.sendPayData({ OfflineRecommendations: this.scope.pay.provider.path.split('|')[0] || '0' });
            messenger.emulator('OfflineRecommendations');
        },

        _loadProviders: function (s, e) {
            var list = JSON.parse(e.value),
                coonter = list.length,
                t = this;

            list.forEach(function (el) {
                loadFile.config('../../config/' + el.id + '.js', function (err, config) {
                    el.config = config;
                    coonter--;
                    if (coonter === 0) {
                        t._pushProviders(list);
                    }
                });
            });
        },

        _pushProviders: function (list) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].config) {
                    this.list.push(guiConfig(list[i].config));
                }
                if (this.list.length === 3) break;
            }

            if (this.list.length) {
                this._show();
            }
        },

        _show: function (s, e) {
            var content = '';

            this.list.forEach(function (el) {
                content += '<div class="buttonBox"><div class="button" id="button_' + el.id + '"><div style="background-image:url(../../img/ui_item/' + el.logo.standard + ');"></div><p>' + el.buttonName + '</p></div></div>';
            });
            $('buttonPlace').html(content);

            var buttons = $('buttonPlace').find('.button');
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].click(delegate(this, function (el) {
                    this._click(el.attr('id').substr(7));
                }));
            }

            $('body').show();
        },

        _click: function (id) {
            $('body').hide();

            storage.set('interfaceStartParams', { page: 'provider', id: id });
            messenger.outToIndexPage();
        }
    };
});