(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-00ff08b0"],{"02de":function(t,e,i){"use strict";function n(t){var e=window.getComputedStyle(t),i="none"===e.display,n=null===t.offsetParent&&"fixed"!==e.position;return i||n}i.d(e,"a",(function(){return n}))},"092d":function(t,e,i){"use strict";function n(t){var e=t.parentNode;e&&e.removeChild(t)}i.d(e,"a",(function(){return n}))},"09fe":function(t,e,i){},1325:function(t,e,i){"use strict";i.d(e,"b",(function(){return s})),i.d(e,"a",(function(){return r})),i.d(e,"c",(function(){return l}));var n=i("a142"),o=!1;if(!n["f"])try{var a={};Object.defineProperty(a,"passive",{get:function(){o=!0}}),window.addEventListener("test-passive",null,a)}catch(u){}function s(t,e,i,a){void 0===a&&(a=!1),n["f"]||t.addEventListener(e,i,!!o&&{capture:!1,passive:a})}function r(t,e,i){n["f"]||t.removeEventListener(e,i)}function c(t){t.stopPropagation()}function l(t,e){("boolean"!==typeof t.cancelable||t.cancelable)&&t.preventDefault(),e&&c(t)}},1421:function(t,e,i){"use strict";i.d(e,"a",(function(){return a}));var n=i("2b0e");function o(t){return"string"===typeof t?document.querySelector(t):t()}function a(t){var e=t.ref,i=t.afterPortal;return n["a"].extend({props:{getContainer:[String,Function]},watch:{getContainer:"portal"},mounted:function(){this.getContainer&&this.portal()},methods:{portal:function(){var t,n=this.getContainer,a=e?this.$refs[e]:this.$el;n?t=o(n):this.$parent&&(t=this.$parent.$el),t&&t!==a.parentNode&&t.appendChild(a),i&&i.call(this)}}})}},"1a04":function(t,e,i){},"2bb1":function(t,e,i){"use strict";var n=i("c31d"),o=i("d282"),a=i("9884"),s=Object(o["a"])("swipe-item"),r=s[0],c=s[1];e["a"]=r({mixins:[Object(a["a"])("vanSwipe")],data:function(){return{offset:0,mounted:!1}},mounted:function(){var t=this;this.$nextTick((function(){t.mounted=!0}))},computed:{style:function(){var t={},e=this.parent,i=e.size,n=e.vertical;return t[n?"height":"width"]=i+"px",this.offset&&(t.transform="translate"+(n?"Y":"X")+"("+this.offset+"px)"),t},shouldRender:function(){var t=this.index,e=this.parent,i=this.mounted;if(!e.lazyRender)return!0;if(!i)return!1;var n=e.activeIndicator,o=e.count-1,a=0===n?o:n-1,s=n===o?0:n+1;return t===n||t===a||t===s}},render:function(){var t=arguments[0];return t("div",{class:c(),style:this.style,on:Object(n["a"])({},this.$listeners)},[this.shouldRender&&this.slots()])}})},3875:function(t,e,i){"use strict";i.d(e,"a",(function(){return r}));var n=i("2b0e"),o=i("1325"),a=10;function s(t,e){return t>e&&t>a?"horizontal":e>t&&e>a?"vertical":""}var r=n["a"].extend({data:function(){return{direction:""}},methods:{touchStart:function(t){this.resetTouchStatus(),this.startX=t.touches[0].clientX,this.startY=t.touches[0].clientY},touchMove:function(t){var e=t.touches[0];this.deltaX=e.clientX-this.startX,this.deltaY=e.clientY-this.startY,this.offsetX=Math.abs(this.deltaX),this.offsetY=Math.abs(this.deltaY),this.direction=this.direction||s(this.offsetX,this.offsetY)},resetTouchStatus:function(){this.direction="",this.deltaX=0,this.deltaY=0,this.offsetX=0,this.offsetY=0},bindTouchEvent:function(t){var e=this,i=e.onTouchStart,n=e.onTouchMove,a=e.onTouchEnd;Object(o["b"])(t,"touchstart",i),Object(o["b"])(t,"touchmove",n),a&&(Object(o["b"])(t,"touchend",a),Object(o["b"])(t,"touchcancel",a))}}})},4598:function(t,e,i){"use strict";(function(t){i.d(e,"c",(function(){return l})),i.d(e,"b",(function(){return u})),i.d(e,"a",(function(){return h}));var n=i("a142"),o=Date.now();function a(t){var e=Date.now(),i=Math.max(0,16-(e-o)),n=setTimeout(t,i);return o=e+i,n}var s=n["f"]?t:window,r=s.requestAnimationFrame||a,c=s.cancelAnimationFrame||s.clearTimeout;function l(t){return r.call(s,t)}function u(t){l((function(){l(t)}))}function h(t){c.call(s,t)}}).call(this,i("c8ba"))},"45af":function(t,e,i){t.exports=i.p+"img/head.dc56829a.jpg"},"482d":function(t,e,i){"use strict";function n(t,e,i){return Math.min(Math.max(t,e),i)}function o(t,e,i){var n=t.indexOf(e);return n>-1?t.slice(0,n+1)+t.slice(n).replace(i,""):t}function a(t,e){t=e?o(t,".",/\./g):t.split(".")[0],t=o(t,"-",/-/g);var i=e?/[^-0-9.]/g:/[^-0-9]/g;return t.replace(i,"")}i.d(e,"b",(function(){return n})),i.d(e,"a",(function(){return a}))},"4d75":function(t,e,i){},"504b":function(t,e,i){},"543e":function(t,e,i){"use strict";var n=i("2638"),o=i.n(n),a=i("d282"),s=i("ea8e"),r=i("ba31"),c=Object(a["a"])("loading"),l=c[0],u=c[1];function h(t,e){if("spinner"===e.type){for(var i=[],n=0;n<12;n++)i.push(t("i"));return i}return t("svg",{class:u("circular"),attrs:{viewBox:"25 25 50 50"}},[t("circle",{attrs:{cx:"50",cy:"50",r:"20",fill:"none"}})])}function d(t,e,i){if(i.default){var n=e.textSize&&{fontSize:Object(s["a"])(e.textSize)};return t("span",{class:u("text"),style:n},[i.default()])}}function f(t,e,i,n){var a=e.color,c=e.size,l=e.type,f={color:a};if(c){var v=Object(s["a"])(c);f.width=v,f.height=v}return t("div",o()([{class:u([l,{vertical:e.vertical}])},Object(r["b"])(n,!0)]),[t("span",{class:u("spinner",l),style:f},[h(t,e)]),d(t,e,i)])}f.props={color:String,size:[Number,String],vertical:Boolean,textSize:[Number,String],type:{type:String,default:"circular"}},e["a"]=l(f)},5596:function(t,e,i){"use strict";var n=i("d282"),o=i("02de"),a=i("1325"),s=i("4598"),r=i("482d"),c=i("3875"),l=i("9884"),u=i("5fbe"),h=Object(n["a"])("swipe"),d=h[0],f=h[1];e["a"]=d({mixins:[c["a"],Object(l["b"])("vanSwipe"),Object(u["a"])((function(t,e){t(window,"resize",this.resize,!0),t(window,"visibilitychange",this.onVisibilityChange),e?this.initialize():this.clear()}))],props:{width:[Number,String],height:[Number,String],autoplay:[Number,String],vertical:Boolean,lazyRender:Boolean,indicatorColor:String,loop:{type:Boolean,default:!0},duration:{type:[Number,String],default:500},touchable:{type:Boolean,default:!0},initialSwipe:{type:[Number,String],default:0},showIndicators:{type:Boolean,default:!0},stopPropagation:{type:Boolean,default:!0}},data:function(){return{rect:null,offset:0,active:0,deltaX:0,deltaY:0,swiping:!1,computedWidth:0,computedHeight:0}},watch:{children:function(){this.initialize()},initialSwipe:function(){this.initialize()},autoplay:function(t){t>0?this.autoPlay():this.clear()}},computed:{count:function(){return this.children.length},maxCount:function(){return Math.ceil(Math.abs(this.minOffset)/this.size)},delta:function(){return this.vertical?this.deltaY:this.deltaX},size:function(){return this[this.vertical?"computedHeight":"computedWidth"]},trackSize:function(){return this.count*this.size},activeIndicator:function(){return(this.active+this.count)%this.count},isCorrectDirection:function(){var t=this.vertical?"vertical":"horizontal";return this.direction===t},trackStyle:function(){var t,e=this.vertical?"height":"width",i=this.vertical?"width":"height";return t={},t[e]=this.trackSize+"px",t[i]=this[i]?this[i]+"px":"",t.transitionDuration=(this.swiping?0:this.duration)+"ms",t.transform="translate"+(this.vertical?"Y":"X")+"("+this.offset+"px)",t},indicatorStyle:function(){return{backgroundColor:this.indicatorColor}},minOffset:function(){return(this.vertical?this.rect.height:this.rect.width)-this.size*this.count}},mounted:function(){this.bindTouchEvent(this.$refs.track)},methods:{initialize:function(t){if(void 0===t&&(t=+this.initialSwipe),this.$el&&!Object(o["a"])(this.$el)){clearTimeout(this.timer);var e=this.$el.getBoundingClientRect();this.rect=e,this.swiping=!0,this.active=t,this.computedWidth=Math.round(+this.width||e.width),this.computedHeight=Math.round(+this.height||e.height),this.offset=this.getTargetOffset(t),this.children.forEach((function(t){t.offset=0})),this.autoPlay()}},resize:function(){this.initialize(this.activeIndicator)},onVisibilityChange:function(){document.hidden?this.clear():this.autoPlay()},onTouchStart:function(t){this.touchable&&(this.clear(),this.touchStartTime=Date.now(),this.touchStart(t),this.correctPosition())},onTouchMove:function(t){this.touchable&&this.swiping&&(this.touchMove(t),this.isCorrectDirection&&(Object(a["c"])(t,this.stopPropagation),this.move({offset:this.delta})))},onTouchEnd:function(){if(this.touchable&&this.swiping){var t=this.size,e=this.delta,i=Date.now()-this.touchStartTime,n=e/i,o=Math.abs(n)>.25||Math.abs(e)>t/2;if(o&&this.isCorrectDirection){var a=this.vertical?this.offsetY:this.offsetX,s=0;s=this.loop?a>0?e>0?-1:1:0:-Math[e>0?"ceil":"floor"](e/t),this.move({pace:s,emitChange:!0})}else e&&this.move({pace:0});this.swiping=!1,this.autoPlay()}},getTargetActive:function(t){var e=this.active,i=this.count,n=this.maxCount;return t?this.loop?Object(r["b"])(e+t,-1,i):Object(r["b"])(e+t,0,n):e},getTargetOffset:function(t,e){void 0===e&&(e=0);var i=t*this.size;this.loop||(i=Math.min(i,-this.minOffset));var n=Math.round(e-i);return this.loop||(n=Object(r["b"])(n,this.minOffset,0)),n},move:function(t){var e=t.pace,i=void 0===e?0:e,n=t.offset,o=void 0===n?0:n,a=t.emitChange,s=this.loop,r=this.count,c=this.active,l=this.children,u=this.trackSize,h=this.minOffset;if(!(r<=1)){var d=this.getTargetActive(i),f=this.getTargetOffset(d,o);if(s){if(l[0]&&f!==h){var v=f<h;l[0].offset=v?u:0}if(l[r-1]&&0!==f){var m=f>0;l[r-1].offset=m?-u:0}}this.active=d,this.offset=f,a&&d!==c&&this.$emit("change",this.activeIndicator)}},prev:function(){var t=this;this.correctPosition(),this.resetTouchStatus(),Object(s["b"])((function(){t.swiping=!1,t.move({pace:-1,emitChange:!0})}))},next:function(){var t=this;this.correctPosition(),this.resetTouchStatus(),Object(s["b"])((function(){t.swiping=!1,t.move({pace:1,emitChange:!0})}))},swipeTo:function(t,e){var i=this;void 0===e&&(e={}),this.correctPosition(),this.resetTouchStatus(),Object(s["b"])((function(){var n;n=i.loop&&t===i.count?0===i.active?0:t:t%i.count,e.immediate?Object(s["b"])((function(){i.swiping=!1})):i.swiping=!1,i.move({pace:n-i.active,emitChange:!0})}))},correctPosition:function(){this.swiping=!0,this.active<=-1&&this.move({pace:this.count}),this.active>=this.count&&this.move({pace:-this.count})},clear:function(){clearTimeout(this.timer)},autoPlay:function(){var t=this,e=this.autoplay;e>0&&this.count>1&&(this.clear(),this.timer=setTimeout((function(){t.next(),t.autoPlay()}),e))},genIndicator:function(){var t=this,e=this.$createElement,i=this.count,n=this.activeIndicator,o=this.slots("indicator");return o||(this.showIndicators&&i>1?e("div",{class:f("indicators",{vertical:this.vertical})},[Array.apply(void 0,Array(i)).map((function(i,o){return e("i",{class:f("indicator",{active:o===n}),style:o===n?t.indicatorStyle:null})}))]):void 0)}},render:function(){var t=arguments[0];return t("div",{class:f()},[t("div",{ref:"track",style:this.trackStyle,class:f("track",{vertical:this.vertical})},[this.slots()]),this.genIndicator()])}})},"5fbe":function(t,e,i){"use strict";i.d(e,"a",(function(){return o}));var n=i("1325");function o(t){function e(){this.binded||(t.call(this,n["b"],!0),this.binded=!0)}function i(){this.binded&&(t.call(this,n["a"],!1),this.binded=!1)}return{mounted:e,activated:e,deactivated:i,beforeDestroy:i}}},6605:function(t,e,i){"use strict";var n={zIndex:2e3,lockCount:0,stack:[],get top(){return this.stack[this.stack.length-1]}},o=i("c31d"),a=i("2638"),s=i.n(a),r=i("d282"),c=i("a142"),l=i("ba31"),u=i("1325"),h=Object(r["a"])("overlay"),d=h[0],f=h[1];function v(t){Object(u["c"])(t,!0)}function m(t,e,i,n){var a=Object(o["a"])({zIndex:e.zIndex},e.customStyle);return Object(c["b"])(e.duration)&&(a.animationDuration=e.duration+"s"),t("transition",{attrs:{name:"van-fade"}},[t("div",s()([{directives:[{name:"show",value:e.show}],style:a,class:[f(),e.className],on:{touchmove:e.lockScroll?v:c["g"]}},Object(l["b"])(n,!0)]),[null==i.default?void 0:i.default()])])}m.props={show:Boolean,zIndex:[Number,String],duration:[Number,String],className:null,customStyle:Object,lockScroll:{type:Boolean,default:!0}};var p,g=d(m),b={className:"",customStyle:{}};function y(){if(n.top){var t=n.top.vm;t.$emit("click-overlay"),t.closeOnClickOverlay&&(t.onClickOverlay?t.onClickOverlay():t.close())}}function w(){p=Object(l["c"])(g,{on:{click:y}})}function S(){if(p||w(),n.top){var t=n.top,e=t.vm,i=t.config,a=e.$el;a&&a.parentNode?a.parentNode.insertBefore(p.$el,a):document.body.appendChild(p.$el),Object(o["a"])(p,b,i,{show:!0})}else p.show=!1}function O(t,e){n.stack.some((function(e){return e.vm===t}))||(n.stack.push({vm:t,config:e}),S())}function x(t){var e=n.stack;e.length&&(n.top.vm===t?(e.pop(),S()):n.stack=e.filter((function(e){return e.vm!==t})))}var C=i("092d"),j=i("a8c1"),z=i("3875"),T=i("1421"),$=i("5fbe"),I={mixins:[Object($["a"])((function(t,e){this.handlePopstate(e&&this.closeOnPopstate)}))],props:{closeOnPopstate:Boolean},data:function(){return{bindStatus:!1}},watch:{closeOnPopstate:function(t){this.handlePopstate(t)}},methods:{handlePopstate:function(t){var e=this;if(!this.$isServer&&this.bindStatus!==t){this.bindStatus=t;var i=t?u["b"]:u["a"];i(window,"popstate",(function(){e.close(),e.shouldReopen=!1}))}}}};i.d(e,"a",(function(){return P}));var k={value:Boolean,overlay:Boolean,overlayStyle:Object,overlayClass:String,closeOnClickOverlay:Boolean,zIndex:[Number,String],lockScroll:{type:Boolean,default:!0},lazyRender:{type:Boolean,default:!0}};function P(t){return void 0===t&&(t={}),{mixins:[z["a"],I,Object(T["a"])({afterPortal:function(){this.overlay&&S()}})],props:k,data:function(){return{inited:this.value}},computed:{shouldRender:function(){return this.inited||!this.lazyRender}},watch:{value:function(e){var i=e?"open":"close";this.inited=this.inited||this.value,this[i](),t.skipToggleEvent||this.$emit(i)},overlay:"renderOverlay"},mounted:function(){this.value&&this.open()},activated:function(){this.shouldReopen&&(this.$emit("input",!0),this.shouldReopen=!1)},beforeDestroy:function(){this.close(),this.getContainer&&Object(C["a"])(this.$el)},deactivated:function(){this.value&&(this.close(),this.shouldReopen=!0)},methods:{open:function(){this.$isServer||this.opened||(void 0!==this.zIndex&&(n.zIndex=this.zIndex),this.opened=!0,this.renderOverlay(),this.lockScroll&&(Object(u["b"])(document,"touchstart",this.touchStart),Object(u["b"])(document,"touchmove",this.onTouchMove),n.lockCount||document.body.classList.add("van-overflow-hidden"),n.lockCount++))},close:function(){this.opened&&(this.lockScroll&&(n.lockCount--,Object(u["a"])(document,"touchstart",this.touchStart),Object(u["a"])(document,"touchmove",this.onTouchMove),n.lockCount||document.body.classList.remove("van-overflow-hidden")),this.opened=!1,x(this),this.$emit("input",!1))},onTouchMove:function(t){this.touchMove(t);var e=this.deltaY>0?"10":"01",i=Object(j["d"])(t.target,this.$el),n=i.scrollHeight,o=i.offsetHeight,a=i.scrollTop,s="11";0===a?s=o>=n?"00":"01":a+o>=n&&(s="10"),"11"===s||"vertical"!==this.direction||parseInt(s,2)&parseInt(e,2)||Object(u["c"])(t,!0)},renderOverlay:function(){var t=this;!this.$isServer&&this.value&&this.$nextTick((function(){t.updateZIndex(t.overlay?1:0),t.overlay?O(t,{zIndex:n.zIndex++,duration:t.duration,className:t.overlayClass,customStyle:t.overlayStyle}):x(t)}))},updateZIndex:function(t){void 0===t&&(t=0),this.$el.style.zIndex=++n.zIndex+t}}}}},7744:function(t,e,i){"use strict";var n=i("c31d"),o=i("2638"),a=i.n(o),s=i("d282"),r=i("a142"),c=i("ba31"),l=i("48f4"),u=i("dfaf"),h=i("ad06"),d=Object(s["a"])("cell"),f=d[0],v=d[1];function m(t,e,i,n){var o=e.icon,s=e.size,u=e.title,d=e.label,f=e.value,m=e.isLink,p=i.title||Object(r["b"])(u);function g(){var n=i.label||Object(r["b"])(d);if(n)return t("div",{class:[v("label"),e.labelClass]},[i.label?i.label():d])}function b(){if(p)return t("div",{class:[v("title"),e.titleClass],style:e.titleStyle},[i.title?i.title():t("span",[u]),g()])}function y(){var n=i.default||Object(r["b"])(f);if(n)return t("div",{class:[v("value",{alone:!p}),e.valueClass]},[i.default?i.default():t("span",[f])])}function w(){return i.icon?i.icon():o?t(h["a"],{class:v("left-icon"),attrs:{name:o,classPrefix:e.iconPrefix}}):void 0}function S(){var n=i["right-icon"];if(n)return n();if(m){var o=e.arrowDirection;return t(h["a"],{class:v("right-icon"),attrs:{name:o?"arrow-"+o:"arrow"}})}}function O(t){Object(c["a"])(n,"click",t),Object(l["a"])(n)}var x=m||e.clickable,C={clickable:x,center:e.center,required:e.required,borderless:!e.border};return s&&(C[s]=s),t("div",a()([{class:v(C),attrs:{role:x?"button":null,tabindex:x?0:null},on:{click:O}},Object(c["b"])(n)]),[w(),b(),y(),S(),null==i.extra?void 0:i.extra()])}m.props=Object(n["a"])(Object(n["a"])({},u["a"]),l["c"]),e["a"]=f(m)},"786d":function(t,e,i){},8270:function(t,e,i){},"8f80":function(t,e,i){"use strict";var n=i("c31d"),o=i("d282"),a=i("ea8e"),s=i("a142");function r(t){return Array.isArray(t)?t:[t]}function c(t,e){return new Promise((function(i){if("file"!==e){var n=new FileReader;n.onload=function(t){i(t.target.result)},"dataUrl"===e?n.readAsDataURL(t):"text"===e&&n.readAsText(t)}else i()}))}function l(t,e){return r(t).some((function(t){return t.size>e}))}var u=/\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;function h(t){return u.test(t)}function d(t){return!!t.isImage||(t.file&&t.file.type?0===t.file.type.indexOf("image"):t.url?h(t.url):!!t.content&&0===t.content.indexOf("data:image"))}var f={inject:{vanField:{default:null}},watch:{value:function(){var t=this.vanField;t&&(t.resetValidation(),t.validateWithTrigger("onChange"))}},created:function(){var t=this.vanField;t&&!t.children&&(t.children=this)}},v=i("ad06"),m=i("2638"),p=i.n(m),g=Object(o["a"])("image"),b=g[0],y=g[1],w=b({props:{src:String,fit:String,alt:String,round:Boolean,width:[Number,String],height:[Number,String],radius:[Number,String],lazyLoad:Boolean,showError:{type:Boolean,default:!0},showLoading:{type:Boolean,default:!0},errorIcon:{type:String,default:"warning-o"},loadingIcon:{type:String,default:"photo-o"}},data:function(){return{loading:!0,error:!1}},watch:{src:function(){this.loading=!0,this.error=!1}},computed:{style:function(){var t={};return Object(s["b"])(this.width)&&(t.width=Object(a["a"])(this.width)),Object(s["b"])(this.height)&&(t.height=Object(a["a"])(this.height)),Object(s["b"])(this.radius)&&(t.overflow="hidden",t.borderRadius=Object(a["a"])(this.radius)),t}},created:function(){var t=this.$Lazyload;t&&(t.$on("loaded",this.onLazyLoaded),t.$on("error",this.onLazyLoadError))},beforeDestroy:function(){var t=this.$Lazyload;t&&(t.$off("loaded",this.onLazyLoaded),t.$off("error",this.onLazyLoadError))},methods:{onLoad:function(t){this.loading=!1,this.$emit("load",t)},onLazyLoaded:function(t){var e=t.el;e===this.$refs.image&&this.loading&&this.onLoad()},onLazyLoadError:function(t){var e=t.el;e!==this.$refs.image||this.error||this.onError()},onError:function(t){this.error=!0,this.loading=!1,this.$emit("error",t)},onClick:function(t){this.$emit("click",t)},genPlaceholder:function(){var t=this.$createElement;return this.loading&&this.showLoading?t("div",{class:y("loading")},[this.slots("loading")||t(v["a"],{attrs:{name:this.loadingIcon},class:y("loading-icon")})]):this.error&&this.showError?t("div",{class:y("error")},[this.slots("error")||t(v["a"],{attrs:{name:this.errorIcon},class:y("error-icon")})]):void 0},genImage:function(){var t=this.$createElement,e={class:y("img"),attrs:{alt:this.alt},style:{objectFit:this.fit}};if(!this.error)return this.lazyLoad?t("img",p()([{ref:"image",directives:[{name:"lazy",value:this.src}]},e])):t("img",p()([{attrs:{src:this.src},on:{load:this.onLoad,error:this.onError}},e]))}},render:function(){var t=arguments[0];return t("div",{class:y({round:this.round}),style:this.style,on:{click:this.onClick}},[this.genImage(),this.genPlaceholder()])}}),S=i("543e"),O=i("2b0e"),x=i("482d"),C=i("1325"),j=i("6605"),z=i("3875"),T=i("5596"),$=i("2bb1"),I=Object(o["a"])("image-preview"),k=I[0],P=I[1],M=250;function L(t){return Math.sqrt(Math.pow(t[0].clientX-t[1].clientX,2)+Math.pow(t[0].clientY-t[1].clientY,2))}var B,N=k({mixins:[Object(j["a"])({skipToggleEvent:!0}),z["a"]],props:{className:null,asyncClose:Boolean,showIndicators:Boolean,images:{type:Array,default:function(){return[]}},loop:{type:Boolean,default:!0},swipeDuration:{type:[Number,String],default:500},overlay:{type:Boolean,default:!0},showIndex:{type:Boolean,default:!0},startPosition:{type:[Number,String],default:0},minZoom:{type:[Number,String],default:1/3},maxZoom:{type:[Number,String],default:3},overlayClass:{type:String,default:P("overlay")},closeable:Boolean,closeIcon:{type:String,default:"clear"},closeIconPosition:{type:String,default:"top-right"}},data:function(){return{scale:1,moveX:0,moveY:0,active:0,moving:!1,zooming:!1,doubleClickTimer:null}},computed:{imageStyle:function(){var t=this.scale,e={transitionDuration:this.zooming||this.moving?"0s":".3s"};return 1!==t&&(e.transform="scale3d("+t+", "+t+", 1) translate("+this.moveX/t+"px, "+this.moveY/t+"px)"),e}},watch:{startPosition:"setActive",value:function(t){var e=this;t?(this.setActive(+this.startPosition),this.$nextTick((function(){e.$refs.swipe.swipeTo(+e.startPosition,{immediate:!0})}))):this.$emit("close",{index:this.active,url:this.images[this.active]})},shouldRender:{handler:function(t){var e=this;t&&this.$nextTick((function(){var t=e.$refs.swipe.$el;Object(C["b"])(t,"touchstart",e.onWrapperTouchStart),Object(C["b"])(t,"touchmove",C["c"]),Object(C["b"])(t,"touchend",e.onWrapperTouchEnd),Object(C["b"])(t,"touchcancel",e.onWrapperTouchEnd)}))},immediate:!0}},methods:{emitClose:function(){this.asyncClose||this.$emit("input",!1)},onWrapperTouchStart:function(){this.touchStartTime=new Date},onWrapperTouchEnd:function(t){var e=this;Object(C["c"])(t);var i=new Date-this.touchStartTime,n=this.$refs.swipe||{},o=n.offsetX,a=void 0===o?0:o,s=n.offsetY,r=void 0===s?0:s;i<M&&a<10&&r<10&&(this.doubleClickTimer?(clearTimeout(this.doubleClickTimer),this.doubleClickTimer=null,this.toggleScale()):this.doubleClickTimer=setTimeout((function(){e.emitClose(),e.doubleClickTimer=null}),M))},startMove:function(t){var e=t.currentTarget,i=e.getBoundingClientRect(),n=window.innerWidth,o=window.innerHeight;this.touchStart(t),this.moving=!0,this.startMoveX=this.moveX,this.startMoveY=this.moveY,this.maxMoveX=Math.max(0,(i.width-n)/2),this.maxMoveY=Math.max(0,(i.height-o)/2)},startZoom:function(t){this.moving=!1,this.zooming=!0,this.startScale=this.scale,this.startDistance=L(t.touches)},onImageTouchStart:function(t){var e=t.touches,i=this.$refs.swipe||{},n=i.offsetX,o=void 0===n?0:n;1===e.length&&1!==this.scale?this.startMove(t):2!==e.length||o||this.startZoom(t)},onImageTouchMove:function(t){var e=t.touches;if((this.moving||this.zooming)&&Object(C["c"])(t,!0),this.moving){this.touchMove(t);var i=this.deltaX+this.startMoveX,n=this.deltaY+this.startMoveY;this.moveX=Object(x["b"])(i,-this.maxMoveX,this.maxMoveX),this.moveY=Object(x["b"])(n,-this.maxMoveY,this.maxMoveY)}if(this.zooming&&2===e.length){var o=L(e),a=this.startScale*o/this.startDistance;this.setScale(a)}},onImageTouchEnd:function(t){if(this.moving||this.zooming){var e=!0;this.moving&&this.startMoveX===this.moveX&&this.startMoveY===this.moveY&&(e=!1),t.touches.length||(this.moving=!1,this.zooming=!1,this.startMoveX=0,this.startMoveY=0,this.startScale=1,this.scale<1&&this.resetScale()),e&&Object(C["c"])(t,!0)}},setActive:function(t){this.resetScale(),t!==this.active&&(this.active=t,this.$emit("change",t))},setScale:function(t){var e=Object(x["b"])(t,+this.minZoom,+this.maxZoom);this.scale=e,this.$emit("scale",{index:this.active,scale:e})},resetScale:function(){this.setScale(1),this.moveX=0,this.moveY=0},toggleScale:function(){var t=this.scale>1?1:2;this.setScale(t),this.moveX=0,this.moveY=0},genIndex:function(){var t=this.$createElement;if(this.showIndex)return t("div",{class:P("index")},[this.slots("index")||this.active+1+" / "+this.images.length])},genCover:function(){var t=this.$createElement,e=this.slots("cover");if(e)return t("div",{class:P("cover")},[e])},genImages:function(){var t=this,e=this.$createElement,i={loading:function(){return e(S["a"],{attrs:{type:"spinner"}})}};return e(T["a"],{ref:"swipe",attrs:{lazyRender:!0,loop:this.loop,indicatorColor:"white",duration:this.swipeDuration,initialSwipe:this.startPosition,showIndicators:this.showIndicators},class:P("swipe"),on:{change:this.setActive}},[this.images.map((function(n,o){return e($["a"],[e(w,{attrs:{src:n,fit:"contain"},class:P("image"),scopedSlots:i,style:o===t.active?t.imageStyle:null,nativeOn:{touchstart:t.onImageTouchStart,touchmove:t.onImageTouchMove,touchend:t.onImageTouchEnd,touchcancel:t.onImageTouchEnd}})])}))])},genClose:function(){var t=this.$createElement;if(this.closeable)return t(v["a"],{attrs:{role:"button",name:this.closeIcon},class:P("close-icon",this.closeIconPosition),on:{click:this.emitClose}})},onClosed:function(){this.$emit("closed")}},render:function(){var t=arguments[0];if(this.shouldRender)return t("transition",{attrs:{name:"van-fade"},on:{afterLeave:this.onClosed}},[t("div",{directives:[{name:"show",value:this.value}],class:[P(),this.className]},[this.genClose(),this.genImages(),this.genIndex(),this.genCover()])])}}),E={loop:!0,images:[],value:!0,minZoom:1/3,maxZoom:3,className:"",onClose:null,onChange:null,showIndex:!0,closeable:!1,closeIcon:"clear",asyncClose:!1,startPosition:0,swipeDuration:500,showIndicators:!1,closeOnPopstate:!1,closeIconPosition:"top-right"},Y=function(){B=new(O["a"].extend(N))({el:document.createElement("div")}),document.body.appendChild(B.$el),B.$on("change",(function(t){B.onChange&&B.onChange(t)})),B.$on("scale",(function(t){B.onScale&&B.onScale(t)}))},D=function(t,e){if(void 0===e&&(e=0),!s["f"]){B||Y();var i=Array.isArray(t)?{images:t,startPosition:e}:t;return Object(n["a"])(B,E,i),B.$once("input",(function(t){B.value=t})),B.$once("closed",(function(){B.images=[]})),i.onClose&&(B.$off("close"),B.$once("close",i.onClose)),B}};D.Component=N,D.install=function(){O["a"].use(N)};var X=D,A=Object(o["a"])("uploader"),R=A[0],F=A[1];e["a"]=R({inheritAttrs:!1,mixins:[f],model:{prop:"fileList"},props:{disabled:Boolean,lazyLoad:Boolean,uploadText:String,afterRead:Function,beforeRead:Function,beforeDelete:Function,previewSize:[Number,String],name:{type:[Number,String],default:""},accept:{type:String,default:"image/*"},fileList:{type:Array,default:function(){return[]}},maxSize:{type:[Number,String],default:Number.MAX_VALUE},maxCount:{type:[Number,String],default:Number.MAX_VALUE},deletable:{type:Boolean,default:!0},showUpload:{type:Boolean,default:!0},previewImage:{type:Boolean,default:!0},previewFullImage:{type:Boolean,default:!0},imageFit:{type:String,default:"cover"},resultType:{type:String,default:"dataUrl"},uploadIcon:{type:String,default:"photograph"}},computed:{previewSizeWithUnit:function(){return Object(a["a"])(this.previewSize)},value:function(){return this.fileList}},methods:{getDetail:function(t){return void 0===t&&(t=this.fileList.length),{name:this.name,index:t}},onChange:function(t){var e=this,i=t.target.files;if(!this.disabled&&i.length){if(i=1===i.length?i[0]:[].slice.call(i),this.beforeRead){var n=this.beforeRead(i,this.getDetail());if(!n)return void this.resetInput();if(Object(s["e"])(n))return void n.then((function(t){t?e.readFile(t):e.readFile(i)})).catch(this.resetInput)}this.readFile(i)}},readFile:function(t){var e=this,i=l(t,this.maxSize);if(Array.isArray(t)){var n=this.maxCount-this.fileList.length;t.length>n&&(t=t.slice(0,n)),Promise.all(t.map((function(t){return c(t,e.resultType)}))).then((function(n){var o=t.map((function(t,e){var i={file:t,status:"",message:""};return n[e]&&(i.content=n[e]),i}));e.onAfterRead(o,i)}))}else c(t,this.resultType).then((function(n){var o={file:t,status:"",message:""};n&&(o.content=n),e.onAfterRead(o,i)}))},onAfterRead:function(t,e){var i=this;this.resetInput();var n=t;if(e){var o=t;Array.isArray(t)?(o=[],n=[],t.forEach((function(t){t.file&&(t.file.size>i.maxSize?o.push(t):n.push(t))}))):n=null,this.$emit("oversize",o,this.getDetail())}var a=Array.isArray(n)?Boolean(n.length):Boolean(n);a&&(this.$emit("input",[].concat(this.fileList,r(n))),this.afterRead&&this.afterRead(n,this.getDetail()))},onDelete:function(t,e){var i=this;if(this.beforeDelete){var n=this.beforeDelete(t,this.getDetail(e));if(!n)return;if(Object(s["e"])(n))return void n.then((function(){i.deleteFile(t,e)})).catch(s["g"])}this.deleteFile(t,e)},deleteFile:function(t,e){var i=this.fileList.slice(0);i.splice(e,1),this.$emit("input",i),this.$emit("delete",t,this.getDetail(e))},resetInput:function(){this.$refs.input&&(this.$refs.input.value="")},onPreviewImage:function(t){var e=this;if(this.previewFullImage){var i=this.fileList.filter((function(t){return d(t)})),n=i.map((function(t){return t.content||t.url}));this.imagePreview=X({images:n,closeOnPopstate:!0,startPosition:i.indexOf(t),onClose:function(){e.$emit("close-preview")}})}},closeImagePreview:function(){this.imagePreview&&this.imagePreview.close()},chooseFile:function(){this.disabled||this.$refs.input&&this.$refs.input.click()},genPreviewMask:function(t){var e=this.$createElement,i=t.status,n=t.message;if("uploading"===i||"failed"===i){var o="failed"===i?e(v["a"],{attrs:{name:"warning-o"},class:F("mask-icon")}):e(S["a"],{class:F("loading")}),a=Object(s["b"])(n)&&""!==n;return e("div",{class:F("mask")},[o,a&&e("div",{class:F("mask-message")},[n])])}},genPreviewItem:function(t,e){var i=this,n=this.$createElement,o="uploading"!==t.status&&this.deletable,a=o&&n(v["a"],{attrs:{name:"clear"},class:F("preview-delete"),on:{click:function(n){n.stopPropagation(),i.onDelete(t,e)}}}),s=d(t)?n(w,{attrs:{fit:this.imageFit,src:t.content||t.url,width:this.previewSize,height:this.previewSize,lazyLoad:this.lazyLoad},class:F("preview-image"),on:{click:function(){i.onPreviewImage(t)}}}):n("div",{class:F("file"),style:{width:this.previewSizeWithUnit,height:this.previewSizeWithUnit}},[n(v["a"],{class:F("file-icon"),attrs:{name:"description"}}),n("div",{class:[F("file-name"),"van-ellipsis"]},[t.file?t.file.name:t.url])]);return n("div",{class:F("preview"),on:{click:function(){i.$emit("click-preview",t,i.getDetail(e))}}},[s,this.genPreviewMask(t),a])},genPreviewList:function(){if(this.previewImage)return this.fileList.map(this.genPreviewItem)},genUpload:function(){var t=this.$createElement;if(!(this.fileList.length>=this.maxCount)&&this.showUpload){var e,i=this.slots(),o=t("input",{attrs:Object(n["a"])(Object(n["a"])({},this.$attrs),{},{type:"file",accept:this.accept,disabled:this.disabled}),ref:"input",class:F("input"),on:{change:this.onChange}});if(i)return t("div",{class:F("input-wrapper")},[i,o]);if(this.previewSize){var a=this.previewSizeWithUnit;e={width:a,height:a}}return t("div",{class:F("upload"),style:e},[t(v["a"],{attrs:{name:this.uploadIcon},class:F("upload-icon")}),this.uploadText&&t("span",{class:F("upload-text")},[this.uploadText]),o])}}},render:function(){var t=arguments[0];return t("div",{class:F()},[t("div",{class:F("wrapper",{disabled:this.disabled})},[this.genPreviewList(),this.genUpload()])])}})},a71a:function(t,e,i){},a8c1:function(t,e,i){"use strict";function n(t){return t===window}i.d(e,"d",(function(){return a})),i.d(e,"c",(function(){return s})),i.d(e,"h",(function(){return r})),i.d(e,"b",(function(){return c})),i.d(e,"g",(function(){return l})),i.d(e,"a",(function(){return u})),i.d(e,"e",(function(){return h})),i.d(e,"f",(function(){return d}));var o=/scroll|auto/i;function a(t,e){void 0===e&&(e=window);var i=t;while(i&&"HTML"!==i.tagName&&1===i.nodeType&&i!==e){var n=window.getComputedStyle(i),a=n.overflowY;if(o.test(a)){if("BODY"!==i.tagName)return i;var s=window.getComputedStyle(i.parentNode),r=s.overflowY;if(o.test(r))return i}i=i.parentNode}return e}function s(t){return"scrollTop"in t?t.scrollTop:t.pageYOffset}function r(t,e){"scrollTop"in t?t.scrollTop=e:t.scrollTo(t.scrollX,e)}function c(){return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0}function l(t){r(window,t),r(document.body,t)}function u(t,e){if(n(t))return 0;var i=e?s(e):c();return t.getBoundingClientRect().top+i}function h(t){return n(t)?t.innerHeight:t.getBoundingClientRect().height}function d(t){return n(t)?0:t.getBoundingClientRect().top}},bcd3:function(t,e,i){},dfaf:function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));var n={icon:String,size:String,center:Boolean,isLink:Boolean,required:Boolean,clickable:Boolean,iconPrefix:String,titleStyle:null,titleClass:null,valueClass:null,labelClass:null,title:[Number,String],value:[Number,String],label:[Number,String],arrowDirection:String,border:{type:Boolean,default:!0}}},e3b3:function(t,e,i){},e930:function(t,e,i){"use strict";i("68ef"),i("a71a"),i("9d70"),i("3743"),i("09fe"),i("4d75"),i("e3b3"),i("8270"),i("786d"),i("504b"),i("bcd3")}}]);
//# sourceMappingURL=chunk-00ff08b0.8499766f.js.map