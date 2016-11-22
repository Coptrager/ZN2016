(function () {
    return {
        construct: function (scope, html) {
            this.base();
            this.scope = scope;
            this.html = html;
        },

        destructor: function () {
            this.base();
        },

        paint: function () {
            document.body.innerHTML = this.html;
        }
    };
});