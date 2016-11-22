(function (parent) {
    return parent.extend({
        construct: function (placeId, css) {
            this.base();
            this.place = $(placeId);
            this.css = css || '';
            this.active = true;
            this._visible = true;
            this._paint();
        },

        _paint: function () {
            if (this.css.length) {
                this.place.css('.' + this.css);
            }
            this.place.on('click', delegate(this, this._click));
        },

        activated: function (value) {
            this.active = value;
        },

        visible: function (value) {
            this._visible = value;
            this.place.visible(value);
        },

        _click: function () {
            if (this.active) {
                this.callback('click', {});
            }
        }
    });
});