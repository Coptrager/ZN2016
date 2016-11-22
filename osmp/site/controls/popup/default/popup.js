(function (parent) {
    return parent.extend({
        construct: function (placeId) {
            this.base(placeId);
            this._paint();
        },

        destructor: function () {
            this.progressBar.destructor();
            this.base();
        },

        _paint: function () {
            this.place.html([
                '<div class="p_r wh_100">',
                    '<div id="popupShadow" class="wh_100"></div>',
                    '<div id="popupContentContainerAbs">',
                        '<div id="popupContentContainer">',
                            '<div id="popupContent">',
                                '<div id="popupHead"></div>',
                                '<p id="popupText"></p>',
                                '<div id="popupCloseButtonContainer">',
                                    '<div id="popupCloseButton" class="f_l"></div>',
                                '</div>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>'
            ].join(''));

            this.headerTextBox = $('popupHead');
            this.contentTextBlock = $('popupText');

            this.hideButton = new crequire.controls.button.script('popupCloseButton', { text: 'НАЗАД' });
            this.hideButton.on('click', delegate(this, this.hide));            
            
            this.hide();
        },

        show: function (header, contentHtml) {
            this.hide();
            this.base();

            this.headerTextBox.text(header);
            this.contentTextBlock.html(contentHtml);
        },

        hide: function () {
            this.base();
        }
    });
});