(function(parent) {
    return parent.extend({
        construct: function (placeId, config) {
            //this.SHIFT = 3;
		    this.logo = config.logo || '';
		    this.line = config.line || 1;
		    this.base(placeId, config);
		},

		_paint: function () {
		    this.place.css('+=groupButton-type' + this.line);
		    this.place.html([
                '<div class="p_a" style="background-image:url(\'./img/ui_item/', this.logo, '\');"></div>',
                '<p class="ta_l">', this.text, '</p>'
		    ].join(''));

		    this.timeout = setTimeout(delegate(this, this._addClickHandler), this.clickTimeout);
		}
	});
});