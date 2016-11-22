(function(parent) {
    return parent.extend({
		construct: function(placeId, config) {
			this.base(placeId);
			this.callbackData = config.callbackData || {};
			this.pushAnimationDuration = config.pushAnimationDuration || 300;
			this.clickTimeout = config.clickTimeout || 500;
			this.timeout = null;
			this.css = config.css || '';
			this.text = config.text || '';
			this._paint();
		},

		destructor: function () {
		    clearTimeout(this.timeout);
		    this.base();
		},

		_paint: function() {
			if (this.css.length) {
			    this.place.css('+=' + this.css);
			}
			if (this.text.length) {
			    this.place.html(this.text);
			}
			this.timeout = setTimeout(delegate(this, this._addClickHandler), this.clickTimeout);
		},

		_addClickHandler: function () {
		    try{
		        this.place.click(delegate(this, this._click));
		    }
		    catch (e) {
		        //not processed
		    }
		},

		_click: function() {
			if (this._active) {
			    this.callback('click', this.callbackData);
			}
		}
	});
});