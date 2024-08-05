/*
 * Script name: ASFilter.js
 * Last Updated: 08/12/09
*/



/* ADDED FOR BUG # 2403366 */
try{
	window.onresize = function() { alignFloatLayers(); };
	window.onscroll = function() { alignFloatLayers(); };
	document.body.onresize = function() { alignFloatLayers(); };
	document.body.onscroll = function() { alignFloatLayers(); };
}catch(exception){}
var FloatLayers       = new Array();
var FloatLayersByName = new Array();

function addFloatLayer(n,offX,offY,spd){new FloatLayer(n,offX,offY,spd);}
function getFloatLayer(n){return FloatLayersByName[n];}
function alignFloatLayers(){for(var i=0;i<FloatLayers.length;i++)FloatLayers[i].align();}

function getXCoord(el) {
	x=0;
	while(el){
		x+=el.offsetLeft;
		el=el.offsetParent;
	}
	return x;
}
function getYCoord(el) {
	y=0;
	while(el){
		y+=el.offsetTop;
		el=el.offsetParent;
	}
	return y;
}

/////////////////////////////////////////////////////////////////////

FloatLayer.prototype.setFloatToTop=setTopFloater;
FloatLayer.prototype.setFloatToBottom=setBottomFloater;
FloatLayer.prototype.setFloatToLeft=setLeftFloater;
FloatLayer.prototype.setFloatToRight=setRightFloater;
FloatLayer.prototype.initialize=defineFloater;
FloatLayer.prototype.adjust=adjustFloater;
FloatLayer.prototype.align=alignFloater;

function FloatLayer(n, offX, offY, spd) {
	this.index=FloatLayers.length;

	FloatLayers.push(this);
	FloatLayersByName[n] = this;

	this.floatname    = n;
	this.floatX  = 0;
	this.floatY  = 0;
	this.tm      = null;
	this.steps   = spd;
	this.alignHorizontal=(offX>=0) ? leftFloater : rightFloater;
	this.alignVertical  =(offY>=0) ? topFloater : bottomFloater;
	this.ifloatX = Math.abs(offX);
	this.ifloatY = Math.abs(offY);
}

/////////////////////////////////////////////////////////////////////

function defineFloater(){
	this.layer  = document.getElementById(this.floatname);
	this.width  = this.layer.offsetWidth;
	this.height = this.layer.offsetHeight;
	this.prevX  = this.layer.offsetLeft;
	this.prevY  = this.layer.offsetTop;
}

function adjustFloater() {
	this.tm=null;
	if(this.layer.style.position!='absolute')return;

	var dx = Math.abs(this.floatX-this.prevX);
	var dy = Math.abs(this.floatY-this.prevY);

	if (dx < this.steps/2)
		cx = (dx>=1) ? 1 : 0;
	else
		cx = Math.round(dx/this.steps);

	if (dy < this.steps/2)
		cy = (dy>=1) ? 1 : 0;
	else
		cy = Math.round(dy/this.steps);

	if (this.floatX > this.prevX)
		this.prevX += cx;
	else if (this.floatX < this.prevX)
		this.prevX -= cx;

	if (this.floatY > this.prevY)
		this.prevY += cy;
	else if (this.floatY < this.prevY)
		this.prevY -= cy;

	this.layer.style.left = this.prevX+"px";
	this.layer.style.top  = this.prevY+"px";

	if (cx!=0||cy!=0){
		if(this.tm==null)this.tm=setTimeout('FloatLayers['+this.index+'].adjust()',50);
	}else
		alignFloatLayers();
}

function setLeftFloater(){this.alignHorizontal=leftFloater;}
function setRightFloater(){this.alignHorizontal=rightFloater;}
function setTopFloater(){this.alignVertical=topFloater;}
function setBottomFloater(){this.alignVertical=bottomFloater;}

