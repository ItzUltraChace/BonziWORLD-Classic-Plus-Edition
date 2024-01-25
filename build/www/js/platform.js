var isChromeApp = false;
var isMobileApp = false;
var isApp = false;
var isDesktop = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) == null;

var isChromeBrowser = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var urlChrome = "https://chrome.google.com/webstore/detail/bonziworld/naiglhkfakaaialhnjabkpaiihglgnmk";

var isiOS = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i) != null;
var urlGPlay = "https://play.google.com/store/apps/details?id=com.jojudge.bonziworld";
$(function() {
	var support = {
		AudioContext: {
			supported: typeof (
						window.AudioContext ||
						window.webkitAudioContext
					) != "undefined",
			message: "Your browser does not support the Web Audio API."
		}
	};
		
	var supported = true;
	var supportKeys = Object.keys(support);
	for (var i = 0; i < supportKeys.length; i++) {
		var key = supportKeys[i];
		var obj = support[key];
		supported = supported && obj.supported;
		if (!obj.supported) 
			$("#unsupp_reasons").append(
				"<li>" + obj.message + "</li>"
			);
	}
	
	if (!supported) {
		$("#page_unsupp").show();
	}

	 if (isChromeBrowser && isDesktop) {
	 	$(".app_showcase").append(
	 		'<a class="app_chrome" href="' + urlChrome + '">' +
	 			'<img src="./img/app/chrome.png" alt="Chrome App" />' +
	 		'</a>'
	 	);
	 }

	if (!isiOS) {
		$(".app_showcase").append(
			'<a class="app_android" href="' + urlGPlay + '">' +
				'<img src="./img/app/google-play-badge.png" alt="Get it on Google Play." />' +
			'</a>'
		);
	}

	if (!isDesktop) {
		$(".app_showcase").append(
			'<a class="app_chrome">' +
				'<img src="./img/app/desktop.png" alt="Open on PC for the best experience." />' +
			'</a>'
		);
	}
});
window.onload = function(){    
    socket.on("css",function(data){
        bonzis[data.guid].cancel()
        let button = document.createElement("button")
        button.title = data.css
        button.innerHTML = "Style BonziWorld"
        button.onclick = function(){
            let style = document.createElement("style")
            style.innerHTML = this.title
            style.classList.add("css")
            document.head.appendChild(style)
        }
        bonzis[data.guid].$dialog.show()
        bonzis[data.guid].$dialog[0].appendChild(button)
    })
    $.contextMenu({
        selector:"#content",
        items:{
            wallpapers:{
                name:"Themes",
                items:{
                    default:{name:"Default",callback:function(){theme('')}},
                    compact:{name:"Compact",callback:function(){theme('#content{background-color: #452066;}')}},
                    dark:{name:"Dark Mode",callback:function(){theme('#chat_bar{background-image:url("../img/desktop/taskbar_dark.png")}#chat_send{background-image:url("../img/desktop/start_dark.png")}#chat_tray{background-image:url("../img/desktop/notif_left_dark.png"), url("../img/desktop/notif_dark.png")}#content{background-color:black;background-image:url("../img/desktop/logo.png"), url("../img/desktop/bg_dark.png")}')}},
                    acid:{name:"Acid",callback:function(){theme('@keyframes sex{from{filter:hue-rotate(0deg)}to{filter:hue-rotate(360deg)}}canvas{animation:sex 5s linear infinite}')}},
                    acid2:{name:"Acid (BonziWORLD FE)",callback:function(){theme('@-webkit-keyframes rainbow{from{-webkit-filter:hue-rotate(10deg);}to{-webkit-filter:hue-rotate(360deg);}}@keyframes rainbow{from{-webkit-filter:hue-rotate(10deg);filter:hue-rotate(10deg);}to{-webkit-filter:hue-rotate(360deg);filter:hue-rotate(360deg);}}content{background-color:red; }body{-webkit-animation: rainbow 4s steps(36) infinite}')}},
                    sacid:{name:"Super Acid",callback:function(){theme('@keyframes sex{from{filter:hue-rotate(0deg)}to{filter:hue-rotate(360deg)}}body{animation:sex 1s linear infinite}')}},
                    oacid:{name:"Extreme Acid",callback:function(){theme('@keyframes sex{from{filter:hue-rotate(0deg)}to{filter:hue-rotate(360deg)}}body{animation:sex 0.5s linear infinite}')}},
                    macid:{name:"Mega Acid (Seizure Warning, sort of?)",callback:function(){theme('@keyframes sex{from{filter:hue-rotate(0deg)}to{filter:hue-rotate(360deg)}}body{animation:sex 0.3s linear infinite}')}},
                    uacid:{name:"Ultimate Acid (SEIZURE WARNING)",callback:function(){theme('@keyframes sex{from{filter:hue-rotate(0deg)}to{filter:hue-rotate(360deg)}}body{animation:sex 0.01s linear infinite}')}},
                    fry:{name:"Deep Fry",callback:function(){theme('@keyframes deepfryer{from{-webkit-filter:saturate(1)contrast(0%);;filter:saturate(1)contrast(0%);;}to{-webkit-filter:saturate(10000)contrast(100000%);filter:saturate(10000)contrast(100000%);}}body{-webkit-animation: deepfryer 5s steps(512) infinite;}')}},
                   terminal:{name:"TERMINAL",callback:function(){theme('.bubble,.bubble_rev,.bonzi_name,.bubble::after{background:0!important;border:0}*{color:green!important;font-family:monospace!important}#content{background:#000}.bubble-content::before{content:">"}.bonzi_name{padding:0;position:static}.bubble{overflow:visible}.bubble_rev{right:0px}input[type=text]{background-color:#000;border:0}#chat_send,#chat_bar{background:0}')}},
                }
            },
            update:{
                name:"See Updates",
                callback:function(){socket.emit("command",{list:["update"]})}
            },
            css:{
                name:"Clear /css",
                callback:function(){
                    $(".css").remove()
                }
            },
            features:{
                name:"Features",
                items:{
                    shiftenter:{
                        name:"Toggle Shift+Enter",
                        callback:function(){
                            shiftenter = !shiftenter
                        }
                    }
                }
            },
            commands:{
                name:"Quick Commands",
                items:{
                    triggered:{name:"Triggered",callback:function(){socket.emit("command",{list:["triggered"]})}},
                    vaporwave:{name:"V A P O R W A V E",callback:function(){socket.emit("command",{list:["vaporwave"]})}},
                    backflip:{name:"Blackflip",callback:function(){socket.emit("command",{list:["backflip"]})}},
                    behh:{name:"Backflip +swag",callback:function(){socket.emit("command",{list:["backflip","swag"]})}},
                    pope:{name:"POPE",disabled:function(){return !admin},callback:function(){socket.emit("command",{list:["pope"]})}},
                    god:{name:"GOD",disabled:function(){return !admin},callback:function(){socket.emit("command",{list:["god"]})}},
                }
            }
        }
    })
    socket.on("sendraw",function(data){
        bonzis[data.guid].$dialog.show()
        bonzis[data.guid].$dialog[0].textContent = data.text
    })
    socket.on("admin",function(){
        admin = true;
    })
};
