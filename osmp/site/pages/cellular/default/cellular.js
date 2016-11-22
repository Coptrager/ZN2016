(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession) {
            this.base(place, pageConfig, paySession);
            this.mnp = false;
            this.phoneNumber = '';
            this.pageControls.phoneParser = null;
            this.pageControls.cellularInput = null;
            this.pageControls.digitalKeyboard = null;
            this.payInfo = {
                id: '',
                account: '',
                region: ''
            };
            this._denied = false;
            this.provider = null;
            this.mnpTimeout = parseInt(this.interfaceConfig.get('params:index_config:mnptimeout', '25'), 10);
            this.avatars = [];
        },

        paint: function () {
            this.base();
            UI.loadFile.json('./pages/cellular/default/resourses/avatars.json', (function (err, avatars) {
                this.avatars = avatars;
            }).bind(this));
            this.pageControls.phoneParser = crequire.create('phoneParser');

            if (typeof this.paySession.payInfo.id === 'string' && this.paySession.payInfo.id !== '0') {
                this._loadProvider(this.paySession.payInfo.id, delegate(this, this._showProvider));
            }
            else {
                this.nameBox.html('Оплата Сотовая связь');
            }

            this.pageControls.cellularInput = new crequire.controls.cellularInput.script('cellularInput');
            this.pageControls.cellularInput.on('valid', delegate(this, this._numberIsFull));
            this.pageControls.cellularInput.on('notvalid', delegate(this, this._numberIsNotFull));



            this.pageControls.digitalKeyboard = new crequire.controls.digitalKeyboard.script('digitalKeyboard');
            this.pageControls.digitalKeyboard.on('click', delegate(this, this._keyboardClick));

            this.pageControls.bottomMenu.paint([
                { name: 'back' },
                { name: 'home' },
                { name: 'forward', active: false }
            ]);
            this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));

            if (this.paySession.payInfo.hasOwnProperty('account') && this.paySession.payInfo.account.length) {
                var account = this.paySession.payInfo.account;
                for (var i = 0; i < account.length; i++) {
                    this.pageControls.cellularInput.set(account.charAt(i));
                }
            }
            maratl.one('PrvDenied', delegate(this, function () { this._denied = true; }));
            maratl.one('AccDenied', delegate(this, function () { this._denied = true; }));
        },

        _preLoadProvider: function (err, info) {
            if (err) {
                this.payInfo.id = '0';
                this.payInfo.region = '';
                this.next('category', { payInfo: { id: '0', account: this.pageControls.cellularInput.get(), faccount: this._getFormattedNumber(this.pageControls.cellularInput.get()), }, sessionInfo: { category: { categoryId: '-20', isCellular: true } } });
            }
            else {
                this.payInfo.id = info.id;
                this.payInfo.region = info.region;
                this._loadProvider(info.id, delegate(this, function () {
                    this.provider.push({ account: this.pageControls.cellularInput.get() });
                    this.next('validate', { payInfo: { id: this.provider.id, account: this.pageControls.cellularInput.get(), faccount: this._getFormattedNumber(this.pageControls.cellularInput.get()), config: this.provider } });
                }));
            }
        },

        _loadProvider: function (id, callback) {
            UIProvider = null;
            UI.loadFile.script('./config/' + id + '.js', delegate(this, function (err, path) {
                if (err) {
                    this._endLoadProcess();
                    return this.pageControls.popupLoader.show('error', 'Данный провайдер запрещен');
                }
                if (UIProvider) {
                    this.provider = guiConfig(UIProvider);
                    UIProvider = null;
                    callback();
                } else {
                    this._endLoadProcess();
                }
            }));
        },

        _keyboardClick: function (s, e) {
            this.pageControls.cellularInput.set(e);
        },

        _parseNumber: function (number) {
            var hash = 'none';
            var vip = {
                '04980d73ca5bc9351a4b4c43bca51984c8f46839': 101,
                '5077e332ee7589a39389d22281681acc60067e32': 7,
                '88215381c83d7c05dc6a39c3d244765e23909ef3': 65,
                'cdf6494d8d34b4006a8b9c35ce8d84408d0c335d': 11,
                'ff164d2a58842e9ef5dc2554eb8d529162484191': 100,
                'dab7bf87187d9b8ac1062bce1b79ed8d52ba2881': 102
            };
            try {
                var shaObj = new jsSHA('SHA-1', 'TEXT');
                shaObj.update(number);
                hash = shaObj.getHash('HEX');
            }
            catch (e) { }
            if (vip.hasOwnProperty(hash)) return vip[hash];
            var first = 0;
            var two = 0;
            var i = 0;

            for (; i < number.length; i += 2) {
                first += parseInt(number.charAt(i));
            }

            for (i = 1; i < number.length; i += 2) {
                two += parseInt(number.charAt(i));
            }

            return (two % 10) * 10 + (first % 10);
        },

        _numberIsFull: function (s, e) {
            maratl.sendPay({
                id: '0',
                account: e
            });

            if (this.phoneNumber !== e) this.mnp = false;
            this.phoneNumber = e;
            this.pageControls.bottomMenu.forward.active(true);
            var avatarId = this._parseNumber(this.phoneNumber);
            $('digitalKeyboard').css({ transitionDelay: '50ms', top: '800px' });
            $('avatar').css({ bottom: 0 });

            $('avatarImage').html('');
            $('avatarImage').css({ backgroundImage: '' });
            if (this.avatars[avatarId].image) {
                $('avatarImage').css({ backgroundImage: 'url(\'' + this.avatars[avatarId].image + '\')'});
            }
            else {
                $('avatarImage').html($.embedSWF({
                    data: './pages/resourses/avatars/avatars.swf',
                    params: {
                        flashvars: 'dif=' + this.avatars[avatarId].id,
                        wmode: 'transparent'
                    }
                }));
            }
            $('avatarText').html(this.avatars[avatarId].name);
        },

        _numberIsNotFull: function () {
            this._denied = false;
            this.pageControls.bottomMenu.forward.active(false);
            $('avatar').css({ bottom: '-520px' });
            $('digitalKeyboard').css({ transitionDelay: '500ms', top: '280px' });
        },

        _startMNP: function () {
            this.pageControls.popupLoader.show('request', 'Определение оператора для номера ' + this._getFormattedNumber(this.pageControls.cellularInput.get()));
            if (this.mnpTimeout == 0) {
                this.pageControls.phoneParser.parse(this.phoneNumber, delegate(this, this._preLoadProvider));
                log.maratl("mnp выключен, определение по локальной емкости.");
            } else {
                maratl.mnp(this.phoneNumber, delegate(this, this._resultMNP), this.mnpTimeout * 1000);
            }
            emulator.start('cellular');
        },

        _endLoadProcess: function () {
            this.pageControls.bottomMenu.forward.active(true);
            this.pageControls.popupLoader.hide();
        },

        _resultMNP: function (s, e) {
            this._setExtra('_extra_mnp_timeout', this.mnpTimeout);
            this.mnp = true;
            var params = JSON.parse(e.value);
            if (params.hasOwnProperty('result')) {
                if (params.result.toString() == '666') {
                    this._setExtra('_extra_mnp_timeout', this.mnpTimeout);
                }
                switch (params.result.toString()) {
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '10':
                    case '12':
                    case '75':
                    case '76':
                    case '77':
                    case '79':
                    case '80':
                    case '81':
                    case '82':
                    case '133':
                    case '150':
                    case '154':
                    case '155':
                    case '232':
                    case '233':
                    case '236':
                    case '238':
                    case '239':
                    case '241':
                    case '242':
                    case '245':
                    case '270':
                        this.mnp = false;
                        this._endLoadProcess();
                        this.pageControls.popupLoader.show('error', params['result-description'] || 'Произошла ошибка. Попробуйте еще раз');
                        //критичные ошибки
                        break;
                    case '42':
                        //тест по емкостям
                        log.maratl("Не получен ответ от сервера mnp, определение по локальной емкости.");
                        this._setExtra('_extra_mnp_error', params.result.toString());
                        this.pageControls.phoneParser.parse(this.phoneNumber, delegate(this, this._preLoadProvider));
                        break;
                    default:
                        //не критичные ошибки
                        if (params.hasOwnProperty('providerId')) {
                            //вернулся id провайдера
                            params.providerId = params.providerId.toString();
                            if (this.provider && params.providerId === this.provider.id) {
                                this.provider.push({ account: this.pageControls.cellularInput.get() });
                                this.next('validate', { payInfo: { id: params.providerId, account: this.pageControls.cellularInput.get(), faccount: this._getFormattedNumber(this.pageControls.cellularInput.get()), config: this.provider } });
                            }
                            else {
                                UI.loadFile.config('./config/' + params.providerId + '.js', delegate(this, function (err, config) {
                                    if (err) {
                                        this._endLoadProcess();
                                        this.pageControls.popupLoader.show('error', 'Данный провайдер запрещен');
                                        return;
                                    }
                                    if (params.result !== 0) {
                                        this._setExtra('_extra_mnp_error', params.result.toString());
                                    }
                                    this.provider = guiConfig(config);
                                    this.provider.push({ account: this.pageControls.cellularInput.get() });
                                    this.next('validate', { payInfo: { id: params.providerId, account: this.pageControls.cellularInput.get(), faccount: this._getFormattedNumber(this.pageControls.cellularInput.get()), config: this.provider } });
                                }));
                            }
                        }
                        else {
                            log.maratl("Не получен ответ от сервера mnp, определение по локальной емкости.");
                            this._setExtra('_extra_mnp_error', params.result.toString());
                            this.pageControls.phoneParser.parse(this.phoneNumber, delegate(this, this._preLoadProvider));
                        }
                        break;
                }
            } else {
                this._endLoadProcess();
            }
        },

        _setExtra: function (name, value) {
            if (this.paySession.sessionInfo.extra == null) {
                this.paySession.sessionInfo.extra = [];
            }
            var arr = this.paySession.sessionInfo.extra;
            var index = arr.map(function (x) { return x.name; }).indexOf(name);
            if (index !== -1) {
                arr[index] = { name: name, value: value };
            }
            arr.push({ name: name, value: value });          
        },

        _showProvider: function () {
            this.nameBox.html('Оплата ' + this.provider.buttonName);
            this._showProviderLogo('./img/ui_item/' + this.provider.logo.standard, true);
        },

        _getFormattedNumber: function (number) {
            return '+7 (' + number.charAt(0) + number.charAt(1) + number.charAt(2) + ') ' + number.charAt(3) + number.charAt(4) + number.charAt(5) + '-' + number.charAt(6) + number.charAt(7) + '-' + number.charAt(8) + number.charAt(9);
        },

        _navigateClick: function (s, e) {
            switch (e) {
                case 'back':
                    this.back({ payInfo: {} });
                    break;
                case 'home':
                    this.exit();
                    break;
                case 'forward':
                    if (this._denied) {
                        this.error({
                            userText: 'Извините, приём платежей для данного провайдера запрещен. Проверьте, не ошиблись ли Вы при выборе провайдера или региона провайдера.'
                        });
                        return;
                    }
                    this.pageControls.bottomMenu.forward.active(false);
                    this._startMNP();
                    break;
            }
        }
    });
});