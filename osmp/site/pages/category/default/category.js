(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession) {
            this.base(place, pageConfig, paySession);
            this.pageControls.categoryList = null;
            this.categoryHead = null;
            this.topCategory = '';
            this.currentCategory = '';
            this.group = null;
        },

        paint: function () {
            var config = this.paySession.sessionInfo.category || null;
            if (config) {
                this.base();
                this.categoryHead = $('categoryHead');

                if (config.hasOwnProperty('categoryId')) {
                    this.topCategory = config.categoryId;
                    this.currentCategory = config.categoryId;
                    this.pageControls.categoryList = new crequire.controls.categoryList.script('categoryList', config.categoryId);
                    this.pageControls.categoryList.on('error', delegate(this, function (s, e) { this.error(e); }));
                    this.pageControls.categoryList.on('change', delegate(this, this._headChange));
                    this.pageControls.categoryList.on('click', delegate(this, this._categoryListClick));
                    this.pageControls.categoryList.paint();
                }
                else {
                    return this.error({ type: 'interfaceError', userText: 'отсутствует id группы' });
                }

                this.pageControls.bottomMenu.paint([
                    { name: 'back' },
                    { name: 'home' },
                    { name: 'search' }
                ]);
                this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));
            }
        },

        _headChange: function (s, e) {
            if (e.type === 'forward') {
                if (e.names.length) {
                    this.categoryHead.html([
                    '<div id="categoryTextOld" class="p_a ta_c">', e.names[e.names.length - 2], '</div>',
                    '<div id="categoryTextNew" class="p_a ta_c">', e.names[e.names.length - 1], '</div>'
                    ].join(''));
                }
                else {
                    this.categoryHead.html([
                    '<div id="categoryTextNew" class="p_a ta_c">', e.names[e.names.length - 1], '</div>'
                    ].join(''));
                }
            }
            else {
                if (e.names.length === 1) {
                    this.categoryHead.html([
                    '<div id="categoryTextNew2" class="p_a ta_c">', e.names[e.names.length - 1], '</div>'
                    ].join(''));
                }
                else if (e.names.length === 2) {
                    this.categoryHead.html([
                    '<div id="categoryTextOld2" class="p_a ta_c">', e.names[e.names.length - 2], '</div>',
                    '<div id="categoryTextNew2" class="p_a ta_c">', e.names[e.names.length - 1], '</div>'
                    ].join(''));
                }
                else {
                    this.categoryHead.html([
                    '<div id="categoryTextOld3" class="p_a ta_c">', e.names[e.names.length - 3], '</div>',
                    '<div id="categoryTextOld2" class="p_a ta_c">', e.names[e.names.length - 2], '</div>',
                    '<div id="categoryTextNew2" class="p_a ta_c">', e.names[e.names.length - 1], '</div>'
                    ].join(''));
                }
            }
        },

        _categoryListClick: function (s, e) {
            if (e.isCellular() && (this.paySession.payInfo.account != null)) {
                e.push({ account: this.paySession.payInfo.account });
                if (this.interfaceConfig.get('params:info:online-auth', '0') === '1') {
                    this.pageControls.popupLoader = new crequire.controls.popupLoader.script('popupLoader');
                    this.pageControls.popupLoader.show('request', 'Запрос оператору ' + e.name);
                    maratl.sendPay(e.getPayData());
                    maratl.online(delegate(this, function (res) {
                        this.pageControls.popupLoader.hide();
                        if (res.resultCode === 0) {
                            this.next('validate', { payInfo: { config: e, id: e.id } });
                        }
                        else {
                            this.pageControls.popupLoader.show('error', maratl.getErrorDescriptionByCode(res.resultCode) || 'Произошла ошибка выберите другого оператора');
                        }
                    }));
                }
                else {
                    this.next('validate', { payInfo: { config: e, id: e.id } });
                }
            }
            else {
                this.next('provider', { payInfo: { id: e.id } });
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