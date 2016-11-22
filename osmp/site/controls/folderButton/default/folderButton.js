(function(parent) {
    return parent.extend({
        construct: function (placeId, config) {
            this.SHIFT = 3;
            //this.background = '';
            //this.color = '';
            this.logo = config.logo || '';
            this.base(placeId, config);
        },

        _paint: function () {
            this.place.html([
                '<div class="p_a" style="background-image:url(\'./img/ui_item/', this.logo, '\');"></div>',
                '<span class="ta_l">', this.text, '</span>'
            ].join(''));
            this.timeout = setTimeout(delegate(this, this._addClickHandler), this.clickTimeout);
        }
	});
});