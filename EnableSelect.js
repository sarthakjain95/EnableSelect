
const baseURL= window.location.origin;

function enableSelection(){

	console.log("Text Selection Enabled!");

	const newVal= "auto !important";

	document.body.setAttribute("style", "-webkit-user-select:none");
	document.body.setAttribute("style", "-moz-user-select:-moz-none");
	document.body.setAttribute("style", "-ms-user-select:none");
	document.body.setAttribute("style", "user-select:none");

	document.body.style["user-select"]= newVal;
	document.body.setAttribute("unselectable", "off");

	let allElements= document.getElementsByTagName("*");
	for(let i=0; i<allElements.length; i++){
		allElements[i].style["cursor"]= "auto";
		allElements[i].style["user-select"]= newVal;
		allElements[i].style["-ms-user-select"]= newVal;
		allElements[i].style["-moz-user-select"]= newVal;
		allElements[i].style["-khtml-user-select"]= newVal;
		allElements[i].style["-webkit-user-select"]= newVal;
		allElements[i].setAttribute("unselectable", "off");
		allElements[i].setAttribute('style', "user-select:"+newVal);
		allElements[i].setAttribute('style', "-moz-user-select:"+newVal);
		allElements[i].setAttribute('style', "-webkit-user-select:"+newVal);
	}

	window.onmousedown= null;
	window.onselectstart= null; 
	window.oncopy= null;
	window.oncut= null;
	window.onbeforecopy= null;
	window.ondragstart= null; 
	window.onselectstart= null; 
	window.oncontextmenu= null; 
	window.onselect= null; 
	window.onclick= null;

	document.body.onmousedown= null;
	document.body.onselectstart= null; 
	document.body.oncopy= null;
	document.body.oncut= null;
	document.body.onbeforecopy= null;
	document.body.ondragstart= null; 
	document.body.onselectstart= null; 
	document.body.oncontextmenu= null; 
	document.body.onselect= null; 
	document.body.onclick= null;

	document.onmousedown= null;
	document.onselectstart= null; 
	document.oncopy= null;
	document.oncut= null;
	document.onbeforecopy= null;
	document.ondragstart= null; 
	document.onselectstart= null; 
	document.oncontextmenu= null; 
	document.onselect= null; 
	document.onclick= null;

}


function checkURL(res){
	let urls= res["urls"];
	if( baseURL in urls ) enableSelection();
}

browser.storage.local.get("urls").then(checkURL, console.error);

function logStorageChange(changes, area) {
	if(area=="local"){
		let urls= changes["urls"]["newValue"];
		if(baseURL in urls) enableSelection();	
	}
}

browser.storage.onChanged.addListener(logStorageChange);
