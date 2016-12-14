$(document).ready(()=>{
    $('#searchBtn').on('click', ()=>{
        findInPage($('#searchBarFaq').val());
    });
    $('#searchBarFaq').keyup((event)=>{
        if(event.keyCode == 13){
            $('#searchBtn').click();
        }
    });
});

var keywords=[
    {
	id:"#prijs",
	keywords:['kost', 'prijs', 'betalen', 'geld']
    },
    {
	id:"#toegankelijkheid",
	keywords:['handicap', 'rolstoel', 'gips', 'beperking']
    },
    {
	id:"#aanwezigheid",
	keywords:['verplicht', 'naar huis', 'duur', 'lengte', 'logeren', 'kamperen', 'slapen']
    },
    {
	id:"#dieet",
	keywords:['halal', 'gluten', 'veganist', 'vegetariër', 'vegetarisch', 'vegetarier']
    },
    {
	id:"#deadline",
	keywords:['inschrijving', 'deadline', 'annuleren', 'annulatie', 'terugbetaling']
    },
    {
	id:"#VB",
	keywords:['vb', 'volwassen begeleiding']
    },
    {
	id:"#keti",
	keywords:['keti', 'kerels', 'tippers', 'kerel', 'tipper', 'leeftijd']
    },
    {
	id:"#herexamen",
	keywords:['herexamens', "herexamen"]
    },
    {
	id:"#auto",
	keywords:['auto', 'vervoer', 'bereikbaarheid']
    }
];
function findInPage(seachText){
	//do search
    if(!seachText){
        Materialize.toast("Gelieve een zoekterm in te geven.", 5000, 'redToast');
        return;
    }
    console.log("Searching for: " + seachText);
    seachText = seachText.trim().toLowerCase();
	let result;
	for(let i = 0; i < keywords.length; i++){
        if(keywords[i].keywords.indexOf(seachText) != -1){
            result = keywords[i].id;
            break;
        }
    }
	//no result? try fallback
	if(!result) fallback(seachText);
	else{
		$('html, body').animate({
			scrollTop: $(result).offset().top
		}, 1000); //scroll to correct div
	}
}

function fallback(searchText){
    console.log("No results, running fallback...");
    let searchBar = $("#searchBarFaq");
    searchBar.val(""); //make the value empty, otherwise it will be included in search
	if(isChrome || isBlink){
        console.log("Using chrome fallback");
		if(!window.find(searchText, 0, 1)) showError();
	}
	else if(isFirefox){
        console.log("Using firefox fallback");
		if(!find(searchText, 0, 1)) showError();
	}
	else{//the rest doesn't support this, so too bad.
		showError();
	}
    searchBar.val(searchText);
}

function showError(){
	//show an error about using ctrl-F/find in page
	let OS= getMobileOperatingSystem();
	let message;
	switch(OS){
        case "unknown":
            message="Geen resultaat gevonden, probeer een andere zoekterm of gebruik de zoekfunctie van je browser (CTRL+F)";
			//ctrl + f
			break;
		case "iOS":
            message="Geen resultaat gevonden, probeer een andere zoekterm of gebruik " +
                "de zoekfunctie van je browser door je zoekterm in te geven in de adresbalk";
			//use address bar
			break;
		case "Android":
            message='Geen resultaat gevonden, probeer een andere zoekterm of gebruik ' +
                'de zoekfunctie van je browser door op de 3 puntjes te drukken en te tappen op "find in page"';
			//tap 3 dots => Find in page
			break;
		case "WP":
            message='Geen resultaat gevonden, probeer een andere zoekterm of gebruik de zoekfunctie van je browser.';
			//found the unicorn!
			//but srs try again
			break;
	}
	Materialize.toast(message, 5000, 'redToast');
}

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "WP";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

//I got this from SO:
//http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser

// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;