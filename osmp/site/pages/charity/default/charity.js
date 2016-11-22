(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession) {
            this.base(place, pageConfig, paySession);
            this.config = paySession.payInfo.config;
        },

        paint: function () {
            this.base();
            $('headText').text(this.config.name);
            if (this.config.logo.charity) {
                var imPlace = $('page-charity-image-container');
                imPlace.html('<div id="page-charity-image" style="background:url(img/ui_item/charity/' + this.config.logo.charity + ') center no-repeat;"></div>');
            }
            this._showProviderLogo('./img/ui_item/' + this.config.logo.standard, true);
            this.nameBox.html(this.config.buttonName);

            this.pageControls.bottomMenu.paint([
                    { name: 'back' },
                    { name: 'home' },
                    { name: 'wantHelp' }
            ]);

            this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));
        },

        _navigateClick: function (s, e) {
            switch (e) {
                case 'back':
                    this.back({ payInfo: {} });
                    break;
                case 'home':
                    this.exit();
                    break;
                case 'wantHelp':
                    this.next('charity_phone_number');
                    break;
            }
        }
    });
});