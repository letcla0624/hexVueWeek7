"use strict";(self["webpackChunkhexVueWeek7"]=self["webpackChunkhexVueWeek7"]||[]).push([[764],{1764:function(a,t,e){e.r(t),e.d(t,{default:function(){return N}});var s=e(3396);function n(a,t,e,n,o,l){const r=(0,s.up)("BackNavbarComponent"),c=(0,s.up)("router-view");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(r),o.checkSuccess?((0,s.wg)(),(0,s.j4)(c,{key:0})):(0,s.kq)("",!0)],64)}const o={class:"navbar navbar-expand-lg navbar-dark bg-dark sticky-top"},l={class:"container-fluid"},r=(0,s._)("a",{href:"#/admin",class:"navbar-brand"},"後台",-1),c=(0,s._)("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},[(0,s._)("span",{class:"navbar-toggler-icon"})],-1),i={class:"collapse navbar-collapse",id:"navbarSupportedContent"},u={class:"navbar-nav me-auto mb-2 mb-lg-0"},d={class:"nav-item"},h=(0,s.Uk)("後台首頁"),p={class:"nav-item"},v=(0,s.Uk)("產品列表"),m={class:"nav-item"},k=(0,s.Uk)("顧客訂單"),b={class:"nav-item"},g=(0,s.Uk)("優惠券"),_={class:"navbar-nav ml-auto mb-2 mb-lg-0"},f={class:"nav-item"},w=(0,s.Uk)(" 登出"),$=(0,s._)("i",{class:"bi bi-box-arrow-right ms-1"},null,-1),C=[w,$],W={class:"nav-item"},x=(0,s.Uk)("返回前台");function S(a,t,e,n,w,$){const S=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)("nav",o,[(0,s._)("div",l,[r,c,(0,s._)("div",i,[(0,s._)("ul",u,[(0,s._)("li",d,[(0,s.Wm)(S,{to:"/admin",class:"nav-link","aria-current":"page"},{default:(0,s.w5)((()=>[h])),_:1})]),(0,s._)("li",p,[(0,s.Wm)(S,{to:"/admin/prodLists",class:"nav-link"},{default:(0,s.w5)((()=>[v])),_:1})]),(0,s._)("li",m,[(0,s.Wm)(S,{to:"/admin/orders",class:"nav-link"},{default:(0,s.w5)((()=>[k])),_:1})]),(0,s._)("li",b,[(0,s.Wm)(S,{to:"/admin/coupon",class:"nav-link"},{default:(0,s.w5)((()=>[g])),_:1})])]),(0,s._)("ul",_,[(0,s._)("li",f,[(0,s._)("button",{type:"button",class:"btn btn-danger",onClick:t[0]||(t[0]=(...a)=>$.logOut&&$.logOut(...a))},C)]),(0,s._)("li",W,[(0,s.Wm)(S,{to:"/",class:"nav-link"},{default:(0,s.w5)((()=>[x])),_:1})])])])])])}var U={methods:{logOut(){let a=this.$loading.show();this.$http.post("https://vue3-course-api.hexschool.io/v2/logout").then((t=>{alert(t.data.message),a.hide(),this.$router.push("/login")})).catch((t=>{a.hide(),console.log(t.response),alert(t.response.message)}))}}},y=e(89);const A=(0,y.Z)(U,[["render",S]]);var O=A,B={data(){return{checkSuccess:!1}},components:{BackNavbarComponent:O},methods:{checkAdmin(){const a=document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,"$1");a?(this.$http.defaults.headers.common.Authorization=a,this.$http.post("https://vue3-course-api.hexschool.io/v2/api/user/check",{api_token:this.token}).then((()=>{this.checkSuccess=!0})).catch((a=>{alert(a.response.data.message),this.$router.push("/login")}))):this.$router.push("/login")}},mounted(){this.checkAdmin()}};const D=(0,y.Z)(B,[["render",n]]);var N=D}}]);
//# sourceMappingURL=764.78e641e9.js.map