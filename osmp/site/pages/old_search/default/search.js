(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession) {
            this.base(place, pageConfig, paySession);

            this._titleText = 'Введите название услуги';
            var searchData = null;

            if (this.paySession.sessionInfo != null) {
                this._titleText = this.paySession.sessionInfo.title || this._titleText;
                searchData = this.paySession.sessionInfo.searchData;
            } 

            this.pageControls.searchProviderList = null;
            this.pageControls.searchInput = null;
            this.pageControls.searchKeyboard = null;
            this.titleEmpty = null;
            this.title = null;

            if (searchData == null) {
                this.searchProvider = this._createMaratlSearchProvider(delegate(this, this._parseList));
                this._localSearch = false;
            } else {
                this.searchProvider = this._createCustomSearchProvider(searchData, delegate(this, this._parseList));
                this._localSearch = true;
                this._keyboardType = searchData.keyboard;
            }
        },

        destructor: function () {
            this.base();
        },

        _createMaratlSearchProvider: function (listener) {
            maratl.on('SearchProviders', function (s, e) {
                var text = e.value;

                if (text.length === 0) return listener([], true);
                
                if (text.lastIndexOf(';') === text.length - 1) text = text.substr(0, text.length - 1);
                if (text.length === 0) return listener([], true);

                var list = text.split(';'),
                    configs = [],
                    aconfig;

                if (list.length === 0) return listener([], true);

                for (var i = 0; i < list.length; i++) {
                    aconfig = list[i].split('|');
                    aconfig[1] = aconfig[1].split('^');
                    configs.push({ callbackData: { id: aconfig[0], tag: aconfig[3] }, text: (aconfig[1].length > 1 ? aconfig[1][1] : aconfig[1][0]), logo: aconfig[2] });
                }

                listener(configs, true);
            });
            
            return {
                set: function (e) {
                    maratl.set('SearchProviders', e);
                },
                press: delegate(this, function (e) {
                    if (e.id === '0') {
                        this.next('confirm_add_provider', { sessionInfo: { addProviderName: this.pageControls.searchInput.get() } });
                    }
                    else {
                        this.next('provider', { payInfo: { id: e.id } });
                    }
                })
            }
        },

        _createCustomSearchProvider: function (searchData, listener) {
            return {
                set: function (e) {
                    e = e.toLocaleLowerCase();
                    var newList = searchData.data.filter(function (value) {
                        return value.text.toLocaleLowerCase().indexOf(e) !== -1;
                    }).map(function (value) {
                        return {
                            callbackData: value.id,
                            text: value.text,
                            logo: searchData.stdLogo,
                            logoPath: searchData.logoPath
                        }
                    });

                    listener(newList, false);
                },
                press: delegate(this, function (id) {
                    if (searchData.action.type == 'backWithData') {
                        var sessuionObj = this.paySession.sessionInfo;
                        sessuionObj[searchData.action.sessionInfoPropName] = id;
                        delete sessuionObj.searchData;
                        this.back({ sessionInfo: sessuionObj });
                    }
                })
            }
        },

        paint: function () {
            this.base();

            this.titleEmpty = $('titleEmpty');
            this.title = $('title');

            this.title.text(this._titleText);

            this.pageControls.searchProviderList = new crequire.controls.searchProviderList.script('searchProviderList');
            this.pageControls.searchProviderList.hide();
            this.pageControls.searchInput = new crequire.controls.searchInput.script('searchInput');
            this.pageControls.searchKeyboard = new crequire.controls.searchKeyboard.script('searchKeyboard', this._keyboardType || 'search');

            this.pageControls.searchProviderList.on('insert', delegate(this, this._insertProvider));
            this.pageControls.searchInput.on('value', delegate(this, this._state));
            this.pageControls.searchKeyboard.on('click', delegate(this, function (s, e) {
                this.pageControls.searchInput.set(e);
            }));
            this.pageControls.searchKeyboard.on('clear', delegate(this, function (s, e) {
                this.pageControls.searchInput.clear();
            }));

            this.pageControls.bottomMenu.paint([
                    { name: 'back' },
                    { name: 'home' },
                    { name: 'forward', visible: false }
            ]);
            this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));
        },

        _state: function (s, e) {
            if ((this._localSearch && e.length > 0) || e === 'Е' || e === 'Ё' || e.length > 1) {
                this.searchProvider.set(e);

                if (!this._localSearch) {
                    if (!e.length <= 2) {
                        emulator.start('search_list');
                    }
                    else {
                        emulator.start('search_empty');
                    }
                }
            }
            else {
                this.titleEmpty.css({ opacity: 0 });
                this.title.css({ opacity: 1 });
                this.pageControls.searchProviderList.ahide();
            }
        },

        _parseList: function (configs, showAddButton) {
            this.titleEmpty.css({ opacity: (configs.length === 0 ? 1 : 0) });
            if (showAddButton) {
                configs.push({
                    callbackData: { id: '0', tag: '' },
                    text: 'ДОБАВИТЬ НОВУЮ КНОПКУ',
                    logoPath: './controls/searchProviderList/default/resourses/',
                    logo: 'add.png'
                });
            }
            this.titleEmpty.show();
            this.title.css({ opacity: 0 });
            this.pageControls.searchProviderList.show();
            this.pageControls.searchProviderList.push(configs);
            this.pageControls.searchProviderList.ashow();
        },

        _insertProvider: function (s, e) {
            this.searchProvider.press(e);
        },

        _navigateClick: function (s, e) {
            switch (e) {
                case 'back':
                    delete this.paySession.payInfo.id;
                    this.back(this.paySession.payInfo);
                    break;
                case 'home':
                    this.exit();
                    break;
                case 'forward':
                    break;
            }
        }
    });
});