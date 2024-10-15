/*
 * help.js
 */


// preload nav hover icons
if (document.images){
  preload_image = new Image(17,17);
  preload_image.src="images/prev_hover.gif";
  preload_image.src="images/next_hover.gif";
}

// redirect to index.html
if (document.location.href.charAt(document.location.href.length-1) == '/'){
  document.location.href = "./index.html";
}

// set ASDoc filtering cookie
if ( typeof(terms_COOKIE) != 'undefined' && terms_COOKIE.length > 0 ){
}
	
// set GEP product filtering cookie
if ( typeof(terms_FILTER_PRODUCT_COOKIE) != 'undefined' && terms_FILTER_PRODUCT_COOKIE.length > 0 ){
	if (typeof(localStorage) != 'undefined'){
		localStorage.setItem('filter_product', terms_FILTER_PRODUCT_COOKIE.toLowerCase());
	}
}

//For AHV 1.1, this goes back to previous page in history.
function closePopup()
{
    window.close();
}

function updateTOCClass() {
    //function to make the TOC wider, based upon the number of levels.
    var TOCLevel = "TOCLevel2";
    if ( typeof(terms_TOCLevel) != 'undefined' ) {
        TOCLevel = "TOCLevel" + terms_TOCLevel;
    }
    if (document.getElementById) { // DOM3 = IE5, NS6
        document.getElementById("col1").className = TOCLevel;
    }
}

function hideElement(id) {
    //safe function to hide an element with a specified id
    if (document.getElementById) { // DOM3 = IE5, NS6
        document.getElementById(id).style.display = 'none';
    }
    else {
        if (document.layers) { // Netscape 4
            document.id.display = 'none';
        }
        else { // IE 4
            document.all.id.style.display = 'none';
        }
    }
}

function showElement(id) {
    //safe function to hide an element with a specified id
    if (document.getElementById) { // DOM3 = IE5, NS6
        document.getElementById(id).style.display = 'block';
    }
    else {
        if (document.layers) { // Netscape 4
            document.id.display = 'block';
        }
        else { // IE 4
            document.all.id.style.display = 'block';
        }
    }
}

// HIDES AND SHOWS MINI-TOC IN THE CONTENT PAGES
function toggleMiniToc(listId, obj) 
{
    if( obj.className == "hideLink" )
    {
        hideElement(listId);
        obj.className="showLink";
        obj.href="#";
        obj.firstChild.nodeValue = terms_AHV_SHOW;
        window.focus();
    }
    else
    {
        showElement(listId);
        obj.className="hideLink";
        obj.href="#";
        obj.firstChild.nodeValue = terms_AHV_HIDE;
        window.focus();
    }
    return false;
}

// HIDES AND SHOWS LARGE GRAPHICS IN THE CONTENT PAGES
function showHideImage(thisID, obj) 
{
    
    var imgElement = obj.nextSibling;
    var imgText = obj;

    if( imgElement.className == "largeImage" )
    {
        imgElement.src = "images/" + thisID + ".png";
        imgElement.className="smallImage";
        obj.className="showImageLink";
        obj.href="#";
        obj.firstChild.nodeValue = terms_AHV_LARGE_GRAPHIC;
        window.focus();
    }
    else
    {
        imgElement.src = "images/" + thisID + "_popup.png";
        imgElement.className="largeImage";
        obj.className="hideImageLink";
        obj.href="#";
        obj.firstChild.nodeValue = terms_AHV_SMALL_GRAPHIC;
        window.focus();
    }
    return false;
}
// js function for expand collapse menu functionality
function KeyCheck(e, tree, idx)
{
  var KeyID = (window.event) ? event.keyCode : e.keyCode;
  var node =  YAHOO.widget.TreeView.getNode(tree, idx);
   switch(KeyID)
   {
        case 37:
        // alert("Arrow Left");
        node.collapse();
        break;
        case 39:
        // alert("Arrow Right");
        node.expand();
        break;
   }
}
// js function for hide/display mini-elements functionality
function toggleLayer(whichLayer) {
    if (document.getElementById) {
        // this is the way the standards work
        var obj=document.getElementById(whichLayer);
        var img = obj.previousSibling.firstChild.firstChild;
        img.setAttribute("src","images/on.gif");
        var styleatt = obj.style;
        styleatt.display = styleatt.display? "":"block";
        
        //change the class of the h3 per design
        if (obj.previousSibling.className === "topictitle3")    {
            obj.previousSibling.className ="topictitle3off";
            img.setAttribute("src","images/on.gif");
        } else if (obj.previousSibling.className === "topictitle3off")    {
            obj.previousSibling.className ="topictitle3";
            img.setAttribute("src","images/off.gif");
        } 
    }
    else if (document.all) {
        // this is the way old msie versions work
        var style2 = document.all[whichLayer].style;
        style2.display = style2.display? "":"block";
    }
}
 function addBookmark( bm_url_str, bm_str_label ) {
  parent.navigation.flashProxy.call('addBookmark', bm_url_str, bm_str_label );
}

var upperAsciiXlatTbl = new Array(
223,"ss",
230,"ae",
198,"ae",
156,"oe",
140,"oe",
240,"eth",
208,"eth",
141,"y",
159,"y"
);

var maxNumberOfShownSearchHits = 20;
var showInputStringAlerts = 0;
var navigationCookie = "";

