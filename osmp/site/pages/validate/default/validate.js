(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession, appList) {
            this.base(place, pageConfig, paySession, appList);
            this.pageControls.triggerButton = null;
            this.contentTable = null;
            this.provider = this.paySession.payInfo.config;
            this.advert = false;

            var isATM = this.interfaceConfig.get('params:index_config:ssk_atm', '') === '1';
            this.showPayCard = isATM && this.provider.isCellular() && this.interfaceConfig.get('params:index_config:unekt', '0') === '1';
        },

        paint: function () {
            this.base();
            this.contentTable = $('contentTable');
            var table = '',
                advert = false;

            if (this.provider.isTag('validate_all_fields')) {
                var data = this.provider.getValidateData();
                for (var i = 0; i < data.length; i++) {
                    table += [
                        '<div class="f_l w_100 validateTableLine">',
                            '<div class="f_l ta_r validateTableBlock">', data[i].name, '</div>',
                            '<div class="f_l ta_l validateTableBlock">', data[i].value, '</div>',
                        '</div>'
                    ].join('');
                }
                $('yellowLine').html(table);
                table = '';
            }
            else {
                $('yellowLine').html('<p>' + this.paySession.payInfo.faccount + '</p>');
            }

            this._showProviderLogo('./img/ui_item/' + this.provider.logo.standard, false);
            this._showProviderName();

            table = '<table id="info"><tr><td class="icon"></td><td class="ta_l info-text">Продолжая оплату, вы соглашаетесь с условиями <span class="oferta">оферты</span></td></tr>';
            if (this.provider.isTag('sms_advert')) {
                table += '<tr><td><div id="advertButton"></div></td><td class="ta_l info-text">Даю свое согласие на получение информации рекламного характера на условиях <span class="oferta">оферты</span>.</td></tr>';
                advert = true;
            }
            if (!this.paySession.sessionInfo.printerStatus) {
                table += '<tr><td><div id="noPrintIcon"></div></td><td class="ta_l info-text">Извините, в данный момент принтер не может распечатать чек.<br />Вы можете отказаться от оформления платежа.<br />При желании провести платеж нажмите ДАЛЕЕ.</td></tr>';
            }
            table += '</table>';
            this.contentTable.html('+=' + table);

            if (advert) {
                this.pageControls.triggerButton = new crequire.controls.triggerButton.script('advertButton', './pages/validate/default/resourses/sms_on.png', './pages/validate/default/resourses/sms_off.png', this.paySession.sessionInfo.advert);
            }

            this.pageControls.bottomMenu.paint([
                { name: 'back' },
                { name: 'home' },
                { name: 'forward' }
            ]);
            this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));

            this.contentTable.find('.oferta').forEach(delegate(this, function (e) {
                e.on('click', delegate(this, function () { this._navigateClick(null, 'oferta'); }));
            }));

            if (this.showPayCard) {
            	// TODO save data to storage
            	this.appRender();
            } else {
            	this.appRender({ blocked: ['w_validate_card_pay'] });
            }
        },

        _navigateClick: function (s, e) {
            if (this.pageControls.triggerButton) {
                var state = this.pageControls.triggerButton.getState();
                this._setData({ sessionInfo: { advert: state } });
            }

            switch (e) {
                case 'oferta':
                    this.next('oferta');
                    break;
                case 'back':
                    this._setData({ sessionInfo: { advert: true } });
                    this.back();
                    break;
                case 'home':
                    this.exit();
                    break;
                case 'forward':
                    this.next('pay');
                    break;
            }
        }
    });
});