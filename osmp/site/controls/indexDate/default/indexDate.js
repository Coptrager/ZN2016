(function (parent) {
    return parent.extend({
        construct: function (placeId) {
            this.base();
            this.place = $(placeId);
            this.months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
            this.days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
            this._paint();
        },

        _paint: function () {
            var date = new Date(),
                day = date.getDate(),
                dayOfWeek = this.days[date.getDay()],
                month = this.months[date.getMonth()];

            this.place.html(day + ' ' + month + ', ' + dayOfWeek);
        }
    });
});