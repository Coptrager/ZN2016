// otherWindow - window объект страницы(фрейма), с которой производится обмен
// connectionId - Id текущего подключения(должен быть одинаков на обоих сторонах)
// target - объект, к которому ведется обращение с другой стороны
// функции переданные в качестве аргумента при вызове функции должны быть выполнены
// 	 ровно 1 раз не больше и не меньше и не иметь возвращаемого значения
// Пример:
//   Сторона 1:
//     IFrameChannel(top, 'tagX', { wow: {x: function (msg, callback) { alert(msg); callback() } } })
//   Сторона 2:
//     var channel = IFrameChannel(document.getElementById('frameId').contentWindow, 'tagX');
//     channel('wow.x')('This is message', function () { alert('Completed!'); });
// После завершения работы должен быть вызван dispose (он убирает лишних подписчиков)
//     channel.dispose();

window.IFrameChannel = function (otherWindow, connectionId, target) {
	var funcProxy = (function () {
		var id = 0;
		var functions = {};
		return {
			add: function (func) {
				id++;
				functions[id] = func;
				return id;
			},
			callOnce: function (id, argsArray) {
				var func = functions[id];
				delete functions[id];
				func.apply({}, argsArray);
			}
		};
	})();

	var targetCall = function (path, args) {
		var thisTarget = target;
		var prevTarget = null;
		if (path != '') {
			path.split('.').forEach(function (x) {
				if (thisTarget == null) return;
				prevTarget = thisTarget;
				thisTarget = thisTarget[x];
			});
		}
		if (thisTarget == null) return;
		thisTarget.apply(prevTarget, args);
	};

	var argsWork = {
		encode: function (argObject) {
			return Array.prototype.map.call(argObject, function (x) {
				if (typeof x !== 'function') return [x];
				return funcProxy.add(x);
			});
		},
		decode: function (args) {
			return args.map(function (x) {
				if (typeof x === 'object') return x[0];
				return function () {
					messageProcess.send({
						connectionId: connectionId,
						type: 'callbackCall',
						id: x,
						args: argsWork.encode(arguments)
					});
				};
			});
		}
	};

	var messageProcess = {
		send: function (obj) {
			otherWindow.postMessage(JSON.stringify(obj), '*');
		},
		receive: function (text) {
			var msg = null;
			try {
				msg = JSON.parse(text);
			} catch (e) {}
			if (msg == null || msg.connectionId != connectionId) return;

			switch (msg.type) {
				case 'userCall':
					targetCall(msg.call, argsWork.decode(msg.args));
					break;
				case 'callbackCall':
					funcProxy.callOnce(msg.id, argsWork.decode(msg.args));
					break;
			}
		}
	};

	var msgReceiver = function (event) {
		messageProcess.receive(event.data);
	}

	window.addEventListener('message', msgReceiver, false);

	var result = function (funcName) {
		return function () {
			messageProcess.send({
				connectionId: connectionId,
				type: 'userCall',
				call: funcName,
				args: argsWork.encode(arguments)
			});
		}
	};
	result.dispose = function () {
		window.removeEventListener('message', msgReceiver, false);
	}
	return result;
};