var PageRender = UI.QBase.extend({
    construct: function (placeName, config, startParams) {
        this.base();
        this.SHOW_COUNT = 10;
        this.place = $(placeName);
        this.placeName = placeName;
        this.startParams = startParams || {};
        this.config = {
            advert: config.get('advert'),
            startPage: config.get('startPage'),
            count: config.get('count') || this.SHOW_COUNT,
            iconfig: config
        };
        this.sessionStorage = {};
        this.currentPage = '';
        this.pageStack = [];
        this.templateLink = document.getElementById('templateStyle');
        this.pageLink = document.getElementById('pageStyle');
        this.style = document.getElementById('controlStyle');
        this.pageRequire = new PageRequire();
        this.pageRequire.on('load', delegate(this, this._paint));
        this.pageScript = null;
        this.showCounter = 0;
        
        this.advertRender = new AdvertRender(this.config.advert, config.get('patchList'));

        emulator.active = config.get('emulator');
        statistics.setActive(config.get('statistics'));
    },

    destructor: function () {
        this.pageRequire.destructor();
        this.pageScript.destructor();
        this.advertRender.destructor();

        this.base();
    },

    _init: function () {
        maratl.embedMode(true);
        maratl.set('CreatePay');
        maratl.printerStatus(delegate(this, function (s, e) {
            if (e.value === 'Error') this.sessionStorage.sessionInfo.printerStatus = false;
        }));
        maratl.addLongListener('TermID', delegate(this, function (s, e) {
            this.sessionStorage.sessionInfo.terminal = e.value;
        }));
        maratl.set('GetTermID');
        emulator.start('zero');
    },

    render: function (pageName) {
        this.callback('page', pageName);
        statistics.pageShow(pageName);
        if (pageName === this.config.startPage) {
            this.showCounter++;
            this.sessionStorage = {
                sessionInfo: this.startParams.sessionInfo || {},
                payInfo: this.startParams.payInfo || {}
            };
            this.sessionStorage.sessionInfo.printerStatus = true;
            this.sessionStorage.sessionInfo.advert = true;
            this.sessionStorage.sessionInfo.terminal = '';

            this.startParams.sessionInfo = null;
            this.startParams.payInfo = null;
            this.config.startPage = 'index';

            this._init();
        }
        this.currentPage = pageName;
        if (this.pageStack.length === 0) {
            this.pageStack.push({
                name: pageName,
                data: {}
            });
        }
        else if (this.pageStack[this.pageStack.length - 1].name !== pageName) {
            this.pageStack.push({
                name: pageName,
                data: {}
            });
        }
        this.pageRequire.load(pageName);
    },

    _hideBorder: function () {
        if (parseFloat(document.body.offsetWidth) < 1282 && parseFloat(document.body.offsetHeight) < 1026) {
            document.getElementById('content0').style.border = '0px';
        }
    },

    _paint: function (s, e) {
        this.place.hide();
        this._hideBorder();
        this._clear();
        this._addPageStyle(e.css);
        this.place.html(e.html);
        
        var controlsList = this._getControlsList(e.config.use || []),
            bannerList = this._getBannersList(),
            config = {
                pageConfig: e.config,
                interfaceConfig: this.config.iconfig
            };
        
        var appsList = [];
        
        var prvId = this.sessionStorage.payInfo.id || 0,
            grpId = this.sessionStorage.payInfo.config ? this.sessionStorage.payInfo.config.apath : [];

        appsList = this.advertRender.get(this.currentPage, bannerList, prvId, grpId);

        this.pageScript = new e.script(this.placeName, config, this.sessionStorage, appsList);
        if (controlsList.length) {
            crequire.loadControls(controlsList, delegate(this, this._controlsLoaded));
        }
        else {
            this._controlsLoaded([]);
        }
    },

    _controlsLoaded: function (controls) {
        var styles = '';
        for (var i = 0; i < controls.length; i++) {
            styles += '\n' + crequire.controls[controls[i]].css;
        }
        this._addStyle(styles);

        this.pageScript.on('set', delegate(this, this._setData));
        this.pageScript.on('delete', delegate(this, this._deleteData));
        this.pageScript.on('next', delegate(this, function (s, e) { this._navigate('next', e); }));
        this.pageScript.on('back', delegate(this, function (s, e) { this._navigate('back', e); }));
        this.pageScript.on('exit', delegate(this, function (s, e) { this._navigate('exit', e); }));
        this.pageScript.on('exitCustom', delegate(this, function (s, e) { this._navigate('exitCustom', e); }));
        this.pageScript.on('timeout', delegate(this, function (s, e) { this._navigate('timeout', e); }));
        this.pageScript.on('error', delegate(this, function (s, e) { this._navigate('error', e); }));
        
        this.pageScript.paint();
        setTimeout(delegate(this, function () { this.place.show(); }), 1);
    },

    _setData: function (s, e) {
        for (var prop in e) {
            for (var prop2 in e[prop]) {
                this.sessionStorage[prop][prop2] = e[prop][prop2];
            }
        }
    },

    _deleteData: function (s, e) {
        if (e.hasOwnProperty('sessionInfo')) {
            this.sessionStorage.sessionInfo = e.sessionInfo;
        }
        if (e.hasOwnProperty('payInfo')) {
            this.sessionStorage.payInfo = e.payInfo;
        }
    },

    _dropStack: function () {
        this.pageStack = [];
    },

    _defaultState: function () {
        this.pageScript.destructor();
        this._dropStack();
        this.render(this.config.startPage);
    },

    _getControlsList: function (configControls) {
        var list = document.querySelectorAll('[data-type="control"]'),
            result = [],
            push = function (value) {
                for (var i = result.length; i--;) {
                    if (result[i] === value) return;
                }
                result.push(value);
            };
        for (var i = configControls.length; i--;) {
            push(configControls[i]);
        }
        for (var i = list.length; i--;) {
            if (list[i].getAttribute('data-control')) {
                push(list[i].getAttribute('data-control'));
                list[i].className += ' p_a ' + list[i].getAttribute('data-control');
            }
            else {
                result.push(list[i].id);
                list[i].className += ' p_a ' + list[i].id;
            }
        }
        return result;
    },

    _getBannersList: function () {
        var list = document.querySelectorAll('[data-type="banner"]'),
            result = [];
        for (var i = 0; i < list.length; i++) {
            list[i].className += ' p_a app';
            result.push(list[i].id);
        }
        return result;
    },

    _clear: function () {
        this.place.html('');
        //this.templateLink.href = '';
        //this.pageLink.href = '';
        this._dropStyle();
    },

    _addPageStyle: function (links) {
        var parent = document.getElementsByTagName('head')[0];
        if (this.templateLink.parentNode) parent.removeChild(this.templateLink);
        if (this.pageLink.parentNode) parent.removeChild(this.pageLink);
        if (links.template.length) {
            this.templateLink.href = links.template;
            parent.appendChild(this.templateLink);
        }
        if (links.page.length) {
            this.pageLink.href = links.page;
            parent.appendChild(this.pageLink);
        }
    },

    _addStyle: function (style) {
        try {
            this.style.innerHTML += '\n' + style;
        }
        catch (e) {
            this.style.styleSheet.cssText += style; //ie <9
        }
    },

    _dropStyle: function () {
        try {
            this.style.innerHTML = '';
        }
        catch (e) {
            this.style.styleSheet.cssText = ''; //ie <9
        }
    },

    _savePageData: function () {
        this.pageStack[this.pageStack.length - 1].data = this.pageScript.getData();
        this.pageScript.destructor();
        this.pageScript = null;
    },

    _back: function () {
        do {
            this.pageStack.splice(this.pageStack.length - 1, 1);
        }
        while (this.pageStack.length && this.pageStack[this.pageStack.length - 1].data.hasOwnProperty('skip'));

        this.pageScript.destructor();
        this.pageScript = null;
        this.render(this.pageStack.length ? this.pageStack[this.pageStack.length - 1].name : 'index');
    },

    _nextPage: function (pageName) {
        try {
            this._savePageData();
        } catch (e) { /* problem 2 when error handling */ }
        this.render(pageName);
    },

    _navigate: function (type, params) {
        emulator.stop();
        try {
            this.pageScript.widgetsClose();
        } catch (e) { /* problem 1 when error handling */ }
        setTimeout(delegate(this, function () {
            switch (type) {
                case 'next':
                    this._nextPage(params.page);
                    break;
                case 'back':
                    this._back();
                    break;
                case 'error':
                    this.callback('error', params);
                    break;
                case 'exit':
                case 'timeout':
                    this.exit(type, params);
                    break;
                case 'exitCustom':
                    this.callback('exitCustom', params);
                    break;
            }
        }), 1);
    },

    exit: function (type, params) {
        if (this.showCounter >= this.config.count) {
            this.callback('restart', {});
        }
        else {
            this._defaultState();
        }
    }
});