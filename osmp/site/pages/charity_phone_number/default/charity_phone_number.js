(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession) {
            this.base(place, pageConfig, paySession);
            this.config = paySession.payInfo.config;
        },

        paint: function () {
            this.base();
            $('page-header').text(this.config.name);

            this._showProviderLogo('./img/ui_item/' + this.config.logo.standard, false);

            this.pageControls.bottomMenu.paint([
                    { name: 'back' },
                    { name: 'home' },
                    { name: 'forward' }
            ]);

            this.nameBox.html(this.config.buttonName);

            this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));
            this.pageControls.cellularInput = new crequire.controls.cellularInput.script('cellularInput');
            this.pageControls.cellularInput.on('valid', delegate(this, this._numberIsFull));
            this.pageControls.cellularInput.on('notvalid', delegate(this, this._numberIsNotFull));

            this.pageControls.digitalKeyboard = new crequire.controls.digitalKeyboard.script('digitalKeyboard');

            this.pageControls.digitalKeyboard.on('click', delegate(this, this._keyboardClick));
        },

        _keyboardClick: function (s, e) {
            this.pageControls.cellularInput.set(e);
        },

        _numberIsFull: function (s, e) {
            this.phoneNumber = e;
        },

        _numberIsNotFull: function () {
            this.phoneNumber = null;
        },

        _navigateClick: function (s, e) {
            switch (e) {
                case 'back':
                    this.back();
                    break;
                case 'home':
                    this.exit();
                    break;
                case 'forward':
                    this.config.push({ account: this.phoneNumber || '0000000000' });
                    this.next('pay', { payInfo: { config: this.config } });
                    break;
            }
        }
    });
});