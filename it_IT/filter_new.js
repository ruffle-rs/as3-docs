function filterclick(stateType){
	updateStateOnClick(stateType);
	updateState(stateType);
	doFilterStateChange1();
	var element =  document.getElementById('cls_clear_search');
	if (typeof(element) != 'undefined' && element != null && element.className=='search_active')
	{
		clsClearSearchButton();
	}
	var element =  document.getElementById('pkg_clear_search');
	if (typeof(element) != 'undefined' && element != null && element.className=='search_active')
	{
		pkgClearSearchButton();
	}
}
function showHideFilters(){
	if(document.getElementById("filter_panel_float").style.display=="none"){
		showHideFiltersCookie(true);
	}                           
	else{                       
		showHideFiltersCookie(false);
	}
}

function showHideFiltersCookie(show){
	if(show){
		var filterImg = document.getElementById("filterImg");
		filterImg.className="filterImg_hide";
		filterImg.title = hideFilters;
		filterImgText.innerHTML = hideFilters;
		$("#maincontainer").animate({top:'171px'},{duration:500,queue:false});
		$("#filter_panel_float").slideDown(500);
		setShowHideFilters("showfilters");
	}                           
	else{                       
		var filterImg = document.getElementById("filterImg");
		filterImg.className="filterImg_show";
		filterImg.title = showFilters;
		filterImgText.innerHTML = showFilters;
		$("#maincontainer").animate({top:'113px'},{duration:500,queue:false});
		$("#filter_panel_float").slideUp(500);
		setShowHideFilters("hidefilters");
	}

}
function setShowHideFilters(view) {
	var expire = new Date();
	expire.setDate(expire.getDate()+90); // Cookie expires after 90 days
	var pathDomainString="path=/;";
	if(navigator.userAgent.indexOf("Firefox")!=-1) {
		// code for possible use with FF when it gets working
		var theHost=document.location.hostname;
		pathDomainString = "path=/;domain="+theHost+";";
	}

	document.cookie = "asdocs_filter_view=" + view + ";"+ pathDomainString+"expires=" + expire.toGMTString();
}
function mainmenu(){
$(" #nav ul ").css({display: "none"}); // Opera Fix

$(" #nav li input[type=checkbox]").click( 
    function() { 
		var par= $(this).parent().parent();
		var thisId=$(this).attr("id");
		if($(this).is(':checked')){
			if(thisId!="rb_runtime" && thisId!="rb_product"){
				var fiinp=par.find('ul:first').find('li:first').find('input[type=radio]:first');
				fiinp.attr('checked',true);
				fiinp.trigger('click');
				var menutype=par.parent().parent();
				if(menutype.attr("id")=="RuntimesMenu"){
					filterclick('runtime');
				}
				else{
					filterclick('product');
				}
			}
			else if(thisId=="rb_runtime"){
				for(i=0; i<runtime_array.length;i++)
				{
					var checkBoxName = "rb_" + runtime_array[i].name;
					if(runtime_array[i].topversion!="none"){
						if(document.getElementById(checkBoxName))
							document.getElementById(checkBoxName).checked = true;
					}
					setRadioButtonState(runtime_array[i].name, runtime_array[i].topversion, "checked");
				}
				filterclick('runtime');
			}
			else{
				for(i=0; i<product_array.length;i++)
				{
					var checkBoxName = "rb_" + product_array[i].name;
					if(product_array[i].topversion!="none"){
						if(document.getElementById(checkBoxName))
							document.getElementById(checkBoxName).checked = true;
					}
					setRadioButtonState(product_array[i].name, product_array[i].topversion, "checked");
				}
				filterclick('product');
			}
		}
		else{
			if(thisId!="rb_runtime" && thisId!="rb_product"){
				var fiinp=par.find('ul:first').find('li:last').find('input[type=radio]:first');
				fiinp.attr('checked',true);
				fiinp.trigger('click');
				var menutype=par.parent().parent();
				if(menutype.attr("id")=="RuntimesMenu"){
					filterclick('runtime');
				}
				else{
					filterclick('product');
				}
			}
			else if(thisId=="rb_runtime"){
				for(i=0; i<runtime_array.length;i++)
				{
					var checkBoxName = "rb_" + runtime_array[i].name;
					if(document.getElementById(checkBoxName))
						document.getElementById(checkBoxName).checked = false;
					setRadioButtonState(runtime_array[i].name, "none", "checked");
				}
				filterclick('runtime');
			}
			else{
				for(i=0; i<product_array.length;i++)
				{
					var checkBoxName = "rb_" + product_array[i].name;
					if(document.getElementById(checkBoxName))
						document.getElementById(checkBoxName).checked = false;
					setRadioButtonState(product_array[i].name, "none", "checked");
				}
				filterclick('product');
			}
		}
	}
);

$(" #nav a").click( 
    function(e) {
		if (e.target !== this) return;	
		var input = $(this).find('input:first');
		if(input.attr('type')!="radio"){
			if(input.is(':checked')){
				input.attr('checked',false);
				input.trigger('click');
				// Fix for mozilla. Checkbox state is changed back to the previous form. so again changing it to false.
				input.attr('checked',false);
			}
			else{
				input.attr('checked',true);
				input.trigger('click');
				// Fix for mozilla. Checkbox state is changed back to the previous form. so again changing it to true.
				input.attr('checked',true);
			}
		}
		else{
			if(!(input.is(':checked'))){
				$(this).parents().eq(2).find('a:first').find('input:first').attr('checked',true);
				$(this).parents().eq(4).find('a:first').find('input:first').attr('checked',true);
				input.attr('checked',true);
				input.trigger('click');
				if($(this).parents().eq(4).attr("id")=="RuntimesMenu"){
					filterclick('runtime');
				}
				else{
					filterclick('product');
				}
			}
		}
	}
);
$(" #nav li input[type=radio]").click( 
    function() { 
		if($(this).attr("id").indexOf("_none")==-1){
			$(this).parents().eq(3).find('a:first').find('input:first').attr('checked',true);
			$(this).parents().eq(5).find('a:first').find('input:first').attr('checked',true);
		}
	}
);

$(" #nav > li").hover(
	function(){
		//Mouse In
		if($(this).find('a[id="RuntimesMenu"]').size()!=0){
			$(this).find('a[id="RuntimesMenu"]:first').css({"background-color": "grey","color":"white"});
		}
		else{
			$(this).find('a[id="ProductsMenu"]:first').css({"background-color": "grey","color":"white"});
		}
	},
	function(){
		//Mouse Out
		if($(this).find('a[id="RuntimesMenu"]').size()!=0){
			$(this).find('a[id="RuntimesMenu"]:first').css({"background-color": "transparent","color":"black"});
		}
		else{
			$(this).find('a[id="ProductsMenu"]:first').css({"background-color": "transparent","color":"black"});
		}
	}
);
$(" #nav li").hover(
	function(){
		//Mouse In
		if($(this).find('ul:first').find('li').size()!=2)
			$(this).find('ul:first').css({visibility: "visible",display: "none"}).show(400);
	},
	function(){
		//Mouse Out
		$(this).find('ul:first').css({visibility: "hidden"});
	}
);
$(" #nav li li").hover(
	function(){
		//Mouse In
		$(this).find('a:first').css({"background-color": "#00A2E8","color":"white"});
	},
	function(){
		//Mouse Out
		$(this).find('a:first').css({"background-color": "#E8E8E8","color":"black"});
	}
);
}

