define("Skwitch/Animation/DOMView",["Seed/Seed","toDOM","objects/extend","detect/detect"],function(e,t,n,r){return e.extend({"+options":{domDesc:null,el:null},init:function(t){t||(t={}),e.prototype.init.call(this,t),this.el||this.buildEl(t),this.el&&(this.parentEl=t.parentEl||this.parentEl,this.parentEl&&(typeof this.parentEl=="function"&&(this.parentEl=this.parentEl()),t.insertBefore?this.parentEl.insertBefore(this.el,t.insertBefore):this.parentEl.appendChild(this.el)))},buildEl:function(e){this.domDesc&&(this.el=t(typeof this.domDesc=="function"?this.domDesc():this.formatDesc(this.domDesc),this))},hasClass:function(e){if(this.el)return(new RegExp("(\\s|^)"+e+"(\\s|$)")).test(this.el.className)},removeClass:function(e){this.el&&this.hasClass(e)&&(this.el.className=this.el.className.replace(new RegExp("(\\s|^)"+e+"(\\s|$)")," ").replace(/^\s+|\s+$/g,""))},addClass:function(e){this.el&&!this.hasClass(e)&&(this.el.className+=(this.el.className?" ":"")+e)},css:function(e,t){t=t||this.el;var r;if(t)for(var i in e)e.hasOwnProperty(i)&&this.cssFormater[i]&&(r=this.cssFormater[i](e[i]),r&&n(e,r));n(t.style,e)},cssFormater:{rotate:function(e){var t="rotate("+e+"deg)";return{webkitTransform:t,MozTransform:t,transform:t}},opacity:function(e){var t=r("IEVersion");if(t&&t<=8)return e===0?{display:"none"}:{display:"block"}},color:function(e){return{}}},hide:function(){this.el.style.display="none"},show:function(){this.el.style.display="block",this.fire("show")},formatDesc:function(e){if(typeof e=="object"){for(var t in e)if(e.hasOwnProperty(t)&&t.substr(-2)==="_b"){var n=t.substr(0,t.length-2);e[n]=e[t].bind(this)}if(e.children)for(t=e.children.length;t--;)this.formatDesc(e.children)}return e},size:function(){return[this.el.offsetWidth,this.el.offsetHeight]},destroy:function(t){e.prototype.destroy.call(this,t),this.el&&this.el.parentNode&&this.el.parentNode.removeChild(this.el)}})});