(function (parent) {
    return parent.extend({
        construct: function (place, settings) {
            this.base(place);
            this.mailElements = [];
            this.currentEmail = '';

            var mailElements = this.mailElements;
            var self = this;

            var parentPlace = $({ cn: "keyboard-tips__content" });
            this._getMailSites().forEach(function (x) {
                var el =  $({ tag: 'button', cn: 'keyboard-tips__item keyboard-tips__item_hidden', html: x });
                self.mailElements.push({
                    name: x,
                    el: el
                });
                el.click(function () {
                    statistics.clickAction({ suggest: 'email' });
                    self.callback('tip', x.substring(self.currentEmail.length));
                });
                parentPlace.append(el);
            });
            place.append(parentPlace);
            this._paint();
        },

        setInputValue: function (newValue) {
            if (newValue.indexOf('@') !== -1) {
                var emailServers = newValue.split('@');
                var emailServer = emailServers[emailServers.length-1].toLowerCase();
                this.currentEmail = emailServer;

                var suggestCounts = 0;
                var fullEmailSuggest = null;

                this.mailElements.forEach(function (x) {
                    if (x.name.indexOf(emailServer) === 0) { // todo normal test
                        x.el.css('-=keyboard-tips__item_hidden');
                        suggestCounts++;
                        if (emailServer.length === x.name.length) fullEmailSuggest = x;
                    } else {
                        x.el.css('+=keyboard-tips__item_hidden');
                    }
                });
                if ((suggestCounts === 1) && (fullEmailSuggest !== null)) {
                    fullEmailSuggest.el.css('+=keyboard-tips__item_hidden');
                }
            } else {
                this.mailElements.forEach(function (x) {
                    x.el.css('+=keyboard-tips__item_hidden');
                });
            }
        },

        _getMailSites: function () {
            return ['mail.ru', 'yandex.ru', 'bk.ru', 'rambler.ru', 'gmail.com', 'list.ru',
            'inbox.ru', 'ya.ru', 'playpw.com', 'hotmail.com', 'yahoo.com', 'ro.ru',
            'spaces.ru', 'qip.ru', 'ngs.ru', 'sibmail.com', 'lenta.ru', 'pochta.ru',
            'e1.ru', 'narod.ru', 'live.ru', 'ukr.net', 'beelinewifi.ru', 'yandex.ua',
            'mail.ua', 'tut.by', 'yandex.com', 'icloud.com', 'nm.ru', 'km.ru',
            'pisem.net', 'land.ru', 'post.ru', 'sibnet.ru', 'front.ru'];
        },
        _paint: function () {

        }
    });
});