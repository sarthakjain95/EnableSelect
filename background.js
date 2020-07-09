
function checkURLS(){
	browser.storage.local.get('urls').then(function(res){
		let urls= res["urls"];
		if(urls==undefined){
			let urls= {};
			browser.storage.local.set({urls});
		}
	});
}

checkURLS();
