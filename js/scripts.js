$(function(){
	$("#photo_background_scroll").scrollElement({mode:"infinite"});
	
	(function(){
		if($("#photo_background_scroll").length === 1){
			
			var bgInterval, bgTimeout;		
			function stopTimer(){
				if(typeof(bgInterval) !== 'undefined'){
					clearInterval(bgInterval);
				}
				if(typeof(bgTimeout) !== 'undefined'){
					clearTimeout(bgTimeout);
				}
			}
			
			function timer(){
				clearTimeout(bgTimeout);
				bgInterval = setInterval(function(){
					$("#photo_background_scroll").find(".scrollnext").trigger("click", [true]);
				}, 6000);
			}
	
			$("#photo_background_scroll").find(".scrollnext").on("click", function(event, auto){
				if(!auto){
					stopTimer();
					bgTimeout = setTimeout(function(){
						timer();
					}, 10000);
				}
			});
			timer();			
		}
	})();
	
	$(".group2").colorbox({rel:'group2', transition:"fade"});
	
	if ($(".specialstab").length > 0) {
		// Configure first DIV to show here.
		dayofweek = getDayOfWeek().toLowerCase();
		toggleDay(dayofweek);
		$(".specialstab").mouseover(function() {
			toggleDay($(this).attr("id"));
		});
	}
});


function toggleDiv(id) {
	$("div.toggleme").css("display", "none");
	$("#" + id).css("display", "block");
}


function toggleDay(day) {
	// Update tabs.
	$("a.specialstab").removeClass("current");
	$("#" + day).addClass("current");
	
	// Update content.
	$("div.toggleme").css("display", "none");
	$("#" + day + "_content").css("display", "block");
}


function getDayOfWeek() {
	return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][(new Date()).getDay()]
}


/**
* jQuery Scroll Element
* Copyright (c) 2011 Kevin Doyle
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
**/

(function(g){var e={prev:".scrollprev",next:".scrollnext",container:".scrollcontainer",mode:"page",pagesize:3,displayed:null,disabledclass:"disabled"},d,h,i,j,f={init:function(b){b&&g.extend(e,b);return this.each(function(){var a;d=g(this);i=d.find(e.container);j=i.find("td");if(e.displayed===null)e.displayed=e.pagesize;d.data("scroll",{prevbutton:d.find(e.prev),nextbutton:d.find(e.next),container:i,currentelement:0,elementlist:j,elementcontainer:i.find("tr"),limit:j.length-1,elementpositions:[], pages:0,pageindex:0,pagesize:e.pagesize,displayed:e.displayed,disabledclass:e.disabledclass});a=d.data("scroll");a.container.scrollLeft(0);a.container.css({overflow:"hidden"});a.prevbutton.addClass(a.disabledclass);f._calcPosition(!1,d);switch(e.mode){case "page":f._calcPages(d);a.pages<=1&&a.nextbutton.addClass(a.disabledclass);a.prevbutton.bind("click",{dir:"prev",scope:d},f._pageScroll);a.nextbutton.bind("click",{dir:"next",scope:d},f._pageScroll);break;case "infinite":a.prevbutton.removeClass(a.disabledclass), a.prevbutton.bind("click",{dir:"prev",scope:d},f._infiniteScroll),a.nextbutton.bind("click",{dir:"next",scope:d},f._infiniteScroll)}})},_pageScroll:function(b){var a=b.data.scope.data("scroll");b.data.dir==="prev"&&a.pageindex>0?(a.pageindex-=1,a.nextbutton.hasClass(a.disabledclass)&&a.nextbutton.removeClass(a.disabledclass),a.pageindex===0&&a.prevbutton.addClass(a.disabledclass)):b.data.dir==="next"&&a.pageindex<a.pages&&(a.pageindex+=1,a.prevbutton.removeClass(a.disabledclass),a.pageindex===a.pages&& a.nextbutton.addClass(a.disabledclass));h=a.elementpositions[a.pageindex*a.pagesize];a.container.stop().animate({scrollLeft:h},"fast");return!1},_infiniteScroll:function(b){var a=b.data.scope,c=a.data("scroll");h=c.elementpositions[1];b.data.dir==="prev"?(c.elementlist.eq(-1).prependTo(c.elementcontainer),c.container.scrollLeft(h),c.container.stop().animate({scrollLeft:0},"fast",function(){f._calcPosition(!0,a)})):b.data.dir==="next"&&c.container.stop().animate({scrollLeft:h},"fast",function(){c.elementlist.eq(0).appendTo(c.elementcontainer); c.container.scrollLeft(0);f._calcPosition(!0,a)});return!1},_calcPages:function(b){b=b.data("scroll");b.pages=Math.max(1,Math.ceil((b.limit-(b.displayed-b.pagesize))/b.pagesize));b.pageindex=Math.max(0,b.pageindex);b.pageindex=Math.min(b.pages,b.pageindex)},_calcPosition:function(b,a){var c=a.data("scroll");if(b)c.elementlist=c.container.find("td");c.elementlist.each(function(a){c.elementpositions[a]=Math.ceil(g(this).position().left)})}};g.fn.scrollElement=function(b){if(f[b])return f[b].apply(this, Array.prototype.slice.call(arguments,1));else if(typeof b==="object"||!b)return f.init.apply(this,arguments);else g.error("Method "+b+" does not exist on scrollElement")}})(jQuery);

