function putIdent(phone, xml, title, description, target, login0)
{
	var ident  = {phone:phone, xml:xml.replace(/(\n(\r)?)/g, ' '), title:title, description:description, target:target, login0:login0? login0:""};
	if(window.localStorage != null){
		top.storage.put("ident_adv_counter", JSON.stringify(ident));
	}
	else{
		top.storage.put("ident_adv_counter",ident.serialize());
	}
}

var store = {
	storeObject: function(key, value) {
		if(!value) return null;
		
		if(window.localStorage != null){
			return top.storage.put(key, JSON.stringify(value));
		}
		else{
			return top.storage.put(key, value.serialize());
		}
	},
	pullObject: function(key) {
		return top.storage.get(key);
	},
	clearObject: function(key) {
		return top.storage.put(key, null);
	}
}