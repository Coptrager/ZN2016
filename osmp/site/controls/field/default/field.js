(function (parent) {
    return parent.extend({
        construct: function (placeId, fieldConfig, index) {
            this.base(placeId);
            this.fieldPlace = $({}).appendTo(this.place);
            this.fieldConfig = fieldConfig;
            this.index = index;
            this.textBox = null;
            this.text = null;
            this.cursor = null;
            this.bsBox = null;
            this.textBoxWidth = 0;
            this.value = '';
            this._active = false;
            this._paint();
        },

        _paint: function () {
            if (this.fieldConfig.type === 'static') {
                this.fieldPlace.css('+=field-static');
                this.fieldPlace.html(this.fieldConfig.value);
                this.value = this.fieldConfig.value;
            }
            else {
                var bsType = this.fieldConfig.bstype === 'short' ? '-s' : '';
                this.fieldPlace.css('+=p_r field field-active-false');
                this.fieldPlace.html([
                    '<div class="f_l field-textbox"><div class="field-text"><p></p><div class="v_h field-cursor"></div></div></div>',
                    '<div class="p_a field-bsbox', bsType, '"><div class="p_r wh_100"><div class="p_a field-bs', bsType, '"><span>', (this.fieldConfig.bstype === 'short' ? 'X' : 'СТЕРЕТЬ'), '</span></div></div></div>',
                ].join(''));
                this.textBox = this.fieldPlace.find('.field-textbox')[0];
                this.text = this.textBox.find('p')[0];
                this.cursor = this.textBox.find('.field-cursor')[0];
                this.bsBox = this.fieldPlace.find('.field-bsbox' + bsType)[0];
                this.fieldPlace.click(delegate(this, function () {
                    this.callback('click', this.index);
                }));
                this.bsBox.click(delegate(this, this._backspace));
            }
        },

        _correct: function () {
            if (!this.textBoxWidth) this.textBoxWidth = this.textBox.attr('offsetWidth');
            var textBoxWidth = this.textBox.attr('offsetWidth'),
                textWidth = this.text.attr('offsetWidth'),
                bsBoxWidth = this.bsBox.attr('offsetWidth');
            
            if (textWidth > this.textBoxWidth - bsBoxWidth * 2 - 20) {
                this.textBox.css('+=field-text-correct');
                if (textBoxWidth - textWidth < 100) textBoxWidth += 100;
                this.textBox.css({ width: textBoxWidth + 'px', marginRight: (bsBoxWidth + 10) + 'px' });
            }
            else {
                this.textBox.css('-=field-text-correct');
                this.textBox.css({ width: 'inherit', marginRight: '0px' });
            }
        },

        _test: function () {
            this.callback('empty', (this.value.length === this.fieldConfig.max));
            this.callback('change', this.value);
        },

        _backspace: function () {
            if (this.fieldConfig.type === 'dynamic') {
                this.value = this.value.substr(0, this.value.length - 1);
                this.text.html(this.value);
                this._correct();
                this._test();
            }
        },

        clear: function () {
            if (this.fieldConfig.type === 'dynamic') {
                this.value = '';
                this.text.html(this.value);
                this._correct();
            }
        },

        isEmpty: function () {
            return !(this.fieldConfig.type === 'static' || this.value.length === this.fieldConfig.max);
        },

        set: function (s) {
            if (this.fieldConfig.type === 'dynamic' && this.value.length < this.fieldConfig.max) {
                this.value += s;
                this.text.html(this.value);
                this._correct();
                this._test();
            }
        },

        get: function () {
            return this.value;
        },

        isActive: function () {
            return this._active;
        },

        active: function (b) {
            this._active = b;
            this.fieldPlace.css('-=field-active-' + !b);
            this.fieldPlace.css('+=field-active-' + b);
            if (b) {
                this.cursor.show();
                this.bsBox.show();
                this._correct();
            }
            else {
                this.cursor.hide();
                this.bsBox.hide();
                this.textBox.css('-=field-text-correct');
                this.textBox.css({ width: 'inherit', marginRight: '0px' });
            }
        }
    });
});