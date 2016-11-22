var app = {

    init: function (config) {
        this.config = config;
        this.id = config.name;
    },

    start: function () {
        loadFile.html('./pages/banner.html', delegate(this, function (err, html) {
            document.body.innerHTML = html;

            $('bannerBtn').click(delegate(this, function () {
                messenger.outToCategory('162');
            }));

        }));
    },

    close: function () {
    }
};