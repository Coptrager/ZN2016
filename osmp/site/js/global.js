var UI = {
        browser: api.require('browser'),
        loadFile: api.require('loadFile'),
        storage: api.require('storage'),
        Q: api.require('class').base,
        QBase: api.require('class').listener,
        log: api.require('log')
    },
    maratl = api.require('class').maratl,
    interfaceTimeout = new (api.require('class').Timeout)(),
    Widget = api.require('class').Widget,
    storage = api.require('storage'),
    config = api.require('config'),
    guiConfig = api.require('guiConfig'),
    iconfig = api.require('iconfig'),
    crequire = api.require('crequire'),
    delegate = api.require('delegate'),
    statistics = api.require('statistics'),
    log = api.require('log'),
    $ = api.require('dom');

if (window.emulator == null) {
    window.emulator = {
        active: true,
        timers: [],
        start: function (page) {},
        stop: function () {}
    };
}

//storage.set('interfaceStartParams', { page: 'category', sessionInfo: { categoryId: '-162' } });