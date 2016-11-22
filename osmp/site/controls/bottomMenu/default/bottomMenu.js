(function (parent) {
    return parent.extend({
        construct: function (placeId) {
            this.base(placeId);
            this.buttonConfig = {
                'back': {
                    textStringId: 'backButton',
                    classes: 'bm-left bm-arrow'
                },
                'home': {
                    textStringId: 'homeButton',
                    classes: 'bm-center'
                },
                'forward': {
                    textStringId: 'forwardButton',
                    classes: 'bm-right bm-arrow bm-orange'
                },
                'search': {
                    textStringId: 'searchButton',
                    classes: 'bm-right bm-search bm-orange'
                },
                'pay': {
                    textStringId: 'payButton',
                    classes: 'bm-right bm-arrow bm-orange'
                },
                'post': {
                    textStringId: 'postButton',
                    classes: 'bm-right bm-arrow bm-orange'
                },
                'wantHelp': {
                    textStringId: 'wantHelpButton',
                    classes: 'bm-right bm-arrow bm-small-font bm-orange'
                },
                'find': {
                    textStringId: 'findButton',
                    classes: 'bm-right bm-arrow bm-orange'
                }
            }
        },

        destructor: function () {
            for (var f in this) {
                if (typeof this[f].destructor === 'function') this[f].destructor();
            }
            this.base();
        },

        paint: function (configs) {
            var i, box, element, visElement;
            box = $({ cn: 'p_r wh_100 bottom-menu' });
            for (i = 0; i < configs.length; i++) {
                element = this.buttonConfig[configs[i].name];
                visElement = $({
                    html: '<div class="wh_100 p_r"><div>' + this._getText(element.textStringId) + '</div></div>',
                    cn: element.classes + ' p_a bm-button'
                }).appendTo(box);
                this[configs[i].name] = new crequire.controls.button.script(visElement, { callbackData: { name: configs[i].name } });
                this[configs[i].name].on('click', delegate(this, this._click));

                this[configs[i].name].active(configs[i].hasOwnProperty('active') ? configs[i].active : true);
                if (configs[i].hasOwnProperty('visible') && !configs[i].visible) this[configs[i].name].hide();
            }

            this.place.append(box);
        },

        _getText: function (name) {
            return getUIString(name);
        },

        visible: function (name, visible) {
            if (this.hasOwnProperty(name) && this[name]) {
                if (visible) {
                    this[name].show();
                }
                else {
                    this[name].hide();
                }
            }
        },

        _click: function (s, e) {
            this.callback('click', e.name);
        }
    });
});