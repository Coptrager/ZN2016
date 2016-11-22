(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession, appList) {
            this.base(place, pageConfig, paySession, appList);
            this.pageControls = {
                bottomMenu: null
            };
            this.topCounter = 0;
            this.topList = [];
            this.groupList = [];
            this.topButtons = [];
            this.groupButtons = [];
            this.topPlace = null;
            this.groupsPlace = null;
        },

        destructor: function () {
            var i = 0;
            for (; i < this.topButtons.length; i++) {
                this.topButtons[i].destructor();
            }
            for (i = 0; i < this.groupButtons.length; i++) {
                this.groupButtons[i].destructor();
            }
            this.base();
        },

        paint: function () {
            this.topPlace = $('top');
            this.groupsPlace = $('groups');
            this._showRegionName();
            UI.loadFile.script('./config/confgroups.js', delegate(this, function (err, path) {
                UIGroup = null;
                UIProvider = null;
                this.topList = UITopElements.slice(0, 8) || [];
                this.topCounter = this.topList.length;
                for (var i = 0; i < this.topList.length; i++) {
                    UI.loadFile.config('./config/' + this.topList[i] + '.js', delegate(this, this._topElementLoaded));
                }
                for (i = 0; i < UIGroups.length; i++) {
                    this.groupList.push(guiConfig(UIGroups[i]));
                }

                if (UIGroups.length < 12) {
                    var tryLoadGroup = delegate(this, function (id, failCallback) {
                        UI.loadFile.config('./config/' + id + '.js', delegate(this, function (err, cfg) {
                            if (err) return failCallback();
                            this.groupList.push(guiConfig(cfg));
                            this._paintGroup();
                        }));
                    });

                    tryLoadGroup(this.interfaceConfig.get('params:index_config:additional_root_group', '-211'), delegate(this, function () {
                        tryLoadGroup('-211', delegate(this, function () {
                            this._paintGroup();
                        }));
                    }));
                }
                else {
                    this._paintGroup();
                }
                UITopElements = null;
                UIGroups = null;
            }));
            
            this.pageControls.bottomMenu = new crequire.controls.bottomMenu.script('bottomMenu');
            this.pageControls.bottomMenu.paint([
                { name: 'back' },
                { name: 'home' },
                { name: 'search' }
            ]);
            this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));

            this.appRender();
        },

        _showRegionName: function () {
            var result = 'популярные услуги',
                region = this.interfaceConfig.get('params:region_hierarchy', null);
            if (region) {
                for (var i = 0; i < region.length; i++) {
                    if (region[i].regUICalculatedBy === '1') {
                        var data = regionData.get(region[i].type);
                        if (data) result += ' ' + data.sname + ' ' + region[i].name;
                    }
                }
            }
            $('topHeadText').html(result);
        },

        _topElementLoaded: function (err, cfg) {
            if (!err && cfg) {
                var config = guiConfig(cfg);
                for (var i = 0; i < this.topList.length; i++) {
                    if (config.id === this.topList[i]) {
                        this.topList[i] = config;
                        break;
                    }
                }
            }
            this.topCounter--;
            if (this.topCounter === 0) {
                this._paintTop();
            }
        },

        _paintTop: function () {
            var counter = 0;
            for (var i = 0; i < this.topList.length; i++) {
                if (typeof this.topList[i] === 'object') {
                    counter++;
                    this.topPlace.append($({ id: 'top_' + i, cn: 'f_l topButton' }));
                    this.topButtons.push(new crequire.controls.topButton.script('top_' + i, { logo: this.topList[i].logo.standard, text: this.topList[i].buttonName, pushAnimationDuration: 150, callbackData: { id: i } }));
                    this.topButtons[this.topButtons.length - 1].on('click', delegate(this, this._clickTop));
                }
            }
            this.topPlace.css({ paddingLeft: (1260 - (counter * 130 + counter * 20)) / 2 + 'px' });
        },

        _paintGroup: function () {
            var line = 1;
            for (var i = 0; i < this.groupList.length; i++) {
                if (i === 3) line = 2;
                if (i === 6) line = 3;
                if (i === 9) line = 4;
                this.groupsPlace.append($({ cn: 'f_l groupButton-box' }).append($({ id: 'group_' + i, cn: 'f_l groupButton' })));
                this.groupButtons.push(new crequire.controls.groupButton.script('group_' + i, {
                    logo: this.groupList[i].logo.standard,
                    text: this.groupList[i].name,
                    line: line,
                    pushAnimationDuration: 150,
                    callbackData: {
                        id: i
                    }
                }));
                this.groupButtons[this.groupButtons.length - 1].on('click', delegate(this, function (s, e) {
                    this._clickGroup(this.groupList[e.id]);
                }));
            }
        },

        _clickTop: function (s, e) {
            if (this.topList[e.id].type === 'provider') {
                this._clickProvider(this.topList[e.id]);
            }
            else {
                this._clickGroup(this.topList[e.id]);
            }
        },

        _clickProvider: function (provider) {
            this.next('provider', { payInfo: { id: provider.id } });
        },

        _clickGroup: function (group) {
            if (group.isCellular()) {
                this.next('cellular');
            }
            else {
                this.next('category', { sessionInfo: { category: { categoryId: group.id } } });
            }
        },

        _navigateClick: function (s, e) {
            switch (e) {
                case 'back':
                    this.back();
                    break;
                case 'home':
                    this.exit();
                    break;
                case 'search':
                    this.next('search');
                    break;
            }
        }
    });
});