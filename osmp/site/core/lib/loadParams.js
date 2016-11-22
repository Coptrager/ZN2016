'use strict';

function loadParams() {
	document.startSec = new Date().getSeconds();
	try {
		var xobjParams = new XMLHttpRequest();
		xobjParams.overrideMimeType('application/json');
		xobjParams.open('GET', '../params.json', true);
		xobjParams.onload = xobjParamsLoad;
		xobjParams.send(null);
	} catch (e) {
		console.log(e);
	}
}

function xobjParamsLoad(data) {
	try {
		document.config = JSON.parse(data.currentTarget.responseText);
		document.config.isLight = document.config.info['terminal-type'] === '19';
		loadStyles(document.config.isLight);
	} catch (e) {
		terminal.processcommand('WriteToLog', '[error 1]' + e);
	}
}

function loadStyles(light) {
	var link = document.createElement("link");
	link.href = 'css/preloader-' + (light ? 'light' : 'classic') + '.css';
	link.type = "text/css";
	link.rel = "stylesheet";

	document.getElementsByTagName("head")[0].appendChild(link);
}

function loadConfig() {
	var xobjConfig = new XMLHttpRequest();
	xobjConfig.overrideMimeType('application/json');
	xobjConfig.open('GET', '../config.json', true);
	xobjConfig.onload = xobjConfigLoad;
	xobjConfig.send(null);
}

function xobjConfigLoad(data) {
	document.regConfig = JSON.parse(data.currentTarget.responseText);
}

loadParams();
loadConfig();