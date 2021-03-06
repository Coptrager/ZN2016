(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession) {
            this.base(place, pageConfig, paySession);
        },

        paint: function () {
            this.base();

            UI.loadFile.html('./pages/info_lease/default/resourses/file.html', delegate(this, function (err, text) {
                if (err) return this.error({ type: err.type, additional: { fileName: err.file }, userText: 'source info_lease.js' });

                this.pageControls.textScroll = new crequire.controls.textScroll.script('textScroll', this._preparation(text));
                this.pageControls.textScroll.paint();
            }));

            this.pageControls.bottomMenu.paint([
                { name: 'back' },
                { name: 'home' }
            ]);
            this.pageControls.bottomMenu.on('click', delegate(this, this._navigateClick));
        },

        _preparation: function (text) {
            return text.replace(/\n/g, '<br />');
        },

        _navigateClick: function (s, e) {
            switch (e) {
                case 'back':
                    this.back();
                    break;
                case 'home':
                    this.exit();
                    break;
            }
        }
    });
});