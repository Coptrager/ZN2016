(function (parent) {
    return parent.extend({
        construct: function (placeId, page) {
            this.base(placeId);
            this.page = page;
            this.controls = {};
            this.type = page.type;
        },

        destructor: function () {
            for (var f in this.controls) {
                this.controls[f].destructor();
            }
            this.place.destroy();
            this.base();
        },

        paint: function () {
            switch (this.type) {
                case 'text_input':
                    this.place.html([
                        '<div class="input"></div>',
                        '<div class="keyboards"></div>'
                    ].join(''));

                    this.controls.input = crequire.create('input', [this.place.find('.input')[0], this.page.controls.text_input[0]]);
                    this.controls.keyboard = crequire.create('keyboards', [this.place.find('.keyboards')[0], this.page.controls.keyboard[0]]);

                    this.controls.input.on('valid', delegate(this, function (s, e) {
                        this.callback('valid', e);
                        if (e) {
                            this.page.push(this.controls.input.get().data, this.controls.input.get().formatValue);
                            this.callback('data', {
                                type: this.type,
                                formatValue: this.controls.input.get().formatValue,
                                data: this.page.get()
                            });
                        }
                    }));
                    this.controls.input.on('changed', delegate(this, function (s, e) {
                        this.controls.keyboard.resultString(e);
                    }));
                    this.controls.keyboard.on('click', delegate(this, function (s, e) { this.controls.input.set(e); }));
                    this.controls.keyboard.on('clear', delegate(this, function (s, e) { this.controls.input.clear(); }));
                    this.controls.input.paint();
                    break;
                case 'buttons':
                    this.place.html([
                        '<p class="w_100 ta_c buttonHeadText">', this.page.title, '</p>',
                        '<div class="w_100 h_a p_r buttonBlueLine">',
                            '<div class="providerPageButtonsParent-left"><div class="providerPageButtons-left"></div></div>',
                            '<div class="h_a f_l buttonsBox"></div>',
                            '<div class="providerPageButtonsParent-right"><div class="providerPageButtons-right"></div></div>',
                        '</div>'].join(''));
                    var content = this.place.find('.buttonsBox')[0],
                        pages = [],
                        page = $({  }),
                        inPageIndex = 0,
                        pageIndex = 0;
                    page.css('+=current');
                    this.page.controls[this.type].forEach(delegate(this, function (config) {
                        if (config.visible) {
                            $({ cn: 'pageButton', html: '<span>' + (config.altName || config.disp_value) + '</span>' }).appendTo(page).click(delegate(this, function (el) {
                                this.callback('data', {
                                    type: this.type,
                                    data: config.get()
                                });
                            }));
                            inPageIndex++;
                            if (inPageIndex > 7) {
                                page.appendTo(content);
                                pages.push(page);
                                page = $({  });
                                pageIndex++;
                                inPageIndex = 0;
                            }
                        }
                    }));
                    if (inPageIndex != 0) {
                        page.appendTo(content);
                        pages.push(page);
                    }
                    if (pages.length > 1) {
                        (function () {
                            // work with page
                            var currentPage = 0;
                            var nowAnimation = false;
                            var blueLine = this.place.find('.buttonBlueLine')[0];
                            this.place.css('+=can-slide-right');
                            this.place.find('.providerPageButtons-left')[0].click(delegate(this, moveLeft));
                            this.place.find('.providerPageButtons-right')[0].click(delegate(this, moveRight));
                            function moveRight() {
                                this.place.css('-=move-left');
                                if (nowAnimation) return;
                                if (currentPage >= (pages.length-1)) return;
                                nowAnimation = true;
                                pages[currentPage].css('+=will-hide');
                                currentPage++;
                                if (currentPage >= (pages.length-1)) this.place.css('-=can-slide-right');
                                if (currentPage > 0) this.place.css('+=can-slide-left');
                                this.place.css('+=move-right');
                                setTimeout((function () {
                                    pages[currentPage-1].css('-=current');
                                    pages[currentPage-1].css('-=will-hide');
                                    pages[currentPage].css('+=current');
                                    blueLine.css({ height: parseInt(content.css('height')) + 50 + 'px' });
                                    nowAnimation = false;
                                }).bind(this), 300);
                            }
                            function moveLeft() {
                                if (nowAnimation) return;
                                if (currentPage <= 0) return;
                                nowAnimation = true;
                                pages[currentPage].css('+=will-hide');
                                currentPage--;
                                if (currentPage <= 0) this.place.css('-=can-slide-left');
                                if (currentPage < (pages.length-1)) this.place.css('+=can-slide-right');
                                this.place.css('+=move-left');
                                setTimeout((function () {
                                    this.place.css('-=move-right');
                                    pages[currentPage+1].css('-=current');
                                    pages[currentPage+1].css('-=will-hide');
                                    pages[currentPage].css('+=current');
                                    blueLine.css({ height: parseInt(content.css('height')) + 50 + 'px' });
                                    nowAnimation = false;
                                }).bind(this), 300);
                            }
                        }).bind(this)();
                    }
                    break;
                case 'disp_input':
                    var content = [];
                    if (this.page.title != null) {
                        content.push('<p class="w_100 ta_c outpitHeader">', this.page.title, '</p>');
                    }
                    content.push('<div class="w_100 h_a p_r outputPlace">');
                    this.page.controls[this.type].forEach(delegate(this, function (config) {
                        if (config.visible) {
                            content.push([
                                '<div class="f_l outputBox">',
                                    '<div class="f_l outputLeft">',
                                        '<div class="ta_r">', config.header || '', '</div>',
                                        '<p class="ta_r">', config.footer || '', '</p>',
                                    '</div>',
                                    '<div class="f_r ta_l outputRight">', config.disp_value, '</div>',
                                '</div>'
                            ].join(''));
                        }
                    }));
                    this.callback('data', {
                        type: this.type,
                        data: this.page.get()
                    });
                    content.push('</div>');
                    this.place.html(content.join(''));
                    break;
            }
        },

        isOnline: function () {
            return this.page.online;
        },

        getType: function () {
            return this.type;
        }
    });
});