////////////// COOKIE-RELATED FUNCTIONS /////////////////////////////////////////
//  test the navigator object for cookie enabling
//  additional code would need to be added for
//  to support browsers pre navigator 4 or IE5 or 
//  other browsers that dont support
//  the navigator object if any .. 
 function cookiesNotEnabled() 
{
    return true;     // We're not going to use cookies
}
/*
 * This function parses comma-separated name=value 
 * argument pairs from the query string of the URL. 
 * It stores the name=value pairs in 
 * properties of an object and returns that object.
 */
function getArgs() 
{
    var args = new Object();
    var query = top.location.search.substring(1); 
    // Get query string
    if (query.length > 0)    {
        var pairs = query.split("&");
        // Break at ampersand
        for(var i = 0; i < pairs.length; i++) 
        {
            var pos = pairs[i].indexOf('=');
              // Look for "name=value"
            if (pos == -1) continue;
              // If not found, skip
            var argname = pairs[i].substring(0,pos);
              // Extract the name
            var value = pairs[i].substring(pos+1);
              // Extract the value
            args[argname] = decodeURIComponent(value);
                // Store as a property
              // In JavaScript 1.5, use decodeURIComponent(  ) 
              // instead of escape(  )
        }
    } else {
        args[name] = false;        
    }
    return args;     // Return the object
}

/////////////////////////////// COOKIE-RELATED FUNCTIONS ////////////////////////
// Bill Dortch getCookieVal and GetCookie routines
function getCookieVal(offset) {
  var endstr=document.cookie.indexOf(";",offset);
  if (endstr==-1)endstr=document.cookie.length;
  return decodeURIComponent(document.cookie.substring(offset, endstr));
}
function GetCookie(name) {
    var arg=name+"=";
    var alen=arg.length;
    var clen=document.cookie.length;
    var i=0;

    if (cookiesNotEnabled())
    {
        var args = getArgs();
        if (args[name] !== false) { 
            return args[name];
        }    
    } else {
        while(i<clen){
            var j=i+alen;
            if(document.cookie.substring(i,j)==arg)return getCookieVal(j);
            i=document.cookie.indexOf(" ",i)+1;
            if(i==0)break; 
        }
        return null;
    }
}
function getTopCookieVal(offset) {
    var endstr=top.document.cookie.indexOf(";",offset);
    if (endstr==-1)endstr=top.document.cookie.length;
    return decodeURIComponent(top.document.cookie.substring(offset, endstr));
}
function GetTopCookie(name) {
    var arg=name+"=";
    var alen=arg.length;
    var clen=top.document.cookie.length;
    var i=0;
    while(i<clen){
        var j=i+alen;
        if(top.document.cookie.substring(i,j)==arg)return getTopCookieVal(j);
        i=top.document.cookie.indexOf(" ",i)+1;
        if(i==0)break; 
    }
    return null;
}
// SetCookie
// -----------
// This function is called to set a cookie in the current document.
//  params:
//        n - name of the cookie
//        v - value of the cookie
//        minutes - the duration of the cookie in minutes (that is, how many minutes before it expires)
function SetCookie(n,v,minutes) {
    var Then = new Date();
    Then.setTime(Then.getTime() + minutes * 60 * 1000);
}
// getContentCookie
// ----------------
// This function reads the content cookie set by the handleContext funtion.
//
function getContentCookie()
{
    var contentCookie = GetCookie("content");

    // What does this expression mean?
    // (contentCookie.indexOf("htm") != -1)
    if ( (contentCookie != null) && (contentCookie.indexOf("htm") != -1) ) 
    {
        document.cookie = "content="; // Wipe out the cookie
        location.replace(contentCookie);
    }            
}
// getNavigationCookie
// -------------------
// This function reads the content cookie set by the handleContext funtion.
//
function getNavigationCookie()
{
    navigationCookie = GetCookie("navigation");

    // What does this expression mean?
    // (navigationCookie.indexOf("htm") != -1)
    if ( (navigationCookie != null) && (navigationCookie.indexOf("htm") != -1) ) 
    {
        document.cookie = "navigation="; // Wipe out the cookie
        location.replace(navigationCookie);
    }
                
}

function getlocalStorage(itemName){
	var localStorageValue = null;
 	localStorageValue = localStorage.getItem(itemName);
 	return localStorageValue;
}
// handleContext
// -------------
// This function is called from content pages. It sets a cookie as soon
// as the page is loaded. If the content page is not in it's proper place
// in the frameset, the frameset will be loaded and the page will be 
// restored using the value in this cookie.
//
function handleContext(which)
{
}
// lastNodeOf
// ----------
// This function gets passed a URL and returns the last node of same.
function lastNodeOf(e)
{
    var expr = "" + e;
    var to = expr.indexOf("?");
    if( to !== -1) {
        var path = expr.substring(0,to);        
        var pieces = path.split("/");
        return pieces[pieces.length -1];
    }  else    {    
        var pos = expr.lastIndexOf("/");    
        if( (pos != -1) && (pos+1 != expr.length) ) {
            return expr.substr(pos+1);
        } else {
            return expr;
        }
    }
}
// frameBuster
// -----------
// This function is called by the frameset to ensure it's always loaded
// at the top level of the current window.
//
function frameBuster()
{
}


