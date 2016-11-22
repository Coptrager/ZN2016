(function (parent) {
    return parent.extend({
        construct: function (placeId) {
            this.base(placeId);
            this.INTERVAL_TIME = 200;
            this.interval = null;
            this.defaultColor = '#dbdde0';
            this.colors = ['#fab131', '#f69831', '#f48931', '#f27830', '#f16f30', '#f16f30', '#f16f30', '#f16f30'];
            this.dots = [];
            this._paint();
        },

        destructor: function () {
            clearInterval(this.interval);
            this.base();
        },

        _paint: function () {
            var content = '<div class="progressBar-dot"></div>';
            for (var i = 0; i < 8; i++) {
                content += '<div class="progressBar-dot progressBar-step"></div>';
            }
            this.place.html(content);
            this.dots = this.place.find('div');
        },

        _defaultState: function () {
            for (var i = 0; i < this.dots.length; i++) {
                this.dots[i].css({ background: this.defaultColor });
            }
        },

        start: function () {
            var i = 0,
                b = true;
            this.interval = setInterval(delegate(this, function () {
                this.dots[i].css({ background: this.colors[i] });
                if (i === 8) {
                    i = 0;
                    this._defaultState();
                }
                else {
                    i++;
                }
            }), this.INTERVAL_TIME);
        },

        stop: function () {
            clearInterval(this.interval);
            this._defaultState();
        }
    });
});