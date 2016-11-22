var app = {

    init: function (config) {
        this.config = config;
        this.id = config.name;
    },

    start: function () {
        pageRender.set(this.config);
        pageRender.paint('banner');
    },

    close: function () {
    }
};