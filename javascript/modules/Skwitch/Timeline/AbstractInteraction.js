define('Skwitch/Timeline/AbstractInteraction', [
	'Seed/Seed',
], function(Seed) {

	return Seed.extend({

		'+options' : {
			config : null,
			name : null,
			initAppState : null,
			timeline : null
		},

		'+init' : function() {
			this._interactionCount = 0;
			this.buildEl();
			if (typeof this.initAppState !== null ) {
				this.forceToState(this.initAppState);
			}
			this.state = this.getState();
			this.initEvents();
		},

		forceInteractionToAppState : function() {
			//overide me
		},

		onClick : function() {
			this.fire('next');
		},

		detectInteractionEnd : function() {
      this._interactionCount++;
      var delta = this.timeline.getStatesDelta();
      var baseInterval = this.config.get('intervalBeforeInteractionEnd');
      // var interval = baseInterval + 3000 * ( delta - 15 ) / 75;
      var interval = baseInterval;
      setTimeout(function() {
        this._interactionCount--;
        if (!this._interactionCount) {
          this.fire('end');
        }
      }.bind(this), interval);
		},

		onInteraction  : function() {
			this.state = this.getState();
			this.fire('change', this.state);
			this.detectInteractionEnd();
		}

	});

});