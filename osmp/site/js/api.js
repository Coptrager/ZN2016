(function () {
    var _api = {
        browser: {},
        loadFile: {
            _getXmlHttp: null,
            _load_: null,
            json: null,
            js: null,
            script: null,
            html: null,
            css: null,
            list: null,
            config: null
        },
        storage: {
            set: null,
            put: null,
            get: null,
            remove: null,
            clear: null
        },
        delegate: null,
        dom: null,
        'class': {
            base: null,
            listener: null,
            maratl: null,
            Timeout: null,
            Widget: null
        },
        utils: {
            typeOf: null
        },
        crequire: null,
        config: null,
        guiConfig: null,
        iconfig: null,
        log: null,
        statistics: null
    };

    _api.statistics = (function () {
        var statisticVersion = "1",
            currentPage = '',
            wasActions = false;

        function getDate() {
            var now = new Date();
            return getTwoCif(now.getDate()) + '.' + getTwoCif(now.getMonth() + 1) + '.' +
                now.getFullYear() + ' ' + getTwoCif(now.getHours()) + ':' +
                getTwoCif(now.getMinutes()) + ':' + getTwoCif(now.getSeconds());

            function getTwoCif(x) {
                x = x.toString();
                return (x.length == 1) ? ('0' + x) : x;
            }
        }
        function sendWithDate(name, obj, date) {
            if (date == null)
                date = getDate();
            obj.date = date;
            //if (startSessionInfo == null) {
            send(name, obj);
               //return;
            //}
            //startSessionInfo.waitStep2Queue.push({ name: name, obj: obj });
        }
        function send(name, obj) {
            if (!active) return;
            //if (!wasActions) {
            //    if (name === 'statistics.action' && obj && obj.page === 'index') {
            //        return;
            //    } else {
            //        wasActions = true;
            //    }
            //}
            window.maratl.set(name, JSON.stringify(obj));
        }

        var startSessionInfo = {
            date: getDate(),
            waitStep2Queue: []
        };
        var active = false;

        return {
            setActive: function (value) {
                active = value;
            },
            startSession: {
                step1: function (interfaceVersion) {
                    if (startSessionInfo == null) {
                        startSessionInfo = {
                            date: getDate(),
                            waitStep2Queue: []
                        };
                    }
                    startSessionInfo.interfaceVersion = interfaceVersion;
                },
                step2: function (terminalId) {
                    if (startSessionInfo == null) return; // error?!
                    var info = startSessionInfo;
                    startSessionInfo = null;
                    sendWithDate("statistics.start", {
                        version: statisticVersion,
                        interface_version: info.interfaceVersion,
                        trm_id: terminalId
                    }, info.date);
                    wasActions = false;

                    info.waitStep2Queue.forEach(function (x) {
                        send(x.name, x.obj);
                    });
                }
            },
            pageShow: function (page) {
                currentPage = page;
                sendWithDate("statistics.action", {
                    type: "show",
                    page: page
                });
            },
            sendData: function (data, type) {
                sendWithDate("statistics.action", {
                    type: type || "data",
                    page: currentPage,
                    data: data
                });
            },
            clickAction: function (data) {
                sendWithDate("statistics.action", {
                    type: 'click',
                    page: currentPage,
                    data: data
                });
            }
        };
    })();

    //brovser api
    _api.browser = {
        version: (navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie|me)[\/: ]([\d.]+)/) || [-1, -1])[1],
        engine: (function () {
            if (typeof window.ActiveXObject !== 'undefined') return 'ie';
            else if (typeof navigator.taintEnabled === 'undefined') return 'webkit';
            else if (typeof document.__proto__ !== 'undefined') return 'gecko';
        })()
    };

    //load file api
    _api.loadFile._getXmlHttp = function () {
        var xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
                xmlhttp = false;
            }
        }
        if (!xmlhttp && typeof XMLHttpRequest !== 'undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    };
    _api.loadFile._load_ = function (fileName, type, callback) {
        var req = this._getXmlHttp();
        req.open('GET', fileName, false);
        if (type.length) {
            req.setRequestHeader('Content-Type', type);
        }
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 0 || req.status === 200) {
                    callback(null, req.responseText, fileName);
                    req = null;
                }
            }
        };
        try {
            req.send(null);
        }
        catch (e) {
            window.onerror(new Error('не удалось загрузить файл ' + fileName));
        }
    };
    _api.loadFile.test = function (fileName, callback) {
        var req = this._getXmlHttp();
        req.open('GET', fileName, false);
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 0 || req.status === 200) {
                    callback(null, req.responseText, fileName);
                    req = null;
                }
            }
        };
        try {
            req.send(null);
        }
        catch (e) {
            req = null;
            callback({
                type: 'cantLoadFile',
                file: fileName
            }, null);
        }
    };
    _api.loadFile.json = function (fileName, callback) {
        this._load_(fileName, 'text/json', function (err, req) { callback(err, JSON.parse(req), fileName); });
    };
    _api.loadFile.js = function (fileName, callback, arg) {
        var _arg = arg || [];
        this._load_(fileName, 'text/javascript', function (err, req, fileName) {
            callback(err, eval(req), fileName);
        });
    };
    _api.loadFile.script = function (fileName, callback) {
        var js = document.createElement('script');
        js.type = 'text/javascript';
        js.src = fileName;
        
        this.test(fileName, function (err, req) {
            if (err) return callback(err, req);
            js.onload = function () {
                document.body.removeChild(js);
                callback(null, fileName);
            }
            document.body.appendChild(js);
        });
    };
    _api.loadFile.html = function (fileName, callback) {
        this._load_(fileName, 'text/html', callback);
    };
    _api.loadFile.css = function (fileName, callback) {
        this._load_(fileName, 'text/css', callback);
    };
    _api.loadFile.list = function (list, callback) {
        var l = list.length,
            result = [],
            f = function (err, file, fileName) {
                if (err) {
                    callback(err, null);
                    f = function () { };
                }
                l--;
                for (var i = 0; i < result.length; i++) {
                    if (fileName === result[i]) {
                        result[i] = file;
                        break;
                    }
                }
                if (l === 0) {
                    callback(null, result);
                }
            };
        for (var i = 0; i < list.length; i++) {
            var file = [
                list[i].substr(0, list[i].lastIndexOf('.')),
                list[i].substr(list[i].lastIndexOf('.') + 1)
            ];
            result.push(list[i]);
            this[file[1]](list[i], f);
        }
    };
    _api.loadFile.config = function (fileName, callback) {
        this.script(fileName, function (err, fn) {
            if (err) {
                return callback(err, null);
            }
            var o = null;
            if (fn.indexOf('-') === -1) {
                o = UIProvider;
                UIProvider = null;
            }
            else {
                o = UIGroup;
                UIGroup = null;
            }
            callback(err, o);
        });
    };

    //storage api
    _api.storage.set = function (name, value) {
        if (arguments.length === 2 && typeof name === 'string') {
            if (typeof value === 'string') {
                window.localStorage.setItem(name, value);
            }
            else {
                window.localStorage.setItem(name, '#change_type#' + JSON.stringify(value));
            }
        }
    };
    _api.storage.put = function (name, value) {
        _api.storage.set(name, value);
    };
    _api.storage.get = function (name) {
        if (typeof name === 'string') {
            var result = localStorage.getItem(name);
            if (result) {
                if (result.indexOf('#change_type#') === 0) {
                    return JSON.parse(result.substr('#change_type#'.length));
                }
                else {
                    return result;
                }
            }
        }
        return null;
    };
    _api.storage.getAll = function () {
        var result = {};
        
        for (var i = 0; i < localStorage.length; i++) {
            result[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
        }
        return result;
    };
    _api.storage.remove = function (name) {
        if (typeof name === 'string') {
            localStorage.removeItem(name);
        }
    };
    _api.storage.clear = function () {
        localStorage.clear();
    };

    //delegate api
    _api.delegate = function (t, func, arg) {
        var fstring = typeof arguments.callee.caller === 'function' ? arguments.callee.caller.toString() : '';
            f = function () {
            try {
                if (!t.disposed) func.apply(t, arg || arguments);
            }
            catch (e) {
                window.onerror(e.message, e.fileName, e.lineNumber, fstring);
            }

        };
        f.toString = function () { return func.toString() };

        return f;
    };

    //dom api
    var _$ = function (el) {
        return new _$.module.init(el);
    }
    _$.removeNode = function (node) {
        node.parentNode.removeChild(node);
        node.onclick = null;
        node = null;
        return null;
    };
    _$.removeNodes = function (nodes) {
        while (nodes.length) {
            _$.removeNode(nodes[0]);
        }
    };
    _$.embedSWF = function (config) {
        var result = [];
        result.push([
            '<object type="application/x-shockwave-flash" ',
            (config.id ? 'id="' + config.id + '" ' : ''), 
            (config.name ? 'name="' + config.name + '" ' : ''), 
            'data="' + config.data + '" width="100%" height="100%">'
        ].join(''));
        if(config.params) {
            for (var i in config.params) {
                result.push(['<param name="', i,'" value="', config.params[i],'">'].join(''));
            }
        }
        result.push('</object>');

        return result.join('');
    };
    _$.find = function (param) {
        var elements = document.querySelectorAll(param),
            result = [];
        for (var i = 0 ; i < elements.length; i++) {
            result.push(_$(elements[i]));
        }
        return result;
    };
    _$.findOne = function (param) {
        var element = document.querySelector(param);
        return element ? _$(element) : null;
    };
    _$.findLast = function (param) {
        var elements = document.querySelectorAll(param);
        if (elements.length) {
            return _$(elements[elements.length - 1]);
        }
        return result;
    };
    _$.module = {
        init: function (el) {
            var element = null;
            switch (typeof el) {
                case 'string':
                    element = document.getElementById(el);
                    break;
                case 'undefined':
                    el = { tag: 'div' };
                case 'object':
                    if (_api.utils.typeOf(el).indexOf('HTML') === -1) {
                        element = this._ce(el);
                    }
                    else {
                        element = el;
                    }
                    break;
            }
            this.el = element;
            this.eventsList = {};
        },
        _ce: function (conf) {
            var tag = (typeof conf.tag === 'string') ? conf.tag : 'DIV',
                result = document.createElement(tag);
            if (conf.hasOwnProperty('id')) {
                result.id = conf.id;
            }
            if (conf.hasOwnProperty('cn')) {
                result.className = conf.cn;
            }
            if (conf.hasOwnProperty('html')) {
                if (typeof result.innerHTML === 'string') result.innerHTML = conf.html;
                if (typeof result.value === 'string') result.value = conf.html;
            }
            if (conf.hasOwnProperty('prop')) {
                for (var prop in conf.prop) {
                    result[prop] = conf.prop[prop];
                }
            }
            if (conf.hasOwnProperty('css')) {
                for (var prop in conf.css) {
                    result.style[prop] = conf.css[prop];
                }
            }
            return result;
        },
        attr: function (param) {
            if (typeof param === 'string') {
                if (typeof this.el[param] !== 'undefined') {
                    return this.el[param];
                }
                else {
                    return '';
                }
            }
            else if (typeof param === 'object') {
                var s = 'width,height';
                for (var f in param) {
                    if (typeof param[f] === 'number' && s.indexOf(f) !== -1) {
                        this.el[f] = param[f].toString() + 'px';
                    }
                    else {
                        this.el[f] = param[f];
                    }
                }
                return this;
            }
        },
        css: function (param) {
            if (typeof param === 'string') {
                if (param.indexOf('+=') === 0) {
                    if (this.el.className.indexOf(param.substr(2)) === -1) {
                        this.el.className += (this.el.className.length === 0 ? '' : ' ') + param.substr(2);
                    }
                    return this;
                }
                if (param.indexOf('-=') === 0) {
                    var removeClass = param.substr(2),
                        classes = this.el.className.split(' ');
                    for (var i = 0; i < classes.length; i++) {
                        if (classes[i] === removeClass) {
                            classes.splice(i, 1);
                        }
                    }
                    this.el.className = classes.join(' ');
                    return this;
                }
                try {
                    var res = window.getComputedStyle(this.el, null).getPropertyValue(param);
                    return res;
                }
                catch (e) {
                    return this.el['currentStyle'][param];
                }
            }
            else if (typeof param === 'object') {
                var s = 'width,height,top,left,margin,marginTop,marginLeft,marginRight,marginBottom,padding,paddingTop,paddingLeft,paddingRight,paddingBottom,fontSize';
                for (var f in param) {
                    if (typeof param[f] === 'number' && s.indexOf(f) !== -1) {
                        this.el['style'][f] = param[f].toString() + 'px';
                    }
                    else {
                        this.el['style'][f] = param[f];
                    }
                }
                return this;
            }
        },
        html: function (param) {
            var attr;
            if (typeof this.el.innerHTML === 'string') {
                attr = 'innerHTML';
            }
            else if (typeof this.el.value === 'string') {
                attr = 'value';
            }
            if (typeof param === 'string') {
                if (param.indexOf('+=') === 0 && param.length > 2) {
                    this.el[attr] += param.substr(2);
                }
                else if (param === '--') {
                    var space = this.el[attr].lastIndexOf('&nbsp;'),
                        idx = this.el[attr].length - 1;
                    if (space !== -1 && space === this.el[attr].length - '&nbsp;'.length) {
                        idx = space;
                    }
                    this.el[attr] = this.el[attr].substr(0, idx);
                }
                else {
                    if (param !== '+=' && param !== '--') this.el[attr] = param;
                }
                return this;
            }
            else if (typeof param === 'undefined') {
                if (attr.length) {
                    return this.el[attr];
                }
                else {
                    return '';
                }
            }
            else {
                this.el[attr] = param.toString();
            }
        },
        htmlResize: function (text) {
            if (typeof text === 'undefined' || text === '') return;

            var mw = parseFloat(this.css('max-width')),
                mh = parseFloat(this.css('max-height')),
                div, span, rect;
            if (mw !== NaN && mh !== NaN) {
                div = $({ css: { width: mw + 'px', height: mh + 'px' } }).appendTo(this);
                span = $({ tag: 'span', html: text || '', css: { fontSize: null, fontFamily: this.css('font-family') } }).appendTo(div);

                rect = span.el.getBoundingClientRect();
                while ((rect.height > mh) || (rect.width > mw)) {
                    this.css({ 'fontSize': (parseFloat(this.css('font-size')) - 1) + 'px' });
                    rect = span.el.getBoundingClientRect();
                }
            }
        },
        text: function (param) {
            if (this.el === null) return '';

            if (typeof param === 'string') {
                this.el.textContent = param;
                return;
            }

            return this.el.textContent;
        },
        rect: function () {
            return {
                top: this.css('top'),
                left: this.css('left'),
                width: this.css('width'),
                height: this.css('height')
            };
        },
        visible: function (b) {
            if (b) {
                this.css({ visibility: 'visible' });
            }
            else {
                this.css({ visibility: 'hidden' });
            }
            return this;
        },
        show: function () {
            this.css({ visibility: 'visible' });
            return this;
        },
        hide: function () {
            this.css({ visibility: 'hidden' });
            return this;
        },
		isVisible: function (){
			return this.css('visibility') != 'hidden';
		},
        append: function (el) {
            if (typeof el === 'object') {
                if (typeof el.el === 'undefined') {
                    this.el.appendChild(el);
                }
                else {
                    this.el.appendChild(el.el);
                }
            }
            return this;
        },
        appendTo: function (el) {
            if (typeof el === 'object') {
                if (typeof el.el === 'undefined') {
                    el.appendChild(this.el);
                }
                else {
                    el.el.appendChild(this.el);
                }
            }
            return this;
        },
        _event: function (event) {
            for (var i = 0; i < this.eventsList[event].length; i++) {
                this.eventsList[event][i](this);
            }
        },
        on: function (event, f) {
            if (typeof this.eventsList[event] === 'undefined') {
                this.eventsList[event] = [];
                this.el['on' + event] = (function (t) { return function () { t._event(event); }})(this);
            }
            for (var i = 0; i < this.eventsList[event].length; i++) {
                if (this.eventsList[event][i] === f) {
                    return this;
                }
            }
            this.eventsList[event].push(f);
            return this;
        },
        click: function (f) {
            this.on('click', f);
        },
        oneClick: function (f) {
            var self = this;
            var onF = function () {
                self.off('click', onF);
                f.apply(this, arguments);
            };
            this.on('click', onF);
        },
        off: function (event, f) {
            if (typeof this.eventsList[event] !== 'undefined') {
                var i = 0;
                while (i < this.eventsList[event].length) {
                    if (this.eventsList[event][i] === f) {
                        this.eventsList[event].splice(i, 1);
                    }
                    else {
                        i++;
                    }
                }
            }
            return this;
        },
        find: function (param) {
            var elements = this.el.querySelectorAll(param),
                result = [];
            for (var i = 0; i < elements.length; i++) {
                result.push(_$(elements[i]));
            }
            return result;
        },
        findOne: function (param) {
            var element = this.el.querySelector(param);
            return element ? _$(element) : null;
        },
        findLast: function (param) {
            var elements = document.querySelectorAll(param);
            if (elements.length) {
                return _$(elements[elements.length - 1]);
            }
            return result;
        },
        getData: function (name) {
            return this.el.getAttribute('data-' + name) ? this.el.getAttribute('data-' + name) : null;
        },
        createChildren: function () {
            try {
                var f = function (el) {
                    if (el.children.length) {
                        while (el.children.length) {
                            f(el.children[0]);
                        }
                    }
                    else {
                        el.onclick = null;
                        el.parentNode.removeChild(el);
                        el = null;
                        return null;
                    }
                }
                while (this.el.children.length) {
                    f(this.el.children[0]);
                }
                this.html('');
                return this;
            }
            catch (e) {
                return this;
            }
        },
        clearChild: function () {
            var f = function (el) {
                if (el.children.length) {
                    while (el.children.length) {
                        f(el.children[0]);
                    }
                }
                else {
                    el.onclick = null;
                    el.parentNode.removeChild(el);
                    el = null;
                    return null;
                }
            }
            f(this.el);
            return this;
        },
        destroy: function () {
            try {
                this.clearChild();
                this.el.parentNode.removeChild(this.el);
                this.el = null;
            }
            catch (e) {
            }
            return null;
        }
    };

    _$.module.init.prototype = _$.module;
    _api.dom = _$;

    //classes api
    var a = function () { };
    a.copy = function (a, b) {
        for (var key in b) "prototype" !== key && (a[key] = b[key])
    },
    a.ccopy = function (a, b) {
        for (var key in b) if ("prototype" !== key)
            if ("function" == typeof a[key] && "function" == typeof b[key]) {
                var c = a[key];
                a[key] = b[key];
                a[key].base = c;
            }
            else {
                a[key] = b[key];
            }
    },
    a.each = function (a, b) {
        for (var key in a) if (a.constructor.prototype[key] !== a[key] && b(key, a[key]) === !1) break
    },
    a.bind = function (a, b) {
        return function () {
            return a.apply(b, arguments);
        }
    },
    a.Class = function () { };
    a.Class.prototype.base = function () {
        return arguments.callee.caller.base.apply(this, arguments);
    };
    a.Class.extend = function (b) {
        var c = this,
            d = function () {
                var a = b.construct || c.prototype.construct || a.Class; a.apply(this, arguments);
            };
        return a.copy(d.prototype, this.prototype), a.ccopy(d.prototype, b), a.ccopy(d, this), d
    };
    a.Class.implement = function (b) {
        a.ccopy(this.prototype, b);
    };
    a.Class.stat = function (b) {
        a.ccopy(this, b);
    };
    _api['class'].base = a.Class.extend({});
    _api['class'].listener = a.Class.extend({
        construct: function () {
            this.disposed = false;
            this._al = {};
        },
        destructor: function () {
            for (var f in this) {
                this[f] = null;
            }
            this.disposed = true;
        },
        on: function (a, f) {
            if (this._al.hasOwnProperty(a)) {
                if (this._al[a].length) {
                    if (this._al[a].indexOf(f) === -1) this._al[a].push(f);
                }
                else {
                    this._al[a].push(f);
                }
            }
            else {
                this._al[a] = [];
                this._al[a].push(f);
            }
        },
        one: function (a, b) {
            var ts = b.toString(),
                f = _api.delegate(this, function (s, e) {
                    this.off(a, f);
                    b(s, e);
                });
            f.toString = function () { return ts; };
            this.on(a, f);
        },
        off: function (a, b) {
            if (this._al.hasOwnProperty(a)) {
                var index = this._al[a].indexOf(b);
                if (index !== -1) this._al[a].splice(index, 1);
            }
        },
        callback: function (a, b) {
            if (void 0 !== this._al[a])
                for (var c = this._al[a], d = 0, e = c.length; e > d; d++) {
                    void 0 === b && (b = {});
                    if (typeof c[d] === 'function')
                        c[d](this, b);
                }
        },
        clear: function () {
            this._al = {};
        }
    });
    _api['class'].maratl = new (_api['class'].listener.extend({
        construct: function () {
            this.base();
            this._cache = {};
            this._cName = {
                id: 'PrvId',
                id2: 'PrvId2',
                name: 'PrvName',
                name2: 'PrvName2',
                account: 'AccNum',
                account2: 'AccNum2',
                maxSum: 'MaxCashLimit',
                minSum: 'MinCashLimit',
                minSum2: 'MinCashLimit2'
            };

            this._longRequest = {};
            this._longRequestId = 0;
            this._responseListeners = [];
            this._longListeners = {};

            this._init();
        },

        addLongListener: function (name, callback) {
            var listeners = this._longListeners[name];
            if (listeners == null) {
                listeners = [];
                this._longListeners[name] = listeners;
            }
            listeners.push(callback);
        },
        _processLongListeners: function (name, value) {
            var self = this;
            var listeners = this._longListeners[name];
            if (listeners == null) return;
            this._longListeners[name] = [];
            listeners.forEach(function (x) {
                x(self, { name: name, value: value });
            });
        },

        _init: function () {
            try {
                window.mset = _api.delegate(this, this._response);
                terminal.OnResponse = mset;
            }
            catch (e) { }
        },
        _response: function (name, value) {
            if (name == 'network.proxy') this._parseLongRequest(value);
            this._cache[name] = value;
            this.callback(name, { name: name, value: value });
            this.callback('terminalResponse', { name: name, value: value });
            this._processLongListeners(name, value);
            this._responseListeners.forEach(function (x) { x(name, value); });
        },
        _parseLongRequest: function (res) {
            var response = JSON.parse(res);
            if (typeof response === 'object') {
                if (response.aid && typeof this._longRequest[response.aid] === 'function') {
                    var cb = this._longRequest[response.aid];
                    try {
                        if (response['result-code'] == 0) {
                            cb(null, response.response || {});
                        }
                        else {
                            cb({
                                resultCode: response['result-code'] || 666,
                                httpErrorCode: response.httperrorcode || 0,
                                transportErrorCode: response.transporterrorcode || 0
                            });
                        }
                    }
                    catch (e) { }
                }
            }
        },
        addResponseListener: function (listener) {
            var self = this;
            this._responseListeners.push(listener);
            return function () {
                self._responseListeners = self._responseListeners.filter(function (x) {
                    return x != listener;
                });
            }
        },
        proxyRequest: function (params, callback) { // params: {url, request, timeout}
            this._longRequestId++;
            var aid = 'mXmlReq-' + this._longRequestId;
            this._longRequest[aid] = callback;
            this.set('network.proxy', JSON.stringify({
                url: params.url,
                aid: aid,
                timeout: params.timeout || 30,
                request: params.request,
                headers: params.headers || {}
            }));
        },
        clear: function () {
            this._al = {};
            this._longRequest = {};
        },
        _getResName: function (command) {
            if (command.indexOf('Get') === 0) {
                return command.substr(3);
            }
            else {
                return command;
            }
        },
        set: function () {
            var name = '',
                value = 'true',
                callback = null;
            name = arguments[0];
            switch (arguments.length) {
                case 2:
                    if (typeof arguments[1] === 'string') {
                        value = arguments[1];
                    }
                    else {
                        callback = arguments[1];
                    }
                    break;
                case 3:
                    value = arguments[1];
                    callback = arguments[2];
                    break;
            }
            if (callback) {
                this.one(this._getResName(name), callback);
            }
            this._set(name, value);
        },
        _set: function (name, value) {
            try {
                terminal.ProcessCommand(name, value || 'true');
                return true;
            }
            catch (e) {
                return false;
            }
        },
        getCache: function () {
            return this._cache;
        },
        sendPay: function (pay) {
            if (pay.hasOwnProperty('id')) {
                this._set(this._getName('id'), pay.id.toString());
            }
            if (pay.hasOwnProperty('id2')) {
                this._set(this._getName('id2'), pay.id2.toString());
            }
            for (var prop in pay) {
                if (prop === 'id' || prop === 'id2') continue;
                if (pay[prop] !== '') {
                    this._set(this._getName(prop), pay[prop].toString());
                }
            }
        },
        embedMode: function (b) {
            if (b) {
                this._set('SetFakeEmbedMode', 'true');
            }
            else {
                this._set('SetFakeEmbedMode', 'false');
            }
        },
        printerStatus: function (callback) {
            this.one('PrtStatus', callback);
            this.set('GetPrtStatus');
        },
        barcodeScan: function (b) {
            if (b) {
                this._set('BarcodeScan', 'on');
            }
            else {
                this._set('BarcodeScan', 'off');
            }
        },
        mnp: function (number, callback, timeout) {
            var timeout = setTimeout(_api.delegate(this, function () { this._response('getProviderByPhone', '{"result":666}'); }), timeout || 25);
            this.set('getProviderByPhone', number, _api.delegate(this, function (s, e) {
                clearTimeout(timeout);
                callback(s, e);
            }));
        },
        online: function (callback) {
            this.one('OnlineResponse', delegate(this, function (s, e) {
                callback(JSON.parse(e.value));
            }));
            this._set('CreateOnlinePay');
        },
        testId: function (id, callback, errorCallback) {
            var _callback = callback || function () { },
                _errorCallback = errorCallback || function () { };
            this.one('PrvAllow', delegate(this, function (s, e) {
                this.off('PrvDenied', _errorCallback);
                _callback();
            }));
            this.one('PrvDenied', delegate(this, function (s, e) {
                this.off('PrvAllow', _callback);
                _errorCallback();
            }));
            this.set('PrvId', id);
        },
        _getName: function (name) {
            if (this._cName.hasOwnProperty(name)) {
                return this._cName[name];
            }
            else {
                return name;
            }
        },
        validatorOff: function (offCallback, errorCallback) {
            var fc = typeof offCallback === 'function',
                fec = typeof errorCallback === 'function';
            if (fc) {
                this.one('ValOff', delegate(this, function (s, e) {
                    if (e.value === 'true' && fc) {
                        offCallback();
                    }
                    if (e.value === 'false' && fec) {
                        errorCallback();
                    }
                }));
            }
            this._set('Validator', 'off');
        },
        getErrorDescriptionByCode: function (code) {
            switch (code.toString()) {
                case "1": return "Провайдер временно недоступен";
                case "2": return "Превышено число попыток";
                case "3": return "Техническая ошибка, нельзя отправить запрос провайдеру";
                case "4": return "Неверный формат счета/телефона";
                case "5": return "Номер не принадлежит оператору";
                case "6": return "Прием платежа запрещен, обратитесь в банк";
                case "7": return "Платеж запрещен, обратитесь к оператору";
                case "8": return "Прием платежа запрещен по техническим причинам";
                case "9": return "Timeout от провайдера";
                case "10": return "Дублирование платежа";
                case "11": return "Устаревшая версия клиентского приложения";
                case "12": return "Невозможно записать сертификат на данное хранилище";
                case "13": return "Сервер занят, повторите запрос через минуту";
                case "14": return "Принято неправильно зашифрованное сообщение.";
                case "15": return "Истекло время ожидания платежа в очереди";
                case "16": return "Превышен суточный лимит на сумму операций";
                case "17": return "Персона временно заблокирована";
                case "18": return "Ошибка при регистрации терминала";
                case "19": return "Транзакция не подтверждена в течение 24 часов";
                case "20": return "Ошибка допинформации платежа";
                case "23": return "Не удалось выставить шлюз";
                case "42": return "Провайдер не определен";
                case "71": return "Домашний оператор не может принять платеж";
                case "72": return "ЛС платежной системы не доступен";
                case "73": return "Домашний оператор не доступен";
                case "74": return "ПЦ не может принимать платежи.";
                case "75": return "Ошибка взаимодействия с провайдером";
                case "76": return "Платеж запрещен провайдером";
                case "77": return "Платеж запрещен провайдером";
                case "78": return "Провайдер не может провести платеж";
                case "79": return "Счет абонента не активен";
                case "80": return "VIP счет. Прием платежа запрешен.";
                case "81": return "Не найдено описание клиента";
                case "82": return "Провайдер запретип прием платежа ПЦ";
                case "83": return "В настоящее время прием платежа невозможен";
                case "84": return "Номер не принадлежит оператору.";
                case "85": return "Отмена платежа невозможна";
                case "86": return "Не определено состояние платежа";
                case "90": return "Проведение платежа не окончено";
                case "91": return "Платёж подозрителен";
                case "100": return "Ошибка сервера - JSP Error";
                case "101": return "Нет такого файла для загрузки";
                case "110": return "Ошибка сервера - PL/SQL Error";
                case "115": return "PL/SQL - ошибка при создании запроса МТС";
                case "116": return "Истекло время ожидания (Технические проблемы в МТС)";
                case "130": return "Платеж в адрес данного провайдера недоступен";
                case "133": return "Нет прав на прием платежей";
                case "134": return "Нет прав кассира";
                case "135": return "Нельзя списывать с чужого счета";
                case "140": return "Прием платежа невозможен из-за технического сбоя. Повторите позже";
                case "141": return "Ошибка при отправке платежа в МТС";
                case "150": return "Неверный пароль или нет прав на этот терминал";
                case "151": return "Невозможно выполнить операцию. Одноразовый пароль.";
                case "152": return "Невозможно выполнить операцию. Неодноразовый пароль.";
                case "153": return "Персона временно заблокирована. 10 неудачных попыток пароля.";
                case "154": return "Проведение платежа временно запрещено";
                case "155": return "Прием платежа для данного провайдера запрещен";
                case "156": return "В черном списке";
                case "171": return "слишком поздно";
                case "200": return "JSP - неверное значение R";
                case "201": return "Слишком много запросов с терминала";
                case "202": return "Ошибка данных запроса";
                case "203": return "Транзакция не найдена в базе данных";
                case "209": return "Ошибка авторизации";
                case "210": return "Нет такой транзакции в базе";
                case "211": return "Неверный статус транзакции";
                case "212": return "Не задана сумма платежа (или лимит терминала)";
                case "213": return "Не задана сумма списания";
                case "215": return "Транзакция с таким номером уже есть в базе";
                case "216": return "Ошибка при сохранении транзакции на сервере";
                case "217": return "Одинаковые номера терминальной транзакции в пакете";
                case "220": return "Недостаток средств у агента";
                case "221": return "Недостаточно средств на счете в банке";
                case "222": return "Ошибка при запроса баланса в БелБанке";
                case "223": return "Не заведен номер счета в БелБанке в системе";
                case "230": return "Ошибка при отправке запроса в МегаФон";
                case "231": return "Неизвестная ошибка БиЛайн";
                case "232": return "Не авторизовано Билайном";
                case "233": return "Повторный платеж в течении часа";
                case "234": return "Не прошло в Билайне";
                case "235": return "Ошибка Корбины";
                case "236": return "Договор с БиЛайн не зарегистрирован";
                case "237": return "Нет связи с Билайном";
                case "238": return "Номер телефона находится в неактивном состоянии";
                case "239": return "Некоммерческий клиент";
                case "240": return "Не проведена";
                case "241": return "Сумма слишком мала";
                case "242": return "Сумма слишком велика";
                case "243": return "Невозможно проверить состояние счета";
                case "244": return "Терминал не зарегистрирован у оператора";
                case "245": return "Неверный тип терминала";
                case "246": return "Стол находок";
                case "247": return "Ошибка при отправке запроса в Индиго";
                case "249": return "Номер Матрикс Мобайл";
                case "250": return "Ошибка Матрикса";
                case "251": return "Отказ от Матрикса";
                case "252": return "Превышена максимальная сумма оплаты для терминала";
                case "255": return "Недопустимая дополнительная комиссия";
                case "260": return "Сонет: ошибка сервера";
                case "261": return "Сонет: ошибка связи";
                case "262": return "Сонет: отказ";
                case "270": return "Ошибка от провайдера";
                case "271": return "Ошибка в ответе провайдера";
                case "272": return "Временно нет связи с провайдером";
                case "274": return "Сумма платежа должна быть целым числом";
                case "275": return "Некорректная сумма платежа";
                case "276": return "Коррекция! НЕ ПЕРЕПРОВОДИТЬ!";
                case "277": return "Обработано РИК";
                case "278": return "Обрабатывается РИК";
                case "279": return "Документ проверен ОСМП";
                case "280": return "Недостаток средств у вышестоящего агента";
                case "281": return "Невозможно отправить в РИК";
                case "282": return "Платеж на шлюз без комиссии ОСМП";
                case "290": return "Ошибка блокировки счета для списания средств";
                case "291": return "Ошибка при блокировке баланса";
                case "295": return "Запрещенный запрос";
                case "300": return "Неизвестная ошибка провайдера";
                case "301": return "Проведено РИК";
                case "302": return "Проведение для пользовательского провайдера";
                case "449": return "Неверный номер постановления";
                case "501": return "Платеж обработан банком";
                case "502": return "Ошибка обработки платежа банком";
                case "503": return "Отсутствуют необходимые данные для обработки платежа";
                case "504": return "Невозможно отправить платеж в банк";
                case "505": return "Платеж обрабатывается банком без проверки статуса";
                case "506": return "Обрабатывается банком";
                case "507": return "Платеж отменен";
                case "508": return "Платёж отменён через отдел отмен";
                default: return null;
            }
        }
    }))();

    _api['class'].Timeout = _api['class'].listener.extend({
        construct: function () {
            this.base();
            this.timeoutInfo = {
                timeoutId: null,
                startDate: null,
                time: 0
            };
        },

        start: function (time) {
            clearTimeout(this.timeoutInfo.timeoutId);
            this.timeoutInfo.time = typeof time === 'undefined' || time === null ? this.timeoutInfo.time : time;
            this.timeoutInfo.startDate = new Date().getTime();
            this.timeoutInfo.timeoutId = setTimeout(delegate(this, function () {
                this.callback('end');
                this.stop();
            }), this.timeoutInfo.time * 1000);
        },

        pause: function () {
            clearTimeout(this.timeoutInfo.timeoutId);
            this.timeoutInfo.time -= parseInt((new Date().getTime() - this.timeoutInfo.startDate) / 1000, 10);
        },

        stop: function () {
            clearTimeout(this.timeoutInfo.timeoutId);
            this.clear();
            this.timeoutInfo = {
                timeoutId: null,
                startDate: null,
                time: 0
            };
        }
    });

    _api['class'].Widget = _api['class'].listener.extend({
        construct: function (parent, appConfig, service) {
            this.base();
            this.parent = _api.dom(parent);
            this.appConfig = appConfig;
            this.iframe = null;
            this.defaultRect = {};
            this.timeout = null;
            this._messageListener = _api.delegate(this, this._message);
            this.service = service || false;
            this.serviceBlock = ['instruction', 'top', 'bottom', 'changeSize', 'fchangeSize'];
        },

        destructor: function () {
            clearTimeout(this.timeout);
            this.close();
            window.removeEventListener('message', this._messageListener, false);
            this._messageListener = null;
            this.base();
        },

        create: function () {
            this.defaultRect = this.parent.rect();
            var src = this.appConfig.path || '../adv/';
            src += this.appConfig.name + '/app.html';
            this.appConfig.id = this.appConfig.name;
            window.addEventListener('message', this._messageListener, false);
            this.iframe = _api.dom({ tag: 'iframe', prop: { width: '100%', height: '100%', src: src, scrolling: 'no' } }).appendTo(this.parent);
        },

        hide: function () {
            this.parent.hide();
        },

        show: function () {
            this.parent.show();
        },

        set: function (param) {
            if (this.iframe.el.contentWindow) {
                this.iframe.el.contentWindow.postMessage(JSON.stringify(param), '*');
            }
        },

        close: function () {
            this.set({ event: 'close' });
        },

        top: function () {
            this.parent.css({ zIndex: '666' });
        },

        bottom: function () {
            this.parent.css({ zIndex: '0' });
        },

        changeSize: function (param, speed) {
            if (speed === 'fast') {
                this.parent.css({ transition: 'all 0ms' });
            }
            else {
                this.parent.css({ transition: 'all 400ms' });
            }
            if (param === 'default') {
                this.parent.css(this.defaultRect);
            }
            else if (param === 'fullscreen') {
                this.parent.css({
                    top: '0px',
                    left: '0px',
                    width: '1280px',
                    height: '1024px'
                });
            }
            else {
                if (param.hasOwnProperty('position') && param.position === 'center') {
                    this.parent.css({
                        top: (1024 - (parseFloat(param.height) || this.parent.css('height'))) / 2,
                        left: (1280 - (parseFloat(param.width) || this.parent.css('width'))) / 2,
                        width: param.width || this.parent.css('width'),
                        height: param.height || this.parent.css('height')
                    });
                }
                else {
                    this.parent.css(param);
                }
            }
        },

        _message: function (message) {
            var message = JSON.parse(message.data);
            if (message.id === this.appConfig.id) {
                if (this.appConfig.id === this.appConfig.name) this.appConfig.id += '_' + this.appConfig.placeName;
                this._parseMessage(message);
            }
        },

        _storage: function (data) {
            if (data.method === 'getAll') {
                this.set({ event: 'allStorage', data: _api.storage.getAll() });
            }
            else {
                _api.storage[data.method](data.name, data.value || null);
            }
        },

        _parseMessage: function (message) {
            if (this.service && this.serviceBlock.indexOf(message.event) !== -1) return;
            switch (message.event) {
                case 'loaded':
                    this.timeout = setTimeout(_api.delegate(this, function () {
                        this.callback('load');
                        this.set({ event: 'config', data: this.appConfig.placeName });
                    }), 100);                    
                    break;
                case 'instruction':
                    var f = eval('(function(){' + message.data + '})');
                    f();
                    break;
                case 'payData':
                    var pay = {};
                    for (var f in message.data) {
                        pay[f] = message.data[f];
                    }
                    _api['class'].maratl.sendPay(pay);
                    break;
                case 'emulator':
                    emulator.start(message.data);
                    break;
                case 'attach':
                    switch (message.data.source) {
                        case 'maratl':
                            _api['class'].maratl.on(message.data.event, _api.delegate(this, function (s, e) {
                                this.set({ event: message.data.source + '.' + message.data.event, data: e });
                            }));
                            break;
                    }
                    break;
                case 'detach':
                    switch (message.data.source) {
                        case 'maratl':
                            _api['class'].maratl.off(message.data.event, _api.delegate(this, function (s, e) {
                                this.set({ event: message.data.source + '.' + message.data.event, data: e });
                            }));
                            break;
                    }
                    break;
                case 'top':
                    this.callback('top');
                    this.top();
                    break;
                case 'bottom':
                    this.bottom();
                    break;
                case 'changeSize':
                    this.changeSize(message.data, 'slow');
                    break;
                case 'fchangeSize':
                    this.changeSize(message.data, 'fast');
                    break;
                case 'out':
                    this.callback(message.data.type, message.data.data);
                    break;
                case 'storage':
                    this._storage(message.data);
                    break;
                default:
                    this.callback(message.event, message.data || null);
                    break;
            }
        }
    });

    _api.utils.typeOf = function (value) { return Object.prototype.toString.call(value).slice(8, -1); };

    _api.crequire = {
        _path: 'default',
        cache: false,
        controls: {},
        _callback: null,
        _counter: 0,
        _parentList: {},
        _loaderList: [],
        _useControls: [],

        _reset: function () {
            if (!this.cache) this.controls = {};
            this._parentList = {};
            this._loaderList = [];
            this._useControls = [];
        },
        _getConfigPath: function (controlName) {
            return './controls/' + controlName + '/config.json';
        },
        _getElementPath: function (controlName, type) {
            return './controls/' + controlName + '/' + this._path + '/' + controlName + '.' + type;
        },
        _isControl: function (controlName) {
            return this.controls.hasOwnProperty(controlName);
        },
        _getParent: function (controlName) {
            return this.controls[controlName].config.parent || '';
        },
        _clearList: function () {
            var i = 0,
                j,
                result = [];
            while (i < this._useControls.length) {
                j = i + 1;
                while (j !== this._useControls.length) {
                    if (this._useControls[i] === this._useControls[j]) {
                        this._useControls.splice(j, 1);
                    }
                    else {
                        j++;
                    }
                }
                i++;
            }
            while (this._useControls.length) {
                result.push(this._useControls.pop());
            }
            return result;
        },
        _createNullControl: function (controlName) {
            if (!this._isControl(controlName)) {
                this.controls[controlName] = {
                    config: null,
                    script: null,
                    css: '',
                    loaded: false,
                    installed: false
                };
                return true;
            }
            return false;
        },
        loadControls: function (controls, callback) {
            this._reset();
            this._callback = callback;
            this._loader(controls);
        },
        _loader: function (controls) {
            this._counter = controls.length;
            var i = 0;
            while (i != controls.length) {
                if (!this._createNullControl(controls[i])) {
                    this._counter--;
                    this._loaderList.push(controls[i]);
                    controls.splice(i, 1);
                }
                else {
                    i++;
                }
            }
            if (this._counter === 0) {
                this._counter = this._loaderList.length;
                for (i = 0; i < this._loaderList.length; i++) {
                    this._parseConfig(this.controls[this._loaderList[i]].config, this._loaderList[i]);
                }
            }
            else {
                for (i = 0; i < controls.length; i++) {
                    _api.loadFile.json(this._getConfigPath(controls[i]), _api.delegate(this, (function (controlName) {
                        return function (err, config) {
                            if (!err) {
                                this.controls[controlName].config = config;
                                this._loaderList.push(controlName);
                                this._parseConfig(config, controlName);
                            }
                        }
                    })(controls[i])));
                }
            }
        },
        _parseConfig: function (config, controlName) {
            this._counter--;
            var controls = [];
            if (config.hasOwnProperty('parent') && config.parent) {
                if (!this.controls.hasOwnProperty(config.parent)) {
                    this._useControls.push(config.parent);
                }
                if (!this._parentList.hasOwnProperty(config.parent)) {
                    this._parentList[config.parent] = [];
                }
                this._parentList[config.parent].push(controlName);
            }
            else {
                if (!this._parentList.hasOwnProperty(controlName)) {
                    this._parentList[controlName] = [];
                }
            }
            if (config.hasOwnProperty('use')) {
                for (var i = 0; i < config.use.length; i++) {
                    this._loaderList.push(config.use[i]);
                    if (!this.controls.hasOwnProperty(config.use[i])) {
                        this._useControls.push(config.use[i]);
                    }
                }
            }
            if (this._counter === 0) {
                if (this._useControls.length) {
                    this._loader(this._clearList());
                }
                else {
                    this._configsLoaded();
                }
            }
        },
        _configsLoaded: function () {
            this._counter = this._loaderList.length;
            for (var i = 0; i < this._loaderList.length; i++) {
                if (this.controls[this._loaderList[i]].config.hasOwnProperty('css') && this.controls[this._loaderList[i]].config.css) {
                    _api.loadFile.list([this._getElementPath(this._loaderList[i], 'js'), this._getElementPath(this._loaderList[i], 'css')], _api.delegate(this, (function (controlName) {
                        return function (err, list) {
                            if (!this.controls[controlName].loaded) {
                                this.controls[controlName].script = list[0];
                                this.controls[controlName].css = list[1].length ? list[1].replace(/#localPath/g, './controls/' + controlName + '/' + this._path) : '';
                                this.controls[controlName].loaded = true;
                            }
                            this._counter--;
                            if (this._counter === 0) {
                                this._installControls();
                            }
                        }
                    })(this._loaderList[i])));
                }
                else {
                    _api.loadFile.js(this._getElementPath(this._loaderList[i], 'js'), _api.delegate(this, (function (controlName) {
                        return function (err, js) {
                            if (!this.controls[controlName].loaded) {
                                this.controls[controlName].script = js;
                                this.controls[controlName].loaded = true;
                            }
                            this._counter--;
                            if (this._counter === 0) {
                                this._installControls();
                            }
                    }
                    })(this._loaderList[i])));
                }
            }
        },
        _installControls: function () {
            var b = true;
            while (b) {
                b = false;
                for (var controlName in this._parentList) {
                    var parentName = this._getParent(controlName);
                    if (parentName.length === 0) {
                        this._install([controlName], { script: _api['class'].listener, css: '' });
                        this._install(this._parentList[controlName], { script: this.controls[controlName].script, css: '' });
                    }
                    else {
                        if (this.controls[parentName].installed) {
                            this._install([controlName], { script: this.controls[parentName].script, css: this.controls[parentName].css });
                            this._install(this._parentList[controlName], { script: this.controls[controlName].script, css: '' });
                        }
                    }
                    if (!this.controls[controlName].installed) {
                        b = true;
                    }
                }
            }
            
            this._callback(this._loaderList);
        },
        _install: function (children, parent) {
            for (var i = 0; i < children.length; i++) {
                if (!this.controls[children[i]].installed) {
                    this.controls[children[i]].script = this.controls[children[i]].script(parent.script);
                    //this.controls[children[i]].css = parent.css + this.controls[children[i]].css;
                    this.controls[children[i]].installed = true;
                }
            }
        },
        create: function (name, args) {
            if (this.controls.hasOwnProperty(name)) {
                var f = function (ctor, args) {
                    return ctor.apply(this, args);
                };
                f.prototype = this.controls[name].script.prototype;
                return new f(this.controls[name].script, args || []);
            }
        }
    };

    _api.guiConfig = function (config) {
        var c = {
            id: config.id,
            realId: config.id,
            type: config.id.charAt(0) === '-' ? 'group' : 'provider',
            name: '',
            buttonName: '',
            postName: '',
            logo: {},
            tag: config.hasOwnProperty('tag') && config.tag.length ? ',' + config.tag + ',' : '',
            path: config.hasOwnProperty('__path') ? config.__path : '',
            apath: config.hasOwnProperty('__path') ? config.__path.split('|') : [],
            isTag: function (tagName) {
                return this.tag.indexOf(',' + tagName + ',') === -1 ? false : true;
            },
            isCellular: function () {
                return this.tag.indexOf(',ranges,') === -1 ? false : true;
            }
        };
        if (config.hasOwnProperty('__objects')) {
            var i, j, x;
            for (i = 0; i < config.__objects.length; i++) {
                switch (config.__objects[i].__type) {
                    case 'logos':
                        var logos = config.__objects[i].__objects || [];
                        for (j = 0; j < logos.length; j++) {
                            c.logo[logos[j].type] = logos[j].img;
                        }
                        break;
                    case 'constParams':
                        var constParams = config.__objects[i].__objects || [];
                        if (constParams.length) {
                            c.constParams = {};
                            var name = '';
                            for (j = 0; j < constParams.length; j++) {
                                if (constParams[j].__type === 'param') {
                                    name = constParams[j].name;
                                    if (name.indexOf('_receipt_') !== -1) {
                                        c.constParams[name] = constParams[j].value;
                                    }
                                    else if (name === 'EmbedParams') {
                                        c.constParams[name] = constParams[j].value;
                                    }
                                    else {
                                        switch (name) {
                                            case 'real_prv_id':
                                                c.realId = constParams[j].value;
                                                break;
                                            case 'prv_name':
                                                c.postName = constParams[j].value;
                                                break;
                                            default:
                                                if (name.indexOf('_extra_') === -1) {
                                                    name = '_extra_' + name;
                                                }
                                                c.constParams[name] = constParams[j].value;
                                                break;
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case 'pages':
                        var pages = config.__objects[i].__objects || [];
                        if (pages.length) {
                            c.pages = [];
                            for (j = 0; j < pages.length; j++) {
                                var o = {
                                    id: pages[j].pageId || j.toString(),
                                    online: pages[j].hasOwnProperty('useOnline') && pages[j].useOnline === 'true' ? true : false,
                                    title: pages[j].title || '',
                                    next: pages[j].nextPage || '',
                                    type: '',
                                    visible: true,
                                    controls: {},
                                    push: function (field, formatValue) {
                                        var q = 0,
                                            name = this.type === 'text_input' ? 'name' : 'disp_name';
                                        for (; q < this.controls[this.type].length; q++) {
                                            this.controls[this.type][q].disp_value = '';
                                            if (formatValue) this.controls[this.type][q].format_value = formatValue;
                                            if (this.controls[this.type][q].type !== 'button') {
                                                if (field.hasOwnProperty(this.controls[this.type][q][name])) {
                                                    this.controls[this.type][q].disp_value = field[this.controls[this.type][q][name]];
                                                    this.controls[this.type][q].empty = true;
                                                }
                                                else {
                                                    this.controls[this.type][q].empty = false;
                                                    this.controls[this.type][q].visible = false;
                                                }
                                            }
                                        }
                                    },
                                    get: function () {
                                        var result = {};
                                        for (var i = 0; i < this.controls[this.type].length; i++) {
                                            var params = this.controls[this.type][i].get();
                                            for (var param in params) {
                                                result[param] = params[param];
                                            }
                                        }
                                        return result;
                                    },
                                    getValidateData: function () {
                                        var result = [];
                                        if (this.type === 'text_input') {
                                            for (var z = 0; z < this.controls.text_input.length; z++) {
                                                result.push({
                                                    name: this.controls.text_input[z].disp_title,
                                                    value: this.controls.text_input[z].format_value || this.controls.text_input[z].disp_value
                                                }); 
                                            }
                                        }
                                        return result;
                                    }
                                },
                                controls = pages[j].__objects || [];
                                for (x = 0; x < controls.length; x++) {
                                    if (controls[x].hasOwnProperty('__objects') && controls[x].hasOwnProperty('__type') && controls[x].__type === 'controls') {
                                        controls = controls[x].__objects;
                                        break;
                                    }
                                }
                                var visibleCount = 0;
                                for (x = 0; x < controls.length; x++) {
                                    var controlsType = controls[x].type === 'button' || controls[x].type === 'disp_button' ? 'buttons' : controls[x].type;
                                    if (!o.controls.hasOwnProperty(controlsType)) {
                                        o.controls[controlsType] = [];
                                    }
                                    controls[x].disp_value = '';
                                    if (!controls[x].hasOwnProperty('disp_type')) controls[x].disp_type = '';
                                    if (!controls[x].hasOwnProperty('disp_desc')) controls[x].disp_desc = '';
                                    if (!controls[x].hasOwnProperty('disp_title')) controls[x].disp_title = '';
                                    controls[x].empty = true;
                                    var visible = (controls[x].hasOwnProperty('visible') && controls[x].visible === 'false') ? false : true;
                                    controls[x].visible = visible;
                                    if (visible) visibleCount++;
                                    controls[x].next = function () {
                                        return this.pageId || '';
                                    };
                                    (function (index) {
                                        controls[x].get = function () {
                                            var result = {};

                                            var ecrDD = this.disp_desc.split('.').join(''); // FIX BUG WITH POINT IN MARATL COMMAND NAME

                                            switch (this.type) {
                                                case 'button':
                                                case 'disp_button':
                                                    if (this.disp_type.indexOf('extra') !== -1) {
                                                        if (this.empty) result['_extra_' + this.name] = this.disp_value;
                                                        if (this.hasOwnProperty('__objects')) {
                                                            this.__objects.forEach(function (param) {
                                                                if (param.__type === 'param') {
                                                                    if (param.name.indexOf('_extra_') === 0) {
                                                                        result[param.name] = param.value;
                                                                    }
                                                                    else {
                                                                        result['_extra_' + param.name] = param.value;
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    }
                                                    if (this.disp_type.indexOf('receipt') !== -1) result['_receipt_' + ecrDD] = this.disp_value || this.altName;
                                                    if (this.disp_type.indexOf('fixedsum') !== -1) result['_extra_fixed_int_summ'] = this.disp_value || this.altName;
                                                    if (this.disp_type.indexOf('minsum') !== -1) c.newMinSum = this.disp_value || this.altName;
                                                    if (this.disp_type.indexOf('maxsum') !== -1) c.newMaxSum = this.disp_value || this.altName;
                                                    this.pageId = this.pageId || c.pages[index].next;
                                                    this.pageId = this.pageId === '-1' ? 'exit' : this.pageId;
                                                    c.pages[index].next = this.pageId;
                                                    break;
                                                case 'text_input':
                                                    result[this.name] = this.disp_value;
                                                case 'disp_input':
                                                    if (this.disp_type.length) {
                                                        if (this.disp_type.indexOf('extra') !== -1 && this.hasOwnProperty('name')) result['_extra_' + this.name] = this.disp_value;
                                                        if (this.disp_type.indexOf('receipt') !== -1) result['_receipt_' + ecrDD] = this.disp_value;
                                                        if (this.disp_type.indexOf('fixedsum') !== -1) result['_extra_fixed_int_summ'] = this.disp_value;
                                                        if (this.disp_type.indexOf('minsum') !== -1) c.newMinSum = this.disp_value;
                                                        if (this.disp_type.indexOf('maxsum') !== -1) c.newMaxSum = this.disp_value;
                                                    }
                                                    break;
                                            }
                                            return result;
                                        }
                                    })(j);
                                    o.controls[controlsType].push(controls[x]);
                                }
                                if (visibleCount === 0) o.visible = false;
                                if (o.controls.hasOwnProperty('text_input') && o.controls.hasOwnProperty('keyboard')) {
                                    o.type = 'text_input';
                                }
                                else if (o.controls.hasOwnProperty('buttons')) {
                                    o.type = 'buttons';
                                }
                                else if (o.controls.hasOwnProperty('disp_input')) {
                                    o.type = 'disp_input';
                                }
                                c.pages.push(o);
                            }
                            for (j = 0; j < c.pages.length; j++) {
                                if (c.pages[j].next === '-1' || typeof c.pages[j + 1] === 'undefined') {
                                    c.pages[j].next = 'exit';
                                }
                                else {
                                    c.pages[j].next = c.pages[j].next || c.pages[j + 1].id;
                                }
                            }
                        }
                        break;
                    case 'children':
                        var children = config.__objects[i].__objects || [];
                        if (children.length) {
                            c.children = [];
                            for (j = 0; j < children.length; j++) {
                                c.children.push(_api.guiConfig(children[j]));
                            }
                        }
                        break;
                }
            }
        }
        if (c.type === 'provider') {
            c.name = config.sName || config.name;
            c.postName = c.postName.length ? c.postName : c.name;
            if (config.hasOwnProperty('buttonName')) {
                c.buttonName = config.buttonName;
            }
            else {
                c.buttonName = c.name;
            }
            if (!c.hasOwnProperty('constParams')) c.constParams = {};
            c.inputParams = {};
            c.prvPage = config.prvPage || '';
            c.minSum = config.minSum || '1';
            c.maxSum = config.maxSum || '15000';
            c.needIdentification = config.hasOwnProperty('needPersonalInfo') && config.needPersonalInfo === '1' ? true : false;
            c.push = function (params) {
                var _f = '';
                for (var f in params) {
                    if (f !== 'account' && f.indexOf('_extra_') === -1 && f.indexOf('_receipt_') === -1) {
                        _f = '_extra_' + f;
                    }
                    else {
                        _f = f;
                    }
                    c['inputParams'][_f] = params[f];
                }
            };
            c.clear = function () {
                c.inputParams = {};
            };
            c.remove = function (type, params) {
                var _type = type === 'input' ? 'inputParams' : 'constParams',
	                result = {};
                for (var f in params) {
                    if (!c[_type].hasOwnProperty(f)) {
                        if (f !== 'account' && f.indexOf('_extra_') === -1 && f.indexOf('_receipt_') === -1) {
                            f = '_extra_' + f;
                        }
                        result[f] = c[_type][f];
                    }
                }
                c[_type] = result;
            };
            c.getPayData = function (params) {
                var data = {
                    id: c.realId,
                    name: c.postName,
                    minSum: c.newMinSum || c.minSum,
                    maxSum: c.newMaxSum || c.maxSum
                },
	            cp = params || {};
                for (var param in c.constParams) {
                    if (cp.hasOwnProperty(param)) {
                        data[param] = cp[param];
                    }
                    else {
                        data[param] = c.constParams[param];
                    }
                }
                for (var param in c.inputParams) {
                    data[param] = c.inputParams[param];
                }
                return data;
            };
            c.getValidateData = function () {
                var result = [];
                for (var z = 0; z < c.pages.length; z++) {
                    var data = c.pages[z].getValidateData();
                    for (var x = 0; x < data.length; x++) {
                        result.push(data[x]);
                    }
                }
                return result;
            }
        }
        else {
            c.name = config.name;
            c.buttonName = config.name;
            if (!c.hasOwnProperty('children')) {
                c.children = [];
            }
        }
        return c;
    };

    _api.iconfig = function (json) {
        return {
            json: json,
            get: function (str, defaultParam) {
                var result = this.json,
                    a = str.split(':');
                for (var i = 0; i < a.length; i++) {
                    if (result.hasOwnProperty(a[i])) {
                        result = result[a[i]];
                    }
                    else {
                        result = typeof defaultParam === 'undefined' ? null : defaultParam;
                        break;
                    }
                }
                return result;
            }
        };
    }

    _api.log = {
        maratl: function (message) {
            try {
                terminal.ProcessCommand('WriteToLog', message);
            }
            catch (e) { }
        },
        alert: function (message) {
            if (typeof message === 'object') {
                alert(this._objectToString(message));
            }
            else {
                alert(message.toString());
            }
        },
        _objectToString: function (object, tab) {
            var result = '',
                t = tab || '';
            for (var i in object) {
                if (typeof object[i] === 'object') {
                    result += '\n' + t + i + ': {' + this._objectToString(object[i], (t + '\t')) + '\n' + t + '}';
                }
                else {
                    result += '\n' + t + i + ': ' + object[i];
                }
            }
            return result;
        }
    };

    window.api = {
        version: '0.1',
        require: function (name) {
            if (_api.hasOwnProperty(name)) {
                return _api[name];
            }
            else {
                return null;
            }
        },
        destroy: function () {
            _api = null;
        }
    };
})();