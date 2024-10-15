
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
        { label: "Using Flash Professional",
        href:"http://help.adobe.com/en_US/flash/cs/using/index.html",
        target:"_self",
        product:"flash"};
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
        { label: "Adobe Media Encoder",
        href:"http://help.adobe.com/en_US/mediaencoder/cs/using/index.html",
        target:"_self",
        product:"flash"};
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
        { label: "ActionScript 3.0 and Components",
        href:"http://help.adobe.com/en_US/as3/learn/index.html",
        target:"_self",
        product:"flash"};
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
        { label: "ActionScript 2.0 and Components",
        href:"http://help.adobe.com/en_US/as2/reference/addendum/index.html",
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
        { label: "Adobe AIR",
        href:"",
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
        
        
        var dataObjbooklist7 = 
        { label: "Mobile",
        href:"http://help.adobe.com/en_US/as3/mobile/index.html",
        target:"_self",
        product:"flash"};
        var productlist = dataObjbooklist7.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist7.product == "all" || includeproduct == true){
            var booklist7 = 
            new YAHOO.widget.TextNode(dataObjbooklist7,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist8 = 
        { label: "Flash Lite",
        href:"http://help.adobe.com/en_US/flashlite/dev/4/index.html",
        target:"_self",
        product:"flash"};
        var productlist = dataObjbooklist8.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist8.product == "all" || includeproduct == true){
            var booklist8 = 
            new YAHOO.widget.TextNode(dataObjbooklist8,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist9 = 
        { label: "Extending Flash Professional",
        href:"http://help.adobe.com/en_US/flash/cs/extend/index.html",
        target:"_self",
        product:"flash"};
        var productlist = dataObjbooklist9.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist9.product == "all" || includeproduct == true){
            var booklist9 = 
            new YAHOO.widget.TextNode(dataObjbooklist9,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist10 = 
        { label: "Creative Suite 5",
        href:"http://help.adobe.com/en_US/CreativeSuite/CS5/Using/index.html",
        target:"_self",
        product:"flash"};
        var productlist = dataObjbooklist10.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist10.product == "all" || includeproduct == true){
            var booklist10 = 
            new YAHOO.widget.TextNode(dataObjbooklist10,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist11 = 
        { label: "ActionScript 3.0 Reference",
        href:"http://help.adobe.com/en_US/AS3LCR/Flex_4.0/",
        target:"_self",
        product:"flex"};
        var productlist = dataObjbooklist11.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist11.product == "all" || includeproduct == true){
            var booklist11 = 
            new YAHOO.widget.TextNode(dataObjbooklist11,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist12 = 
        { label: "Using Flash Builder",
        href:"http://help.adobe.com/en_US/flashbuilder/using/index.html",
        target:"_self",
        product:"flex"};
        var productlist = dataObjbooklist12.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist12.product == "all" || includeproduct == true){
            var booklist12 = 
            new YAHOO.widget.TextNode(dataObjbooklist12,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist13 = 
        { label: "Using Flex",
        href:"http://help.adobe.com/en_US/flashbuilder/using/index.html",
        target:"_self",
        product:"flex"};
        var productlist = dataObjbooklist13.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist13.product == "all" || includeproduct == true){
            var booklist13 = 
            new YAHOO.widget.TextNode(dataObjbooklist13,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist14 = 
        { label: "Accessing Data with Flex",
        href:"http://help.adobe.com/en_US/flex/accessingdata/index.html",
        target:"_self",
        product:"flex"};
        var productlist = dataObjbooklist14.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist14.product == "all" || includeproduct == true){
            var booklist14 = 
            new YAHOO.widget.TextNode(dataObjbooklist14,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist15 = 
        { label: "Learning ActionScript 3",
        href:"http://help.adobe.com/en_US/as3/learn/index.html",
        target:"_self",
        product:"flex"};
        var productlist = dataObjbooklist15.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist15.product == "all" || includeproduct == true){
            var booklist15 = 
            new YAHOO.widget.TextNode(dataObjbooklist15,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist16 = 
        { label: "Developing Mobile Applications with Flash Builder and Flex",
        href:"http://help.adobe.com/en_US/flex/mobileapps/index.html",
        target:"_self",
        product:"flex"};
        var productlist = dataObjbooklist16.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist16.product == "all" || includeproduct == true){
            var booklist16 = 
            new YAHOO.widget.TextNode(dataObjbooklist16,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist17 = 
        { label: "ActionScript 3.0 Developer's Guide",
        href:"http://help.adobe.com/en_US/as3/dev/index.html",
        target:"_self",
        product:"flex"};
        var productlist = dataObjbooklist17.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist17.product == "all" || includeproduct == true){
            var booklist17 = 
            new YAHOO.widget.TextNode(dataObjbooklist17,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist18 = 
        { label: "Building Adobe AIR Applications",
        href:"http://help.adobe.com/en_US/air/build/index.html",
        target:"_self",
        product:"flex"};
        var productlist = dataObjbooklist18.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist18.product == "all" || includeproduct == true){
            var booklist18 = 
            new YAHOO.widget.TextNode(dataObjbooklist18,  
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
        { label: "Building Adobe AIR Applications",
        href:"http://help.adobe.com/en_US/air/build/index.html",
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
        { label: "ActionScript 3.0 Reference for the Adobe Flash Platform",
        href:"http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/",
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
        { label: "HTML Developer's Guide for Adobe AIR",
        href:"",
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
        
        
        var dataObjbooklist7 = 
        { label: "Adobe AIR API Reference for HTML Developers",
        href:"http://help.adobe.com/en_US/air/reference/html/index.html",
        target:"_self",
        product:"all"};
        var productlist = dataObjbooklist7.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist7.product == "all" || includeproduct == true){
            var booklist7 = 
            new YAHOO.widget.TextNode(dataObjbooklist7,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist8 = 
        { label: "Adobe AIR Security",
        href:"http://help.adobe.com/en_US/air/security/index.html",
        target:"_self",
        product:"all"};
        var productlist = dataObjbooklist8.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist8.product == "all" || includeproduct == true){
            var booklist8 = 
            new YAHOO.widget.TextNode(dataObjbooklist8,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist9 = 
        { label: "Adobe AIR HTML Security",
        href:"http://help.adobe.com/en_US/air/html/security/index.html",
        target:"_self",
        product:"all"};
        var productlist = dataObjbooklist9.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist9.product == "all" || includeproduct == true){
            var booklist9 = 
            new YAHOO.widget.TextNode(dataObjbooklist9,  
        root, false);
        includeproduct = false;
        }
        
        
        var dataObjbooklist10 = 
        { label: "Adobe AIR Administrator's Guide",
        href:"http://help.adobe.com/en_US/air/admin/index.html",
        target:"_self",
        product:"all"};
        var productlist = dataObjbooklist10.product.split(",");
        var includeproduct = false;
        if (booklistcookie != null) {
			for(var i=0; i < productlist.length; i++){
				if(booklistcookie.indexOf(productlist[i]) >= 0){
					includeproduct = true;
				}
			}
        }
        if(dataObjbooklist10.product == "all" || includeproduct == true){
            var booklist10 = 
            new YAHOO.widget.TextNode(dataObjbooklist10,  
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
            