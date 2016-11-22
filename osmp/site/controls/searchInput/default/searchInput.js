(function (parent) {
    return parent.extend({
        construct: function (placeId) {
            this.base(placeId);
            this.textBox = null;
            this.input = null;
            this._paint();
        },

        _paint: function () {
            this.place.html([
                '<div class="p_r wh_100">',
                    '<div class="searchInput-input f_l"><div class="searchInput-input-text"><p></p><div class="searchInput-input-cursor"></div></div></div>',
                    '<div class="p_a searchInput-bs-box"><div class="p_r wh_100"><div class="p_a searchInput-bs"><span>СТЕРЕТЬ</span></div></div></div>',
                '</div>'
            ].join(''));

            this.textBox = this.place.find('.searchInput-input-text')[0];
            this.input = this.place.find('.searchInput-input-text p')[0];
            this.place.find('.searchInput-bs')[0].on('click', delegate(this, this._backspace));
        },

        _correct: function () {
            if (this.input.attr('offsetWidth') > 740) {
                this.textBox.css('+=searchInput-input-text-correct');
                var width = parseFloat(this.textBox.css('width'));
                if (width - this.input.attr('offsetWidth') < 100) width += 100;
                this.textBox.css({ width: width + 'px' });
            }
            else {
                this.correct = false;
                this.textBox.css('-=searchInput-input-text-correct');
                this.textBox.css({ width: '1100px' });
            }
        },

        set: function (s) {
        	if (this.get().length >= 256) return;
            this.input.html('+=' + s);
            if (this.input.html() === '&nbsp;') this.input.html('');
            this._correct();
            this.callback('value', this.get());
        },

        get: function () {
            return this.input.html().split('&nbsp;').join(' ');
        },

        clear: function () {
            this.input.html('');
            this._correct();
            this.filling = false;
            this.callback('value', '');
        },

        _backspace: function () {
            this.input.html('--');
            if (this.input.attr('offsetWidth') < 740) {
                this._correct();
            }
            this.callback('value', this.get());
        }
    });
});