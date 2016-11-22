'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

Promise.reduce = function (fns, val) {
	return fns.reduce(function (prev, current) {
		return prev.then(function (result) {
			return current(result);
		});
	}, val instanceof Promise ? val : Promise.resolve(val));
};
var detectPath = '\/core';
var reg = new RegExp('(^.*' + detectPath + ')/([\\/\\w\\d-]*)\\.?([\\w\\.\\d]*)');
var up = function up(string) {
	return string.replace(/(?:.(?!\/.))+$/, '');
};
exports.locate = function (load) {
	try {
		var haveBar = /#/.test(load.name);

		var _load$name$replace$ma = load.name.replace(/#/g, '').match(reg);

		var _load$name$replace$ma2 = _slicedToArray(_load$name$replace$ma, 4);

		var _ = _load$name$replace$ma2[0];
		var path = _load$name$replace$ma2[1];
		var file = _load$name$replace$ma2[2];
		var extension = _load$name$replace$ma2[3];

		extension = extension || 'js';
		var result = '' + path + (file.startsWith('lib') ? '' : '/js') + '/' + file + '.' + extension;
		if (!haveBar && !file.startsWith('lib') && window.qiwi && qiwi.application && qiwi.application.name) result = up(path) + '/projects/' + qiwi.application.name + '/js/' + file + '.' + extension + '|' + result;
		return result;
	} catch (e) {
		return load.name;
	}
};
exports.fetch = function (load, loader) {
	var addresses = load.address.split('|');
	return Promise.reduce(addresses.map(function (_, index) {
		return function () {
			return Promise.resolve(load.address = addresses[index]).then(function () {
				return loader(load);
			}).then(function (loadedFile) {
				return Promise.reject(loadedFile);
			}, function (failed) {
				return Promise.resolve(failed);
			});
		};
	})).then(function (err) {
		return Promise.reject('Failed to load files on: ' + addresses.join('; ') + ', sample error: ' + err);
	}, function (loadedFile) {
		return Promise.resolve(loadedFile);
	});
};
exports.translate = function (load) {
	var name = void 0;
	// TODO: понять каким образом грузить project'ные элементы и страницы из cor'овоских
	// Например: страница core/pages/somePage.jsx нуждается в keyboard.jsx, которая переопределена в projects/somePrj/elements/keyboard.jsx
	// Но в projects/otherPrj/elements такого элемента нет, поэтому используем core/elements/keyboard.jsx
	// Почему-то при раскомментировании кода ниже - все ломается (пример - сценарий simple_old_not_verified в identification, страница pin).
	if (name = load.name.match(/([^\/]*)\.jsx$/) /* && !/#/.test(load.name)*/) load.source = load.source.replace(new RegExp('([\'"]jsx!pages/)(' + name[1] + '[\'"])'), '$1#$2');
	//TODO: убрать когда все проекты переедут на import'ы
	load.source = load.source.replace(/(text!\.\.\/)\.\.\//g, '$1').replace(/['"]jsx!(.*?)['"]/g, '\'$1.jsx\'').replace(/(['"])\.\.\/\.\.\//, '$1../');
};