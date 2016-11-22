(function () {
    return PagePattern.extend({
        construct: function (place, pageConfig, paySession, appList) {
            this.base(place, pageConfig, paySession, appList);
            this.logoBox = null;
            this.nameBox = null;
            this.pageControls = {
                bottomMenu: null
            };
            this.isATM = this.interfaceConfig.get('params:index_config:ssk_atm', '') == '1' ? 0 : 1;
            this.terminalText = ['банкомат', 'терминал'];
        },

        paint: function () {
            this.pageControls.bottomMenu = new crequire.controls.bottomMenu.script('bottomMenu');
            $.find('.trm-id').forEach((function (el) {
                el.html(this.paySession.sessionInfo.terminal);
            }).bind(this));
            $.find('.trm-type').forEach((function (el) {
                el.html(this.terminalText[this.isATM]);
            }).bind(this));
            $.find('[data-link]').forEach((function (el) {
                el.click((function (cel) {
                    if (cel.getData('param')) this.next(cel.getData('link'), JSON.parse(cel.getData('param')));
                    else this.next(cel.getData('link'));
                }).bind(this));
            }).bind(this));
        }
    });
});