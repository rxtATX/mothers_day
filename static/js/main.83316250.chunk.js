(this["webpackJsonpmothers-day"]=this["webpackJsonpmothers-day"]||[]).push([[0],{60:function(e,t,a){e.exports=a(73)},65:function(e,t,a){},72:function(e,t,a){},73:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(10),c=a.n(o),i=(a(65),a(100)),l=a(8),s=[[4,4,4,4],[5,6,5],[5,4]],u=[{light:"#ef9a9a",base:"#e57373",dark:"#ef5350"},{light:"#ce93d8",base:"#ba68c8",dark:"#ab47bc"},{light:"#90caf9",base:"#64b5f6",dark:"#42a5f5"},{light:"#80deea",base:"#4dd0e1",dark:"#26c6da"},{light:"#80cbc4",base:"#4db6ac",dark:"#26a69a"},{light:"#fff59d",base:"#fff176",dark:"#ffee58"},{light:"#ffcc80",base:"#ffb74d",dark:"#ffa726"},{light:"#ec407a",base:"#e91e63",dark:"#d81b60"},{light:"#f48fb1",base:"#f06292",dark:"#ec407a"},{light:"#ef9a9a",base:"#e57373",dark:"#ef5350"},{light:"#ce93d8",base:"#ba68c8",dark:"#ab47bc"},{light:"#90caf9",base:"#64b5f6",dark:"#42a5f5"},{light:"#80deea",base:"#4dd0e1",dark:"#26c6da"},{light:"#80cbc4",base:"#4db6ac",dark:"#26a69a"},{light:"#fff59d",base:"#fff176",dark:"#ffee58"},{light:"#ffcc80",base:"#ffb74d",dark:"#ffa726"},{light:"#ec407a",base:"#e91e63",dark:"#d81b60"},{light:"#f48fb1",base:"#f06292",dark:"#ec407a"}];function d(){return s[f(s.length)]}function f(e){return Math.floor(Math.random()*e)}function h(e){var t=e[f(e.length)].word;if(function(e){return e.replace(/[^a-zA-Z]/gim,"")===e}(t))return t;h(e)}function p(e){var t=d();Promise.all(t.map((function(e){return function(e,t){for(var a="",n=0;n<t-1;n++)a+="?";return fetch("https://cors-anywhere.herokuapp.com/https://api.datamuse.com/words?sp=".concat(e).concat(a))}("qwertyuiopasdfghjklzxcvbnm"[f(26)],e)}))).then((function(e){return e.map((function(e){return e.json()}))})).then((function(a){Promise.all(a).then((function(a){var n,r,o=h(a[0]),c=h(a[1]);a[2]&&(n=h(a[2])),a[3]&&(r=h(a[3]));var i=[o,c,n,r].filter((function(e){return e}));i.length===t.length&&i.join("").length===t.reduce((function(e,t){return e+t}))?e({type:"SET_PUZZLE_CONSTRUCTOR",payload:i}):p(e)}))})).catch((function(e){return console.log(e)}))}var m=a(40),g=a(102),b=a(104),z=a(53),E=a(31),y=a(52),v=a(9),w=a(35),k=a(48),j=a(49),x=function(){function e(t){Object(k.a)(this,e),this.words=t,this.moveTypes=[-1,0,1],this.puzzle=[],this.puzzleLength=0,this.letterCount=0,this.currentCoords={},this.wordPath={},this.getParameters()}return Object(j.a)(e,[{key:"getParameters",value:function(){this.letterCount=0;var e,t=Object(w.a)(this.words);try{for(t.s();!(e=t.n()).done;){var a=e.value;this.letterCount+=a.length}}catch(n){t.e(n)}finally{t.f()}this.puzzleLength=Math.sqrt(this.letterCount)}},{key:"generateEmptyPuzzle",value:function(){this.puzzle=[];for(var e=[],t=0;t<this.puzzleLength;t++)e.push(0);for(var a=0;a<this.puzzleLength;a++)this.puzzle.push(JSON.parse(JSON.stringify(e)))}},{key:"generateRandomNumber",value:function(){return Math.floor(Math.random()*this.puzzleLength)}},{key:"generateRandomCoordinates",value:function(){this.currentCoords={x:this.generateRandomNumber(),y:this.generateRandomNumber()},this.puzzle[this.currentCoords.x][this.currentCoords.y]&&this.generateRandomCoordinates()}},{key:"checkCoords",value:function(){for(var e=!0,t=0;t<this.moveTypes.length;t++)for(var a=0;a<this.moveTypes.length;a++){var n=this.currentCoords.x+this.moveTypes[t],r=this.currentCoords.y+this.moveTypes[a];-1!==n&&-1!==r&&n!==this.puzzleLength&&r!==this.puzzleLength&&(this.puzzle[n][r]||(e=!1))}return e}},{key:"nextMove",value:function(){if(this.checkCoords())throw new Error;var e=this.currentCoords.x+this.moveTypes[Math.floor(Math.random()*this.moveTypes.length)],t=this.currentCoords.y+this.moveTypes[Math.floor(Math.random()*this.moveTypes.length)];-1===e||-1===t||e===this.puzzleLength||t===this.puzzleLength||this.puzzle[e][t]?this.nextMove():this.currentCoords={x:e,y:t}}},{key:"generatePuzzle",value:function(){this.generateEmptyPuzzle();try{var e,t=Object(w.a)(this.words);try{for(t.s();!(e=t.n()).done;){var a=e.value;this.generateRandomCoordinates(),this.wordPath[a]=[];var n,r=Object(w.a)(a);try{for(r.s();!(n=r.n()).done;){var o=n.value;this.nextMove(),this.puzzle[this.currentCoords.x][this.currentCoords.y]=o,this.wordPath[a].push(this.currentCoords)}}catch(c){r.e(c)}finally{r.f()}}}catch(c){t.e(c)}finally{t.f()}}catch(c){if(!c.message)return this.generatePuzzle();throw c}}},{key:"getPuzzle",value:function(){return this.puzzle}},{key:"getPuzzelPath",value:function(){return this.wordPath}}]),e}(),O={hintPreference:!1,currentGuess:[],finalizedWords:{},finalizedWordCount:0,correctMap:{}},C=Object(n.createContext)({id:"",name:"",priority:!1}),S=C.Provider;function P(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_PUZZLE_CONSTRUCTOR":var a=new x(t.payload);return a.generatePuzzle(),a.length%2!==0&&(a=new x(t.payload)).generatePuzzle(),Object(v.a)(Object(v.a)(Object(v.a)({},e),O),{},{puzzle:a});case"SET_HINT_PREFERENCE":return Object(v.a)(Object(v.a)({},e),{},{hintPreference:t.payload});case"LETTER_PRESS":return Object(v.a)(Object(v.a)({},e),{},{currentGuess:[].concat(Object(y.a)(e.currentGuess),[t.payload])});case"RESET_GUESSES":return Object(v.a)(Object(v.a)({},e),{},{currentGuess:[]});case"FINALIZE_WORD":var n=e.puzzle.wordPath[t.payload];return n&&n.forEach((function(t){e.puzzle.puzzle[t.x][t.y]=!1})),Object(v.a)(Object(v.a)({},e),{},{finalizedWords:Object(v.a)(Object(v.a)({},e.finalizedWords),{},Object(E.a)({},t.payload,!0)),finalizedWordCount:e.finalizedWordCount+1});case"GET_HINT":return Object(v.a)(Object(v.a)({},e),{},{hintLetters:[]});case"CORRECT_MAP":return Object(v.a)(Object(v.a)({},e),{},{correctMap:t.payload});default:return e}}function T(e){e.value;var t=Object(z.a)(e,["value"]),a=Object(n.useReducer)(P,O),o=Object(l.a)(a,2),c=o[0],i=o[1];return r.a.createElement(S,Object.assign({value:[c,i]},t))}function N(){return Object(n.useContext)(C)}var R=Object(i.a)((function(e){return{root:{flexGrow:1},fab:{textAlign:"center",color:"white",textShadow:"0px 1px 2px black",fontSize:"1.25em",fontWeight:"700",padding:e.spacing(1),width:"50px",height:"50px",margin:"10px",transform:"scale(1.25)"},hidden:{padding:e.spacing(1),width:"50px",height:"50px",margin:"10px",transform:"scale(1.25)",visibility:"hidden"},activated:{backgroundColor:e.palette.secondary}}}));function G(e){var t=e.letterPress,a=e.wordGroups,o=R(),c=N(),i=Object(l.a)(c,1)[0];function s(e){var a=e.subLetters,c=e.row;function s(e){var a=e.letter,s=e.i,d=Object(n.useState)(!1),f=Object(l.a)(d,2),h=f[0],p=f[1],m=u[(s+1)*c]||u[0],b=m.light,z=m.base,E=m.dark;return Object(n.useEffect)((function(){i.currentGuess.forEach((function(e){e.x===c-1&&e.y===s&&p(!0)}))}),[s]),r.a.createElement(r.a.Fragment,null,a?r.a.createElement(g.a,{style:{backgroundColor:z,backgroundImage:"radial-gradient(rgba(255,255,255,.3), ".concat(b,", ").concat(z,", ").concat(E,", rgba(0,0,0,.7))")},onClick:function(e){e.persist(),t(c,s)},className:h?"".concat(o.fab," ").concat(o.hidden):o.fab},a):r.a.createElement(g.a,{className:o.hidden},""))}return r.a.createElement(r.a.Fragment,null,r.a.createElement(b.a,{item:!0},a.map((function(e,t){return r.a.createElement(s,{letter:e,key:t,i:t})}))))}return r.a.createElement("div",{className:o.root},r.a.createElement(b.a,{container:!0,spacing:1,justify:"center"},i.puzzle.puzzle.length?r.a.createElement(r.a.Fragment,null,r.a.createElement(b.a,{container:!0,item:!0,justify:"center",xs:12,spacing:a.length>2?3:4},r.a.createElement(s,{row:1,subLetters:i.puzzle.puzzle[0]})),r.a.createElement(b.a,{container:!0,item:!0,justify:"center",xs:12,spacing:a.length>2?3:4},r.a.createElement(s,{row:2,subLetters:i.puzzle.puzzle[1]})),r.a.createElement(b.a,{container:!0,item:!0,justify:"center",xs:12,spacing:a.length>2?3:4},r.a.createElement(s,{row:3,subLetters:i.puzzle.puzzle[2]})),i.puzzle.puzzle.length>3?r.a.createElement(b.a,{container:!0,item:!0,justify:"center",xs:12,spacing:3},r.a.createElement(s,{row:4,subLetters:i.puzzle.puzzle[3]})):null):null))}var W=a(51),A=a.n(W),L=a(110),M=a(111),_=a(114),F=a(109),I=a(107),B=a(108),H=a(106),U=a(117),Z=Object(i.a)((function(e){return{root:{display:"flex",alignItems:"center",justifyContent:"center",width:"100%"},paperFullScreen:{display:"flex",alignItems:"center",justifyContent:"center",width:"100%"},button:{borderRadius:"10px",lineHeight:2,background:"radial-gradient(".concat(e.palette.secondary.light,", ").concat(e.palette.secondary.main,", ").concat(e.palette.secondary.dark,")"),textAlign:"center",color:"white",textShadow:"0px 1px 2px black",fontSize:"1.25em",fontWeight:"700",padding:".5em 2em"},spacing:{marginBottom:"7em"},title:{marginTop:"10em",color:e.palette.secondary.main}}})),J=r.a.forwardRef((function(e,t){return r.a.createElement(U.a,Object.assign({direction:"down",ref:t},e))}));function q(e){var t=e.title,a=e.buttonElement,o=e.textContent,c=e.children,i=e.accept,s=e.show,u=void 0!==s&&s,d=e.outsideClose,f=void 0===d?function(){return null}:d,h=Z(),m=N(),g=Object(l.a)(m,2)[1],b=r.a.useState(u),z=Object(l.a)(b,2),E=z[0],y=z[1];Object(n.useEffect)((function(){y(u)}),[u]);var v=function(){y(!1),f()};return r.a.createElement("div",null,r.a.cloneElement(a,{onClick:function(){y(!0)}}),r.a.createElement(_.a,{className:h.root,classes:{scrollPaper:h.root,paperFullScreen:h.paperFullScreen},fullScreen:!0,open:E,TransitionComponent:J,keepMounted:!0,onClose:v,"aria-labelledby":"alert-dialog-slide-title","aria-describedby":"alert-dialog-slide-description"},r.a.createElement(H.a,{classes:{root:h.title},id:"alert-dialog-slide-title"},t),r.a.createElement(I.a,null,r.a.createElement(B.a,{id:"alert-dialog-slide-description"},o)),c,r.a.createElement(F.a,{classes:{spacing:h.spacing}},i?r.a.createElement(r.a.Fragment,null,r.a.createElement(L.a,{onClick:v,className:h.button},"No!"),r.a.createElement(L.a,{className:h.button,onClick:function(){v(),i()}},"Yes!")):r.a.createElement(L.a,{className:h.button,onClick:function(){v(),p(g)}},"New Game"))))}var D=a(112),V=a(115),Y=Object(i.a)((function(e){return{root:{flexGrow:1,margin:"2em 3em 1em"},button:{borderRadius:"10px",lineHeight:2,background:"radial-gradient(".concat(e.palette.secondary.light,", ").concat(e.palette.secondary.main,", ").concat(e.palette.secondary.dark,")"),textAlign:"center",color:"white",textShadow:"0px 1px 2px black",fontSize:"1.25em",fontWeight:"700",padding:".5em 2em"},paper:{padding:e.spacing(2),textAlign:"center",color:e.palette.text.secondary},hintButton:{position:"fixed",top:0,right:0}}}));function $(e){var t=e.hintButton,a=e.onClick;return r.a.createElement(M.a,{className:t,onClick:a,color:"secondary"},r.a.createElement(A.a,null))}function K(e){var t=e.dispatchGetWord,a=e.dispatchGetHint,o=Y(),c=Object(n.useState)(!1),i=Object(l.a)(c,2),s=i[0],u=i[1],d=N(),f=Object(l.a)(d,2),h=f[0],p=f[1];return Object(n.useEffect)((function(){u(h.hintPreference)}),[h.hintPreference]),r.a.createElement("div",{className:o.root},r.a.createElement(b.a,{container:!0,justify:"center",alignItems:"baseline",spacing:3},r.a.createElement(b.a,{item:!0},r.a.createElement(L.a,{onClick:t,variant:"contained",className:o.button},"New Game"))),h.hintPreference?r.a.createElement($,{onClick:a,hintButton:o.hintButton}):r.a.createElement(q,{title:"Too hard?",accept:function(){p({type:"SET_HINT_PREFERENCE",payload:s}),a()},textContent:"Would you like a hint?",buttonElement:r.a.createElement($,{dispatchGetHint:a,hintButton:o.hintButton})},r.a.createElement(D.a,{control:r.a.createElement(V.a,{checked:s,onChange:function(e){u(!s)},name:"hintPreference",color:"primary"}),label:"Check to not ask again."})))}var Q=Object(i.a)((function(e){return{fab:{textAlign:"center",color:"white",textShadow:"0px 1px 2px black",fontSize:"1em",fontWeight:"600",margin:"1.5px",transform:"scale(.85)"},root:{minHeight:"2.75em",marginBottom:"1.5em",marginTop:"1em"}}}));var X=function(e){var t=e.classesApplied,a=e.classAttr,n=Q(),o=N(),c=Object(l.a)(o,1)[0];function i(e,t){return u[(e+1)*t]}return r.a.createElement(b.a,{className:n.root,container:!0,justify:"center"},c.currentGuess.map((function(e,o){return r.a.createElement(b.a,{key:o,item:!0},r.a.createElement(g.a,{size:"small",style:{backgroundColor:i(e.x,e.y).base,backgroundImage:"radial-gradient(\n                            rgba(255,255,255,.3), \n                            ".concat(i(e.x,e.y).light,",\n                            ").concat(i(e.x,e.y).base,", \n                            ").concat(i(e.x,e.y).dark,", \n                            rgba(0,0,0,.7))")},className:a?"".concat(n.fab," ").concat(t):n.fab},c.puzzle.puzzle[e.x][e.y]))})))},ee=a(105),te=Object(i.a)((function(e){return{root:{flexGrow:1,marginTop:"2em"},paper:{height:45,width:24,textAlign:"center",lineHeight:"1.5em",fontSize:"24px",fontVariant:"all-small-caps"},hidden:{textAlign:"center",lineHeight:"1em",fontSize:"24px",fontVariant:"all-small-caps",height:45,width:24,background:"#ebfbff"},control:{padding:e.spacing(2)},start:{justifyContent:"flex-start",marginLeft:".25em",paddingLeft:0},end:{justifyContent:"flex-end",marginRight:"1em"},center:{justifyContent:"center"}}}));function ae(e){e.classAttr;var t=e.classesApplied,a=te(),n=N(),o=Object(l.a)(n,1)[0];return r.a.createElement(b.a,{container:!0,className:a.root,spacing:4===o.puzzle.words.length?2:1},o.puzzle.words.map((function(e,n){return r.a.createElement(b.a,{item:!0,xs:4===o.puzzle.words.length?6:12,key:n},r.a.createElement(b.a,{className:0!==n&&2!==n||4!==o.puzzle.words.length?1!==n&&3!==n||4!==o.puzzle.words.length?a.center:a.start:a.end,container:!0,spacing:1},function(e){return e.split("").map((function(n,c){return o.finalizedWords[e]?r.a.createElement(b.a,{key:c,item:!0},r.a.createElement(ee.a,{className:"".concat(t," ").concat(a.paper)},n)):r.a.createElement(b.a,{key:c,item:!0},r.a.createElement(ee.a,{className:a.hidden},""))}))}(e)))})))}var ne=a(113),re=Object(i.a)((function(e){return{text:{textAlign:"center",color:"white",textShadow:"1px 1px 1px ".concat(u[1].base)},color1:{backgroundColor:u[1].light},color2:{backgroundColor:u[3].light},color3:{backgroundColor:u[1].dark},color4:{backgroundColor:u[3].dark},linearRoot:{"& > * + *":{marginTop:e.spacing(2)},margin:"48vh 10vw auto"},animate:{animation:"pop ease 2s"},plopAnimate:{animation:"plop 600ms ease reverse"}}}));var oe=function(){var e=re(),t=Object(n.useState)([]),a=Object(l.a)(t,2),o=a[0],c=a[1],i=N(),s=Object(l.a)(i,2),u=s[0],f=s[1],h=Object(n.useState)(!1),g=Object(l.a)(h,2),b=g[0],z=g[1],E=Object(n.useState)(!1),y=Object(l.a)(E,2),v=y[0],w=y[1],k=Object(n.useState)(null),j=Object(l.a)(k,2),x=j[0],O=j[1];function C(e,t){f({type:"LETTER_PRESS",payload:{x:e-1,y:t}})}return Object(n.useEffect)((function(){var e=d();return c(e),function(){clearTimeout(x)}}),[]),Object(n.useEffect)((function(){o.length&&p(f)}),[o,f]),Object(n.useEffect)((function(){var e={};if(u.puzzle){for(var t in u.puzzle.wordPath){if(!e[t]){e[t]=[];for(var a=0;a<t.length;a++)e[t].push(!1)}for(var n=0;n<u.currentGuess.length;n++)JSON.stringify(u.currentGuess[n])===JSON.stringify(u.puzzle.wordPath[t][n])?u.currentGuess.length>1?e[t][n-1]===u.puzzle.wordPath[t][n-1]&&(e[t][n]=u.puzzle.wordPath[t][n]):e[t][n]=u.puzzle.wordPath[t][n]:e[t][n]=!1}var r=[],o=function(t){e[t].filter((function(e){return e})).length===t.length&&(z(!0),setTimeout((function(){f({type:"FINALIZE_WORD",payload:t}),f({type:"RESET_GUESSES"}),z(!1)}),2e3)),e[t][u.currentGuess.length-1]||r.push(t),u.finalizedWords[t]&&(e[t]=u.puzzle.wordPath[t])};for(var c in e)o(c);r.length===u.puzzle.words.length&&u.currentGuess.length&&f({type:"RESET_GUESSES"}),f({type:"CORRECT_MAP",payload:e})}}),[u.currentGuess,u.puzzle,f,u.finalizedWords]),Object(n.useEffect)((function(){u.puzzle&&Object.keys(u.finalizedWords).length===u.puzzle.words.length&&O(setTimeout((function(){w(!0)}),800))}),[u.finalizedWords,u.puzzle]),u.puzzle?r.a.createElement(r.a.Fragment,null,r.a.createElement(K,{dispatchGetWord:function(){return p(f)},dispatchGetHint:function(){for(var e in u.correctMap)if(u.correctMap[e].filter((function(e){return!e})).length>0){var t=u.correctMap[e].indexOf(!1),a=u.puzzle.wordPath[e][t];return C(a.x+1,a.y)}}}),r.a.createElement(X,{classAttr:b,classesApplied:e.animate}),r.a.createElement(G,{letterPress:C,wordGroups:o}),r.a.createElement(ae,{classesApplied:e.plopAnimate}),r.a.createElement(q,{title:"Congratulations!",show:v,outsideClose:function(){w(!1)},buttonElement:r.a.createElement(r.a.Fragment,null),textContent:"Game Win!!"})):r.a.createElement("div",{className:e.linearRoot},r.a.createElement(m.a,{classes:{root:e.text},variant:"h4",gutterBottom:!0},"Loading..."),r.a.createElement(ne.a,{classes:{colorPrimary:e.color1,barColorPrimary:e.color3}}),r.a.createElement(ne.a,{classes:{colorPrimary:e.color2,barColorPrimary:e.color4}}))},ce=(a(72),Object(i.a)((function(e){return{root:{margin:"3em"}}})));var ie=function(){var e=ce();return r.a.createElement("main",{className:e.root},r.a.createElement(T,null,r.a.createElement(oe,null)))},le=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function se(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ie,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/mothers_day",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/mothers_day","/service-worker.js");le?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):se(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):se(t,e)}))}}()}},[[60,1,2]]]);
//# sourceMappingURL=main.83316250.chunk.js.map