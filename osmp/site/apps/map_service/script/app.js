var app = {

    init: function (config) {
        this.config = config;
        this.id = config.name;
    },

    start: function () {
        messenger.attach('maratl.TermInfo',delegate(this, function (s, e) {
            try{
                var parser = new DOMParser();
                xmlDoc = parser.parseFromString(e.value,"text/xml");

                var gps = {
                    lt:xmlDoc.getElementsByTagName("coordinates")[0].getAttribute("lat"),
                    ln: xmlDoc.getElementsByTagName("coordinates")[0].getAttribute("lng")
                };
                if(!sessionStorage.getItem('ssk_map_image'))
                    this.getMap(gps);
                if(!sessionStorage.getItem('ssk_map_terminals'))
                    this.getTerminals(gps);
            }catch(e){
                this.log('Fail to load coordinates');
            }
        }),{GetTermInfo: true});
    },

    getMap: function(gps){
        var request = new XMLHttpRequest();
        var params = "app_id="+this.config.app_id+"&app_code="+this.config.app_code+"&w="+this.config.width+"&h="+this.config.height+"&z=16&ctr="+gps.lt+","+gps.ln+"&ml=rus&f=0&style=fleet";
        request.open("GET", this.config.url + "?" + params, true);
        request.responseType = "blob";
        request.onerror = delegate(this, function(oEvent) {});
        request.onload = delegate(this, function(oEvent) {
            try{
                var reader = new window.FileReader();
                reader.readAsDataURL(request.response);
                reader.onloadend = delegate(this, function() {
                    this.log('Map downloaded');
                    sessionStorage.setItem('ssk_map_image', reader.result);
                });
            }catch(e){
                this.log('Fail to load map');
            }
        });
        request.send(null);
    },

    getTerminals: function(gps){
        var request = JSON.stringify({
            url: 'https://w.qiwi.com/xml/xmlutf.jsp',
            method: 'POST',
            request: '<request>'+
                        '<request-type>geoapi-get-update-coords</request-type>'+
                        '<terminal-id>71115666665</terminal-id>'+
                        '<extra name="mylk-pin">5689</extra>'+
                        '<update><gps prc="10" alt="0" lt="'+gps.lt+'" ln="'+gps.ln+'"/></update>'+
                        '<terminals max-points="200" radius="2200">'+
                        '<owners><id>1</id></owners>'+
                        '</terminals>'+
                    '</request>'
        });

        messenger.attach('maratl.network.proxy',delegate(this, function (s, e) {
            try{
                if(e.value != 'error') {
                    var response = JSON.parse(e.value);
                    if (response['result-code'] == 0){
                        this.log('Nearest terminals downloaded');
                        sessionStorage.setItem('ssk_map_terminals', response.response);
                    }
                }
            }catch(e){
                this.log('Fail to load nearest terminals');
            }

        }),{'network.proxy': request});
    },

    log: function(text){
        messenger.sendPayData({WriteToLog: text});
    }
};