var PagePattern = UI.QBase.extend({
    construct: function (place, config, paySession, appList) {
        this.base();
        this.place = $(place);
        this.pageConfig = config.pageConfig;
        this.interfaceConfig = config.interfaceConfig;
        this.paySession = paySession || {};
        this.appList = appList || [];
        this.pageControls = {};
        interfaceTimeout.on('end', delegate(this, this._timeoutExit));
        this.timeoutStart(this.pageConfig.timeout || 120);
        this.blockedPlaceNames = {};
        this.nextBlocked = false;

        if (paySession && paySession.payInfo && paySession.payInfo.id)
            statistics.sendData({ provider: paySession.payInfo.id });

        $('interfaceBlocked').hide();
    },

    destructor: function () {
        interfaceTimeout.stop();
        maratl.clear();

        for (var control in this.pageControls) {
            if (!this.pageControls) {
                this.pageControls[control].destructor();
            }
        }
        this.place.clearChild();
        this.base();
    },

    paint: function () {
    },

    widgetsClose: function () {
        for (var i = 0; i < this.appList.length; i++) {
        	if (this.blockedPlaceNames[this.appList[i].placeName]) continue;
        	
            if (this.appList[i].type === 'widget') {
                this.appList[i].widget.destructor();
            }
        }
    },

    appRender: function (settings) { // settings: { blocked: [string placeName ids...] }
        if (settings && settings.blocked) {
            this.blockedPlaceNames = settings.blocked.reduce(function (obj, el) {
                obj[el] = true;
                return obj;
            }, {});
        }

        var payData = {};
        if (this.paySession.payInfo.config) {
            payData = {
                data: this.paySession.payInfo.config.getPayData(),
                provider: {
                    name: this.paySession.payInfo.config.name,
                    buttonName: this.paySession.payInfo.config.buttonName,
                    cellular: this.paySession.payInfo.config.isCellular(),
                    tag: this.paySession.payInfo.config.tag,
                    path: this.paySession.payInfo.config.path,
                    logo: this.paySession.payInfo.config.logo
                }
            }
        }

        for (var i = 0; i < this.appList.length; i++) {
            if (this.blockedPlaceNames[this.appList[i].placeName]) continue;

            switch (this.appList[i].type) {
                case 'widget':
                    this._widgetAddListeners(this.appList[i].widget, payData);
                    this.appList[i].widget.create(payData);
                    break;
                case 'text':
                    break;
                case 'image':
                    break;
            }
        }
    },

    _widgetAddListeners: function (widget, payData) {
        widget.on('load', delegate(this, function (s, e) {
            widget.set({ event: 'pay', data: payData });
        }));
        widget.on('provider', delegate(this, function (s, e) {
            this.next('provider', { payInfo: { id: e } });
        }));
        widget.on('category', delegate(this, function (s, e) {
            this.next('category', { sessionInfo: { category: { categoryId: '-' + e } } });
        }));
        widget.on('search', delegate(this, function (s, e) {
            this.next('search');
        }));
        widget.on('customPage', delegate(this, function (s, e) {
            this.exitToCustomPage(e);
        }));
        widget.on('index', delegate(this, function (s, e) {
            this.exitToCustomPage('index.html');
        }));
        widget.on('nextblocked', delegate(this, function (s, e) {
            this.nextBlocked = e || true;
        }));
        widget.on('blocked', delegate(this, function (s, e) {
            $('interfaceBlocked').visible(e);
        }));
        widget.on('pause', delegate(this, function (s, e) {
            if (e.type === 'pause') {
                this.timeoutPause();
            }
            else {
                if (e.hasOwnProperty('timeout'))
                    this.timeoutStart(e.timeout);
                else {
                    this.timeoutStart();
                }
            }
        }));
        widget.on('data', delegate(this, function (s, e) { }));
    },

    timeoutStart: function (timeout) {
        interfaceTimeout.start(timeout);
    },

    timeoutPause: function () {
        interfaceTimeout.pause();
    },

    back: function (reset) {
        if (typeof reset === 'object') {
            this._deleteData(reset);
        }
        this.callback('back', {});
    },

    next: function (pageName, data) {
        if (!this.nextBlocked) {
            if (typeof data === 'object') {
                this._setData(data);
            }
            this.callback('next', { page: pageName });
        }
        else {
            this.nextBlocked = false;
            for (var i = 0; i < this.appList.length; i++) {
                if (this.appList[i].type === 'widget') {
                    this.appList[i].widget.set({
                        event: 'nexttry', data: {}
                    });
                }
            }
        }
    },

    exit: function () {
        this.callback('exit', {});
    },

    exitToCustomPage: function (pageName) {
        this.callback('exitCustom', pageName);
    },

    error: function (message) {
        this.callback('error', message);
    },

    _timeoutExit: function () {
        this.callback('timeout', {});
    },

    _setData: function (data) {
        this.callback('set', data);
    },

    _deleteData: function (reset) {
        this.callback('delete', reset);
    },

    getData: function () {
        return this.pageConfig;
    }
});