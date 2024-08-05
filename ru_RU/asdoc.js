var ECLIPSE_FRAME_NAME = "ContentViewFrame";
var eclipseBuild = false;
var liveDocsBaseUrl = "http://livedocs.adobe.com/flex/3";
var liveDocsBookName = "langref";

var terms_HELPCFG = "PlatformASLR.helpcfg";

//splitter
var splitterActiveFlag = false ;
var splitterObj = false;
var h_splitterActiveFlag = false ;
var h_splitterObj = false;
var MIN_LEFT = 60;
var MIN_RIGHT = 200;
var MIN_TOP = 60;
var MIN_BOTTOM = 60;
var use_robohelp_behavior = false;
var agt=navigator.userAgent.toLowerCase();

/*Bug# 2765953 */
function HideEmptyRows() {
	var rowLinks = document.getElementsByName("rowLink");
	var i;
	var table = document.getElementById("tbl1");
	var len = table.rows.length;

	for(i=len-1;i!=0;i--) {
		if(table.rows[i].getAttribute("name") == "rowLink") {
			if(table.rows[i].getElementsByTagName("td")[0].innerHTML.replace(/^\s+|\s+$/g,"") == "") {
				/*Deleting Description & Link row if Link row is empty*/
				/* Deleting (i+1) before (i) because otherwise index value would change */
				table.deleteRow(i+1);
				table.deleteRow(i);

			}
		}
	}

}

//Start: Bug#1325173
function alternate(id) {
	HideEmptyRows();
	if(document.getElementsByTagName) {
		var table = document.getElementById(id);
		var rows = table.getElementsByTagName("tr");
		var r1 = rows.length-1;

		var scheme = "odd";
		var k = 0*1;
		for(i = 1; i < rows.length; i++) {

			//manipulate rows

			if(scheme=="odd") {
				if((k*1)<(i*1) && i < rows.length - 3) {
					rows[i].className = "even";
					k=1*i;
					if((i+1)<=rows.length && i < rows.length - 3) {
						k=1*(i+1);
						rows[k].className = "even";
						scheme="even";
					}

				}
			} else {
				if((k*1)<(i*1) && i < rows.length - 3) {
					rows[i].className = "odd";
					k=1*i;
					if(i!=1&&(i+1)<=rows.length && i < rows.length - 3) {
						k=1*(i+1);
						rows[k].className = "odd";
						scheme="odd";
					}

				}
			}

		}
	}
}

//End: Bug#1325173

//Start: Bug#1899661
function noFrms() {
	var doc = parent.frames["classFrame"].location.href.substring(window.location.href.lastIndexOf("/")+1);
	if(doc=="search.html") {
		var curLoc=window.top.location.href.split("?");
		var openFile;
		if(curLoc[1]!=null) {
			curLoc = curLoc[1].split("#");
			var search = curLoc[1];
			curLoc = curLoc[0].split("&amp;");
			openFile = window.top.location.href.substring(0,window.top.location.href.lastIndexOf("?")+1);
			openFile = openFile.substring(0,openFile.lastIndexOf("/")+1)+"search.html#"+search;
		} else {
			curLoc[0]="index.html";
			openFile = window.top.location.href.substring(0,window.top.location.href.lastIndexOf("/")+1)+curLoc[0];
		}
		top.location=openFile;
	} else {
		top.location=top.classFrame.location;
	}
}

function searchfunctionsubmit(baseref) {
	var searchStr=document.getElementById('search-livedocs').value;
	window.location=baseRef+"search.html"+"###"+searchStr;
}

function submitStandAloneSearchValue() {
	var searchStr=document.getElementById('search-livedocs').value;
	loadClassFrame("search.html?search=" +searchStr);
	document.getElementById('subTitle').childNodes.item(0).data = "Search Results";
	return false;
}

function submitValue(title,url,label,site,loc) {
	var title=title;
	var searchStr=document.getElementById('search-livedocs').value;
	title = encodeURIComponent(encodeURIComponent(title));
	var ptn = /\./;
	if (ptn.test(title)) {
		title = title.replace(ptn, "%252E");
	}
	if(document.getElementById('checkBoxId').checked) {
		top.location.href="http://"+url+"?q=" + escapeSpecialChars(searchStr)
		+"&loc="+loc
		+"&hl="+loc
		+"&lbl="+label
		+"&go=Search"
		+"&self=1"
		+"&site="+site;
	} else {
		top.location.href="http://"+url+"?q=" + escapeSpecialChars(searchStr)
		+"&loc="+loc
		+"&hl="+loc
		+"&lbl="+label
		+"&go=Search"
		+"&self=1";
	}
	document.getElementById('subTitle').childNodes.item(0).data = "";
	return false;
}

