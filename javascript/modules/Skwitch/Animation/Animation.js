define('Skwitch/Animation/Animation', [
  './Sequence',
  'objects/extend',
  'Seed/Seed',
  'objects/is',
  'Array/eachPair'
], function(Sequence, extend, Seed, is, A) {

	var Animation = Sequence.extend({

    '+options' : {
      parentAnimation : null,
      start : 0,
      end : 430,
      security : 400,
      parentEl : null,
      domDesc : null,
      keyInstant : null
    },

    '+init' : function() {

    },

    '+doBuild' : function(o) {
      this.setParentEl();
      this.setTimeline();
      this.initEventsTimeline();
      this.buildSequences();
      if (o && o.state) {
       this.fire('tick', o.state - this.timeline.start - this.start);
      }
      delete this.unformattedSequencesInit;
      delete this.sequencesInit;
    },

    setParentEl : function() {
      this.parentEl = this.parentEl || this._a.el;
    },

    setTimeline : function() {
      if (this.parentAnimation) {
        this.timeline = this.parentAnimation;
      } else {
        this.timeline = this._a.timeline;
      }
    },

    initEventsTimeline : function() {
      this.appState = this.timeline.appState - this.start;
      this.timeline.on('tick', function(state) {
        this.appState = state - this.start;
        if (this.beforeTick) this.beforeTick(state - this.start);
        this.fire('tick', state - this.start);
        if (this.afterTick) this.afterTick(state - this.start);
      }.bind(this), this);
    },

    between : function(start, end, o) {
      o = this.formatBetweenOption(o);
      this.on('tick', function(state) {
        var toRun = (state >= start) && (state <= end ),
            running = o._running;
        if (toRun) {
          if (!running) {
            if (o.enter) o.enter(state-start);
          }
          o._running = true;
          if (o.during) o.during.call(self, ((state - start ) / (end - start)) );
        } else {
          if (running) {
            if (o.out) o.out();
            o._running = false;
          }
        }
      }.bind(this), this);
    },

    buildBetweens : function(sequence) {
      sequence.frames.eachPair(function(frameA, frameB, i ) {
        this.buildBetween(frameA, frameB, i, sequence);
      }.bind(this));
    },

    buildBetween : function(frameA, frameB, i, sequence) {
      var  times = [frameA.instant, frameB.instant];
      if (i === 0) {
        this.buildBetweenToBeginning(times, sequence);
      }
      if (i === sequence.frames.length - 2) {
        this.buildBetweenToEnd(times, sequence);
      }
      this.buildBetweenDuring(times, sequence, i);
    },

    buildBetweenDuring : function(times, sequence, i) {
      var events = {
        during : function(r) {
          sequence.render( {
            between : [i,i+1],
            r : r
          });
        }.bind(this)
      };
      this.between(times[0], times[1], events);
    },

    buildBetweenToBeginning : function(times, sequence) {
      var t0 =  - sequence.security || - this.security  || -20;
      // var t0 = -430;
      this.between(t0, times[0], function() {
        sequence.renderFrame(0);
      });

    },

    buildBetweenToEnd : function(times, sequence) {
      var t1 = sequence.security || this.security  || times[1] + 20;
      // var t1 = 430;
      this.between(times[1], t1, function(r) {
        sequence.renderFrameEnd();
      });
    },

    formatBetweenOption : function(unformatted) {
      var formatted,
          f;
      if (is('function', unformatted)) {
        f = unformatted;
        formatted = {
          during : f
        };
      } else {
        formatted = unformatted;
      }
      return formatted;
    },

    buildSequences : function() {
      if (this.sequencesInit && !this.unformattedSequencesInit) {
        this.unformattedSequencesInit = this.sequencesInit;
        this.sequencesInit = null;
      }
      if (!this.unformattedSequencesInit && this.buildSequencesInit) {
        this.unformattedSequencesInit = this.buildSequencesInit();
      }
      if (!this.unformattedSequencesInit) {
        this.unformattedSequencesInit = [];
      }
      this.sequences = [];
      this.sequencesInit = this.formatSequencesInit(this.unformattedSequencesInit);
      this.sequencesInit.each(function(o) {
        if (o.render !== false) {
          this.sequences.push(this.buildSequence(o));
        }
      }.bind(this));
    },

    formatSequencesInit : function(unformatted) {
      var formatted;
      if (is('function', unformatted)) {
        formatted = unformatted.call(this);
      } else {
        formatted = unformatted;
      }
      return formatted;
    },

    buildSequence : function(o) {
      this.sequence = {};
      o = this.formatSequenceInit(o);
      var sequence = this.sub(o.cstr, o);
      this.sequence[sequence.name] = sequence;
      this.buildBetweens(sequence);
      return sequence;
    },

    formatSequenceInit : function(unformatted) {
      var formatted = {};
      formatted = extend({
        parentEl : unformatted.parentEl || this.el || this.parentEl,
        render : true,
        cstr : Sequence,
        keyInstant : this.formatKeyInstant(this.keyInstant)
      }, unformatted);
      if (formatted.type) {
        var fnName = 'format' + formatted.type.capitalize() + 'Type';
        if (this[fnName]) {
          formated = this[fnName](formatted);
        }
      }
      return formatted;
    },

    formatImgType : function(unformatted) {
      var extension = unformatted.extension || 'png',
          src = unformatted.src || '/assets/' + this.name + '/' + unformatted.name + '.' + extension,
          formatted;
      unformatted.domDesc = {
        tag : 'img',
        style : {
          zIndex : unformatted.zIndex || ''
        },
        attr : {
          src : src,
          'class' : 'sequence'
        }
      };
      formatted = unformatted;
      return formatted;
    },

    formatAnimationType : function(unformatted) {
      var formatted = unformatted;
      formatted.start = unformatted.start || this.start;
      formatted.end = unformatted.end || this.end;
      formatted.parentAnimation = this;
      return formatted;
    },

    formatKeyInstant : function(unformatted) {
      var formatted = this.keyInstant || {};
      formatted.start = is('number', this.start) && this.start || 0;
      formatted.end = this.end || 430;
      return formatted;
    },

    isAnimation : true,

    destroy : function() {
      if (this._isBuilt) {
        Seed.prototype.destroy.call(this);
        this.el && this.el.parentNode && this.el.parentNode.removeChild(this.el);
        if (this.sequences) {
          this.sequences.send('destroy');
        }
        this._isBuilt = false;
      }
    }

	});

  return Animation;

});