(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession) {
            this.base(place, pageConfig, paySession);

            this.pageControls.popupLoader = new crequire.controls.popupLoader.script('popupLoader');
        },

        fromFlash: function (code, value) {
            terminal.processcommand(code, value);
        },

        close: function () {
            this.back();
        },

        endLoad: function () {
            this.pageControls.popupLoader.hide();
        },

        showError: function (text) {
            this.pageControls.popupLoader.show('error', text);
        },

        showFatalError: function (text) {
            this.pageControls.popupLoader.show('error', text);
            this.pageControls.popupLoader.on('closed', delegate(this, this.onErrorClose));
        },

        onErrorClose: function(){
            this.back();
        },

        startLoad: function (str) {
            this.pageControls.popupLoader.show('request', str);
        },

        startListeners: function(){
            maratl.on('terminalResponse', function (s, e) {
                window.document.getElementById('flashcontent_ff').fromMaratl(e.name, e.value);
            });
        },

        destructor: function () {
            window.startListeners = null;
            window.fromFlash = null;
            window.close = null;
            window.startLoad = null;
            window.endLoad = null;
            window.showError = null;
            window.showFatalError = null;
            this.base();
        },

        paint: function () {
            this.base();

            this.startLoad("Загрузка данных, подождите, пожалуйста...")

            window.startLoad = delegate(this, this.startLoad);
            window.fromFlash = delegate(this, this.fromFlash);

            window.endLoad = delegate(this, this.endLoad);
            window.showError = delegate(this, this.showError);
            window.showFatalError = delegate(this, this.showFatalError);
            window.close = delegate(this, this.close);

            window.startListeners =delegate(this, this.startListeners);
            window.checkConnect =  function() {
                return "true";
            };
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