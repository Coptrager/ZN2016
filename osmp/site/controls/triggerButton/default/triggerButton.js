(function(parent) {
    return parent.extend({
        construct: function (placeId, imageOn, imageOff, state) {
			this.base(placeId);
			this.imageOn = imageOn;
			this.imageOff = imageOff;
			this.state = typeof state === 'undefined' ? true : state;
			this._paint();
		},

		_paint: function() {
		    if (this.state) {
		        this.place.css({ backgroundImage: 'url(' + this.imageOn + ')' });
		    }
		    else {
		        this.place.css({ backgroundImage: 'url(' + this.imageOff + ')' });
		    }
		    this.place.on('click', delegate(this, this._click));
		},

		getState: function() {
			return this.state;
		},

		_click: function () {
		    this.state = !this.state;
		    if (this.state) {
		        this.place.css({ backgroundImage: 'url(' + this.imageOn + ')' });
		    }
		    else {
		        this.place.css({ backgroundImage: 'url(' + this.imageOff + ')' });
		    }
		}
	});
});