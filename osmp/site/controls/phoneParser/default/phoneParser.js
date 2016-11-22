(function (parent) {
    return parent.extend({
        construct: function () {
            this.base();
            this.regions = [];
            this._loadRegions();
        },

        _loadRegions: function () {
            regions = null;
            UI.loadFile.script('./phones/regions.js', delegate(this, function (err, path) {
                if (err) return err;
                this.regions = regions;
                regions = null;
            }));
        },

        parse: function (phoneNumber, callback) {
            if (typeof phoneNumber === 'string' && /\d{10}/.test(phoneNumber)) {
                var file = phoneNumber.substr(0, 3);
                phonesIndex = {};
                phonesIndex[file] = {};
                
                UI.loadFile.script(['./phones/', file, '.js'].join(''), delegate(this, function (err, path) {
                    if (err) return callback(err, null);
                    var phones = phonesIndex[file],
                        test = parseInt(phoneNumber.substr(3), 10);
                    phonesIndex = null;

                    
                    for (var f in phones) {
                        for (var f2 in phones[f]) {
                            for (var i = 0; i < phones[f][f2].length; i++) {
                                if (test >= parseInt(phones[f][f2][i][0].substr(3), 10) && test <= parseInt(phones[f][f2][i][1].substr(3), 10)) {
                                    return callback(null, {
                                        id: phones[f][f2][i][2],
                                        regionId: phones[f][f2][i][3],
                                        region: this.getRegion(phones[f][f2][i][3]),
                                        number: phoneNumber
                                    });
                                }
                            }
                        }
                    }
                    
                    callback({
                        type: 'data',
                        text: 'undefined'
                    }, null);
                }));
            }
        },

        getRegion: function (id) {
            return this.regions[id] || '';
        }
    });
});