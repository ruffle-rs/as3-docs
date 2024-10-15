
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
        
        
        
        var dataObjbooklist2 = 
        { label: "ActionScript 3.0 Reference",
        href:"http://help.adobe.com/en_US/AS3LCR/Flex_4.0/",
        target:"_self",
        product:"flex"};
        var productlist = dataObjbooklist2.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist2.product == "all" || includeproduct == true){
            var booklist2 = 
            new YAHOO.widget.TextNode(dataObjbooklist2,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist3 = 
        { label: "ActionScript 3.0 Developer's Guide",
        href:"http://help.adobe.com/en_US/as3/dev/index.html",
        target:"_self",
        product:"flex"};
        var productlist = dataObjbooklist3.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist3.product == "all" || includeproduct == true){
            var booklist3 = 
            new YAHOO.widget.TextNode(dataObjbooklist3,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist4 = 
        { label: "Building Adobe AIR Applications",
        href:"",
        target:"_self",
        product:"flex"};
        var productlist = dataObjbooklist4.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist4.product == "all" || includeproduct == true){
            var booklist4 = 
            new YAHOO.widget.TextNode(dataObjbooklist4,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist5 = 
        { label: "Developing Native Extensions for Adobe AIR",
        href:"http://help.adobe.com/en_US/air/extensions/index.html",
        target:"_self",
        product:"flash"};
        var productlist = dataObjbooklist5.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist5.product == "all" || includeproduct == true){
            var booklist5 = 
            new YAHOO.widget.TextNode(dataObjbooklist5,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist6 = 
        { label: "Optimizing Performance for the Flash Platform",
        href:"http://help.adobe.com/en_US/as3/mobile/index.html",
        target:"_self",
        product:"flash"};
        var productlist = dataObjbooklist6.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist6.product == "all" || includeproduct == true){
            var booklist6 = 
            new YAHOO.widget.TextNode(dataObjbooklist6,  
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
        booklisttree = new YAHOO.widget.TreeView("booklist2");
        var root = booklisttree.getRoot();            
        
        
        
        var dataObjbooklist2 = 
        { label: "ActionScript 3.0 Reference",
        href:"http://help.adobe.com/en_US/AS3LCR/Flex_4.0/",
        target:"_self",
        product:"all"};
        var productlist = dataObjbooklist2.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist2.product == "all" || includeproduct == true){
            var booklist2 = 
            new YAHOO.widget.TextNode(dataObjbooklist2,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist3 = 
        { label: "ActionScript 3.0 Developer's Guide",
        href:"http://help.adobe.com/en_US/as3/dev/index.html",
        target:"_self",
        product:"all"};
        var productlist = dataObjbooklist3.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist3.product == "all" || includeproduct == true){
            var booklist3 = 
            new YAHOO.widget.TextNode(dataObjbooklist3,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist4 = 
        { label: "Building Adobe AIR Applications",
        href:"",
        target:"_self",
        product:"all"};
        var productlist = dataObjbooklist4.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist4.product == "all" || includeproduct == true){
            var booklist4 = 
            new YAHOO.widget.TextNode(dataObjbooklist4,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist5 = 
        { label: "Developing Native Extensions for Adobe AIR",
        href:"http://help.adobe.com/en_US/air/extensions/index.html",
        target:"_self",
        product:"all"};
        var productlist = dataObjbooklist5.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist5.product == "all" || includeproduct == true){
            var booklist5 = 
            new YAHOO.widget.TextNode(dataObjbooklist5,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist6 = 
        { label: "Optimizing Performance for the Flash Platform",
        href:"http://help.adobe.com/en_US/as3/mobile/index.html",
        target:"_self",
        product:"all"};
        var productlist = dataObjbooklist6.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist6.product == "all" || includeproduct == true){
            var booklist6 = 
            new YAHOO.widget.TextNode(dataObjbooklist6,  
        root, false);
        includeproduct = false;
        }
        
        
        if (root.children.length > 0) {
        	updateTOCClass();
        	booklisttree.draw();
        }
        else {
            document.getElementById("booklist2").previousSibling.style.display = "none";
        	hideElement("booklist2");
        }
        }
        
        YAHOO.util.Event.onDOMReady(treeInit);
        })();
            