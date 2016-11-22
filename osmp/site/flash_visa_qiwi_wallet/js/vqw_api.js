vqw_js_api = {
    OnResponse: function(sName, sVal){
        var flashContainer = document.getElementById("flashcontent_ff");
        if(flashContainer == null){
            flashContainer = document.getElementById("flashcontent");
        }

        if(flashContainer != null && flashContainer.fromMaratl != undefined)
            flashContainer.fromMaratl(sName, sVal);
    },

    container: function () {
       return document.getElementById("flashcontent_ff");
    },

    checkConnect: function(){
        return 'true';
    },

    startListeners: function(){
        window.onerror = function(e){
            terminal.ProcessCommand('WriteToLog', e);
        };

        terminal.OnResponse = this.OnResponse;

        this.sendStatistics();
    },

    sendStatistics: function(){
        terminal.ProcessCommand('statistics.action', JSON.stringify({
            type:'show',
            page:'wallet',
            date:new Date().toLocaleFormat('%d.%m.%Y %H:%M:%S'),
            data:{
                app_name: 'VQW'
            }
        }));
    },

    log:function(val){
        //alert(val);
    },

    checkSession: function(){
        return storage.get != undefined;
    },

    getSession:function (){
        session_obj = {login:storage.get("login"),
            login0:storage.get("login0"),
            phone_prv_id:storage.get("phone_prv_id"),
            ident:storage.get("ident"),
            mode:storage.get("mode"),
            button_id:storage.get("button_id")};
        this.clearSession();
        return session_obj;
    },

    clearSession:function (){
        storage.remove("login");
        storage.remove("login0");
        storage.remove("phone_prv_id");
        storage.remove("ident");
        storage.remove("mode");
        storage.remove("button_id");
    },

    setId: function(id){
        storage.put("prv_id", id);
    },

    toMaratl:function (code, value){
        terminal.ProcessCommand(code, value);
    },

    setExitPage: function (page){
        storage.put("exit_page", page);
    },

    exitToPrv:function (prv_id,type,page){

       if(window.localStorage != null){
           switch(type){
               case "provider":
                   storage.put('interfaceStartParams','#change_type#' + JSON.stringify({ page: 'provider', id: prv_id }));

                   break;
               case "group":
                   storage.put('interfaceStartParams','#change_type#' + JSON.stringify({ page: 'category', id: prv_id }));

                   break;
           }
           storage.put("exit_page", page);
        }
        else{
            storage.put(type, prv_id);
            storage.put("exit_page", page);
       }
    },

    open_provider:function (id, login, login0, balance, phone_prv_id, favourite,ident,mode){
        storage.put("prv_id", id);
        storage.put("login", login);
        storage.put("login0", login0);
        storage.put("balance", balance);
        storage.put("phone_prv_id", phone_prv_id);
        storage.put("favourite", favourite);
        storage.put("ident", ident);
        storage.put("mode", mode);
    },

    load_params: function() {
        var xobj = new XMLHttpRequest();
        var result = {};
        try {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', '../params.json', false);
            xobj.send(null);
            result = JSON.parse(xobj.responseText)
        }catch(e){

        }
        return result;
    }
};