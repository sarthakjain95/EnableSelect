
let checkbox= document.getElementById("ext_status");
checkbox.addEventListener("change", val=>toggle_url(checkbox.checked));

async function toggle_url(is_checked){
	if(is_checked){
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
					console.log("found url!");
					checkbox.checked= true;
					break;
				}
			}
		}, err=>console.log("ExtensionError:",err));
	}
}

init();
