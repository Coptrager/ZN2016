(function (parent) {
    return parent.extend({
        construct: function (placeId, keyboardConfig) {
            this.base(placeId);
            this.keyboardConfig = keyboardConfig;
            this.keyboard = null;
            this._paint();
        },

        destructor: function () {
            this.keyboard.destructor();
            this.base();
        },

        _paint: function () {
            var layout = this.keyboardConfig.layout;
            var layoutType;

            if (layout == 'DGT') layout = 'DG';
            
            if (['DG', 'DGD'].indexOf(layout) !== -1) {
                layoutType = 'digital';
            } else if (['AL', 'ALR', 'ALCR', 'ALRC', 'ALC', 'EML', 'ALRDG'].indexOf(layout) !== -1) {
                layoutType = 'letter';
            } else {
                layoutType = 'letter';
                layout = 'AL';
            }

            switch (layoutType) {
                case 'digital':
                    var place = $({ cn: 'p_r wh_a', html: '<div class="digitalKeyboard"></div>' }).appendTo(this.place);
                    this.keyboard = crequire.create('digitalKeyboard', [place.find('.digitalKeyboard')[0], layout]);
                    break;
                case 'letter':
                    var place = $({ cn: 'p_r wh_a', html: '<div class="searchKeyboard"></div>' }).appendTo(this.place);
                    this.keyboard = crequire.create('searchKeyboard', [place.find('.searchKeyboard')[0], layout]);
                    break;
            }

            if (this.keyboard) {
                this.keyboard.on('click', delegate(this, this._click));
                this.keyboard.on('clear', delegate(this, this._clear));
            }
        },

        _click: function (s, e) {
            this.callback('click', e);
        },

        _clear: function (s, e) {
            this.callback('clear');
        },

        resultString: function (e) {
            this.keyboard.resultString && this.keyboard.resultString(e);
        }
    });
});