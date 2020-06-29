
document.body.style.border= "4px solid red";
const base_url= window.location.origin;

function enable_selection(){

	console.log("pasting allowwd");

	const new_val= "auto !important";

	document.body.setAttribute("style", "-webkit-user-select:none");
	document.body.setAttribute("style", "-moz-user-select:-moz-none");
	document.body.setAttribute("style", "-ms-user-select:none");
	document.body.setAttribute("style", "user-select:none");

	document.body.style["user-select"]= new_val;
	document.body.setAttribute("unselectable", "off");

	let all_elements= document.getElementsByTagName("*");
	for(let i=0; i<all_elements.length; i++){
		all_elements[i].style["cursor"]= "auto";
		all_elements[i].style["user-select"]= new_val;
		all_elements[i].style["-ms-user-select"]= new_val;
		all_elements[i].style["-moz-user-select"]= new_val;
		all_elements[i].style["-khtml-user-select"]= new_val;
		all_elements[i].style["-webkit-user-select"]= new_val;
		all_elements[i].setAttribute("unselectable", "off");
		all_elements[i].setAttribute('style', "user-select:"+new_val);
		all_elements[i].setAttribute('style', "-moz-user-select:"+new_val);
		all_elements[i].setAttribute('style', "-webkit-user-select:"+new_val);
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


function process_local_results(res){
	let urls= res["urls"];
	if( base_url in urls ) enable_selection();
}

browser.storage.local.get("urls").then(process_local_results, console.error);

function logStorageChange(changes, area) {
	if(area=="local"){
		let urls= changes["urls"]["newValue"];
		if(base_url in urls) enable_selection();	
	}
}

browser.storage.onChanged.addListener(logStorageChange);
