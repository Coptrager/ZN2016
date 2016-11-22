(function (parent) {
    return parent.extend({
        construct: function (placeId, type) {
            this.base(placeId);

            if (type == null) type = 'DG';
            
            this.keyArray = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];
            switch (type) {
                case 'DG':
                    this.keyArray.push(['0']);
                    break;
                case 'DGD':
                    this.keyArray.push(['0', '.']);
            }

            this._zeroSize = 4 - this.keyArray[this.keyArray.length-1].length;

            this._paint();
        },

        _paint: function () {
            var box, bg;
            for (var i = 0; i < this.keyArray.length; i++) {
                box = $({ cn: 'f_l digitalKeyboard-box' }).appendTo(this.place);

                for (var j = 0; j < this.keyArray[i].length; j++) {
                    var classes = 'f_l digitalKeyboard-key digitalKeyboard-bg'+i;
                    if (this.keyArray[i][j] === '0') {
                        classes += ' digitalKeyboard-zero-' + this._zeroSize;
                    }
                    $({ 
                        cn: classes,
                        html: this.keyArray[i][j]
                    }).on('click', delegate(this, this._click)).appendTo(box);
                }
            }
        },

        _click: function (key) {
            this.callback('click', key.html());
        }
    });
});