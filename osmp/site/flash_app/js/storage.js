if(window.localStorage != null){
    storage = {

        set: function(sName, sValue) {
            if (sValue != null && (typeof sValue == "object"))
                localStorage[sName] = JSON.stringify(sValue);
            else
                localStorage[sName] = sValue;
        },

        remove: function(sName) {
            localStorage.removeItem(sName);
        },

        get: function(sName) {
            return localStorage[sName]
        },

        clear: function() {
            localStorage.clear();
        },

        show: function() {
            var result = "";
            for (var f in localStorage) {
                result += f + ": " + localStorage[f] + "\n";
            }
            alert(result);
        }
    };

    storage.put = storage.set;
    }
