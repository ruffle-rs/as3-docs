
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
        { label: "Managed Review and Approval 9.5 Solution Guide",
        href:"http://help.adobe.com/en_US/LiveCycle/9.5/MRASolution/index.html",
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
        { label: "Installing and Deploying Solution Accelerators",
        href:"http://help.adobe.com/en_US/LiveCycle/9.5/install_sa.pdf",
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
        { label: "Solution Accelerators API Reference",
        href:"http://help.adobe.com/en_US/LiveCycle/9.5/SolutionAcceleratorsAPI/index.html",
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
        { label: "ActionScript 3.0 Reference for the Adobe Flash Platform",
        href:"http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/index.html?filter_livecyclees=es2.5&filter_flashplayer=10&filter_air=2",
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
        { label: "LiveCycle Workbench 9.5 Help",
        href:"http://help.adobe.com/en_US/LiveCycle/9.5/WorkbenchHelp/index.html",
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
            document.getElementById("booklist1").previousSibling.style.display = "none";
        	hideElement("booklist1");
        }
        }
        
        YAHOO.util.Event.onDOMReady(treeInit);
        })();
            