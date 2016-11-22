(function () {
    return PagePattern.extend({
        construct: function (place, pageConfig, paySession, appList) {
            this.base(place, pageConfig, paySession, appList);
            this.logoBox = null;
            this.nameBox = null;
            this.pageControls = {
                bottomMenu: null
            };
        },

        paint: function () {
            this.pageControls.bottomMenu = new crequire.controls.bottomMenu.script('bottomMenu');
        }
    });
});