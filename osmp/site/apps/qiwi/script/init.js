var loadFile = api.require('loadFile'),
    storage = api.require('storage'),
    messenger = api.require('class').messenger,
    pageRender = new (api.require('class').pageRender)(),
    delegate = api.require('delegate'),
    $ = api.require('dom');


window.onload = function () {
    loadFile.json('./config.json', function (err, config) {
        if (err) return messenger.error(err);

        loadFile.script('./script/app.js', function (err) {
            if (err) return messenger.error(err);

            messenger.id = config.name;
            messenger.on('close', delegate(app, app.close));
            messenger.on('pay', function (s, e) {
                config.pay = e;
            });
            messenger.on('config', function (s, e) {
                config.place = e;
                messenger.id += '_' + e;
                app.init(config);
                app.start();
            });

            messenger.loaded();
        });
    });
}

window.onerror = function () {
    if (arguments[0] !== "Error: Permission denied to access property 'toString'") {
        messenger.error({
            text: arguments[0],
            file: arguments[1],
            line: arguments[2]
        });
    }
}