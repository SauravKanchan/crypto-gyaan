(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{318:function(e,t,c){},320:function(e,t,c){"use strict";c.r(t);var s=c(0);c(318);function n(e,t,c){const s=Object.create(e);return s.word=t[c],s.i=c,s}function a(e){var t,c,n,a=e.link&&b(e);return{c(){t=Object(s.m)("div"),c=Object(s.E)(e.message),n=Object(s.D)(),a&&a.c(),Object(s.e)(t,"class","alert"),Object(s.e)(t,"role","alert"),Object(s.G)(t,"alert-success",e.success),Object(s.G)(t,"alert-primary",!e.success)},m(e,b){Object(s.s)(e,t,b),Object(s.c)(t,c),Object(s.c)(t,n),a&&a.m(t,null)},p(e,n){e.message&&Object(s.A)(c,n.message),n.link?a?a.p(e,n):((a=b(n)).c(),a.m(t,null)):a&&(a.d(1),a=null),e.success&&(Object(s.G)(t,"alert-success",n.success),Object(s.G)(t,"alert-primary",!n.success))},d(e){e&&Object(s.l)(t),a&&a.d()}}}function b(e){var t,c;return{c(){t=Object(s.m)("a"),c=Object(s.E)("here"),Object(s.e)(t,"href",e.link)},m(e,n){Object(s.s)(e,t,n),Object(s.c)(t,c)},p(e,c){e.link&&Object(s.e)(t,"href",c.link)},d(e){e&&Object(s.l)(t)}}}function l(e){var t,c,n,a,b,l,r=e.i+1+"";return{c(){t=Object(s.m)("div"),c=Object(s.E)(r),n=Object(s.E)(". "),a=Object(s.m)("input"),Object(s.e)(a,"data",b=e.clipboard[e.i]),Object(s.e)(a,"type","text"),Object(s.e)(t,"class","col-md-3 p-1"),l=Object(s.u)(a,"change",e.check_mnemonic)},m(e,b){Object(s.s)(e,t,b),Object(s.c)(t,c),Object(s.c)(t,n),Object(s.c)(t,a)},p(e,t){e.clipboard&&b!==(b=t.clipboard[t.i])&&Object(s.e)(a,"data",b)},d(e){e&&Object(s.l)(t),l()}}}function r(e){var t,c,n,a,b,l=e.i+1+"",r=e.word+"";return{c(){t=Object(s.m)("div"),c=Object(s.E)(l),n=Object(s.E)(". "),a=Object(s.E)(r),Object(s.e)(t,"class","col-md-3 p-1"),Object(s.e)(t,"data",b=e.word)},m(e,b){Object(s.s)(e,t,b),Object(s.c)(t,c),Object(s.c)(t,n),Object(s.c)(t,a)},p(e,c){e.mnemonic&&r!==(r=c.word+"")&&Object(s.A)(a,r),e.mnemonic&&b!==(b=c.word)&&Object(s.e)(t,"data",b)},d(e){e&&Object(s.l)(t)}}}function o(e){var t;function c(e,t){return t.word?r:l}var n=c(0,e),a=n(e);return{c(){a.c(),t=Object(s.n)()},m(e,c){a.m(e,c),Object(s.s)(e,t,c)},p(e,s){n===(n=c(0,s))&&a?a.p(e,s):(a.d(1),(a=n(s))&&(a.c(),a.m(t.parentNode,t)))},d(e){a.d(e),e&&Object(s.l)(t)}}}function j(e){var t,c,b,l,r,j,O,i,u,d,m,p,w,f,h,g,_,v,k,y,E,G=e.message&&a(e);let D=e.mnemonic,x=[];for(let t=0;t<D.length;t+=1)x[t]=o(n(e,D,t));return{c(){G&&G.c(),t=Object(s.D)(),c=Object(s.m)("div"),(b=Object(s.m)("button")).textContent="Generate Random",l=Object(s.D)(),(r=Object(s.m)("button")).textContent="Noted Mnemonic Phrase",j=Object(s.D)(),O=Object(s.m)("button"),i=Object(s.E)("Submit"),d=Object(s.D)(),m=Object(s.m)("div"),(p=Object(s.m)("label")).textContent="Wallet Password:",w=Object(s.D)(),f=Object(s.m)("input"),h=Object(s.D)(),(g=Object(s.m)("button")).textContent="24 Words",_=Object(s.D)(),v=Object(s.m)("div");for(let e=0;e<x.length;e+=1)x[e].c();k=Object(s.D)(),(y=Object(s.m)("a")).textContent="Download",Object(s.e)(b,"class","btn btn-primary mr-3"),Object(s.e)(r,"class","btn btn-primary mr-3 svelte-knicoi"),Object(s.G)(r,"hide",1!=e.status),Object(s.e)(O,"class","btn btn-primary mr-3 svelte-knicoi"),O.disabled=u=3!=e.status,Object(s.G)(O,"hide",1==e.status),Object(s.G)(O,"btn-dark",3!=e.status),Object(s.e)(p,"for","wallet_password"),Object(s.e)(f,"class","form-control"),Object(s.e)(f,"type","password"),Object(s.e)(f,"id","wallet_password"),Object(s.e)(m,"class","form-inline svelte-knicoi"),Object(s.G)(m,"hide",3!==e.status),Object(s.e)(g,"class","btn"),Object(s.G)(g,"btn-secondary",!e.is_256),Object(s.G)(g,"btn-primary",e.is_256),Object(s.e)(c,"class","row mt-4"),Object(s.e)(v,"class","row mt-4"),Object(s.e)(y,"id","downloadAnchorElem"),Object(s.e)(y,"href","/"),Object(s.C)(y,"display","none"),E=[Object(s.u)(b,"click",e.generate_random),Object(s.u)(r,"click",e.noted_down),Object(s.u)(O,"click",e.generate_keystore),Object(s.u)(f,"input",e.input_input_handler),Object(s.u)(g,"click",e.toggle_count)]},m(n,a){G&&G.m(n,a),Object(s.s)(n,t,a),Object(s.s)(n,c,a),Object(s.c)(c,b),Object(s.c)(c,l),Object(s.c)(c,r),Object(s.c)(c,j),Object(s.c)(c,O),Object(s.c)(O,i),Object(s.c)(c,d),Object(s.c)(c,m),Object(s.c)(m,p),Object(s.c)(m,w),Object(s.c)(m,f),Object(s.B)(f,e.wallet_password),Object(s.c)(c,h),Object(s.c)(c,g),Object(s.s)(n,_,a),Object(s.s)(n,v,a);for(let e=0;e<x.length;e+=1)x[e].m(v,null);Object(s.s)(n,k,a),Object(s.s)(n,y,a)},p(e,c){if(c.message?G?G.p(e,c):((G=a(c)).c(),G.m(t.parentNode,t)):G&&(G.d(1),G=null),e.status&&Object(s.G)(r,"hide",1!=c.status),e.status&&u!==(u=3!=c.status)&&(O.disabled=u),e.status&&(Object(s.G)(O,"hide",1==c.status),Object(s.G)(O,"btn-dark",3!=c.status)),e.wallet_password&&f.value!==c.wallet_password&&Object(s.B)(f,c.wallet_password),e.status&&Object(s.G)(m,"hide",3!==c.status),e.is_256&&(Object(s.G)(g,"btn-secondary",!c.is_256),Object(s.G)(g,"btn-primary",c.is_256)),e.mnemonic||e.clipboard){let t;for(D=c.mnemonic,t=0;t<D.length;t+=1){const s=n(c,D,t);x[t]?x[t].p(e,s):(x[t]=o(s),x[t].c(),x[t].m(v,null))}for(;t<x.length;t+=1)x[t].d(1);x.length=D.length}},i:s.w,o:s.w,d(e){G&&G.d(e),e&&(Object(s.l)(t),Object(s.l)(c),Object(s.l)(_),Object(s.l)(v)),Object(s.k)(x,e),e&&(Object(s.l)(k),Object(s.l)(y)),Object(s.y)(E)}}}let O=128,i=4;function u(e,t,c){let s=!1,n=bip39.generateMnemonic(O).split(" "),a=[...n],b="",l=1,r=!1,o=new Set,j="",u=!1,d="";function m(){c("message",j=""),c("link",d=""),c("success",u=!1),c("status",l=1),r=!1;let e=s?256:128;c("clipboard",n=bip39.generateMnemonic(e).split(" ")),c("mnemonic",a=[...n])}return{is_256:s,clipboard:n,mnemonic:a,wallet_password:b,status:l,message:j,success:u,link:d,generate_random:m,noted_down:function(){c("status",l=2);let e=function(e,t){for(var c=new Array(t),s=e.length,n=new Array(s);t--;){var a=Math.floor(Math.random()*s);c[t]=a in n?n[a]:a,n[a]=--s in n?n[s]:s}return c}(a,i);for(let t=0;t<i;t++)c("mnemonic",a[e[t]]="",a);c("message",j="Please fill blank spots"),c("link",d=""),c("success",u=!1)},toggle_count:function(){c("is_256",s=!s),m()},check_mnemonic:function(e){e.srcElement.attributes.data.value===e.srcElement.value&&o.add(e.srcElement.attributes.data.value),o.size===i&&c("status",l=3),console.log(o.size,e.srcElement.attributes.data.value,e.srcElement.value,e.srcElement.attributes.data.value===e.srcElement.value)},generate_keystore:async function(){c("success",u=!1),c("message",j="Encrypting wallet by entered password...");let e=await ethers.Wallet.fromMnemonic(n.join(" ")),t="data:text/json;charset=utf-8,"+encodeURIComponent(await e.encrypt(b)),s=document.getElementById("downloadAnchorElem");s.setAttribute("href",t),s.setAttribute("download","UTC-"+e.address+".json"),s.click(),c("message",j="Keystore generated. You can access your wallet "),c("link",d="/accessMyWallet"),c("success",u=!0)},input_input_handler:function(){b=this.value,c("wallet_password",b)}}}class d extends s.a{constructor(e){super(),Object(s.r)(this,e,u,j,s.z,[])}}t.default=d}}]);