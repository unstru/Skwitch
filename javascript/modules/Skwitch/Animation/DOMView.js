define('Skwitch/Animation/DOMView', [
  'Seed/Seed',
  'toDOM',
  'objects/extend',
  'detect/detect'
],
  function(Seed, toDOM, extend, detect) {
 
 	return Seed.extend({

    '+options' : {
      domDesc : null,
      el : null
    },

    init : function(o) {
      if (!o) o = {};
      Seed.prototype.init.call(this,o);

      if (!this.el) {
        this.buildEl(o);
      }
      
      if (this.el) {
        this.parentEl = o.parentEl || this.parentEl;
        if (this.parentEl) {
          if (typeof(this.parentEl) === 'function')this.parentEl = this.parentEl();
          if (!o.insertBefore) {
            this.parentEl.appendChild(this.el);
          } else {
            this.parentEl.insertBefore(this.el, o.insertBefore);
          }
        }
      }
    },

    buildEl : function(o) {
      if (this.domDesc) {
        this.el = toDOM(typeof(this.domDesc) === 'function' ? this.domDesc() : this.formatDesc(this.domDesc), this);
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
      var formatter;
      if (el) {
        for (var i in o) if (o.hasOwnProperty(i)) {
          if (this.cssFormater[i]) {
            formatter = this.cssFormater[i](o[i])
            if (formatter) {
              extend(o, formatter);
            }
          }
        }
      }
      extend(el.style, o);
    },

    cssFormater : {

    	rotate : function(o) {
	      var cssRotate = 'rotate('+o+'deg)';
	      return {
	        'webkitTransform' : cssRotate,
	        'MozTransform' : cssRotate,
	        'transform' : cssRotate
	      };
	    },

      opacity : function(o) {
        var IEV = detect('IEVersion');
        if (IEV && IEV <= 8) { // for IE, hide the element if opacity is 0
          if (o === 0) {
            return { display : 'none' }
          } else {
            return { display : 'block' }
          }
        }
      },
      // rgb detect and fallback ?
      color : function(c) {
        return {};
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

    size: function(){
      return [this.el.offsetWidth, this.el.offsetHeight];
    },
    
    destroy : function(o){
      Seed.prototype.destroy.call(this,o);
      this.el && this.el.parentNode && this.el.parentNode.removeChild(this.el);
    }
    
  });

});
