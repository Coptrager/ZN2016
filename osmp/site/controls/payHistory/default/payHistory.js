(function (parent) {
    return parent.extend({
        construct: function (placeId) {
            this.base(placeId);
            this.controls = {
                toLeftButton: null,
                toRightButton: null
            };
            this.places = {
                pageFilm: null
            };
            this.pageCount = 0;
            this.currentPage = 0;
            this._checkPrintData = null;;
        },

        destructor: function () {
            this.base();
        },

        paint: function () {
            this.place.html(
                '<div class="payHistory_body">'+
                    '<div class="payHistory_to-left"><div></div></div>' +
                    '<div class="payHistory_page-box"><div class="payHistory_page-film"></div></div>' +
                    '<div class="payHistory_to-right"><div></div></div>' +
                '</div>');

            this.controls.toLeftButton = crequire.create('button', [this.place.find('.payHistory_to-left')[0], {}]);
            this.controls.toRightButton = crequire.create('button', [this.place.find('.payHistory_to-right')[0], {}]);

            this.controls.toLeftButton.on('click', delegate(this, function () {
                if (this.currentPage <= 0) return;
                this.currentPage--;
                this._gotoPage(this.currentPage);
                this._testActiveLeftRightButtons();
            }));
            this.controls.toRightButton.on('click', delegate(this, function () {
                if (this.currentPage >= (this.pageCount-1)) {
                    return;
                }
                this.currentPage++;
                this._gotoPage(this.currentPage);
                this._testActiveLeftRightButtons();
            }));

            this.places.pageFilm = this.place.find('.payHistory_page-film')[0];
        },

        _gotoPage: function (pageNumber) {
            this.places.pageFilm.css({ left: (-pageNumber) + '00%' });
        },

        _testActiveLeftRightButtons: function () {
            this.controls.toRightButton.active(this.currentPage < (this.pageCount-1));
            this.controls.toLeftButton.active(this.currentPage > 0);
        },

        _checkPrinting: function (s, e) {
            this.callback('printPay', this._checkPrintData[s.getData('page')][s.getData('item')]);
        },

        clear: function () {
            this.currentPage = 0;
            this._gotoPage(0);
            this._checkPrintData = null;
        },

        set: function (data) {
            this.clear();

            var pagesData = splitToGroups(data, 4);
            var htmlData = pagesData.map(generateOnePage).reduce(function (acc, x, i) {
                acc += '<div style="left: ' + i + '00%">' + x + '</div>';
                return acc;
            }, '');
            this._checkPrintData = pagesData.map(function (pageInfo) {
                return pageInfo.map(function (itemInfo) {
                    return itemInfo.printParams;
                });
            });

            this.pageCount = pagesData.length;
            this._testActiveLeftRightButtons();
            this.places.pageFilm.html(htmlData);
            this.places.pageFilm.find('.payHistory_item-print').forEach((function (x) {
                x.click(delegate(this, this._checkPrinting));
            }).bind(this));


            function generateOnePage(elements, pageIndex) {
                return elements.map(function (x, itemIndex) {
                    var successResult = 'wait';
                    if (x.state == 0) successResult = 'fail';
                    if (x.state == 1) successResult = 'success';

                    return  '<div class="payHistory_pay-item">' +
                                '<div class="payHistory_item-left">' +
                                    '<div class="payHistory_state ' + successResult + '"></div>' +
                                    '<div>' + x.date + '</div>' +
                                '</div>' +
                                '<div class="payHistory_item-body">'+
                                    '<div class="payHistory_item-account">' + x.provider + '<br />' + x.account + '</div>' +
                                    '<div class="payHistory_item-money">' + moneyToSpecFormat(x.money) + ' руб.</div>' +
                                    '<div class="payHistory_item-print" data-page="' + pageIndex + '" data-item="' + itemIndex + '">ПЕЧАТЬ ЧЕКА</div>' +
                                '</div>' +
                            '</div>';
                }).join('');

                function moneyToSpecFormat(data) {
                    var subzero = false;
                    if ((+data) < 0) {
                        data = -data;
                        subzero = true;
                    }
                    
                    var kop = Math.floor((data*100)%100);
                    var rub = Math.floor(data);
                    var rubDigArray = splitToGroups(splitIntToDigit(rub), 3);
                    rubDigArray.forEach(function (x) { x.reverse(); });
                    rubDigArray.reverse();
                    var groupedRub = rubDigArray.map(function (x) { return x.join(''); }).join(' ');

                    return (subzero ? '-' : '') + groupedRub + ((kop === 0) ? '' : ',' + kop);
                }

                function splitIntToDigit(value) {
                    var res = [];
                    do {
                        res.push(Math.floor(value % 10));
                        value = Math.floor(value / 10);
                    } while (value !== 0);
                    return res;
                }
            }

            function splitToGroups(items, elementsInPage) {
                var temp = items.reduce(function (acc, x) {
                    if (acc.buf.length === elementsInPage) {
                        acc.res.push(acc.buf);
                        acc.buf = [];
                    }
                    acc.buf.push(x);
                    return acc;
                }, { res: [], buf: [] });
                temp.res.push(temp.buf);
                return temp.res;
            }
        }
    });
});