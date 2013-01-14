define('Skwitch/Timeline/Timeline', [
  'Seed/Seed',
  './interactions/all',
  './magnets/magnets'
], function(Seed, interactions, magnets) {

  return Seed.extend({

    '+options' : {
      config : null,
      initState : null
    },

    '+init' : function() {
      window.timeline = this;
      this.initState = this.initState || this.config.get('initState');
      this.interactionName = this.config.get('interactionName');
      this.buildInteraction();
      this.buildMagnets();
      this.appState = this.interaction.getState();
      this.targetState = this.interaction.getState();
      this.interaction.forceToState(this.targetState);
      this.attachEvents();
      this.paused = true;
    },

    onSceneChange : function(scene) {

    },

    findScene : function(state) {
      var n = this.magnets.length,
          scene;
      for (var i = 0; i<n; i++ ) {
        var m = this.magnets[i];
            scene = m.scene || scene;
        if ( m.instant > state) {
          return scene;
        }
      }
    },

    play : function() {
      if (this.paused) {
        this.fire('tick', this.appState);
        this.paused = false;
        this.watch();
      }
    },

    pause : function() {
      this.paused = true;
    },

    attachEvents : function() {
      this.events =  [
        this.interaction.on('change', this.onInteractionChange.bind(this), this),
        // this.interaction.on('end', this.onInteractionEnd.bind(this), this),
        this.interaction.on('next', this.onInteractionNext.bind(this), this)
      ];
    },

    detachSubscriptions : function() {
      if (this.events) {
        this.events.send('un');
      }
    },

    onInteractionChange : function(interactionState) {
      if (!this._first && Math.abs(this.appState - interactionState ) > 100) { // ugly hack for scroll init
        this.setTargetState(interactionState);
        this.appState = interactionState;
        this.fire('tick', this.appState);
        this._first = true;
      } else {
        this.config.reset('fDelta');
        this.setTweener();
        this.setTargetState(interactionState);
      }
    },

    onInteractionEnd : function() {
      this.detachSubscriptions();
      this.setTweener('easeIn', { fDeltaStart : this.config.get('fDelta', { current : true}) / 2});
      this.appToMagnet();
      this.interaction.forceToState(this.targetState);
      this.after(300, this.attachEvents.bind(this));
    },


    onInteractionNext : function() {
      this.config.reset('minFDelta');
      this.config.reset('maxFDelta');
      this.doInteractionNext();
    },

    doInteractionNext : function() {
      this.detachSubscriptions();
      this.toNextMagnet();
      this.interaction.forceToState(this.targetState);
      this.after(1000, this.attachEvents.bind(this));
    },

    toNextMagnet : function() {
      var magnet = this.magnets.find(function(m) { return (m.instant > this.appState + 2 );}.bind(this));
      if (magnet) {
        this.setTweener('easeIn', { goTo : magnet.instant });
        this.goToMagnet(magnet);
      }
    },

    after : function(n, f) {
      setTimeout(f, n);
    },

    setTweener : function(name, o) {
      if (this.twinner) {
        this.twinner.un();
      }
      var set = this.config.set.bind(this.config);
      if (name === 'easeIn') {
        var begin = this.appState,
          end = o.goTo || this.targetState,
          max = this.config.get('maxFDelta'),
          min = o.fDeltaStart || this.config.get('minFDelta');
        set('fDelta', min);
        this.twinner = this.on('tick', function(state) {
          var fDelta = min + Math.sin( ((state - begin) /  (end - begin) ) * Math.PI / 2 ) * (max - min);
          set('fDelta', fDelta );
        }.bind(this), this);
      } else {
        this.config.reset('fDelta');
      }
    },

    buildInteraction : function() {
      var interactionName = this.interactionName;
      this.interaction = this.sub(interactions[interactionName.capitalize() + 'Interaction'], {
        name : interactionName,
        config : this.config,
        initAppState : this.initState,
        timeline : this
      });
      this._a.body.addClass(interactionName);
    },

    watch : function(callback) {
      setTimeout(function(){
        if (!this.paused) {
          this.appTowardTarget();
        }
        this.watch();
      }.bind(this), 1000 / this.config.get('fps'));
    },

    setTargetState : function(state) {
      this.targetState = state;
    },

    appTowardTarget : function() { // targetState is defined here
      var minDelta = this.config.get('maxFinalStatesDelta'),
          statesDelta = this.getStatesDelta();
      if (statesDelta >  minDelta) {
        var lastAppState = this.appState;

        this.appState = this.appStateBetween(this.appState, this.targetState);
        
        this.fire('tick', this.appState);
      }
    },

    buildMagnets : function() {
      this.magnets = magnets;
    },

    appToMagnet : function() {
      var magnet = this.findMagnet();
      if (magnet) {
        this.goToMagnet(magnet);
      }
    },

    findMagnet : function() {
      var direction = this.targetState - this.appState >= 0 ? 'future' : 'past',
          magnet;
      if (direction === 'future') {
        for (var i = 0; i < this.magnets.length; i++) {
          if (this.magnets[i].instant > this.appState + 0.2  ) {
            magnet = this.magnets[i];
            break;
          }
        }
      }
      if (direction === 'past') {
        for (var j = this.magnets.length; j--; ) {
          if (this.magnets[j].instant < this.appState - 0.2  ) {
            magnet = this.magnets[j];
            break;
          }
        }
      }
      return magnet;
    },

    goToMagnet : function(magnet) {
      this.setTargetState(magnet.instant);
    },

    getAppState : function() {
      return this.appState;
    },

    getStatesDelta : function() {
      return Math.abs(this.appState - this.targetState);
    },

    appStateBetween : function(appState, targetState) {
      var diff = appState - targetState,
          state;
      return targetState + diff / this.config.get('fDelta') ;
    }

  });

});