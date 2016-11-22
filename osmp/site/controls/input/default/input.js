(function (parent) {
    return parent.extend({
        construct: function (placeId, inputConfig) {
            this.base(placeId);
            this.INPUT_WIDTH = 1190;
            this.FIELD_MAX_LENGTH = 7;
            this.SYMBOL_WIDTH = 35;
            this.inputBox = null;
            this.inputConfig = inputConfig;
            this.regexp = new RegExp(inputConfig.regexp);
            this.strip = inputConfig.strip && inputConfig.strip === 'true' ? true : false;
            this.fieldConfigs = [];
            this.fields = [];
            this.fieldTypes = {
                static: [],
                dynamic: []
            };
            this.currentField = 0;
            this.inputValue = '';
            this.formatInputValue = '';
        },

        destructor: function () {
            for (var i = 0; i < this.fields.length; i++) this.fields[i].destructor();
            this.base();
        },

        paint: function () {
            this.place.html([
                '<div class="wh_100 input-box">',
                    '<div class="input-header"></div>',
                    '<div class="input-footer"></div>',
                    '<div class="input-inp-box"></div>',
                '</div>'
            ].join(''));
            (this.place.find('.input-header')[0]).htmlResize(this.inputConfig.header);
            (this.place.find('.input-footer')[0]).htmlResize(this.inputConfig.footer);
            this.fieldConfigs = this._parseBlock(this.inputConfig.mask);
            this.inputBox = this.place.find('.input-inp-box')[0];
            this._paintInput();
            this._test();
        },

        _paintInput: function () {
            var content = '',
                i = 0,
                bstype = this.fieldConfigs.length === 1 ? 'long' : 'short';
            for (; i < this.fieldConfigs.length; i++) {
                content += '<div class="f_l input-fieldBox-' + this.fieldConfigs[i].type + '"></div>';
                this.fieldConfigs[i].bstype = bstype;
                this.fieldTypes[this.fieldConfigs[i].type].push(i);
            }
            this.inputBox.html(content);
            i = 0;
            this.inputBox.find('div').forEach(delegate(this, function (div) {
                this.fields.push(crequire.create('field', [div, this.fieldConfigs[i], i]));
                if (this.fieldConfigs[i].type === 'dynamic') {
                    this.fields[i].on('click', delegate(this, this._fieldClick));
                    this.fields[i].on('change', delegate(this, this._test));
                }
                i++;
            }));
            this._resize();
            this._init();
        },
        _init: function () {
            this.currentField = this.fieldTypes.dynamic[0];
            this.fields[this.currentField].active(true);
        },

        _resize: function () {
            var width = this.INPUT_WIDTH,
                i = 0,
                allCount = 0,
                bsWidth = this.fieldConfigs.length === 1 ? 105 : 185;
            this.inputBox.find('.input-fieldBox-static').forEach(delegate(this, function (div) {
                width -= div.attr('offsetWidth');
            }));
            for (; i < this.fieldTypes.dynamic.length; i++) {
                allCount += this.fieldConfigs[this.fieldTypes.dynamic[i]].size;
            }
            i = 0;
            this.inputBox.find('.input-fieldBox-dynamic').forEach(delegate(this, function (div) {
                var q = width * (this.fieldConfigs[this.fieldTypes.dynamic[i]].size / allCount * 100) / 100;
                //if (q < bsWidth) {
                //    q = bsWidth;
                //    width -= q;
                //}
                //if (q > this.fieldConfigs[this.fieldTypes.dynamic[i]].max * this.SYMBOL_WIDTH + bsWidth) q = this.fieldConfigs[this.fieldTypes.dynamic[i]].max * this.SYMBOL_WIDTH + bsWidth; //динамическая длина
                div.css({ width: q + 'px' });
                i++;
            }));
        },

        _parseBlock: function (mask) {
            var aResult = [],
                aTemp = [],
                aBlock = mask.split('$$');
            for (var x = 0; x < aBlock.length; x++) {
                //if (/^[\d\wа-яА-Я()]*<!/.test(aBlock[x])) {
                    aTemp = aBlock[x].split("<!");
                    for (var i = 0; i < aTemp.length; i++) {
                        if (aTemp[i].length) {
                            if (/}>$/.test(aTemp[i])) {
                                aResult.push(this._parseMask(aTemp[i].replace(/[>]/g, '')));
                            }
                            else {
                                aTemp[i] = aTemp[i].split('>');
                                for (var j = 0; j < aTemp[i].length; j++) {
                                    aResult.push(this._parseMask(aTemp[i][j]));
                                }
                            }
                        }
                    }
                //}
                //else {
                //    aResult.push(this._getFieldConfig(aBlock[x], aBlock[x].length, aBlock[x].length, 'static', aBlock[x]));
                //}
            }
            return aResult;
        },

        _parseMask: function (maskBlock) {
            if (/^\^.+\${(?:\d+|\d+,\d+)}$/.test(maskBlock)) {
                var nMin = 0,
                    nMax = 0,
                    sTemp = '',
                    mask = '',
                    nTemp = maskBlock.indexOf('{') + 1;
                intervals = maskBlock.substr(nTemp, maskBlock.indexOf('}') - nTemp).split(',');
                if (intervals.length) {
                    return this._getFieldConfig(maskBlock, parseFloat(intervals[0]), parseFloat(intervals[1] || intervals[0]), 'dynamic', '');
                }
            }
            else {
                return this._getFieldConfig(maskBlock, maskBlock.length, maskBlock.length, 'static', maskBlock);
            }
        },

        _getFieldConfig: function (maskBlock, min, max, type, value) {
            return { mask: maskBlock, min: min, max: max, size: (max > this.FIELD_MAX_LENGTH ? this.FIELD_MAX_LENGTH : max), type: type, value: value };
        },

        _fieldClick: function (s, e) {
            if (!this.fields[e].isActive()) {
                this._changeField(this.currentField, e);
                this.fields[e].active(true);
                this.currentField = e;
            }
        },

        _test: function () {
            this.inputValue = '';
            this.formatInputValue = '';
            for (var i = 0; i < this.fields.length; i++) {
                if (this.fieldConfigs[i].type === 'dynamic') {
                    this.inputValue += this.fields[i].get();
                }
                else if (!this.strip) {
                    this.inputValue += this.fields[i].get();
                }
                this.formatInputValue += this.fields[i].get();
            }
            this.callback('valid', this.regexp.test(this.inputValue));
            this.callback('changed', this.inputValue);
        },

        _changeField: function (oldField, newField) {
            this.fields[oldField].active(false);
            this.fields[newField].active(true);
        },

        _getNoFullField: function () {
            if (!this.fields[this.currentField].isEmpty()) {
                var noFullFieldsIndex = [],
                    i = 0,
                    oldField = this.currentField;
                for (; i < this.fieldTypes.dynamic.length; i++) {
                    if (this.fields[this.fieldTypes.dynamic[i]].isEmpty()) {
                        noFullFieldsIndex.push(this.fieldTypes.dynamic[i]);
                    }
                }
                if (noFullFieldsIndex.length) {
                    for (i = 0; i < noFullFieldsIndex.length; i++) {
                        if (this.currentField <= noFullFieldsIndex[i]) {
                            this.currentField = noFullFieldsIndex[i];
                            this._changeField(oldField, this.currentField);
                            break;
                        }
                    }
                    if (this.currentField === oldField) {
                        this.currentField = noFullFieldsIndex[0];
                        this._changeField(oldField, this.currentField);
                    }
                }
            }
        },

        aset: function (str) {
            for (var i = 0; i < str.length; i++) {
                this.set(str.charAt(i));
            }
        },

        set: function (s) {
            this._getNoFullField();
            this.fields[this.currentField].set(s);
        },

        get: function () {
            var result = {
                formatValue: this.formatInputValue,
                data: {}
            };
            result.data[this.inputConfig.name] = this.inputValue;
            return result;
        },

        clear: function () {
            for (var i = 0; i < this.fieldTypes.dynamic.length; i++) {
                this.fields[this.fieldTypes.dynamic[i]].clear();
            }
        }
    });
});