define("app/Main",["Function/bind","Array/all","String/all","Skwitch/Timeline/Timeline","Config/Config","app/configs","Geo/Ref","Geo/Rect","Skwitch/Animation/DOMView","Seed/Seed","toDOM","./animations/Scene1","app/animations/Parallax"],function(e,t,n,r,i,s,o,u,a,f,l,c,h){return f.extend({"+init":function(){this._a=this,this.body=new a({el:document.body}),this.buildConfig(),this.buildTimeline(),this.setVersion(),this.buildRefsRects(),this.buildEl(),this.buildScenes(),this.timeline.play(),this.initEvents()},initEvents:function(){this._resizing=0,window.onresize=this.onResizeLater.bind(this)},onResizeLater:function(){this._resizing++,this.el.style.display="none",setTimeout(function(){this._resizing--,this._resizing||(this.onResize(),this.el.style.display="block")}.bind(this),200)},onResize:function(){this.reload()},reload:function(){var e=this.timeline.appState;this.timeline.pause(),this.destroy(),this.body.el.innerHTML="",this.init({initState:e})},buildConfig:function(){this.config=this.sub(i,{values:s()})},buildTimeline:function(){this.timeline=this.sub(r,{config:this.config})},buildEl:function(){this.el=l({attr:{"class":"skwitch_container skwitch_window"}}),this.body.el.appendChild(this.el)},buildRefsRects:function(){this.buildRects(),this.buildRefs()},buildRects:function(){this.rect={},this.rect.db=new u([[0,0],this.bodySize]);var e=this.rect.db.getValue()[1];this.rect.window=new u(this.rect.db.getValue()),this.rect.scene=new u([this.rect.window.getValue()[1].minus(this.sceneSize).divide(2),this.sceneSize])},buildRefs:function(){this.ref={},this.ref.db=new o({factor:1,origin:[0,0],name:"db"}),this.ref.scene=new o({factor:1,origin:this.rect.scene.getValue()[0],name:"scene"}),this.ref.window=new o({factor:1,origin:[0,0],name:"window"})},setVersion:function(){this.bodySize=[document.body.offsetWidth,document.body.offsetHeight];var e=this.bodySize,t={};this.config.set("version",t),e[0]>=1024&&e[1]>=576?(t.l="1024x576",t.s=10,this.sceneSize=[1024,576]):e[0]<=768||e[1]<=432?(t.l="320x416",t.s=3,this.sceneSize=[320,416]):(t.l="768x423",t.s=3,this.sceneSize=[768,432]),console.log("version : ",t.l),console.log(t.l)},buildScenes:function(){this.scenes=[],this.scenes.push(this.sub(c)),this.scenes.push(this.sub(h))}})});