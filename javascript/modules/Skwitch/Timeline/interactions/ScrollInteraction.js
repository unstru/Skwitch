define('Skwitch/Timeline/interactions/ScrollInteraction', [
	'../AbstractInteraction',
  'toDOM'
], function(AbstractInteraction, toDOM) {

	return AbstractInteraction.extend({

		'+options' : {
			name : 'scroll'
		},

		initEvents : function() {
			window.onscroll = this.onInteraction.bind(this);
      document.body.onclick = this.onClick.bind(this);
		},

		buildEl : function() {
			this.el = toDOM({
        attr : { 'class' : 'scroll_interation' },
        style : { height : this._a.config.get('elHeight') + 'px'}
      });
      document.body.appendChild(this.el);
    },

    forceToState : function(appState) {
      var scrollRate = appState / this._a.config.get('totalDuration'),
          scrollTop = scrollRate * this._a.config.get('elHeight');
      window.scrollTo(0,scrollTop);
    },

    getState : function() {
      var scrollTop =  document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset || 0,
          scrollRate = scrollTop / this._a.config.get('elHeight'),
          state = this._a.config.get('totalDuration') * scrollRate;
      return state;
    }

	});

});