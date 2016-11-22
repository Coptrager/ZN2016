var app = {

    init: function (config) {
        this.config = config;
        this.id = config.name;
    },

    start: function () {
        var scope = {
            terminalInfo: {

            },
            widgetConfig: this.config
        };
        pageRender.set(scope);
        pageRender.paint('banner');
    },

    close: function () {
    }
};