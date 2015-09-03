function tweenLettersComplete(){letters.addClass("letter-collapsed").removeAttr("style")}function cycle(){taglines.eq(i).fadeIn(1e3).delay(1e3).fadeOut(1e3,cycle),i=++i%taglines.length}!function(e){var t={init:function(t){var n={maxSize:-1,minSize:-1,spacing:5,duration:500,isVertical:!1,easing:void 0,autoResize:!0,behavior:null,delayMouseIn:0,delayMouseOut:0,selectOnClick:!0,deselectOnClick:!1,interval:2500,interactive:!0},o=e.extend(n,t);if(-1!==o.minSize&&-1!==o.maxSize)throw new Error("Kwicks options minSize and maxSize may not both be set");if(o.behavior&&"menu"!==o.behavior&&"slideshow"!==o.behavior)throw new Error("Unrecognized Kwicks behavior specified: "+o.behavior);return e.each(["minSize","maxSize","spacing"],function(e,t){var i=o[t];switch(typeof i){case"number":o[t+"Units"]="px";break;case"string":if("%"===i.slice(-1))o[t+"Units"]="%",o[t]=+i.slice(0,-1)/100;else{if("px"!==i.slice(-2))throw new Error("Invalid value for Kwicks option "+t+": "+i);o[t+"Units"]="px",o[t]=+i.slice(0,-2)}break;default:throw new Error("Invalid value for Kwicks option "+t+": "+i)}}),this.each(function(){e(this).data("kwicks",new i(this,o))})},expand:function(t,i){"object"==typeof t&&(i=t,t=void 0);var n=i&&i.delay||0;return this.each(function(){var i=e(this),o=i.data("kwicks");if(o)t="number"==typeof t?t:-1;else{if(!(o=i.parent().data("kwicks")))return;t=i.index()}var r=function(){if(t!==o.expandedIndex){var e=o.$panels,i=e[t]||null;o.$container.trigger("expand.kwicks",{index:t,expanded:i,collapsed:e.not(i).get(),oldIndex:o.expandedIndex,oldExpanded:o.getExpandedPanel(),isAnimated:o.isAnimated})}},s=o.$container.data("kwicks-timeout-id");s&&(o.$container.removeData("kwicks-timeout-id"),clearTimeout(s)),n>0?o.$container.data("kwicks-timeout-id",setTimeout(r,n)):r()})},expanded:function(){var e=this.first().data("kwicks");return e?e.expandedIndex:void 0},select:function(t){return this.each(function(){var i=e(this),n=i.data("kwicks");if(n)t="number"==typeof t?t:-1;else{if(!(n=i.parent().data("kwicks")))return;t=i.index()}if(t!==n.selectedIndex){var o=n.$panels,r=o[t]||null;n.$container.trigger("select.kwicks",{index:t,selected:r,unselected:o.not(r).get(),oldIndex:n.selectedIndex,oldSelected:n.getSelectedPanel()})}n.$container.kwicks("expand",t)})},selected:function(){var e=this.first().data("kwicks");return e?e.selectedIndex:void 0},resize:function(){return this.each(function(){var t=e(this),i=t.data("kwicks");i&&i.resize()})},destroy:function(){return this.each(function(){var t=e(this),i=t.data("kwicks");i&&i.destroy()})}};e.fn.kwicks=function(e){if(t[e])return t[e].apply(this,Array.prototype.slice.call(arguments,1));if("object"!=typeof e&&e)throw new Error("Unrecognized kwicks method: "+e);return t.init.apply(this,arguments)},e.event.special.expand={_default:function(t,i){if("kwicks"===t.namespace){var n=e(t.target).data("kwicks");n&&n.expand(i.index)}}},e.event.special.select={_default:function(t,i){if("kwicks"===t.namespace){var n=e(t.target).data("kwicks");n&&n.select(i.index)}}};var i=function(t,i){var n=this;this.opts=i,this.onDestroyHandlers=[];var o=i.isVertical?"vertical":"horizontal";this.$container=e(t),this.$panels=this.$container.children();var r=["kwicks","kwicks-"+o];e.each(r,function(e){n.$container.hasClass(e)||(n.$container.addClass(e),n.onDestroy(function(){n.$container.removeClass(e)}))}),this.selectedIndex=this.$panels.filter(".kwicks-selected").index(),this.expandedIndex=this.selectedIndex,this.primaryDimension=i.isVertical?"height":"width",this.secondaryDimension=i.isVertical?"width":"height",this.calculatePanelSizes(),this.primaryAlignment=i.isVertical?"top":"left",this.secondaryAlignment=i.isVertical?"bottom":"right",this.$timer=e({progress:0}),this.isAnimated=!1,this.offsets=this.getOffsetsForExpanded(),this.updatePanelStyles(),this.initBehavior(),this.initWindowResizeHandler(),setTimeout(function(){n.updatePanelStyles()},100)};i.prototype.calculatePanelSizes=function(){var e=this.opts,t=this.getContainerSize(!0);this.panelSpacing="%"===e.spacingUnits?t*e.spacing:e.spacing;var i=this.$panels.length,n=this.panelSpacing*(i-1),o=t-n;this.panelSize=o/i,-1===e.minSize?(this.panelMaxSize=-1===e.maxSize?5>i?2*(t/3):t/3:"%"===e.maxSizeUnits?o*e.maxSize:e.maxSize,this.panelMinSize=(o-this.panelMaxSize)/(i-1)):-1===e.maxSize&&(this.panelMinSize="%"===e.minSizeUnits?o*e.minSize:e.minSize,this.panelMaxSize=o-this.panelMinSize*(i-1))},i.prototype.getOffsetsForExpanded=function(){for(var e=this.expandedIndex,t=this.$panels.length,i=this.panelSpacing,n=this.panelSize,o=this.panelMinSize,r=this.panelMaxSize,s=[0],a=1;t>a;a++)s[a]=-1===e?a*(n+i):e>=a?a*(o+i):r+o*(a-1)+a*i;return s},i.prototype.setStyle=function(){return e.support.style?function(e,t){e.setAttribute("style",t)}:function(e,t){e.style.cssText=t}}(),i.prototype.updatePanelStyles=function(){for(var e,t,i,n,o=this.offsets,r=this.$panels,s=this.primaryDimension,a=this.primaryAlignment,l=this.secondaryAlignment,c=this.panelSpacing,d=this.getContainerSize(),h=this._stylesInited?"":"position:absolute;",p=r.length;p--;)i=e,e=Math.round(o[p]),p===r.length-1?(t=d-e,n=l+":0;"+s+":"+t+"px;"):(t=i-e-c,n=a+":"+e+"px;"+s+":"+t+"px;"),this.setStyle(r[p],h+n);this._stylesInited||(this.$container.addClass("kwicks-processed"),this._stylesInited=!0)},i.prototype.initBehavior=function(){if(this.opts.behavior)switch(this.opts.behavior){case"menu":this.initMenuBehavior();break;case"slideshow":this.initSlideshowBehavior();break;default:throw new Error("Unrecognized behavior option: "+this.opts.behavior)}},i.prototype.initMenuBehavior=function(){var t=this,i=t.opts;this.addEventHandler(this.$container,"mouseleave",function(){t.$container.kwicks("expand",-1,{delay:i.delayMouseOut})}),this.addEventHandler(this.$panels,"mouseenter",function(){e(this).kwicks("expand",{delay:i.delayMouseIn})}),(i.selectOnClick||i.deselectOnClick)&&this.addEventHandler(this.$panels,"click",function(){var t=e(this),n=t.hasClass("kwicks-selected");n&&i.deselectOnClick?t.parent().kwicks("select",-1):!n&&i.selectOnClick&&t.kwicks("select")})},i.prototype.initSlideshowBehavior=function(){var t,i=this,n=this.$panels.length,o=0,r=!1,s=function(){r||(t=setInterval(function(){i.$container.kwicks("expand",++o%n)},i.opts.interval),r=!0)},a=function(){clearInterval(t),r=!1};s(),this.onDestroy(a),this.opts.interactive&&(this.addEventHandler(this.$container,"mouseenter",a),this.addEventHandler(this.$container,"mouseleave",s),this.addEventHandler(this.$panels,"mouseenter",function(){o=e(this).kwicks("expand").index()}))},i.prototype.initWindowResizeHandler=function(){if(this.opts.autoResize){var t=this,i=0,n=!1,o=e(window),r=function(e){e||(n=!1);var o=+new Date;if(20>o-i){if(n)return;return setTimeout(r,20-(o-i)),void(n=!0)}i=o,t.resize()};this.addEventHandler(o,"resize",r)}},i.prototype.getContainerSize=function(e){var t=this._containerSize;return(e||!t)&&(t=this._containerSize=this.$container[this.primaryDimension]()),t},i.prototype.getExpandedPanel=function(){return this.$panels[this.expandedIndex]||null},i.prototype.getCollapsedPanels=function(){return-1===this.expandedIndex?[]:this.$panels.not(this.getExpandedPanel()).get()},i.prototype.getSelectedPanel=function(){return this.$panels[this.selectedIndex]||null},i.prototype.getUnselectedPanels=function(){return this.$panels.not(this.getSelectedPanel()).get()},i.prototype.onDestroy=function(e){this.onDestroyHandlers.push(e)},i.prototype.addEventHandler=function(e,t,i){e.on(t,i),this.onDestroy(function(){e.off(t,i)})},i.prototype.destroy=function(){this.$timer.stop();for(var e=0,t=this.onDestroyHandlers.length;t>e;e++)this.onDestroyHandlers[e]();this.$panels.attr("style","").removeClass("kwicks-expanded kwicks-selected kwicks-collapsed"),this.$container.removeClass("kwicks-processed").removeData("kwicks")},i.prototype.resize=function(){this.getContainerSize()!==this.getContainerSize(!0)&&(this.calculatePanelSizes(),this.offsets=this.getOffsetsForExpanded(),this.isAnimated?this._dirtyOffsets=!0:this.updatePanelStyles())},i.prototype.select=function(t){t!==this.selectedIndex&&(e(this.getSelectedPanel()).removeClass("kwicks-selected"),this.selectedIndex=t,e(this.getSelectedPanel()).addClass("kwicks-selected"))},i.prototype.expand=function(t){var i=this,n=this.expandedIndex,o=this.getExpandedPanel();if(-1===t&&(t=this.selectedIndex),t!==this.expandedIndex){e(this.getExpandedPanel()).removeClass("kwicks-expanded"),e(this.getCollapsedPanels()).removeClass("kwicks-collapsed"),this.expandedIndex=t,e(this.getExpandedPanel()).addClass("kwicks-expanded"),e(this.getCollapsedPanels()).addClass("kwicks-collapsed");var r=this.$timer,s=this.$panels.length,a=this.offsets.slice(),l=this.offsets,c=this.getOffsetsForExpanded();r.stop()[0].progress=0,this.isAnimated=!0,r.animate({progress:1},{duration:this.opts.duration,easing:this.opts.easing,step:function(e){i._dirtyOffsets&&(l=i.offsets,c=i.getOffsetsForExpanded(),i._dirtyOffsets=!1),l.length=0;for(var t=0;s>t;t++){var n=c[t],o=n-(n-a[t])*(1-e);l[t]=o}i.updatePanelStyles()},complete:function(){i.isAnimated=!1,i.$container.trigger("expand-complete.kwicks",{index:t,expanded:i.getExpandedPanel(),collapsed:i.getCollapsedPanels(),oldIndex:n,oldExpanded:o,isAnimated:!1})}})}}}(jQuery),window.Modernizr=function(e,t,i){function n(e){f.cssText=e}function o(e,t){return typeof e===t}var r,s,a,l="2.8.3",c={},d=!0,h=t.documentElement,p="modernizr",u=t.createElement(p),f=u.style,w=({}.toString," -webkit- -moz- -o- -ms- ".split(" ")),v={},y=[],m=y.slice,g=function(e,i,n,o){var r,s,a,l,c=t.createElement("div"),d=t.body,u=d||t.createElement("body");if(parseInt(n,10))for(;n--;)a=t.createElement("div"),a.id=o?o[n]:p+(n+1),c.appendChild(a);return r=["&#173;",'<style id="s',p,'">',e,"</style>"].join(""),c.id=p,(d?c:u).innerHTML+=r,u.appendChild(c),d||(u.style.background="",u.style.overflow="hidden",l=h.style.overflow,h.style.overflow="hidden",h.appendChild(u)),s=i(c,e),d?c.parentNode.removeChild(c):(u.parentNode.removeChild(u),h.style.overflow=l),!!s},x=function(t){var i=e.matchMedia||e.msMatchMedia;if(i)return i(t)&&i(t).matches||!1;var n;return g("@media "+t+" { #"+p+" { position: absolute; } }",function(t){n="absolute"==(e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).position}),n},k={}.hasOwnProperty;a=o(k,"undefined")||o(k.call,"undefined")?function(e,t){return t in e&&o(e.constructor.prototype[t],"undefined")}:function(e,t){return k.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var i=m.call(arguments,1),n=function(){if(this instanceof n){var o=function(){};o.prototype=t.prototype;var r=new o,s=t.apply(r,i.concat(m.call(arguments)));return Object(s)===s?s:r}return t.apply(e,i.concat(m.call(arguments)))};return n}),v.touch=function(){var i;return"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?i=!0:g(["@media (",w.join("touch-enabled),("),p,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){i=9===e.offsetTop}),i};for(var S in v)a(v,S)&&(s=S.toLowerCase(),c[s]=v[S](),y.push((c[s]?"":"no-")+s));return c.addTest=function(e,t){if("object"==typeof e)for(var n in e)a(e,n)&&c.addTest(n,e[n]);else{if(e=e.toLowerCase(),c[e]!==i)return c;t="function"==typeof t?t():t,"undefined"!=typeof d&&d&&(h.className+=" "+(t?"":"no-")+e),c[e]=t}return c},n(""),u=r=null,c._version=l,c._prefixes=w,c.mq=x,c.testStyles=g,h.className=h.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(d?" js "+y.join(" "):""),c}(this,this.document),!function(){"use strict";function e(n){if(!n)throw new Error("No options passed to Waypoint constructor");if(!n.element)throw new Error("No element option passed to Waypoint constructor");if(!n.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+t,this.options=e.Adapter.extend({},e.defaults,n),this.element=this.options.element,this.adapter=new e.Adapter(this.element),this.callback=n.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=e.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=e.Context.findOrCreateByElement(this.options.context),e.offsetAliases[this.options.offset]&&(this.options.offset=e.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,t+=1}var t=0,i={};e.prototype.queueTrigger=function(e){this.group.queueTrigger(this,e)},e.prototype.trigger=function(e){this.enabled&&this.callback&&this.callback.apply(this,e)},e.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},e.prototype.disable=function(){return this.enabled=!1,this},e.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},e.prototype.next=function(){return this.group.next(this)},e.prototype.previous=function(){return this.group.previous(this)},e.invokeAll=function(e){var t=[];for(var n in i)t.push(i[n]);for(var o=0,r=t.length;r>o;o++)t[o][e]()},e.destroyAll=function(){e.invokeAll("destroy")},e.disableAll=function(){e.invokeAll("disable")},e.enableAll=function(){e.invokeAll("enable")},e.refreshAll=function(){e.Context.refreshAll()},e.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},e.viewportWidth=function(){return document.documentElement.clientWidth},e.adapters=[],e.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},e.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=e}(),function(){"use strict";function e(e){window.setTimeout(e,1e3/60)}function t(e){this.element=e,this.Adapter=o.Adapter,this.adapter=new this.Adapter(e),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},e.waypointContextKey=this.key,n[e.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,n={},o=window.Waypoint,r=window.onload;t.prototype.add=function(e){var t=e.options.horizontal?"horizontal":"vertical";this.waypoints[t][e.key]=e,this.refresh()},t.prototype.checkEmpty=function(){var e=this.Adapter.isEmptyObject(this.waypoints.horizontal),t=this.Adapter.isEmptyObject(this.waypoints.vertical);e&&t&&(this.adapter.off(".waypoints"),delete n[this.key])},t.prototype.createThrottledResizeHandler=function(){function e(){t.handleResize(),t.didResize=!1}var t=this;this.adapter.on("resize.waypoints",function(){t.didResize||(t.didResize=!0,o.requestAnimationFrame(e))})},t.prototype.createThrottledScrollHandler=function(){function e(){t.handleScroll(),t.didScroll=!1}var t=this;this.adapter.on("scroll.waypoints",function(){(!t.didScroll||o.isTouch)&&(t.didScroll=!0,o.requestAnimationFrame(e))})},t.prototype.handleResize=function(){o.Context.refreshAll()},t.prototype.handleScroll=function(){var e={},t={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in t){var n=t[i],o=n.newScroll>n.oldScroll,r=o?n.forward:n.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s],l=n.oldScroll<a.triggerPoint,c=n.newScroll>=a.triggerPoint,d=l&&c,h=!l&&!c;(d||h)&&(a.queueTrigger(r),e[a.group.id]=a.group)}}for(var p in e)e[p].flushTriggers();this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}},t.prototype.innerHeight=function(){return this.element==this.element.window?o.viewportHeight():this.adapter.innerHeight()},t.prototype.remove=function(e){delete this.waypoints[e.axis][e.key],this.checkEmpty()},t.prototype.innerWidth=function(){return this.element==this.element.window?o.viewportWidth():this.adapter.innerWidth()},t.prototype.destroy=function(){var e=[];for(var t in this.waypoints)for(var i in this.waypoints[t])e.push(this.waypoints[t][i]);for(var n=0,o=e.length;o>n;n++)e[n].destroy()},t.prototype.refresh=function(){var e,t=this.element==this.element.window,i=this.adapter.offset(),n={};this.handleScroll(),e={horizontal:{contextOffset:t?0:i.left,contextScroll:t?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:t?0:i.top,contextScroll:t?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var o in e){var r=e[o];for(var s in this.waypoints[o]){var a,l,c,d,h,p=this.waypoints[o][s],u=p.options.offset,f=p.triggerPoint,w=0,v=null==f;p.element!==p.element.window&&(w=p.adapter.offset()[r.offsetProp]),"function"==typeof u?u=u.apply(p):"string"==typeof u&&(u=parseFloat(u),p.options.offset.indexOf("%")>-1&&(u=Math.ceil(r.contextDimension*u/100))),a=r.contextScroll-r.contextOffset,p.triggerPoint=w+a-u,l=f<r.oldScroll,c=p.triggerPoint>=r.oldScroll,d=l&&c,h=!l&&!c,!v&&d?(p.queueTrigger(r.backward),n[p.group.id]=p.group):!v&&h?(p.queueTrigger(r.forward),n[p.group.id]=p.group):v&&r.oldScroll>=p.triggerPoint&&(p.queueTrigger(r.forward),n[p.group.id]=p.group)}}for(var y in n)n[y].flushTriggers();return this},t.findOrCreateByElement=function(e){return t.findByElement(e)||new t(e)},t.refreshAll=function(){for(var e in n)n[e].refresh()},t.findByElement=function(e){return n[e.waypointContextKey]},window.onload=function(){r&&r(),t.refreshAll()},o.requestAnimationFrame=function(t){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||e;i.call(window,t)},o.Context=t}(),function(){"use strict";function e(e,t){return e.triggerPoint-t.triggerPoint}function t(e,t){return t.triggerPoint-e.triggerPoint}function i(e){this.name=e.name,this.axis=e.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),n[this.axis][this.name]=this}var n={vertical:{},horizontal:{}},o=window.Waypoint;i.prototype.add=function(e){this.waypoints.push(e)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var n=this.triggerQueues[i],o="up"===i||"left"===i;n.sort(o?t:e);for(var r=0,s=n.length;s>r;r+=1){var a=n[r];(a.options.continuous||r===n.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(t){this.waypoints.sort(e);var i=o.Adapter.inArray(t,this.waypoints),n=i===this.waypoints.length-1;return n?null:this.waypoints[i+1]},i.prototype.previous=function(t){this.waypoints.sort(e);var i=o.Adapter.inArray(t,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(e,t){this.triggerQueues[t].push(e)},i.prototype.remove=function(e){var t=o.Adapter.inArray(e,this.waypoints);t>-1&&this.waypoints.splice(t,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(e){return n[e.axis][e.name]||new i(e)},o.Group=i}(),function(){"use strict";function e(e){this.$element=t(e)}var t=window.jQuery,i=window.Waypoint;t.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(t,i){e.prototype[i]=function(){var e=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,e)}}),t.each(["extend","inArray","isEmptyObject"],function(i,n){e[n]=t[n]}),i.adapters.push({name:"jquery",Adapter:e}),i.Adapter=e}(),function(){"use strict";function e(e){return function(){var i=[],n=arguments[0];return e.isFunction(arguments[0])&&(n=e.extend({},arguments[1]),n.handler=arguments[0]),this.each(function(){var o=e.extend({},n,{element:this});"string"==typeof o.context&&(o.context=e(this).closest(o.context)[0]),i.push(new t(o))}),i}}var t=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=e(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=e(window.Zepto))}(),function(e,t,i,n,o){function r(t,i){if(i){var n=i.getAttribute("viewBox"),o=e.createDocumentFragment(),r=i.cloneNode(!0);for(n&&t.setAttribute("viewBox",n);r.childNodes.length;)o.appendChild(r.childNodes[0]);t.appendChild(o)}}function s(){var t=e.createElement("x"),i=this.s;t.innerHTML=this.responseText,this.onload=function(){i.splice(0).map(function(e){r(e[0],t.querySelector("#"+e[1].replace(/(\W)/g,"\\$1")))})},this.onload()}function a(){for(var o;o=t[0];){var l=o.parentNode,c=o.getAttribute("xlink:href").split("#"),d=c[0],c=c[1];l.removeChild(o),d.length?(o=n[d]=n[d]||new XMLHttpRequest,o.s||(o.s=[],o.open("GET",d),o.onload=s,o.send()),o.s.push([l,c]),4===o.readyState&&o.onload()):r(l,e.getElementById(c))}i(a)}o&&a()}(document,document.getElementsByTagName("use"),window.requestAnimationFrame||window.setTimeout,{},/Trident\/[567]\b/.test(navigator.userAgent)||537>(navigator.userAgent.match(/AppleWebKit\/(\d+)/)||[])[1]);var wrapper=$("#wrapper"),masthead=$("#masthead"),mainNav=$(".main-nav"),letters=$(".letter-animate"),navAbout=$(".nav-about"),navPortfolio=$(".nav-portfolio"),lastActive=null,hero=$("#hero"),heroAnimate=$("#hero .hero-animate"),heroArrow=$("#hero .hero_arrow"),fadeHeroDiv,fadeHeroArrow,taglines=$(".tagline"),i=0,learnMore=$(".learn-more"),about=$("#about"),portfolio=$("#portfolio"),contact=$("#contact"),project=$(".portfolio-page");if(Modernizr.mq("(min-width: 46.0625rem)")){var tweenLetters=TweenMax.to(letters,.6,{delay:.6,width:0,opacity:0,onComplete:tweenLettersComplete});fadeHeroDiv=TweenMax.to(heroAnimate,1,{opacity:0,top:"75%"}),fadeHeroArrow=TweenMax.to(heroArrow,.3,{borderLeftWidth:320,borderRightWidth:320,borderTopWidth:0,bottom:0,marginLeft:-320})}var scrollMagicController=new ScrollMagic.Controller,heroScene=new ScrollMagic.Scene({triggerElement:"#hero",triggerHook:"onLeave",duration:"100%"}).setTween(fadeHeroDiv),heroArrow=new ScrollMagic.Scene({triggerElement:"#hero",triggerHook:"onLeave",duration:"75%"}).setTween(fadeHeroArrow);if(wrapper.hasClass("layout-home"))var aboutWaypoint=about.waypoint(function(e){"down"===e?(masthead.addClass("scroll-header"),navAbout.addClass("active"),navPortfolio.removeClass("active"),lastActive=navAbout):(masthead.removeClass("scroll-header"),navAbout.removeClass("active"),navPortfolio.removeClass("active"),lastActive=null)},{offset:function(){return Modernizr.mq("(min-width: 46.0625rem)")?masthead.height()+17:mainNav.height()}}),portfolioWaypoint=portfolio.waypoint(function(e){"down"===e?(navAbout.removeClass("active"),navPortfolio.addClass("active"),lastActive=navPortfolio):(navAbout.addClass("active"),navPortfolio.removeClass("active"),lastActive=navAbout)},{offset:function(){return Modernizr.mq("(min-width: 46.0625rem)")?masthead.height()+17:mainNav.height()}}),contactWaypoint=contact.waypoint(function(e){"down"===e?(navAbout.removeClass("active"),navPortfolio.addClass("active")):(navAbout.removeClass("active"),navPortfolio.removeClass("active"),lastActive.addClass("active"))},{offset:"100%"});else var projectWaypoint=project.waypoint(function(e){"down"===e?masthead.addClass("scroll-header"):masthead.removeClass("scroll-header")},{offset:-1*parseFloat(project.find(".project_summary h2.title").css("margin-top"))});scrollMagicController.scrollTo(function(e){TweenMax.to(window,.6,{scrollTo:{y:e}})}),$(document).on("click","a[href^='#']",function(e){var t=$(this).attr("href");$(t).length>0&&(e.preventDefault(),scrollMagicController.scrollTo(t),window.history&&window.history.pushState&&history.pushState("",document.title,t))}),$("img.lazy").unveil(568),wrapper.hasClass("layout-home")&&(Modernizr.mq("(min-width: 46.0625rem)")&&(taglines.hide(),setTimeout(cycle,900),setTimeout(function(){learnMore.animate({opacity:1},3e3)},5e3),scrollMagicController.addScene([heroScene,heroArrow])),$(".kwicks-vertical").kwicks({behavior:"menu",duration:300,maxSize:"85%",isVertical:!0,selectOnClick:!1,spacing:0}),Modernizr.touch||$(".project").hover(function(){$(this).find(".project_overlay").css("max-height",$(this).height()).slideToggle(300)}));
//# sourceMappingURL=app.js.map