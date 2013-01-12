define('Skwitch/Animation/DOMView', [
  'Seed/Seed',
  'toDOM',
  'objects/extend'
],
  function(Seed, toDOM, extend) {
 
 	return Seed.extend({

    '+options' : {
      domDesc : null
    },

    init : function(o) {
      if (!o) o = {};
      Seed.prototype.init.call(this,o);

      if (o.el) {
      	this.el = o.el;
      }
        
      this.buildEl(o);

      if (this.el) {
        this.parentEl = o.parentEl || this.parentEl;
        if (this.parentEl) {
          if (typeof(this.parentEl) === 'function')this.parentEl = this.parentEl();
          if (!o.insertBefore) {
            this.parentEl.appendChild(this.el);
          }
          else {
            this.parentEl.insertBefore(this.el, o.insertBefore);
          }
        }
      }
    },

    hasClass : function(name) {
      if (this.el){ // debug chanel
       return (new RegExp('(\\s|^)'+name+'(\\s|$)')).test(this.el.className);
      }
    },

    removeClass : function(name){
      if (this.el && this.hasClass(name)) {
        this.el.className = this.el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
      }
    },

    addClass : function(name){
      if (this.el && !this.hasClass(name)) { this.el.className += (this.el.className ? ' ' : '') +name; }
    },

    css : function(o, el) {
      el = el || this.el;
      if (el) {
        for (var i in o) if (o.hasOwnProperty(i)) {
          if (this.cssFormater[i]) {
            r.extend(o, this.cssFormater[i](o[i]));
          }
        }
      }
      r.extend(el.style, o);
    },

    cssFormater : {
    	rotate : function(o) {
	      var cssRotate = 'rotate('+o+'deg)';
	      return {
	        'webkitTransform' : cssRotate,
	        'MozTransform' : cssRotate,
	        'transform' : cssRotate
	      };
	    }
    },

    hide : function() {
      this.el.style.display = 'none';
    },
    
    show : function() {
      this.el.style.display = 'block';
      this.fire('show');
    },

    formatDesc : function(desc) {
      if (typeof(desc) === 'object') {
        for (var i in desc) if (desc.hasOwnProperty(i)) {
          if (i.substr(-2) === '_b') {
            var name = i.substr(0, i.length - 2)
            desc[name] = desc[i].bind(this);
          }
        }
        if (desc.children) {
          for (i = desc.children.length; i--; ) {
            this.formatDesc(desc.children);
          }
        }
      }
      return desc;
    },
    
    buildEl : function() {
      if (this.domDesc) {
        this.el = toDOM(typeof(this.domDesc) === 'function' ? this.domDesc() : this.formatDesc(this.domDesc), this);
        this.setStyle();
      }
    },

    size: function(){
      return [this.el.offsetWidth, this.el.offsetHeight];
    },
    
    destroy : function(o){
      r.Controller.prototype.destroy.call(this,o);
      this.el && this.el.parentNode && this.el.parentNode.removeChild(this.el);
    }
    
  });

});
