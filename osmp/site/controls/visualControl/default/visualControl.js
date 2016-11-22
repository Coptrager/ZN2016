(function (parent) {
    return parent.extend({
        construct: function (placeId) {
            this.base();
            this.place = typeof placeId === 'object' ? placeId : $(placeId);
            this._active = true;
        },

        destructor: function () {
            this.place.destroy();
            this.base();
        },

        active: function (b) {
            this._active = typeof b !== 'undefined' ? b : !this._active;
            if (this._active) {
                this.place.css({ opacity: 1 });
            }
            else {
                this.place.css({ opacity: 0.5 });
            }
        },

        stop: function () {
            this._active = false;
        },

        start: function () {
            this._active = true;
        },

        isActive: function () {
            return this._active;
        },

        show: function () {
            this.place.visible(true);
        },

        hide: function () {
            this.place.visible(false);
        },

		isVisible: function(){
			return this.place.isVisible();
		},

		error: function (message) {
		    this.callback('error', message);
		}
    });
});