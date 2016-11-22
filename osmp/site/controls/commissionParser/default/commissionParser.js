(function (parent) {
    return parent.extend({
        construct: function (commissData) {
            this.base();
            this.commissData = commissData;
            this.commissTables = {};
            this._parse();
        },

        _parse: function () {
            for (var i = 0; i < this.commissData.length; i++) {
                this.commissTables[this.commissData[i]['providerId']] = {
                    table: null, isFixed: false, isZero: false, getFixed: function () {
                        if (this.isFixed) return this.table[0][1];
                    }
                };
                this.commissTables[this.commissData[i]['providerId']].table = this.commissData[i]['commissionInfo']
                    .map(function (x) {
                        return {
                            from: x.fromAmount || null,
                            to: x.toAmount || null,
                            min: x.commissionMin || null,
                            max: x.commissionMax || null,
                            fix: x.commissionFix || null,
                            percent: x.commissionPercent || null
                        };
                    }).map(function (x) {
                        var range = '';
                        if (x.from == null && x.to == null) {
                            range = 'Другие условия';
                        }
                        else {
                            range = (x.to && x.to === 'inf' ? 'от ' : '') + (x.from || '0') + (x.to && x.to !== 'inf' ? ' - ' + x.to + ' руб.' : ' руб.');
                        }

                        var condition = [];

                        var fixAndPercent = [];
                        if (x.fix)
                            fixAndPercent.push(x.fix + ' руб.');
                        if (x.percent)
                            fixAndPercent.push(x.percent + '%');
                        condition.push(fixAndPercent.join(' + '));

                        if (x.min)
                            condition.push(', но не менее ' + x.min + ' руб.');

                        if (x.max && x.max !== 'inf') {
                            condition.push((x.min) ? ' и' : ', но');
                            condition.push(' не более ' + x.max + ' руб.');
                        }

                        if (condition[0] === '') condition[0] = '0%';

                        return [range, condition.join('')];
                    });
                if (this.commissTables[this.commissData[i]['providerId']].table.length === 1) {
                    if (/^[0-9.]+%$/.test(this.commissTables[this.commissData[i]['providerId']].table[0][1])) {
                        this.commissTables[this.commissData[i]['providerId']].isFixed = true;
                    }
                    if (this.commissTables[this.commissData[i]['providerId']].table[0][1] === '0%') {
                        this.commissTables[this.commissData[i]['providerId']].isFixed = true;
                        this.commissTables[this.commissData[i]['providerId']].isZero = true;
                    }
                }
            }
        },

        get: function (id) {
            if (this.commissTables[id]) {
                return this.commissTables[id];
            }
            else {
                return null;
            }
        }
    });
});