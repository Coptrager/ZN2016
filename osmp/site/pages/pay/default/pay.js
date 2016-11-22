(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession, appList) {
            this.base(place, pageConfig, paySession, appList);
            this.provider = this.paySession.payInfo.config;
            this.payInfo = {
                made: 0,
                enrolled: 0,
                deliveryEnrolled: 0,
                commiss: 0,
                coinCommiss: {
                    init: false,
                    percent: 0,
                    value: 0
                }
            };
            this.places = {
                made: null,
                enrolled: null,
                commiss: null,
                commissSmallTable: null,
                deliveryEnrolled: null,
                deliveryСommiss: null
            };

            this.currentCommissLine = -1;
            this.inputSum = false;

            this.hasDelivery = this.paySession.payInfo.delivery != null;
            this.valOfTrue = false;
        },

        paint: function () {
            this.base();
            this._sendPayInfo();
            this.places = {
                made: $('made'),
                enrolled: $('enrolled'),
                commiss: $('kommiss'),
                commissSmallTable: $('commissSmallTable'),
                deliveryEnrolled: $('deliveryEnrolled'),
                deliveryCommiss: $('deliveryCommiss')
            };

            this._validatorOn();
            this._showProviderLogo('./img/ui_item/' + this.provider.logo.standard, false);
            this._showProviderName();

            if (this.hasDelivery) {
                // Со сдачей
                $('deliveryBlock').css({ display: 'block' });
            }
            this.pageControls.commissTable = crequire.create('commissTable', ['commissTable', (this.hasDelivery ? 'small' : 'big'), !(this.interfaceConfig.get('params:index_config:hidecommission', '') == '1')]);
            this.pageControls.popup = new crequire.controls.popup.script('popup');

            this.pageControls.bottomMenu.paint([
                { name: 'home', active: false },
                { name: 'pay', active: false }
            ]);

            this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));

            this.appRender();
        },

        _sendPayInfo: function () {
            if (this.paySession.sessionInfo.hasOwnProperty('advert') && !this.paySession.sessionInfo.advert) {
                this.provider.push({ _extra_no_sms: '1' });
            }
            if (this.paySession.sessionInfo.hasOwnProperty('printerStatus') && !this.paySession.sessionInfo.printerStatus) {
                this.provider.push({ _extra_nopaper: '1' });
            }
            if (this.paySession.sessionInfo.hasOwnProperty('extra')) {
                var extras = {};
                for (var i = 0; i < this.paySession.sessionInfo.extra.length; i++) {
                    extras[this.paySession.sessionInfo.extra[i].name] = this.paySession.sessionInfo.extra[i].value;
                }
                this.provider.push(extras);
            }

            maratl.one('PrvDenied', delegate(this, this.exit));
            maratl.one('AccDenied', delegate(this, this.exit));
            maratl.sendPay(this.provider.getPayData());
            if (this.hasDelivery) {
                maratl.sendPay(this.paySession.payInfo.delivery);
            }
            maratl.one('CommissionsInfo', delegate(this, this._maratlData));

            maratl.set('GetCommissionsInfo');
            emulator.start('GetCommissionsInfo');
        },

        _processMinMaxForbidden: function () {
            var info = {
                'MinCash': { received: false, value: '' },
                'MaxCash': { received: false, value: '' },
                'system.getforbiddenbanknotes': { received: false, value: '' },
                parse: function () {
                    if (this.MinCash.received && this.MaxCash.received && this['system.getforbiddenbanknotes'].received) {
                        var str = [];
                        var forbidden = [];
                        var forbiddenStr = '';
                        str.push(['Можно внести не меньше ', this.MinCash.value, ' руб. и не больше ', this.MaxCash.value, ' руб.'].join(''));
                        forbidden = JSON.parse(this['system.getforbiddenbanknotes'].value);
                        for (var i = 0; i < forbidden.length; i++) {
                            forbiddenStr += (forbidden.length > 1 && i === forbidden.length - 1 ? ' и ' : ', ') + forbidden[i].value;
                        }
                        if (forbiddenStr.length) str.push(['<span>Не принимаются купюры' + forbiddenStr.substr(1) + ' руб.</span>'].join(''));
                        $('minMaxBlockedText').html(str.join('<br />')).css("+=minMaxBlockedText-visible");
                    }
                }
            };

            var callback = function (s, e) {
                info[e.name].received = true;
                info[e.name].value = e.value;
                info.parse();
            }

            maratl.one('MinCash', callback);
            maratl.one('MaxCash', callback);
            maratl.set('system.getforbiddenbanknotes', callback);
            emulator.start('system.getforbiddenbanknotes');
        },

        _validatorOn: function () {
            this._processMinMaxForbidden();

            maratl.on('CashSumm', delegate(this, this._maratlData));
            maratl.on('PaySumm', delegate(this, this._maratlData));
            maratl.on('CommisSumm2', delegate(this, this._maratlData));
            maratl.on('PaySumm2', delegate(this, this._maratlData));
            maratl.on('CommisSumm', delegate(this, this._maratlData));

            maratl.on('CommProfileLine', delegate(this, this._maratlData));
            maratl.on('NominalCommissionInfo', delegate(this, this._maratlData));
            maratl.on('NominalCommProfile', delegate(this, this._maratlData));

            maratl.on('ValOn', delegate(this, this._maratlData));
            maratl.set('Validator', 'on');

            emulator.start('pay_init');
        },

        _maratlData: function (s, e) {
            switch (e.name) {
                case 'CommissionsInfo':
                    this.pageControls.commissionParser = crequire.create('commissionParser', [JSON.parse(e.value)]);
                    setTimeout(this._showCommission.bind(this), 300);
                    break;
                case 'CommProfileLine':
                    if (this.inputSum) {
                        var index = parseInt(e.value, 10) - 1;
                        if (this.pageControls.commissTable && this.currentCommissLine !== index) {
                            this.currentCommissLine = index;
                            this.pageControls.commissTable.insertLine(index);
                        }
                    }
                    break;
                case 'NominalCommProfile':
                    this.payInfo.coinCommiss.init = true;
                    this.payInfo.coinCommiss.percent = this._getCoinCommiss(e.value);
                    if (this.payInfo.coinCommiss.percent !== 0) {
                        this.pageControls.commissTable.changeCoinPercent(this.payInfo.coinCommiss.percent);
                    }
                    break;
                case 'NominalCommissionInfo':
                    if (this.payInfo.coinCommiss.percent > 0) {
                        this.payInfo.coinCommiss.value = this._getCoinInfo(e.value).commiss;
                        this.pageControls.commissTable.changeCoinCommiss(this.payInfo.coinCommiss.value);
                        this._changeCommissionValue();
                    }
                    break;
                case 'CashSumm':
                    if (e.value.toString() !== '0') {
                        if (!this.inputSum) {
                            this.pageControls.bottomMenu.home.hide();
                            this.pageControls.bottomMenu.pay.active(true);
                        }
                        this._hideAlert();
                        this.places.made.html(e.value + ' руб.');
                        this.inputSum = true;
                        statistics.sendData({ value: (parseFloat(e.value) - this.payInfo.made).toString() }, 'note');
                        this.payInfo.made = parseFloat(e.value);
                        this.timeoutStart(120);
                    }
                    break;
                case 'PaySumm':
                    if (this.inputSum) {
                        this.places.enrolled.html(e.value + ' руб.');
                        this.payInfo.enrolled = parseFloat(e.value);
                        this._widgetEvent({
                            event: 'changesum', data: {
                                sum: this.payInfo
                            }
                        });
                    }
                    break;
                case 'PaySumm2':
                    if (this.inputSum) {
                        this.places.deliveryEnrolled.html(e.value + ' руб.');
                        this.payInfo.deliveryEnrolled = parseFloat(e.value);
                    }
                    break;
                case 'CommisSumm':
                    this.payInfo.commiss = e.value;
                    this._changeCommissionValue();
                    break;
                case 'CommisSumm2':
                    if (this.inputSum) {
                        var value = +e.value;
                        this.places.deliveryCommiss.html(((value % 1 == 0) ? value.toFixed(0) : value.toFixed(2)) + ' руб.');
                    }
                    break;
                case 'ValOn':
                    if (e.value == "false") {
                        this.pageControls.popupLoader.one('closed', delegate(this, function () {
                            this.exit();
                        }));
                        this.pageControls.popupLoader.show('error', 'Данный платеж невозможно выполнить на этом ' + ((this.interfaceConfig.get('params:index_config:ssk_atm', '') == '1') ? 'банкомате' : 'терминале'));
                    }
                    this.pageControls.bottomMenu.home.active(true);
                    break;
            }
        },

        _changeCommissionValue: function () {
            var comValue = parseFloat(this.payInfo.commiss) + parseFloat(this.payInfo.coinCommiss.value);
            var comValueStr = (comValue % 1 == 0) ? comValue.toFixed(0) : comValue.toFixed(2);
            if (this.inputSum) {
                this.places.commiss.html(comValueStr + ' руб.');
                this.payInfo.commiss = comValue;
            }
        },

        _showCommission: function () {
            var commiss = this.pageControls.commissionParser.get(this.paySession.payInfo.config.realId);
            var commissDelivery = this.hasDelivery ? this.pageControls.commissionParser.get(this.paySession.payInfo.delivery.id2) : null;
            var addFixValue = function (fcommiss, addString) {
                if (fcommiss && fcommiss.isFixed) {
                    if (fcommiss.isZero) {
                        $('commissHeadText' + addString).html('+= 0%');
                    }
                    else {
                        $('commissHeadText' + addString).html('+= ' + fcommiss.getFixed());
                    }
                }
            }
            
            addFixValue(commiss, '');
            addFixValue(commissDelivery, 'Delivery');

            if (!commiss.isFixed) this.pageControls.commissTable.showTable();

            this.pageControls.commissTable.setTable(commiss.table); 

            if (this.payInfo.coinCommiss.percent !== 0) {
                $('commissHeadText').html('Комиссия');
                this.pageControls.commissTable.showTable();
            }


            var deliveryTable = commissDelivery ? commissDelivery.table : null;
            var popupTable = this._createPopupTablet(commiss.table, deliveryTable);
            $('showCommiss').click(delegate(this, function () {
                var deliveryCount = commissDelivery ? commissDelivery.table.length : 0;
                this._showCommissionPopup(popupTable, commiss.table.length, deliveryCount);
            }));

            if (commissDelivery) $('showCommiss').show();
            if (!this.pageControls.commissTable.hasShowAll) $('showCommiss').show();

            if (this.interfaceConfig.get('params:index_config:hidecommission', '') == '1') {
                $('commissHeadText').html('Комиссия');
                this.pageControls.commissTable.hideTable();
                $('showCommiss').show();
            }
        },

        _createPopupTablet: function (main, delivery) {
            var tableHeader = '<div id="kommissFullBlock">' +
                                    '<div id="kommissFullBlockAnimate" class="p_r wh_a">' +
                                        '<table id="commissFullTable" cellpadding="0" cellspacing="0" class="wh_a">';
            var tableFooter = '</table></div></div>';

            var mainTableText = main.map(arrayToRow).join('');
            if (delivery === null) {
                return  tableHeader + generateHeadRows('Сумма платежа', 'Комиссия на платеж') + mainTableText + tableFooter;           
            }

            var deliveryTableText = delivery.map(arrayToRow).join('');

            return tableHeader +
                generateHeadRows('Сумма платежа', 'Комиссия на платеж') + mainTableText + generateHeadRows('','') +
                generateHeadRows('Сумма сдачи', 'Комиссия на сдачу') + deliveryTableText + tableFooter;
               

            function arrayToRow(array) {
                return '<tr><td class="ta_l">' + array[0] + '</td><td class="ta_l">' + array[1] + '</td></tr>';
            }
            function generateHeadRows(left, right) {
                return '<tr><td class="table-left"><span>' + left + '</span></td><td class="table-right"><span>' + right + '</span></td></tr>';
            }
        },

        _showCommissionPopup: function (table, mainCount, deliveryCount) {
            var comissionStringCount = mainCount + 1;
            if (deliveryCount) comissionStringCount += deliveryCount + 2;

                this.pageControls.popup.show('Все условия комиссии', table);
                if (comissionStringCount > 19) { // TODO Добавить проверку строк 2 комиссии
                    $('kommissFullBlock').css('+=animated');
                    var animationTime = (comissionStringCount-19)/3;
                    if (animationTime < 3)
                        animationTime = 3;
                    $('kommissFullBlockAnimate').css({ animationDuration: animationTime + 's' });
                }
        },

        _getCoinCommiss: function (str) {
            var index = str.lastIndexOf('percent_');
            if (index === -1) {
                return 0;
            }
            else {
                var temp = str.substr(index + 'percent_'.length);
                return parseFloat(temp);
            }
        },

        _getCoinInfo: function (str) {
            var a = str.split('|');
            return { amount: parseFloat(a[0].split(':')[1]), commiss: parseFloat(a[a.length - 1].split(':')[1]) };
        },

        _navigateClick: function (s, e) {
            switch (e) {
                case 'home':
                    maratl.validatorOff(delegate(this, this.exit));
                    break;
                case 'pay':
                    this.pageControls.bottomMenu.pay.stop();
                    maratl.one('DeficientAmountResult', delegate(this, this._payOut));
                    maratl.set('GetDeficientAmount');
                    emulator.start('pay_exit');
                    break;
            }
        },

        _payOut: function (s, e) {
            var sum = parseFloat(e.value.split(',')[1]);
            if (sum > 0) {
                if (this.valOfTrue) return this._validatorOff();
                this._showAlert(sum);
                maratl.validatorOff(delegate(this, this._validatorOff), delegate(this, function () {
                    this.pageControls.bottomMenu.pay.start();
                }));
                emulator.start('validatorOff_false');
            }
            else {
                this._validatorOff();
            }
        },

        _validatorOff: function () {
            this.valOfTrue = true;
            if (!this.nextBlocked) {
                maratl.validatorOff(delegate(this, this._fiscalRequest), delegate(this, function () {
                    this.pageControls.bottomMenu.pay.start();
                }));
                emulator.start('validatorOff_false');
            }
            else {
                this.pageControls.bottomMenu.pay.start();
                this.nextBlocked = false;
                this._widgetEvent({
                    event: 'nexttry'
                });
            }
        },

        _widgetEvent: function (event) {
            for (var i = 0; i < this.appList.length; i++) {
                if (this.appList[i].type === 'widget') {
                    this.appList[i].widget.set(event);
                }
            }
        },

        _showAlert: function (sum) {
            $('madeTr').css('+=alertLine');
            $('alertIcon').show();
            $('addSum').html('Внесите еще ' + sum + ' руб.').show();
        },

        _hideAlert: function () {
            $('madeTr').css('-=alertLine');
            $('alertIcon').hide();
            $('addSum').hide();
        },

        _fiscalRequest: function (callback) {
            statistics.sendData({
                cash: this.payInfo.made.toString(),
                to_provider: this.payInfo.enrolled.toString(),
                to_change: this.payInfo.deliveryEnrolled.toString()
            }, 'money');
            maratl.on('PaySuccess', delegate(this, function (s, e) {
                if (e.value === 'false') {
                    //обработка ошибки
                }
                if (callback) return callback();

                var ident = storage.get("ident_adv_counter");
                var newPayinfo = { payInfo: { sum: { made: this.payInfo.made, enrolled: this.payInfo.enrolled, commiss: this.payInfo.commiss } } };
                this.nextBlocked = false;
                if (ident != null) {
                    this.nextBlocked = false;
                    return this.callback('exitCustom', './core/index.html?ereceipt');
                }
                this.next('final', newPayinfo);
            }));
            maratl.on("FiscalReceipt", delegate(this, function (s, e) {
                switch (e.value) {
                    case 'Wait':
                        this.nameBox.hide();
                        this.logoBox.hide();
                        this.pageControls.popup.hide();
                        this.pageControls.popupLoader.show('request', 'Подождите, идет подготовка печати кассового чека.');
                        break;
                    case 'true':
                        this._setData({ sessionInfo: { fiscal: true } });
                        break;
                    case 'false':
                        this._setData({ sessionInfo: { fiscal: false } });
                        break;
                }
            }));
            maratl.set('CreatePay');
            emulator.start('pay_fiscal');
        },

        _parseCoinComiss: function (raw) {
            var x;
            var profiles = raw.split("|");
            for (i = 0; i < profiles.length; i++) {
                x = profiles[i].split(";");
                if (x.length !== 3 || x[0] !== 'type_coin') continue;
                x = x[2].split("_");
                if (x.length != 2 || x[1] == '0') continue;
                return x[1];
            }
            return '';
        },

        _exitPage: function (callback) {
            maratl.validatorOff(delegate(this, function () {
                if (this.payInfo.made === 0) {
                    this.exit();
                }
                else {
                    this._fiscalRequest(callback);
                }
            }), delegate(this, function () {
                if (this.pageConfig.validatorOffMax === 0) return this._fiscalRequest(callback);
                this.pageConfig.validatorOffMax--;
                this._exitPage(callback);
            }));
        },

        _timeoutExit: function () {
            this._exitPage();
        },

        exitToCustomPage: function (pageName) {
            this._exitPage(delegate(this, function () { this.callback('exitCustom', pageName) }));
        }
    });
});