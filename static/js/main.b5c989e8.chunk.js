(this.webpackJsonpgithubapi=this.webpackJsonpgithubapi||[]).push([[0],{13:function(e,s,t){},14:function(e,s,t){},15:function(e,s,t){},16:function(e,s,t){"use strict";t.r(s);var r=t(0),o=t(1),n=t.n(o),u=t(7),l=t.n(u),a=(t(13),t(14),t(2)),i=t(3),c=t(5),p=t(4),f=(t(15),function(e){Object(c.a)(t,e);var s=Object(p.a)(t);function t(e){var r;return Object(a.a)(this,t),(r=s.call(this,e)).state={},r}return Object(i.a)(t,[{key:"render",value:function(){var e=this.props.user;return Object(r.jsxs)("div",{children:["Name: ",e.name,Object(r.jsx)("br",{}),"Repositories: ",e.public_repos,Object(r.jsx)("br",{}),"Followers: ",e.followers,Object(r.jsx)("br",{}),"Following: ",e.following]})}}]),t}(n.a.Component)),g=function(e){Object(c.a)(t,e);var s=Object(p.a)(t);function t(e){var r;return Object(a.a)(this,t),(r=s.call(this,e)).resetUser1=function(){var e=r.state.user1;e.message="user does not exist",e.img="default-avatar.png",e.name="",e.public_repos="",e.followers="",e.following="",e.repositories=[],e.pullrequest=0,r.setState({user1:e})},r.resetUser2=function(){var e=r.state.user2;e.message="user does not exist",e.img="default-avatar.png",e.name="",e.public_repos="",e.followers="",e.following="",e.repositories=[],e.pullrequest=0,r.setState({user2:e})},r.getRepositories=function(){Promise.all([fetch("https://api.github.com/users/"+r.refs.user1.value+"/repos"),fetch("https://api.github.com/users/"+r.refs.user2.value+"/repos")]).then((function(e){return Promise.all(e.map((function(e){return e.json()})))})).then((function(e){var s=r.state.user1,t=r.state.user2;e[0].map((function(e){s.repositories.push(e.name),s.pullrequest+=r.getPullRequest(e.name)})),console.log(s.pullrequest),e[1].map((function(e){t.repositories.push(e.name),t.pullrequest+=r.getPullRequest(e.name)})),console.log(t.pullrequest),r.setState({user1:s,user2:t})})).catch((function(e){console.log(e)}))},r.getPullRequest=function(e){var s=0;return fetch("https://api.github.com/repos/"+r.refs.user1.value+"/"+e+"/pulls").then((function(e){return e.json()})).then((function(e){s=e.length})).catch((function(e){console.log(e)})),console.log("count"+s),s},r.stats=function(){r.refs.user1.value&&r.refs.user2.value?(r.getRepositories(),Promise.all([fetch("https://api.github.com/users/"+r.refs.user1.value),fetch("https://api.github.com/users/"+r.refs.user2.value)]).then((function(e){return Promise.all(e.map((function(e){return e.json()})))})).then((function(e){var s=r.state.user1,t=r.state.user2;e[0].message&&e[1].message?(r.resetUser1(),r.resetUser2()):e[0].message?(r.resetUser1(),t.img=e[1].avatar_url,t.name=e[1].name,t.public_repos=e[1].public_repos,t.message="",t.followers=e[1].followers,t.following=e[1].following):e[1].message?(r.resetUser2(),s.img=e[0].avatar_url,s.name=e[0].name,s.public_repos=e[0].public_repos,s.message="",s.followers=e[0].followers,s.following=e[0].following):(s.img=e[0].avatar_url,s.name=e[0].name,s.public_repos=e[0].public_repos,s.message="",s.followers=e[0].followers,s.following=e[0].following,t.img=e[1].avatar_url,t.name=e[1].name,t.public_repos=e[1].public_repos,t.message="",t.followers=e[1].followers,t.following=e[1].following),r.setState({user1:s,user2:t})})).catch((function(e){console.log(e)}))):alert("Enter all fields")},r.state={user1:{img:"default-avatar.png",name:"",public_repos:"",message:"",followers:"",following:"",repositories:[],pullrequest:0},user2:{img:"default-avatar.png",name:"",public_repos:"",message:"",followers:"",following:"",repositories:[],pullrequest:0}},r}return Object(i.a)(t,[{key:"render",value:function(){var e=this;return Object(r.jsxs)("div",{children:[Object(r.jsxs)("div",{className:"left",children:[Object(r.jsx)("img",{src:this.state.user1.img}),Object(r.jsx)("br",{}),"   ",Object(r.jsx)("br",{}),"UserName:",Object(r.jsx)("input",{ref:"user1",type:"text",name:"user1"}),Object(r.jsx)("br",{}),this.state.user1.message,Object(r.jsx)("br",{}),Object(r.jsx)(f,{user:this.state.user1})]}),Object(r.jsxs)("div",{className:"right",children:[Object(r.jsx)("img",{src:this.state.user2.img}),Object(r.jsx)("br",{}),"   ",Object(r.jsx)("br",{}),"UserName:",Object(r.jsx)("input",{ref:"user2",type:"text",name:"user2"}),Object(r.jsx)("br",{}),this.state.user2.message,Object(r.jsx)("br",{}),Object(r.jsx)(f,{user:this.state.user2})]}),Object(r.jsx)("button",{onClick:function(){return e.stats()},children:"Get stats"})]})}}]),t}(n.a.Component);var b=function(){return Object(r.jsx)("div",{className:"App",children:Object(r.jsx)(g,{})})},m=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,17)).then((function(s){var t=s.getCLS,r=s.getFID,o=s.getFCP,n=s.getLCP,u=s.getTTFB;t(e),r(e),o(e),n(e),u(e)}))};l.a.render(Object(r.jsx)(n.a.StrictMode,{children:Object(r.jsx)(b,{})}),document.getElementById("root")),m()}},[[16,1,2]]]);
//# sourceMappingURL=main.b5c989e8.chunk.js.map