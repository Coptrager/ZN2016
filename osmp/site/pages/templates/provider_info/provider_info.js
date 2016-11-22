(function () {
    return PagePattern.extend({
        construct: function (place, pageConfig, paySession, appList) {
            this.base(place, pageConfig, paySession, appList);
            this.logoBox = null;
            this.nameBox = null;
            this.pageControls = {
                bottomMenu: null,
                popupLoader: null
            };
            this.provider = {
                buttonName: 'none'
            };
        },

        paint: function () {
            this.logoBox = $('logoBox');
            this.nameBox = $('nameBox');

            this.pageControls.bottomMenu = new crequire.controls.bottomMenu.script('bottomMenu');
            this.pageControls.popupLoader = new crequire.controls.popupLoader.script('popupLoader');
        },

        _showProviderName: function () {
            this.nameBox.html('Оплата ' + this.provider.buttonName);
        },

        _showProviderLogo: function (logo, animate) {
            this.logoBox.css({ backgroundImage: 'url(' + logo + ')' });
            if (this.logoBox.css('top') !== '0px') {
                if (!animate) {
                    this.logoBox.css({ transition: 'backgroundImage 300ms' });
                } else {
                    this.logoBox.css({ transition: '' });
                }
                this.logoBox.css({ top: 0 });
            }
        },
        _hideProviderLogo: function (animate) {
            if (!animate) {
                this.logoBox.css({ transition: 'backgroundImage 300ms' });
            } else {
                this.logoBox.css({ transition: '' });
            }
            this.logoBox.css({ top: '-163px' });
        },

        _navigateClick: function (s, e) { }
    });
});