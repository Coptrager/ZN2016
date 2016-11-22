(function(parent) {
    return parent.extend({
        construct: function (placeId, config) {
            this.logo = config.logo || '';
            this.base(placeId, config);
        },

        _paint: function () {
            this.place.html([
                '<div class="p_a" style="background-image:url(\'./img/ui_item/', this.logo, '\');"></div>',
                '<p class="ta_l">', this.text, '</p>'
            ].join(''));
            this.timeout = setTimeout(delegate(this, this._addClickHandler), this.clickTimeout);
        }
	});
});