/**
* jQuery Google Map Helper
**/
(function(c){c.fn.googleMap=function(a){var f={address:false,LatLng:[0,0],zoom:8,icon:false,alt:false,mapType:"roadmap",onGeocodeError:function(){}},a=c.extend(f,a);return this.each(function(){var g=c(this)[0],e=new google.maps.LatLng(a.LatLng[0],a.LatLng[1]),b;switch(a.mapType){case "roadmap":b=google.maps.MapTypeId.ROADMAP;break;case "satellite":b=google.maps.MapTypeId.SATELLITE;break;case "hybrid":b=google.maps.MapTypeId.HYBRID;break;case "terrain":b=google.maps.MapTypeId.TERRAIN}var d=new google.maps.Map(g, {zoom:a.zoom,center:e,mapTypeId:b});a.address?(new google.maps.Geocoder).geocode({address:a.address},function(b,c){c==google.maps.GeocoderStatus.OK?(d.setCenter(b[0].geometry.location),a.icon?new google.maps.Marker({map:d,position:b[0].geometry.location,icon:a.icon}):new google.maps.Marker({map:d,position:b[0].geometry.location})):c==google.maps.GeocoderStatus.ZERO_RESULTS&&f.onGeocodeError.call(this)}):a.icon?new google.maps.Marker({map:d,position:e,icon:a.icon}):new google.maps.Marker({map:d,position:e})})}})(jQuery);


/**
 * trailimage.js minified
 */
function debug(a){if(typeof console!="undefined"){console.log(a)}}function trail_preload(a){for(i=0;i<loadedimgs.length;i++){if(loadedimgs[i][0]==a){document.getElementById("trailimage_image").src=loadedimgs[i][1];debug("set image to previously loaded:  "+loadedimgs[i][1]);return true}}debug("creating new image to load:  "+a);loadimg=new Image;loadimg.onload=function(){document.getElementById("trailimage_image").src=this.src;debug("loaded:  "+this.src);followmouse()};loadimg.src=a;loadedimgs[loadedimgs.length]=Array(a,loadimg.src);return true}function followmouse(a){var b=offsetfrommouse;var c=offsetfrommouse;scrolltop=jQuery?Math.max(truebody().scrollTop,$("body").scrollTop()):truebody().scrollTop;var d=document.all?truebody().scrollLeft+truebody().clientWidth:pageXOffset+window.innerWidth-15;var e=document.all?Math.min(truebody().scrollHeight,truebody().clientHeight):Math.min(window.innerHeight);var f=gettrailobjnostyle().offsetHeight+16;var g=gettrailobjnostyle().offsetWidth+16;if(typeof a!="undefined"){mousex=a.pageX;mousey=a.pageY}else if(typeof window.event!="undefined"){mousex=event.clientX+truebody().scrollLeft;mousey=event.clientY+scrolltop}xbalancing=false;mousexWin=mousex+truebody().scrollLeft;if(d-mousex<g){if(mousex>g){b=mousex-g}else{xbalancing=true;b=d-g+offsetfrommouse}}else{b=mousex+offsetfrommouse}mouseyWin=mousey-scrolltop;if(e-mouseyWin<f){if(!xbalancing){c=e+scrolltop-f+offsetfrommouse}else{if(mouseyWin>e-mouseyWin){c=mousey-f}else{c=mousey+offsetfrommouse}}}else{c=mousey+offsetfrommouse}gettrailobj().left=b+"px";gettrailobj().top=c+"px"}function hidetrail(){gettrailobj().display="none";document.onmousemove="";gettrailobj().left="-1000px";gettrailobj().top="-1000px"}function showtrail(a,b,c){document.onmousemove=followmouse;if(typeof c=="undefined")c=true;newHTML='<div style="padding: 5px; background-color: #FFF; border: 1px solid #888;">';newHTML=newHTML+'<div align="center" style="padding: 2px 2px 2px 2px;">';if(typeof b!="undefined"){if(c){newHTML=newHTML+'<table border="0" cellspacing="0" cellpadding="0"><tr>';newHTML=newHTML+'<td valign="top"><img src="'+a+'" border="0"></td>';newHTML=newHTML+"<td>   </td>";newHTML=newHTML+'<td valign="top"><img src="'+b+'" border="0"></td>';newHTML=newHTML+"</tr></table>"}else{newHTML=newHTML+'<div><img src="'+a+'" border="0"></div>';newHTML=newHTML+'<div style="padding-top: 8px;"><img src="'+b+'" border="0"></div>'}}else{useimg=a;if(usewaitimg)useimg=waitimgsource;newHTML=newHTML+'<img src="'+useimg+'" border="0" id="trailimage_image">'}newHTML=newHTML+"</div>";newHTML=newHTML+"</div>";gettrailobjnostyle().innerHTML=newHTML;gettrailobj().display="inline";if(typeof b=="undefined")trail_preload(a)}function truebody(){return!window.opera&&document.compatMode&&document.compatMode!="BackCompat"?document.documentElement:document.body}function gettrailobjnostyle(){if(document.getElementById)return document.getElementById("trailimageid");else if(document.all)return document.all.trailimagid}function gettrailobj(){if(document.getElementById)return document.getElementById("trailimageid").style;else if(document.all)return document.all.trailimagid.style}if(typeof jQuery!="undefined"){$(function(){$("a.trailimage").mouseover(function(){var a=$(this).attr("href");showtrail(a)});$("a.trailimage").mouseout(function(){hidetrail()});$("a.trailimage").click(function(){return false})})}var offsetfrommouse=15;var displayduration=0;var waitimgsource="images/wait.gif";var usewaitimg=false;var waitimg=new Image;waitimg.onload=function(){usewaitimg=true};waitimg.src=waitimgsource;if(document.getElementById||document.all){document.write('<div id="trailimageid" style="position: absolute; display: none; left: 0px; top: 0px; z-index: 200;">');document.write("</div>")}var loadedimgs=Array();

