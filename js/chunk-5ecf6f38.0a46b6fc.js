(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5ecf6f38"],{"068a":function(t,e,n){},"092d":function(t,e,n){"use strict";function o(t){var e=t.parentNode;e&&e.removeChild(t)}n.d(e,"a",(function(){return o}))},1325:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"a",(function(){return c})),n.d(e,"c",(function(){return l}));var o=n("a142"),i=!1;if(!o["f"])try{var a={};Object.defineProperty(a,"passive",{get:function(){i=!0}}),window.addEventListener("test-passive",null,a)}catch(u){}function r(t,e,n,a){void 0===a&&(a=!1),o["f"]||t.addEventListener(e,n,!!i&&{capture:!1,passive:a})}function c(t,e,n){o["f"]||t.removeEventListener(e,n)}function s(t){t.stopPropagation()}function l(t,e){("boolean"!==typeof t.cancelable||t.cancelable)&&t.preventDefault(),e&&s(t)}},1421:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var o=n("2b0e");function i(t){return"string"===typeof t?document.querySelector(t):t()}function a(t){var e=t.ref,n=t.afterPortal;return o["a"].extend({props:{getContainer:[String,Function]},watch:{getContainer:"portal"},mounted:function(){this.getContainer&&this.portal()},methods:{portal:function(){var t,o=this.getContainer,a=e?this.$refs[e]:this.$el;o?t=i(o):this.$parent&&(t=this.$parent.$el),t&&t!==a.parentNode&&t.appendChild(a),n&&n.call(this)}}})}},"1a04":function(t,e,n){},"2fcb":function(t,e,n){},"32ad":function(t,e,n){"use strict";var o=n("068a"),i=n.n(o);i.a},3875:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var o=n("2b0e"),i=n("1325"),a=10;function r(t,e){return t>e&&t>a?"horizontal":e>t&&e>a?"vertical":""}var c=o["a"].extend({data:function(){return{direction:""}},methods:{touchStart:function(t){this.resetTouchStatus(),this.startX=t.touches[0].clientX,this.startY=t.touches[0].clientY},touchMove:function(t){var e=t.touches[0];this.deltaX=e.clientX-this.startX,this.deltaY=e.clientY-this.startY,this.offsetX=Math.abs(this.deltaX),this.offsetY=Math.abs(this.deltaY),this.direction=this.direction||r(this.offsetX,this.offsetY)},resetTouchStatus:function(){this.direction="",this.deltaX=0,this.deltaY=0,this.offsetX=0,this.offsetY=0},bindTouchEvent:function(t){var e=this,n=e.onTouchStart,o=e.onTouchMove,a=e.onTouchEnd;Object(i["b"])(t,"touchstart",n),Object(i["b"])(t,"touchmove",o),a&&(Object(i["b"])(t,"touchend",a),Object(i["b"])(t,"touchcancel",a))}}})},4598:function(t,e,n){"use strict";(function(t){n.d(e,"c",(function(){return l})),n.d(e,"b",(function(){return u})),n.d(e,"a",(function(){return d}));var o=n("a142"),i=Date.now();function a(t){var e=Date.now(),n=Math.max(0,16-(e-i)),o=setTimeout(t,n);return i=e+n,o}var r=o["f"]?t:window,c=r.requestAnimationFrame||a,s=r.cancelAnimationFrame||r.clearTimeout;function l(t){return c.call(r,t)}function u(t){l((function(){l(t)}))}function d(t){s.call(r,t)}}).call(this,n("c8ba"))},"4d75":function(t,e,n){},"543e":function(t,e,n){"use strict";var o=n("2638"),i=n.n(o),a=n("d282"),r=n("ea8e"),c=n("ba31"),s=Object(a["a"])("loading"),l=s[0],u=s[1];function d(t,e){if("spinner"===e.type){for(var n=[],o=0;o<12;o++)n.push(t("i"));return n}return t("svg",{class:u("circular"),attrs:{viewBox:"25 25 50 50"}},[t("circle",{attrs:{cx:"50",cy:"50",r:"20",fill:"none"}})])}function f(t,e,n){if(n.default){var o=e.textSize&&{fontSize:Object(r["a"])(e.textSize)};return t("span",{class:u("text"),style:o},[n.default()])}}function h(t,e,n,o){var a=e.color,s=e.size,l=e.type,h={color:a};if(s){var v=Object(r["a"])(s);h.width=v,h.height=v}return t("div",i()([{class:u([l,{vertical:e.vertical}])},Object(c["b"])(o,!0)]),[t("span",{class:u("spinner",l),style:h},[d(t,e)]),f(t,e,n)])}h.props={color:String,size:[Number,String],vertical:Boolean,textSize:[Number,String],type:{type:String,default:"circular"}},e["a"]=l(h)},"5fbe":function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var o=n("1325");function i(t){function e(){this.binded||(t.call(this,o["b"],!0),this.binded=!0)}function n(){this.binded&&(t.call(this,o["a"],!1),this.binded=!1)}return{mounted:e,activated:e,deactivated:n,beforeDestroy:n}}},6605:function(t,e,n){"use strict";var o={zIndex:2e3,lockCount:0,stack:[],get top(){return this.stack[this.stack.length-1]}},i=n("c31d"),a=n("2638"),r=n.n(a),c=n("d282"),s=n("a142"),l=n("ba31"),u=n("1325"),d=Object(c["a"])("overlay"),f=d[0],h=d[1];function v(t){Object(u["c"])(t,!0)}function b(t,e,n,o){var a=Object(i["a"])({zIndex:e.zIndex},e.customStyle);return Object(s["b"])(e.duration)&&(a.animationDuration=e.duration+"s"),t("transition",{attrs:{name:"van-fade"}},[t("div",r()([{directives:[{name:"show",value:e.show}],style:a,class:[h(),e.className],on:{touchmove:e.lockScroll?v:s["g"]}},Object(l["b"])(o,!0)]),[null==n.default?void 0:n.default()])])}b.props={show:Boolean,zIndex:[Number,String],duration:[Number,String],className:null,customStyle:Object,lockScroll:{type:Boolean,default:!0}};var p,m=f(b),g={className:"",customStyle:{}};function O(){if(o.top){var t=o.top.vm;t.$emit("click-overlay"),t.closeOnClickOverlay&&(t.onClickOverlay?t.onClickOverlay():t.close())}}function y(){p=Object(l["c"])(m,{on:{click:O}})}function w(){if(p||y(),o.top){var t=o.top,e=t.vm,n=t.config,a=e.$el;a&&a.parentNode?a.parentNode.insertBefore(p.$el,a):document.body.appendChild(p.$el),Object(i["a"])(p,g,n,{show:!0})}else p.show=!1}function C(t,e){o.stack.some((function(e){return e.vm===t}))||(o.stack.push({vm:t,config:e}),w())}function j(t){var e=o.stack;e.length&&(o.top.vm===t?(e.pop(),w()):o.stack=e.filter((function(e){return e.vm!==t})))}var S=n("092d"),k=n("a8c1"),x=n("3875"),B=n("1421"),P=n("5fbe"),T={mixins:[Object(P["a"])((function(t,e){this.handlePopstate(e&&this.closeOnPopstate)}))],props:{closeOnPopstate:Boolean},data:function(){return{bindStatus:!1}},watch:{closeOnPopstate:function(t){this.handlePopstate(t)}},methods:{handlePopstate:function(t){var e=this;if(!this.$isServer&&this.bindStatus!==t){this.bindStatus=t;var n=t?u["b"]:u["a"];n(window,"popstate",(function(){e.close(),e.shouldReopen=!1}))}}}};n.d(e,"a",(function(){return z}));var $={value:Boolean,overlay:Boolean,overlayStyle:Object,overlayClass:String,closeOnClickOverlay:Boolean,zIndex:[Number,String],lockScroll:{type:Boolean,default:!0},lazyRender:{type:Boolean,default:!0}};function z(t){return void 0===t&&(t={}),{mixins:[x["a"],T,Object(B["a"])({afterPortal:function(){this.overlay&&w()}})],props:$,data:function(){return{inited:this.value}},computed:{shouldRender:function(){return this.inited||!this.lazyRender}},watch:{value:function(e){var n=e?"open":"close";this.inited=this.inited||this.value,this[n](),t.skipToggleEvent||this.$emit(n)},overlay:"renderOverlay"},mounted:function(){this.value&&this.open()},activated:function(){this.shouldReopen&&(this.$emit("input",!0),this.shouldReopen=!1)},beforeDestroy:function(){this.close(),this.getContainer&&Object(S["a"])(this.$el)},deactivated:function(){this.value&&(this.close(),this.shouldReopen=!0)},methods:{open:function(){this.$isServer||this.opened||(void 0!==this.zIndex&&(o.zIndex=this.zIndex),this.opened=!0,this.renderOverlay(),this.lockScroll&&(Object(u["b"])(document,"touchstart",this.touchStart),Object(u["b"])(document,"touchmove",this.onTouchMove),o.lockCount||document.body.classList.add("van-overflow-hidden"),o.lockCount++))},close:function(){this.opened&&(this.lockScroll&&(o.lockCount--,Object(u["a"])(document,"touchstart",this.touchStart),Object(u["a"])(document,"touchmove",this.onTouchMove),o.lockCount||document.body.classList.remove("van-overflow-hidden")),this.opened=!1,j(this),this.$emit("input",!1))},onTouchMove:function(t){this.touchMove(t);var e=this.deltaY>0?"10":"01",n=Object(k["d"])(t.target,this.$el),o=n.scrollHeight,i=n.offsetHeight,a=n.scrollTop,r="11";0===a?r=i>=o?"00":"01":a+i>=o&&(r="10"),"11"===r||"vertical"!==this.direction||parseInt(r,2)&parseInt(e,2)||Object(u["c"])(t,!0)},renderOverlay:function(){var t=this;!this.$isServer&&this.value&&this.$nextTick((function(){t.updateZIndex(t.overlay?1:0),t.overlay?C(t,{zIndex:o.zIndex++,duration:t.duration,className:t.overlayClass,customStyle:t.overlayStyle}):j(t)}))},updateZIndex:function(t){void 0===t&&(t=0),this.$el.style.zIndex=++o.zIndex+t}}}}},7744:function(t,e,n){"use strict";var o=n("c31d"),i=n("2638"),a=n.n(i),r=n("d282"),c=n("a142"),s=n("ba31"),l=n("48f4"),u=n("dfaf"),d=n("ad06"),f=Object(r["a"])("cell"),h=f[0],v=f[1];function b(t,e,n,o){var i=e.icon,r=e.size,u=e.title,f=e.label,h=e.value,b=e.isLink,p=n.title||Object(c["b"])(u);function m(){var o=n.label||Object(c["b"])(f);if(o)return t("div",{class:[v("label"),e.labelClass]},[n.label?n.label():f])}function g(){if(p)return t("div",{class:[v("title"),e.titleClass],style:e.titleStyle},[n.title?n.title():t("span",[u]),m()])}function O(){var o=n.default||Object(c["b"])(h);if(o)return t("div",{class:[v("value",{alone:!p}),e.valueClass]},[n.default?n.default():t("span",[h])])}function y(){return n.icon?n.icon():i?t(d["a"],{class:v("left-icon"),attrs:{name:i,classPrefix:e.iconPrefix}}):void 0}function w(){var o=n["right-icon"];if(o)return o();if(b){var i=e.arrowDirection;return t(d["a"],{class:v("right-icon"),attrs:{name:i?"arrow-"+i:"arrow"}})}}function C(t){Object(s["a"])(o,"click",t),Object(l["a"])(o)}var j=b||e.clickable,S={clickable:j,center:e.center,required:e.required,borderless:!e.border};return r&&(S[r]=r),t("div",a()([{class:v(S),attrs:{role:j?"button":null,tabindex:j?0:null},on:{click:C}},Object(s["b"])(o)]),[y(),g(),O(),w(),null==n.extra?void 0:n.extra()])}b.props=Object(o["a"])(Object(o["a"])({},u["a"]),l["c"]),e["a"]=h(b)},7975:function(t,e,n){"use strict";n.r(e);var o,i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"row"}},[n("van-nav-bar",{attrs:{title:"个人信息","left-text":"更多资料","right-text":"退出登录"},on:{"click-left":t.onClickLeft,"click-right":t.onClickRight}}),n("transition",{attrs:{name:"fade"}},[t.show?n("div",[n("div",{staticStyle:{"margin-top":"3.8rem"}},[n("div",{staticClass:"head shake"},[n("van-circle",{attrs:{rate:70,speed:200,size:"12rem",color:t.gradientColor},model:{value:t.currentRate,callback:function(e){t.currentRate=e},expression:"currentRate"}}),n("img",{staticClass:"card-img-top ",staticStyle:{"border-radius":"90%"},attrs:{src:t.Person.avatar,alt:"Card image cap"}})],1)]),n("div",{staticStyle:{margin:"20px"}},[n("van-divider",{style:{color:"#969799",borderColor:"rgb(4, 4, 4)",padding:"0 2rem"}},[t._v(t._s(t.currentRate)+"%信息完成度")])],1),n("van-cell-group",[n("van-cell",{attrs:{title:"昵称：",value:t.Person.name}}),n("van-cell",{attrs:{title:"职业：",value:t.Person.job}}),n("van-cell",{attrs:{title:"性别：",value:t.Person.sex}}),n("van-cell",{attrs:{title:"种族：",value:t.Person.race}}),n("van-cell",{attrs:{title:"简介",value:t.Person.Introduction}}),n("van-cell",{attrs:{title:"注册时间:",value:t.Person.time}})],1)],1):t._e()])],1)},a=[],r=(n("a4d3"),n("4de4"),n("4160"),n("b0c0"),n("e439"),n("dbb4"),n("b64b"),n("ac1f"),n("5319"),n("159b"),n("2b28"),n("9ed2")),c=(n("e566"),n("5d26")),s=(n("c194"),n("7744")),l=(n("0653"),n("34e9")),u=(n("5246"),n("6b41")),d=(n("5f1a"),n("a3e2")),f=(n("68ef"),n("a71a"),n("9d70"),n("3743"),n("4d75"),n("e3b3"),n("bc1b"),n("2fcb"),n("c31d")),h=n("2b0e"),v=n("d282"),b=n("ea8e"),p=n("b1d2"),m=n("6605"),g=n("b650"),O=Object(v["a"])("dialog"),y=O[0],w=O[1],C=O[2],j=y({mixins:[Object(m["a"])()],props:{title:String,width:[Number,String],message:String,className:null,callback:Function,beforeClose:Function,messageAlign:String,cancelButtonText:String,cancelButtonColor:String,confirmButtonText:String,confirmButtonColor:String,showCancelButton:Boolean,transition:{type:String,default:"van-dialog-bounce"},showConfirmButton:{type:Boolean,default:!0},overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!1}},data:function(){return{loading:{confirm:!1,cancel:!1}}},methods:{onClickOverlay:function(){this.handleAction("overlay")},handleAction:function(t){var e=this;this.$emit(t),this.value&&(this.beforeClose?(this.loading[t]=!0,this.beforeClose(t,(function(n){!1!==n&&e.loading[t]&&e.onClose(t),e.loading.confirm=!1,e.loading.cancel=!1}))):this.onClose(t))},onClose:function(t){this.close(),this.callback&&this.callback(t)},onOpened:function(){this.$emit("opened")},onClosed:function(){this.$emit("closed")},genButtons:function(){var t,e=this,n=this.$createElement,o=this.showCancelButton&&this.showConfirmButton;return n("div",{class:[p["f"],w("footer",{buttons:o})]},[this.showCancelButton&&n(g["a"],{attrs:{size:"large",loading:this.loading.cancel,text:this.cancelButtonText||C("cancel")},class:w("cancel"),style:{color:this.cancelButtonColor},on:{click:function(){e.handleAction("cancel")}}}),this.showConfirmButton&&n(g["a"],{attrs:{size:"large",loading:this.loading.confirm,text:this.confirmButtonText||C("confirm")},class:[w("confirm"),(t={},t[p["d"]]=o,t)],style:{color:this.confirmButtonColor},on:{click:function(){e.handleAction("confirm")}}})])}},render:function(){var t,e=arguments[0];if(this.shouldRender){var n=this.message,o=this.messageAlign,i=this.slots(),a=this.slots("title")||this.title,r=a&&e("div",{class:w("header",{isolated:!n&&!i})},[a]),c=(i||n)&&e("div",{class:w("content")},[i||e("div",{domProps:{innerHTML:n},class:w("message",(t={"has-title":a},t[o]=o,t))})]);return e("transition",{attrs:{name:this.transition},on:{afterEnter:this.onOpened,afterLeave:this.onClosed}},[e("div",{directives:[{name:"show",value:this.value}],attrs:{role:"dialog","aria-labelledby":this.title||n},class:[w(),this.className],style:{width:Object(b["a"])(this.width)}},[r,c,this.genButtons()])])}}}),S=n("a142");function k(t){return document.body.contains(t)}function x(){o&&o.$destroy(),o=new(h["a"].extend(j))({el:document.createElement("div"),propsData:{lazyRender:!1}}),o.$on("input",(function(t){o.value=t}))}function B(t){return S["f"]?Promise.resolve():new Promise((function(e,n){o&&k(o.$el)||x(),Object(f["a"])(o,B.currentOptions,t,{resolve:e,reject:n})}))}B.defaultOptions={value:!0,title:"",width:"",message:"",overlay:!0,className:"",lockScroll:!0,transition:"van-dialog-bounce",beforeClose:null,overlayClass:"",overlayStyle:null,messageAlign:"",getContainer:"body",cancelButtonText:"",cancelButtonColor:null,confirmButtonText:"",confirmButtonColor:null,showConfirmButton:!0,showCancelButton:!1,closeOnPopstate:!1,closeOnClickOverlay:!1,callback:function(t){o["confirm"===t?"resolve":"reject"](t)}},B.alert=B,B.confirm=function(t){return B(Object(f["a"])({showCancelButton:!0},t))},B.close=function(){o&&(o.value=!1)},B.setDefaultOptions=function(t){Object(f["a"])(B.currentOptions,t)},B.resetDefaultOptions=function(){B.currentOptions=Object(f["a"])({},B.defaultOptions)},B.resetDefaultOptions(),B.install=function(){h["a"].use(j)},B.Component=j,h["a"].prototype.$dialog=B;var P,T=B,$=n("2fa7"),z=n("2f62");function N(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function I(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?N(Object(n),!0).forEach((function(e){Object($["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):N(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var R={name:"automatic-mode",data:function(){return{show:!1,currentRate:0,gradientColor:{"0%":"#3fecff","100%":"#6149f6"}}},computed:I({},Object(z["b"])("UserFunction",{Person:"PersonalInformation",token:"token"})),components:(P={},Object($["a"])(P,T.name,T),Object($["a"])(P,d["a"].name,d["a"]),Object($["a"])(P,u["a"].name,u["a"]),Object($["a"])(P,l["a"].name,l["a"]),Object($["a"])(P,s["a"].name,s["a"]),Object($["a"])(P,c["a"].name,c["a"]),Object($["a"])(P,r["a"].name,r["a"]),P),methods:{fadein:function(){},onClickRight:function(){var t=this;T.confirm({title:"退出登录",message:"确定退出登录？下次登录需手动输入用户名及密码"}).then((function(){t.$store.commit("UserFunction/OUT"),t.$router.push({name:"VerificationPage"})})).catch((function(){}))},onClickLeft:function(){}},mounted:function(){if(console.log(this.token,"操你妈tasdlfhalskhfl"),null===this.token){var t=localStorage.getItem("token");t||this.$router.replace({name:"VerificationPage"})}this.show=!0}},D=R,Y=(n("32ad"),n("2877")),E=Object(Y["a"])(D,i,a,!1,null,"73f74dd6",null);e["default"]=E.exports},a71a:function(t,e,n){},a8c1:function(t,e,n){"use strict";function o(t){return t===window}n.d(e,"d",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"h",(function(){return c})),n.d(e,"b",(function(){return s})),n.d(e,"g",(function(){return l})),n.d(e,"a",(function(){return u})),n.d(e,"e",(function(){return d})),n.d(e,"f",(function(){return f}));var i=/scroll|auto/i;function a(t,e){void 0===e&&(e=window);var n=t;while(n&&"HTML"!==n.tagName&&1===n.nodeType&&n!==e){var o=window.getComputedStyle(n),a=o.overflowY;if(i.test(a)){if("BODY"!==n.tagName)return n;var r=window.getComputedStyle(n.parentNode),c=r.overflowY;if(i.test(c))return n}n=n.parentNode}return e}function r(t){return"scrollTop"in t?t.scrollTop:t.pageYOffset}function c(t,e){"scrollTop"in t?t.scrollTop=e:t.scrollTo(t.scrollX,e)}function s(){return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0}function l(t){c(window,t),c(document.body,t)}function u(t,e){if(o(t))return 0;var n=e?r(e):s();return t.getBoundingClientRect().top+n}function d(t){return o(t)?t.innerHeight:t.getBoundingClientRect().height}function f(t){return o(t)?0:t.getBoundingClientRect().top}},dfaf:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var o={icon:String,size:String,center:Boolean,isLink:Boolean,required:Boolean,clickable:Boolean,iconPrefix:String,titleStyle:null,titleClass:null,valueClass:null,labelClass:null,title:[Number,String],value:[Number,String],label:[Number,String],arrowDirection:String,border:{type:Boolean,default:!0}}},e3b3:function(t,e,n){}}]);
//# sourceMappingURL=chunk-5ecf6f38.0a46b6fc.js.map