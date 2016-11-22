(function (parent) {
    return parent.extend({
        construct: function (placeId) {
            this.base();
            this.place = $(placeId);
            this.interval = null;
            this.ninterval = 5;
            this._start();
        },

        destructor: function () {
            clearInterval(this.interval);
            this.base();
        },

        _start: function () {
            this._paint();
            this.interval = setInterval(delegate(this, this._paint), this.ninterval * 1000);
        },

        _paint: function () {
            var date = new Date(),
                hours = date.getHours().toString(),
                minutes = date.getMinutes().toString();
            hours = hours.length === 1 ? '0' + hours : hours;
            minutes = minutes.length === 1 ? '0' + minutes : minutes;

            this.place.html(hours + ':' + minutes);
        }
    });
});