function escapeSpecialChars(str) {
	str = str.replace(/%/g,"%25");
	str = str.replace(/!/g,"%21");
	str = str.replace(/@/g,"%40");
	str = str.replace(/#/g,"%23");
	str = str.replace(/\$/g,"%24");
	str = str.replace(/&/g,"%26");
	str = str.replace(/\(/g,"%28");
	str = str.replace(/\)/g,"%29");
	str = str.replace(/\+/g,"%2B");
	str = str.replace(/\[/g,"%5B");
	str = str.replace(/\]/g,"%5D");
	str = str.replace(/:/g,"%3A");
	str = str.replace(/;/g,"%3B");
	str = str.replace(/'/g,"%27");
	str = str.replace(/\//g,"%2F");
	str = str.replace(/\\/g,"%5C");
	str = str.replace(/,/g,"%2C");
	str = str.replace(/\s+/g,"+");
	return str;
}

function addIonComments(label) {
	var loc = getLangName();
	function getLangName() {
		var lang = "en-us";
		var metaElements = document.all ?
		document.all.tags('meta') :
		document.getElementsByTagName ?
		document.getElementsByTagName ('meta') : new Array();

		var metaLangVals = new Array();
		var i = 0;

		for (var m = 0; m < metaElements.length; m++) {
			if (metaElements[m].name == "lang") {
				lang = metaElements[m].content;
				break;
			}
		}

		var ptn = /(..)-(..)/;

		if (ptn.test(lang)) {
			var countryCode = lang.replace(ptn, "$1");
			var languageCode = lang.replace(ptn, "$2");
			lang = countryCode + "_" + languageCode.toUpperCase();

		}
		return lang;
	}

	var commentsContainer = "ionComHere";

	ionComAddLoadEvent( function() {
		var thisURL = encodeURIComponent(window.location);
		var resource = thisURL.replace(new RegExp(/%23(.*)/),"");
		ionComments.setup(resource, loc, commentsContainer, {
			siteArea: 'help',
			productLabel: +label
		});
	})
}

function gotoHome(linkURL) {
	var windowURL= window.location.href;

	var value = windowURL.replace(/title-bar\.html.*/,linkURL );

	if (value != null) {
		parent.top.location = value;
	}
}

function findObject(objId) {

	if (document.getElementById)
		return document.getElementById(objId);

	if (document.all)
		return document.all[objId];
}

function isEclipse() {
	return eclipseBuild
}

function configPage() {

	var d=document.location.href.toString();
	parameter_index = d.lastIndexOf('?');
	var args = '';
	if (parameter_index != -1) {
		args=d.substring(parameter_index+1,d.length);
	}
	//Start: Bug#1882766
	if (args.indexOf('#') != -1) {
		args = args.replace(new RegExp(/#/),"%23");
	} else if (args.indexOf('%23') != -1) {
		args = args.replace(new RegExp(/%23/),"#");
	}

	setRowColorsInitial(true, "Property");
	setRowColorsInitial(true, "Method");
	setRowColorsInitial(true, "ProtectedMethod");
	setRowColorsInitial(true, "Event");
	setRowColorsInitial(true, "Style");
	setRowColorsInitial(true, "SkinPart");
	setRowColorsInitial(true, "SkinState");
	setRowColorsInitial(true, "Constant");

	if (isEclipse()) {
		if (window.name != "classFrame") {
			var localRef = window.location.href.indexOf('?') != -1 ? window.location.href.substring(0, window.location.href.indexOf('?')) : window.location.href;

			var rootdir = "doc/";
			localRef = localRef.substring(localRef.indexOf(rootdir) + rootdir.length);

			if (window.location.search != "")
				localRef += ("#" + window.location.search.substring(1));

			window.location.replace(baseRef + "frames.html?" + localRef);
			return;
		} else {
			setStyle(".eclipseBody", "display", "block");
			if (window.location.hash != "")
				window.location.hash=window.location.hash.substring(1);
		}
	}

	try {
		getFilterContent(filter_file,args);
	} catch(e) {
	}

	//have to wait till dom loads
	if (agt.indexOf("adobe help viewer 2") != -1 || agt.indexOf("community help client") != -1) {
		use_robohelp_behavior = true;
		document.getElementById("gsa").style.display = "none";
	}

}

function loadFrames(classFrameURL, classListFrameURL) {
	var classListFrame = findObject("classListFrame");
	if(classListFrame != null && classListFrameContent!='')
		classListFrame.document.location.href=classListFrameContent;

	if (isEclipse()) {
		var contentViewFrame = findObject(ECLIPSE_FRAME_NAME);
		if (contentViewFrame != null && classFrameURL != '')
			contentViewFrame.document.location.href=classFrameURL;
	} else {
		var classFrame = findObject("classFrame");
		if(classFrame != null && classFrameContent!='')
			classFrame.document.location.href=classFrameContent;
	}
}

function showTitle(title) {
	if (!isEclipse())
		top.document.title = title;
}

function loadClassFrame(classFrameURL) {
	if (parent.frames["classFrame"] != null) {
		parent.frames["classFrame"].location = classFrameURL;
	} else if (parent.frames["packageFrame"] != null) {
		if (parent.frames["packageFrame"].frames["classFrame"] != null) {
			parent.frames["packageFrame"].frames["classFrame"].location = classFrameURL;
		}
	}
}

function loadClassListFrame(classListFrameURL) {
	if (parent.frames["classListFrame"] != null) {
		parent.frames["classListFrame"].location = classListFrameURL;
	} else if (parent.frames["packageFrame"] != null) {
		if (parent.frames["packageFrame"].frames["classListFrame"] != null) {
			parent.frames["packageFrame"].frames["classListFrame"].location = classListFrameURL;
		}
	}
}

function loadPage(relativeURLFromBase) {
	document.location.href = baseRef+relativeURLFromBase;
}

function gotoLiveDocs(primaryURL, secondaryURL, locale) {
	if (locale == "en-us" || locale == "en_us" || locale == "en_US") {
		locale = "";
	} else {
		locale = "_" + locale.substring(3);
	}
	var url = liveDocsBaseUrl + locale + "/" + liveDocsBookName + "/frames.html?" + primaryURL;
	if (secondaryURL != null && secondaryURL != "")
		url += ("&" + secondaryURL);

	window.open(url, "mm_livedocs", "menubar=1,toolbar=1,status=1,scrollbars=1,resizable=yes");
}

function findTitleTableObject(id) {
	if (isEclipse())
		return parent.titlebar.document.getElementById(id);
	else if (top.titlebar)
		return top.titlebar.document.getElementById(id);
	else
		return document.getElementById(id);
}

function titleBar_setSubTitle(title) {
	if (isEclipse() || top.titlebar)
		findTitleTableObject("subTitle").childNodes.item(0).data = title;
}

function titleBar_setSubNav(showConstants,showProperties,showStyles,showSkinPart,showSkinState,showEffects,showEvents,showConstructor,showMethods,showExamples,
showPackageConstants,showPackageProperties,showPackageFunctions,showInterfaces,showClasses,showpackageMethodFunctions) {
	findTitleTableObject("propertiesLink").style.display = showProperties ? "inline" : "none";
	findTitleTableObject("propertiesBar").style.display = (showProperties && (showPackageProperties || showConstructor || showMethods || showPackageFunctions || showEvents || showStyles || showEffects || showConstants || showPackageConstants || showInterfaces || showClasses || showpackageMethodFunctions || showExamples)) ? "inline" : "none";
	findTitleTableObject("packagePropertiesLink").style.display = showPackageProperties ? "inline" : "none";
	findTitleTableObject("packagePropertiesBar").style.display = (showPackageProperties && (showConstructor || showMethods || showPackageFunctions || showEvents || showStyles || showConstants || showEffects || showPackageConstants || showInterfaces || showClasses || showpackageMethodFunctions || showExamples)) ? "inline" : "none";
	findTitleTableObject("constructorLink").style.display = showConstructor ? "inline" : "none";
	findTitleTableObject("constructorBar").style.display = (showConstructor && (showMethods || showPackageFunctions || showEvents || showStyles || showEffects || showConstants || showPackageConstants || showInterfaces || showClasses || showpackageMethodFunctions || showExamples)) ? "inline" : "none";
	findTitleTableObject("methodsLink").style.display = showMethods ? "inline" : "none";
	findTitleTableObject("methodsBar").style.display = (showMethods && (showPackageFunctions || showEvents || showStyles || showEffects || showConstants || showPackageConstants || showInterfaces || showClasses || showpackageMethodFunctions || showExamples)) ? "inline" : "none";
	findTitleTableObject("packageFunctionsLink").style.display = showPackageFunctions ? "inline" : "none";
	findTitleTableObject("packageFunctionsBar").style.display = (showPackageFunctions && (showEvents || showStyles || showEffects || showConstants || showPackageConstants || showInterfaces || showClasses || showpackageMethodFunctions || showExamples)) ? "inline" : "none";
	findTitleTableObject("eventsLink").style.display = showEvents ? "inline" : "none";
	findTitleTableObject("eventsBar").style.display = (showEvents && (showStyles || showEffects || showConstants || showPackageConstants || showInterfaces || showClasses || showpackageMethodFunctions || showExamples)) ? "inline" : "none";
	findTitleTableObject("stylesLink").style.display = showStyles ? "inline" : "none";
	findTitleTableObject("stylesBar").style.display = (showStyles && (showEffects || showConstants || showPackageConstants || showInterfaces || showClasses || showpackageMethodFunctions || showExamples)) ? "inline" : "none";
	findTitleTableObject("SkinPartLink").style.display = showSkinPart ? "inline" : "none";
	findTitleTableObject("SkinPartBar").style.display = (showSkinPart && (showSkinState || showEffects || showConstants || showPackageConstants || showInterfaces || showClasses || showpackageMethodFunctions || showExamples)) ? "inline" : "none";
	findTitleTableObject("SkinStateLink").style.display = showSkinState ? "inline" : "none";
	findTitleTableObject("SkinStateBar").style.display = (showSkinState && (showEffects || showConstants || showPackageConstants || showInterfaces || showClasses || showpackageMethodFunctions || showExamples)) ? "inline" : "none";
	findTitleTableObject("effectsLink").style.display = showEffects ? "inline" : "none";
	findTitleTableObject("effectsBar").style.display = (showEffects && (showConstants || showPackageConstants || showInterfaces || showClasses || showpackageMethodFunctions || showExamples)) ? "inline" : "none";
	findTitleTableObject("constantsLink").style.display = showConstants ? "inline" : "none";
	findTitleTableObject("constantsBar").style.display = (showConstants && (showPackageConstants || showInterfaces || showClasses || showpackageMethodFunctions || showExamples)) ? "inline" : "none";
	findTitleTableObject("packageConstantsLink").style.display = showPackageConstants ? "inline" : "none";
	findTitleTableObject("packageConstantsBar").style.display = (showPackageConstants && (showInterfaces || showClasses || showpackageMethodFunctions || showExamples)) ? "inline" : "none";
	findTitleTableObject("packageMethodFunctionsLink").style.display = showpackageMethodFunctions ? "inline" : "none";
	findTitleTableObject("packageMethodFunctionsBar").style.display = (showpackageMethodFunctions && (showClasses || showInterfaces || showExamples)) ? "inline" : "none";
	findTitleTableObject("interfacesLink").style.display = showInterfaces ? "inline" : "none";
	findTitleTableObject("interfacesBar").style.display = (showInterfaces && (showClasses || showExamples)) ? "inline" : "none";
	findTitleTableObject("classesLink").style.display = showClasses ? "inline" : "none";
	findTitleTableObject("classesBar").style.display = (showClasses && showExamples) ? "inline" : "none";
	findTitleTableObject("examplesLink").style.display = showExamples ? "inline" : "none";
}

function titleBar_gotoClassFrameAnchor(anchor) {
	if (isEclipse())
		parent.classFrame.location = parent.classFrame.location.toString().split('#')[0] + "#" + anchor;
	else
		location = location.toString().split('#')[0] + "#" + anchor;
}

function setMXMLOnly() {
	if (getCookie("showMXML") == "false") {
		toggleMXMLOnly();
	}
}

function toggleMXMLOnly() {
	var mxmlDiv = findObject("mxmlSyntax");
	var mxmlShowLink = findObject("showMxmlLink");
	var mxmlHideLink = findObject("hideMxmlLink");
	if (mxmlDiv && mxmlShowLink && mxmlHideLink) {
		if (mxmlDiv.style.display == "none") {
			mxmlDiv.style.display = "block";
			mxmlShowLink.style.display = "none";
			mxmlHideLink.style.display = "inline";
			setCookie("showMXML","true", new Date(3000,1,1,1,1), "/", document.location.domain);
		} else {
			mxmlDiv.style.display = "none";
			mxmlShowLink.style.display = "inline";
			mxmlHideLink.style.display = "none";
			setCookie("showMXML","false", new Date(3000,1,1,1,1), "/", document.location.domain);
		}
	}
}

function showHideInherited() {
	setInheritedVisible(getCookie("showInheritedConstant") == "true", "Constant");
	setInheritedVisible(getCookie("showInheritedProtectedConstant") == "true", "ProtectedConstant");
	setInheritedVisible(getCookie("showInheritedProperty") == "true", "Property");
	setInheritedVisible(getCookie("showInheritedProtectedProperty") == "true", "ProtectedProperty");
	setInheritedVisible(getCookie("showInheritedMethod") == "true", "Method");
	setInheritedVisible(getCookie("showInheritedProtectedMethod") == "true", "ProtectedMethod");
	setInheritedVisible(getCookie("showInheritedEvent") == "true", "Event");
	setInheritedVisible(getCookie("showInheritedcommonStyle") == "true", "commonStyle");
	setInheritedVisible(getCookie("showInheritedsparkStyle") == "true", "sparkStyle");
	setInheritedVisible(getCookie("showInheritedhaloStyle") == "true", "haloStyle");
	setInheritedVisible(getCookie("showInheritedmobileStyle") == "true", "mobileStyle");
	setInheritedVisible(getCookie("showInheritedSkinPart") == "true", "SkinPart");
	setInheritedVisible(getCookie("showInheritedSkinState") == "true", "SkinState");
	setInheritedVisible(getCookie("showInheritedEffect") == "true", "Effect");
}

function setInheritedVisible(show, selectorText) {
	try {
		if (document.styleSheets[0].cssRules != undefined) {
			var rules = document.styleSheets[0].cssRules;
			for (var i = 0; i < rules.length; i++) {

				if (rules[i].selectorText == ".hideInherited" + selectorText)
					rules[i].style.display = show ? "" : "none";

				if (rules[i].selectorText == ".showInherited" + selectorText)
					rules[i].style.display = show ? "none" : "";
			}
		} else {
			document.styleSheets[0].addRule(".hideInherited" + selectorText, show ? "display:inline" : "display:none");
			document.styleSheets[0].addRule(".showInherited" + selectorText, show ? "display:none" : "display:inline");
		}
	} catch(e) {
		document.styleSheets[0].addRule(".hideInherited" + selectorText, show ? "display:inline" : "display:none");
		document.styleSheets[0].addRule(".showInherited" + selectorText, show ? "display:none" : "display:inline");
	}
	setCookie("showInherited" + selectorText, show ? "true" : "false", new Date(3000,1,1,1,1), "/", document.location.domain);
	setRowColors(show, selectorText);
}

function setRowColors(show, selectorText) {
	var rowColor = "#F2F2F2";
	var table = findObject("summaryTable" + selectorText);

	if (table != null) {
		var rowNum = 0;
		for (var i = 1; i < table.rows.length; i++) {
			if (table.rows[i].className.indexOf("hideInherited") == -1 || show) {
				if(table.rows[i].style.display.indexOf('none') == -1) {
					rowNum++;
					table.rows[i].bgColor = (rowNum % 2 == 0) ? rowColor : "#FFFFFF";
				}
			}
		}
	}
}

function setRowColorsInitial(show, selectorText) {
	var rowColor = "#F2F2F2";
	var table = findObject("summaryTable" + selectorText);

	if (table != null) {
		var rowNum = 0;

		for (var i = 1; i < table.rows.length; i++) {
			if (table.rows[i].className.indexOf("hideInherited") == -1 && !show) {
				rowNum++;
				table.rows[i].bgColor = (rowNum % 2 == 0) ? rowColor : "#FFFFFF";
			}
		}
	}
}

function setStyle(selectorText, styleName, newValue) {
	try {
		if (document.styleSheets[0].cssRules != undefined) {
			var rules = document.styleSheets[0].cssRules;

			for (var i = 0; i < rules.length; i++) {
				if (rules[i].selectorText == selectorText) {
					rules[i].style[styleName] = newValue;
					break;
				}
			}
		} else {
			document.styleSheets[0].addRule(selectorText, styleName + ":" + newValue);
		}
	} catch(e) {
		document.styleSheets[0].addRule(selectorText, styleName + ":" + newValue);
	}
}

function setView(view) {
	var expire = new Date();
	expire.setDate(expire.getDate()+90); // Cookie expires after 90 days
	var pathDomainString="path=/;";
	if(navigator.userAgent.indexOf("Firefox")!=-1) {
		// code for possible use with FF when it gets working
		var theHost=document.location.hostname;
		pathDomainString = "path=/;domain="+theHost+";";
	}

	document.cookie = "asdocs_view=" + view + ";"+ pathDomainString+"expires=" + expire.toGMTString();
}

var packagesLoaded = false, classesLoaded = false;
function loadPackagesList(page_request) {
	document.getElementById("packagelist").innerHTML=page_request.responseText;
	if(buildType != "jslr") {
		document.getElementById("pkg_searchbox").defaultValue = qsearchBoxLabel;
		var IECheck = navigator.userAgent.search("MSIE");
		var IEVersion = getInternetExplorerVersion();
		if(IECheck>0 && IEVersion < 9) {
			document.getElementById("pkg_searchspan").style.display = "none";
		} else {
			document.getElementById("pkg_searchspan").style.display = "";
		}
		changeQSearchboxWidth();
	}
	packagesLoaded = true;
	if(isTablet()){
		new iScroll("packagelist");
	}
	try {
		if(classesLoaded)
			doFilterStateChange1();
	} catch(e) {
	}
	setTimeout("restorePackageListScrollTop()", 1000);
}

function loadClassesList(page_request) {
	if(buildType == "jslr") {
		document.getElementById("classlist").innerHTML=page_request.responseText;
	} else {
		document.getElementById("classlistoutline").innerHTML=page_request.responseText;
		document.getElementById("cls_searchbox").defaultValue = qsearchBoxLabel;
		var IECheck = navigator.userAgent.search("MSIE");
		var IEVersion = getInternetExplorerVersion();
		if(IECheck>0 && IEVersion < 9) {
			document.getElementById("cls_searchspan").style.display = "none";
		} else {
			document.getElementById("cls_searchspan").style.display = "";
		}
		if(getCookie("showAllClasses")=="yes") {
			allClassesLoaded = true;
			var clbox = document.getElementById("cls_searchbox");
			if(clbox && clbox.style.display != "none" && clbox.value != clbox.defaultValue && clbox.value != "") {
				setTimeout("clsSearchOnKeyUp1()",500);
			}
		}
		changeQSearchboxWidth();
	}
	classesLoaded = true;
	if(isTablet()){
		new iScroll("classlist");
		contentScroller = new iScroll("content");
	}
	try {
		if(packagesLoaded)
			doFilterStateChange1();
	} catch(e) {
	}
	setTimeout("restoreClassListScrollTop()", 1000);
}

function loadClassesList2(page_request) {
	document.getElementById("classlistWrapper").innerHTML=page_request.responseText;

	classesLoaded = true;
	if(isTablet()){
		new iScroll("classlist");
		contentScroller = new iScroll("content");
	}
	try {
		if(packagesLoaded)
			doFilterStateChange1();
	} catch(e) {
	}
	setTimeout("restoreClassListScrollTop()", 1000);
}

function isTablet(){
	var uAgent = window.navigator.userAgent;
	if(/ipad/i.test(uAgent) || /android/i.test(uAgent) || /iphone/i.test(uAgent) || /PlayBook/i.test(uAgent) ){
		return true;
	}else{
		return false;
	}
}

function init() {
	//if we want it showing, then we need to cause it to open
	document.getElementById("maincontainer").style.display = "";
	//the follow init process need to put into a timeout
	//otherwise the list can not be correctly displayed in IE7
	setTimeout("init1()", 0);
}

function init1() {
	if(eclipseBuild){
		return;
	}
	restoreSplitterPos();
	restoreHSplitterPos();
	
	if (agt.indexOf("adobe help viewer 2") != -1 || agt.indexOf("community help client") != -1){
		if (getCookie("asdocs_view") == "showtoc" )
			showHideTOC(true);
		else
			showHideTOC(false);
	}else{
		if (getCookie("asdocs_view") == "hidetoc")
			showHideTOC(false);
		else
			showHideTOC(true);
	}
	

	if(getCookie("showAllClasses")=="") {
		setCookie("showAllClasses", "no", new Date(3000,1,1,1,1), "/", document.location.domain);
	}

	if(buildType.indexOf('jslr')== -1)
		ajaxGet(baseRef + "package-list.html", loadPackagesList);

	if(buildType.indexOf('jslr')!=-1) {
		ajaxGet(baseRef+"all-classes.html", loadClassesList);
	} else if (location.href.indexOf("?allClasses=1") > 0) {
		if(getCookie("showAllClasses")=="yes") {
			ajaxGet(baseRef+"all-classes.html", loadClassesList);
		} else {
			ajaxGet(baseRef+"all-classes-A.html", loadClassesList);
		}
	} else if ((location.href.indexOf("mxml-tag-detail.html") > 0)
	|| (baseRef == "../" && (location.href.indexOf("/mxml/") > 0))) {
		ajaxGet(baseRef+"mxml-tags.html", loadClassesList2);
	} else if( (baseRef=='') && (location.href.indexOf("package-detail.html") > 0 || location.href.indexOf("package.html") > 0) ) {
		ajaxGet(baseRef + "class-list.html", loadClassesList2);
	} else if (baseRef=='' || baseRef=='./') {

		if(getCookie("showAllClasses")=="yes") {
			ajaxGet(baseRef+"all-classes.html", loadClassesList);
		} else {
			ajaxGet(baseRef+"all-classes-A.html", loadClassesList);
		}

	} else if(location.href.indexOf("package-detail")>0) {
		ajaxGet("class-list.html",loadClassesList2);
	} else if(getCookie("showAllClassesList")=="yes") {
		if(getCookie("showAllClasses")=="yes") {
			ajaxGet(baseRef+"all-classes.html",loadClassesList);
		} else {
			ajaxGet(baseRef+"all-classes-A.html",loadClassesList);
		}
	} else {
		ajaxGet("class-list.html", loadClassesList2);
	}
	configPage();

	scrollToNameAnchor();

	/*Added by Madhur. Page was not scrolling to the anchor*/
	if(window.location.href.indexOf("#") != -1) {

		document.location = window.location.href;
	}
	
	try {
		loadIonComments();
	} catch(e) {
	}
}

//**** Start Ajax implementation *****//
var islogEnabled=false;
var ajaxAllClassesList=false;
var logString="";
var prevURL="";
var curURL="";
var AsDocs = {};
var navigationClickAction = false;

AsDocs.log = function(st) {
	if(islogEnabled) {
		logString += st+"\n";
		try {
			console.log(st);
		} catch(e) {
		}
	}
}

function usingPushState(){
	if ('pushState' in window.history){
		//location.href bug in safari below 5.0.2 so use hash tags
		if($.browser.safari){
			var versionStr = $.browser.version.split(".");
			if( typeof(versionStr[0]) != "undefined" && versionStr[0] > 533 ){
				return true;
			}else if( typeof(versionStr[0]) != "undefined" && versionStr[0] == 533 ){
				if( typeof(versionStr[1]) != "undefined" && versionStr[1] > 18 ){
					return true;
				}else{
					return false;
				}
			}else{
				return false;
			}
		}else{
			return true;			
		}
	}else{
		return false;
	}
} 

function init2() {
	AsDocs.log("init2");
	if(eclipseBuild){
		return;
	}
	document.getElementById("maincontainer").style.display = "";
	if($.browser.msie || agt.indexOf("adobe help viewer 2") != -1 || agt.indexOf("community help client") != -1 
		|| location.protocol.match(/file:/) ) { //dont use ajax navigation for IE, CHC
		if(unescape(location.href).indexOf("#!")>0) {
				location.href = getBaseRef()+unescape(location.href).split("#!")[1];
		}else{
			setTimeout("init1()",0);
		}
	} else {
		init3();

		if (usingPushState()) {
			$(window).bind('popstate', popHistory);
		} else {
			$(window).hashchange(URLHashChange);

		}

		$(document).click( function(event) {
			clickHandler(event);
		});
		
		//handling right click
		$(document).bind("contextmenu",function(event) {
			rightClickHandler(event);
		});
		
		//call to hashchange on load
		if (usingPushState()) {
			if(unescape(location.href).indexOf("#!")>0) {
				window.history.pushState('', '', getBaseRef()+unescape(location.href).split("#!")[1]);
				loadAjaxPage(location.href);
			}
		} else {
			$(window).hashchange();
		}

		//clean localStorage on load if it exists
		if(hasLocalStorage() && (typeof localStorage!="undefined")) {
			localStorage.clear();
		}
		
		//handling filter setting and scroll setting with ?
		if(unescape(location.href).match(/\?/) ){
			var baseFragment = unescape(location.href).split("?")[0]
			var fragment = unescape(location.href).split("?")[1];
			if(fragment.match(/nameAnchor/i) ){
				var scrollTarget = fragment.split("nameAnchor=")[1];
				location.href = baseFragment + "#" + scrollTarget;
			}else{
				loadFilters(fragment);
				if(fragment.match(/\#/) ){
					var scrollTarget = fragment.split("#")[1];
					location.href = baseFragment + "#" + scrollTarget;
				}
				else{
					location.href = baseFragment;
				}
			}
		}
	}
    copyexample();
}

function init3() {
	AsDocs.log("init3");
	restoreSplitterPos();
	restoreHSplitterPos();
	
	if (agt.indexOf("adobe help viewer 2") != -1 || agt.indexOf("community help client") != -1){
		if (getCookie("asdocs_view") == "showtoc" )
			showHideTOC(true);
		else
			showHideTOC(false);
	}else{
		if (getCookie("asdocs_view") == "hidetoc")
			showHideTOC(false);
		else
			showHideTOC(true);
	}

	if(getCookie("showAllClasses")=="") {
		setCookie("showAllClasses", "no", new Date(3000,1,1,1,1), "/", document.location.domain);
	}

	ajaxGet(baseRef + "package-list.html", loadPackagesList);
	try {
		getFilterContent(filter_file,'');
	} catch(e) {
	}

	if (location.href.indexOf("?allClasses=1") > 0) {
		ajaxAllClassesList=true;
		if(getCookie("showAllClasses")=="yes") {
			ajaxGet(baseRef+"all-classes.html", loadClassesList);
		} else {
			ajaxGet(baseRef+"all-classes-A.html", loadClassesList);
		}
	} else if ((location.href.indexOf("mxml-tag-detail.html") > 0)
	|| (baseRef == "../" && (location.href.indexOf("/mxml/") > 0))) {
		ajaxAllClassesList = false;
		ajaxGet(baseRef+"mxml-tags.html", loadClassesList2);
	} else if( (baseRef=='') && (location.href.indexOf("package-detail.html") > 0 || location.href.indexOf("package.html") > 0) ) {
		ajaxAllClassesList = false;
		ajaxGet(baseRef + "class-list.html", loadClassesList2);
	} else if (baseRef=='' || baseRef=='./') {
		ajaxAllClassesList = true;
		if(getCookie("showAllClasses")=="yes") {
			ajaxGet(baseRef+"all-classes.html", loadClassesList);
		} else {
			ajaxGet(baseRef+"all-classes-A.html", loadClassesList);
		}

	} else if(location.href.indexOf("package-detail")>0) {
		ajaxAllClassesList = false;
		ajaxGet("class-list.html",loadClassesList2);
	} else if(getCookie("showAllClassesList")=="yes") {
		ajaxAllClassesList = true;
		if(getCookie("showAllClasses")=="yes") {
			ajaxGet(baseRef+"all-classes.html",loadClassesList);
		} else {
			ajaxGet(baseRef+"all-classes-A.html",loadClassesList);
		}
	} else {
		ajaxAllClassesList = false;
		ajaxGet("class-list.html", loadClassesList2);
	}
	try {
		if(!usingPushState() && location.href.match(/#!/) ){
			//dont call coz the loadrightcontent fn will trigger anyway
		}else{
			loadIonComments();
		}
	} catch(e) {
	}
}

function copyexample(){

/*	TODO: fix the copy functionality by using just zeroclipboard library.
	$('a#copy-description').zclip({

		path:getBaseRef()+'ZeroClipboard.swf',

		copy:$('p#description').text()

	});

	$("a.copyText").zclip({

		path:getBaseRef()+'ZeroClipboard.swf',

		copy:function(){

			return $(this).closest(".listing").find("pre").text();

		}

	});
*/	
	$("div.clipcopy").css({visibility: "hidden"});
}

//returns the reference to top level folder
function getBaseRef() {
	var fileLocation = unescape(location.href);
	var pathLookupString = "actionscript/3/";
	var baseIndex = fileLocation.indexOf(pathLookupString);
	if(baseIndex == -1) {
		pathLookupString = "langref/";
		baseIndex = fileLocation.indexOf(pathLookupString);
	}
	if(fileLocation.match(/#!/)) {
		fileLocation = fileLocation.substring(baseIndex+pathLookupString.length,fileLocation.indexOf("#!"));
	} else {
		fileLocation = fileLocation.substring(baseIndex+pathLookupString.length);
	}
	var baseRef = '';
	var index;
	while((index = fileLocation.indexOf('/')) != -1) {
		fileLocation = fileLocation.substring(index+1);
		baseRef += '../';
	}
	return baseRef;
}

//returns url string bet start and "#!"
function getURLFullLocation(str) {
	str = unescape(str);
	str = str.split("#!")[0];
	str = str.split("#")[0];
	return str;
}

//returns url string bet start and langref
function getURLBaseLocation(str) {
	str = unescape(str);
	str = getURLFullLocation(str);
	if(str.match(/langref\//) ) {
		str = str.substring(0,str.indexOf("langref/")+8);
	} else if(str.match(/actionscript\/3\//) ) {
		str = str.substring(0,str.indexOf("actionscript/3/")+15);
	}
	return str;
}

//will return the part between "#!" & the end or "#"
function getAjaxFullFragment(str) {
	str = unescape(str);
	var frag = str.split("#!").length>1 ? str.split("#!")[1]: "";
	frag = frag.split("#")[0];
	return frag;
}

//will return the part between "#!" & the last "/"
function getAjaxBaseFragment(str) {
	str = unescape(str);
	var frag = getAjaxFullFragment(str);
	frag = frag.substring(0,frag.lastIndexOf("/")+1);
	return frag;
}

//will return the fragment between "langref" & "#!"
function getLangrefFullFragment(str) {
	str = unescape(str);
	str = str.split("#!")[0];
	str = str.split("#")[0];
	if(str.match(/langref/) ) {
		str = str.substring(str.indexOf("langref/")+8);
	} else if(str.match(/actionscript\/3/) ) {
		str = str.substring(str.indexOf("actionscript/3/")+15);
	}
	return str;
}

//will return fragment between "langref" and the last "/"
function getLangrefBaseFragment(str) {
	str = unescape(str);
	var langFrag = getLangrefFullFragment(str);
	langFrag = langFrag.substring(0,langFrag.lastIndexOf("/")+1);
	return langFrag;
}

//will return href attribute relative to the page fragment
function getHyperlinkFragment(linkObj) {
	var str = linkObj.attr("href");
	if(!isExternalLink(str)) {
		if(str.match(/\.\.\//) ) {
			str = str.replace(/\.\.\//g,"");
		}
		if(str.match(/\.\//) ){
			str = str.replace(/\.\//g,"");
		}
	}
	return str;
}

//for getting scrollTarget
function getScrollTarget(str) {
	str = str.split("#!")[0];
	if(str.match(/#/) ) {
		str = str.substring(str.indexOf("#")+1);
		return str;
	} else {
		return "";
	}
}

function isExternalLink(str) {
	if(typeof str=="undefined") {
		return false;
	} else if(str.match(/http:/) || str.match(/ftp:/) ) { 
		return true;
	} else {
		return false;
	}
}

function rightClickHandler(event){
	AsDocs.log("handling right click");
	if($(event.target)[0].nodeName.toLowerCase()=="a" || $(event.target).parents("a")[0] ) {
		var hreflinkObj = "";
		if($(event.target).parents("a").length >0 ) {
			hreflinkObj = $(event.target).parents("a");
		} else {
			hreflinkObj = $(event.target);
		}
		
		//if external link
		if(isExternalLink(hreflinkObj.attr("href") ) ){
			return true;
		}
		
		//its already set so return true
		if(typeof(hreflinkObj.data("changedFromHref") ) != "undefined" && hreflinkObj.data("changedFromHref") != ""){
			return true;
		}
		
		if(usingPushState() ){ //if using pushState
			if($(event.target).parents(".titleTableTitleION").length) {
				var hrefLink = getHyperlinkFragment(hreflinkObj);
				hreflinkObj.data("changedFromHref",originalHrefLink);
				hreflinkObj.attr("href",getBaseRef() + hrefLink);
			}
		}else{ //if not using pushState
			var urlFullFragment = getURLFullLocation(location.href);
			var ajaxBaseFrag = getAjaxBaseFragment(location.href);
			var ajaxFullFrag = getAjaxFullFragment(location.href);
			var langRefBaseFrag = getLangrefBaseFragment(location.href);
			
			var originalHrefLink = hreflinkObj.attr("href");
			var hrefLink = getHyperlinkFragment(hreflinkObj);
			
			if($(event.target).parents("#toc").length){ //toc links
				//it returns fine
				if($(event.target).parents("#classlist").length>0 && $(event.target).parents("#classlistoutline").length<=0){
					if(ajaxFullFrag.match(/^mxml\//) ){
						hreflinkObj.data("changedFromHref",originalHrefLink);
						hreflinkObj.attr("href",getBaseRef() + hrefLink);
					}else if(ajaxFullFrag == ""){
						hreflinkObj.data("changedFromHref",originalHrefLink);
						hreflinkObj.attr("href",getBaseRef() + langRefBaseFrag + hrefLink);
					}else{
						hreflinkObj.data("changedFromHref",originalHrefLink);
						hreflinkObj.attr("href",getBaseRef()+ajaxBaseFrag+hrefLink);
					}
				}
			}
			
			if($(event.target).parents("#content").length) { //content links
				if(ajaxFullFrag.match(/package-detail/) ){
					hreflinkObj.data("changedFromHref",originalHrefLink);
					hreflinkObj.attr("href",getBaseRef()+ajaxBaseFrag+hrefLink);
				}else if(hrefLink.match(/package-detail/) ){
					if(ajaxBaseFrag == "") { //if the initial url is not the top level one(langref/....html)
						hreflinkObj.data("changedFromHref",originalHrefLink);
						hreflinkObj.attr("href",getBaseRef() + langRefBaseFrag + hrefLink);
					} else {
						hreflinkObj.data("changedFromHref",originalHrefLink);
						hreflinkObj.attr("href",getBaseRef() + ajaxBaseFrag + hrefLink);
					}
				}else if(urlFullFragment.match(/package-detail/) && ajaxFullFrag == ""){
					hreflinkObj.data("changedFromHref",originalHrefLink);
					hreflinkObj.attr("href",getBaseRef() + langRefBaseFrag + hrefLink);
				}else if(hreflinkObj.attr("href").match(/\//) ){
					hreflinkObj.data("changedFromHref",originalHrefLink);
					hreflinkObj.attr("href",getBaseRef()+hrefLink);
				}else{
					if(ajaxBaseFrag == ""){
						hreflinkObj.data("changedFromHref",originalHrefLink);
						hreflinkObj.attr("href",getBaseRef()+langRefBaseFrag+hrefLink);
					}else{
						hreflinkObj.data("changedFromHref",originalHrefLink);
						hreflinkObj.attr("href",getBaseRef()+ajaxBaseFrag+hrefLink);
					}
				}
			}
			
			if($(event.target).parents(".titleTableSubTitle").length) { //pkg link just above toc
				if(ajaxBaseFrag == "") { //if the initial url is not the top level one(langref/....html)
					hreflinkObj.data("changedFromHref",originalHrefLink);
					hreflinkObj.attr("href",getBaseRef() + langRefBaseFrag + hrefLink);
				} else {
					hreflinkObj.data("changedFromHref",originalHrefLink);
					hreflinkObj.attr("href",getBaseRef() + ajaxBaseFrag + hrefLink);
				}
			}
		}
		
	}
	return true;
}

function clickHandler(event) {
	AsDocs.log("click event logged"+arguments.length);
	var et = event;
	//return default behaviour for following
	if(event.which == "3" || event.which == "2" || event.ctrlKey == true ) { //right click and ctrl click
		rightClickHandler(event);
		return true;
	}
	
	if(event.target.nodeName.toLowerCase() == "input") { //search box
		return true;
	} 
	if($(event.target).parents("#filter_panel_float").length) { //filter pane
		return true;
	} 
	if($(event.target).parents("#badgeContainerSupport").length) { //support badge
		return true;
	} 
	if($(event.target).parents("#ionComHere").length) { //comment badge
		return true;
	} 
	
	if($(event.target).parents("#creativecommons").length >0 ) { //for cc external links
		return true;
	}
	if($(event.target).parents("#whyEnglish").length >0 || $(event.target).attr("id") == "whyEnglish" ){ //for why english link
		return true;
	}
	if($(event.target).parents("#whyEnglishContent").length > 0 || $(event.target).attr("id") == "whyEnglishContent") { //for why english content
		return true;
	}
	if($(event.target).parents("a").length>0) { //for external links
		if(isExternalLink($(event.target).parents("a").attr("href")) ) {
			return true;
		}
	} else {
		if(isExternalLink($(event.target).attr("href")) ) {
			return true;
		}
	}

	event.preventDefault ? event.preventDefault() : event.returnValue = false;

	//handle Ajax Error div Msgs:
	if($(event.target).parents(".loadingErrorDiv").length) { //loading error msg div
		if($(event.target).attr("class")=="innerLoadingErrorSpan2") {
			clearRightPane();
			loadAjaxPage(lastHref);
		}
		if($(event.target).attr("class")=="innerLoadingErrorSpan3") {
			if(typeof lastRequest == "undefined" || lastRequest == ""){
				
			}else{
				lastRequest.abort();
			}
			clearRightPane();
		}
	}
	if($(event.target).parents(".loadingMsgDiv").length) { //handling the div which shows up when connection is taking too long to load
		if($(event.target).attr("class")=="innerLoadingMsgSpan2") {
			if(typeof lastRequest == "undefined" || lastRequest == ""){
				
			}else{
				lastRequest.abort();
			}
			clearRightPane();
		}
	}

	if (usingPushState()) { //if using pushState api
		AsDocs.log("using pushState api");

		if($(event.target)[0].nodeName.toLowerCase()=="a" || $(event.target).parents("a")[0] ) {
			var hyperlinkObj = "";
			if($(event.target).parents("a").length >0 ) {
				hyperlinkObj = $(event.target).parents("a");
			} else {
				hyperlinkObj = $(event.target);
			}
			
			//if the href is changed due to right click change it back
			if(typeof hyperlinkObj.data("changedFromHref") != "undefined"){
				hyperlinkObj.attr("href",hyperlinkObj.data("changedFromHref") );
				hyperlinkObj.data("changedFromHref",null);
			}
			
			var linkFrag = getHyperlinkFragment(hyperlinkObj);
			
			//code for top left links
			if($(event.target).parents(".titleTableTitleION").length) {
				AsDocs.log("top left links matched");
				prevURL = unescape(location.href);
				if($(event.target).attr("id") == "hidetoc" || $(event.target).attr("id") =="showtoc") { //exclude show/hide pkg link

				} else {
					window.history.pushState('', '',getBaseRef() + linkFrag);
					curURL = unescape(location.href);
					loadAjaxPage(location.href);
				}
				return false;
			}

			//right subtitle and content scrolling links
			if(hyperlinkObj.attr("href").match(/^#/)) {
				AsDocs.log("scroll links matched");
				prevURL = unescape(location.href);
				var scrollAnchor = getScrollTarget(linkFrag);
				window.history.pushState('', '',unescape(location.href).split("#")[0] +"#"+ scrollAnchor);
				scrollHere(scrollAnchor);
				curURL = unescape(location.href);
				return false;
			}

			//for toc left links
			if($(event.target).parents("#toc").length) {
				AsDocs.log("toc links matched");
				var relLoc;
				relLoc= getBaseRef();
				prevURL = unescape(location.href);
				if($(event.target).parents("#packagelist").length) { //load the packages class list when clicked on pkg
					window.history.pushState('', '', relLoc + linkFrag);
				}

				if($(event.target).parents("#classlistoutline").length) { //if all classes list
					window.history.pushState('', '', relLoc+ linkFrag);
				}else if($(event.target).parents("#classlist").length) { //if pkg specific class list
					if(unescape(location.href).match(/mxml\//) ){
						window.history.pushState('', '', relLoc+ linkFrag);
					}else{
						window.history.pushState('', '',linkFrag);
					}
				}
				curURL =  unescape(location.href);
				var tmp = prevURL.match(/#/) ? prevURL.split("#")[0]:prevURL;
				var tmp1 = curURL.match(/#/) ? curURL.split("#")[0]:curURL;
				if(tmp == tmp1) {
					scrollHere(curURL.split("#")[1]);
				} else {
					loadAjaxPage(location.href,curURL.split("#")[1]);
				}
				return false;
			}

			//code for content hyperlinks
			if($(event.target).parents("#content").length) {
				AsDocs.log("content links matched");
				prevURL = unescape(location.href);
				if(hyperlinkObj.attr("href").match(/\?/)) { //handling filter settings in index page
					window.history.pushState('','',linkFrag);
					curURL = unescape(location.href);
					var args = location.href.substring(location.href.lastIndexOf("?")+1,location.href.length);
					loadFilters(args);
					return false;
				}else{
					window.history.pushState('', '', hyperlinkObj.attr("href"));
					curURL = unescape(location.href);
					var tmp = prevURL.match(/#/) ? prevURL.split("#")[0]:prevURL;
					var tmp1 = curURL.match(/#/) ? curURL.split("#")[0]:curURL;
					if(tmp == tmp1) {
						scrollHere(curURL.split("#")[1]);
					} else {
						loadAjaxPage(location.href,curURL.split("#")[1]);
					}
				}
				return false;
			}

			//for the link just above toc
			if($(event.target).parents(".titleTableSubTitle").length) {
				AsDocs.log("links above toc matched");
				prevURL = unescape(location.href);
				window.history.pushState('', '', linkFrag);
				curURL = unescape(location.href);
				loadAjaxPage(location.href);
				return false;
			}

		}
		return false;
	} else { //if not using pushState api
		AsDocs.log("not using pushState api");

		if($(event.target)[0].nodeName.toLowerCase()=="a" || $(event.target).parents("a")[0] ) {
			navigationClickAction = true;
			var hyperlinkObj = "";
			if($(event.target).parents("a").length >0 ) {
				hyperlinkObj = $(event.target).parents("a");
			} else {
				hyperlinkObj = $(event.target);
			}
			
			//if the href is changed due to right click change it back
			if(typeof hyperlinkObj.data("changedFromHref") != "undefined"){
				hyperlinkObj.attr("href",hyperlinkObj.data("changedFromHref") );
				hyperlinkObj.data("changedFromHref",null);
			}
			
			var urlFullFragment = getURLFullLocation(location.href);
			var ajaxBaseFrag = getAjaxBaseFragment(location.href);
			var ajaxFullFrag = getAjaxFullFragment(location.href);
			var linkFrag = getHyperlinkFragment(hyperlinkObj);
			var langRefBaseFrag = getLangrefBaseFragment(location.href);

			//for top left links
			if($(event.target).parents(".titleTableTitleION").length>0) {
				prevURL = unescape(location.href);
				if(hyperlinkObj.attr("href").match(/#top/) ) { //exclude show/hide pkg link

				} else {
					location.href = urlFullFragment + "#!" + linkFrag;
				}
				curURL = unescape(location.href);
				return false;
			}

			//right subtitle and content scrolling links
			if(hyperlinkObj.attr("href").match(/^#/)) {
				prevURL = unescape(location.href);
				if(ajaxFullFrag == ""){
					location.href = urlFullFragment + "#" + getScrollTarget(linkFrag);
				}else{
					location.href = urlFullFragment + "#!" + ajaxFullFrag + "#" + getScrollTarget(linkFrag);
				}
				curURL = unescape(location.href);
				if(prevURL == curURL){
					URLHashChange();
				}
				return false;
			}

			//for toc left links
			if($(event.target).parents("#toc").length) {
				prevURL = unescape(location.href);
				if($(event.target).parents("#classlist").length>0 && $(event.target).parents("#classlistoutline").length<=0) {
					if(linkFrag.match(/mxml\//) ){ //handling mxml
						location.href = urlFullFragment + "#!" + linkFrag
					}else if(ajaxFullFrag == ""){ 
						location.href = urlFullFragment + "#!" + langRefBaseFrag + linkFrag;
					}else{
						location.href = urlFullFragment + "#!" + ajaxBaseFrag + linkFrag;
					}
				}else {
					location.href = urlFullFragment + "#!" + linkFrag;
				}
				curURL = unescape(location.href);
				return false;
			}

			//code for content hyperlinks
			if($(event.target).parents("#content").length) {
				prevURL = unescape(location.href);
				if(hyperlinkObj.attr("href").match(/\.\.\//) ) {
					location.href = urlFullFragment + "#!" + linkFrag;
				} else if(linkFrag.match(/package-detail/) ) { //package-detail.html is relative to cur directory
					if(ajaxFullFrag.match(/package-summary/) || ajaxFullFrag.match(/class-summary/) ) {//for the links in package-summary.html page
						location.href = urlFullFragment + "#!" + linkFrag;
					} else if(ajaxBaseFrag == "") { //if the initial ajax url is not the top level one(langref/x/y/z../page.html)
						location.href = urlFullFragment + "#!" + langRefBaseFrag + linkFrag;
					} else {
						location.href = urlFullFragment + "#!" + ajaxBaseFrag + linkFrag;
					}
				} else if(urlFullFragment.match(/package-detail/) && ajaxFullFrag == ""){
					location.href = urlFullFragment + "#!" + langRefBaseFrag + linkFrag;
				}else { //if the links are all relative to cur directory i.e no ../ in begining
					if(ajaxBaseFrag == ""){
						if(ajaxFullFrag == "package-detail.html"){
							location.href = urlFullFragment + "#!" + linkFrag;
						}else{
							if(baseRef == "" || baseRef == "." || baseRef == "./"){
								location.href = urlFullFragment + "#!" + langRefBaseFrag + linkFrag;
							}else{
								location.href = urlFullFragment + "#!" + linkFrag;
							}
						}
					}else{
						location.href = urlFullFragment + "#!" + ajaxBaseFrag + linkFrag;
					}
				}
				curURL = unescape(location.href);
				return false;
			}

			//for the pkg link just above toc
			if($(event.target).parents(".titleTableSubTitle").length) {
				prevURL = unescape(location.href);
				if(ajaxBaseFrag == ""){
					location.href = urlFullFragment + "#!" + langRefBaseFrag + linkFrag;
				}else{
					location.href = urlFullFragment + "#!" + ajaxBaseFrag + linkFrag;
				}
				curURL = unescape(location.href);
				return false;
			}
		}
		return false;
	}
	AsDocs.log("ret false");
	return false;
}

var cacheKey = "";
function popHistory() {
	AsDocs.log("popHistory");
	prevURL = curURL;
	curURL = unescape(location.href);
	AsDocs.log("prevURL: "+prevURL);
	AsDocs.log("curURL: "+curURL);
	if(prevURL == ""){
		//its the initial load dont do anything
	}else if(prevURL == curURL){
		//dont do anything
	}else if(prevURL.split("#")[0] == curURL.split("#")[0]){
		if(curURL.split("#").length == 2){
			scrollHere(curURL.split("#")[1]);
		}
	}else{
		loadAjaxPage(curURL.split("#")[0],curURL.split("#")[1]);
	}

}

function URLHashChange() {
	AsDocs.log("url hash changed");
	if(!navigationClickAction){ //if its browsers back/forward button
		prevURL = curURL;
	}
	navigationClickAction = false; //resetting it again
	curURL = unescape(location.href);
	AsDocs.log("prevURL: "+prevURL);
	AsDocs.log("curURL: "+curURL);
	var locationBarURL = unescape(location.href);
	var pathLookupString = "actionscript/3/";
	var baseIndexOffset = 15;
	var baseIndex = locationBarURL.indexOf(pathLookupString);
	if(baseIndex == -1) {
		pathLookupString = "langref/";
		baseIndex = locationBarURL.indexOf(pathLookupString);
		baseIndexOffset = 8;
	}
	var baseLocation = locationBarURL.substring(0,locationBarURL.indexOf(pathLookupString)+baseIndexOffset);

	if(locationBarURL.split("#!").length == 1 ) {
		if(prevURL == "" ){
			//dont do anything
		}else if(prevURL.split("#")[0] == curURL.split("#")[0] && curURL.split("#").length > 1){
			scrollHere(curURL.split("#")[1]);
		}else{
			loadAjaxPage(locationBarURL);
		}
	} else if(locationBarURL.match(/\?/)) {
		AsDocs.log("2");
		args = locationBarURL.substring(locationBarURL.lastIndexOf("?")+1,locationBarURL.length);
		loadFilters(args);
	} else if(locationBarURL.split("#!").length == 2 && locationBarURL.split("#").length != 3) {
		AsDocs.log("3");
		var lct = locationBarURL.substring(0,locationBarURL.indexOf("#!"));
		lct = lct.substring(0,lct.lastIndexOf("/")+1);
		loadAjaxPage(baseLocation+locationBarURL.split("#!")[1]);
	} else if(locationBarURL.split("#").length == 3) {
		AsDocs.log("matched 3");
		var tmp = unescape(prevURL).split("#!")[1];
		var tmp1 = unescape(curURL).split("#!")[1];
		var scrlTarget="";
		if(tmp != undefined && tmp.match(/#/)) {
			tmp = tmp.split("#")[0];
		}
		if(tmp1 != undefined && tmp1.match(/#/)) {
			scrlTarget=tmp1.split("#")[1];
			tmp1 = tmp1.split("#")[0];
		}
		if(tmp == tmp1) {
			scrollHere(scrlTarget);
		} else {
			loadAjaxPage(baseLocation + tmp1,curURL.split("#")[2]);
		}
	}
	AsDocs.log("5");

}

var lastRequest;
var lastHref="";
var loadingMsgTimeout;
function loadAjaxPage(urlToLoad,scrollTarget) {
	AsDocs.log("loading ajax page");
	AsDocs.log("scrollTarget: "+scrollTarget);
	cacheKey = unescape(urlToLoad);
	AsDocs.log("loading href: "+cacheKey);
	
	if(lastRequest) {
		lastRequest.abort();
		lastRequest = null;
	}
		
	if (!hasLocalStorage() ||  (typeof localStorage)=="undefined"?true: !localStorage.getItem(cacheKey) ) {
		if($(".loaderimg").length<=0) {
			$("#maincontainer").append("<img class='loaderimg' src='"+getBaseRef()+"ajax-loader.gif'/>");
		}
		$("#content").css("opacity","0.5");

		clearTimeout(loadingMsgTimeout);
		lastHref = urlToLoad;
		lastRequest = $.ajax({
			url: urlToLoad,
			data: null,
			dataType: "text",
			type: 'GET',
			success: function(data) {
				AsDocs.log("::success loading::" );
				clearRightPane();
				loadRightContent(data,scrollTarget);
				copyexample();
				storePage(cacheKey, data);
			},
			error: function(obj, strError,errorThrown) {
				clearTimeout(loadingMsgTimeout);
				if(obj.statusText != "abort") {
					if($(".loaderimg").length>0) {
						if($(".loaderimg").length>0) {
							$(".loaderimg").remove();
						}
						$("#maincontainer").append("<div class='loadingErrorDiv'>"+
						"<div class='innerLoadingErrorDiv'><span class='innerLoadingErrorSpan1'>"+ajaxErrorMsg+"... </span><span class='innerLoadingErrorSpan2'>"+ajaxErrorTryMsg+"</span><span class='innerLoadingErrorSpan3'>"+cancelMsg+"</span></div></div>");
					}
				}
			}
		});
		loadingMsgTimeout = setTimeout("if(lastRequest.readyState !=4 )createLoadingMsg();", 15000);
	} else {
		loadRightContent(localStorage.getItem(cacheKey),scrollTarget);
	}
	
	updateOmniture(urlToLoad);

	handleClassListLoading(prevURL,curURL);
}

function handleClassListLoading(previousURL,currentURL) {
	var stFrag = '<div id="classlistWrapper"> <h4 id="classlisth4"> <a id="cls_name" href="" target="_self" onclick="this.href=baseRef + \'class-summary.html\';saveClassListScrollTop();" oncontextmenu="this.href=baseRef + \'class-summary.html\';saveClassListScrollTop();" style="color:black"> '+classesText+' </a> <span id="cls_searchspan" style="display:none"> <input type="text" id="cls_searchbox" onfocus="clsSearchBoxOnFocus();" onblur="clsSearchBoxOnBlur()" onkeyup="clsSearchOnKeyUp();"> <span id="cls_clear_search" class="search_inactive" onclick="clsClearSearchButton()">x</span> </span> </h4> <div id="classlistoutline" class="classlistoutline"></div></div>';
	if(usingPushState()){
		var prevLangRefBaseFrag = getLangrefFullFragment(previousURL);
		var prevLangRefFullFrag = getLangrefFullFragment(previousURL);
		var curLangRefBaseFrag = getLangrefFullFragment(currentURL);
		var curLangRefFullFrag = getLangrefFullFragment(currentURL);
		if($("#classlistoutline").length <=0 ) { //its pkgs class list in left pane
			if(currentURL.match(/package-detail/) ){
				if(prevLangRefBaseFrag == curLangRefBaseFrag){  //dont load the class list coz its loaded already
				}else{
					ajaxGet("class-list.html",loadClassesList2);
				}
			}else if(currentURL.match(/mxml-tag-detail/) || (getBaseRef() == "../" && location.href.indexOf("/mxml/") >0) ){ //handling /mxml/ pages
				ajaxGet("mxml-tags.html",loadClassesList2);
			}else if(previousURL.match(/mxml-tag-detail/) ){
				$("#classlist").html(stFrag);
				if(getCookie("showAllClasses")=="yes") {
					ajaxGet(getBaseRef()+"all-classes.html",loadClassesList);
				} else {
					ajaxGet(getBaseRef()+"all-classes-A.html",loadClassesList);
				}
			}else if( curLangRefFullFrag=="language-elements.html" || curLangRefFullFrag=="operators.html" || curLangRefFullFrag=="statements.html"
				|| curLangRefFullFrag=="specialTypes.html" || curLangRefFullFrag=="appendixes.html" || curLangRefFullFrag=="compilerErrors.html" || 
				curLangRefFullFrag=="compilerWarnings.html" || curLangRefFullFrag=="runtimeErrors.html" || curLangRefFullFrag=="charset-codes.html" || 
				curLangRefFullFrag=="motionXSD.html" || curLangRefFullFrag=="TimedTextTags.html" || curLangRefFullFrag=="deprecated.html" || 
				curLangRefFullFrag=="accessibilityImplementationConstants.html" || curLangRefFullFrag=="index.html" || curLangRefFullFrag=="package-summary.html" || 
				curLangRefFullFrag=="class-summary.html" || curLangRefFullFrag=="all-index-Symbols.html" || curLangRefFullFrag=="appendixes.html" ){
					$("#classlist").html(stFrag);
					if(getCookie("showAllClasses")=="yes") {
						ajaxGet(getBaseRef()+"all-classes.html",loadClassesList);
					} else {
						ajaxGet(getBaseRef()+"all-classes-A.html",loadClassesList);
					}
			}else if(curLangRefBaseFrag != prevLangRefFullFrag){
					ajaxGet("class-list.html",loadClassesList2);
			}
			
		}else{ //its all classes list
			if(currentURL.match(/package-detail/) ){
				ajaxGet("class-list.html",loadClassesList2);
			}else if(currentURL.match(/mxml-tag-detail/) || (getBaseRef() == "../" && location.href.indexOf("/mxml/") >0) ){ //handling /mxml/ pages
				ajaxGet("mxml-tags.html",loadClassesList2);
			}
		}
		
	}else{
		var prevAjaxFullFrag = getAjaxFullFragment(previousURL);
		var prevAjaxBaseFrag = getAjaxBaseFragment(previousURL);
		
		var curAjaxFullFrag = getAjaxFullFragment(currentURL);
		var curAjaxBaseFrag = getAjaxBaseFragment(currentURL);
		
		var urlBaseLocation = getURLBaseLocation(location.href);
		
		if($("#classlistoutline").length <=0 ) { //its pkgs class-list in left pane
			if(curAjaxFullFrag.match(/package-detail/) ) {
				if(curAjaxFullFrag == prevAjaxFullFrag) { //back button pressed
					ajaxGet(urlBaseLocation + curAjaxBaseFrag + "class-list.html",loadClassesList2);
				}else if(prevAjaxBaseFrag == curAjaxBaseFrag) { //dont load the class list coz its loaded already
					if(!prevAjaxFullFrag.match(/package-detail/) && curAjaxFullFrag.match(/package-detail/) ){ //if top level link is clicked 
						ajaxGet(urlBaseLocation + curAjaxBaseFrag + "class-list.html",loadClassesList2);
					}
				} else {
					ajaxGet(urlBaseLocation + curAjaxBaseFrag + "class-list.html",loadClassesList2);
				}
			}else if(curAjaxFullFrag.match(/mxml-tag-detail/) || curAjaxFullFrag.match(/mxml\//) ) { //handling /mxml pages
				ajaxGet(urlBaseLocation + "mxml-tags.html",loadClassesList2);
			} else if(prevAjaxFullFrag.match(/mxml-tag-detail/) ) {
				$("#classlist").html(stFrag);
				if(getCookie("showAllClasses")=="yes") {
					ajaxGet(urlBaseLocation+"all-classes.html",loadClassesList);
				} else {
					ajaxGet(urlBaseLocation+"all-classes-A.html",loadClassesList);
				}
			} else if(curAjaxFullFrag=="language-elements.html" || curAjaxFullFrag=="operators.html" || curAjaxFullFrag=="statements.html"
				|| curAjaxFullFrag=="specialTypes.html" || curAjaxFullFrag=="appendixes.html" || curAjaxFullFrag=="compilerErrors.html" || 
				curAjaxFullFrag=="compilerWarnings.html" || curAjaxFullFrag=="runtimeErrors.html" || curAjaxFullFrag=="charset-codes.html" || 
				curAjaxFullFrag=="motionXSD.html" || curAjaxFullFrag=="TimedTextTags.html" || curAjaxFullFrag=="deprecated.html" || 
				curAjaxFullFrag=="accessibilityImplementationConstants.html" || curAjaxFullFrag=="index.html" || curAjaxFullFrag=="package-summary.html" || 
				curAjaxFullFrag=="class-summary.html" || curAjaxFullFrag=="all-index-Symbols.html" || curAjaxFullFrag=="appendixes.html" ) { //all top left links
					$("#classlist").html(stFrag);
					if(getCookie("showAllClasses")=="yes") {
						ajaxGet(urlBaseLocation+"all-classes.html",loadClassesList);
					} else {
						ajaxGet(urlBaseLocation+"all-classes-A.html",loadClassesList);
					}
			}else if(curAjaxFullFrag=="" && unescape(location.href).match(/package-detail/) ){
				ajaxGet("class-list.html",loadClassesList2);
			}else if(curAjaxBaseFrag != prevAjaxBaseFrag){
				if(curAjaxFullFrag==""){
					ajaxGet(urlBaseLocation + getLangrefBaseFragment(currentURL) + "class-list.html",loadClassesList2);
				}else{
					ajaxGet(urlBaseLocation + curAjaxBaseFrag + "class-list.html",loadClassesList2);
				}
			}
		
		} else { //its all classes list in left pane
			if(curAjaxFullFrag.match(/package-detail/) ) {
				ajaxGet(urlBaseLocation + curAjaxBaseFrag + "class-list.html",loadClassesList2);
			} else if(curAjaxFullFrag.match(/mxml-tag-detail/) || curAjaxFullFrag.match(/mxml\//) ) {  //handling /mxml pages
				ajaxGet(urlBaseLocation + "mxml-tags.html",loadClassesList2);
			}
		}
	}

}

function createLoadingMsg() {
	$("#maincontainer").append("<div class='loadingMsgDiv'>"+
	"<div class='innerLoadingMsgDiv'><span class='innerLoadingMsgSpan1'>"+ajaxLoadingMsg+"... </span><span class='innerLoadingMsgSpan2'>"+cancelMsg+"</span>"+
	"</div></div>");
}

function clearRightPane() {
	if($(".loaderimg").length>0) {
		AsDocs.log("::clearing loading image::");
		$(".loaderimg").remove();
	}
	if($(".loadingErrorDiv").length>0) {
		$(".loadingErrorDiv").remove();
	}
	if($(".loadingMsgDiv").length>0) {
		$(".loadingMsgDiv").remove();
	}
	$("#content").css("opacity","1");
}

function hasLocalStorage() {
	return 'localStorage' in window;
}

function storePage(url,data) {
	if (!hasLocalStorage()) {
		return false;
	}
	try {
		localStorage.setItem(url, data);
	} catch(e) {
		localStorage.clear(); //if limit reached empty
	}
}

function loadRightContent(data,scrolltarget) {
	AsDocs.log("loading right content");
	var dt=data;
	dt = dt.replace(/document\.write/g,""); //remove the document.writes of omniture and foresee
	var st = dt.substring(dt.indexOf('<div class="mainright"'),dt.indexOf('<div class="footer">'));
	var st1 = st.substring(0,st.lastIndexOf("</div>"));
	var csscontent = $("#splitter").offset().left+10+"px";
	st1 = st1.replace('<div class="mainright"','<div class="mainright" style="left:'+csscontent+'"')
	//header left links
	var st2 = dt.substring(dt.indexOf('<td class="titleTableSubTitle"'),dt.indexOf('<td class="titleTableSubNav"'));
	//header right links
	var st3 = dt.substring(dt.indexOf('<td class="titleTableSubNav"'));
	st3 = st3.substring(0,st3.indexOf("</td>")+5);
	try { //its throwing up error in ie
		$("#content").replaceWith(st1);
	} catch(e) {
	}
	$("#subTitle").replaceWith(st2);
	$("#subNav").replaceWith(st3);

	var st4 = dt.substring(dt.indexOf("<title>")+7,dt.indexOf("</title"));
	st4 = st4.replace(/&reg;/g,"\u00AE"); //have to encode reg else not working in ie
	document.title = st4;

	var st5 = dt.substring(dt.indexOf('titleBar_setSubNav'));
	st5 = st5.substring(0,st5.indexOf(')')+1);
	try {
		eval(st5);
	} catch(e) {
	}
	
	//ie doesnt seem to load swfs for some reason. so check and load them
	var st6 = dt.substring(dt.indexOf("AC_FL_RunContent"));
	st6 = st6.substring(0,st6.indexOf(")")+1);
	setTimeout(function(){
		if($("#swfHolderDiv").length>0 &&  $("#swfHolderDiv").children().length < 1){
			eval(st6);
		}
	},1000);
	
	if(scrolltarget != null) {
		scrollHere(scrolltarget);
	}
	if (usingPushState()) { //for pushstate supported browsers setting baseRef to the changed one
		baseRef = getBaseRef();
	}
	processRightContent();
	try {
		loadIonComments();
	} catch(e) {
	}
}

function scrollHere(comp) {
	var scrolltarget = encodeURIComponent(comp);
	try {
	if(isTablet()){
		contentScroller.scrollToElement(document.getElementById(scrolltarget));
		return;
	}
	if(typeof scrolltarget == "undefined" || scrolltarget == "") {
		return;
	}
	var target_offset = $("a[name='"+scrolltarget+"']").offset();
	var target_top = target_offset.top;
	if(target_offset.top < 171) {
		target_top = $("#content").scrollTop() + target_offset.top - 171;
	} else {
		target_top = $("#content").scrollTop() +target_offset.top-171;
	}
	$("#content").scrollTop(target_top);
	}
	catch(e){}
}

function processRightContent() {
	AsDocs.log("processing right content");
	clearRightPane();
	setTimeout("doFilterStateChange1();clsSearchOnKeyUp1()", 500);
	
	//update the action attribute for iph in pushState supported browsers
	if( typeof($("#gsa .searchForm").attr("action")) != "undefined"){
		$("#gsa .searchForm").attr("action",getBaseRef()+"search.html")
	}
	
	$("#content img").each( function() {
		imgsrc = $(this).attr("src");
		imgsrc = imgsrc.replace(/\.\.\//g,"");
		if (usingPushState()) {
			$(this).attr("src",getBaseRef()+imgsrc);
		} else {
			if($.browser.msie && $.browser.version <=7) { //ie7 is behaving differently
				var imgsrc1 = imgsrc.substring(imgsrc.indexOf("images"));
				$(this).attr("src",baseRef+imgsrc1);
			} else {
				$(this).attr("src",baseRef+imgsrc);
			}

		}
	});
	if(isTablet()){
		contentScroller = new iScroll("content");
	}
}

//***** End Ajax Implementation *****//

//*** Start Omniture Code ** //
function updateOmniture(newURL){
	if(typeof(s_accountName) != "undefined"){
		var s = s_gi(s_accountName);
		if (window.s_docURL.indexOf("/en_us/") == -1) {
			s_docURLArray=s_docURL.split('/');
			s_pageName="http://help.adobe.com/"+s_docURLArray[1]+"/"+ s_docURLArray[2]+"/"+s_docURLArray[3];
		}else{
			s.pageName = s_pageName = "";
		}
		s.prop23 = s_prop23 = newURL;
		void(s.t());
	}
}
//** End Omniture Code **//

//***** Start IonComments code *****//
var helpcfgPath;
var request;
var info;
var ionLoadReady = false;
var ionLoaded = false;
var ionSupportLoaded = false;
var ionSupportLoadReady = false;

var agt=navigator.userAgent.toLowerCase();
var use_robohelp_behavior = false;

if (typeof(terms_HELPCFG) != 'undefined' && terms_HELPCFG.length > 0) {
	var loc = getLangName();     //alert(loc);
	helpcfgPath = "http://" + window.location.host + "/HelpCfg/" + loc + "/" + terms_HELPCFG;
}

var helpcfgLoaded=false;

function loadIonComments() {
	if(!helpcfgLoaded) {
		$.get(helpcfgPath, function(data) {
			helpcfgLoaded = true;
			info = data.getElementsByTagName('product');
			getIonComments();
		},"xml");
	} else {
		getIonComments();
	}
}

function getIonComments() {
	label = getIonLabel();
	site  = getIonSite();
	if(document.getElementById("ionComHere") || document.getElementById("badgeContainerSupport")) { //load only if the comments container exists
		if (use_robohelp_behavior || !(label) || !(loc) || !(label.length > 0) || !(loc.length > 0)) {
			document.getElementById("ionComHere").style.display = "none";
			document.getElementById("badgeContainerSupport").style.display = "none";
		} else {
			document.getElementById("ionComHere").style.display = "block";
			document.getElementById("badgeContainerSupport").style.display = "block";
		}

		if ( (info[0].getAttribute('ionCommentingAllowed') == 'yes') && (label) && (label.length > 0) && (loc)  && (loc.length > 0)) {
			//only do this if the DOM is ready, else wait and call the function
			ionLoadReady = true;
		}
		if((info[0].getAttribute('ionSupportBadgeAllowed') == 'yes') && (label) && (label.length > 0) && (loc)  && (loc.length > 0)) {
			ionSupportLoadReady = true;
		}
		loadCommentBadges();
	}
}

function loadCommentBadges() {
	AsDocs.log("loading comment badges");
	//only do if DOM ready and ionLoadReady, and not loaded yet
	if(ionLoadReady && $("#badgeContainerSupport").length>0) {
		var badge = new ionBadge();
		if(location.href.match(/#!/)) {
			var tmp1 = location.href.split("#!")[0];
			tmp1 = tmp1.substring(0,tmp1.lastIndexOf("/")+1);
			var tmp2 = location.href.split("#!")[1];
			badge.url = (tmp1+tmp2).replace(/\?(.*)/, "");
		} else {
			badge.url = location.href.replace(/\?(.*)/, "");
		}

		badge.locale = loc;
		//badge.anchor = document.getElementById("ionCount");
		badge.container = document.getElementById("ionComHere");
		badge.productLabel = label;
		if ( info[0].getAttribute('ionRatingAllowed') == 'yes' ) {
			badge.ratingType = info[0].getAttribute('ionRatingType');
			badge.siteArea = site;
		}
		badge.load();
	}
	if(ionSupportLoadReady && $("#ionComHere").length>0 ) {
		var badgeSupport = new ionSupportBadge();
		if(location.href.match(/#!/)) {
			var tmp1 = location.href.split("#!")[0];
			tmp1 = tmp1.substring(0,tmp1.lastIndexOf("/")+1);
			var tmp2 = location.href.split("#!")[1];
			badgeSupport.url = (tmp1+tmp2).replace(/\?(.*)/, "");
		} else {
			badgeSupport.url = location.href.replace(/\?(.*)/, "");
		}
		badgeSupport.container = document.getElementById("badgeContainerSupport");
		badgeSupport.commenting = true;
		badgeSupport.locale = loc;
		badgeSupport.productLabel = label;
		badgeSupport.rating = true;
		badgeSupport.ratingType = "thumbs";
		badgeSupport.siteArea = site;
		badgeSupport.timeOutDelay = 30000;
		badgeSupport.load();
	}
}

function getLangName() {
	var lang = "en-us";
	var metaElements = document.all ?
	document.all.tags('meta') :
	document.getElementsByTagName ?
	document.getElementsByTagName ('meta') : new Array();
	for (var m = 0; m < metaElements.length; m++) {
		if (metaElements[m].name == "lang") {
			lang = metaElements[m].content;
			break;
		}
	}
	var ptn = /(..)-(..)/;
	if (ptn.test(lang)) {
		var countryCode = lang.replace(ptn, "$1");
		var languageCode = lang.replace(ptn, "$2");
		lang = countryCode + "_" + languageCode.toUpperCase();
	}
	return lang;
}

function isHomepage() {
	var metaElements = document.all ?
	document.all.tags('meta') :
	document.getElementsByTagName ?
	document.getElementsByTagName ('meta') : new Array();
	for (var m = 0; m < metaElements.length; m++) {
		if ((metaElements[m].name == "topictype") && (metaElements[m].content == "homepage")) {
			return true;
		}
	}
	return false;
}

function getIonLabel() {
	var href = "" + document.location.href;
	var label = "";
	// No commenting for the home page
	if (isHomepage()) {
		return label;
	}
	// 3D Reviewer doesn't get commenting, but the rest of Acrobat does.
	if (href.indexOf("Acrobat/9.0/Reviewer") != -1) {
		return label;
	}

	label = info[0].getAttribute('ionId');
	return label;
}

function getIonSite() {
	if ( info[0].getAttribute('ionSiteArea') != "" ) {
		return info[0].getAttribute('ionSiteArea');
	} else {
		return "help";
	}
}

//***** End IonComments code  *****//

/* needed for IPH builds used offline in CHC */
function scrollToNameAnchor() {
	var nameAnchor = window.location.href;
	var value = nameAnchor.split("nameAnchor=");

	if (value[1] != null) {
		document.location =value[0]+"#"+ value[1];
	}
}

function ajaxGet(url, responseHandler) {
	var page_request = false;

	if (window.XMLHttpRequest && !(window.ActiveXObject && window.location.protocol == "file:")) {
		// use this only if available, and not using IE on a local filesystem
		page_request = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // older versions of IE, or IE on a local filesystem
		try {
			page_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				page_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
			}
		}
	} else {
		alert("Your browser does not support XMLHTTP.");
		return false;
	}

	page_request.onreadystatechange= function() {
		if(page_request.readyState==4) {
			// on local machines the status for success is 0. on web servers it is 200
			if(page_request.status==200 || page_request.status==0) {
				responseHandler(page_request);
			}
		}
	}
	page_request.open('GET', url, true);
	page_request.send(null);
}

function showHideTOC(showTOC) {
	var toc = document.getElementById("toc");
	var splitter = document.getElementById("splitter");
	var content = document.getElementById("content");
	var plist = document.getElementById("packagelist");
	var h_splitter = document.getElementById("h_splitter");
	var clist = document.getElementById("classlist");
	var showtoc = document.getElementById("showtoc");
	var hidetoc = document.getElementById("hidetoc");
	if(toc) {
		if(!showTOC) {
			eval("toc.style.display =''");
			eval("splitter.style.display =''");
			if(h_splitter)
				eval("h_splitter.style.display =''");
			content.style.left ='6px';
			eval("showtoc.style.display =''");
			eval("hidetoc.style.display ='none'");
			setView("hidetoc");
		} else {
			eval("toc.style.display ='inline'");
			eval("splitter.style.display ='inline'");
			toc.style.width = (splitter.offsetLeft - 20) + 'px';
			content.style.left = (splitter.offsetLeft + 10) + 'px';
			//doesn't exist for jslr build
			if(h_splitter) {
				eval("h_splitter.style.display ='inline'");
				plist.style.height = (h_splitter.offsetTop - 10) + 'px';
				clist.style.top = (h_splitter.offsetTop + 4) + 'px';
			}
			eval("showtoc.style.display ='none'");
			eval("hidetoc.style.display =''");
			setView("showtoc");
		}
	}
}

function splitterMouseDown(event, obj) {
	if(!splitterActiveFlag) {
		if(obj.setCapture)
			obj.setCapture();
		else {
			document.addEventListener('mouseup', splitterMouseUp, true);
			document.addEventListener('mousemove', splitterMouseMove, true);
			event.preventDefault();
		}

		splitterActiveFlag = true ;
		splitterObj = obj;
	}
}

function changeQSearchboxWidth() {
	if(getInternetExplorerVersion() != "7") { /* #2923491 - workaround for ie7 issue */
		spObj = document.getElementById("splitter");
		var pkgSbox = document.getElementById("pkg_searchbox");
		var clSbox = document.getElementById("cls_searchbox");
		if(spObj.offsetLeft>220 && spObj.offsetLeft<265) {
			if(pkgSbox != null) {
				pkgSbox.style.width = spObj.offsetLeft-138+"px";
			}
			if(clSbox != null) {
				clSbox.style.width = spObj.offsetLeft-138+"px";
			}
		}
		if(spObj.offsetLeft>=265) {
			if(pkgSbox != null) {
				pkgSbox.style.width = "127px";
			}
			if(clSbox != null) {
				clSbox.style.width = "127px";
			}
		}
		if(spObj.offsetLeft<=220) {
			if(pkgSbox != null) {
				pkgSbox.style.width = "82px";
			}
			if(clSbox != null) {
				clSbox.style.width = "82px";
			}
		}
	}
}

function splitterMouseUp(event) {
	if(splitterActiveFlag) {
		var objLeft = document.getElementById("toc") ;
		var objRight = document.getElementById("content") ;
		changeQSearchboxWidth();
		objLeft.style.width = (splitterObj.offsetLeft - 20) + "px" ;
		objRight.style.left = (splitterObj.offsetLeft + 10) + "px" ;

		if(splitterObj.releaseCapture)
			splitterObj.releaseCapture();
		else {
			document.removeEventListener('mouseup', splitterMouseUp, true);
			document.removeEventListener('mousemove', splitterMouseMove, true);
			event.preventDefault();
		}

		splitterActiveFlag = false ;
		saveSplitterPos();
	}

}

function splitterMouseMove(event) {
	if(splitterActiveFlag) {
		if (event.clientX >= MIN_LEFT && event.clientX <= document.documentElement.clientWidth - MIN_RIGHT) {
			splitterObj.style.left = event.clientX + "px" ;
			if(!splitterObj.releaseCapture) {
				event.preventDefault();
			}
		}
	}
}

function h_splitterMouseDown(event, obj) {
	if(!h_splitterActiveFlag) {
		if(obj.setCapture)
			obj.setCapture();
		else {
			document.addEventListener('mouseup', h_splitterMouseUp, true);
			document.addEventListener('mousemove', h_splitterMouseMove, true);
			event.preventDefault();
		}

		h_splitterActiveFlag = true ;
		h_splitterObj = obj;
	}
}

function h_splitterMouseUp(event) {
	if(h_splitterActiveFlag) {
		var objTop = document.getElementById("packagelist") ;
		var objBottom = document.getElementById("classlist") ;
		objTop.style.height = (h_splitterObj.offsetTop - 10) + "px" ;
		objBottom.style.top = (h_splitterObj.offsetTop + 4) + "px" ;

		if(h_splitterObj.releaseCapture)
			h_splitterObj.releaseCapture();
		else {
			document.removeEventListener('mouseup', h_splitterMouseUp, true);
			document.removeEventListener('mousemove', h_splitterMouseMove, true);
			event.preventDefault();
		}

		h_splitterActiveFlag = false ;
		saveHSplitterPos();
	}

}

function h_splitterMouseMove(event) {
	if(h_splitterActiveFlag) {
		var top = event.clientY - document.getElementById("maincontainer").offsetTop;
		if (top >= MIN_TOP && event.clientY <= document.documentElement.clientHeight - MIN_BOTTOM) {
			h_splitterObj.style.top = top + "px" ;
			if(!h_splitterObj.releaseCapture) {
				event.preventDefault();
			}
		}
	}
}

/*----------------------------------------------------- helper JS -----------------------------------------------------*/
function setStyle(theObj, styleName, styleValue, priority) {
	var bSuccess = false;

	try {
		if (theObj.style && theObj.style.setProperty) {
			theObj.style.setProperty(styleName, styleValue,priority);
			bSuccess = true;
		}
	} catch (ex) {
		alert('exception caught setting style: ' + ex.message); // cannot do anything try the next method
	}
	if (!bSuccess) {
		try {
			theObj.style[styleName] = styleValue;
			bSuccess = true;
		} catch (exNext) {
			alert('exception caught setting direct style: ' + exNext.message); // cannot do anything
		}
	}
	return bSuccess;
} // end of setStyle

// global to store the item to be focused
gFocusItem =null;
gLastFocusItem = null;
function doFocus() {
	if (gFocusItem != null) {
		gFocusItem.focus();
		if (gLastFocusItem && gLastFocusItem.className == 'item focus')
			gLastFocusItem.className = 'item';
		if (gFocusItem && gFocusItem.className == 'item')
			gFocusItem.className = 'item focus';
		gLastFocusItem = gFocusItem;
		gFocusItem=null;
	}
}

// Adobe Help versions pod
var ahpodjs = "/en_US/shared/ahpods/AHPod.js";
document.write('<script src="' + ahpodjs + '"type="text/javascript" language="Javascript" charset="UTF-8"></scr'+'ipt>');

function savePackageListScrollTop() {
	var packageList = document.getElementById("packagelist");
	if (packageList) {
		setCookie("packageListScrollTop",packageList.scrollTop, new Date(3000,1,1,1,1), "/", document.location.domain);
		setCookie("classListScrollTop",0, new Date(3000,1,1,1,1), "/", document.location.domain);
	}
}

function saveClassListScrollTop() {
	var classList = document.getElementById("classlist");
	if (classList)
		setCookie("classListScrollTop",classList.scrollTop, new Date(3000,1,1,1,1), "/", document.location.domain);
}

function restorePackageListScrollTop() {
	var packageListScrollTop = getCookie("packageListScrollTop");
	if(packageListScrollTop)
		document.getElementById("packagelist").scrollTop = packageListScrollTop;
}

function restoreClassListScrollTop() {
	var classListScrollTop = getCookie("classListScrollTop");
	if(classListScrollTop)
		document.getElementById("classlist").scrollTop = classListScrollTop;
}

function saveSplitterPos() {
	var splitter = document.getElementById("splitter");
	if (splitter)
		setCookie("splitterPosition",splitter.offsetLeft, new Date(3000,1,1,1,1), "/", document.location.domain);
}

function restoreSplitterPos() {
	var splitterPosition = getCookie("splitterPosition");
	if(splitterPosition)
		document.getElementById("splitter").style.left = splitterPosition + "px";
}

function saveHSplitterPos() {
	var h_splitter = document.getElementById("h_splitter");
	if (h_splitter)
		setCookie("h_splitterPosition",h_splitter.offsetTop, new Date(3000,1,1,1,1), "/", document.location.domain);
}

function restoreHSplitterPos() {
	var h_splitter = document.getElementById("h_splitter");
	if (h_splitter) {
		var h_splitterPosition = getCookie("h_splitterPosition");
		if(h_splitterPosition)
			h_splitter.style.top = h_splitterPosition + "px";
	}
}

function setHrf(obj) {
	var title = obj.title;
	var patt = new RegExp(".");
	if(patt.test(title)) {
		title = title.replace(/\./g, "/");
		obj.href=baseRef + title + '.html';
	} else { //they are top level
		obj.href = baseRef + title;
	}
}

/*This function is to save scroll when link is clicked*/
function svScrl(obj) {
	setCookie("showAllClassesList","yes",new Date(3000,1,1,1,1),"/",document.location.domain);
	setHrf(obj);
	saveClassListScrollTop();
}

/*For JSLR */
function setHrfJSLR(obj) {
	var title = obj.title;
	title = title.replace(/\./g, "/");
	if(title.search("\\(\\)") > 0) {
		titleSub = title.substr(title.lastIndexOf("/")+1);
		title = title.replace(titleSub,"package.html#"+titleSub);
	} else {
		title = title + ".html";
	}
	obj.href = baseRef + title;
}

function svScrlJSLR(obj) {
	setHrfJSLR(obj);
	saveClassListScrollTop();
}

var loadAllClassesRan = 0;
var allClassesLoaded =  false;
function saveAllClassesView(arg) {
	if(arg=="more") {
		ajaxGet(baseRef+"all-classes.html", loadClassesList);
		setCookie("showAllClasses", "yes", new Date(3000,1,1,1,1), "/", document.location.domain);
		loadAllClassesRan = 1;
	} else {
		ajaxGet(baseRef+"all-classes-A.html", loadClassesList);
		setCookie("showAllClasses", "no", new Date(3000,1,1,1,1), "/", document.location.domain);
		allClassesLoaded = false;
		loadAllClassesRan = 0;
	}
}

/* showAllClassesList cookie is set to "no" when you are navigating inside packages */
function clearAllClassesListCookie() {
	setCookie("showAllClassesList","no",new Date(3000,1,1,1,1),"/",document.location.domain);
}

//************Start Pkg Quick Search*************//
function quickFilterPackages() {
	var term = document.getElementById("pkg_searchbox").value;
	var pkg = document.getElementById("packagelist");
	var x = pkg.getElementsByTagName("a");
	term = term.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	var patt1 = new RegExp(term,"i");
	var foundPkgCount=0;
	for(i=0;i<x.length;i++) {
		var pstr;
		if(x[i].textContent) {
			pstr = x[i].textContent.match(patt1);
		} else {
			pstr = x[i].innerText.match(patt1);
		}

		if(x[i].className == "noqsearch") {
			x[i].style.display = "none";
		} else if(x[i].id == "pkg_name") {
			//dont filter package name
		} else if(pstr != null && pstr.length>0 && x[i].parentNode.parentNode.style.display != "none") {
			foundPkgCount++;
			var iterm = x[i].innerHTML;
			x[i].innerHTML = iterm.replace(pstr[0],"<span class='highlightText'>"+pstr[0]+"</span>");
		} else {
			if(x[i].id == "pkg_name" || x[i].id == "clear_search") {
				//x[i].style.display = "";
			} else {
				x[i].style.display = "none";
			}
		}
	}
	if(foundPkgCount == 0) {
		var txtdoc = document.getElementById("pkg_txtMsg");
		if(txtdoc == null) {
			var aPkg = document.createElement("div");
			aPkg.id = "pkg_txtMsg";
			aPkg.innerHTML = qsearchText;
			bPkg = document.getElementById("packagelist");
			bPkg.appendChild(aPkg);
		}
	}

}

function pkgSearchBoxOnFocus() {
	var inputDiv = document.getElementById("pkg_searchbox");
	if(inputDiv.value==inputDiv.defaultValue) {
		inputDiv.value='';
		inputDiv.style.color='rgb(0, 0, 0)';
	}
}

var typingInterval = 300;
var pkgtypingTimer;
function pkgSearchOnKeyUp() {
	var inputDiv = document.getElementById("pkg_searchbox");
	if(inputDiv.value=='') {
		document.getElementById('pkg_clear_search').className = 'search_inactive';
	} else {
		document.getElementById('pkg_clear_search').className = 'search_active';
	}
	var len = document.getElementById("pkg_searchbox").value.length;
	if(len>=2) {
		clearTimeout(pkgtypingTimer);
		pkgtypingTimer = setTimeout( function() {
			pkgClearHighlight();
			quickFilterPackages();
		},typingInterval);
	} else {
		pkgClearHighlight();
	}
}

function pkgSearchBoxOnBlur() {
	var inputDiv = document.getElementById("pkg_searchbox");
	if(inputDiv.value=='') {
		inputDiv.value=inputDiv.defaultValue;
		inputDiv.style.color='rgb(170, 170, 170)';
		document.getElementById('pkg_clear_search').className='search_inactive';
	}
}

function pkgClearSearchButton() {
	document.getElementById("pkg_searchbox").value='';
	document.getElementById("pkg_searchbox").focus();
	pkgClearHighlight();
	document.getElementById('pkg_clear_search').className = 'search_inactive';
}

function pkgClearHighlight() {
	var pkg = document.getElementById("packagelist");
	x = [];
	var tNode = document.getElementById("pkg_txtMsg");
	if( document.getElementById("pkg_txtMsg") != null) {
		pNode = document.getElementById("packagelist");
		pNode.removeChild(tNode);
	}

	if(navigator.userAgent.search("MSIE") >=0) {
		xtemp = pkg.getElementsByTagName("span");
		j=0;
		for(i=0;i<xtemp.length;i++) {
			if(xtemp[i].className == "highlightText") {
				x[j] = xtemp[i];
				j++;
			}
		}
		for(i=0;i<x.length;i++) {
			y = x[i].parentNode;
			z = x[i].innerHTML;
			txtNode = document.createTextNode(z);
			x[i].appendChild(txtNode);
			y.replaceChild(txtNode,x[i]);
		}
	} else {
		x = pkg.getElementsByClassName("highlightText");
		while(x.length>0) {
			y = x[0].parentNode;
			z = x[0].innerHTML;
			txtNode = document.createTextNode(z);
			x[0].appendChild(txtNode);
			y.replaceChild(txtNode,x[0]);
		}
	}

	//making all the anchor tags visible
	var alinks = pkg.getElementsByTagName("a");
	for(i=0;i<alinks.length;i++) {
		alinks[i].style.display="";
	}
	doFilterStateChangePackageList();
}

//************End Pkg Quick Search*************//
//************Start Class Quick Search*************//
function quickFilterClassList() {
	var term = document.getElementById("cls_searchbox").value;
	var clList = document.getElementById("classlistoutline");
	var x = clList.getElementsByTagName("a");
	var clsFoundCount = 0;
	term = term.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	var patt1 = new RegExp(term,"i");
	for(i=0;i<x.length;i++) {
		var pstr;
		if(x[i].textContent) {
			pstr = x[i].textContent.replace(/^\s\s*/, '').replace(/\s\s*$/, '').match(patt1);
		} else {
			pstr = x[i].innerText.replace(/^\s\s*/, '').replace(/\s\s*$/, '').match(patt1);
		}

		if(x[i].className == "noqsearch") {
			x[i].style.display = "none";
		} else if(pstr != null && pstr.length>0 && x[i].style.display != "none") {
			clsFoundCount++;
			var iterm = x[i].innerHTML;
			x[i].innerHTML = iterm.replace(pstr[0],"<span class='clsHighlightText'>"+pstr[0]+"</span>");
		} else {
			if(x[i].id == "cls_name" || x[i].id == "cls_clear_search") {
				//x[i].style.display = "";
			} else {
				x[i].style.display = "none";
			}
		}
	}

	if(clsFoundCount == 0) {
		var ctxtdoc = document.getElementById("cls_txtMsg");
		if(ctxtdoc == null) {
			var aCls = document.createElement("div");
			aCls.id = "cls_txtMsg";
			aCls.innerHTML = qsearchText;
			bCls = document.getElementById("classlistoutline");
			bCls.appendChild(aCls);
		}
	}
}

function clsSearchBoxOnFocus() {
	var inputDiv = document.getElementById("cls_searchbox");
	//alert(inputDiv.value);
	if(inputDiv.value==inputDiv.defaultValue) {
		inputDiv.value='';
		inputDiv.style.color='rgb(0, 0, 0)';
	}
}

function clsSearchOnKeyUp() {
	if(getCookie("showAllClasses") ==null || getCookie("showAllClasses")=="no" || getCookie("showAllClasses")=="") {
		if(loadAllClassesRan != 1) {
			saveAllClassesView("more");
		}
	}
	if(allClassesLoaded) {
		clsSearchOnKeyUp1();
	}
}

var clstypingTimer;
function clsSearchOnKeyUp1() {
	var inputDiv = document.getElementById("cls_searchbox");
	if(inputDiv) { //first check whether search box exists
		if(inputDiv.value=='') {
			document.getElementById('cls_clear_search').className = 'search_inactive';
		} else if(inputDiv.value != qsearchBoxLabel) {
			document.getElementById('cls_clear_search').className = 'search_active';
		}
		var len = document.getElementById("cls_searchbox").value.length;
		//alert(len);
		if(len>=2 && inputDiv.value != qsearchBoxLabel) {
			clearTimeout(clstypingTimer);
			clstypingTimer = setTimeout( function() {
				clsClearHighlight();
				quickFilterClassList();
			},typingInterval);
		} else {
			clsClearHighlight();
		}
	}
}

function clsSearchBoxOnBlur() {
	var inputDiv = document.getElementById("cls_searchbox");
	if(inputDiv.value=='') {
		inputDiv.value=inputDiv.defaultValue;
		inputDiv.style.color='rgb(170, 170, 170)';
		document.getElementById('cls_clear_search').className='search_inactive';
	}
}

function clsClearSearchButton() {
	document.getElementById("cls_searchbox").value='';
	document.getElementById("cls_searchbox").focus();
	clsClearHighlight();
	document.getElementById('cls_clear_search').className = 'search_inactive';
}

function clsClearHighlight() {
	var clList = document.getElementById("classlistoutline");
	x = [];
	var tNode = document.getElementById("cls_txtMsg");
	if( document.getElementById("cls_txtMsg") != null) {
		pNode = document.getElementById("classlistoutline");
		pNode.removeChild(tNode);
	}
	if(navigator.userAgent.search("MSIE") >=0) {
		xtemp = clList.getElementsByTagName("span");
		j=0;
		for(i=0;i<xtemp.length;i++) {
			if(xtemp[i].className == "clsHighlightText") {
				x[j] = xtemp[i];
				j++;
			}
		}
		for(i=0;i<x.length;i++) {
			y = x[i].parentNode;
			z = x[i].innerHTML;
			txtNode = document.createTextNode(z);
			x[i].appendChild(txtNode);
			y.replaceChild(txtNode,x[i]);
		}
	} else {
		x = clList.getElementsByClassName("clsHighlightText");
		while(x.length>0) {
			y = x[0].parentNode;
			z = x[0].innerHTML;
			txtNode = document.createTextNode(z);
			x[0].appendChild(txtNode);
			y.replaceChild(txtNode,x[0]);
		}
	}

	//making all the anchor tags visible
	var alinks = clList.getElementsByTagName("a");
	for(i=0;i<alinks.length;i++) {
		alinks[i].style.display="";
	}
	doFilterStateChange1();
}

function getInternetExplorerVersion() {
	var rv = -1; // Return value assumes failure.
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
			rv = parseFloat(RegExp.$1);
	}
	return rv;
}

//************End Class Quick Search*************//
