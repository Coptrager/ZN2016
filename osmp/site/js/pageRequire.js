var PageRequire = UI.QBase.extend({
    construct: function (params) {
        this.base();
        this.params = params || {};
        this.path = this.params.path || 'default';
        this.cache = this.params.cache || false;
        this.loadedList = {
            pages: {},
            templates: {}
        };
        this.pageName = '';
        this.page = {};
    },

    load: function (pageName) {
        if (this.loadedList.pages.hasOwnProperty(pageName)) {
            this.callback('load', this.loadedList.pages[pageName]);
        }
        else {
            this.pageName = pageName;
            this.loadedList.pages[pageName] = {
                config: {},
                script: null,
                html: '',
                css: {
                    page: './pages/' + pageName + '/' + this.path + '/' + pageName + '.css',
                    template: ''
                }
            };
            UI.loadFile.json('./pages/' + pageName + '/config.json', delegate(this, this._parseConfig));
        }
    },

    _getPageList: function (type, name) {
        var result = [];
        switch (type) {
            case 'page':
                result.push('./pages/' + name + '/' + this.path + '/' + name + '.js');
                result.push('./pages/' + name + '/' + this.path + '/' + name + '.html');
                break;
            case 'template':
                result.push('./pages/templates/' + name + '/' + name + '.js');
                result.push('./pages/templates/' + name + '/' + name + '.html');
                break;
        }
        return result;
    },

    _parseConfig: function (err, config) {
        this.loadedList.pages[this.pageName].config = config;
        UI.loadFile.list(this._getPageList('page', this.pageName), delegate(this, this._loaded));
    },

    _getPlacesParent: function (html) {
        var result = [],
            b = true,
            s1 = '<place id="',
            s2 = '</place>';
        while (html.indexOf('<place id="') !== -1) {
            var nStart = html.indexOf(s1),
                nStop = html.indexOf(s2) + s2.length,
                tag = html.substr(nStart, nStop),
                id = '';
            id = tag.substr(tag.indexOf('"'), tag.lastIndexOf('"') - 1);
            html.replace(tag, '#place_' + id);
            result.push(id);
        }
        return result;
    },

    _getPlacesChildren: function (html) {
        var result = [],
            b = true,
            s1 = '<place id="',
            s2 = '</place>';
        while (html.indexOf('<place id="') !== -1) {
            var nStart = html.indexOf(s1),
                nStop = html.indexOf(s2) + s2.length,
                tag = html.substr(nStart, nStop),
                id = '';
            id = tag.substr(tag.indexOf('"'), tag.lastIndexOf('"') - 1);
            html = html.replace(tag, '#place_' + id);
            result.push(id);
        }
        return result;
    },

    _assembly: function (htmlParent, html) {
        var s1 = '<place id="',
            s2 = '</place>';
        while (html.indexOf(s1) !== -1) {
            var tag = html.substr(html.indexOf(s1), html.indexOf(s2) + s2.length),
                tagHead = tag.substr(0, tag.indexOf('>') + 1),
                tagBody = tag.substr(tagHead.length, tag.length - tagHead.length - s2.length);
            html = html.replace(tag, '');
            htmlParent = htmlParent.replace(tagHead + s2, tagBody);
        }
        return htmlParent;
    },

    _loaded: function (err, list) {
        if (!err) {
            var config = this.loadedList.pages[this.pageName].config;
            if (config.hasOwnProperty('parent') && config.parent !== null) {
                var templateName = config.parent;
                if (this.loadedList.templates.hasOwnProperty(templateName)) {
                    this.loadedList.pages[this.pageName].script = list[0](this.loadedList.templates[templateName].script);
                    this.loadedList.pages[this.pageName].html = this._assembly(this.loadedList.templates[templateName].html, list[1]);
                    this.loadedList.pages[this.pageName].css.template = this.loadedList.templates[templateName].css;
                    this.callback('load', this.loadedList.pages[this.pageName]);
                }
                else {
                    UI.loadFile.list(this._getPageList('template', templateName), delegate(this, function (err, templateList) {
                        if (!err) {
                            this.loadedList.templates[templateName] = {
                                script: templateList[0](),
                                html: templateList[1],
                                css: './pages/templates/' + templateName + '/' + templateName + '.css'
                            };
                            this.loadedList.pages[this.pageName].script = list[0](templateList[0]());
                            this.loadedList.pages[this.pageName].html = this._assembly(templateList[1], list[1]);
                            this.loadedList.pages[this.pageName].css.template = this.loadedList.templates[templateName].css;
                            this.callback('load', this.loadedList.pages[this.pageName]);
                        }
                    }));
                }
            }
            else {
                this.loadedList.pages[this.pageName].script = list[0](PagePattern);
                this.loadedList.pages[this.pageName].html = list[1];
                this.callback('load', this.loadedList.pages[this.pageName]);
            }
        }
    }
});