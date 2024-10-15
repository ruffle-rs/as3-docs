
        (function() {
        var BsUserAgent = false;
        if( window.navigator.userAgent.toLowerCase().indexOf("applewebkit") > -1)
            BsUserAgent = true;
        var booklistcookie = GetTopCookie("filter_product");
        if(booklistcookie == null  && typeof(localStorage) != 'undefined'  && document.location.href.indexOf("adobe.com") < 0 && BsUserAgent == true){ 
            booklistcookie = getlocalStorage("filter_product");
        }
        var booklisttree;
        function treeInit() {
        booklisttree = new YAHOO.widget.TreeView("booklist1");
        var root = booklisttree.getRoot();            
        
        
        
        var dataObjbooklist1 = 
        { label: "Creating Guides",
        href:"http://help.adobe.com/en_US/LiveCycle/9.5/WorkbenchHelp/WS0012aac133e59133442fef3112b209cb57d-8000.html",
        target:"_self",
        product:"all"};
        var productlist = dataObjbooklist1.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist1.product == "all" || includeproduct == true){
            var booklist1 = 
            new YAHOO.widget.TextNode(dataObjbooklist1,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist1 = 
        { label: "Scripting Support for HTML Forms and Guides",
        href:"http://help.adobe.com/en_US/LiveCycle/9.5/ScriptingSupport/index.html",
        target:"_self",
        product:"all"};
        var productlist = dataObjbooklist1.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist1.product == "all" || includeproduct == true){
            var booklist1 = 
            new YAHOO.widget.TextNode(dataObjbooklist1,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist1 = 
        { label: "ActionScript 3.0 Reference",
        href:"http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/index.html",
        target:"_self",
        product:"all"};
        var productlist = dataObjbooklist1.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist1.product == "all" || includeproduct == true){
            var booklist1 = 
            new YAHOO.widget.TextNode(dataObjbooklist1,  
        root, false);
        includeproduct = false;
        }
        
        
        if (root.children.length > 0) {
        	updateTOCClass();
        	booklisttree.draw();
        }
        else {
            document.getElementById("booklist1").previousSibling.style.display = "none";
        	hideElement("booklist1");
        }
        }
        
        YAHOO.util.Event.onDOMReady(treeInit);
        })();
            