(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/tab/tab"],{"3e96":function(n,t,e){"use strict";var a=e("91c7"),u=e.n(a);u.a},"4c25":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={props:{list:{type:Array,default:function(){return[]}},tabIndex:{type:Number,default:0}},watch:{tabIndex:function(n){this.activeIndex=n}},data:function(){return{activeIndex:0}},methods:{open:function(){n.navigateTo({url:"/pages/home-label/home-label"})},clickTab:function(n,t){this.activeIndex=t,this.$emit("tab",{data:n,index:t})}}};t.default=e}).call(this,e("543d")["default"])},"5fda":function(n,t,e){"use strict";e.r(t);var a=e("aab2"),u=e("fb5d");for(var c in u)"default"!==c&&function(n){e.d(t,n,(function(){return u[n]}))}(c);e("3e96");var i,o=e("f0c5"),r=Object(o["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);t["default"]=r.exports},"91c7":function(n,t,e){},aab2:function(n,t,e){"use strict";e.d(t,"b",(function(){return u})),e.d(t,"c",(function(){return c})),e.d(t,"a",(function(){return a}));var a={uniIcons:function(){return Promise.all([e.e("common/vendor"),e.e("components/uni-icons/uni-icons")]).then(e.bind(null,"a51b"))}},u=function(){var n=this,t=n.$createElement;n._self._c},c=[]},fb5d:function(n,t,e){"use strict";e.r(t);var a=e("4c25"),u=e.n(a);for(var c in a)"default"!==c&&function(n){e.d(t,n,(function(){return a[n]}))}(c);t["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/tab/tab-create-component',
    {
        'components/tab/tab-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5fda"))
        })
    },
    [['components/tab/tab-create-component']]
]);
