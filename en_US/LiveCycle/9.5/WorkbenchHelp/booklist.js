
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
        { label: "Workbench Videos",
        href:"http://www.adobe.com/go/learn_lc_samples_selfpaced_9",
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
        { label: "Installing Your Development Environment",
        href:"http://www.adobe.com/go/learn_lc_installDevEnv_9",
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
        { label: "Creating Your First LiveCycle Application",
        href:"http://www.adobe.com/go/learn_lc_firstApplication_9",
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
        { label: "Application Modeling Technology Reference",
        href:"http://www.adobe.com/go/learn_lcds3_modeling_en",
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
        { label: "Assembler Service and DDX Reference",
        href:"http://www.adobe.com/go/learn_lc_ddx_9",
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
        { label: "LiveCycle ES2 XDC Editor Help",
        href:"http://www.adobe.com/go/learn_lc_xdcEditor_9",
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
        
        
        var dataObjbooklist1 = 
        { label: "Error Code Reference",
        href:"http://www.adobe.com/go/learn_lc_errorCode_9",
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
            