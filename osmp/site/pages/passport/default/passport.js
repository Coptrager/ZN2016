(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession) {
            this.base(place, pageConfig, paySession);
            var self = this;
            this.common = {
                processCommand: function (code, value) {
                    terminal.processcommand(code, value);
                },
                exit: function () {
                    self.next('final');
                }
            };
        },

        destructor: function () {
            this.channel && this.channel.dispose();
            this.disposeListener && this.disposeListener();
            this.base();
        },

        paint: function () {
            var childWindow = window.document.getElementById('passportFrame').contentWindow;
            var channel = IFrameChannel(childWindow, 'passportFrameConnection', this.common);
            this.channel = channel;
            this.disposeListener = maratl.addResponseListener(function (code, value) {
                channel('response')(code, value);
            });
        }
    });
});