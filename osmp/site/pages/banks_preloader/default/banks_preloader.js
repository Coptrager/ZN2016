(function(parent) {
	return parent.extend({
		construct: function(place, pageConfig, paySession) {
			this.base(place, pageConfig, paySession);

			this.timeout = -1;
		},

		paint: function () {
			this.base();
			this.showPreloader({text: "Загрузка данных"});
			//console.log(crequire);
			//setTimeout(delegate(this, this.goNext), 2000);
			//console.log("API:" + api);
			config.load('10258', delegate(this, this.configLoaded))
		},

		goNext: function() {
			this.next('banks_account');
		},

		configLoaded: function(err, config) {
			this.session.config = config;
			this.next('banks_account');
			//this.next('banks_account_type');
			//console.log(err,config);
		}
	});
});

