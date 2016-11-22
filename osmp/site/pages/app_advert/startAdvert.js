try {
	UI.loadFile.json('config.json', function (err, config) {
		UI.loadFile.json('params.json', function (err, params) {
			if (!err) {
				config.params = params;
			}

			config.startPage = 'app_advert';
			config.statistics = false;
			var core = new Core(config);
			core.storage.payInfo = {
				config: {
					apath:'',
					isCellular: function () {
						return false
					}, getPayData: function () {
						return window.params ? window.params: {}
					}
				}, id: localStorage['provider']
			}
			maratl._longRequest['1'] = function(){};
			core.start();
		});
	});
} catch (e) {
	terminal.processcommand('WriteToLog', 'Error parse adv list: ' + e);
}