// SEARCH RELATED.......................................SEARCH RELATED
// SEARCH RELATED.......................................SEARCH RELATED
// SEARCH RELATED.......................................SEARCH RELATED
// SEARCH RELATED.......................................SEARCH RELATED
// SEARCH RELATED.......................................SEARCH RELATED
// SEARCH RELATED.......................................SEARCH RELATED
// SEARCH RELATED.......................................SEARCH RELATED
// SEARCH RELATED.......................................SEARCH RELATED
// SEARCH RELATED.......................................SEARCH RELATED
// SEARCH RELATED.......................................SEARCH RELATED
function bubbleSortWithShadow(a,b)
{
    var temp;
    for(var j=1; j<a.length; j++) {
        for(var i=0; i<j; i++) {
            if( a[i] < a[j] ) {    
                temp = a[j];a[j] = a[i];a[i] = temp;
                temp = b[j];b[j] = b[i];b[i] = temp;
            }
        }
    }
}
//---------------------------------------------------
function buildHtmlResultsStr()
{
    var innerHTMLstring,ndxEnd;

    // Gather all of the results display lines into the 'resultsArr'
    ndxEnd = (matchesArrIndices.length > maxNumberOfShownSearchHits ) ? maxNumberOfShownSearchHits : matchesArrIndices.length;

    for(var ndx=0, resultsArr = new Array(); ndx < ndxEnd; ndx++) {
        resultsArr[resultsArr.length] = buildResultsStrOneLine(matchesArrIndices[ndx],matchesArrHits[ndx]);
    }

    // Convert this 'resultsArr' into a single string that will be injected into this search page.
    innerHTMLstring = "<ol>";
    for( var ndx=0; ndx < resultsArr.length; ndx++ ) {
        innerHTMLstring = innerHTMLstring + resultsArr[ndx];
    }
    innerHTMLstring = innerHTMLstring + "</ol>";
    return innerHTMLstring;
}
//---------------------------------------------------
function buildResultsStrOneLine(a,b)
{
    var retStr;
    retStr = "<li class=\"searchresults\"><a href=\"" + top.fileArr[a] + ".html\"";

    // for debug...
    //retStr += "target=\"_self\" ";
    //retStr += "title=\"" + top.fileArr[a] + ".html-";
    //retStr += a + "-" + b + "\">";

    // for production...
    retStr += "target=\"_self\" >";

    retStr += top.titleArr[a].replace("<","&lt;").replace(">","&gt;") + "</a></li>";
    return retStr;
}
//---------------------------------------------------
// checkForHits
//  Break up the search term into words.
//  Check each of those words against...
//        (a) cached titles and 
//        (b) cached content lines 
//  Perform the hit detection for each one, 
//  storing the results into (hits-ordered) 
//        'matchesArrIndices' and 
//        'matchesArrHits'.
//---------------------------------------------------
function checkForHits()
{
    var inputWords = new Array();
    var tempArr = new Array();

    // Split the search term into individual search words
        tempArr = searchTerm.split(" ");
        for(var ndx=0; ndx < tempArr.length; ndx++) {
            if( tempArr[ndx].length ) {
                inputWords[inputWords.length] = tempArr[ndx];
            }
        }

    // Initialization
        matchesArrHits = new Array();
        matchesArrIndices = new Array();

    // Initialize the 'maskArr' and the 'hitsArr'
        maskArr = new Array();
        hitsArr = new Array();
        for( var ndx = 0; ndx < top.fileArr.length; ndx++ ) {
            maskArr[maskArr.length] = 1;
            hitsArr[hitsArr.length] = 0;
        }

    // Do checking for matches on EACH OF THE INPUT WORDS
        for( var ndx = 0; ndx < inputWords.length; ndx++ ) {

            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            if( ! checkForHitsWordAgainstPages( inputWords[ndx] ) ) {
                return;     // No sense in continuing, match has failed.
            }
            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            for( var ndx2 = 0; ndx2 < hitsArr.length; ndx2++ ) {
                if( hitsArr[ndx2] == 0 ) {
                    maskArr[ndx2] = 0;
                }
                else {
                    if( maskArr[ndx2] != 0 ) {
                        maskArr[ndx2] += hitsArr[ndx2];
                    }
                }
            }
        }

    // From the final 'maskArr', generate 'matchesArrHits' and 'matchesArrIndices'    
        for( var ndx = 0; ndx < maskArr.length; ndx++ ) {
            if( maskArr[ndx] ) {
                matchesArrHits[matchesArrHits.length] = maskArr[ndx];
                matchesArrIndices[matchesArrIndices.length] = ndx;
            }
        }

    // If there were any hits, then sort them by highest hits first
        if( matchesArrIndices.length ) {
            bubbleSortWithShadow(matchesArrHits, matchesArrIndices);
        }
}
//---------------------------------------------------
function checkForHitsWordAgainstPages(w)        
{
    var hitAnywhere = 0;
    
    if(showInputStringAlerts){alert( "Length of sc2: " + top.sc2.length );}

    // Process each of the content lines (one per file/page)
        for(var ndx=0; ndx < top.sc2.length; ndx++) {

            // Put the cached title into glob_title
                glob_title = top.sc1[ndx];

            // Put the cached content line into glob_phrase
                glob_phrase = top.sc2[ndx];
                
            if( maskArr[ndx] ) {
            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                if( top.isDblByte ) {
                    hitsArr[ndx] = checkForHitsWordAgainstTitleAndLine2(w,ndx);
                }
                else {
                    hitsArr[ndx] = checkForHitsWordAgainstTitleAndLine(w,ndx);
                }
                if( hitsArr[ndx] ) {
                    hitAnywhere = 1;
                }
            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            }
        }
    return hitAnywhere;
}
//---------------------------------------------------
function checkForHitsWordAgainstTitleAndLine(w, lineNdx)
{
    var words;
    var titleHitCnt = 0;
    var contentHitCnt = 0;
    var regex = new RegExp(w, "i");

    // TITLE .........................................
        words = new Array();
        words = glob_title.split(" ");

        // EXECUTE TITLE MATCH TEST
        for( var ndx = 0; ndx < words.length; ndx++ ) {
            if( w == words[ndx] ) {
                titleHitCnt += 100;
                break;
            }
        }

    // CONTENT .........................................
        words = new Array();
        words = glob_phrase.split(" ");

        // EXECUTE CONTENT MATCH TEST
        if( regex.test(glob_phrase) ) {    // See if word is anywhere within the phrase first.
            for( var ndx = 0; ndx < words.length; ndx++ ) {
                if( w == words[ndx] ) {
                    contentHitCnt += getInstanceCount(lineNdx,ndx);
                    break;
                }
                //else if( w < words[ndx] ) { // If word is greater than the remaining words, leave
                //    break;
                //}
            }
        }

    return titleHitCnt + contentHitCnt;
}
//---------------------------------------------------
function checkForHitsWordAgainstTitleAndLine2(w, lineNdx)
{
    var titleHitCnt = 0;
    var contentHitCnt = 0;

    // TITLE .........................................
        if( glob_title.indexOf(w) != -1 ) {
            titleHitCnt = 100;
        }

    // CONTENT .........................................
        contentHitCnt = indexesOf(glob_phrase,w);

    return titleHitCnt + contentHitCnt;
}
//---------------------------------------------------
// checkTheInputString
// 
//  returns...
//        empty string - if there is valid input to search
//        message string - if there is NO VALID INPUT to search
//---------------------------------------------------
function checkTheInputString()
{
    var myArr = new Array();
    var tempArr = new Array();
    var foundStopOrShortWord = 0;
    var ptn1 = /\d\D/;
    var ptn2 = /\D\d/;

    handleWhitespaceRemoval();

    searchTerm = searchTerm.toLowerCase();

    searchTerm = filterTheChars(searchTerm);
        
    handleWhitespaceRemoval();

    if( searchTerm.length ) {
        
        // Split the searchTerm
        tempArr = searchTerm.split(" ",100);
        if(showInputStringAlerts){alert( "size of tempArr: " + tempArr.length );}

        // Handle periods
        for( var ndx = 0; ndx < tempArr.length; ndx++ ) {
            if( tempArr[ndx].charCodeAt(0) == 46 ) {    // periods at the start of word
                //tempArr[ndx] = tempArr[ndx].substr(1); // NOTE: We don't want to do this. (e.g. ".txt")
            }
            if( tempArr[ndx].charCodeAt(tempArr[ndx].length-1) == 46 ) { // end of word
                tempArr[ndx] = tempArr[ndx].substr(0,tempArr[ndx].length-1);
            }
        }
            
        // Do stopwords and shortwords removal
        for( var ndx = 0; ndx < tempArr.length; ndx++ ) {
            var word = tempArr[ndx];
            if(showInputStringAlerts){alert( "Checking word: " + word );}
            
            if( ! top.sw[word] ) {
                if( word.length < 2 ) {
                    foundStopOrShortWord = 1;
                }
                else if( (word.length > 2) || (ptn1.test(word) || ptn2.test(word)) ) {
                    myArr[myArr.length] = tempArr[ndx];
                }
                else {
                    foundStopOrShortWord = 1;
                }
            }
            else {
                foundStopOrShortWord = 1;
            }
        }

        // Now reconstruct the searchTerm, based upon the 'myArr'
        searchTerm = "";
        for( var ndx = 0; ndx < myArr.length; ndx++ ) {
            searchTerm = searchTerm + myArr[ndx] + " ";
        }

        handleWhitespaceRemoval();

        if(showInputStringAlerts){alert( "FINAL SEARCH TERM: *" + searchTerm + "*" );}
            
        if( foundStopOrShortWord && ! searchTerm.length ) {
            return MSG_stopAndShortWords;
        }
        top.srch_input_massaged = searchTerm;
        
        return "";
    } 
    else {
		if( !searchTermComp.length )
        	return MSG_noSearchTermEntered;
		else
		    return MSG_noResultFound;
		
    }
}
//qWR
//---------------------------------------------------
// checkTheInputString3
// 
//  returns...
//        empty string - if there is valid input to search
//        message string - if there is NO VALID INPUT to search
//---------------------------------------------------
function checkTheInputString3()
{
    var myArr = new Array();
    var tempArr = new Array();
    var foundStopOrShortWord = 0;
    var ptn1 = /\d\D/;
    var ptn2 = /\D\d/;

    handleWhitespaceRemoval();

    searchTerm = searchTerm.toLowerCase();

    //searchTerm = filterTheChars(searchTerm);
        
    handleWhitespaceRemoval();

    if( searchTerm.length ) {
        
        // Split the searchTerm
            tempArr = searchTerm.split(" ",100);
            if(showInputStringAlerts){alert( "size of tempArr: " + tempArr.length );}

        // Handle periods
            for( var ndx = 0; ndx < tempArr.length; ndx++ ) {
                if( tempArr[ndx].charCodeAt(0) == 46 ) {    // periods at the start of word
                    //tempArr[ndx] = tempArr[ndx].substr(1); // NOTE: We don't want to do this. (e.g. ".txt")
                }
                if( tempArr[ndx].charCodeAt(tempArr[ndx].length-1) == 46 ) { // end of word
                    tempArr[ndx] = tempArr[ndx].substr(0,tempArr[ndx].length-1);
                }
            }
            
        // Do stopwords and shortwords removal
            for( var ndx = 0; ndx < tempArr.length; ndx++ ) {
                var word = tempArr[ndx];
                if(showInputStringAlerts){alert( "Checking word: " + word );}
                
                if( ! top.sw[word] ) {
                    if( word.length < 2 ) {
                        foundStopOrShortWord = 1;
                    }
                    else if( (word.length > 2) || (ptn1.test(word) || ptn2.test(word)) ) {
                        myArr[myArr.length] = tempArr[ndx];
                    }
                    else {
                        foundStopOrShortWord = 1;
                    }
                }
                else {
                    foundStopOrShortWord = 1;
                }
            }

        // Now reconstruct the searchTerm, based upon the 'myArr'
            searchTerm = "";
            for( var ndx = 0; ndx < myArr.length; ndx++ ) {
                searchTerm = searchTerm + myArr[ndx] + " ";
            }

        handleWhitespaceRemoval();

        if(showInputStringAlerts){alert( "FINAL SEARCH TERM: *" + searchTerm + "*" );}
            
        if( foundStopOrShortWord && ! searchTerm.length ) {
            return MSG_stopAndShortWords;
        }
        top.srch_input_massaged = searchTerm;
        return "";
    } 
    else {
        return MSG_noSearchTermEntered;
    }
}
// !qWR
//---------------------------------------------------
function checkTheInputString2()        // double-byte version
{
    var myArr = new Array();
    var tempArr = new Array();
    var foundStopOrShortWord = 0;
    var ptn1 = /\d\D/;
    var ptn2 = /\D\d/;
    var ptn3 = /[^\x00-\xff]/g;

    handleWhitespaceRemoval();

    searchTerm = searchTerm.toLowerCase();

    searchTerm = filterTheChars(searchTerm);
        
    handleWhitespaceRemoval();

    if( searchTerm.length ) {
        
        // Split the searchTerm
        tempArr = searchTerm.split(" ",100);
        if(showInputStringAlerts){alert( "size of tempArr: " + tempArr.length );}

        // Handle periods
        for( var ndx = 0; ndx < tempArr.length; ndx++ ) {
            if( tempArr[ndx].charCodeAt(0) == 46 ) {    // periods at the start of word
                //tempArr[ndx] = tempArr[ndx].substr(1); // NOTE: We don't want to do this. (e.g. ".txt")
            }
            if( tempArr[ndx].charCodeAt(tempArr[ndx].length-1) == 46 ) { // end of word
                tempArr[ndx] = tempArr[ndx].substr(0,tempArr[ndx].length-1);
            }
        }
            
        // Do stopwords and shortwords removal
        for( var ndx = 0; ndx < tempArr.length; ndx++ ) {
            var word = tempArr[ndx];
            if(showInputStringAlerts){alert( "Checking word: " + word );}
            
            if( ! top.sw[word] ) {
                if( word.length < 2 ) {
                    foundStopOrShortWord = 1;
                }
                else if( (word.length > 2) || (ptn1.test(word) || ptn2.test(word)) || ptn3.test(word)) {
                    myArr[myArr.length] = tempArr[ndx];
                }
                else {
                    foundStopOrShortWord = 1;
                }
            }
            else {
                foundStopOrShortWord = 1;
            }
        }

        // Now reconstruct the searchTerm, based upon the 'myArr'
        searchTerm = "";
        for( var ndx = 0; ndx < myArr.length; ndx++ ) {
            searchTerm = searchTerm + myArr[ndx] + " ";
        }

        handleWhitespaceRemoval();

        if(showInputStringAlerts){alert( "FINAL SEARCH TERM: *" + searchTerm + "*" );}
            
        if( foundStopOrShortWord && ! searchTerm.length ) {
            return MSG_stopAndShortWords;
        }
        top.srch_input_massaged = searchTerm;
        
        return "";
    } 
    else {
        return MSG_noSearchTermEntered;
    }
}
//---------------------------------------------------
function doIEsearch()
{
    var stStr = "";
            
    document.forms[0].q.value = top.srch_input_massaged;

    if( top.srch_message.length ) {
        document.getElementById("results").innerHTML = top.srch_message;
        top.srch_message = "";
    }
    else if( top.srch_1_shot ) {
        top.srch_1_shot = 0;
        
        searchTerm = top.srch_input_massaged;
        checkForHits();    // Sets: 'matchesArrIndices' and 'matchesArrHits'
		var locationStr=window.location.href;

        if( matchesArrIndices.length ) {    // If there were matches/hits...  /* Changed for CS4 */

            if(locationStr.indexOf("chcSearch.html") == -1){
            stStr = "<div class=\"form\">" + MSG_pagesContaining + "<strong>" + top.srch_input_massaged  + "</strong></div><br /><br />\n";
			}

            document.getElementById("results").innerHTML = stStr + buildHtmlResultsStr();
        }
        else {                                                  /* Changed for CS4 */
            document.getElementById("results").innerHTML = MSG_noPagesContain + "<strong>" + top.srch_input_massaged  + "</strong><br /><br />";

        }
        //searching_message.style.visibility="visible";
    }
    top.srch_input_verbatim = "";
}
//---------------------------------------------------
function getInstanceCount( lineIndex, wordIndex )
{
    var instancesStr = top.instances[lineIndex];    // e.g. "1432931"
    var ch = instancesStr.substr(wordIndex,1);
    
    return parseInt(ch);
}
//---------------------------------------------------
function handleWhitespaceRemoval()
{
    var re_1 = /^\s/;
    var re_2 = /\s$/;
    var re_3 = /\s\s/;
    var temp;

    // Remove leading whitespace
    while( true ) {
        temp = searchTerm.replace(re_1,"");
        if( temp == searchTerm ) {
            break;
        }
        searchTerm = temp;
    }
    // Remove trailing whitespace
    while( true ) {
        temp = searchTerm.replace(re_2,"");
        if( temp == searchTerm ) {
            break;
        }
        searchTerm = temp;
    }
    // Replace multiple contiguous spaces with a single space
    while( searchTerm.search(re_3) != -1 ) {
        temp = searchTerm.replace(re_3," ");
        searchTerm = temp;
    }
}
//--------------------------------------------------
function isAcceptableChar(chrNdx)
{
    var acceptableChars = new Array( 32, 46, 95 );    // space, period, underscore
    
    for( var ndx = 0; ndx < acceptableChars.length; ndx++ ) {
        if( chrNdx == acceptableChars[ndx] ) {
            return true;
        }
    }
    return false;
}
//--------------------------------------------------
function indexesOf(str,ptn)
{
    var position = 0;
    var hits = -1;
    var start = -1;

    while( position != -1 ) {
        position = str.indexOf(ptn, start+1);
        hits += 1;
        start = position;
    }
    return hits;
}
//--------------------------------------------------
function filterTheChars(line)
{
    var retStr = "",tempStr;
    var ch, chCode, retChr;
    var ndx;
    
    for( ndx = 0; ndx < line.length; ndx++ ) {
        ch = line.substr(ndx,1);
        chCode = ch.charCodeAt(0);
        
        if( (chCode >= 192) && (chCode <= 221) ) {    // Handle capital upper-ASCII characters
            chCode = chCode + 32;
            retChr = ASCII_to_char(chCode);
        }
        else if( withinAcceptableRanges(chCode) || isAcceptableChar(chCode) ) { // Acceptable characters
            retChr = ch;
        }
        else {
            tempStr = isLigatureChar(chCode);

            if( tempStr.length ) {    //Don't replace ligatures.
                retChr = ch;
            }
            else {        // Turn all else into space    
                retChr = " ";
            }
        }

        // Grow the return string
        retStr += retChr;
    }
    
    return retStr;
}
//--------------------------------------------------
function isLigatureChar(codeToCheck) {
    var xlatTblNdx, code, replStr = "";

    for( xlatTblNdx = 0; xlatTblNdx < upperAsciiXlatTbl.length; xlatTblNdx+=2 ) {

        code = upperAsciiXlatTbl[xlatTblNdx];
        if( code == codeToCheck ) {
            replStr = upperAsciiXlatTbl[xlatTblNdx+1];
            break;
        }
    }
    
    return replStr;
}
//--------------------------------------------------
function respondToSearchButton() 
{
    var myStr;
    document.getElementById("results").innerHTML = ""; //We don't expect this to be slow enough to need a message.    
    top.srch_input_verbatim = document.forms[0].q.value;
    searchTerm = document.forms[0].q.value;
    searchTermComp = searchTerm;
	
    if( top.isDblByte ) {
        myStr = checkTheInputString2();
    }
    else if (top.isT4) {
        myStr = checkTheInputString3();
    }
    else {
        myStr = checkTheInputString();    
    }
    
    top.srch_message = myStr;
    top.srch_1_shot = top.srch_message.length ? 0 : 1;
    
    doIEsearch();
}
//--------------------------------------------------
function respondToSearchLoad() 
{
    var externalQuery = GetCookie("externalQuery");
    if (externalQuery == null) { 
        externalQuery = GetCookie("q");
    }

    if (externalQuery != null) { 
		searchTermComp = externalQuery;
        var myStr;

        // Erich: bugfix 1762094, 1826817, 1821365, 1795591
        top.srch_input_verbatim = externalQuery.replace(/[\u0020-\u002d]|\u002f|[\u003a-\u0040]|[\u005b-\u005e]|\u0060|[\u007b-\u0089]|\u008b|[\u0091-\u0099]|\u009b|[\u00a1-\u00bf]|[\u2000-\u206f]|[\u3000-\u303f]|[\uff01-\uff0f]|[\uff1a-\uff1f]+/g, " ");
        searchTerm = top.srch_input_verbatim;

        if( top.isDblByte ) {
            myStr = checkTheInputString2();
        }
        else {
            myStr = checkTheInputString();    
        }
        
        top.srch_message = myStr;
        top.srch_1_shot = top.srch_message.length ? 0 : 1;
        
        doIEsearch();
    }
}
//---------------------------------------------------
function strReplace(orig,src,dest)
{
    var startPos=0;
    var matchPos = orig.indexOf(src,startPos);
    var retLine="";
    
    while(matchPos != -1) {
        retLine = retLine + orig.substring(startPos,matchPos) + dest;
        startPos = matchPos+1;
        matchPos = orig.indexOf(src,startPos);
    }
    if(! retLine.length) {return orig;}
    else {return retLine+orig.substring(startPos,orig.length);}
}
//--------------------------------------------------
function withinAcceptableRanges(chrNdx)
{    
    var acceptableRanges = new Array( "48-57","65-90","97-122","224-229","231-239","241-246","248-253","255-255");

    if (chrNdx > 255) {
        return true;
    }

    for( var ndx = 0; ndx < acceptableRanges.length; ndx++ ) {
        var start_finish = new Array();

        start_finish = acceptableRanges[ndx].split("-");
        
        if( (chrNdx >= start_finish[0]) && (chrNdx <= start_finish[1]) ) {
            return true;
        }
    }
    return false;
}
//--------------------------------------------------
function ASCII_to_char(num_in)
{
    var str_out = "";
    var num_out = parseInt(num_in);
    
    num_out = decodeURIComponent('%' + num_out.toString(16));
    str_out += num_out;
    
    return decodeURIComponent(str_out);
}
//--------------------------------------------------
var agt=navigator.userAgent.toLowerCase();
var use_chm_behavior = false;
var use_robohelp_behavior = false;
var use_ie_behavior = false;
var use_ie_6_behavior = false;
var use_chc_behavior = false;

