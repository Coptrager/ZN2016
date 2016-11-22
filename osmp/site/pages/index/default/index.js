(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession, appList) {
            this.base(place, pageConfig, paySession, appList);
            this.pageControls = {
                date: null,
                time: null,
                buttonPay: null,
                buttonLk: null,
                buttonBank: null,
                buttonInfo: null
            };
            this.version = this._getInterfaceVersion();
            maratl.one('TermID', delegate(this, function (s, e) {
                statistics.startSession.step1(this.version);
                statistics.startSession.step2(e.value);
            }));
            maratl.set('GetTermID');
        },

        _getInterfaceVersion: function () {
            var version = this.interfaceConfig.get('version', 'error');
            var version_suffix = this.appList
                .filter(function (x) {
                    return x.placeName === 'w_index_btn_3' && x.type === 'widget' && x.name.indexOf('_default') === -1;
                })
                .map(function (x) {
                    return x.name.split('.')[0];
                })
                .join('');
            return version + version_suffix;
        },

        paint: function () {
            storage.clear();
            maratl.set('GetSupportPhone', delegate(this, function (s, e) {
                $('text').html(e.value);
            }));

            this.pageControls.date = new crequire.controls.indexDate.script('indexDate');
            this.pageControls.time = new crequire.controls.indexClock.script('indexClock');
            this.pageControls.buttonPay = new crequire.controls.button.script('payment', { text: getUIString('buttonPay'), clickTimeout: 0 });

            if(this.interfaceConfig.get('params:index_config:vqw_qr_auth', '') == '1'){
                $('lk').css({'margin-top': '0px', padding:'26px 0 0 180px', height:'126px', background:"url('./pages/resourses/lk.png') left 40px top 26px no-repeat, url('./pages/index/default/resourses/qr.png') right 20px top 26px white no-repeat", 'background-color': 'white'});
                this.pageControls.buttonLk = new crequire.controls.button.script('lk', { text: 'VISA QIWI<br/>WALLET', clickTimeout: 0});
            }else{
               this.pageControls.buttonLk = new crequire.controls.button.script('lk', { text: getUIString('buttonLk'), clickTimeout: 0 });
            }

            this.pageControls.buttonInfo = new crequire.controls.button.script('info', {});
            this.pageControls.buttonSearch = new crequire.controls.button.script('search', {});

            this.pageControls.buttonPay.on('click', delegate(this, this.buttonPayClick));
            this.pageControls.buttonLk.on('click', delegate(this, this.buttonLkClick));
            this.pageControls.buttonInfo.on('click', delegate(this, this.buttonInfoClick));
            this.pageControls.buttonSearch.on('click', delegate(this, this.buttonSearchClick));

            emulator.start('index');

            this.appRender();
            maratl.set('SetInterfaceVersion', this.version);
        },

        buttonPayClick: function () {
            this.next('main');
        },

        buttonLkClick: function () {
            this.exitToCustomPage('./core/index.html?wallet');
        },

        buttonInfoClick: function () {
            this.next('help');
        },

        buttonSearchClick: function () {
            this.next('search');
        }
    });
});