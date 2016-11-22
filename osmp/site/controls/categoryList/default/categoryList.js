(function(parent) {
    return parent.extend({
		construct: function(placeId, category, position) {
		    this.base(placeId);
		    this.topCategoryId = category.length && category.charAt(0) === '-' ? category.substr(1) : category;
		    this.names = [];
		    this.category = {};
		    this.path = [];
		    this.position = position || {};
		    this.isCellular = false;
		    this.block = null;
		    this.history = [];
		},

		paint: function () {
		    UI.loadFile.config('./config/-' + this.topCategoryId + '.js', delegate(this, function (err, category) {
		        if (err) return this.error({ type: 'cantLoadFile', additional: { fileName: err.file } });

		        this._push(category);
		        this.isCellular = this.category['category_' + this.topCategoryId].isCellular();
		        this.place.html([
                    '<div class="p_r wh_100">',
                        '<div id="categoryListPlace" class="p_a categoryList-button-place"></div>',
                    '</div>'
		        ].join(''));

		        this.block = $('categoryListPlace');
		        this._paintList();
		    }));
		},

		_parseList: function (list) {
		    var resultList = [[]];
		    if (list.length > 12 || (this.path.length > 1 && list.length > 11)) {
		        var firstPageCount = this.path.length === 1 ? 11 : 10,
                    n = 0;
		        for (var i = 0; i < firstPageCount; i++) {
		            resultList[0].push(list[n]);
		            n++;
		        }
                
		        var l = Math.ceil((list.length - firstPageCount) / 10) + 1;
		        for (i = 1; i < l; i++) {
		            var l2 = list.length - n > 11 ? 10 : list.length - n;
		            if (l2) {
		            	resultList.push([]);
		            	for (var j = 0; j < l2; j++) {
		                	resultList[i].push(list[n]);
		                	n++;
		            	}
		        	}
		        }
		        return resultList;
		    }
		    else {
		        return [list];
		    }
		},

		_paintList: function () {
		    var category = this.category['category_' + this.path[this.path.length - 1]],
                count = this.history[this.history.length - 1].count,
                maxCount = this.history[this.history.length - 1].maxCount,
		        content = '',
		        el = null,
		        i = 0;
		    if (this.block.html().length) this.block.createChildren();
		    if (this.path.length > 1 || (this.path.length === 1 && count > 0)) {
		        content += '<div class="f_l p_r categoryList-box"><div class="categoryList-back"></div></div>';
		    }
		    for (i = 0; i < category.children[count].length; i++) {
		        el = category.children[count][i];
		        content += '<div class="f_l p_r categoryList-box"><div class="' + (el.type === 'provider' ? 'providerButton' : 'folderButton') + '" data-index="[' + count + ',' + i + ']"> </div></div>';
		    }
		    if (count + 1 < maxCount) {
		        content += '<div class="f_l p_r categoryList-box"><div class="categoryList-next"></div></div>';
		    }
		    this.block.html(content);

		    var back = this.block.find('.categoryList-back'),
                next = this.block.find('.categoryList-next');

		    this._createButton(this.block.find('.folderButton'), 'group');
		    this._createButton(this.block.find('.providerButton'), 'provider');
            
		    if (back.length) (new crequire.controls.button.script(back[0], { pushAnimationDuration: 1, clickTimeout: 200, text: '<p>предыдущая<br />' + (count ? ('<span>' + count + '-я из ' + maxCount + ' страниц</span>') : '')+'</p>' })).on('click', delegate(this, this._back));
		    if (next.length) (new crequire.controls.button.script(next[0], { pushAnimationDuration: 1, clickTimeout: 200, text: '<p>следующая<br /><span>' + (count + 2) + '-я из ' + maxCount + ' страниц</span></p>' })).on('click', delegate(this, this._next));
		},

		_createButton: function (list, type) {
		    var category = this.category['category_' + this.path[this.path.length - 1]],
                index = [],
                button = null,
                control = '';
		    for (i = 0; i < list.length; i++) {
		        index = JSON.parse(list[i].getData('index'));
		        control = type === 'provider' ? 'providerButton' : 'folderButton';
		        (new crequire.controls[control].script(
                    list[i],
                    {
                        logo: category.children[index[0]][index[1]].logo.standard,
                        text: category.children[index[0]][index[1]].buttonName,
                        pushAnimationDuration: 150,
                        callbackData: { index: index }
                    }
                )).on('click', delegate(this, this._click));
		    }
		},

		_push: function (category) {
		    var id = category.id.substr(1),
                name = 'category_' + id;
		    this.path.push(id);
		    this.category[name] = guiConfig(category);
		    this.category[name].children = this._parseList(this.category[name].children);
		    this.history.push({
		        id: id,
		        count: 0,
		        maxCount: this.category[name].children.length
		    });
		    this.names.push(this.category[name].name);
		    this.callback('change', { type: 'forward', names: this.names});
		},

		_remove: function () {
		    this.callback('change', { type: 'back', names: this.names });
		    this.path.splice(this.path.length - 1, 1);
		    this.history.splice(this.history.length - 1, 1);
		    this.names.splice(this.names.length - 1, 1);
		},

		_click: function (s, e) {
		    var category = this.category['category_' + this.path[this.path.length - 1]],
                page = e.index[0],
		        index = e.index[1];

		    var current = category.children[page][index];

		    if (current.type === 'provider') {
		        UI.loadFile.config('./config/' + current.id + '.js', delegate(this, function (err, config) {
		            if (err) return window.onerror(err);
		            this._clickProvider(guiConfig(config));
		        }));
		        return;
		    }
		    else {
		        if (current.children.length) {
		            this._clickCategory(current);
		        }
		        else {
		            UI.loadFile.config('./config/' + current.id + '.js', delegate(this, function (err, category) {
		                if (err) return this.error({ type: 'cantLoadFile', additional: { fileName: err.file } });
		                this._push(category);
		                this._paintList();
		            }));
		        }
		    }
		},

		_clickProvider: function (provider) {
		    this.callback('click', provider);
		},

		_back: function () {
		    statistics.clickAction({ button: 'prev_list' });
		    if (this.history[this.history.length - 1].count === 0) {
		        this._remove();
		    }
		    else {
		        this.history[this.history.length - 1].count--;
		    }
		    this._paintList();
		},

		_next: function () {
		    statistics.clickAction({ button: 'next_list' });
		    this.history[this.history.length - 1].count++;
		    this._paintList();
		}
	});
});