(function () {
    return {
        construct: function (scope, html) {
            this.base();
            this.scope = scope;
            this.html = html;
        },

        destructor: function () {
            this.base();
            document.body.innerHTML = '';
        },

        paint: function () {
            document.body.innerHTML = this.html;
            $('bannerBtn').click(delegate(this, this._click));
        },

        _click: function () {
            this.callback('next', { page: 'site'});
        }
    };
});