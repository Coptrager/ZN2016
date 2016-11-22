(function(parent) {
	return parent.extend({
		construct: function(place, pageConfig, paySession) {
			console.log(this.base);
			this.base(place, pageConfig, paySession);
			this.controls = {
				textfield: null,
				numpad: null
			};
			this.timeoutStart();
		},

		paint: function() {
			this.base();
			this._c.comment.html("Максимальная сумма платежа с учетом комиссии составляет 9000 руб.<br/>" +
				"Сумма платежей на один номер счета в течение 7 дней не должна превышать 600 000 руб.");
			this.controls.textfield = new crequire.controls['textfield'].script('textfield');
			this.controls.numpad = new crequire.controls['numpad'].script('numpad');
			this.controls.numpad.on('button-click', delegate(this, this.onNumpadClick))
		},

		onNumpadClick: function(numpad, data) {
			console.log("numpadclick: " + data);
			this.controls.textfield.appendText(data);
		}

	});
});

