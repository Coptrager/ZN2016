(function () {
    return {
        construct: function (scope, html) {
            this.base();
            this.scope = scope;
            this.html = html;
            this.list = [];
            this.intervals = [];
            this.sum = 0;
            this.sumSpan = null;
        },

        destructor: function () {
            for (var i = 0; i < this.intervals.length; i++) {
                clearInterval(this.intervals[i]);
            }
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
                messenger.nextBlocked();
                messenger.on('nexttry', delegate(this, this._show));
                messenger.on('changesum', delegate(this, this._changeSum));
            }
        },

        _show: function (s, e) {
            messenger.pause();
            var content = '',
                account = this.scope.pay.provider.cellular ? ('+7 (' + this.scope.pay.data.account.substr(0, 3) + ') ' + this.scope.pay.data.account.substr(3, 3) + '-' + this.scope.pay.data.account.substr(6, 2) + '-' + this.scope.pay.data.account.substr(8, 2)) : this.scope.pay.data.account;

            $('headText').html('Подождите, идет проведение платежа <span id="sum">' + this.sum + '</span> руб.<br />на счет ' + account + ' ' + this.scope.pay.provider.buttonName);
            this.list.forEach(function (el) {
                content += '<div class="buttonBox"><div class="button" id="button_' + el.id + '"><div style="background-image:url(../../img/ui_item/' + el.logo.standard + ');"></div><p>' + el.buttonName + '</p></div></div>';
            });
            $('buttonPlace').html(content);

            this.sumSpan = $('sum');

            this._paintProgressBar(this.scope.timeout, function () { 
                messenger.unblocked();
                $('body').html('').hide();
                messenger.resume(0);
            });
            

            var buttons = $('buttonPlace').find('.button');
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].click(delegate(this, function (el) {
                    this._click(el.attr('id').substr(7));
                }));
            }

            messenger.blocked();
            $('body').show();
            messenger.top();
        },

        _changeSum: function (s, e) {
            this.sum = e.sum.enrolled;
            if (this.sumSpan) {
                this.sumSpan.html(this.sum);
            }
        },

        _paintProgressBar: function (time, callback) {
            var content = '<div class="progressBar-dot"></div>',
                defaultColor = '#dbdde0',
                colors = ['#fab131', '#f69831', '#f48931', '#f27830', '#f16f30', '#f16f30', '#f16f30', '#f16f30'],
                dots = [];

            for (var i = 0; i < 8; i++) {
                content += '<div class="progressBar-dot progressBar-step"></div>';
            }
            $('progressBar').html(content);
            dots = $('progressBar').find('div');
            var j = 0,
                interval = setInterval(function () {
                dots[j].css({ background: colors[j] });
                if (j === 8) {
                    clearInterval(interval);
                    callback();
                }
                else {
                    j++;
                }
            }, time * 1000 / 8);

            this.intervals.push(interval);
        },

        _click: function (id) {
            messenger.unblocked();
            $('body').hide();

            storage.set('interfaceStartParams', { page: 'provider', id: id });
            messenger.outToIndexPage();
        }
    };
});