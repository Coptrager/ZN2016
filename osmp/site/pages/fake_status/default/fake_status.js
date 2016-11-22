(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession) {
            this.base(place, pageConfig, paySession);
        },

        paint: function () {
            this.base();
            this.pageControls.popupLoader.show('request', 'Поиск платежа');
            setTimeout((function () {
                this.pageControls.popupLoader.hide();
                $('fake_content').show();
            }).bind(this), 2000);
            this.pageControls.bottomMenu.paint([
                { name: 'home' }
            ]);
            this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));

            $('success').html(this._getDateString());
            $('provider').html(this.paySession.payInfo.config.name);
            $('account').html(this.paySession.payInfo.faccount);
            $('summ').html(this.paySession.payInfo.sum.enrolled + ' руб.');

            $.findOne('#bottom span').click((function () { this._navigateClick(null, 'help'); }).bind(this));
        },

        _getDateString: function () {
            var date = new Date();
            var get2Digit = function(inData) {
                var str = '' + inData;
                return (str.length == 1) ? '0' + str : str;
            }
            return get2Digit(date.getDate()) + '.' + get2Digit(date.getMonth() + 1) + '.' + date.getFullYear();
        },

        _navigateClick: function (s, e) {
            switch (e) {
                case 'help':
                    this.next('help');
                    break;
                case 'home':
                    this.exit();
                    break;
            }
        }
    });
});