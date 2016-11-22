(function(parent) {
    return parent.extend({
        construct: function (placeId, config) {
            this.logoPath = config.logoPath || './img/ui_item/';
		    this.logo = config.logo || '';
		    this.base(placeId, config);
		},

		_paint: function () {
		    this.place.html([
                '<div class="p_a" style="background-image:url(\'', this.logoPath, this.logo, '\');"></div>'
		    ].join(''));
		    $({ tag: 'p', cn: 'p_a ta_c', css: { maxWidth: '120px', maxHeight: '55px' } })
		    	.appendTo(this.place)
		    	.htmlResize(this.text);
		    this.timeout = setTimeout(delegate(this, this._addClickHandler), this.clickTimeout);
		}
	});
});