var app = {

    init: function (config) {
        this.scope = config;
        this.id = config.name;
    },

    start: function () {
        pageRender.set(this.scope);
        pageRender.paint(this.scope.startPage);
    },

    close: function () {
        pageRender.destructor();
    }
};