if (agt.indexOf("adobe help viewer 2") != -1 || agt.indexOf("community help client") != -1) {
    use_robohelp_behavior = true;
	use_chc_behavior = true;
}

// Check for .chm extension too...
if ((""+self.location).toLowerCase().indexOf(".chm")!=-1) {
    use_chm_behavior = true;
}

if (agt.indexOf("msie") != -1) {
    use_ie_behavior = true;
}
if ((agt.indexOf("msie 5") != -1) || (agt.indexOf("msie 6") != -1)) {
    use_ie_6_behavior = true;
}

//--------------------------------------------------

var Url = {

    // public method for url encoding
    encode : function (string) {
        return escape(this._utf8_encode(string));
    },

    // public method for url decoding
    decode : function (string) {
        return this._utf8_decode(unescape(string));
    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}
//--------------------------------------------------
function scrollToNameAnchor() 
{
    var nameAnchor = GetCookie("nameAnchor");
    if (nameAnchor != null) { 
        document.location.hash = nameAnchor;
    }
}


// ugly workaround for missing support for selectorText in Netscape6/Mozilla
// call onLoad() or before you need to do anything you would have otherwise used
// selectorText for.
var ugly_selectorText_workaround_flag = false;
var allStyleRules;
// code developed using the following workaround (CVS v1.15) as an example.
// http://lxr.mozilla.org/seamonkey/source/extensions/xmlterm/ui/content/XMLTermCommands.js
function ugly_selectorText_workaround() {
    if((navigator.userAgent.indexOf("Gecko") == -1) ||
       (ugly_selectorText_workaround_flag)) {
        return; // we've already been here or shouldn't be here
    }
    var styleElements = document.getElementsByTagName("style");
    
    for(var i = 0; i < styleElements.length; i++) {
        var styleText = styleElements[i].firstChild.data;
        // this should be using match(/\b[\w-.]+(?=\s*\{)/g but ?= causes an
        // error in IE5, so we include the open brace and then strip it
        allStyleRules = styleText.match(/\b[\w-.]+(\s*\{)/g);
    }

    for(var i = 0; i < allStyleRules.length; i++) {
        // probably insufficient for people who like random gobs of 
        // whitespace in their styles
        allStyleRules[i] = allStyleRules[i].substr(0, (allStyleRules[i].length - 2));
    }
    ugly_selectorText_workaround_flag = true;
}


// setStyleById: given an element id, style property and 
// value, apply the style.
// args:
//  i - element id
//  p - property
//  v - value
//
function setStyleById(i, p, v) {
    var n = document.getElementById(i);
    n.style[p] = v;
}

// getStyleById: given an element ID and style property
// return the current setting for that property, or null.
// args:
//  i - element id
//  p - property
function getStyleById(i, p) {
    var n = document.getElementById(i);
    var s = eval("n.style." + p);

    // try inline
    if((s != "") && (s != null)) {
        return s;
    }

    // try currentStyle
    if(n.currentStyle) {
        var s = eval("n.currentStyle." + p);
        if((s != "") && (s != null)) {
            return s;
        }
    }
    
    // try styleSheets
    var sheets = document.styleSheets;
    if(sheets.length > 0) {
        // loop over each sheet
        for(var x = 0; x < sheets.length; x++) {
            // grab stylesheet rules
            var rules = sheets[x].cssRules;
            if(rules.length > 0) {
                // check each rule
                for(var y = 0; y < rules.length; y++) {
                    var z = rules[y].style;
                    // selectorText broken in NS 6/Mozilla: see
                    // http://bugzilla.mozilla.org/show_bug.cgi?id=51944
                    ugly_selectorText_workaround();
                    if(allStyleRules) {
                        if(allStyleRules[y] == i) {
                            return z[p];
                        }            
                    } else {
                        // use the native selectorText and style stuff
                        if(((z[p] != "") && (z[p] != null)) ||
                           (rules[y].selectorText == i)) {
                            return z[p];
                        }
                    }
                }
            }
        }
    }
    return null;
}

// setStyleByClass: given an element type and a class selector,
// style property and value, apply the style.
// args:
//  t - type of tag to check for (e.g., SPAN)
//  c - class name
//  p - CSS property
//  v - value
var ie = (document.all) ? true : false;

function setStyleByClass(t,c,p,v){
    var elements;
    if(t == '*') {
        // '*' not supported by IE/Win 5.5 and below
        elements = (ie) ? document.all : document.getElementsByTagName('*');
    } else {
        elements = document.getElementsByTagName(t);
    }
    for(var i = 0; i < elements.length; i++){
        var node = elements.item(i);
        for(var j = 0; j < node.attributes.length; j++) {
            if(node.attributes.item(j).nodeName == 'class') {
                if(node.attributes.item(j).nodeValue == c) {
                    eval('node.style.' + p + " = '" +v + "'");
                }
            }
        }
    }
}

// getStyleByClass: given an element type, a class selector and a property,
// return the value of the property for that element type.
// args:
//  t - element type
//  c - class identifier
//  p - CSS property
function getStyleByClass(t, c, p) {
    // first loop over elements, because if they've been modified they
    // will contain style data more recent than that in the stylesheet
    var elements;
    if(t == '*') {
        // '*' not supported by IE/Win 5.5 and below
        elements = (ie) ? document.all : document.getElementsByTagName('*');
    } else {
        elements = document.getElementsByTagName(t);
    }
    for(var i = 0; i < elements.length; i++){
        var node = elements.item(i);
        for(var j = 0; j < node.attributes.length; j++) {
            if(node.attributes.item(j).nodeName == 'class') {
                if(node.attributes.item(j).nodeValue == c) {
                    var theStyle = eval('node.style.' + p);
                    if((theStyle != "") && (theStyle != null)) {
                        return theStyle;
                    }
                }
            }
        }        
    }
    // if we got here it's because we didn't find anything
    // try styleSheets
    var sheets = document.styleSheets;
    if(sheets.length > 0) {
        // loop over each sheet
        for(var x = 0; x < sheets.length; x++) {
            // grab stylesheet rules
            var rules = sheets[x].cssRules;
            if(rules.length > 0) {
                // check each rule
                for(var y = 0; y < rules.length; y++) {
                    var z = rules[y].style;
                    // selectorText broken in NS 6/Mozilla: see
                    // http://bugzilla.mozilla.org/show_bug.cgi?id=51944
                    ugly_selectorText_workaround();
                    if(allStyleRules) {
                        if((allStyleRules[y] == c) ||
                           (allStyleRules[y] == (t + "." + c))) {
                            return z[p];
                        }            
                    } else {
                        // use the native selectorText and style stuff
                        if(((z[p] != "") && (z[p] != null)) &&
                           ((rules[y].selectorText == c) ||
                            (rules[y].selectorText == (t + "." + c)))) {
                            return z[p];
                        }
                    }
                }
            }
        }
    }

    return null;
}

// setStyleByTag: given an element type, style property and 
// value, and whether the property should override inline styles or
// just global stylesheet preferences, apply the style.
// args:
//  e - element type or id
//  p - property
//  v - value
//  g - boolean 0: modify global only; 1: modify all elements in document
function setStyleByTag(e, p, v, g) {
    if(g) {
        var elements = document.getElementsByTagName(e);
        for(var i = 0; i < elements.length; i++) {
            elements.item(i).style[p] = v;
        }
    } else {
        var sheets = document.styleSheets;
        if(sheets.length > 0) {
            for(var i = 0; i < sheets.length; i++) {
                var rules = sheets[i].cssRules;
                if(rules.length > 0) {
                    for(var j = 0; j < rules.length; j++) {
                        var s = rules[j].style;
                        // selectorText broken in NS 6/Mozilla: see
                        // http://bugzilla.mozilla.org/show_bug.cgi?id=51944
                        ugly_selectorText_workaround();
                        if(allStyleRules) {
                            if(allStyleRules[j] == e) {
                                s[p] = v;
                            }            
                        } else {
                            // use the native selectorText and style stuff
                            if(((s[p] != "") && (s[p] != null)) &&
                               (rules[j].selectorText == e)) {
                                s[p] = v;
                            }
                        }

                    }
                }
            }
        }
    }
}

// getStyleByTag: given an element type and style property, return
// the property's value
// args:
//  e - element type
//  p - property
function getStyleByTag(e, p) {
    var sheets = document.styleSheets;
    if(sheets.length > 0) {
        for(var i = 0; i < sheets.length; i++) {
            var rules = sheets[i].cssRules;
            if(rules.length > 0) {
                for(var j = 0; j < rules.length; j++) {
                    var s = rules[j].style;
                    // selectorText broken in NS 6/Mozilla: see
                    // http://bugzilla.mozilla.org/show_bug.cgi?id=51944
                    ugly_selectorText_workaround();
                    if(allStyleRules) {
                        if(allStyleRules[j] == e) {
                            return s[p];
                        }            
                    } else {
                        // use the native selectorText and style stuff
                        if(((s[p] != "") && (s[p] != null)) &&
                           (rules[j].selectorText == e)) {
                            return s[p];
                        }
                    }

                }
            }
        }
    }

    // if we don't find any style sheets, return the value for the first
    // element of this type we encounter without a CLASS or STYLE attribute
    var elements = document.getElementsByTagName(e);
    var sawClassOrStyleAttribute = false;
    for(var i = 0; i < elements.length; i++) {
        var node = elements.item(i);
        for(var j = 0; j < node.attributes.length; j++) {
            if((node.attributes.item(j).nodeName == 'class') ||
               (node.attributes.item(j).nodeName == 'style')){
               sawClassOrStyleAttribute = true;
            }
        }
        if(! sawClassOrStyleAttribute) {
            return elements.item(i).style[p];
        }
    }
}



//showSWF: - changes the display property of a SWF from none to block 
//         -  hides the button
// args:
//  sfw - the name of the swf file (without file extension)
function showSWF( swf ){
    document.getElementById(swf).style.display = "block";
    if ( document.getElementById( swf + "Btn" ) ){
        document.getElementById( swf + "Btn" ).style.display = "none";
    }
}

