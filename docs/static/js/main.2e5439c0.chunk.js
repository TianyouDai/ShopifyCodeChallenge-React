(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,a){e.exports=a(17)},17:function(e,t,a){"use strict";a.r(t);var r=a(2),n=a(3),i=a(5),c=a(4),l=a(6),u=a(0),o=a.n(u),s=a(15),f=a.n(s),v=(a(23),a(7)),d=a.n(v);function h(e){return o.a.createElement("h1",{className:"title-area"},e.name)}function m(e){var t=[],a={},r=0,n=!0,i=!1,c=void 0;try{for(var l,u=e.data[Symbol.iterator]();!(n=(l=u.next()).done);n=!0){var s=l.value,f=!0,v=!1,d=void 0;try{for(var h,m=s.keywords[Symbol.iterator]();!(f=(h=m.next()).done);f=!0){var y=h.value;y in a||(a[y]=!0,t.push(o.a.createElement("option",{value:y,key:r})),r+=1)}}catch(p){v=!0,d=p}finally{try{f||null==m.return||m.return()}finally{if(v)throw d}}}}catch(p){i=!0,c=p}finally{try{n||null==u.return||u.return()}finally{if(i)throw c}}return o.a.createElement("datalist",{id:"keywords"},t)}var y=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(i.a)(this,Object(c.a)(t).call(this,e))).state={value:""},a}return Object(l.a)(t,e),Object(n.a)(t,[{key:"handelChange",value:function(e){this.setState({value:e}),""===e&&this.props.onSearch("")}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"search-area"},o.a.createElement(p,{onSearch:function(){return e.props.onSearch(e.state.value)},onModify:function(t){return e.handelChange(t)}}),o.a.createElement(b,{onSearch:function(){return e.props.onSearch(e.state.value)}}))}}]),t}(o.a.Component),p=function(e){function t(){return Object(r.a)(this,t),Object(i.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(n.a)(t,[{key:"handelKeypress",value:function(e){13===e.keyCode&&this.props.onSearch(),this.props.onModify(e.target.value)}},{key:"render",value:function(){var e=this;return o.a.createElement("input",{className:"search-field",type:"text",name:"query",list:"keywords",onKeyUp:function(t){return e.handelKeypress(t)}})}}]),t}(o.a.Component),b=function(e){function t(){return Object(r.a)(this,t),Object(i.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"search-box-area"},o.a.createElement("div",{className:"search-box",onClick:function(){return e.props.onSearch()}},o.a.createElement("i",{className:"fas fa-search fa-2x"})))}}]),t}(o.a.Component),k=function(e){function t(){return Object(r.a)(this,t),Object(i.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){var e=this,t=this.props.res,a=this.props.fav.map(function(e){return e.uid}),r=t.map(function(t){var r=a.includes(t.uid)?"fas fa-star fav":"fas fa-star",n=t.uid;return o.a.createElement("div",{className:"result-row",key:n},o.a.createElement("i",{className:r,onClick:function(){return e.props.onClick(t.uid)},key:n+"0"}),o.a.createElement("div",{className:"result-title",key:n+"1"},t.title),o.a.createElement("div",{className:"result-body",key:n+"2",dangerouslySetInnerHTML:{__html:t.body}}))});return o.a.createElement("div",{className:"result-area"},r)}}]),t}(o.a.Component),j=function(e){function t(){return Object(r.a)(this,t),Object(i.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){var e=this,t=this.props.fav;if(t.length<=0)return o.a.createElement("div",null);var a=t.map(function(t){var a=t.uid+"fav";return o.a.createElement("div",{className:"result-row",key:a},o.a.createElement("i",{className:"fas fa-star fav",onClick:function(){return e.props.onClick(t.uid)},key:a+"0"}),o.a.createElement("div",{className:"result-title",key:a+"1"},t.title),o.a.createElement("div",{className:"result-body",key:a+"2",dangerouslySetInnerHTML:{__html:t.body}}))});return o.a.createElement("div",{className:"favourite-area"},o.a.createElement("h2",{className:"favourite-title"},"Favourites"),o.a.createElement("div",{className:"favourite-result-area"},a))}}]),t}(o.a.Component),E=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(i.a)(this,Object(c.a)(t).call(this,e))).state={data:[],results:[],fav:[]},a}return Object(l.a)(t,e),Object(n.a)(t,[{key:"componentDidMount",value:function(){var e=this;d.a.get("https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000").then(function(t){var a=!0,r=!1,n=void 0;try{for(var i,c=t.data[Symbol.iterator]();!(a=(i=c.next()).done);a=!0){var l=i.value;l.body=O(l.body),l.uid=btoa(l.title);var u=l.keywords.replace("(","").replace(")","").split(", ").map(function(e){return e.split(" ")}).flat().filter(function(e){return""!==e});l.keywords=u;var o={},s=!0,f=!1,v=void 0;try{for(var h,m=u[Symbol.iterator]();!(s=(h=m.next()).done);s=!0){o[h.value]=!0}}catch(S){f=!0,v=S}finally{try{s||null==m.return||m.return()}finally{if(f)throw v}}l.keywordsDict=o}}catch(S){r=!0,n=S}finally{try{a||null==c.return||c.return()}finally{if(r)throw n}}var y={},p=!0,b=!1,k=void 0;try{for(var j,E=t.data[Symbol.iterator]();!(p=(j=E.next()).done);p=!0){var w=j.value;y[w.uid]=w}}catch(S){b=!0,k=S}finally{try{p||null==E.return||E.return()}finally{if(b)throw k}}d.a.get("https://0rl0n06sj6.execute-api.us-east-1.amazonaws.com/default/getFavourites").then(function(t){var a=t.data.map(function(e){return e.uid}),r=[],n=[];for(var i in y)n.push(y[i]),a.includes(i)&&r.push(y[i]);e.setState({data:n,fav:r})})})}},{key:"searchData",value:function(e){var t=[],a=!0,r=!1,n=void 0;try{for(var i,c=this.state.data[Symbol.iterator]();!(a=(i=c.next()).done);a=!0){var l=i.value,u=!0,o=!1,s=void 0;try{for(var f,v=e[Symbol.iterator]();!(u=(f=v.next()).done);u=!0){if(f.value in l.keywordsDict){t.push(l),!0;break}}}catch(d){o=!0,s=d}finally{try{u||null==v.return||v.return()}finally{if(o)throw s}}}}catch(d){r=!0,n=d}finally{try{a||null==c.return||c.return()}finally{if(r)throw n}}return t}},{key:"searchHandeler",value:function(e){e=e.split(" ");var t=this.searchData(e);this.setState({results:t})}},{key:"clickHandeler",value:function(e){var t=this,a=!this.state.fav.map(function(e){return e.uid}).includes(e),r="uid=".concat(e,"&status=").concat(a);d.a.get("https://0rl0n06sj6.execute-api.us-east-1.amazonaws.com/default/setFavorite?"+r).then(function(e){d.a.get("https://0rl0n06sj6.execute-api.us-east-1.amazonaws.com/default/getFavourites").then(function(e){var a=e.data.map(function(e){return e.uid}),r=[],n=!0,i=!1,c=void 0;try{for(var l,u=t.state.data[Symbol.iterator]();!(n=(l=u.next()).done);n=!0){var o=l.value;a.includes(o.uid)&&r.push(o)}}catch(s){i=!0,c=s}finally{try{n||null==u.return||u.return()}finally{if(i)throw c}}t.setState({fav:r})})})}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"container"},o.a.createElement(h,{name:"Toronto Waste Lookup"}),o.a.createElement("div",{className:"content-area"},o.a.createElement(y,{onSearch:function(t){return e.searchHandeler(t)}}),o.a.createElement(k,{onClick:function(t){return e.clickHandeler(t)},res:this.state.results,fav:this.state.fav}),o.a.createElement(j,{onClick:function(t){return e.clickHandeler(t)},fav:this.state.fav})),o.a.createElement(m,{data:this.state.data}))}}]),t}(o.a.Component);function O(e){var t=document.createElement("textarea");return t.innerHTML=e,t.value}f.a.render(o.a.createElement(E,null),document.getElementById("root"))},23:function(e,t,a){}},[[16,2,1]]]);
//# sourceMappingURL=main.2e5439c0.chunk.js.map