define('Skwitch/Animation/Sequence', [
  './DOMView',
  'Geo/Coordinate',
  'Geo/D2Point->Point',
  './Frame',
  'objects/is'
], function(View, Coordinate, Point, Frame, is) {

  return View.extend({

    '+options' : {
      unformattedFramesInit : null,
      framesInit : null,
      domDesc : null,
      debug : false,
      name : 'untitled',
      weak : false,
      forceRender : false,
      security : null,
      size : null,
      keyInstant : null,
      parentEl : null
    },

    '+init' : function() {
      if (this.framesInit && !this.unformattedFramesInit) {
        this.unformattedFramesInit = this.framesInit;
        this.framesInit = null;
      }
      if (this.name && ! this.unformattedName) {
        this.unformattedName = this.name;
      }
      if (!this.weak) {
        this.build();
      }
    },

    build : function(o) {
      if (!this._isBuilt) {
        this.doBuild(o);
        this._isBuilt = true;
      }
    },


    hide : function() {
      if (this.el) {
        this.el.style.display = 'none';
      }
    },

    show : function() {
      if (this.el) {
        this.el.style.display = 'block';
      }
    },

    doBuild : function(o) {
      this.name = this.formatName(this.unformattedName);
      this.buildFrames();
      this.renderFrame(0);
      this._a.on('resize', this.onResize.bind(this), this);
      delete this.unformattedFramesInit;
      delete this.unformattedName;
      delete this.framesInit;
    },

    formatName : function(unformatted) {
      if (is('function', unformatted)) {
        return unformatted();
      } else if (is('string', unformatted)) {
        return unformatted;
      }
    },

    buildFrames : function() {
      this.frames = [];
      if (this.unformattedFramesInit) {
        this.formatFramesInits();
        this.setAttributesNames();
        this.formattedFramesInits.each(function(formattedFrameInit, i) {
          this.frames.push(this.buildFrame(formattedFrameInit, i));
        }.bind(this));
      }
      if (this.debug) console.log('[debug]', this.name, this, 'el', this.el, 'parentEl', this.parentEl);
      if (this.debug ) console.log('[debug]', this.name,'frames', this.frames);
    },


    setAttributesNames : function() {
      this.attributesName = [];
      this.formattedFramesInits.each(function(formattedFrameInit) {
        for (var i in formattedFrameInit.attributes) {
          if (formattedFrameInit.attributes.hasOwnProperty(i)) {
            if (!this.attributesName.has(i)) {
              this.attributesName.push(i);
            }
          }
        }
      }.bind(this));
    },

    formatFramesInits : function( ) {
      this.formattedFramesInits = [];
      this.formattedFramesInits = this.unformattedFramesInit.map(this.formatFrameInit.bind(this));
    },

    onResize : function() {
      this.destroy();
      this.build();
      this.render({ force : true});
    },

    render : function(o) {
      var coord;
      o = o || {};
      if (o.force) {
        if (this.currentFrame) {
          if (this.currentFrame.between) {
            o.between = this.currentFrame.betweenIndexes;
            o.r = this._a.timeline.appState;
            this.setCurrentFrameBetween(o);
            return;
          } else {
            this.renderFrame(this.currentFrame.index);
            return;
          }
        }
      }
      if (this.currentFrame) {
        this.lastValues = this.currentFrame.getValues();
      }
      this.setCurrentFrame(o);
      this._renderAttributes();
    },


    _renderAttributes : function() {
      if (this.attributesName) {
        this.attributesName.each(this._renderAttribute.bind(this));
      }
    },

    _renderAttribute : function(attrName) {
      if (this.forceRender || this.el || this.canvasEl || this.raphaelEl) {
        var currentAttribute = this.currentFrame.attribute[attrName];
        if (this._isToBeRendered(currentAttribute)) {
          this._doRenderAttribute(currentAttribute);
        }
      }
    },

    _isToBeRendered : function(attribute) {
      return this.forceRender || !this.lastValues || this._hasValueUnequal(attribute);
    },

    _hasValueUnequal : function(attribute) {
      if (attribute.equals) {
        return !attribute.equals(this.lastValues[attribute.name]);
      } else {
        return (this.lastValues[attribute.name] !== attribute.getValue());
      }
    },

    _doRenderAttribute : function(attribute) {
      this['_render'+attribute.name.capitalize()](attribute.getValue());
    },

    setCurrentFrame : function(o) {
      if (o.isFrame) {
        this.currentFrame = o;
        return;
      }
      var unformattedInit, unformattedAttributesInit;
      if (o.between) {
        this.setCurrentFrameBetween(o);
      } else {
        unformattedInit = {
          previousFrame : this.currentFrame,
          instant : this._a.timeline.getAppState()
        };
        unformattedAttributesInit = o;
        unformattedInit.attributes = unformattedAttributesInit;
        var formattedInit = this.formatFrameInit(unformattedInit);
        this.currentFrame = this.buildFrame(formattedInit);
      }
    },

    setCurrentFrameBetween : function(o) {
      o.now = this._a.timeline.appState;
      o.frameBetweens = o.between.map(function(i) { return this.frames[i];}.bind(this));
      if (this.currentFrame.isBetween(o.frameBetweens)) {
        this._updateCurrentBetweenFrame(o);
      } else {
        this._buildNewCurrentBetweenFrame(o);
        if (this.debug === 'frames') console.log('[debug]', this.name, 'currentFrame', this.currentFrame);
      }
    },

    _updateCurrentBetweenFrame : function(o) {
      this.currentFrame.setValuesBetween(o.r);
    },

    _buildNewCurrentBetweenFrame : function(o) {
      this.currentFrame = this.buildFrame({
        instant : o.now,
        between : o.frameBetweens,
        betweenIndexes : o.between,
        r : o.r,
        previousFrame : this.currentFrame
      });
    },

    renderFrameEnd : function() {
      this.renderFrame(this.frames.length - 1);
    },

    renderFrame : function(n) {
      var frame = this.frames[n];
      if (frame) {
        this.render(frame);
      }
    },

    isSequence : true,

    formatFrameInit : function(unformatted) {
      var unformattedTemp = this.formatFrameTimeAndAttribute(unformatted),
          unformattedAttributes = unformattedTemp.attributes,
          formattedAttributes = {};
      if (is('array', unformattedAttributes)){ // case [0,0,window] [[], []]
        formattedAttributes.position = unformattedAttributes;
      } else if(is('plainObject', unformattedAttributes)) { // case { display : 'hidden', position : ? }
        formattedAttributes = unformattedAttributes;
      } else if (is('string', unformattedAttributes)) { //case 'hidden'
        if (unformattedAttributes === 'fromName') {
          formattedAttributes.position = 'fromName';
        }
      }
      return {
        attributes : formattedAttributes,
        instant : unformattedTemp.instant,
        previousFrame : unformatted.previousFrame || null
      };
    },


    // ['hidden', 3] => { attributes : 'hidden', instant : 3}
    // [[], 14] => { attributes : [], instant : 13 }
    // { attributes : ?, instant : ?} => the same
    formatFrameTimeAndAttribute : function(unformatted) {
      var formatted = {};
      if (is('array', unformatted)) {
        formatted = {
          attributes : unformatted[0],
          instant : unformatted[1]
        };
      } else if (is('plainObject', unformatted)) {
        formatted = unformatted;
      }
      formatted.instant = this.formatInstants(formatted.instant);
      return formatted;
    },

    formatInstants : function(unformatted) {
      var formatted;
      if (is('string', unformatted)) {
        if (unformatted === 'start') {

        }
        formatted = this.keyInstant[unformatted];
      } else if (is('number', unformatted)) {
        formatted = unformatted;
      }
      return formatted;
    },

    buildFrame : function(formattedFrameInit, i) {
      return this.sub(Frame, {
        index : i,
        unformattedAttributesInit : formattedFrameInit.attributes,
        instant : formattedFrameInit.instant,
        attributesName : this.attributesName,
        previousFrame : formattedFrameInit.previousFrame || (i && this.frames[i-1]) || null,
        sequenceName : this.name,
        between : formattedFrameInit.between || null,
        r : formattedFrameInit.r,
        betweenIndexes : formattedFrameInit.betweenIndexes || null
      });
    },

    _renderRotate : function(teta) {
      this.css({
        rotate : teta
      });
    },

    _renderSize : function(p) {
       var size = p;
       this.el.style.width = size[0] + 'px';
       this.el.style.height = size[1] + 'px';
    },

    _renderOpacity : function(i) {
      if (this.debug === 'opacity') console.log(i);
      if (i< 0) i = 0;
      if (i>1) i = 1;
      this.css({ opacity : i });
    },

    _renderDisplay : function(v) {
      if (this.debug === 'display') console.log('[debug]', this.name, 'display', v);
      if (v) {
        this.el.style.display = 'block';
      } else {
        this.el.style.display = 'none';
      }
    },

    _renderPosition : function(c) {
      var p = c.inRef('db').getValue();
      if (this.debug === 'frames') console.log('[debug]', this.name, 'p final', p);
      if (this.el) {
        this.el.style.left = p[0] + 'px';
        this.el.style.top = p[1] + 'px';
      } else if (this.raphaelEl) {
        this.raphaelEl.attr({
          transform : 'T' + p[0] + ' ' + p[1] + 'S' + this.scaleF + 'R' + this.rotation
        });
      }
    },

    '+destroy' : function() {
      this._isBuilt = false;
    }

  });

});