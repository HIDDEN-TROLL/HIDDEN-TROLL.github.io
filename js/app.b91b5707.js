(function(e){function t(t){for(var r,o,i=t[0],u=t[1],s=t[2],l=0,f=[];l<i.length;l++)o=i[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);d&&d(t);while(f.length)f.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,o=1;o<n.length;o++){var i=n[o];0!==a[i]&&(r=!1)}r&&(c.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},o={app:0},a={app:0},c=[];function i(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-00ff08b0":"8499766f","chunk-4d4669df":"2b4dc325","chunk-3ab5ea84":"df1adc43","chunk-9a2d0980":"79a0a1fe","chunk-ebc3b35c":"f555447a","chunk-622ce52e":"d7807d82","chunk-558adf92":"5394695a","chunk-1cb89f72":"d45dea5e","chunk-5ecf6f38":"0a46b6fc"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-00ff08b0":1,"chunk-4d4669df":1,"chunk-3ab5ea84":1,"chunk-9a2d0980":1,"chunk-ebc3b35c":1,"chunk-622ce52e":1,"chunk-558adf92":1,"chunk-1cb89f72":1,"chunk-5ecf6f38":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-00ff08b0":"c2f8f863","chunk-4d4669df":"be8b0fde","chunk-3ab5ea84":"ff4bc53f","chunk-9a2d0980":"fc5d012f","chunk-ebc3b35c":"20918f82","chunk-622ce52e":"0de4b733","chunk-558adf92":"edd3db34","chunk-1cb89f72":"2bbdfd40","chunk-5ecf6f38":"5328179a"}[e]+".css",a=u.p+r,c=document.getElementsByTagName("link"),i=0;i<c.length;i++){var s=c[i],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===a))return t()}var f=document.getElementsByTagName("style");for(i=0;i<f.length;i++){s=f[i],l=s.getAttribute("data-href");if(l===r||l===a)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||a,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete o[e],d.parentNode.removeChild(d),n(c)},d.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=c);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=i(e);var f=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",f.name="ChunkLoadError",f.type=r,f.request=o,n[1](f)}a[e]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var d=l;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"031a":function(e,t,n){},"33c2":function(e,t,n){"use strict";var r=n("7754"),o=n.n(r);o.a},"445d":function(e,t,n){e.exports=n.p+"img/9mei.5120c146.jpg"},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=n("2f62"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("keep-alive",[e.$route.meta.keepAlive?n("router-view"):e._e()],1),e.$route.meta.keepAlive?e._e():n("router-view")],1)},c=[],i=(n("a4d3"),n("4de4"),n("4160"),n("e439"),n("dbb4"),n("b64b"),n("159b"),n("2fa7"));n("dcc0");function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){Object(i["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var l={name:"automatic-mode",data:function(){return{active:0}},computed:s({},Object(o["b"])("UserFunction",{token:"token"}))},f=l,d=(n("e66f"),n("2877")),p=Object(d["a"])(f,a,c,!1,null,"44c9da0b",null),m=p.exports,h=n("9483");Object(h["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});n("99af");var b,v=n("284c"),g=n("8c4f"),y=(n("d3b7"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.isRouterFresh,n("router-view")}),k=[],w={name:"EmptyRouterView",provide:function(){return{reload:this.reload}},data:function(){return{isRouterFresh:!0}},methods:{reload:function(){var e=this;this.isRouterFresh=!1,this.$nextTick((function(){e.isRouterFresh=!0}))}}},O=w,j=Object(d["a"])(O,y,k,!1,null,null,null),x=j.exports,P=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("keep-alive",[n("router-view")],1),n("meta",{attrs:{name:"viewport",content:"width=device-width, initial-scale=1.0"}}),n("div",{attrs:{id:"nav"}},[n("van-tabbar",{model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},e._l(e.tabList,(function(t,r){return n("van-tabbar-item",{key:r,on:{click:function(n){return e.go(t.place,r)}}},[n("div",[n("van-icon",{attrs:{name:t.icon,size:"1.5rem",color:e.active===r?"#1989fa":"gray"}})],1),e._v(" "+e._s(t.name)+" ")])})),1)],1)],1)},E=[],T=(n("b0c0"),n("537a"),n("ac28")),_=(n("a52c"),n("2ed4")),A=(n("c3a6"),n("ad06"));function F(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function S(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?F(Object(n),!0).forEach((function(t){Object(i["a"])(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):F(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var M={name:"automatic-mode",data:function(){return{active:0,tabList:[{name:"首页",icon:"home-o",place:"Homepage"},{name:"收藏",icon:"bag",place:"Function"},{name:"消息",icon:"chat",place:"Message"},{name:"个人",icon:"manager",place:"Person"}]}},computed:S({},Object(o["b"])("UserFunction",{token:"token",routerIndex:"routerIndex"})),components:(b={},Object(i["a"])(b,A["a"].name,A["a"]),Object(i["a"])(b,_["a"].name,_["a"]),Object(i["a"])(b,T["a"].name,T["a"]),b),methods:{go:function(e,t){console.log(t,this.token,e),3===t&&null===this.token&&this.$router.push({name:"VerificationPage"}),this.$router.push({name:e})}},mounted:function(){for(var e=0;e<this.tabList.length;e++)this.tabList[e].place==this.$route.name&&(this.active=e)},created:function(){}},L=M,I=(n("33c2"),Object(d["a"])(L,P,E,!1,null,"8ab60e7c",null)),D=I.exports;r["a"].use(g["a"]);var R=[{name:"Member",path:"/Member",component:x,children:[{name:"MemberTab",path:"MemberTab",component:D,meta:{title:"首页",keepAlive:!0},children:[{name:"Homepage",path:"Homepage",component:function(){return Promise.all([n.e("chunk-00ff08b0"),n.e("chunk-4d4669df"),n.e("chunk-ebc3b35c")]).then(n.bind(null,"90d6"))},meta:{title:"首页"}},{name:"Function",path:"Function",component:function(){return n.e("chunk-1cb89f72").then(n.bind(null,"f58e"))},meta:{title:"收藏"}},{name:"Message",path:"Message",component:function(){return Promise.all([n.e("chunk-00ff08b0"),n.e("chunk-4d4669df"),n.e("chunk-9a2d0980")]).then(n.bind(null,"4d58"))},meta:{title:"消息"}},{name:"Person",path:"Person",component:function(){return Promise.all([n.e("chunk-622ce52e"),n.e("chunk-5ecf6f38")]).then(n.bind(null,"7975"))},meta:{title:"个人"}}]},{name:"MemberKKP",path:"MemberKKP",component:x,meta:{title:"首页",keepAlive:!0},children:[{name:"TypeList",path:"TypeList",component:function(){return Promise.all([n.e("chunk-00ff08b0"),n.e("chunk-4d4669df"),n.e("chunk-3ab5ea84")]).then(n.bind(null,"fb31"))}}]}]}];r["a"].use(g["a"]);var C=[{path:"/Login",name:"VerificationPage",component:function(){return Promise.all([n.e("chunk-00ff08b0"),n.e("chunk-622ce52e"),n.e("chunk-558adf92")]).then(n.bind(null,"5c8b"))},meta:{title:"登录注册"}}],N=g["a"].prototype.push;g["a"].prototype.push=function(e){return N.call(this,e).catch((function(e){return e}))},r["a"].use(g["a"]);var $=new g["a"]({routes:[].concat(Object(v["a"])(R),Object(v["a"])(C),[{path:"*",redirect:"/Member/MemberTab/Homepage"}])}),q=$;r["a"].use(o["a"]);var H={PersonalInformation:{username:"",password:"",name:"9mei",sex:"雌",job:"管理員",race:"GOD",Introduction:"我日你滴嗎頁",time:"2020-05-18",avatar:n("445d"),routerIndex:0},token:null},z={LOGIN:function(e,t){e.PersonalInformation=t},setUserInfo:function(e,t){e.token=t,localStorage.setItem("token","Bearer "+t)},OUT:function(e){e.token=null,localStorage.removeItem("token")}},B={},U={},K={namespaced:!0,state:H,mutations:z,actions:B,getters:U};r["a"].use(o["a"]);var V=new o["a"].Store({modules:{UserFunction:K}}),W=V,G=n("1157"),J=n.n(G),Q=(n("f9e3"),n("4989")),X=n.n(Q);n("7d86");r["a"].config.productionTip=!1,new r["a"]({router:q,store:W,Vuex:o["a"],jquery:J.a,bootstrap:X.a,render:function(e){return e(m)}}).$mount("#app")},7754:function(e,t,n){},dcc0:function(e,t,n){"use strict";n("99af"),n("4160"),n("159b");!function(){function e(e,t,n){return e.getAttribute(t)||n}function t(e){return document.getElementsByTagName(e)}function n(){var n=t("script"),r=n.length,o=n[r-1];return{l:r,z:e(o,"zIndex",-1),o:e(o,"opacity",.3),c:e(o,"color","0,0,0"),n:e(o,"count",80)}}function r(){a=u.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,c=u.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}function o(){var e,t,n,r,u,l;f.clearRect(0,0,a,c),h.forEach((function(o,d){for(o.x+=o.xa,o.y+=o.ya,o.xa*=o.x>a||o.x<0?-1:1,o.ya*=o.y>c||o.y<0?-1:1,f.fillRect(o.x-.5,o.y-.5,1,1),t=d+1;t<i.length;t++)e=i[t],null!==e.x&&null!==e.y&&(r=o.x-e.x,u=o.y-e.y,l=r*r+u*u,l<e.max&&(e===m&&l>=e.max/2&&(o.x-=.03*r,o.y-=.03*u),n=(e.max-l)/e.max,f.beginPath(),f.lineWidth=n/2,f.strokeStyle="rgba("+s.c+","+(n+.2)+")",f.moveTo(o.x,o.y),f.lineTo(e.x,e.y),f.stroke()))})),d(o)}var a,c,i,u=document.createElement("canvas"),s=n(),l="c_n"+s.l,f=u.getContext("2d"),d=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/45)},p=Math.random,m={x:null,y:null,max:2e4};u.id=l,u.style.cssText="position:fixed;top:0;left:0;z-index:"+s.z+";opacity:"+s.o,t("body")[0].appendChild(u),r(),window.onresize=r;for(var h=[],b=0;s.n>b;b++){var v=p()*a,g=p()*c,y=2*p()-1,k=2*p()-1;h.push({x:v,y:g,xa:y,ya:k,max:6e3})}i=h.concat([m]),setTimeout((function(){o()}),100)}()},e66f:function(e,t,n){"use strict";var r=n("031a"),o=n.n(r);o.a}});
//# sourceMappingURL=app.b91b5707.js.map