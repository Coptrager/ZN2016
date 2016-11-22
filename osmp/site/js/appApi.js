(function () {
    var _api = {
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
        Interface: null,
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
            messenger: null,
            pageRender: null
        },
        utils: {
            typeOf: null
        },
        guiConfig: null
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
        req.open('GET', fileName, true);
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

        this._load_(fileName, 'text/javascript', function (err, req) {
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
                localStorage.setItem(name, value);
                _api['class'].messenger.set({ event: 'storage', data: { method: 'set', name: name, value: value } });
            }
            else {
                localStorage.setItem(name, '#change_type#' + JSON.stringify(value));
                _api['class'].messenger.set({ event: 'storage', data: { method: 'set', name: name, value: '#change_type#' + JSON.stringify(value) } });
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
    _api.storage.remove = function (name) {
        if (typeof name === 'string') {
            localStorage.removeItem(name);
            _api['class'].messenger.set({ event: 'storage', data: { method: 'remove', name: name, value: null } });
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
                func.apply(t, arg || arguments);
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
        var result = '';
        var width = ' width="' + (config.attributes.hasOwnProperty('width') ? config.width : '100%'),
            height = ' height="' + (config.attributes.hasOwnProperty('height') ?  config.height : '100%'),
            embed = '<embed';
        result = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + (config.hasOwnProperty('id') ? ' id="' + config.id + '" ' : 'project') + width + height + '>';
        if (config.hasOwnProperty('params') && typeof config.params === 'object') {
            for (var name in config.params) {
                embed += ' ' + name + '="' + config.params[name] + '"';
                result += '<param name="' + name + '" value="' + config.params[name] + '">';
            }
        }

        result += '<param name="movie" value="' + config.file + '">';

        if (config.hasOwnProperty('flashvars') && typeof config.flashvars === 'object') {
            var fv = '';
            for (var name in config.flashvars) {
                fv += '&' + name + '=' + config.flashvars[name];
            }
            fv = fv.substr(1);
            result += '<param name="FlashVars" value="' + fv + '">';
            embed += ' ' + fv;
        }
        embed += '/>';
        result += embed;
        result += '</object>';

        this.e.html(result);
    };
    _$.find = function (param) {
        var elements = document.querySelectorAll(param),
            result = [];
        for (var i = 0 ; i < elements.length; i++) {
            result.push(_$(elements[i]));
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
            var oElement = this.el,
                oResult = { left: 0, top: 0, width: parseFloat(oElement.offsetWidth), height: parseFloat(oElement.offsetHeight) };
            while (oElement) {
                oResult.left += oElement.offsetLeft;
                oResult.top += oElement.offsetTop;
                oElement = oElement.offsetParent;
            }
            return oResult;
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
        isVisible: function () {
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
                this.el['on' + event] = (function (t) { return function () { t._event(event); } })(this);
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

    _api['class'].messenger = new (_api['class'].listener.extend({
        construct: function () {
            this.base();
            this.id = '';
            window.onmessage = _api.delegate(this, this._message);
        },

        _message: function (message) {
            var data = JSON.parse(message.data);
            this.callback(data.event, data.data || null);
        },

        loaded: function () {
            this.set({ event: 'loaded', data: null });
        },

        set: function (message) {
            message.id = this.id;
            parent.postMessage(JSON.stringify(message), '*');
        },

        //global storage
        getStorage: function (callback) {
            this.one('allStorage', _api.delegate(this, function (s, e) {
                for (var f in e) {
                    _api.storage.set(f, e[f]);
                }
                callback();
            }));
            this.set({ event: 'storage', data: { method: 'getAll', name: null, value: null } });
        },

        instruction: function (instruction) {
            this.set({
                event: 'instruction',
                data: instruction
            });
        },

        sendPayData: function (data) {
            this.set({
                event: 'payData',
                data: data
            });
        },

        attach: function (source, callback, data) {
            var temp = source.split('.'),
                asource = [];
            if (temp.length > 2) {
                asource.push(temp[0]);
                temp.splice(0, 1);
                asource.push(temp.join('.'));
            }
            else {
                asource = temp;
            }
                
            this.on(source, callback);
            this.set({
                event: 'attach',
                data: {
                    source: asource[0],
                    event: asource[1]
                }
            });
            if (data) {
                this.sendPayData(data);
            }
        },
        detach: function (source, callback) {
            var asource = source.split('.');
            this.off(source, callback);
            this.set({
                event: 'detach',
                data: {
                    source: asource[0],
                    event: asource[1]
                }
            });
        },

        nextBlocked: function (b) {
            this.set({ event: 'nextblocked', data: b });
        },

        blocked: function () {
            this.set({ event: 'blocked', data: true });
        },

        unblocked: function () {
            this.set({ event: 'blocked', data: false });
        },

        pause: function () {
            this.set({ event: 'pause', data: { type: 'pause' } });
        },

        resume: function (time) {
            this.set({ event: 'pause', data: { type: 'resume', timeout: (typeof time === 'undefined' ? null : time) } });
        },

        top: function (size, speed) {
            this.set({ event: 'top' });
            if (typeof size !== 'undefined') {
                var method = speed && speed === 'slow' ? 'changeSize' : 'fchangeSize';
                this[method](size);
            }
        },

        bottom: function () {
            this.set({ event: 'bottom' });
        },

        changeSize: function (newRect) {
            this.set({ event: 'changeSize', data: newRect });
        },

        fchangeSize: function (newRect) {
            this.set({ event: 'fchangeSize', data: newRect });
        },

        outToProvider: function (id) {
            this.set({ event: 'out', data: { type: 'provider', data: id } });
        },

        outToCategory: function (id) {
            this.set({ event: 'out', data: { type: 'category', data: id } });
        },

        outToSearch: function () {
            this.set({ event: 'out', data: { type: 'search' } });
        },

        outToCustomPage: function (page) {
            this.set({ event: 'out', data: { type: 'customPage', data: page } });
        },

        outToIndexPage: function () {
        	this.set({ event: 'out', data: { type: 'index' } });
        },

        emulator: function (testName) {
            this.set({ event: 'emulator', data: testName });
        },

        error: function (error) {

        }
    }))();

    _api['class'].pageRender = a.Class.extend({
        construct: function () {
            this.scope = {};
            this.path = [];
            this.currentPage = null;
        },

        destructor: function () {
            if (this.currentPage) this.currentPage.destructor();
        },

        set: function (config) {
            this.scope = config;
        },

        paint: function (pageName) {
            this.path.push(pageName);

            if (this.currentPage) this.currentPage.destructor();
            this.currentPage = null;

            _api.loadFile.list(['./pages/' + pageName + '/' + pageName + '.js', './pages/' + pageName + '/' + pageName + '.html'], _api.delegate(this, function (err, list) {
                this.currentPage = new (_api['class'].listener.extend(list[0]()))(this.scope, list[1]);

                this.currentPage.on('out', _api.delegate(this, this.out));
                this.currentPage.on('next', _api.delegate(this, this.next));
                this.currentPage.on('back', _api.delegate(this, this.back));
                this.currentPage.on('exit', _api.delegate(this, this.exit));
                this.currentPage.on('close', _api.delegate(this, this.close));
                this.currentPage.paint();
            }));
        },

        next: function (s, e) {
            this.scope = this.currentPage.scope;
            this.paint(e.page);
        },

        back: function (s, e) {
            if (this.path.length > 1) {
                this.path.pop();
                this.paint(this.path.pop());
            }
        },

        out: function (s, e) {
            switch (e.type) {
                case 'provider':
                    messenger.outToProvider(e.id);
                    break;
                case 'category':
                    messenger.outToCategory(e.id);
                    break;
                case 'search':
                    messenger.outToSearch();
                    break;
                case 'index':
                    messenger.outToIndexPage();
                    break;
            }
        },

        exit: function (s, e) {
            var method = e && e === 'slow' ? 'changeSize' : 'fchangeSize';
            messenger.bottom();
            messenger[method]('default');
            var firstPage = this.path[0];
            this.path = [];
            this.paint(firstPage);
        },

        close: function (s, e) {
            this.currentPage.destructor();
            document.body.innerHTML = '';
            messenger.bottom();
            messenger.unblocked();
        }
    });

    _api.utils.typeOf = function (value) { return Object.prototype.toString.call(value).slice(8, -1); };

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
                                    push: function (fields) {
                                        if (this.type !== 'button') {
                                            var q = 0,
                                                name = this.type === 'text_input' ? 'name' : 'disp_name';
                                            for (; q < this.controls[this.type].length; q++) {
                                                this.controls[this.type][q].disp_value = '';
                                                if (fields.hasOwnProperty(this.controls[this.type][q][name])) {
                                                    this.controls[this.type][q].disp_value = fields[this.controls[this.type][q][name]];
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
                                    if (!o.controls.hasOwnProperty(controls[x].type)) {
                                        o.controls[controls[x].type] = [];
                                    }
                                    controls[x].disp_value = '';
                                    if (!controls[x].hasOwnProperty('disp_type')) controls[x].disp_type = '';
                                    if (!controls[x].hasOwnProperty('disp_desc')) controls[x].disp_desc = '';
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
                                                        if (this.hasOwnProperty('name') && this.empty) result['_extra_' + this.name] = this.disp_value;
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
                                                    c.pages[index].next = this.pageId || c.pages[index].next;
                                                    break;
                                                case 'text_input':
                                                    result[this.name] = this.disp_value;
                                                case 'disp_input':
                                                    if (this.disp_type.length) {
                                                        if (this.disp_type.indexOf('extra') !== -1 && this.hasOwnProperty('name')) result['_extra_' + this.name] = this.disp_value;
                                                        if (this.disp_type.indexOf('receipt') !== -1) result['_receipt_' + ecrDD] = this.disp_value;
                                                        if (this.disp_type.indexOf('fixedsum') !== -1) result['_extra_fixed_int_summ'] = this.disp_value;
                                                        if (this.disp_type.indexOf('minsum') !== -1) c.newMinSum = this.disp_value;
                                                    }
                                                    break;
                                            }
                                            return result;
                                        }
                                    })(j);
                                    o.controls[controls[x].type].push(controls[x]);
                                }
                                if (visibleCount === 0) o.visible = false;
                                if (o.controls.hasOwnProperty('text_input') && o.controls.hasOwnProperty('keyboard')) {
                                    o.type = 'text_input';
                                }
                                else if (o.controls.hasOwnProperty('button')) {
                                    o.type = 'button';
                                }
                                else if (o.controls.hasOwnProperty('disp_button')) {
                                    o.type = 'disp_button';
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
                    maxSum: c.maxSum
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