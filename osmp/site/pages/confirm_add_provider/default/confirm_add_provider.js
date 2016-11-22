(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession) {
            this.base(place, pageConfig, paySession);

            this._providerName = this.paySession.sessionInfo.addProviderName;

            this.titleEmpty = null;
            this.title = null;
        },

        paint: function () {
            this.base();
            var providerName = this._providerName;
            if (providerName.length > 9) {
                providerName = providerName.substr(0, 8) + '...';
            }

            this.pageControls.postButton = new crequire.controls.button.script('submit-button', { clickTimeout: 0 });
            this.pageControls.postButton.on('click', delegate(this, this._postClick));

            this.pageControls.bottomMenu.paint([
                    { name: 'back' },
                    { name: 'home' },
                    { name: 'post' }
            ]);
            this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));

            $('provider-name').text(providerName);
            /* maratl.on('SearchProviders', delegate(this, this._parseList));*/
        },

        _postClick: function (s,e) {
            this._postProvider();
        },

        _postProvider: function () {
            // TODO send data!
            this.next('final_add_provider', { sessionInfo: { addProviderName: this._providerName } });
        },

        _navigateClick: function (s, e) {
            switch (e) {
                case 'back':
                    this.back();
                    break;
                case 'home':
                    this.exit();
                    break;
                case 'post':
                    this._postProvider();
                    break;
            }
        }
    });
});