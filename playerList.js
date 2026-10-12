function initServerData(serverIp,serverPort){
	fetch('https://api.mcsrvstat.us/3/'+serverIp+':'+serverPort)
	.then(response => response.json())
	.then(data => handleServerStatus(data));

	function handleServerStatus(data){
		if(data.status=='error'){
		console.log(data.error);
		return false;
	}

	const motd = document.getElementById("motd");
	motd.innerHTML = data.motd.html;

	const playerCounter = document.getElementById("player-count");
	playerCounter.innerHTML = data.players.online;

	const logo = document.getElementById("server-icon");
	logo.src = data.icon;

	const hostname = document.getElementById("server-ip");
	hostname.innerHTML = data.hostname;



	function getPlayerNames(arg) {
		
		let info = "";
		for (let i = 0; i < arg.length; i++) {
		    info += `<li id="player-list-details"><a id="player-list-name" href="https://crafty.gg/@${arg[i].name}" target="_blank" rel="noopener noreferrer"><img id="player-list-avatar" src="https://mc-heads.net/avatar/${arg[i].name}" >${arg[i].name}</a><img id="player-list-ping" src="/img/serverping.png"></li>`;
	    }
	return info;
	
	}

	document.querySelector("span#player-list").innerHTML = `
		
		<div id="player-effects">
		${getPlayerNames(data.players.list)}
		<div>
		`;

	// console.log({name: getPlayerNames()});

	} 
}

initServerData("mc.lylazane.com","25565");