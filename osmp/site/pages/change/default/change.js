(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession) {
            this.base(place, pageConfig, paySession);

            this.provider = null;
            this.pageControls.gotoCellularButton = null;
            this.pageControls.gotoWalletButton = null;
            //this.pageControls.gotoContentButton = null;
            this.pageControls.cellularInput = null;
            this.pageControls.digitalKeyboard = null;
            this.pageControls.phoneParser = null;
            this.phoneNumber = '';

            this.pageState = {
                slide: 1,
                currentType: null // cellular or wallet
            };
        },
        paint: function () {
            this.base();

            this.pageControls.phoneParser = crequire.create('phoneParser');

            this.pageControls.gotoCellularButton = crequire.create('button', ['gotoCellular', {}]);
            this.pageControls.gotoWalletButton = crequire.create('button', ['gotoWallet', {}]);
            //this.pageControls.gotoContentButton = crequire.create('button', ['gotoContent', {}]);
            this.pageControls.cellularInput = crequire.create('cellularInput',['cellularInput']);
            this.pageControls.digitalKeyboard = crequire.create('digitalKeyboard',['digitalKeyboard']);

            this.pageControls.gotoCellularButton.on('click', delegate(this, this._gotoCellularClick));
            this.pageControls.gotoWalletButton.on('click', delegate(this, this._gotoWalletClick));
            //this.pageControls.gotoContentButton.on('click', delegate(this, this._gotoContentClick));
            this.pageControls.digitalKeyboard.on('click', delegate(this, this._keyboardClick));

            this.pageControls.cellularInput.on('valid', delegate(this, this._numberIsFull));
            this.pageControls.cellularInput.on('notvalid', delegate(this, this._numberIsNotFull));

            this.pageControls.bottomMenu.paint([
                { name: 'back' },
                { name: 'home' },
                { name: 'forward', active: false, visible: false }
            ]);
            this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));
        },

        _gotoSlideNumber: function (number) {
            if (this.pageState.slide == number) return;
            $('change-page').css("-=active-silde-" + this.pageState.slide);
            this.pageState.slide = number;
            $('change-page').css("+=active-silde-" + this.pageState.slide);
        },
        _setDeliveryType: function (type) {
            switch (type) {
                case 'cellular':
                    $('headText').text('Введите номер телефона');
                    break;
                case 'wallet':
                    $('headText').text('Введите номер Visa QIWI Wallet');
                    break;
            }
            this.pageControls.cellularInput.clear();
            this.pageControls.bottomMenu.forward.show();
            this.pageState.currentType = type;
        },

        _gotoCellularClick: function () {
            statistics.clickAction({ choice: 'mobile' });
            this._setDeliveryType('cellular');
            this._gotoSlideNumber(2);
        },
        _gotoWalletClick: function () {
            statistics.clickAction({ choice: 'wallet' });
            this._setDeliveryType('wallet');
            this._gotoSlideNumber(2);
            this._loadConfig(19993, delegate(this, function (err, provider) {
                if (err) {
                    this.provider = {
                        id: "19993",
                        name: "Visa QIWI Wallet"
                    };
                } else {
                    this.provider = provider;
                }
                this._showProviderLogo('./pages/resourses/lk.png', true);
            }));
        },
        //_gotoContentClick: function () {
        //    statistics.clickAction({ choice: 'content' });
        //    this.pageControls.gotoContentButton.active(false);
        //    $('contentText').css({ opacity: '1' });
        //},

        _keyboardClick: function (s, e) {
            this.pageControls.cellularInput.set(e);
        },

        _navigateClick: function (s, e) {
            switch (e) {
                case 'back':
                    if (this.pageState.slide == 1) {
                        this._setData({ sessionInfo: { advert: true } });
                        this.back();
                    } else {
                        this._hideProviderLogo(true);
                        this.pageControls.bottomMenu.forward.hide();
                        this._gotoSlideNumber(this.pageState.slide - 1);
                    }
                    break;
                case 'home':
                    this.exit();
                    break;
                case 'forward':
                    this.next('validate', {
                        payInfo: {
                            delivery: {
                                id2: this.provider.id,
                                account2: this.phoneNumber,
                                name2: this.provider.name
                            }
                        }
                    });
                    break;
            }
        },

        _numberIsFull: function (s, e) {
            this.phoneNumber = e;
            switch (this.pageState.currentType) {
                case 'cellular':
                    this.pageControls.phoneParser.parse(this.phoneNumber, delegate(this, this._loadProvider));
                    break;
                case 'wallet':
                    this.pageControls.bottomMenu.forward.active(true);
                    break;
            }
        },

        _numberIsNotFull: function () {
            this.pageControls.bottomMenu.forward.active(false);
            if (this.pageState.currentType == 'cellular') {
                this._hideProviderLogo(true);
            }
        },

        _loadProvider: function (err, info) {
            if (err) {
                this.pageControls.popupLoader.show('error', 'Данный провайдер запрещен');
            }
            else {
                this._loadConfig(info.id, delegate(this, function (err, provider) {
                    if (err) {
                        this.pageControls.popupLoader.show('error', 'Данный провайдер запрещен');
                    } else {
                        this.provider = provider;
                        this.pageControls.bottomMenu.forward.active(true);
                        this._showProviderLogo('./img/ui_item/' + this.provider.logo.standard, true);
                    }
                }));
            }
        },
        _loadConfig: function (id, callback) {
            UIProvider = null;
            UI.loadFile.script('./config/' + id + '.js', delegate(this, function (err, path) {
                if (err) {
                    callback(err);
                }
                if (UIProvider) {
                    var provider = guiConfig(UIProvider);
                    UIProvider = null;
                    callback(null, provider);
                }
            }));
        }
    });
});