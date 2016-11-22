var AdvertRender = UI.QBase.extend({
    construct: function (show, patchList) {
        this.base();
        this.show = show;
        this.patchList = patchList ? this._preparationList(patchList) : null;
        this.defaultPlayList = this._preparationList(adv_array_default);
        this.playList = this._renderPlayList(window.adv_array || []);
    },

    //преобразуем плей-лист в нужный формат
    _renderPlayList: function (playList) {
        var result = { services: {}},
            i = 0,
            j = 0;

        if (this.show) {
            for (; i < playList.length; i++) {
                if (playList[i][0].indexOf('_services') === -1) {
                    result[playList[i][0]] = [];
                    for (j = 0; j < playList[i][1].length; j++) {
                        result[playList[i][0]].push({
                            type: playList[i][1][j][0],
                            file: playList[i][1][j][1],
                            list: playList[i][1][j][2],
                            path: '../adv/'
                        });
                    }
                }
                else {
                    var params = playList[i][0].split('_');
                    if (params.length === 2) {
                        result.services[params[0]] = [];
                        for (j = 0; j < playList[i][1].length; j++) {
                            result.services[params[0]].push({
                                type: playList[i][1][j][0],
                                file: playList[i][1][j][1],
                                list: playList[i][1][j][2],
                                path: '../adv/'
                            });
                        }
                    }
                }
            }
        }
        for (var place in this.defaultPlayList) {
            if (!result.hasOwnProperty(place)) {
                result[place] = this.defaultPlayList[place];
            }
            if (place === 'services') {
                for (var page in this.defaultPlayList.services) {
                    if (!result.services.hasOwnProperty(page)) result.services[page] = [];
                    for (j = 0; j < this.defaultPlayList.services[page].length; j++) {
                        result.services[page].push(this.defaultPlayList.services[page][j]);
                    }
                }
            }
        }
        
        if (this.patchList) {
            for (place in this.patchList) {
                result[place] = this.patchList[place];
            }
        }

        return result;
    },

    _preparationList: function (list) {
        for (var f in list) {
            for (var i = 0; i < list[f].length; i++) {
                if (!list[f][0].hasOwnProperty('type')) list[f][0].type = 'widget';
                if (!list[f][0].hasOwnProperty('list')) list[f][0].list = [0];
                if (!list[f][0].hasOwnProperty('path')) list[f][0].path = './apps/';
            }
        }
        return list;
    },

    _selectBanner: function (playList, banner, prvId, grpId) {
        var resultProject = null,
            adverts = [];

        if (playList.hasOwnProperty(banner)) {
            for (j = 0; j < playList[banner].length; j++) {
                if (playList[banner][j].list.length === 1 && playList[banner][j].list[0] === 0) {
                    adverts.push(playList[banner][j]);
                }
                else {
                    for (var x = 0; x < playList[banner][j].list.length; x++) {
                        if (playList[banner][j].list[x].toString() === prvId || grpId.indexOf(playList[banner][j].list[x].toString()) !== -1) {
                            adverts.push(playList[banner][j]);
                            break;
                        }
                    }
                }
            }

            if (adverts.length) {
                var project = {};
                if (adverts.length === 1) {
                    project = adverts[0];
                }
                else {
                    project = adverts[this._getRandom(0, adverts.length - 1)];
                }
                resultProject = { placeName: banner, type: project.type, name: project.file, content: '', widget: null };
                switch (project.type) {
                    case 'widget':
                        resultProject.widget = new Widget(banner, { path: project.path, name: project.file.split('.')[0], placeName: banner });
                        break;
                    case 'text':
                        resultProject.content = '<table class="wh_100"><tr><td align="center">' + project.file + '</td></tr></table>';
                        break;
                    case 'image':
                        resultProject.content = project.path + project.file;
                        break;
                }
            }
        }

        return resultProject;
    },

    //отображаем рекламу
    get: function (pageName, banners, prvId, grpId) {
        var project = null,
            resultList = [],
            j = 0;

        for (var i = 0; i < banners.length; i++) { 
            project = this._selectBanner(this.playList, banners[i], prvId, grpId);
            if (project === null) project = this._selectBanner(this.defaultPlayList, banners[i], prvId, grpId);
            if (project === null) {
                $(banners[i]).hide();
            }
            else {
                resultList.push(project);
            }
            project = null;
        }
        if (this.playList.services.hasOwnProperty(pageName)) {
            for (j = 0; j < this.playList.services[pageName].length; j++) {
                resultList.push({
                    placeName: 'services_block',
                    type: this.playList.services[pageName][j].type,
                    name: this.playList.services[pageName][j].file,
                    widget: new Widget('services_block', { path: this.playList.services[pageName][j].path, name: this.playList.services[pageName][j].file.split('.')[0], placeName: 'services_block' }, true)
                });
            }
        }
        
        return resultList;
    },

    _getRandom: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

});