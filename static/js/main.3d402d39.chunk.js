(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,function(e,t,a){e.exports=a(22)},,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(8),c=a.n(r),s=(a(15),a(1)),o=a(2),i=a(4),m=a(3),u=a(5);a(16),a(17);function d(e){return l.a.createElement("div",{className:"nav-root",id:e.styleId,onClick:function(){return e.onClick(e.label,e.color)},style:e.selected?{color:e.color,borderColor:e.color}:{}},e.label)}a(18),a(19);function h(e){return l.a.createElement("div",{style:{color:e.selected?"#fff":e.color,zIndex:10},className:"map-location-root",onClick:e.onClick},l.a.createElement("div",{className:"map-dash"}),l.a.createElement("p",{className:"map-location-text"},e.label))}var p=[{label:"experience",ref:l.a.createRef()},{label:"education",ref:l.a.createRef()},{label:"skills",ref:l.a.createRef()},{label:"awards",ref:l.a.createRef()},{label:"leadership",ref:l.a.createRef()}],E=function(e){return l.a.createElement("div",{className:"baby-dash"})},v=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).handleScroll=function(e){0===a.state.mapOnIndex?window.scrollY>p[1].ref.current.offsetTop&&a.setState({mapOn:p[1].label,mapOnIndex:1}):(a.state.mapOnIndex,p.length)},a.handleMapClick=function(e,t){return function(n){a.setState({mapOn:e.label,mapOnIndex:t}),e.ref.current&&window.scroll({top:e.ref.current.offsetTop-e.ref.current.clientHeight-20,left:0,behavior:"smooth"})}},a.state={mapOn:p[0].label,mapOnIndex:0},a.scrollMargin=0,a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("scroll",this.handleScroll)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("scroll",this.handleScroll)}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"resume-root"},l.a.createElement("div",{className:"resume-map-container"},l.a.createElement("div",{className:"resume-map"},l.a.createElement("div",{id:"resume-map-blob",style:{top:9+30*this.state.mapOnIndex}}),p.map(function(t,a){return l.a.createElement(h,{key:t.label,label:t.label,color:e.props.color,selected:e.state.mapOn===t.label,onClick:e.handleMapClick(t,a)})}))),l.a.createElement("div",{className:"resume-content"},l.a.createElement("h1",{className:"resume-section-title",ref:p[0].ref},"experience"),l.a.createElement("div",{className:"experience-timeline"},l.a.createElement("div",{id:"timeline-line"}),l.a.createElement("div",{className:"timeline-section"},l.a.createElement("div",{className:"timeline-ball"},"summer 2018"),l.a.createElement("div",{className:"on-text"},l.a.createElement("h2",{className:"on-text"},"Quicken - Software Engineer Intern, Menlo Park, CA"),l.a.createElement("h5",{className:"on-text"},"may 2019 ~ august 2019"),l.a.createElement("h5",{className:"on-text"},l.a.createElement("div",{style:{margin:8}}),l.a.createElement("b",null,"constructed")," pages enabling users to track their savings over time, categorize and tag transactions more easily, and forecast their finances, into the future based on several variables. Also improved and maintained other features across the application.",l.a.createElement("div",{style:{margin:8}}),l.a.createElement("b",null,"worked")," on a team using the scrum methodology with 2 week long sprints organized and tracked on jira",l.a.createElement("div",{style:{margin:8}}),l.a.createElement("b",null,"skills:")," reactjs, react-redux, redux, axios, react router, immutable.js axios, moment, material ui, amcharts,"))),l.a.createElement("div",{style:{height:70}}),l.a.createElement("div",{className:"timeline-section"},l.a.createElement("div",{className:"timeline-ball",style:{top:200}},"summer 2017"),l.a.createElement("div",{className:"on-text"},l.a.createElement("h2",{className:"on-text"},"Quicken - Software Engineer Intern, Menlo Park, CA"),l.a.createElement("h5",{className:"on-text"},"june 2018 ~ august 2018"),l.a.createElement("h5",{className:"on-text"},l.a.createElement("div",{style:{margin:8}}),l.a.createElement("b",null,"constructed")," pages enabling users to track their net income and to initiate and track automated savings over time, and simultaneously improved and maintained other features across the application",l.a.createElement("div",{style:{margin:8}}),l.a.createElement("b",null,"worked")," on a team using the scrum methodology with 2 week long sprints organized and tracked on jira",l.a.createElement("div",{style:{margin:8}}),l.a.createElement("b",null,"skills:")," reactjs, react-redux, redux, axios, react router, redux sagas, axios, material ui, victory"))),l.a.createElement("div",{style:{height:50}})),l.a.createElement("div",{style:{height:80}}),l.a.createElement("h1",{className:"resume-section-title",ref:p[1].ref},p[1].label),l.a.createElement("div",{style:{paddingLeft:20,paddingRight:20}},l.a.createElement("div",null,l.a.createElement("h2",{className:"on-text"},"b.s. in computer science, expected may 2020"),l.a.createElement("h4",{className:"on-text"},"rensselaer polytechnic institute, troy, ny"),l.a.createElement("h4",{className:"on-text"},"gpa: 3.84"),l.a.createElement("div",{style:{height:10}}),l.a.createElement("div",{id:"coursework-container"},l.a.createElement("h3",{className:"on-text",id:"coursework-header"},"relevant coursework"),l.a.createElement("div",null,l.a.createElement("div",{className:"coursework-row"},l.a.createElement("h5",{className:"coursework-text-left on-text"},l.a.createElement(E,null),"data structures"),l.a.createElement("h5",{className:"coursework-text-right on-text"},l.a.createElement(E,null),"principles of software")),l.a.createElement("div",{className:"coursework-row"},l.a.createElement("h5",{className:"coursework-text-left on-text"},l.a.createElement(E,null),"discrete mathematics"),l.a.createElement("h5",{className:"coursework-text-right on-text"},l.a.createElement(E,null),"computer organization")),l.a.createElement("div",{className:"coursework-row"},l.a.createElement("h5",{className:"coursework-text-left on-text"},l.a.createElement(E,null),"operating systems"),l.a.createElement("h5",{className:"coursework-text-right on-text"},l.a.createElement(E,null),"database systems (fall 2019)")),l.a.createElement("div",{className:"coursework-row"},l.a.createElement("h5",{className:"coursework-text-left on-text"},l.a.createElement(E,null),"intro to ai"),l.a.createElement("h5",{className:"coursework-text-right on-text"},l.a.createElement(E,null),"programming languages (fall 2019)")),l.a.createElement("div",{className:"coursework-row"},l.a.createElement("h5",{className:"coursework-text-left on-text"},l.a.createElement(E,null),"intro to algorithms"),l.a.createElement("h5",{className:"coursework-text-right on-text"},l.a.createElement(E,null),"large scale programming & testing (fall 2019)"))))),l.a.createElement("div",null,l.a.createElement("h2",{className:"on-text"},"menlo atherton high school, atherton, ca"),l.a.createElement("h4",{className:"on-text"},"graduated in 2017"))),l.a.createElement("div",{style:{height:80}}),l.a.createElement("h1",{className:"resume-section-title",ref:p[2].ref},p[2].label),l.a.createElement("div",{style:{paddingLeft:20,paddingRight:20}},l.a.createElement("h3",{className:"on-text skills-text"},l.a.createElement("b",null,"proficient in"),": javascript - python - html - css - c - c++ - java"),l.a.createElement("h3",{className:"on-text skills-text"},l.a.createElement("b",null,"experience with"),": git version control - http request methods - scrum methodologies - agile development"),l.a.createElement("h3",{className:"on-text skills-text"},l.a.createElement("b",null,"excellent"),": oral and written communication skills")),l.a.createElement("div",{style:{height:80}}),l.a.createElement("h1",{className:"resume-section-title",ref:p[3].ref},p[3].label),l.a.createElement("h3",{className:"on-text skills-text"},l.a.createElement("b",null,"eagle scout"),", december 2016"),l.a.createElement("h3",{className:"on-text skills-text"},l.a.createElement("b",null,"member of the order of the arrow"),", boy scout honor society, 2013"),l.a.createElement("h3",{className:"on-text skills-text"},l.a.createElement("b",null,"dean's honor list"),", fall 2017 - spring 2019"),l.a.createElement("h3",{className:"on-text skills-text"},l.a.createElement("b",null,"rensselaer leadership award scholarship")),l.a.createElement("h3",{className:"on-text skills-text"},l.a.createElement("b",null,"ap scholar with distinction"),", 2016 & 2017")))}}]),t}(l.a.Component),g=a(6);a(20),a(21);function f(e){var t=e.min,a=e.max,n=e.value,r=e.onChange,c=e.title;return l.a.createElement("div",{className:"slider-root"},l.a.createElement("div",{style:{display:"flex"}},l.a.createElement("p",{className:"slider-title"},"".concat(c,": ")),l.a.createElement("input",{value:n,className:"slider-input",onChange:r})),l.a.createElement("input",{type:"range",min:"".concat(t),max:"".concat(a),value:"".concat(n),className:"slider",id:"myRange",onChange:r}))}var b=["div","button","span","input","p","a","ul","ol"],y={},x=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).composeStyles=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=a.state.boxShadow,n={backgroundColor:"#fff"};return t.active&&(n.boxShadow="".concat(t.hLength,"px ").concat(t.vLength,"px ").concat(t.blur,"px ").concat(t.spread,"px rgba(0,0,0,0.4)")),e?n:Object.assign({},y,n)},a.numStyles=function(){return Object.keys(a.composeStyles(!0)).length},a.dashCamelCase=function(e){for(var t="",a=0;a<e.length;a++)e.charCodeAt(a)>65&&e.charCodeAt(a)<90?t+="-".concat(e[a].toLowerCase()):t+=e[a];return t},a.createJSSString=function(){var e=a.composeStyles(!0),t="".concat(a.state.containerType,"Class: {\n");return Object.keys(e).forEach(function(a){var n="string"===typeof e[a];t+="  ".concat(a,": ").concat(n&&"'").concat(e[a]).concat(n&&"'",",\n")}),t+="}"},a.createCSSString=function(){var e=a.composeStyles(!0),t=".".concat(a.state.containerType,"-class {\n");return Object.keys(e).forEach(function(n){t+="  ".concat(a.dashCamelCase(n),": ").concat(e[n],";\n")}),t+="}"},a.renderContainer=function(){var e=a.state.containerType,t=a.composeStyles();switch(e){case"div":return l.a.createElement("div",{style:t});case"button":return l.a.createElement("button",{style:t});case"span":return l.a.createElement("span",{style:t});case"input":return l.a.createElement("input",{style:t});case"p":return l.a.createElement("p",{style:t},"lorem ipsum");case"a":return l.a.createElement("a",{href:"#playground-root",style:t},"lorem ipsum");case"ul":return l.a.createElement("ul",{style:t},l.a.createElement("li",null,"lorem ipsum"),l.a.createElement("li",null,"lorem ipsum"),l.a.createElement("li",null,"lorem ipsum"));case"ol":return l.a.createElement("ol",{style:t},l.a.createElement("li",null,"lorem ipsum"),l.a.createElement("li",null,"lorem ipsum"),l.a.createElement("li",null,"lorem ipsum"));default:return l.a.createElement("div",{style:t})}},a.changeStateEvent=function(e,t){return function(n){a.setState(Object(g.a)({},e,t))}},a.nestedStateChange=function(e,t,n){a.setState(Object(g.a)({},e,Object.assign({},a.state[e],Object(g.a)({},t,n))))},a.copyStyle=function(e){return function(){var t=document.getElementById(e);t.select(),document.execCommand("copy"),t.classList.add("style-text-copied"),a.setState({stylesCopied:e}),window.getSelection?window.getSelection().removeAllRanges():document.selection&&document.selection.empty(),setTimeout(function(){t.classList.remove("style-text-copied"),a.setState({stylesCopied:""})},1500)}},a.state={containerType:"div",stylesCopied:"",boxShadow:{active:!0,hLength:0,vLength:0,blur:0,spread:0}},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.containerType,n=t.stylesCopied;return l.a.createElement("div",{id:"playground-root"},l.a.createElement("a",{id:"playground-title",href:"#playground-root"},"div playground"),l.a.createElement("div",{className:"playground-horiz-panel"},b.map(function(t){return l.a.createElement("div",{key:"playground-cot-".concat(t),className:"cot-button ".concat(t===a?"cot-button-selected":""),onClick:e.changeStateEvent("containerType",t)},"".concat(t))})),l.a.createElement("div",{className:"playground-horiz-panel"},l.a.createElement("div",{className:"playground-verti-panel"},l.a.createElement("h1",{className:"style-text-header"},"JSS"),l.a.createElement("textarea",{readOnly:!0,id:"jss-text-area",spellCheck:"false",rows:this.numStyles()+4,value:this.createJSSString(),className:"style-text",onClick:this.copyStyle("jss-text-area")}),l.a.createElement("h2",{className:"copied-header",onClick:this.copyStyle("jss-text-area")},"jss-text-area"===n?"copied":"copy")),l.a.createElement("div",{id:"container-wrapper"},this.renderContainer()),l.a.createElement("div",{className:"playground-verti-panel"},l.a.createElement("h1",{className:"style-text-header"},"CSS"),l.a.createElement("textarea",{readOnly:!0,id:"css-text-area",spellCheck:"false",rows:this.numStyles()+4,value:this.createCSSString(),className:"style-text",onClick:this.copyStyle("css-text-area")}),l.a.createElement("h2",{className:"copied-header",onClick:this.copyStyle("css-text-area")},"css-text-area"===n?"copied":"copy"))),l.a.createElement("div",{className:"playground-horiz-panel"},l.a.createElement("div",{className:"control-container"},l.a.createElement("h3",{className:"control-header"},"shadow"),l.a.createElement(f,{title:"h-length",min:-50,max:50,value:this.state.boxShadow.hLength,onChange:function(t){return e.nestedStateChange("boxShadow","hLength",t.target.value)}}),l.a.createElement(f,{title:"v-length",min:-50,max:50,value:this.state.boxShadow.vLength,onChange:function(t){return e.nestedStateChange("boxShadow","vLength",t.target.value)}}),l.a.createElement(f,{title:"blur",min:0,max:100,value:this.state.boxShadow.blur,onChange:function(t){return e.nestedStateChange("boxShadow","blur",t.target.value)}}),l.a.createElement(f,{title:"spread",min:0,max:100,value:this.state.boxShadow.spread,onChange:function(t){return e.nestedStateChange("boxShadow","spread",t.target.value)}}))))}}]),t}(l.a.Component),w=[{label:"about",styleId:"nav-first",color:"#14a76c"},{label:"resume",styleId:"nav-second",color:"#303a75"},{label:"projects",styleId:"nav-third",color:"#ffe400"}],N=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).handleNavClick=function(e,t){"fade-out"!==a.state.wrapClass&&a.state.tab!==e&&(a.setState({wrapClass:"fade-out"}),setTimeout(function(){return a.setState({wrapClass:"fade-in",tab:e,tabColor:t})},400),a.setState({navTab:e}))},a.renderTab=function(){var e=a.state,t=e.tab,n=e.wrapClass,r=e.tabColor;switch(t){case"about":return l.a.createElement("div",{className:n},l.a.createElement("div",{className:"blob",style:{borderColor:r}}));case"resume":return l.a.createElement("div",{className:n},l.a.createElement(v,{color:w[1].color}));case"projects":return l.a.createElement("div",{className:n},l.a.createElement(x,null));default:return l.a.createElement("div",null)}},a.state={navTab:w[2].label,tab:w[2].label,tabColor:w[2].color,wrapClass:"fade-in"},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.navTab,n=t.tabColor;return l.a.createElement("div",{className:"app-root"},l.a.createElement("div",{style:{height:"100%"}},l.a.createElement("h1",{style:{color:n},className:"name-header"},"Michael Landolfi")),l.a.createElement("div",{className:"header"},l.a.createElement("div",{className:"nav-header"},w.map(function(t){return l.a.createElement(d,{key:"nav-".concat(t.label),styleId:t.styleId,label:t.label,color:t.color,onClick:e.handleNavClick,selected:a===t.label})}))),this.renderTab(),l.a.createElement("div",{style:{height:1e3}}))}}]),t}(l.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[9,1,2]]]);
//# sourceMappingURL=main.3d402d39.chunk.js.map