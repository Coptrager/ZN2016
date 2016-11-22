(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession) {
            this.base(place, pageConfig, paySession);
            
            this._regionId = null;
            this._regionName = '';
            this._currentState = null;
            this._stateHistory = [];
            this._searchData = null;

            if (this.paySession && this.paySession.sessionInfo) {
                this._regionId = this.paySession.sessionInfo.rostelecomRegionId;
            }
            if (this._regionId == null) {
                var region = this.interfaceConfig.get('params:region_hierarchy', null);
                if (region != null) {
                    var regionLevel3 = region.filter(function (value) { return value.level == '3'; });
                    if (regionLevel3.length == 1) {
                        this._regionId = regionLevel3[0].id;
                        if (this._regionId == '') this._regionId = null;
                    }
                }
            }
        },

        _refreshPage: function () {
            if (this._currentState == null) {
                if (this.paySession.sessionInfo.searchData != null) {
                    this.paySession.sessionInfo.searchData = null;
                    return this.back();
                }
                return this._goToSearchPage();
            }

            $('region-name').text(this._regionName);
            for (var i = 0; i < 6; i++) {
                $('button-text-' + i).text('');
                $('button-' + i).css('+=hidden');
            }

            for (var i = 0; i < 6; i++) {
                var currentService = this._currentState.services[i];
                if (currentService != null) {
                    $('button-' + i).css('-=hidden');
                    $('button-text-' + i).text(currentService.label);
                }
            }
            $('service-name').text(this._currentState.label || 'Выберите услугу');
        },

        _setButtonListeners: function () {
            for (var i = 0; i < 6; i++) {
                $('button-' + i).on('click', delegate(this, this._buttonPressed, [i]));
            }
            $('button-search').on('click', delegate(this, this._searchButtonPressed));
        },

        _goToSearchPage: function () {
            if (this._searchData == null) return;

            this.next('search', {
                sessionInfo: {
                    title: 'Введите регион Ростелеком',
                    searchData: {
                        logoPath: "./pages/rostelecom/default/resourses/",
                        stdLogo: "rostelecom.png",
                        data: this._searchData,
                        action: {
                            type: "backWithData",
                            sessionInfoPropName: "rostelecomRegionId"
                        },
                        keyboard: 'searchRegion'
                    }
                }
            });
        },

        _searchButtonPressed: function (s,e) {
            this._goToSearchPage();
        },

        _buttonPressed: function (s,e) {
            if (this._currentState == null || this._currentState.services == null) return; // ERROR
            var service = this._currentState.services[s];
            if (service == null) return;
            if (service.prvId != null) {
                this.next('provider', { payInfo: { id: service.prvId } });
                return;
            }
            this._stateHistory.push(this._currentState);
            this._currentState = service;
            this._refreshPage();
        },

        paint: function () {
            this.base();

            this.pageControls.bottomMenu.paint([
                { name: 'back' },
                { name: 'home' }
            ]);

            this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));

            this._setButtonListeners();


            var regionId = this._regionId;
            UI.loadFile.json('./pages/rostelecom/default/resourses/regions.json', delegate(this, function (err, data) {
                if (err) {
                    return this.back();
                }

                this._searchData = data.map(function (value) {
                    return {
                        text: value.name,
                        id: value.ids[0]
                    }
                });

                if (regionId == null) {
                    return this._refreshPage();
                }

                var dataItem = data.filter(function (value) {
                    return value.ids.indexOf(regionId) > -1;
                });

                if (dataItem.length < 1) {
                    return this._refreshPage();
                }
                dataItem = dataItem[0];

                this._regionName = dataItem.name;
                this._currentState = dataItem;
                this._refreshPage();
            }));
        },

        _navigateClick: function (s, e) {
            switch (e) {
                case 'back':
                    if (this._stateHistory.length != 0) {
                        this._currentState = this._stateHistory.pop();
                        this._refreshPage();
                        return;
                    }
                    delete this.paySession.sessionInfo.rostelecomRegionId;
                    this.back({ sessionInfo: this.paySession.sessionInfo });
                    break;
                case 'home':
                    this.exit();
                    break;
            }
        }
    });
});