(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession) {
            this.base(place, pageConfig, paySession);

            this.pageState = {
                slide: 0,
                currentType: 'phone' // phone or account
            };

            this.startParams = this.paySession.sessionInfo.epa || {};
            this.paySession.sessionInfo.epa = null;
        },
        paint: function () {
            this.base();

            this.nameBox.html('Проверка платежа');

            initPagesPosition();

            this.pageControls.popupLoader = crequire.create('popupLoader', ['popupLoader']);

            // page 0
            this.pageControls.dateInput = crequire.create('input', ['dateInput', {
                "header":"Введите дату платежа",
                "footer":"Поиск в диапазоне 3 дней от указанной даты (день/месяц/год)",
                "mask":"<!^.+${1,2}>/<!^.+${1,2}>/<!^.+${4,4}>",
                "regexp":"^([1-9]|0[1-9]|[12][0-9]|3[01])[/]([1-9]|0[1-9]|1[012])[/](19|20)\\d\\d$",
                "name":"date"
            }]);
            this.pageControls.dateInput.on('valid', delegate(this, this._dateValidResult));
            this.pageControls.dateKeyboard = crequire.create('digitalKeyboard',['dateKeyboard']);
            this.pageControls.dateKeyboard.on('click', delegate(this, function (s, e) { this.pageControls.dateInput.set(e); }));
            this.pageControls.dateKeyboard.on('clear', delegate(this, function (s, e) { this.pageControls.dateInput.clear(); }));

            // page 1
            this.pageControls.gotoPhoneButton = crequire.create('button', ['gotoPhone', {}]);
            this.pageControls.gotoAccountButton = crequire.create('button', ['gotoAccount', {}]);

            this.pageControls.gotoPhoneButton.on('click', delegate(this, this._gotoPhoneClick));
            this.pageControls.gotoAccountButton.on('click', delegate(this, this._gotoAccountClick));

            // page 2 (phone)
            this.pageControls.phoneInput = crequire.create('cellularInput',['phoneInput']);
            this.pageControls.phoneKeyboard = crequire.create('digitalKeyboard',['phoneKeyboard']);

            this.pageControls.phoneKeyboard.on('click', delegate(this, function (s, e) { this.pageControls.phoneInput.set(e); }));
            this.pageControls.phoneKeyboard.on('clear', delegate(this, function (s, e) { this.pageControls.phoneInput.clear(); }));   

            this.pageControls.phoneInput.on('valid', delegate(this, function () { this._phoneValidResult(true); }));
            this.pageControls.phoneInput.on('notvalid', delegate(this, function () { this._phoneValidResult(false); }));

            // page 2 (account)
            this.pageControls.accountInput = crequire.create('input', ['accountInput', {
                "header":"Введитe свой аккаунт",
                "footer":"или номер лицевого счета, e-mail, идентификатор пользователя.",
                "mask":"<!^.+${1,255}>",
                "regexp":"^.+$",
                "name":"account"
            }]);
            this.pageControls.accountKeyboard = crequire.create('searchKeyboard',['accountKeyboard']);
            this.pageControls.accountKeyboard.on('click', delegate(this, function (s, e) { this.pageControls.accountInput.set(e); }));
            this.pageControls.accountKeyboard.on('clear', delegate(this, function (s, e) { this.pageControls.accountInput.clear(); }));

            this.pageControls.accountInput.on('valid', delegate(this, this._accountValidResult));

            // page 3
            this.pageControls.payHistory = crequire.create('payHistory',['payHistory']);

            this.pageControls.bottomMenu.paint([
                { name: 'back' },
                { name: 'home' },
                { name: 'forward', active: false },
                { name: 'find', active: false, visible: false }
            ]);
            this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));
            this.pageControls.payHistory.on('printPay', delegate(this, this._printPay));

            // paints
            this.pageControls.dateInput.paint();
            this.pageControls.accountInput.paint();
            this.pageControls.payHistory.paint();

            if (this.startParams.date) {
                if (this.startParams.date === 'current') {
                    var adate = new Date();
                    var f = function (n) { return n < 10 ? '0' + n : n.toString() };
                    var sdate = f(adate.getDate()) + f(adate.getMonth() + 1) + f(adate.getFullYear());
                    this.pageControls.dateInput.aset(sdate);
                }
                else {
                    this.pageControls.dateInput.aset(this.startParams.date);
                }
            }

            function initPagesPosition() {
                for(var i = 0;; i++) {
                    var currentPage = $('epa-page').find("div.slide-" + i);
                    if (currentPage.length == 0) return;
                    currentPage[0].css({ left: i + '00%' })
                }
            }
        },

        _printPay: function (s, e) {
            statistics.clickAction({ button: 'print' });
            maratl.one('DublCheckSuccess', delegate(this, function (s, e) {
                this.pageControls.popupLoader.hide();
                if (e.value !== 'true') {
                    this.pageControls.popupLoader.show('error', 'Ошибка при печати чека');
                } else {
                    this._gotoSlideNumber(4);
                    this.pageControls.bottomMenu.back.hide();
                }
            }));
            this.pageControls.popupLoader.show('request', 'Подождите, идет печать чека');
            maratl.set('JSONCommands', e);
            emulator.start('epa_print_check');
        },

        _dateValidResult: function (s, e) {
            if (this.pageState.slide == 0) {
                this.pageControls.bottomMenu.forward.active(e);
            }
        },

        _phoneValidResult: function (isValid) {
            if (this.pageState.slide == 2 && this.pageState.currentType == 'phone') {
                this.pageControls.bottomMenu.find.active(isValid);
            }
        },
        _accountValidResult: function (s, e) {
            if (this.pageState.slide == 2 && this.pageState.currentType == 'account') {
                this.pageControls.bottomMenu.find.active(e);
            }
        },

        _gotoPhoneClick: function () {
            statistics.clickAction({ button: 'mobile' });
            this._setPayType('phone');
            this._gotoSlideNumber(2);
            this.pageControls.phoneInput.clear();
            this.pageControls.bottomMenu.find.active(false);
        },
        _gotoAccountClick: function () {
            statistics.clickAction({ button: 'other' });
            this._setPayType('account');
            this._gotoSlideNumber(2);
            this.pageControls.accountInput.clear();
            this.pageControls.bottomMenu.find.active(false);
        },

        _navigateClick: function (s, e) {
            switch (e) {
                case 'back':
                    if (this.pageState.slide == 0) {
                        this.back();
                    } else {
                        if (this.pageState.slide == 3) {
                            this.pageControls.payHistory.clear();
                        }
                        this._gotoSlideNumber(this.pageState.slide - 1);
                    }
                    break;
                case 'home':
                    this.exit();
                    break;
                case 'forward':
                    this._gotoSlideNumber(1);
                    break;
                case 'find':
                    statistics.clickAction({ button: 'search' });
                    var info = {
                        date: this.pageControls.dateInput.get().data.date
                    }
                    switch (this.pageState.currentType) {
                        case 'phone':
                            info.account = this.pageControls.phoneInput.get();
                            break;
                        case 'account':
                            info.account = this.pageControls.accountInput.get().data.account;
                            break;
                    }
                    this._findPayRequest(info);
                    break;
            }
        },
        _findPayRequest: function (info) {
            var receivedData = {};
            var delListeners = addListeners(receivedData);

            this.pageControls.popupLoader.show('request', 'Подождите, идет поиск платежей');

            var disp11Listener = delegate(this, function () {
                delListeners();
                var resArray = [];
                for (var i = 1; i <= 10; i++) {
                    if (receivedData[i] != null) {
                        resArray.push(receivedData[i]);
                    }
                }
                statistics.sendData({ result_count: resArray.length.toString() });
                if (resArray.length === 0) {
                    return this.next('none', { sessionInfo: { epa: null } });
                }

                var needChangeNumberFormat = this.pageState.currentType == 'phone';

                var resObjects = resArray.map(function (x) {
                    var data = x.split('\t');

                    var account = data[2];
                    if (needChangeNumberFormat && /^\d{10}$/.test(account)) {
                        account = '+7 (' + account.substring(0, 3) + ') ' + account.substring(3, 6) + '-' + account.substring(6, 8) + '-' + account.substring(8, 10);
                    }

                    return {
                        state: data[7], // 0 - не проведён, 1 - проведён, другие - ожидает...
                        date: data[3].split(' ')[0],
                        provider: data[1],
                        account: account,
                        money: parseFloat(data[4]),
                        printParams: JSON.stringify({
                            PrvId: '1',
                            AccNum: '0000000000',
                            DublCheckPrvId: data[0],
                            DublCheckAcc: data[2],
                            DublCheckTrnNum: data[8],
                            DublCheckFromAmo: data[4],
                            DublCheckToAmo: data[5],
                            DublCheckRcptNum: data[6],
                            DublCheckRcptDate: data[3],
                            DublCheckPrvName: data[1],
                            _receipt_prt_top_msg: 'Дубликат чека',
                            PrintDublicateCheck: 'true'
                        })
                    };
                });
                this.pageControls.payHistory.set(resObjects);
                this.pageControls.popupLoader.hide();
                this._gotoSlideNumber(3);
            });

            maratl.one('StatusRequest', delegate(this, function (s, e) {
                if (e.value != '0') {
                    this.pageControls.popupLoader.show('error', 'Невозможно получить данные', 'Произошла ошибка');
                    delListeners();
                    maratl.off('disp11', disp11Listener);
                }
            }));
            maratl.one('disp11', disp11Listener);

            function addListeners(dataObject) {
                var i;
                var deleteListeners = [];
                for (i = 1; i <= 10; i++) {
                    deleteListeners.push(addListener(i));
                }

                return function () {
                    deleteListeners.forEach(function (x) { x(); });
                }

                function addListener(index) {
                    maratl.on('disp'+index, runFunc);
                    return function () {
                        maratl.off('disp' + index, runFunc);
                    }

                    function runFunc(s, e) {
                        dataObject[index] = e.value;
                    }
                }
            }
            emulator.start('epa');

            var dateArray = info.date.split('/');
            var fromDate = new Date(dateArray[2], dateArray[1]-1, (+dateArray[0])-3);
            var toDate = new Date(dateArray[2], dateArray[1]-1, (+dateArray[0])+3);

            var nowDate = new Date();
            if (toDate > nowDate) toDate = nowDate;

            maratl.set('JSONCommands',
                JSON.stringify({
                    PrvId: "1",
                    AccNum: "0000000000",
                    CreateOnlinePayCheck: "true",
                    PayStatAcc: info.account,
                    PayStatFromDate: getDateString(fromDate) + " 00:00:01",
                    PayStatToDate: getDateString(toDate) + " 23:59:59"
                })
            );

            function getDateString(date) {
                return get2Digit(date.getDate()) + '.' + get2Digit(date.getMonth()+1) + '.' + date.getFullYear();

                function get2Digit(inData) {
                    var str = '' + inData;
                    return (str.length == 1) ? '0' + str : str;
                }
            }
        },

        _gotoSlideNumber: function (number) {
            if (this.pageState.slide == number) return;
            this.pageState.slide = number;
            $('epa-page').css({ left: (-number) + '00%' });

            if (number == 0) {
                this.pageControls.bottomMenu.forward.show();
            } else {
                this.pageControls.bottomMenu.forward.hide();
            }
            if (number == 2) {
                this.pageControls.bottomMenu.find.show();
            } else {
                this.pageControls.bottomMenu.find.hide();
            }
        },
        _setPayType: function (type) {
            $('epa-page').css("-=type-" + this.pageState.currentType);
            this.pageState.currentType = type;
            $('epa-page').css("+=type-" + this.pageState.currentType);
        }
    });
});