(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession) {
            this.base(place, pageConfig, paySession);
            this.buttons = [
                { text: 'Реквизиты поставщиков', page: 'info_details' },
                { text: 'О расчетном банке', page: 'info_bank' },
                { text: 'Для клиентов', page: 'info_customer' },
                { text: 'Об операторе системы', page: 'info_operator' },
                { text: 'Договор-оферта', page: 'oferta' },
                { text: 'Сервис и производство', page: 'info_service' }
                //{ text: 'Карта терминалов', page: 'map' }
            ];
            if (this.interfaceConfig.get('params:index_config:unekt', '0') === '0') {
                this.buttons.unshift({ text: 'Аренда', page: 'info_lease' });
            }
            //this.buttons.unshift({ text: 'Проверка платежа', page: 'epa'});
        },

        paint: function () {
            this.base();

            $('version-show-span').text(this.interfaceConfig.get('version'));
            $('infoBlock').find('p').forEach(delegate(this, function (el) {
                var data = el.getData('name');
                if (data) {
                    var params = data.split('||');
                    for (var i = 0; i < params.length; i++) {
                        var param = params[i] === 'terminal-id' ? this.paySession.sessionInfo.terminal : this.interfaceConfig.get('params:info:' + params[i]);
                        if (param) {
                            el.html('+=' + param);
                            break;
                        }
                    }
                }
            }));
            var place = $('buttonBlock');
            for (var i = 0; i < this.buttons.length; i++) {
                place.append($({ cn: 'f_l buttonBox', html: '<div id="button_' + i + '"></div>' }));
                this.pageControls['button_' + i] = new crequire.controls.button.script('button_' + i, { text: '<span>' + this.buttons[i].text + '</span>', callbackData: this.buttons[i].page });
                this.pageControls['button_' + i].on('click', delegate(this, this._buttonClick));
            }

            this.pageControls.bottomMenu.paint([
                { name: 'back' },
                { name: 'home' }
            ]);
            this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));
        },

        _buttonClick: function (s, e) {
            for (var i = 0; i < this.buttons.length; i++) {
                this.pageControls['button_' + i].clear();
            }
            if (e.indexOf('.html') === -1) {
                this.next(e);
            }
            else {
                this.exitToCustomPage(e);
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
            }
        }
    });
});