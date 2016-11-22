(function (parent) {
    return parent.extend({
        construct: function (placeId, text) {
            this.base(placeId);
            this.HEIGHT = 580;
            this.text = text;
            this.top = 0;
            this.current = 1;
            this.max = 0;
            this.buttonLeft = null;
            this.buttonRight = null;
            this.textBlock = null;
        },

        paint: function () {
            this.place.html([
                '<div class="p_r wh_100">',
                    '<div id="textScrollButtonLeft" class="p_a textScroll-button-box">',
                        '<div class="wh_100 p_r">',
                            '<div id="textScrollLeft" class="textScroll-button"></div>',
                        '</div>',
                    '</div>',
                    '<div id="textScrollButtonRight" class="p_a textScroll-button-box">',
                        '<div class="wh_100 p_r">',
                            '<div id="textScrollRight" class="textScroll-button"></div>',
                        '</div>',
                    '</div>',
                    '<div id="textScrollTextBox" class="p_a">',
                        '<div class="wh_100 p_r">',
                            '<div id="textScrollText" class="p_a ta_l"></text>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join(''));

            this.textBlock = $('textScrollText');
            this.textBlock.html(this.text);
            this.max = Math.ceil(parseFloat(this.textBlock.css('height')) / this.HEIGHT);
            this.callback('change', { current: this.current, max: this.max });

            this.buttonLeft = new crequire.controls.button.script('textScrollLeft', { text: 'ПРЕДЫДУЩАЯ' });
            this.buttonLeft.on('click', delegate(this, this._clickLeft));
            this.buttonRight = new crequire.controls.button.script('textScrollRight', { text: 'СЛЕДУЮЩАЯ' });
            this.buttonRight.on('click', delegate(this, this._clickRight));
            this.buttonLeft.active(false);
            if (this.max === 1) {
                this.buttonLeft.hide();
                this.buttonRight.hide();
            }
        },

        _clickLeft: function () {
            if (this.current !== 1) {
                this.current--;
                this.top += this.HEIGHT;
                this.textBlock.css({ top: this.top + 'px' });
                this.callback('change', { current: this.current, max: this.max });
            }
            this._test();
        },

        _clickRight: function () {
            if (this.current !== this.max) {
                this.current++;
                this.top -= this.HEIGHT;
                this.textBlock.css({ top: this.top + 'px' });
                this.callback('change', { current: this.current, max: this.max });
            }
            this._test();
        },

        _test: function () {
            if (this.current === 1) {
                this.buttonLeft.active(false);
            }
            else {
                this.buttonLeft.active(true);
            }
            if (this.current === this.max) {
                this.buttonRight.active(false);
            }
            else {
                this.buttonRight.active(true);
            }
        }
    });
});