define('Skwitch/Timeline/interactions/TouchInteraction', [
  '../AbstractInteraction',
  'toDOM'
], function(AbstractInteraction, toDOM) {

  return AbstractInteraction.extend({

    '+options' : {
      name : 'touch'
    },

    initEvents : function() {
      document.ontouchmove = this.onTouchMove.bind(this);
      document.ontouchend = this.onTouchEnd.bind(this);
      // document.onclick = this.onClick.bind(this);
      // this._a.el.onclick = this.onClick.bind(this);
    },

    buildEl : function() {
      this.el = toDOM({
        attr : { 'class' : 'touch_interaction' }
      });
      //document.body.appendChild(this.el);
    },

    forceToState : function(appState) {
      this.state = appState;
      this.onInteraction();
    },

    onTouchMove : function(e) {
      e.preventDefault();
      var y = e.touches[0].clientY;
      if (typeof this._last === "undefined") {
        this._last = y;
        return;
      }
      var diff = (this._last - y)/this.config.get('scrollFactor'),
          state = this.state + diff;
      this._last = y;
      if (state < 0) {
        this.state  = 0;
      } else {
        this.state = state;
      }
      
      this.onInteraction();
    },

    getState : function() {
      return this.state;
    },

    onTouchEnd : function() {
      delete this._last;
    }

  });

});