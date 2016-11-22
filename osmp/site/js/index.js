UI.loadFile.json('config.json', function (err, config) {
    if (err) log.alert(err);
    UI.loadFile.json('params.json', function (err, params) {
        if (!err) {
            config.params = params;
        }
        var core = new Core(config);
        core.start();
    });
});