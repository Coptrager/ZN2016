(function (parent) {
    return parent.extend({
        construct: function (placeId, settings) {
            this.base(placeId);

            this.config = {
                hasTips: false,
                startDig: false,
                startRus: false,
                startShift: false,
                changeDig: true,
                changeLang: true,
                changeShift: true,
                hasSpace: true,
                keyArrayPostfix: '',
                hasClear: true
            };
            
            this.elements = {
            };

            /*
                parent: 
                button-#-#:
                span-#-#:
                button-NAME:
                span-NAME:
            */

            switch (settings) {
                case 'search':
                    this.config.startRus = true;
                    this.config.startShift = true;
                    this.config.changeShift = false;
                    break;
                case 'searchRegion':
                    this.config.startRus = true;
                    this.config.changeDig = false;
                    this.config.changeLang = false;
                    this.config.changeShift = false;
                    break;
                case 'AL':
                    break;
                case 'ALR':
                    this.config.startRus = true;
                    break;
                case 'ALC':
                    this.config.startShift = true;
                    break;
                case 'ALCR':
                case 'ALRC':
                    this.config.startShift = true;
                    this.config.startRus = true;
                    break;
                case 'EML':
                    this.config.hasSpace = false;
                    this.config.changeDig = false;
                    this.config.changeShift = false;
                    this.config.startShift = false;
                    this.config.changeLang = false;
                    this.config.hasTips = true;
                    this.config.fakeShift = true;
                    this.config.keyArrayPostfix = 'Email';
                    this.config.hasClear = false;
                    break;
                case 'ALRDG':
                    this.config.keyArrayPostfix = 'LD';
                    this.config.hasClear = false;
                    this.config.hasSpace = false;
                    this.config.changeDig = false;
                    this.config.startRus = true;
                    break;
            }

            this.keyArray = {
                rus: [
                    ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ'],
                    ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'],
                    ['Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', 'Ё'],
                    []
                ],
                eng: [
                    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
                    []
                ],
                dig: [
                    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '@', '-'],
                    ['#', '%', '$', '+', '(', ')', '*', ':'],
                    [';', '_', '/', ',', '.', '!', '?'],
                    []
                ],
                engEmail: [
                    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '_', '@'],
                    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '.'],
                    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '-']
                ],
                rusEmail: [
                    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                    ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', '_', '@'],
                    ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', '.'],
                    ['Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', 'Ё', 'Ъ', '-']
                ],
                rusLD: [
                    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
                    ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '-'],
                    ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'],
                    ['Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', 'Ё']
                ],
                engLD: [
                    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
                    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '-'],
                    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
                ],
            };

            this.lang = (this.config.startRus != this.config.startDig) ? 'rus' : 'eng';
            this.state = this.config.startDig ? 'dig' : this.lang;
            this.caps = !this.config.changeShift || this.config.startShift;

            this.glang = { rus: 'ENG', eng: 'РУС' };
            this.fourLine = [];
            this.fourLine.push({ name: 'digit', caption: '?123', cn: 'searchKeyboard__button_color_white' });
            this.fourLine.push({ name: 'lang', caption: '', cn: 'searchKeyboard__button_color_white' });

            this.fourLine.push({ name: 'space', caption: '&nbsp;', cn: 'searchKeyboard__button_line_3 searchKeyboard__button_type_space' });
            this.fourLine.push({ name: 'clear', caption: 'СТЕРЕТЬ ВСЕ', cn: 'searchKeyboard__button_color_white searchKeyboard__button_type_clear' });

            this._createHtmlLayout();

            this._paint();
            this._setShiftState(this.config.startShift);
        },

        resultString: function (newValue) {
            this.keyboardTips && this.keyboardTips.setInputValue(newValue);
        },

        _createHtmlLayout: function() {
            var tipsPlace;

            this._keysCounts = calcButtonCounts(this.keyArray);

            var parentDiv = this.elements.parent = $({ });
            createKeyButtons(this, parentDiv, this._keysCounts);

            this.place.html('');

            if (this.config.hasTips) {
                tipsPlace = $({ cn: 'p_r wh_a keyboard-tips' });
                this.keyboardTips = crequire.create('keyboardTips', [tipsPlace]);
                this.place.append(tipsPlace);
                this.place.css('+=searchKeyboard_has_tips');
                this.keyboardTips.on('tip', delegate(this, this._tip));
            }

            this.place.append(parentDiv);
            this._addEvents();

            function calcButtonCounts(langsArray) {
                var lineCounts = [0,0,0,0];
                for (var langName in langsArray) {
                    var langButtons = langsArray[langName];
                    for (var i = 0; i < langButtons.length; i++) {
                        var lbLength = langButtons[i].length
                        if (lineCounts[i] < lbLength) {
                            lineCounts[i] = lbLength;
                        }
                    }
                }
                return lineCounts;
            }

            function createKeyButtons(self, parent, buttonCounts) {
                var el, div;
                for (var i = 0; i < buttonCounts.length; i++) {
                    div = $({ cn: 'searchKeyboard__line'}).appendTo(parent);
                    if (i == 2) {
                        el = $({
                            tag: 'button' ,
                            cn: 'searchKeyboard__button searchKeyboard__button_color_white searchKeyboard__button_type_shift'
                        });
                        el.appendTo(div);
                        self.elements['button-shift'] = el;
                    } else
                    if (i == 3) {
                        createFourLineButtons(self, parentDiv, self.fourLine, div);
                    }
                    for (var j = 0; j < buttonCounts[i]; j++) {
                        el = $({
                            tag: 'button',
                            cn: 'searchKeyboard__button searchKeyboard__button_line_' + i
                        });
                        el.appendTo(div);
                        
                        self.elements['button-' + i + '-' + j] = el;
                        self.elements['span-' + i + '-' + j] = el;
                    }
                }
            }

            function createFourLineButtons(self, parent, config, div) {
                var el, configItem;
                for (var i = 0; i < config.length; i++) {
                    configItem = config[i];
                    el = $({
                        tag: 'button',
                        html: configItem.caption,
                        cn: 'searchKeyboard__button ' + (configItem.cn || '')
                    });
                    el.appendTo(div);
                    self.elements['button-' + configItem.name] = el;
                    self.elements['span-' + configItem.name] = el;
                }
            }
        },
        _tip: function (s, e) {
            if (this.shift) {
                var e = e.toUpperCase(e);
            }
            for (var i = 0; i < e.length; i++) {
                this.callback('click', e[i]);
            }
        },

        _paint: function () {
            var i, j, stateName, newStateName;

            stateName = this.state;

            this.elements['span-lang'].text(this.glang[this.lang]);
            showOrHide(this.elements['button-digit'], stateName !== 'dig' && this.config.changeDig);
            showOrHide(this.elements['button-shift'], stateName !== 'dig' && this.config.changeShift);
            showOrHide(this.elements['button-lang'], (stateName !== 'dig' && this.config.changeLang) || (stateName === 'dig' && this.config.changeDig));
            showOrHide(this.elements['button-space'], this.config.hasSpace);
            showOrHide(this.elements['button-clear'], this.config.hasClear);

            newStateName = stateName + this.config.keyArrayPostfix;
            stateName = this.keyArray[newStateName] ? newStateName : stateName;

            for (i = 0; i < this.keyArray[stateName].length; i++) {
                for (j = 0; j < this.keyArray[stateName][i].length; j++) {
                    this.elements['span-' + i + '-' + j].text(this.keyArray[stateName][i][j]);
                    showOrHide(this.elements['button-' + i + '-' + j], true);
                }

                for (; j < this._keysCounts[i]; j++) {
                    this.elements['span-' + i + '-' + j].text('');
                    showOrHide(this.elements['button-' + i + '-' + j], false);
                }
            }

            function showOrHide(obj, needShow) {
                obj.css((needShow ? '-=' : '+=') + 'searchKeyboard__button_hidden');
            }
        },

        _addEvents: function () {
            var i, j, configItem;
            for (i = 0; i < this._keysCounts.length; i++) {
                for (j = 0; j < this._keysCounts[i]; j++) {
                    this.elements['button-' + i + '-' + j].on('click', delegate(this, this._click));
                }
            }
            this.elements['button-shift'].on('click', delegate(this, this._click));
            for (i = 0; i < this.fourLine.length; i++) {
                configItem = this.fourLine[i];

                this.elements['button-' + configItem.name].on('click', delegate(this, this._click));
            }
        },

        _setShiftState: function (pressed) {
            this.elements.parent.css((pressed||this.config.fakeShift)
                ? '-=searchKeyboard_lowercase'
                : '+=searchKeyboard_lowercase');
            this.elements['button-shift'].css(pressed ? '-=searchKeyboard__button_rounded' : '+=searchKeyboard__button_rounded');
            this.shift = pressed;
        },

        _click: function (key) {
            var text = key.text();
            switch (text) {
                case '?123':
                    this.state = 'dig';
                    this.lang = this.lang == 'rus' ? 'eng' : 'rus';
                    this._paint();
                    break;
                case 'ENG':
                    this.state = 'eng';
                    this.lang = this.state;
                    this._paint();
                    break;
                case 'РУС':
                    this.state = 'rus';
                    this.lang = this.state;
                    this._paint();
                    break;
                case 'СТЕРЕТЬ ВСЕ':
                    this.callback('clear');
                    break;
                case '':
                    if (this.shift) {
                        this._setShiftState(false);
                    } else {
                        this._setShiftState(true);
                    }
                    this.caps = false;       
                    break;
                default:
                    if (!this.shift || this.config.email) {
                        text = text.toLowerCase();
                    }
                    if (!this.caps) {
                        this._setShiftState(false);
                    }
                    this.callback('click', text);
            }
        }
    });
});