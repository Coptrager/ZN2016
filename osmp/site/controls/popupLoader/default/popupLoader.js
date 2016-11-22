(function (parent) {
    return parent.extend({
        construct: function (placeId) {
            this.base(placeId);
            this.requestBox = null;
            this.errorBox = null;
            this.textBox = null;
            this.errorTextBox = null;
            this.progressBar = null;
            this.hideButton = null;

            this._activeErrorState = 'error';
            this._paint();
        },

        destructor: function () {
            this.progressBar.destructor();
            this.base();
        },

        _paint: function () {
            this.place.html([
                '<div class="p_r wh_100">',
                    '<div id="popupLoaderShadow" class="wh_100"></div>',
                    '<div id="popupLoaderContent" class="p_a">',
                        '<p id="popupLoaderText"></p>',
                        '<div id="progressBar"></div>',
                    '</div>',
                    '<div id="popupLoaderError" class="p_a error">',
                        '<div id="popupLoaderErrorHead" class="f_l ta_c"><div></div><span id="popupLoaderErrorHeadText"></span></div>',
                        '<p id="popupLoaderErrorCode" class="f_l ta_c"></p>',
                        '<div id="popupLoaderErrorButton" class="f_l"></div>',
                    '</div>',
                '</div>'
            ].join(''));
            this.requestBox = $('popupLoaderContent');
            this.errorBox = $('popupLoaderError');
            this.textBox = $('popupLoaderText');

            this.errorTextBox = $('popupLoaderErrorCode');
            this.errorHeaderTextBox = $('popupLoaderErrorHeadText');

            this.progressBar = new crequire.controls.progressBar.script('progressBar');
            this.hideButton = new crequire.controls.button.script('popupLoaderErrorButton', { text: 'ЗАКРЫТЬ' });
            this.hideButton.on('click', delegate(this, this._closeButtonClick));
            this.hide();
        },

        _setActiveErrorState: function (newErrorState) {
            if (this._activeErrorState === newErrorState) return;
            this.errorBox.css('-=' + this._activeErrorState);
            this._activeErrorState = newErrorState;
            this.errorBox.css('+=' + this._activeErrorState);
        },

        show: function (type, text, header) {
            this.hide();
            this.base();
            if (type === 'request') {
                this.requestBox.visible(true);
                this.textBox.html(text || 'ups');
                this.progressBar.start();
            } else if (type === 'error') {
                this._setActiveErrorState('error');
                this.errorTextBox.html(text);
                this.errorHeaderTextBox.html(header || 'Отказ в проведении операции');
                this.errorBox.visible(true);
                this.hideButton.show();
            } else if (type === 'warning') {
                this._setActiveErrorState('warning');
                this.errorTextBox.html(text);
                this.errorHeaderTextBox.html(header || 'Внимание');
                this.errorBox.visible(true);
                this.hideButton.show();
            }
        },

        _closeButtonClick : function () {
            this.callback('closed');
            this.hide();
        },

        hide: function () {
            this.base();
            this.progressBar.stop();
            this.requestBox.visible(false);
            this.errorBox.visible(false);
            this.hideButton.hide();
        }
    });
});