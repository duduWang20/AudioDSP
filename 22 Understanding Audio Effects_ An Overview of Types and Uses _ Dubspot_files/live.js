//Copyright 2003-2019 KickFire, All Rights Reserved.

function VSCapture(pagename) {

if (pagename) { MyPageName = pagename; }

var vs="DID="+DID;
	vs+="&MyPage="+MyPageName;
	vs+="&MyID="+MyID;
	vs+="&MySearch="+MySearch;
	vs+="&TitleTag="+escape(document.title); 
	vs+="&Hst="+document.domain;
    vs+="&width="+screen.width;
	vs+="&height="+screen.height;
	vs+="&ColDep="+screen.colorDepth;
	vs+="&Lang="+navigator.language;
	vs+="&Cook="+navigator.cookieEnabled;
	vs+="&Page="+encodeURIComponent(window.location.pathname.substring(window.location.pathname.lastIndexOf('\\') + 1));

	var vsr;
	try {
		vsr="Reff="+escape(parent==self?document.referrer:parent.document.referrer);
	}
	catch(e) {
		vsr="Reff="+escape(document.referrer);
	}
	
	vsr = vsr.replace(/&/g, "AND");

	var	vsd="FullPage="+encodeURIComponent(document.URL);
	vsd = vsd.replace(/#/g, "%23");
	

	if (DID != 217035 && DID != 212971) { vsd = vsd.replace(/&/g, "AND"); }
	
	var purl = "PMCD="+encodeURIComponent(document.URL);
	
	
	
	var rand = Math.random();
	sniffer = new Image();
	sniffer.src = 'http:\/\/sniff.visistat.com\/index.php?'+vs+'&'+vsr+'&'+vsd+'&'+purl+'&r='+rand;
	
}

function VSLT(LinkName) {
	var random = Math.random();
	sniff = new Image(); 
	sniff.src = 'http:\/\/sniff.visistat.com\/index.php?DID='+DID+'&LinkName='+LinkName+'&r='+random;
}





var pagename;
var MyPageName;
var MyID;
var MySearch;
VSCapture();
