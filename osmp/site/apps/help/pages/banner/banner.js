(function () {
    return {
        construct: function (scope, html) {
            this.base();
            this.scope = scope;
            this.html = html;
            this.elements = {};
            this.blockedClick = false;
            this.closeBlocked = false;
            this.pay = false;
            this.sum = 0;
            this.validatorStatus = 'off';

            this.showTimeout = null;
            this.payTimeout = null;

            this.payData = {
                id: '14374',
                name: 'БФ Даунсайд Ап',
                account: '0000000000',
            };
        },

        destructor: function () {
            this.base();
        },

        paint: function () {
            document.body.innerHTML = this.html;

            this.elements = {
                bannerBtn: $('bannerBtn'),
                closeBtn: $('closeBtn'),
                helpBtn: $('helpBtn'),
                payBtn: $('payBtn'),

                payText: $('payText'),
                payAmount: $('payAmount'),
                payNom: $('payNom')
            };

            this.elements.bannerBtn.click(delegate(this, this._show));
            this.elements.closeBtn.click(delegate(this, this._default));
            this.elements.helpBtn.click(delegate(this, this._helpClick));
            this.elements.payBtn.click(delegate(this, this._payClick));

            $('test').click(function () { messenger.emulator('CashSumm_10'); });
        },

        _default: function () {
            if (!this.closeBlocked) {
                messenger.unblocked();
                messenger.resume();
                if (this.validatorStatus === 'on') messenger.sendPayData({ Validator: 'off' });
                clearTimeout(this.showTimeout);

                this.elements.payText.visible(false);
                this.elements.payAmount.visible(false);
                this.elements.payNom.visible(false);
                this.elements.payBtn.visible(false);
                this.elements.helpBtn.visible(true);

                messenger.bottom();
                messenger.changeSize({ height: 170 });

                this.elements.closeBtn.css({ opacity: 0 });
                this.elements.closeBtn.visible(false);

                setTimeout(delegate(this, function () { this.blockedClick = false; }), 1);
            }
        },

        _show: function () {
            if (!this.blockedClick) {
                this.showTimeout = setTimeout(delegate(this, this._default), parseFloat(this.scope.widgetConfig.showTimeout) * 1000);

                messenger.top();
                messenger.changeSize({ height: 540 });

                this.elements.closeBtn.visible(true);
                this.elements.closeBtn.css({ opacity: 1 });
                this.blockedClick = true;
            }
        },

        _helpClick: function () {
            messenger.blocked();
            messenger.pause();
            clearTimeout(this.showTimeout);
            this._restartPayTimeout();

            this.closeBlocked = true;
            this.elements.payText.visible(true);
            this.elements.payAmount.visible(true);
            this.elements.payNom.visible(true);
            this.elements.helpBtn.visible(false);

            this.elements.closeBtn.css({ opacity: 0 });
            this.elements.closeBtn.visible(false);

            messenger.attach('maratl.CashSumm', delegate(this, this._changeAmount));
            messenger.sendPayData(this.payData);
            this.validatorStatus = 'on';
            messenger.sendPayData({ Validator: 'on' });
        },

        _changeAmount: function (s, e) {
            var el = $('payAmount'),
                sum = parseFloat(e.value) - this.sum;

            this.sum += sum;

            if (sum) {
                var interval = setInterval(delegate(this, function () {
                    if (sum) {
                        el.html(parseFloat(el.html()) + 1);
                        sum--;
                    }
                    else {
                        clearInterval(interval);
                        if (!this.pay) {
                            this.elements.payBtn.visible(true);
                            this.elements.payBtn.css({ opacity: 1 });
                            $('payLine').css({ left: '-95px' });
                            this.pay = true;
                        }
                    }
                }), 10);
            }

            this._restartPayTimeout();
        },

        _restartPayTimeout: function () {
            clearTimeout(this.payTimeout);
            this.payTimeout = setTimeout(delegate(this, this._payTimeout), parseFloat(this.scope.widgetConfig.payTimeout) * 1000);
        },

        _payClick: function () {
            clearTimeout(this.payTimeout);

            var timeout = 3000;

            if (this.sum < 99) {
                timeout += 5000;
            }
            else if (this.sum < 499) {
                timeout += 7000;
            }
            else if (this.sum < 9999) {
                timeout += 9000;
            }
            else {
                timeout += 12000;
            }

            messenger.sendPayData({Validator: 'off' });
            messenger.sendPayData({ Validator: 'off' });
            messenger.sendPayData({
                Validator: 'off',
                CreatePay: 'true'
            });

            var place = $('place');

            setTimeout(function () {
                place.css({ marginLeft: '-1000px' });
            }, 200);

            setTimeout(function () {
                place.css({ height: 170 });
                messenger.changeSize({ height: 170 });
            }, 2000);

            setTimeout(delegate(this, function () {
                messenger.instruction('$("content0").css({transform:"rotate(180deg)"})');
            }), 3000);

            setTimeout(delegate(this, function () {
                messenger.instruction('$("content0").css({transform:""})');
                this.closeBlocked = false;
                this._default();
                $('thanks').css({ transform: 'rotate(0deg)' });
            }), timeout);
        },

        _payTimeout: function () {
            if (this.pay) {
                this._payClick();
            }
            else {
                this.closeBlocked = false;
                this._default();
            }
        }
    };
});