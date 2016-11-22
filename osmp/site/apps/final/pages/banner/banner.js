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
            var id = this.scope.pay.data.id || 0;
            if ((id === '1' || id === '2' || id === '3') && this._getRandom(1, 30).toString() === id) {
                document.body.style.background = '#e9e8e6';
                messenger.top({ height: '250px' });
                document.body.innerHTML = this.html;

                setTimeout(function () {
                    $('hand').css({ top: '0px' });

                    setTimeout(function () {
                        $('hand').css({ top: '-290px' });
                        $('logo').css({ top: '-200px' });
                    }, 1100);
                }, 1500);
            }
        },

        _getRandom: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    };
});