function leftFloater(){var left = (document.documentElement && document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : document.body.scrollLeft;this.floatX = left + this.ifloatX;}
function topFloater(){var top = (document.documentElement && document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop;this.floatY = top + this.ifloatY;}
function rightFloater(){this.floatX = document.body.scrollLeft + document.body.clientWidth - this.ifloatX - this.width;}
function bottomFloater(){this.floatY = document.body.scrollTop + document.body.clientHeight - this.ifloatY - this.height;}

function alignFloater(){
	if(this.layer==null)this.initialize();
	this.alignHorizontal();
	this.alignVertical();
	if(this.prevX!=this.floatX || this.prevY!=this.floatY){
		if(this.tm==null)this.tm=setTimeout('FloatLayers['+this.index+'].adjust()',50);
	}
}
/* END OF BUG # 2403366 */


var g_user_prefs_loaded = false;
var g_filters_loaded = false;

//
// START UI code
//
var theHost=document.location.hostname;
/* Carlos: September change */
if(navigator.userAgent.toLowerCase().indexOf("msie 6") > -1 ){
    var isMSIE6 = true;
}else if (navigator.userAgent.toLowerCase().indexOf("msie") > -1 ){
    var isMSIE = true;
}

var pre_filter_content = ".......";
var filter_file = "filters.xml";

//probably should have made a tree structure out of the xml file...
runtime_array = new Array();
product_array = new Array();
rb_runtime_array = new Array();
rb_product_array = new Array();


function arrayEntry(name, defaultValue,topversion)
{
	this.name = name.toLowerCase();
	this.defaultValue = defaultValue.toLowerCase();
	this.topversion = topversion.toLowerCase();
};
function rb_arrayEntry(name, version, match, description)
{
	this.id = 'rb_'+name+'_'+version.replace(".", "_");
	this.name = name;
	this.version = version;
	this.matches = new Array();
	var index;
	if(match)
	for(index=0;index<match.length;index++)
	{
		var matchString = match[index].getAttribute("value");
		this.matches[this.matches.length] = matchString.toLowerCase();
	}
	this.description = description;
};


// put code into variables for different browsers 
/* Madhur
if ( isMSIE  || isMSIE6 ){ // for  IE
    var filterdiv = 
        '<table class="filterTable"><tr><td>Package and class filters:</td>'+
        '<td width="5%" align="right"><div id="runtimeLabel" onMouseOut="hideFilterPods(event, 1)"></div></td><td id="runtimes" align="left" style=" white-space:normal">' + pre_filter_content + '</td></tr>'+
        '<tr><td></td><td align="right" valign="top"><div id="productLabel"  onMouseOut="hideFilterPods(event, 2)"></div></td><td id="products" width="85%" style="white-space:normal">' + pre_filter_content + '</td></tr></table>';
}else{ // for non-IE
    var filterdiv = 
        '<table width=100% class="filterTable"><tr><td width="10%">Package and class filters:</td>'+
        '<td align="right" width="5%"><div id="runtimeLabel"  onMouseOut="hideFilterPods(event, 1)"></div></td><td width=100% style=" white-space:normal" align="left" id="runtimes">' + pre_filter_content + '</tr>'+
        '<tr><td></td><td align="right" valign="top" width="5%"><div id="productLabel"  onMouseOut="hideFilterPods(event, 2)"></div></td><td id="products" width="100%" style=" white-space:normal" align="left">' + pre_filter_content + '</td></tr></table>';
}

   var runtimespod = 
        '<div id="runtimespod" onMouseOut="hideFilterPods(event, 1)">'+
        ' <form id="runtimesForm">'+
        ' <div id="runtime_podblock">' +
         pre_filter_content +
         ' </div>'+
       ' </form>'+
        '</div>';

    var productspod = 
        '<div id="productspod" onMouseOut="hideFilterPods(event, 2)">'+
        ' <form id="productsForm">'+
        ' <div id="product_podblock">' +
         pre_filter_content +
         ' </div>'+ 
        ' </form>'+
        '</div>';

drawFilterPanel();
*/
//This is called  twice, once from loading of filters.xml file, once from code parsing url
//try to do most work only once.
function loadFilters(args)
{
	// get  user's preferences from the cookies if we haven't yet
	if(g_user_prefs_loaded != true)
	{
		getUserPrefs();

		// To show/hide filter bar
		if (getCookie("asdocs_filter_view") != "hidefilters" )
			showHideFiltersCookie(true);
		else
			showHideFiltersCookie(false);
		
		g_user_prefs_loaded = true;
	}
	var filterStart = 0;
	if((filterStart =args.indexOf("filter_"))!=-1)
	{
		var filterArgs = args.substring(filterStart);
		var anchorStart = filterArgs.indexOf("#");
		if(anchorStart != -1)
			filterArgs = filterArgs.substring(0, anchorStart);
		anchorStart = filterArgs.indexOf("%23");
		if(anchorStart != -1)
			filterArgs = filterArgs.substring(0, anchorStart);
		setFiltersWithURLArgs(filterArgs);
		getUserPrefs();
	}
		
	//update only once unless second time has changes in filters
	if(args.indexOf("filter_")!=-1 || !g_filters_loaded)
	{
		g_filters_loaded = true;
		updateState("runtime");
		updateState("product");
		doFilterStateChange1();
	}
}

var currentArgs = "";
function getFilterContent(xmlFile, args){
	currentArgs = args;
 	var fileLocation = new String(this.location);
 	//vary based on river builds or live.
 	var pathLookupString = "actionscript/3/";
	var baseIndex = fileLocation.indexOf(pathLookupString);
	if(baseIndex == -1)
	{
		pathLookupString = "langref/";
		baseIndex = fileLocation.indexOf(pathLookupString);
	}
		
	fileLocation = fileLocation.substring(baseIndex+pathLookupString.length);
	fileLocation = fileLocation.split("#!")[0];
	//build baseref based on number of directories up	
	var baseRef = '';
	var index;
	while((index = fileLocation.indexOf('/')) != -1)
	{
		fileLocation = fileLocation.substring(index+1);
		baseRef += '../';
	}
	xmlFile = baseRef+xmlFile;

    if( window.ActiveXObject && /Win/.test(navigator.userAgent) && window.location.protocol == "file:" ){
        
    /* xml data island approach ******
       try{ 
        
        var xml = document.getElementById("xmlId");

        var xmlDocument = xml.XMLDocument;

        alert(xmlDocument.xml);
       }catch(ex){
        alert("ex:"+ex.message);
       }
        loadFilter(xmlDocument);
        
        *************/
        
       var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        
		try{
			 xmlDoc.async="true"; 
			 //xmlDoc.onreadystatechange=verify; 
			 xmlDoc.load(xmlFile); 
			 
		}catch(ex){
		  
		  alert("exception:"+ex.message);
		  
        }
		loadFilter(xmlDoc);
		
    }else{
        
    	ajaxGet(xmlFile, loadFilter);
   	}
	
}

function loadFilter(myRequest){
    rb_runtime_array = new Array();
   	rb_product_array = new Array();
    if(window.location.protocol == "file:" && /Microsoft/.test(navigator.appName) )
    {   
		parseXML(myRequest.getElementsByTagName("filters")[0].getElementsByTagName("runtimes")[0], "runtime", "Runtimes", rb_runtime_array, runtime_array);
		parseXML(myRequest.getElementsByTagName("filters")[0].getElementsByTagName("products")[0], "product", "Products", rb_product_array, product_array);
//		document.getElementById('runtimespod').style.visibility = "hidden";
//    	document.getElementById('productspod').style.visibility = "hidden";
    }else{
		parseXML(myRequest.responseXML.getElementsByTagName("filters")[0].getElementsByTagName("runtimes")[0], "runtime", "Runtimes", rb_runtime_array, runtime_array);
		parseXML(myRequest.responseXML.getElementsByTagName("filters")[0].getElementsByTagName("products")[0], "product", "Products", rb_product_array, product_array);
//		document.getElementById('runtimespod').style.visibility = "hidden";
//    	document.getElementById('productspod').style.visibility = "hidden";
   	}
    loadFilters(currentArgs);      	
   	doFilterStateChange1();
	mainmenu();
	var urltext = document.URL;
	if(	urltext.indexOf('/cs_CZ/') == -1 &&
		urltext.indexOf('/de_DE/') == -1 &&
		urltext.indexOf('/es_ES/') == -1 &&
		urltext.indexOf('/fr_FR/') == -1 &&
		urltext.indexOf('/it_IT/') == -1 &&
		urltext.indexOf('/ja_JP/') == -1 &&
		urltext.indexOf('/ko_KR/') == -1 &&
		urltext.indexOf('/nl_NL/') == -1 &&
		urltext.indexOf('/pl_PL/') == -1 &&
		urltext.indexOf('/pt_BR/') == -1 &&
		urltext.indexOf('/ru_RU/') == -1 &&
		urltext.indexOf('/sv_SE/') == -1 &&
		urltext.indexOf('/tr_TR/') == -1 &&
		urltext.indexOf('/zh_CN/') == -1 &&
		urltext.indexOf('/zh_TW/') == -1
	){
		$('#nav a#RuntimesMenu, #nav a#ProductsMenu').css({"width": "80px"});
		$('#nav li#ProductsMenu > ul, #nav li#RuntimesMenu > ul').css({"left": "90px"});
		$('#products').css({"width": "92%"});
	}

	/* #2775723. Page was not scrolling to the anchor in IE7 */
	if(window.location.href.indexOf("#") != -1){
	    document.location = window.location.href;
	}
}

function parseXML(xmlNode, nodeName, uiName, rb_array, element_array)
{
    
	var blockStart = '<li><a href="#" id="%%filter_submenu" class="%%submenu"><input type="checkbox" id="rb_%%name" checked=""/>%%heading</a><ul>';
	var blockEnd = ' </ul></li>';
	if(uiName=="Runtimes"){
		var divStart = '<ul id="nav"><li id="'+uiName+'Menu"><a href="#" id="'+uiName+'Menu"><input type="checkbox"id="rb_'+nodeName+'" checked=""/>'+runtimesLabel+'</a><ul>';
	}
	else{
		var divStart = '<ul id="nav"><li id="'+uiName+'Menu"><a href="#" id="'+uiName+'Menu"><input type="checkbox"id="rb_'+nodeName+'" checked=""/>'+productsLabel+'</a><ul>';
	}
	var divEnd = '</ul></li></ul>'

	var radioString;
	if( isMSIE  || isMSIE6 )	
		radioString = '<li %%styleNone><a href="#"><input type="radio" name="%%name" class="ieFilterRadio"  id="rb_%%name_%%version" onclick="updateStateOnClick(\''+nodeName+'\');updateState(\''+nodeName+'\');doFilterStateChange1();">%%description</a></li>';
	else
		radioString = '<li %%styleNone><a href="#"><input type="radio" name="%%name" class="filterRadio" id="rb_%%name_%%version" value="%%name %%version" onchange="updateStateOnClick(\''+nodeName+'\');updateState(\''+nodeName+'\');doFilterStateChange1();" checked="">%%description</a></li>';
            
	var podBlockString = '';
	
	podBlockString += divStart;
	
	var items = xmlNode.getElementsByTagName(nodeName);
	
	for(i=0;i<items.length;i++)
	{
		var currentItems = items[i];
		var name=currentItems.getAttribute('name').toLowerCase();
		var heading=currentItems.getAttribute('heading');
		var versions = currentItems.getElementsByTagName("versions")[0].getElementsByTagName("version");
		if(versions.length==2){
			podBlockString += (((blockStart.replace(/%%name/g,name)).replace(/%%heading/g,heading)).replace(/%%submenu/g,"heading_noexists")).replace(/%%filter_submenu/g,"filter_nosubmenu");
		}
		else{
			podBlockString += (((blockStart.replace(/%%name/g,name)).replace(/%%heading/g,heading)).replace(/%%submenu/g,"heading_exists_exp")).replace(/%%filter_submenu/g,"filter_submenu");;
		}
		element_array[element_array.length] = new arrayEntry(currentItems.getAttribute('name'),currentItems.getAttribute('default'),currentItems.getAttribute('topversion'));
		for(j=0;j<versions.length;j++)
		{
			var versionNode = versions[j];
			var version=versionNode.getAttribute('name').toLowerCase();
			var description=versionNode.getElementsByTagName('description')[0].childNodes[0].nodeValue;
			var match=versionNode.getElementsByTagName('match');
			rb_array[rb_array.length] = new rb_arrayEntry(name, version, match, description);
			
			var currentRadioString = radioString;
			currentRadioString = currentRadioString.replace(/%%name/g,name);
			currentRadioString = currentRadioString.replace(/%%version/g,version.replace(".", "_"));
			currentRadioString = currentRadioString.replace(/%%description/g,description);
			if(version=="none")
				currentRadioString = currentRadioString.replace(/%%styleNone/g,'style="display: none;"');
			else
				currentRadioString = currentRadioString.replace(/%%styleNone/g,"");
			podBlockString += currentRadioString;
		}
		podBlockString += blockEnd;
  	}
	podBlockString += divEnd;
    document.getElementById(nodeName+'filter').innerHTML=podBlockString;

}


// draw filter panel
function drawFilterPanel()
{
	document.write('<div id="filter_panel_nf">' + filterdiv + '</div>');
	document.write('<style>#runtimespod{top:82px;}</style>');
	document.write('<style>#productspod{top:99px;}</style>');
	document.write( runtimespod );
	document.write( productspod );
}

 function setFiltersWithURLArgs(filterSettings)
{
	turnAllFiltersOff();
	while(filterSettings.length)
	{
		var currentSetting = filterSettings;
		var endIndex = -1;
		if((endIndex=filterSettings.indexOf('&'))!=-1)
			currentSetting = filterSettings.substring(0,endIndex);
		var currentNameEndIndex = currentSetting.indexOf("=");
		var currentName = currentSetting.substring(0, currentNameEndIndex);
		var currentValue = currentSetting.substring(currentNameEndIndex + 1);
		//set cookie
		if(currentName.indexOf("filter_" != -1))
		{
			setFilterCookie(currentName, currentValue);
			setRadioButtonState(currentName.substring('filter_'.length), currentValue, "checked");
		}
		if(endIndex > 0)
			filterSettings = filterSettings.substring(endIndex+1);
		else
			filterSettings = "";
	}
 }


function setFilterCookie(name, value)
{
    var expire = new Date();
    expire.setDate(expire.getDate()+90); // Cookie expires after 90 days
    
    //add in path to differentiate between beta and non version
    var fileLocation = new String(this.location);
 	//vary based on river builds or live.
 	var pathLookupString = "actionscript/3/";
	var baseIndex = fileLocation.indexOf(pathLookupString);
	if(baseIndex == -1)
	{
		pathLookupString = "langref/";
		baseIndex = fileLocation.indexOf(pathLookupString);
	}
	
	var path = fileLocation.substring(0,baseIndex);
	var arr = new Array();
	arr = path.split("/");
	arr[0] = "";
	arr[1]="";
	arr[2]="";
	path = arr.join("/");
	path = path.substring(2);
 
    var pathDomainString="path="+path+";";
    if(navigator.userAgent.indexOf("Firefox")!=-1){
        pathDomainString = "path="+path+";domain="+theHost+";";
	}else if(navigator.userAgent.indexOf("Community Help Client")!=-1){
		pathDomainString = "path=/;";
	}else if(location.protocol == "file:"){
	   pathDomainString = "path=/;";
	}
	
     document.cookie = name.toLowerCase()+'='+ value.toLowerCase() + ';'+ pathDomainString+"expires=" + expire.toGMTString();
     if (typeof(localStorage) != 'undefined'){
		localStorage.setItem(name.toLowerCase(), value.toLowerCase());
	}
}

function setRadioButtonState(rbName, rbValue, state)
{
    var radioButtonName = "rb_" + rbName + "_" + rbValue.replace(".", "_");
     if(document.getElementById(radioButtonName))
        document.getElementById(radioButtonName).checked = state;
}

function turnAllFiltersOff()
{
    turnRuntimeFiltersOff();
    turnProductFiltersOff();
}

function turnRuntimeFiltersOff()
{
	for(i=0; i<rb_runtime_array.length;i++)
	{
    	setFilterCookie("filter_"+rb_runtime_array[i].name, "none");
    	setRadioButtonState(rb_runtime_array[i].name, "none", "checked");
    }
}

function turnProductFiltersOff()
{
	for(i=0; i<rb_product_array.length;i++)
	{
    	setFilterCookie("filter_"+rb_product_array[i].name, "none");
    	setRadioButtonState(rb_product_array[i].name, "none", "checked");
    }
}


// update arrays and cookies after a click on a filter
// use that info when exiting filter to update description 
//
function updateStateOnClick(stateType){
	try{
      var rb_array;
	 
    if(stateType.indexOf("runtime")!=-1)
    {
    	rb_array = rb_runtime_array;
    }
    else
    {
    	rb_array = rb_product_array;
    }
    for(i=0; i<rb_array.length;i++)
    {
    	if ( document.getElementById(rb_array[i].id).checked )
    	{
        	setFilterCookie("filter_"+rb_array[i].name, rb_array[i].version);
 
	}
   }

	}catch(e)
	{}
}
//
// update runtimes list after changes
//
function updateState(stateType){
	try{
    var startDescriptionString = "";
    var descriptionString = "";
  var descriptionSet = false;
  var elementString;
  
     var rb_array;
	 
    if(stateType.indexOf("runtime")!=-1)
    {
    	startDescriptionString = "<font color='blue' onMouseOver='showFilterPods(1)'>"+runtimesLabel+": </font>";
    	//descriptionString = startDescriptionString;
		//document.getElementById("runtimeLabel").innerHTML = startDescriptionString;
    	rb_array = rb_runtime_array;
    	elementString = "runtimes";
    }
    else
    {
    	startDescriptionString = "<font color='blue' onMouseOver='showFilterPods(2)'>"+productsLabel+": </font>";
    	//descriptionString = startDescriptionString;
		//document.getElementById("productLabel").innerHTML = startDescriptionString;
    	rb_array = rb_product_array;
    	elementString = "products";
    }
    for(i=0; i<rb_array.length;i++)
	{
    	if ( document.getElementById(rb_array[i].id).checked )
    	{
 	  	    if(rb_array[i].version.indexOf("none")==-1)
 	       	{
 	       		if(descriptionSet == true)
 	       			descriptionString += ", ";
 	  	       	descriptionString += rb_array[i].description;
 	       		descriptionSet = true;
  	       	}
  	    }
   }

    if ( !descriptionSet )
        descriptionString = noneLabel;
    document.getElementById(elementString).innerHTML = descriptionString;
	if(descriptionString.length > 145){
		var shortstr=descriptionString.substring(0,145);
		var lastind=shortstr.lastIndexOf(",");
		document.getElementById(elementString).innerHTML = descriptionString.substring(0,lastind)+"...";
		document.getElementById(elementString).title = descriptionString;
	}
	else{
		document.getElementById(elementString).innerHTML = descriptionString;
		document.getElementById(elementString).title = descriptionString;
	}
	}catch(e)
	{}
}

/*
 * Start UI Functions
 */
//
// handle pods states
//
function showFilterPods(filterType) {
	if (filterType == 1) {
		pod = document.getElementById('runtimespod');
		if (pod.style.visibility != "visible") {
			document.getElementById('runtimes').style.color="blue";
			showRuntimes();
		}
	} else if (filterType == 2) {
		pod = document.getElementById('productspod');
		if (pod.style.visibility != "visible") {
			document.getElementById('products').style.color="blue";
			showProducts();
		}
	}
}

function hideFilterPods(event, filterType) {
	curEl = document.elementFromPoint(event.clientX,event.clientY); 

	if (filterType == 1) {
		filterText = document.getElementById('runtimes');
		pod = document.getElementById('runtimespod');
		
		if (filterText.contains) {
			if (!filterText.contains(curEl) && !pod.contains(curEl)) {
				filterText.style.color="black";
				hideRuntimes();
			}
		} else {
			if (((filterText.compareDocumentPosition(curEl) & 16) == 0) 
				&& ((pod.compareDocumentPosition(curEl) & 16) == 0)
				&& curEl != filterText
				&& curEl != pod) {
				filterText.style.color="black";
				hideRuntimes();
			}
		}
	} else if (filterType == 2) {
		filterText = document.getElementById('products');
		pod = document.getElementById('productspod');

		if (filterText.contains) {
			if (!filterText.contains(curEl) && !pod.contains(curEl)) {
				filterText.style.color="black";
				hideProducts();
			}
		} else {
			if (((filterText.compareDocumentPosition(curEl) & 16) == 0) 
				&& ((pod.compareDocumentPosition(curEl) & 16) == 0)
				&& curEl != filterText
				&& curEl != pod) {
				filterText.style.color="black";
				hideProducts();
			}
		}
	}
}

function toggleRuntimes(){
    pod = document.getElementById('runtimespod');
    if ( pod.style.visibility == "hidden" ){
        hideProducts();
        document.getElementById('runtimes').style.backgroundImage="url('/en_US/shared/ahpods/images/filter_show.png')" ;
        pod.style.visibility = "visible";
    }else{
        hideRuntimes(); 
    }
    doFilterStateChange1();
}

function showRuntimes(){
    pod = document.getElementById('runtimespod');
    document.getElementById('runtimes').style.backgroundImage="url('/en_US/shared/ahpods/images/filter_show.png')" ;
	pod.style.visibility = "visible";
}

function hideRuntimes(){
    updateState("runtime");
    document.getElementById('runtimes').style.backgroundImage="url('/en_US/shared/ahpods/images/pod_hide.png')" ;
	document.getElementById('runtimes').style.color="black";
    document.getElementById('runtimespod').style.visibility = "hidden";
	doFilterStateChange1();
}

function toggleProducts(){
    var pod = document.getElementById('productspod');
    if ( pod.style.visibility == "hidden" ){
        hideRuntimes(); 
        document.getElementById('products').style.backgroundImage="url('/en_US/shared/ahpods/images/filter_show.png')" ;
        pod.style.visibility = "visible";
    }else{
        hideProducts(); 
    }
    doFilterStateChange1();
}

function showProducts(){
    var pod = document.getElementById('productspod');
    document.getElementById('products').style.backgroundImage="url('/en_US/shared/ahpods/images/filter_show.png')" ;
    pod.style.visibility = "visible";
}

function hideProducts(){
    updateState("product");
    document.getElementById('products').style.backgroundImage="url('/en_US/shared/ahpods/images/pod_hide.png')" ;
	document.getElementById('products').style.color="black";
    document.getElementById('productspod').style.visibility = "hidden";
	doFilterStateChange1();
}

//
// handle filter panel states
//
function toggleFilterPanel(){
    if ( document.getElementById("filter_panel").style.display == "none" ){
        showFilterPanel();
    }else{
        hideFilterPanel();
    }    
}
function hideFilterPanel(){
    hideRuntimes();
    hideProducts();
    doFilterStateChange1();
	try{
    document.getElementById("filter_panel").style.display = "none" ;
    document.getElementById("img_filter_handle").src = "/en_US/shared/ahpods/images/filter_show.png" ;
    document.getElementById("showhidefilters").innerHTML = "Show filters";
    document.cookie = "ASFilter=hidden;path=/";
    if ( isMSIE ){
        document.getElementById("filterSpacer").style.height = "0px"; 
    }else{
        document.getElementById("filterSpacer").style.height = "10px"; 
    }
	}catch(e)
	{
	}
}
function showFilterPanel(){
	try{
    document.getElementById("filter_panel").style.display = "block" ;
    document.getElementById("img_filter_handle").src = "/en_US/shared/ahpods/images/filter_hide.png" ;
    document.getElementById("showhidefilters").innerHTML = "Hide filters";
    document.cookie = "ASFilter=visible;path=/";
    if ( isMSIE ){
        document.getElementById("filterSpacer").style.height = "70px"; 
    
    }else{
        document.getElementById("filterSpacer").style.height = "80px";
    }
	}catch(e)
	{
	}
}

// No frames
function toggleFilterPanelNF(){
    if ( document.getElementById("filter_panel_nf").style.display == "none" ){
        showFilterPanelNF();
    }else{
        hideFilterPanelNF();
    }    
}
function showFilterPanelNF(){ /* Carlos: September change */
	try{
    document.getElementById("filter_panel_nf").style.display = "block" ;
    document.getElementById("img_filter_handle").src = "/en_US/shared/ahpods/images/filter_hide.png" ;
    document.getElementById("showhidefilters").innerHTML = "Hide filters";
    if ( isMSIE ){
        document.getElementById("asfilterhandle_nf").style.top = "165px";
        document.getElementById("filterSpacer").style.height = "170px"; 

    
    }else{
        document.getElementById("asfilterhandle_nf").style.top = "165px";
        document.getElementById("filterSpacer").style.height = "180px";

    }
    document.cookie = "ASFilter=visible;path=/";
	}catch(e)
	{
	}
}
function hideFilterPanelNF(){ /* Carlos: September change */
    hideRuntimes();
    hideProducts();
    doFilterStateChange1();
	try{
    document.getElementById("filter_panel_nf").style.display = "none" ;
    document.getElementById("img_filter_handle").src = "/en_US/shared/ahpods/images/filter_show.png" ;
    if ( isMSIE ){
        document.getElementById("filterSpacer").style.height = "100px"; 
    }else{
        document.getElementById("filterSpacer").style.height = "110px"; 
    }
	}catch(e)
	{
	}
    document.cookie = "ASFilter=hidden;path=/";
}



// getUserPrefs
// Reads the user preferences from the cookie and sets the radio buttons and filters accordingly
//
function getUserPrefs(){
    var cookie = document.cookie;
	var topstate = 0;
    if( cookie == null && typeof(localStorage) != 'undefined'){
    	cookie = "";
    	for(i=0; i<localStorage.length; i++){
    		var keyname = localStorage.key(i);
    		var keyvalue = localStorage.getItem(keyname);
    		cookie = cookie + keyname + "=" + keyvalue + "; ";
    	}
    }
         
    for(i=0; i<runtime_array.length;i++)
	{
		var index = cookie.indexOf("filter_"+runtime_array[i].name+'=');
		var checkBoxName = "rb_" + runtime_array[i].name;
    	if ( index > -1 )
    	{
    		var value = cookie.substring(index+("filter_"+runtime_array[i].name+'=').length);
    		var endIndex = value.indexOf(';');
    		value = value.substring(0,endIndex);
			if(value=="none"){
				if(document.getElementById(checkBoxName))
					document.getElementById(checkBoxName).checked = false;
			}
			else{
				if(document.getElementById(checkBoxName))
					document.getElementById(checkBoxName).checked = true;
				topstate = 1;
			}
			setRadioButtonState(runtime_array[i].name, value, "checked");
  	    }
  	    else{
			if(runtime_array[i].defaultValue=="none"){
				if(document.getElementById(checkBoxName))
					document.getElementById(checkBoxName).checked = false;
			}
			else{
				if(document.getElementById(checkBoxName))
					document.getElementById(checkBoxName).checked = true;
				topstate = 1;
			}
  	    	setRadioButtonState(runtime_array[i].name, runtime_array[i].defaultValue, "checked");
		}
   }
   if(topstate){
		if(document.getElementById('rb_runtime'))
			document.getElementById('rb_runtime').checked = true;
   }
   else{
		if(document.getElementById('rb_runtime'))
			document.getElementById('rb_runtime').checked = false;
   }
   topstate = 0;
   
    for(i=0; i<product_array.length;i++)
	{
		var cookie_name = "filter_"+product_array[i].name;
		cookie_name = cookie_name.toLowerCase();
		var index = cookie.indexOf(cookie_name+'=');
		var checkBoxName = "rb_" + product_array[i].name;
    	if ( index > -1 )
    	{
    		var value = cookie.substring(index+("filter_"+product_array[i].name+'=').length);
    		var endIndex = value.indexOf(';');
    		value = value.substring(0,endIndex);
			if(value=="none"){
				if(document.getElementById(checkBoxName))
					document.getElementById(checkBoxName).checked = false;
			}
			else{
				if(document.getElementById(checkBoxName))
					document.getElementById(checkBoxName).checked = true;
				topstate = 1;
			}
			setRadioButtonState(product_array[i].name, value, "checked");
  	    }
  	    else{
			if(product_array[i].defaultValue=="none"){
				if(document.getElementById(checkBoxName))
					document.getElementById(checkBoxName).checked = false;
			}
			else{
				if(document.getElementById(checkBoxName))
					document.getElementById(checkBoxName).checked = true;
				topstate = 1;
			}
  	    	setRadioButtonState(product_array[i].name, product_array[i].defaultValue, "checked");
		}
   }
   if(topstate){
		if(document.getElementById('rb_product'))
			document.getElementById('rb_product').checked = true;
   }
   else{
		if(document.getElementById('rb_product'))
			document.getElementById('rb_product').checked = false;
   }
}
/*
 * End UI Functions
 * END UI code
 */


function doFilterStateChangePackageList(){
	var pkgList = document.getElementById("packagelist");
	elements = pkgList.getElementsByTagName('tr');
	
    for(var i = 0; i < elements.length; i++)
    {
		node = elements[i];
		    if((!node.attributes['class']) || node.attributes['class'].nodeValue.indexOf('hideInherited')==-1)
		    {
		 if(isProductVisible(node) && isRuntimeVisible(node))
		    eval("node.style.display =''");
		 else
		    eval("node.style.display ='none'");
	    }
    }
}
//Updated on 6/2/09
//test and if a match for both product and runtime found turn on, else turn off element
function doFilterStateChange1()
{
    elements = document.getElementsByTagName('tr');
    for(var i = 0; i < elements.length; i++)
    {
		node = elements[i];
		if(isProductVisible(node) && isRuntimeVisible(node))
			eval("node.style.display =''");
		else
			eval("node.style.display ='none'");
    }
    
        elements = document.getElementsByTagName('span');
    for(var i = 0; i < elements.length; i++)
    {
        node = elements[i];
	if(node.attributes['id'] && node.attributes['id'].nodeValue=='pageFilter')
	{
		 if(isProductVisible(node) && isRuntimeVisible(node))
		    eval("node.style.display =''");
		 else
		    eval("node.style.display ='none'");
	}
    }
	
    elements = document.getElementsByName('ftr');
    for(var i = 0; i < elements.length; i++)
    {
        node = elements[i];
		if(node.attributes['runtime'] || node.attributes['product'])
		{
			 if(isProductVisible(node) && isRuntimeVisible(node)){
				var inputDiv = document.getElementById("cls_searchbox");
				if(inputDiv.value=='' || inputDiv.value==inputDiv.defaultValue){
					eval("node.style.display =''");
				}else{
				}
			 }else
				eval("node.style.display ='none'");
		}
    }
	
    if(location.href.indexOf("package-detail.html") > 0 )
    {
        setRowColorForPackage("Property");
        setRowColorForPackage("Function");
        setRowColorForPackage("Constant");
        setRowColorForPackage("Class");
        setRowColorForPackage("Interface");
    }else if(location.href.indexOf("package-summary.html") > 0){
    
        setRowColorForPackage("");
        
    }else if(location.href.indexOf("class-summary.html") > 0){
    
		setRowColorClassTableSummary();
        
    }else if(location.href.indexOf("all-index") > 0){
        setRowColorIndexTable();
        
    }else{
        setRowColorClassTables("Constant");
        setRowColorClassTables("ProtectedConstant");
        setRowColorClassTables("Property");
        setRowColorClassTables("ProtectedProperty");
        setRowColorClassTables("Method");
        setRowColorClassTables("ProtectedMethod");
        setRowColorClassTables("Event");
        setRowColorClassTables("commonStyle");
        setRowColorClassTables("sparkStyle");
        setRowColorClassTables("haloStyle");
        setRowColorClassTables("mobileStyle");
        setRowColorClassTables("SkinPart");
        setRowColorClassTables("SkinState");
        setRowColorClassTables("Effect");
    }  
    
   
}

/*
In Package-details.html  page there are some class, property & Functions tables. 
Whenever filters are applied then sometimes alternate coloring of rows get distorted.
This function apply alternating coloring on only those rows which are visible
2. Table in Package-summary.html is also fixed thru this code.
*/
function setRowColorForPackage(selectorText)
{
    
    var table = findObject("summaryTableId" + selectorText);

    if(table != null)
    { 
            var rowNum = 0;
             for(j=1;j<table.rows.length;j++)
             {
//                alert(table.rows[j].style.display);
                if(table.rows[j].style.display.indexOf('none') == -1)
                {
                    
                    rowNum++;
                    table.rows[j].className = (rowNum % 2 == 0) ? "prow0" : "prow1";
                }
            }
    }
   
}
/*
function for getting elements by classname because IE8 does not support getelementsbyclassname.
*/
function getElementsByClassName(node,classname) {
  if (node.getElementsByClassName) { // use native implementation if available
    return node.getElementsByClassName(classname);
  } else {
    return (function getElementsByClass(searchClass,node) {
        if ( node == null )
          node = document;
        var classElements = [],
            els = node.getElementsByTagName("*"),
            elsLen = els.length,
            pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;

        for (i = 0, j = 0; i < elsLen; i++) {
          if ( pattern.test(els[i].className) ) {
              classElements[j] = els[i];
              j++;
          }
        }
        return classElements;
    })(classname, node);
  }
}
/*
Function for setting alternate row colors in the table for class-summary.html page.
*/
function setRowColorClassTableSummary()
{
	var elements = getElementsByClassName(document, "summaryTable");
	var table = elements[0];
    if (table != null)
    {
        var rowNum = 0;
        for (var i = 1; i < table.rows.length; i++)
        {
            if(table.rows[i].style.display.indexOf('none') == -1)
            {
                rowNum++;
                table.rows[i].className = (rowNum % 2 == 0) ? "prow0" : "prow1";
            }
        }
    }
}

/*
In all classes there are Tables of Events, methods, properties etc with alternating row color.
Whenever filters are applied, for some tables alternative row coloring get distorted.
This function apply alternating coloring only on visible rows.
*/
function setRowColorClassTables(selectorText)
{
    var rowColor = "#F2F2F2";
    var table = findObject("summaryTable" + selectorText);
    if (table != null)
    {
        var show = getCookie("showInherited" + selectorText) == 'true';
        var rowNum = 0;
        for (var i = 1; i < table.rows.length; i++)
        {
            if(show)
            {
                if(table.rows[i].style.display.indexOf('none') == -1)
                {
                    rowNum++;
                    table.rows[i].bgColor = (rowNum % 2 == 0) ? rowColor : "#FFFFFF";
                }        
            }else{
                
                if(table.rows[i].className.indexOf('hideInherited') == -1)
                {
                    if(table.rows[i].style.display.indexOf('none') == -1)
                    {
                        rowNum++;
                        table.rows[i].bgColor = (rowNum % 2 == 0) ? rowColor : "#FFFFFF";
                    }
                }
                
            }
            
        }
    }
    
}
/*
    This function apply Altenating row colors to only visible rows after filters are applied.
    This function apply on Index page.
*/
function setRowColorIndexTable(){

    var table = findObject("tbl1");
    var rowNum = 1;
    if(table != null)
    {
        for(var i=1;i<table.rows.length;i++)
        {
            if(table.rows[i].style.display.indexOf('none') == -1)
            {
                rowNum++;
                //table.rows[i].className = ((rowNum % 4 == 1) || (rowNum % 4 == 2)) ? "even" : "odd";
                table.rows[i].className = (rowNum % 4 < 2) ? "odd" : "even";
            }
        }
    }
}
/* 
	check for the existence of a product key, if there is one, 
	loop through the various products.
		if rb selected
			pull out the match elements, and see if one does
*/
function isProductVisible(node)
{
    if(node.attributes['product'])
    {
        var attributeValue = node.attributes['product'].nodeValue.toLowerCase();
        	
        var j, k;

		for(j = 0; j<rb_product_array.length;j++)
		{     	
			var radioButtonName = rb_product_array[j].id;
			if(!rb_product_array[j].rb)
				rb_product_array[j].rb = document.getElementById(radioButtonName);
			if(rb_product_array[j].rb && rb_product_array[j].rb.checked)
			{
				if(rb_product_array[j].matches)
					for(k=0;k<rb_product_array[j].matches.length;k++)
					{
						var matchString = rb_product_array[j].matches[k].toLowerCase();
						var productMatch = attributeValue.indexOf(matchString);
						if(productMatch != -1)
						{
							return true;
							}
					}
			}
		 }
	 }
    else //if no product
        return true;
        
    return false;
}

// need to have checked product first, if that is true, then do this
//if node matches either runtime, no runtime listed, or none selected, return true
function isRuntimeVisible(node)
{
    if(node.attributes['runtime'])
    {
        //if nothing checked return true except if there's no product, then it's false
        var somethingChecked = false;
        for(j = 0; j<runtime_array.length;j++)
		{ 
        	var noneRadioButtonName = "rb_"+runtime_array[j].name+"_none";
        	if(!document.getElementById(noneRadioButtonName).checked)
        		somethingChecked = true;
        }
        
        if(!somethingChecked)
            if(node.attributes['product'])
                return true;
            else
                return false;
                
       var attributeValue = node.attributes['runtime'].nodeValue.toLowerCase();
       var j, k;

		for(j = 0; j<rb_runtime_array.length;j++)
		{     	
			var radioButtonName = rb_runtime_array[j].id;
			if(!rb_runtime_array[j].rb)
				rb_runtime_array[j].rb = document.getElementById(radioButtonName);
			if(rb_runtime_array[j].rb && rb_runtime_array[j].rb.checked)
			{
				if(rb_runtime_array[j].matches)
					for(k=0;k<rb_runtime_array[j].matches.length;k++)
					{
						var matchString = rb_runtime_array[j].matches[k].toLowerCase();
						var productMatch = attributeValue.indexOf(matchString);
						if(productMatch != -1)
							return true;
					}
			}
		 }
 	}
    else //if no product
        return true;
        
    return false;

}
