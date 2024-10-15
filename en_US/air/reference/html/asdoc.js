var ECLIPSE_FRAME_NAME="ContentViewFrame";
var eclipseBuild=false;
var liveDocsBaseUrl="http://livedocs.adobe.com/flex/3";
var liveDocsBookName="langref";
var terms_HELPCFG="PlatformASLR.helpcfg";
var splitterActiveFlag=false;
var splitterObj=false;
var h_splitterActiveFlag=false;
var h_splitterObj=false;
var MIN_LEFT=60;
var MIN_RIGHT=200;
var MIN_TOP=60;
var MIN_BOTTOM=60;
var use_robohelp_behavior=false;
var agt=navigator.userAgent.toLowerCase();
function HideEmptyRows(){var d=document.getElementsByName("rowLink");
var b;
var c=document.getElementById("tbl1");
var a=c.rows.length;
for(b=a-1;
b!=0;
b--){if(c.rows[b].getAttribute("name")=="rowLink"){if(c.rows[b].getElementsByTagName("td")[0].innerHTML.replace(/^\s+|\s+$/g,"")==""){c.deleteRow(b+1);
c.deleteRow(b)
}}}}function alternate(f){HideEmptyRows();
if(document.getElementsByTagName){var d=document.getElementById(f);
var e=d.getElementsByTagName("tr");
var c=e.length-1;
var b="odd";
var a=0*1;
for(i=1;
i<e.length;
i++){if(b=="odd"){if((a*1)<(i*1)&&i<e.length-3){e[i].className="even";
a=1*i;
if((i+1)<=e.length&&i<e.length-3){a=1*(i+1);
e[a].className="even";
b="even"
}}}else{if((a*1)<(i*1)&&i<e.length-3){e[i].className="odd";
a=1*i;
if(i!=1&&(i+1)<=e.length&&i<e.length-3){a=1*(i+1);
e[a].className="odd";
b="odd"
}}}}}}function noFrms(){var d=parent.frames.classFrame.location.href.substring(window.location.href.lastIndexOf("/")+1);
if(d=="search.html"){var c=window.top.location.href.split("?");
var a;
if(c[1]!=null){c=c[1].split("#");
var b=c[1];
c=c[0].split("&amp;");
a=window.top.location.href.substring(0,window.top.location.href.lastIndexOf("?")+1);
a=a.substring(0,a.lastIndexOf("/")+1)+"search.html#"+b
}else{c[0]="index.html";
a=window.top.location.href.substring(0,window.top.location.href.lastIndexOf("/")+1)+c[0]
}top.location=a
}else{top.location=top.classFrame.location
}}function searchfunctionsubmit(b){var a=document.getElementById("search-livedocs").value;
window.location=baseRef+"search.html###"+a
}function submitStandAloneSearchValue(){var a=document.getElementById("search-livedocs").value;
loadClassFrame("search.html?search="+a);
document.getElementById("subTitle").childNodes.item(0).data="Search Results";
return false
}function submitValue(g,e,d,c,f){var g=g;
var a=document.getElementById("search-livedocs").value;
g=encodeURIComponent(encodeURIComponent(g));
var b=/\./;
if(b.test(g)){g=g.replace(b,"%252E")
}if(document.getElementById("checkBoxId").checked){top.location.href="http://"+e+"?q="+escapeSpecialChars(a)+"&loc="+f+"&hl="+f+"&lbl="+d+"&go=Search&self=1&site="+c
}else{top.location.href="http://"+e+"?q="+escapeSpecialChars(a)+"&loc="+f+"&hl="+f+"&lbl="+d+"&go=Search&self=1"
}document.getElementById("subTitle").childNodes.item(0).data="";
return false
}function escapeSpecialChars(a){a=a.replace(/%/g,"%25");
a=a.replace(/!/g,"%21");
a=a.replace(/@/g,"%40");
a=a.replace(/#/g,"%23");
a=a.replace(/\$/g,"%24");
a=a.replace(/&/g,"%26");
a=a.replace(/\(/g,"%28");
a=a.replace(/\)/g,"%29");
a=a.replace(/\+/g,"%2B");
a=a.replace(/\[/g,"%5B");
a=a.replace(/\]/g,"%5D");
a=a.replace(/:/g,"%3A");
a=a.replace(/;/g,"%3B");
a=a.replace(/'/g,"%27");
a=a.replace(/\//g,"%2F");
a=a.replace(/\\/g,"%5C");
a=a.replace(/,/g,"%2C");
a=a.replace(/\s+/g,"+");
return a
}function addIonComments(b){var d=a();
function a(){var o="en-us";
var n=document.all?document.all.tags("meta"):document.getElementsByTagName?document.getElementsByTagName("meta"):new Array();
var g=new Array();
var k=0;
for(var e=0;
e<n.length;
e++){if(n[e].name=="lang"){o=n[e].content;
break
}}var h=/(..)-(..)/;
if(h.test(o)){var f=o.replace(h,"$1");
var l=o.replace(h,"$2");
o=f+"_"+l.toUpperCase()
}return o
}var c="ionComHere";
ionComAddLoadEvent(function(){var e=encodeURIComponent(window.location);
var f=e.replace(new RegExp(/%23(.*)/),"");
ionComments.setup(f,d,c,{siteArea:"help",productLabel:+b})
})
}function gotoHome(a){var b=window.location.href;
var c=b.replace(/title-bar\.html.*/,a);
if(c!=null){parent.top.location=c
}}function findObject(a){if(document.getElementById){return document.getElementById(a)
}if(document.all){return document.all[a]
}}function isEclipse(){return eclipseBuild
}function configPage(){var g=document.location.href.toString();
parameter_index=g.lastIndexOf("?");
var a="";
if(parameter_index!=-1){a=g.substring(parameter_index+1,g.length)
}if(a.indexOf("#")!=-1){a=a.replace(new RegExp(/#/),"%23")
}else{if(a.indexOf("%23")!=-1){a=a.replace(new RegExp(/%23/),"#")
}}setRowColorsInitial(true,"Property");
setRowColorsInitial(true,"Method");
setRowColorsInitial(true,"ProtectedMethod");
setRowColorsInitial(true,"Event");
setRowColorsInitial(true,"Style");
setRowColorsInitial(true,"SkinPart");
setRowColorsInitial(true,"SkinState");
setRowColorsInitial(true,"Constant");
if(isEclipse()){if(window.name!="classFrame"){var c=window.location.href.indexOf("?")!=-1?window.location.href.substring(0,window.location.href.indexOf("?")):window.location.href;
var b="doc/";
c=c.substring(c.indexOf(b)+b.length);
if(window.location.search!=""){c+=("#"+window.location.search.substring(1))
}window.location.replace(baseRef+"frames.html?"+c);
return
}else{setStyle(".eclipseBody","display","block");
if(window.location.hash!=""){window.location.hash=window.location.hash.substring(1)
}}}try{getFilterContent(filter_file,a)
}catch(f){}if(agt.indexOf("adobe help viewer 2")!=-1||agt.indexOf("community help client")!=-1){use_robohelp_behavior=true;
document.getElementById("gsa").style.display="none"
}}function loadFrames(d,b){var c=findObject("classListFrame");
if(c!=null&&classListFrameContent!=""){c.document.location.href=classListFrameContent
}if(isEclipse()){var a=findObject(ECLIPSE_FRAME_NAME);
if(a!=null&&d!=""){a.document.location.href=d
}}else{var e=findObject("classFrame");
if(e!=null&&classFrameContent!=""){e.document.location.href=classFrameContent
}}}function showTitle(a){if(!isEclipse()){top.document.title=a
}}function loadClassFrame(a){if(parent.frames.classFrame!=null){parent.frames.classFrame.location=a
}else{if(parent.frames.packageFrame!=null){if(parent.frames.packageFrame.frames.classFrame!=null){parent.frames.packageFrame.frames.classFrame.location=a
}}}}function loadClassListFrame(a){if(parent.frames.classListFrame!=null){parent.frames.classListFrame.location=a
}else{if(parent.frames.packageFrame!=null){if(parent.frames.packageFrame.frames.classListFrame!=null){parent.frames.packageFrame.frames.classListFrame.location=a
}}}}function loadPage(a){document.location.href=baseRef+a
}function gotoLiveDocs(b,d,a){if(a=="en-us"||a=="en_us"||a=="en_US"){a=""
}else{a="_"+a.substring(3)
}var c=liveDocsBaseUrl+a+"/"+liveDocsBookName+"/frames.html?"+b;
if(d!=null&&d!=""){c+=("&"+d)
}window.open(c,"mm_livedocs","menubar=1,toolbar=1,status=1,scrollbars=1,resizable=yes")
}function findTitleTableObject(a){if(isEclipse()){return parent.titlebar.document.getElementById(a)
}else{if(top.titlebar){return top.titlebar.document.getElementById(a)
}else{return document.getElementById(a)
}}}function titleBar_setSubTitle(a){if(isEclipse()||top.titlebar){findTitleTableObject("subTitle").childNodes.item(0).data=a
}}function titleBar_setSubNav(r,k,a,o,b,q,c,g,e,m,d,p,n,l,f,h){findTitleTableObject("propertiesLink").style.display=k?"inline":"none";
findTitleTableObject("propertiesBar").style.display=(k&&(p||g||e||n||c||a||q||r||d||l||f||h||m))?"inline":"none";
findTitleTableObject("packagePropertiesLink").style.display=p?"inline":"none";
findTitleTableObject("packagePropertiesBar").style.display=(p&&(g||e||n||c||a||r||q||d||l||f||h||m))?"inline":"none";
findTitleTableObject("constructorLink").style.display=g?"inline":"none";
findTitleTableObject("constructorBar").style.display=(g&&(e||n||c||a||q||r||d||l||f||h||m))?"inline":"none";
findTitleTableObject("methodsLink").style.display=e?"inline":"none";
findTitleTableObject("methodsBar").style.display=(e&&(n||c||a||q||r||d||l||f||h||m))?"inline":"none";
findTitleTableObject("packageFunctionsLink").style.display=n?"inline":"none";
findTitleTableObject("packageFunctionsBar").style.display=(n&&(c||a||q||r||d||l||f||h||m))?"inline":"none";
findTitleTableObject("eventsLink").style.display=c?"inline":"none";
findTitleTableObject("eventsBar").style.display=(c&&(a||q||r||d||l||f||h||m))?"inline":"none";
findTitleTableObject("stylesLink").style.display=a?"inline":"none";
findTitleTableObject("stylesBar").style.display=(a&&(q||r||d||l||f||h||m))?"inline":"none";
findTitleTableObject("SkinPartLink").style.display=o?"inline":"none";
findTitleTableObject("SkinPartBar").style.display=(o&&(b||q||r||d||l||f||h||m))?"inline":"none";
findTitleTableObject("SkinStateLink").style.display=b?"inline":"none";
findTitleTableObject("SkinStateBar").style.display=(b&&(q||r||d||l||f||h||m))?"inline":"none";
findTitleTableObject("effectsLink").style.display=q?"inline":"none";
findTitleTableObject("effectsBar").style.display=(q&&(r||d||l||f||h||m))?"inline":"none";
findTitleTableObject("constantsLink").style.display=r?"inline":"none";
findTitleTableObject("constantsBar").style.display=(r&&(d||l||f||h||m))?"inline":"none";
findTitleTableObject("packageConstantsLink").style.display=d?"inline":"none";
findTitleTableObject("packageConstantsBar").style.display=(d&&(l||f||h||m))?"inline":"none";
findTitleTableObject("interfacesLink").style.display=l?"inline":"none";
findTitleTableObject("interfacesBar").style.display=(l&&(f||h||m))?"inline":"none";
findTitleTableObject("classesLink").style.display=f?"inline":"none";
findTitleTableObject("classesBar").style.display=(f&&(h||m))?"inline":"none";
findTitleTableObject("packageUseLink").style.display=h?"inline":"none";
findTitleTableObject("packageUseBar").style.display=(h&&m)?"inline":"none";
findTitleTableObject("examplesLink").style.display=m?"inline":"none"
}function titleBar_gotoClassFrameAnchor(a){if(isEclipse()){parent.classFrame.location=parent.classFrame.location.toString().split("#")[0]+"#"+a
}else{location=location.toString().split("#")[0]+"#"+a
}}function setMXMLOnly(){if(getCookie("showMXML")=="false"){toggleMXMLOnly()
}}function toggleMXMLOnly(){var c=findObject("mxmlSyntax");
var b=findObject("showMxmlLink");
var a=findObject("hideMxmlLink");
if(c&&b&&a){if(c.style.display=="none"){c.style.display="block";
b.style.display="none";
a.style.display="inline";
setCookie("showMXML","true",new Date(3000,1,1,1,1),"/",document.location.domain)
}else{c.style.display="none";
b.style.display="inline";
a.style.display="none";
setCookie("showMXML","false",new Date(3000,1,1,1,1),"/",document.location.domain)
}}}function showHideInherited(){setInheritedVisible(getCookie("showInheritedConstant")=="true","Constant");
setInheritedVisible(getCookie("showInheritedProtectedConstant")=="true","ProtectedConstant");
setInheritedVisible(getCookie("showInheritedProperty")=="true","Property");
setInheritedVisible(getCookie("showInheritedProtectedProperty")=="true","ProtectedProperty");
setInheritedVisible(getCookie("showInheritedMethod")=="true","Method");
setInheritedVisible(getCookie("showInheritedProtectedMethod")=="true","ProtectedMethod");
setInheritedVisible(getCookie("showInheritedEvent")=="true","Event");
setInheritedVisible(getCookie("showInheritedcommonStyle")=="true","commonStyle");
setInheritedVisible(getCookie("showInheritedsparkStyle")=="true","sparkStyle");
setInheritedVisible(getCookie("showInheritedhaloStyle")=="true","haloStyle");
setInheritedVisible(getCookie("showInheritedmobileStyle")=="true","mobileStyle");
setInheritedVisible(getCookie("showInheritedSkinPart")=="true","SkinPart");
setInheritedVisible(getCookie("showInheritedSkinState")=="true","SkinState");
setInheritedVisible(getCookie("showInheritedEffect")=="true","Effect")
}function setInheritedVisible(a,c){try{if(document.styleSheets[0].cssRules!=undefined){var f=document.styleSheets[0].cssRules;
for(var b=0;
b<f.length;
b++){if(f[b].selectorText==".hideInherited"+c){f[b].style.display=a?"":"none"
}if(f[b].selectorText==".showInherited"+c){f[b].style.display=a?"none":""
}}}else{document.styleSheets[0].addRule(".hideInherited"+c,a?"display:inline":"display:none");
document.styleSheets[0].addRule(".showInherited"+c,a?"display:none":"display:inline")
}}catch(d){document.styleSheets[0].addRule(".hideInherited"+c,a?"display:inline":"display:none");
document.styleSheets[0].addRule(".showInherited"+c,a?"display:none":"display:inline")
}setCookie("showInherited"+c,a?"true":"false",new Date(3000,1,1,1,1),"/",document.location.domain);
setRowColors(a,c)
}function setRowColors(a,d){var f="#F2F2F2";
var c=findObject("summaryTable"+d);
if(c!=null){var e=0;
for(var b=1;
b<c.rows.length;
b++){if(c.rows[b].className.indexOf("hideInherited")==-1||a){if(c.rows[b].style.display.indexOf("none")==-1){e++;
c.rows[b].bgColor=(e%2==0)?f:"#FFFFFF"
}}}}}function setRowColorsInitial(a,d){var f="#F2F2F2";
var c=findObject("summaryTable"+d);
if(c!=null){var e=0;
for(var b=1;
b<c.rows.length;
b++){if(c.rows[b].className.indexOf("hideInherited")==-1&&!a){e++;
c.rows[b].bgColor=(e%2==0)?f:"#FFFFFF"
}}}}function setStyle(c,b,f){try{if(document.styleSheets[0].cssRules!=undefined){var g=document.styleSheets[0].cssRules;
for(var a=0;
a<g.length;
a++){if(g[a].selectorText==c){g[a].style[b]=f;
break
}}}else{document.styleSheets[0].addRule(c,b+":"+f)
}}catch(d){document.styleSheets[0].addRule(c,b+":"+f)
}}function setView(a){var b=new Date();
b.setDate(b.getDate()+90);
var c="path=/;";
if(navigator.userAgent.indexOf("Firefox")!=-1){var d=document.location.hostname;
c="path=/;domain="+d+";"
}/*document.cookie="asdocs_view="+a+";"+c+"expires="+b.toGMTString()*/
}var packagesLoaded=false,classesLoaded=false;
function loadPackagesList(d){document.getElementById("packagelist").innerHTML=d.responseText;
if(buildType!="jslr"){document.getElementById("pkg_searchbox").defaultValue=qsearchBoxLabel;
var a=navigator.userAgent.search("MSIE");
var c=getInternetExplorerVersion();
if(a>0&&c<9){document.getElementById("pkg_searchspan").style.display="none"
}else{document.getElementById("pkg_searchspan").style.display=""
}changeQSearchboxWidth()
}packagesLoaded=true;
try{if(classesLoaded){doFilterStateChange1()
}}catch(b){}setTimeout("restorePackageListScrollTop()",1000)
}function loadClassesList(f){if(buildType=="jslr"){document.getElementById("classlist").innerHTML=f.responseText
}else{document.getElementById("classlistoutline").innerHTML=f.responseText;
document.getElementById("cls_searchbox").defaultValue=qsearchBoxLabel;
var b=navigator.userAgent.search("MSIE");
var d=getInternetExplorerVersion();
if(b>0&&d<9){document.getElementById("cls_searchspan").style.display="none"
}else{document.getElementById("cls_searchspan").style.display=""
}if(getCookie("showAllClasses")=="yes"){allClassesLoaded=true;
var a=document.getElementById("cls_searchbox");
if(a.style.display!="none"&&a.value!=a.defaultValue&&a.value!=""){setTimeout("clsSearchOnKeyUp1()",500)
}}changeQSearchboxWidth()
}classesLoaded=true;
try{if(packagesLoaded){doFilterStateChange1()
}}catch(c){}setTimeout("restoreClassListScrollTop()",1000)
}function loadClassesList2(b){document.getElementById("classlist").innerHTML=b.responseText;
classesLoaded=true;
try{if(packagesLoaded){doFilterStateChange1()
}}catch(a){}setTimeout("restoreClassListScrollTop()",1000)
}function init(){document.getElementById("maincontainer").style.display="";
setTimeout("init1()",0)
}function init1(){restoreSplitterPos();
restoreHSplitterPos();
if(getCookie("asdocs_view")=="showtoc"){showHideTOC(true)
}else{showHideTOC(false)
}if(getCookie("showAllClasses")==""){setCookie("showAllClasses","no",new Date(3000,1,1,1,1),"/",document.location.domain)
}if(buildType.indexOf("jslr")==-1){ajaxGet(baseRef+"package-list.html",loadPackagesList)
}if(buildType.indexOf("jslr")!=-1){ajaxGet(baseRef+"all-classes.html",loadClassesList)
}else{if(location.href.indexOf("?allClasses=1")>0){if(getCookie("showAllClasses")=="yes"){ajaxGet(baseRef+"all-classes.html",loadClassesList)
}else{ajaxGet(baseRef+"all-classes-A.html",loadClassesList)
}}else{if((location.href.indexOf("mxml-tag-detail.html")>0)||(baseRef=="../"&&(location.href.indexOf("/mxml/")>0))){ajaxGet(baseRef+"mxml-tags.html",loadClassesList)
}else{if((baseRef=="")&&(location.href.indexOf("package-detail.html")>0||location.href.indexOf("package.html")>0)){ajaxGet(baseRef+"class-list.html",loadClassesList2)
}else{if(baseRef==""||baseRef=="./"){if(getCookie("showAllClasses")=="yes"){ajaxGet(baseRef+"all-classes.html",loadClassesList)
}else{ajaxGet(baseRef+"all-classes-A.html",loadClassesList)
}}else{if(location.href.indexOf("package-detail")>0){ajaxGet("class-list.html",loadClassesList2)
}else{if(getCookie("showAllClassesList")=="yes"){if(getCookie("showAllClasses")=="yes"){ajaxGet(baseRef+"all-classes.html",loadClassesList)
}else{ajaxGet(baseRef+"all-classes-A.html",loadClassesList)
}}else{ajaxGet("class-list.html",loadClassesList2)
}}}}}}}configPage();
scrollToNameAnchor();
if(window.location.href.indexOf("#")!=-1){document.location=window.location.href
}}function scrollToNameAnchor(){var a=window.location.href;
var b=a.split("nameAnchor=");
if(b[1]!=null){document.location=b[0]+"#"+b[1]
}}function ajaxGet(b,a){var d=false;
if(window.XMLHttpRequest&&!(window.ActiveXObject&&window.location.protocol=="file:")){d=new XMLHttpRequest()
}else{if(window.ActiveXObject){try{d=new ActiveXObject("Msxml2.XMLHTTP")
}catch(c){try{d=new ActiveXObject("Microsoft.XMLHTTP")
}catch(c){}}}else{alert("Your browser does not support XMLHTTP.");
return false
}}d.onreadystatechange=function(){if(d.readyState==4){if(d.status==200||d.status==0){a(d)
}}};
d.open("GET",b,true);
d.send(null)
}function showHideTOC(showTOC){var toc=document.getElementById("toc");
var splitter=document.getElementById("splitter");
var content=document.getElementById("content");
var plist=document.getElementById("packagelist");
var h_splitter=document.getElementById("h_splitter");
var clist=document.getElementById("classlist");
var showtoc=document.getElementById("showtoc");
var hidetoc=document.getElementById("hidetoc");
if(toc){if(!showTOC){eval("toc.style.display =''");
eval("splitter.style.display =''");
if(h_splitter){eval("h_splitter.style.display =''")
}content.style.left="6px";
eval("showtoc.style.display =''");
eval("hidetoc.style.display ='none'");
setView("hidetoc")
}else{eval("toc.style.display ='inline'");
eval("splitter.style.display ='inline'");
toc.style.width=(splitter.offsetLeft-20)+"px";
content.style.left=(splitter.offsetLeft+10)+"px";
if(h_splitter){eval("h_splitter.style.display ='inline'");
plist.style.height=(h_splitter.offsetTop-10)+"px";
clist.style.top=(h_splitter.offsetTop+4)+"px"
}eval("showtoc.style.display ='none'");
eval("hidetoc.style.display =''");
setView("showtoc")
}}}function splitterMouseDown(a,b){if(!splitterActiveFlag){if(b.setCapture){b.setCapture()
}else{document.addEventListener("mouseup",splitterMouseUp,true);
document.addEventListener("mousemove",splitterMouseMove,true);
a.preventDefault()
}splitterActiveFlag=true;
splitterObj=b
}}function changeQSearchboxWidth(){if(getInternetExplorerVersion()!="7"){spObj=document.getElementById("splitter");
var b=document.getElementById("pkg_searchbox");
var a=document.getElementById("cls_searchbox");
if(spObj.offsetLeft>220&&spObj.offsetLeft<265){if(b!=null){b.style.width=spObj.offsetLeft-138+"px"
}if(a!=null){a.style.width=spObj.offsetLeft-138+"px"
}}if(spObj.offsetLeft>=265){if(b!=null){b.style.width="127px"
}if(a!=null){a.style.width="127px"
}}if(spObj.offsetLeft<=220){if(b!=null){b.style.width="82px"
}if(a!=null){a.style.width="82px"
}}}}function splitterMouseUp(b){if(splitterActiveFlag){var a=document.getElementById("toc");
var c=document.getElementById("content");
changeQSearchboxWidth();
a.style.width=(splitterObj.offsetLeft-20)+"px";
c.style.left=(splitterObj.offsetLeft+10)+"px";
if(splitterObj.releaseCapture){splitterObj.releaseCapture()
}else{document.removeEventListener("mouseup",splitterMouseUp,true);
document.removeEventListener("mousemove",splitterMouseMove,true);
b.preventDefault()
}splitterActiveFlag=false;
saveSplitterPos()
}}function splitterMouseMove(a){if(splitterActiveFlag){if(a.clientX>=MIN_LEFT&&a.clientX<=document.documentElement.clientWidth-MIN_RIGHT){splitterObj.style.left=a.clientX+"px";
if(!splitterObj.releaseCapture){a.preventDefault()
}}}}function h_splitterMouseDown(a,b){if(!h_splitterActiveFlag){if(b.setCapture){b.setCapture()
}else{document.addEventListener("mouseup",h_splitterMouseUp,true);
document.addEventListener("mousemove",h_splitterMouseMove,true);
a.preventDefault()
}h_splitterActiveFlag=true;
h_splitterObj=b
}}function h_splitterMouseUp(b){if(h_splitterActiveFlag){var a=document.getElementById("packagelist");
var c=document.getElementById("classlist");
a.style.height=(h_splitterObj.offsetTop-10)+"px";
c.style.top=(h_splitterObj.offsetTop+4)+"px";
if(h_splitterObj.releaseCapture){h_splitterObj.releaseCapture()
}else{document.removeEventListener("mouseup",h_splitterMouseUp,true);
document.removeEventListener("mousemove",h_splitterMouseMove,true);
b.preventDefault()
}h_splitterActiveFlag=false;
saveHSplitterPos()
}}function h_splitterMouseMove(a){if(h_splitterActiveFlag){var b=a.clientY-document.getElementById("maincontainer").offsetTop;
if(b>=MIN_TOP&&a.clientY<=document.documentElement.clientHeight-MIN_BOTTOM){h_splitterObj.style.top=b+"px";
if(!h_splitterObj.releaseCapture){a.preventDefault()
}}}}function setStyle(c,f,b,e){var a=false;
try{if(c.style&&c.style.setProperty){c.style.setProperty(f,b,e);
a=true
}}catch(d){alert("exception caught setting style: "+d.message)
}if(!a){try{c.style[f]=b;
a=true
}catch(g){alert("exception caught setting direct style: "+g.message)
}}return a
}gFocusItem=null;
gLastFocusItem=null;
function doFocus(){if(gFocusItem!=null){gFocusItem.focus();
if(gLastFocusItem&&gLastFocusItem.className=="item focus"){gLastFocusItem.className="item"
}if(gFocusItem&&gFocusItem.className=="item"){gFocusItem.className="item focus"
}gLastFocusItem=gFocusItem;
gFocusItem=null
}}var ahpodjs="/en_US/shared/ahpods/AHPod.js";
document.write('<script src="'+ahpodjs+'"type="text/javascript" language="Javascript" charset="UTF-8"><\/script>');
function savePackageListScrollTop(){var a=document.getElementById("packagelist");
if(a){setCookie("packageListScrollTop",a.scrollTop,new Date(3000,1,1,1,1),"/",document.location.domain);
setCookie("classListScrollTop",0,new Date(3000,1,1,1,1),"/",document.location.domain)
}}function saveClassListScrollTop(){var a=document.getElementById("classlist");
if(a){setCookie("classListScrollTop",a.scrollTop,new Date(3000,1,1,1,1),"/",document.location.domain)
}}function restorePackageListScrollTop(){var a=getCookie("packageListScrollTop");
if(a){document.getElementById("packagelist").scrollTop=a
}}function restoreClassListScrollTop(){var a=getCookie("classListScrollTop");
if(a){document.getElementById("classlist").scrollTop=a
}}function saveSplitterPos(){var a=document.getElementById("splitter");
if(a){setCookie("splitterPosition",a.offsetLeft,new Date(3000,1,1,1,1),"/",document.location.domain)
}}function restoreSplitterPos(){var a=getCookie("splitterPosition");
if(a){document.getElementById("splitter").style.left=a+"px"
}}function saveHSplitterPos(){var a=document.getElementById("h_splitter");
if(a){setCookie("h_splitterPosition",a.offsetTop,new Date(3000,1,1,1,1),"/",document.location.domain)
}}function restoreHSplitterPos(){var a=document.getElementById("h_splitter");
if(a){var b=getCookie("h_splitterPosition");
if(b){a.style.top=b+"px"
}}}function setHrf(b){var c=b.title;
var a=new RegExp("./");
if(a.test(c)){b.href=baseRef+c
}else{c=c.replace(/\./g,"/");
b.href=baseRef+c+".html"
}}function svScrl(a){setCookie("showAllClassesList","yes",new Date(3000,1,1,1,1),"/",document.location.domain);
setHrf(a);
saveClassListScrollTop()
}function setHrfJSLR(a){var b=a.title;
b=b.replace(/\./g,"/");
if(b.search("\\(\\)")>0){titleSub=b.substr(b.lastIndexOf("/")+1);
b=b.replace(titleSub,"package.html#"+titleSub)
}else{b=b+".html"
}a.href=baseRef+b
}function svScrlJSLR(a){setHrfJSLR(a);
saveClassListScrollTop()
}var loadAllClassesRan=0;
var allClassesLoaded=false;
function saveAllClassesView(a){if(a=="more"){ajaxGet(baseRef+"all-classes.html",loadClassesList);
setCookie("showAllClasses","yes",new Date(3000,1,1,1,1),"/",document.location.domain);
loadAllClassesRan=1
}else{ajaxGet(baseRef+"all-classes-A.html",loadClassesList);
setCookie("showAllClasses","no",new Date(3000,1,1,1,1),"/",document.location.domain);
allClassesLoaded=false;
loadAllClassesRan=0
}}function clearAllClassesListCookie(){setCookie("showAllClassesList","no",new Date(3000,1,1,1,1),"/",document.location.domain)
}function quickFilterPackages(){var b=document.getElementById("pkg_searchbox").value;
var e=document.getElementById("packagelist");
var h=e.getElementsByTagName("a");
b=b.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");
var g=new RegExp(b,"i");
var k=0;
for(i=0;
i<h.length;
i++){var d;
if(h[i].textContent){d=h[i].textContent.match(g)
}else{d=h[i].innerText.match(g)
}if(h[i].className=="noqsearch"){h[i].style.display="none"
}else{if(h[i].id=="pkg_name"){}else{if(d!=null&&d.length>0&&h[i].parentNode.parentNode.style.display!="none"){k++;
var a=h[i].innerHTML;
h[i].innerHTML=a.replace(d[0],"<span class='highlightText'>"+d[0]+"</span>")
}else{if(h[i].id=="pkg_name"||h[i].id=="clear_search"){}else{h[i].style.display="none"
}}}}}if(k==0){var f=document.getElementById("pkg_txtMsg");
if(f==null){var c=document.createElement("div");
c.id="pkg_txtMsg";
c.innerHTML=qsearchText;
bPkg=document.getElementById("packagelist");
bPkg.appendChild(c)
}}}function pkgSearchBoxOnFocus(){var a=document.getElementById("pkg_searchbox");
if(a.value==a.defaultValue){a.value="";
a.style.color="rgb(0, 0, 0)"
}}function pkgSearchOnKeyUp(){var b=document.getElementById("pkg_searchbox");
if(b.value==""){document.getElementById("pkg_clear_search").className="search_inactive"
}else{document.getElementById("pkg_clear_search").className="search_active"
}var a=document.getElementById("pkg_searchbox").value.length;
if(a>=2){pkgClearHighlight();
quickFilterPackages()
}else{pkgClearHighlight()
}}function pkgSearchBoxOnBlur(){var a=document.getElementById("pkg_searchbox");
if(a.value==""){a.value=a.defaultValue;
a.style.color="rgb(170, 170, 170)";
document.getElementById("pkg_clear_search").className="search_inactive"
}}function pkgClearSearchButton(){document.getElementById("pkg_searchbox").value="";
document.getElementById("pkg_searchbox").focus();
pkgClearHighlight();
document.getElementById("pkg_clear_search").className="search_inactive"
}function pkgClearHighlight(){var a=document.getElementById("packagelist");
x=[];
var c=document.getElementById("pkg_txtMsg");
if(document.getElementById("pkg_txtMsg")!=null){pNode=document.getElementById("packagelist");
pNode.removeChild(c)
}if(navigator.userAgent.search("MSIE")>=0){xtemp=a.getElementsByTagName("span");
j=0;
for(i=0;
i<xtemp.length;
i++){if(xtemp[i].className=="highlightText"){x[j]=xtemp[i];
j++
}}for(i=0;
i<x.length;
i++){y=x[i].parentNode;
z=x[i].innerHTML;
txtNode=document.createTextNode(z);
x[i].appendChild(txtNode);
y.replaceChild(txtNode,x[i])
}}else{x=a.getElementsByClassName("highlightText");
while(x.length>0){y=x[0].parentNode;
z=x[0].innerHTML;
txtNode=document.createTextNode(z);
x[0].appendChild(txtNode);
y.replaceChild(txtNode,x[0])
}}var b=a.getElementsByTagName("a");
for(i=0;
i<b.length;
i++){b[i].style.display=""
}doFilterStateChange1()
}function quickFilterClassList(){var b=document.getElementById("cls_searchbox").value;
var k=document.getElementById("classlistoutline");
var h=k.getElementsByTagName("a");
var g=0;
b=b.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");
var f=new RegExp(b,"i");
for(i=0;
i<h.length;
i++){var d;
if(h[i].textContent){d=h[i].textContent.replace(/^\s\s*/,"").replace(/\s\s*$/,"").match(f)
}else{d=h[i].innerText.replace(/^\s\s*/,"").replace(/\s\s*$/,"").match(f)
}if(h[i].className=="noqsearch"){h[i].style.display="none"
}else{if(d!=null&&d.length>0&&h[i].style.display!="none"){g++;
var a=h[i].innerHTML;
h[i].innerHTML=a.replace(d[0],"<span class='clsHighlightText'>"+d[0]+"</span>")
}else{if(h[i].id=="cls_name"||h[i].id=="cls_clear_search"){}else{h[i].style.display="none"
}}}}if(g==0){var c=document.getElementById("cls_txtMsg");
if(c==null){var e=document.createElement("div");
e.id="cls_txtMsg";
e.innerHTML=qsearchText;
bCls=document.getElementById("classlistoutline");
bCls.appendChild(e)
}}}function clsSearchBoxOnFocus(){var a=document.getElementById("cls_searchbox");
if(a.value==a.defaultValue){a.value="";
a.style.color="rgb(0, 0, 0)"
}}function clsSearchOnKeyUp(){if(getCookie("showAllClasses")==null||getCookie("showAllClasses")=="no"||getCookie("showAllClasses")==""){if(loadAllClassesRan!=1){saveAllClassesView("more")
}}if(allClassesLoaded){clsSearchOnKeyUp1()
}}function clsSearchOnKeyUp1(){var b=document.getElementById("cls_searchbox");
if(b.value==""){document.getElementById("cls_clear_search").className="search_inactive"
}else{document.getElementById("cls_clear_search").className="search_active"
}var a=document.getElementById("cls_searchbox").value.length;
if(a>=2){clsClearHighlight();
quickFilterClassList()
}else{clsClearHighlight()
}}function clsSearchBoxOnBlur(){var a=document.getElementById("cls_searchbox");
if(a.value==""){a.value=a.defaultValue;
a.style.color="rgb(170, 170, 170)";
document.getElementById("cls_clear_search").className="search_inactive"
}}function clsClearSearchButton(){document.getElementById("cls_searchbox").value="";
document.getElementById("cls_searchbox").focus();
clsClearHighlight();
document.getElementById("cls_clear_search").className="search_inactive"
}function clsClearHighlight(){var a=document.getElementById("classlistoutline");
x=[];
var c=document.getElementById("cls_txtMsg");
if(document.getElementById("cls_txtMsg")!=null){pNode=document.getElementById("classlistoutline");
pNode.removeChild(c)
}if(navigator.userAgent.search("MSIE")>=0){xtemp=a.getElementsByTagName("span");
j=0;
for(i=0;
i<xtemp.length;
i++){if(xtemp[i].className=="clsHighlightText"){x[j]=xtemp[i];
j++
}}for(i=0;
i<x.length;
i++){y=x[i].parentNode;
z=x[i].innerHTML;
txtNode=document.createTextNode(z);
x[i].appendChild(txtNode);
y.replaceChild(txtNode,x[i])
}}else{x=a.getElementsByClassName("clsHighlightText");
while(x.length>0){y=x[0].parentNode;
z=x[0].innerHTML;
txtNode=document.createTextNode(z);
x[0].appendChild(txtNode);
y.replaceChild(txtNode,x[0])
}}var b=a.getElementsByTagName("a");
for(i=0;
i<b.length;
i++){b[i].style.display=""
}doFilterStateChange1()
}function getInternetExplorerVersion(){var c=-1;
if(navigator.appName=="Microsoft Internet Explorer"){var a=navigator.userAgent;
var b=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
if(b.exec(a)!=null){c=parseFloat(RegExp.$1)
}}return c
};