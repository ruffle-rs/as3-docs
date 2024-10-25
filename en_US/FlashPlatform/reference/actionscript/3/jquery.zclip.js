(function(a){a.fn.zclip=function(c){if(typeof c=="object"&&!c.length){var b=a.extend({path:"ZeroClipboard.swf",copy:null,beforeCopy:null,afterCopy:null,clickAfter:true,setHandCursor:true,setCSSEffects:true},c);
return this.each(function(){var e=a(this);
if(e.is(":visible")&&(typeof b.copy=="string"||a.isFunction(b.copy))){ZeroClipboard.setMoviePath(b.path);
var d=new ZeroClipboard.Client();
if(a.isFunction(b.copy)){e.bind("zClip_copy",b.copy)
}if(a.isFunction(b.beforeCopy)){e.bind("zClip_beforeCopy",b.beforeCopy)
}if(a.isFunction(b.afterCopy)){e.bind("zClip_afterCopy",b.afterCopy)
}d.setHandCursor(b.setHandCursor);
d.setCSSEffects(b.setCSSEffects);
d.addEventListener("mouseOver",function(f){e.trigger("mouseenter")
});
d.addEventListener("mouseOut",function(f){e.trigger("mouseleave")
});
d.addEventListener("mouseDown",function(f){e.trigger("mousedown");
if(!a.isFunction(b.copy)){d.setText(b.copy)
}else{d.setText(e.triggerHandler("zClip_copy"))
}if(a.isFunction(b.beforeCopy)){e.trigger("zClip_beforeCopy")
}});
d.addEventListener("complete",function(f,g){if(a.isFunction(b.afterCopy)){e.trigger("zClip_afterCopy")
}else{if(g.length>500){g=g.substr(0,500)+"...\n\n("+(g.length-500)+" characters not shown)"
}e.removeClass("hover")
}if(b.clickAfter){e.trigger("click")
}});
d.glue(e[0],e.parent()[0]);
a(window).bind("load resize",function(){d.reposition()
})
}})
}else{if(typeof c=="string"){return this.each(function(){var f=a(this);
c=c.toLowerCase();
var e=f.data("zclipId");
var d=a("#"+e+".zclip");
if(c=="remove"){d.remove();
f.removeClass("active hover")
}else{if(c=="hide"){d.hide();
f.removeClass("active hover")
}else{if(c=="show"){d.show()
}}}})
}}}
})(jQuery);
var ZeroClipboard={version:"1.0.7",clients:{},moviePath:"ZeroClipboard.swf",nextId:1,$:function(a){if(typeof(a)=="string"){a=document.getElementById(a)
}if(!a.addClass){a.hide=function(){this.style.display="none"
};
a.show=function(){this.style.display=""
};
a.addClass=function(b){this.removeClass(b);
this.className+=" "+b
};
a.removeClass=function(d){var e=this.className.split(/\s+/);
var b=-1;
for(var c=0;
c<e.length;
c++){if(e[c]==d){b=c;
c=e.length
}}if(b>-1){e.splice(b,1);
this.className=e.join(" ")
}return this
};
a.hasClass=function(b){return !!this.className.match(new RegExp("\\s*"+b+"\\s*"))
}
}return a
},setMoviePath:function(a){this.moviePath=a
},dispatch:function(d,b,c){var a=this.clients[d];
if(a){a.receiveEvent(b,c)
}},register:function(b,a){this.clients[b]=a
},getDOMObjectPosition:function(c,a){var b={left:0,top:0,width:c.width?c.width:c.offsetWidth,height:c.height?c.height:c.offsetHeight};
if(c&&(c!=a)){b.left+=c.offsetLeft;
b.top+=c.offsetTop
}return b
},Client:function(a){this.handlers={};
this.id=ZeroClipboard.nextId++;
this.movieId="ZeroClipboardMovie_"+this.id;
ZeroClipboard.register(this.id,this);
if(a){this.glue(a)
}}};
ZeroClipboard.Client.prototype={id:0,ready:false,movie:null,clipText:"",handCursorEnabled:true,cssEffects:true,handlers:null,glue:function(d,b,e){this.domElement=ZeroClipboard.$(d);
var f=99;
if(this.domElement.style.zIndex){f=parseInt(this.domElement.style.zIndex,10)+1
}if(typeof(b)=="string"){b=ZeroClipboard.$(b)
}else{if(typeof(b)=="undefined"){b=document.getElementsByTagName("body")[0]
}}var c=ZeroClipboard.getDOMObjectPosition(this.domElement,b);
this.div=document.createElement("div");
this.div.className="zclip";
this.div.id="zclip-"+this.movieId;
$(this.domElement).data("zclipId","zclip-"+this.movieId);
var a=this.div.style;
a.position="absolute";
a.left=""+c.left+"px";
a.top=""+c.top+"px";
a.width=""+c.width+"px";
a.height=""+c.height+"px";
a.zIndex=f;
if(typeof(e)=="object"){for(addedStyle in e){a[addedStyle]=e[addedStyle]
}}b.appendChild(this.div);
this.div.innerHTML=this.getHTML(c.width,c.height)
},getHTML:function(d,a){var c="";
var b="id="+this.id+"&width="+d+"&height="+a;
if(navigator.userAgent.match(/MSIE/)){var e=location.href.match(/^https/i)?"https://":"http://";
c+='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="'+e+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="'+d+'" height="'+a+'" id="'+this.movieId+'" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+ZeroClipboard.moviePath+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+b+'"/><param name="wmode" value="transparent"/></object>'
}else{c+='<embed id="'+this.movieId+'" src="'+ZeroClipboard.moviePath+'" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+d+'" height="'+a+'" name="'+this.movieId+'" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+b+'" wmode="transparent" />'
}return c
},hide:function(){if(this.div){this.div.style.left="-2000px"
}},show:function(){this.reposition()
},destroy:function(){if(this.domElement&&this.div){this.hide();
this.div.innerHTML="";
var a=document.getElementsByTagName("body")[0];
try{a.removeChild(this.div)
}catch(b){}this.domElement=null;
this.div=null
}},reposition:function(c){if(c){this.domElement=ZeroClipboard.$(c);
if(!this.domElement){this.hide()
}}if(this.domElement&&this.div){var b=ZeroClipboard.getDOMObjectPosition(this.domElement);
var a=this.div.style;
a.left=""+b.left+"px";
a.top=""+b.top+"px"
}},setText:function(a){this.clipText=a;
if(this.ready){this.movie.setText(a)
}},addEventListener:function(a,b){a=a.toString().toLowerCase().replace(/^on/,"");
if(!this.handlers[a]){this.handlers[a]=[]
}this.handlers[a].push(b)
},setHandCursor:function(a){this.handCursorEnabled=a;
if(this.ready){this.movie.setHandCursor(a)
}},setCSSEffects:function(a){this.cssEffects=!!a
},receiveEvent:function(d,f){d=d.toString().toLowerCase().replace(/^on/,"");
switch(d){case"load":this.movie=document.getElementById(this.movieId);
if(!this.movie){var c=this;
setTimeout(function(){c.receiveEvent("load",null)
},1);
return
}if(!this.ready&&navigator.userAgent.match(/Firefox/)&&navigator.userAgent.match(/Windows/)){var c=this;
setTimeout(function(){c.receiveEvent("load",null)
},100);
this.ready=true;
return
}this.ready=true;
try{this.movie.setText(this.clipText)
}catch(h){}try{this.movie.setHandCursor(this.handCursorEnabled)
}catch(h){}break;
case"mouseover":if(this.domElement&&this.cssEffects){this.domElement.addClass("hover");
if(this.recoverActive){this.domElement.addClass("active")
}}break;
case"mouseout":if(this.domElement&&this.cssEffects){this.recoverActive=false;
if(this.domElement.hasClass("active")){this.domElement.removeClass("active");
this.recoverActive=true
}this.domElement.removeClass("hover")
}break;
case"mousedown":if(this.domElement&&this.cssEffects){this.domElement.addClass("active")
}break;
case"mouseup":if(this.domElement&&this.cssEffects){this.domElement.removeClass("active");
this.recoverActive=false
}break
}if(this.handlers[d]){for(var b=0,a=this.handlers[d].length;
b<a;
b++){var g=this.handlers[d][b];
if(typeof(g)=="function"){g(this,f)
}else{if((typeof(g)=="object")&&(g.length==2)){g[0][g[1]](this,f)
}else{if(typeof(g)=="string"){window[g](this,f)
}}}}}}};