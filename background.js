
function check_urls(){
	browser.storage.local.get('urls').then(function(res){
		let urls= res["urls"];
		if(urls==undefined){
			console.log("making urls variable");
			let urls= {};
			browser.storage.local.set({urls});
		}
	});
}

check_urls();
