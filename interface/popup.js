
let checkbox= document.getElementById("ext_status");
checkbox.addEventListener("change", val=>toggleURL(checkbox.checked));

async function toggleURL(isChecked){
	if(isChecked){
		let {urls}= await browser.storage.local.get('urls');
		browser.tabs.query({currentWindow: true, active: true}).then(tabs=>{
			for(let tab of tabs){
				let url= new URL(tab.url);
				if(url.origin==null) urls[tab.url]= true;
				else urls[url.origin]= true;
			}
		}, err=>console.log("ExtensionError:",err));
		await browser.storage.local.set({urls});
	}else{
		let {urls}= await browser.storage.local.get('urls');
		browser.tabs.query({currentWindow: true, active: true}).then(tabs=>{
			for(let tab of tabs){
				let url= new URL(tab.url);
				delete urls[url.origin];
				break; 
			}
		}, err=>console.log("ExtensionError:",err));
		await browser.storage.local.set({urls});
	}
}

async function init(){
	let {urls}= await browser.storage.local.get('urls');
	if(urls==undefined){
		let urls= {};
		await browser.storage.local.set({urls});
	}else{
		browser.tabs.query({currentWindow: true, active: true}).then(tabs=>{
			for(let tab of tabs){
				let url= new URL(tab.url);
				if(url.origin in urls){
					checkbox.checked= true;
					break;
				}
			}
		}, err=>console.log("ExtensionError:",err));
	}
}

init();
