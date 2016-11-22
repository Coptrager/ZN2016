(function (parent) {
    return parent.extend({
        construct: function (placeId, type, show) {
            this.base(placeId);
            this.constLine = {
                big: 6,
                small: 3
            };
            this.showLineCount = 0;
            this.LINE_HEIGHT = 40;
            this.type = type || 'big';
            this.tableBody = null;
            this.tableLines = null;
            this.coinBody = null;
            this.coinPercent = null;
            this.coinCommiss = null;
            this.bShowTable = typeof show === 'undefined' ? true : show;
            this.hasShowAll = true;
            this._paint();
        },

        _paint: function () {
            this.place.css('+=commissTable-' + this.type);
            this.place.html([
                '<div class="w_100 h_a f_l d_n commissTableHead">',
                    '<div class="f_l ta_l">Внесенная сумма</div>',
                    '<div class="f_l ta_l">Размер комиссии</div>',
                '</div>',
                '<div class="p_r f_l w_100 d_n commissTableBodyBox-', this.type, '">',
                    '<div class="p_a tl_0 w_100 h_a commissTableBody"></div>',
                '</div>',
                '<div class="w_100 h_a f_l v_h commissTableHead">',
                    '<div class="f_l ta_l">Комиссия на монеты <span class="commissTableCoinPercent"></span></div>',
                    '<div class="f_l ta_l commissTableCoinCommiss"></div>',
                '</div>'
            ].join(''));

            this.tableBody = this.place.findOne('.commissTableBody');
            this.coinPercent = this.place.findOne('.commissTableCoinPercent');
            this.coinCommiss = this.place.findOne('.commissTableCoinCommiss');
            this.coinBody = this.place.findLast('.commissTableHead');
        },

        showTable: function () {
            this.place.findOne('.commissTableHead').css({ display: 'block' });
            this.place.findOne('.commissTableBodyBox-' + this.type).css({ display: 'block' });
        },

        hideTable: function () {
            this.place.findOne('.commissTableHead').css({ display: 'none' });
            this.place.findOne('.commissTableBodyBox-' + this.type).css({ display: 'none' });
        },

        _correctSize: function (length) {
            if (length <= this.constLine[this.type]) {
                this.place.findOne('.commissTableBodyBox-' + this.type).css({ height: length * this.LINE_HEIGHT });
                this.showLineCount = length;
            }
            else {
                this.showLineCount = this.constLine[this.type];
                this.hasShowAll = false;
            }
        },

        setTable: function (commissTable) {
            var lines = [];
            for (var i = 0; i < commissTable.length; i++) {
                lines.push(['<div class="w_100 f_l commissTableLine"><p>', commissTable[i][0], '</p><p>', commissTable[i][1], '</p></div>'].join(''));
            }

            this._correctSize(commissTable.length);

            if (commissTable.length > 1 && this.bShowTable) this.showTable();

            this.tableBody.html(lines.join(''));
            this.tableLines = this.tableBody.find('.commissTableLine');
        },

        changeCoinPercent: function (percent) {
            this.coinBody.show();
            this.coinPercent.html(percent + '%');
        },

        changeCoinCommiss: function (commiss) {
            this.coinBody.show();
            this.coinCommiss.html(commiss + ' руб.');
        },

        insertLine: function (line) {
            if (line < this.tableLines.length) {
                var top = ((this.tableLines.length - line) < this.showLineCount) ? ((this.tableLines.length - this.showLineCount) * this.LINE_HEIGHT) : (line * this.LINE_HEIGHT);
                this.tableBody.css({ top: '-' + top + 'px' });

                for (var i = 0; i < this.tableLines.length; i++) {
                    if (i === line) this.tableLines[i].css('+=commissTableLine-insert');
                    else this.tableLines[i].css('-=commissTableLine-insert');
                }
                
            }
        }
    });
});