(function (parent) {
    return parent.extend({
        construct: function (place, pageConfig, paySession, appList) {
            this.base(place, pageConfig, paySession, appList);
            this.pageControls = {};
        },

        paint: function () {
            this.base();
            this.appRender();
            try{
                window.addEventListener("message",delegate(this, this._bannerListener));
                for (var i = 0; i < this.appList.length; i++)
                    if (this.appList[i].type === 'widget') {
                        maratl.set('adv_show', 'true');
                        break;
                    }
            }
            catch(e){
                maratl.set('WriteToLog','addEventListener error: '+ e);
            }
        },

        _bannerListener:function (event) {
            var response = JSON.parse(event.data);
            switch (response.event){
                case 'pause':
                    switch (response.data.type){
                        case 'resume':
                            maratl.set('exit', 'true');
                            break;
                        case 'pause':
                            maratl.set('stopTimer', 'true');
                            break;
                    }
                    break;
                case 'top':
                    maratl.set('top', 'true');
                    break;
                case 'close':
                    maratl.set('close', 'true');
                    break;
                case 'bottom':
                    maratl.set('bottom', 'true');
                    break;
                case 'blocked':

                    break;
                case 'fchangeSize':
                    if(response.data == 'fullscreen')
                        maratl.set('fullscreen', 'true');
                    else
                        if(response.data.width && response.data.height)
                            maratl.set('change_size', JSON.stringify(response.data));
                    break;
                case 'out':
                    switch (response.data.type){
                        case 'provider':
                            maratl.set('exit_to_prv', response.data.data);
                            break;
                        case 'category':
                            maratl.set('exit_to_category', response.data.data);
                            break;
                    }
            }
        }
    });
});