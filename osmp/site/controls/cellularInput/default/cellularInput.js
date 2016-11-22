(function (parent) {
    return parent.extend({
        construct: function (placeId) {
            this.base(placeId);
            this.START_POSITION = 183;
            this.SPACE = 17;
            this.FIRST_SPACE = 39;
            this.WIDTH = 37;

            this.n = [];
            this.currentBlock = 0;
            this.shortNumber = '';
            this.formatNumber = '';
            this._paint();
        },

        _paint: function () {
            this._inputBlock = $({ cn: 'p_r wh_100', html: '<span id="cellularInputSpan1">+7 (</span>' +
                '<span id="cellularInputSpan2">)</span>' + '<span id="cellularInputSpan3">-</span>' + '<span id="cellularInputSpan4">-</span>' }),
                currentPosition = this.START_POSITION;
            for (var i = 0; i < 10; i++) {
                this.n.push($({ cn: 'p_a cellularInput-box', css: { left: currentPosition + 'px' }, html: '<div></div><p>X</p>' }).appendTo(this._inputBlock));
                currentPosition += this.WIDTH;
                if (i === 2) {
                    currentPosition += this.FIRST_SPACE;
                }
                if (i === 5 || i === 7) {
                    currentPosition += this.SPACE;
                }
            }
            this._inputBlock.append($({ cn: 'p_a cellularInput-backspace-box', html: '<div class="p_r wh_100"><div class="cellularInput-backspace">' + getUIString('backspace') + '</div></div>' }).on('click', delegate(this, this._backspace)));
            this.place.append(this._inputBlock);
        },

        set: function (n) {
            if (!this._isFull()) {
                // 7x -> x; 89 -> 9
                if (this.shortNumber == '7') {
                    this.shortNumber = '';
                } else if (this.shortNumber == '8' && n == '9') {
                    this.shortNumber = '';
                }

                this.n[this.shortNumber.length].find('div')[0].css({ opacity: '100' }).html(n);
                this.n[this.shortNumber.length].find('p')[0].css({ opacity: '0' });
                this.n[this.shortNumber.length].css({ top: '14px' });
                this.shortNumber += n;

                switch (this.shortNumber.length) {
                    case 1: case 4: case 7: case 9:
                       this._inputBlock.css('+=cellularInputFill-' + this.shortNumber.length);
                }

                if (this.currentBlock < 9) this.currentBlock++;

                if (this._isFull()) {
                    this.callback('valid', this.shortNumber);
                }
                else {
                    this.callback('notvalid');
                }
            }
        },

        get: function () {
            return this.shortNumber;
        },

        clear: function () {
            while (!this._isEmpty()) this._backspace();
        },

        _backspace: function () {
            if (!this._isEmpty()) {
                switch (this.shortNumber.length) {
                    case 1: case 4: case 7: case 9:
                       this._inputBlock.css('-=cellularInputFill-' + this.shortNumber.length);
                }

                this.shortNumber = this.shortNumber.substr(0, this.shortNumber.length - 1);
                this.n[this.shortNumber.length].find('div')[0].css({ opacity: '0' });
                this.n[this.shortNumber.length].find('p')[0].css({ opacity: '100' });
                this.n[this.shortNumber.length].css({ top: '-44px' });

                if (this.currentBlock > 1) this.currentBlock--;
                this.callback('notvalid');
            }
        },

        _isEmpty: function () {
            return this.shortNumber.length === 0;
        },

        _isFull: function () {
            return this.shortNumber.length === 10;
        }
    });
});