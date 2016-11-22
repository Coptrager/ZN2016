(function (parent) {
    return parent.extend({
        construct: function (placeId) {
            this.base(placeId);
            this.BUTTONS_COUNT = 7;
            this.buttons = [];
            this.list = [];
            this.buttonBox = null;
            this.buttonPlace = null;
            this.marginLeft = 0;
            this.currentPage = 1;
            this._left = null;
            this._right = null;
            this._paint();
        },

        _paint: function () {
            this.place.html([
                '<div class="wh_100 d_tc">',
                    '<div class="d_ib">',
                        '<div class="p_r f_l searchProviderList-navigate">',
                            '<div class="p_a searchProviderList-left"></div>',
                        '</div>',
                        '<div class="p_r f_l searchProviderList-lp">',
                            '<div id="searchProviderListContent" class="f_l"></div>',
                        '</div>',
                        '<div class="p_r f_l searchProviderList-navigate">',
                            '<div class="p_a searchProviderList-right"></div>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join(''));
            this._left = new crequire.controls.button.script(this.place.find('.searchProviderList-left')[0], {});
            this._right = new crequire.controls.button.script(this.place.find('.searchProviderList-right')[0], {});
            this.buttonBox = this.place.find('.searchProviderList-lp')[0];
            this.buttonPlace = this.place.find('#searchProviderListContent')[0];

            this._left.on('click', delegate(this, this.left));
            this._right.on('click', delegate(this, this.right));

            this._left.hide();
            this._right.hide();
        },

        push: function (list) {
            this._default();
            this.list = list;
            this.buttonPlace.css({ width: ((list.length * 130) + (list.length + 1) * 10) + 'px' });

            var count = list.length;
            if (count > this.BUTTONS_COUNT * 2) {
                count = this.BUTTONS_COUNT * 2;
            }
            for (var i = 0; i < count; i++) {
                var place = $({ cn: 'f_l topButton' }).appendTo(this.buttonPlace),
                    config = list[i];

                this.buttons.push(new crequire.controls.topButton.script(place, config));
                this.buttons[this.buttons.length - 1].on('click', delegate(this, this._click));
            }

            if (list.length > this.BUTTONS_COUNT) {
                this.buttonBox.css({ width: '980px' });
                this.buttonPlace.css({ marginLeft: '0px' });
                this._left.show();
                this._right.show();
                this._left.active(false);
                this._right.active(true);
            }
            else {
                this.buttonBox.css({ width: 'auto' });
                this.buttonPlace.css({ margin: 'auto' });
                this._left.hide();
                this._right.hide();
            }
        },

        _push: function () {
            if (this.buttons.length < this.list.length && this.buttons.length === this.currentPage * this.BUTTONS_COUNT) {
                var i = this.currentPage * this.BUTTONS_COUNT,
                    l = i + this.BUTTONS_COUNT;
                if (l > this.list.length) {
                    l = this.list.length;
                }
                for (; i < l; i++) {
                    var place = $({ cn: 'f_l topButton' }).appendTo(this.buttonPlace),
                    config = this.list[i];

                    this.buttons.push(new crequire.controls.topButton.script(place, config));
                    this.buttons[this.buttons.length - 1].on('click', delegate(this, this._click));
                }
            }
        },

        left: function () {
            this._right.active(true);

            if (this._left.isActive()) {
                this.currentPage--;
                if (this.marginLeft < 980) {
                    this.marginLeft = 0;
                }
                else {
                    this.marginLeft -= 980;
                }
                if (this.marginLeft === 0) {
                    this._left.active(false);
                }
                this.buttonPlace.css({ marginLeft: '-' + this.marginLeft + 'px' });
            }
        },

        right: function () {
            this._left.active(true);

            if (this._right.isActive()) {
                this._push();
                this.currentPage++;
                var width = parseFloat(this.buttonPlace.css('width'));
                if (width - (this.marginLeft + 980) < 980) {
                
                    this.marginLeft += width - (this.marginLeft + 980) - 10;
                }
                else {
                    this.marginLeft += 980;
                }
                if (width - 990 === this.marginLeft) {
                    this._right.active(false);
                }
                this.buttonPlace.css({ marginLeft: '-' + this.marginLeft + 'px' });
            }
        },

        _default: function () {
            this.buttonPlace.html('');
            this.buttons = [];
            this.marginLeft = 0;
            this.currentPage = 1;
        },

        ashow: function () {
            this.place.css({ opacity: 1 });
        },

        ahide: function () {
            this.place.css({ opacity: 0 });
        },

        _click: function (s, e) {
            this.callback('insert', e);
        }
    });
});