var app = {

    init: function (config) {
        this.config = config;
        this.id = config.name;
    },

    start: function () {
        document.body.innerHTML = '<div id="bannerBtn">пошлины<br />гибдд</div>';

        $('bannerBtn').click(delegate(this, function () {
            messenger.outToProvider('5781');
        }));
    },

    close: function () {
    }
};