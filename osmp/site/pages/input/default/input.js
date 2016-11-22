(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession) {
            this.base(place, pageConfig, paySession);
            this.contentBox = null;
            this.provider = null;
            this.currentPage = 0;
            this.pagePath = [];
            this.faccount = '';
            this.pages = [];
            this.nowAnimation = false;
            this.fields = {};
            this.timeouts = [];
            this.fatalErrorCodes = [4,5,6,7,8,10,12,75,76,77,79,80,81,82,133,150,154,155,232,233,236,238,239,241,242,245,270];
        },

        destructor: function () {
            this.timeouts.forEach(function (x) {
                clearTimeout(x);
            });
            for (var i = 0; i < this.pages.length; i++) this.pages[i].destructor();
            this.base();
        },

        paint: function () {
            this.base();
            this.provider = this.paySession.payInfo.config || null;
            this.provider.inputParams = {};
            this.nameBox.html('Оплата ' + this.provider.buttonName);
            this._showProviderLogo('./img/ui_item/' + this.provider.logo.standard, true);

            this.pageControls.bottomMenu.paint([
                { name: 'back' },
                { name: 'home' },
                { name: 'forward', active: false }
            ]);
            this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));
            this.contentBox = this.place.find('.pageBlock')[0];
            this.pagePath.push(this.provider.pages[0].id);
            this._createPage(this.provider.pages[this.currentPage], true);
            this.pageControls.popupLoader = crequire.create('popupLoader', ['popupLoader']);
        },

        _createPage: function (page, isFirst) {
            this.provider.pages[this.currentPage].push(this.fields);
            var pagePlace = $({ cn: 'providerPage' }).appendTo(this.contentBox);
            this.pages.push(crequire.create('providerPage', [pagePlace, page]));
            this.pageControls.bottomMenu.forward.show();
            this.pageControls.bottomMenu.forward.active(true);
            switch (this.pages[this.pages.length - 1].getType()) {
                case 'text_input':
                    this.pageControls.bottomMenu.forward.active(false);
                    this.pages[this.pages.length - 1].on('valid', delegate(this, function (s, e) {
                        this.pageControls.bottomMenu.forward.active(e);
                    }));
                    break;
                case 'buttons':
                    //case 'button':
                    //case 'disp_button':
                    this.pageControls.bottomMenu.forward.hide();
                    break;
            }
            this.pages[this.pages.length - 1].on('data', delegate(this, this._pushData));
            this.pages[this.pages.length - 1].paint();
            if (!isFirst) {
                this.nowAnimation = true;
                this.timeouts.push(setTimeout(delegate(this, function () { this.nowAnimation = false; }), parseFloat(this.contentBox.css('transition-duration')) * 1000));
                this.contentBox.css({ width: (this.contentBox.el.children.length * 1280) + 'px', left: '-' + ((this.contentBox.el.children.length * 1280) - 1280) + 'px' });
            }
        },

        _removePage: function () {
            this.nowAnimation = true;
            this.contentBox.css({ left: '-' + ((this.contentBox.el.children.length - 1) * 1280 - 1280) + 'px' });
            this.timeouts.push(setTimeout(delegate(this, function () {
                this.pages[this.pages.length - 1].destructor();
                this.pages.pop();
                var pageType = this.pages[this.pages.length - 1].getType();
                this.pageControls.bottomMenu.forward.show();
                this.pageControls.bottomMenu.forward.active(true);
                if (this.pages[this.pages.length - 1].getType().indexOf('button') !== -1) {
                    this.pageControls.bottomMenu.forward.hide();
                }
                this.contentBox.css({ width: (this.contentBox.el.children.length * 1280) + 'px' });
                this.nowAnimation = false;
            }), parseFloat(this.contentBox.css('transition-duration')) * 1000));
        },

        _pushData: function (s, e) {
            if (this.nowAnimation) return;
            switch (e.type) {
                case 'text_input':
                    if (e.data.hasOwnProperty('account')) this.faccount = e.formatValue;
                case 'disp_input':
                    this.provider.push(e.data);
                    break;
                case 'buttons':
                    this.provider.push(e.data);
                    this._navigateClick(null, 'forward');
                    break;
            }
        },

        _getIndex: function (id) {
            for (var i = 0; i < this.provider.pages.length; i++) {
                if (this.provider.pages[i].id === id) return i;
            }
            return -1;
        },

        _onlineResult: function (res) {
            this.pageControls.popupLoader.hide();

            var quasiPay = false;
            if (this.provider.isTag('quasi-online')) {
                if (this.fatalErrorCodes.indexOf(res.resultCode) === -1) {
                    quasiPay = true;
                }
            }

            if (res.resultCode === 0 || quasiPay) {
                if (res.resultCode !== 0) {
                    this.provider.push({ _extra_qo: '1' });
                }

                if (this.provider.pages[this.currentPage].next === 'exit') {
                    this._goExit();
                }
                else {
                    this.pagePath.push(this.provider.pages[this.currentPage].next);
                    this.currentPage = this._getIndex(this.pagePath[this.pagePath.length - 1]);
                    if (res.hasOwnProperty('fields')) {
                        for (var f in res.fields) {
                            this.fields[f] = res.fields[f];
                        }
                        this.provider.pages[this.currentPage].push(this.fields);
                    }
                    if (this.provider.pages[this.currentPage].visible) {
                        this._createPage(this.provider.pages[this.currentPage]);
                    }
                    else {
                        this._pushData(null, {
                            type: this.provider.pages[this.currentPage].type,
                            data: this.provider.pages[this.currentPage].get()
                        });
                        this._nextPage();
                    }
                }
            }
            else {
                this.pageControls.popupLoader.show('error', maratl.getErrorDescriptionByCode(res.resultCode) || 'Произошла ошибка выберите другого оператора');
            }
        },

        _nextPage: function () {
            if (this.provider.needIdentification) {
                var idField = [];
                var phone;
                try {
                    idField = this.provider.pages[this.currentPage].controls.text_input.filter(function (x) {
                        return x.disp_type.indexOf('identification') !== -1;
                    });
                } catch (e) {}
                if (idField.length > 0) {
                    this.timeoutPause();
                    this.pageControls.popupLoader.show('request', 'Запрос статуса идентификации');
                    phone = idField[0].disp_value;
                    var authRequest = [
                        '<request>',
                            '<request-type>bean</request-type>',
                            '<request>',
                                '<request-type>get-identification-status-terminal</request-type>',
                                '<extra name="terminal">', this.paySession.sessionInfo.terminal, '</extra>',
                                '<extra name="phone">7', phone, '</extra>',
                            '</request>',
                            '<request>',
                                '<request-type>check-user-terminal</request-type>',
                                '<extra name="terminal">', this.paySession.sessionInfo.terminal, '</extra>',
                                '<extra name="phone">7', phone, '</extra>',
                                '<extra name="cur">1</extra> ',
                                '<extra name="ccy">643</extra>', 
                                '<extra name="check_pin">1</extra>', 
                            '</request>',
                        '</request>'
                    ].join('');
                    maratl.proxyRequest({
                        url: 'https://facecontrol.qiwi.com/proxy',
                        request: authRequest,
                        headers: { 'X-Proxy-Url': 'qw_internal_xml' },
                        timeout: 10
                    }, (function (err, res) {
                        this.pageControls.popupLoader.hide();

                        if (err && err.resultCode !== 600) return this.this.timeoutStart();

                        this.pageControls.popupLoader.show('request', 'Ваш статус идентификации позволяет совершить платеж');

                        storage.put("ident_adv_counter", JSON.stringify({
                            phone: phone,
                            user_profile: (err ? '' : res),
                            title: 'Платеж принят',
                            description: 'Проверьте платеж за минуту: info.qiwi.com',
                            target: 'index.html'
                        }));
                        
                        setTimeout((function () {
                            this._goExit();
                        }).bind(this), 1000);
                    }).bind(this));
                    emulator.start('network.proxy');
                }
            }
            if (this.provider.pages[this.currentPage].next === 'exit') {
                if (!this.provider.needIdentification) {
                    this._goExit();
                }
            } else {
                this.pagePath.push(this.provider.pages[this.currentPage].next);
                this.currentPage = this._getIndex(this.pagePath[this.pagePath.length - 1]);
                this._createPage(this.provider.pages[this.currentPage]);
            }
        },

        _goExit: function () {
            var payData = this.provider.getPayData();
            if (payData.hasOwnProperty('_extra_fixed_int_summ')) {
                this.next('change', { payInfo: { config: this.provider, faccount: this.faccount } });
            } else {
                this.next('validate', { payInfo: { config: this.provider, faccount: this.faccount } });
            }
        },

        _navigateClick: function (s, e) {
            if (this.nowAnimation) return;
            switch (e) {
                case 'back':
                    if (this.currentPage === 0) {
                        this.back({ payInfo: {} });
                    }
                    else {
                        this.pagePath.pop();
                        this.currentPage = this._getIndex(this.pagePath[this.pagePath.length - 1]);
                        this._removePage();
                    }
                    break;
                case 'home':
                    this.exit();
                    break;
                case 'forward':
                    if (this.provider.pages[this.currentPage].online) {
                        emulator.start('provider_online');
                        this.pageControls.popupLoader.show('request', 'Подождите, идет проверка введенных данных');
                        var pay = this.provider.getPayData();
                        maratl.sendPay(pay);
                        maratl.online(delegate(this, this._onlineResult));
                    }
                    else {
                        this._nextPage();
                    }
                    break;
            }
        }
    });
});