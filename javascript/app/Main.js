define('app/Main', [
  'Function/bind',
  'Array/all',
  'String/all',
  'Skwitch/Timeline/Timeline',
  'Config/Config',
  'app/configs',
  'app/magnets',
  'Geo/Ref',
  'Geo/Rect',
  'Skwitch/Animation/DOMView',
  'Seed/Seed',
  'toDOM',
  './animations/Scene1',
  'app/animations/Parallax'
], function(F, A, S, Timeline, Config, configs, magnets, Ref, Rect, View, Seed, toDOM, Scene1, Parallax) {

  return Seed.extend({

    '+init' : function() {
      this._a = this;
      if (!window.console) {
        window.console = function() {};
      }
      this.body = (new View({
        el : document.body
      }));
      this.buildConfig();
      this.buildTimeline();

      this.setVersion();
      this.buildRefsRects();
      this.buildEl();
      this.buildScenes();
      this.timeline.play();
      this.initEvents();
    },

    initEvents : function() {
      this._resizing = 0;
      window.onresize = this.onResizeLater.bind(this);
    },

    onResizeLater : function() {
      this._resizing++;
      this.el.style.display = 'none';
      setTimeout(function() {
        this._resizing--;
        if (!this._resizing) {
          this.onResize();
          this.el.style.display = 'block';
        }
      }.bind(this), 200); 
    },

    onResize : function() {
      this.reload();
    },

    reload : function() {
      var lastState = this.timeline.appState;
      this.timeline.pause();
      this.destroy();
      this.body.el.innerHTML = '';
      this.init({ initState : lastState });
    }, 

    buildConfig : function() {
      this.config = this.sub(Config, { values : configs() });
    },

    buildTimeline : function() {
      this.timeline = this.sub(Timeline, {
        config : this.config,
        magnets : magnets
      });
    },

    buildEl : function() {
      this.el = toDOM({
        className :  'skwitch_container skwitch_window'
      });
      this.body.el.appendChild(this.el);
    },

    buildRefsRects : function() {
      this.buildRects();
      this.buildRefs();
    },

    buildRects : function() {
      this.rect = {};
      this.rect.db =  new Rect([[0,0], this.bodySize]);
      var dbSize = this.rect.db.getValue()[1];
      this.rect.window = new Rect(this.rect.db.getValue());
      this.rect.scene = new Rect( [this.rect.window.getValue()[1].minus(this.sceneSize).divide(2), this.sceneSize]);
    },

    buildRefs : function() {
      this.ref = {};
      this.ref.db = new Ref({
        factor : 1,
        origin : [0, 0],
        name : 'db'
      });
      this.ref.scene = new Ref({
        factor : 1,
        origin : this.rect.scene.getValue()[0],
        name : 'scene'
      });
      this.ref.window = new Ref({
        factor : 1,
        origin : [0,0],
        name : 'window'
      });
    },

    setVersion : function() {
      this.bodySize = [document.body.offsetWidth, document.body.offsetHeight];
      var bodySize = this.bodySize,
          version = {};
      this.config.set('version', version);
      if (bodySize[0] >= 1024 && bodySize[1] >= 576) { // 1024
        version.l = '1024x576';
        version.s = 10;
        this.sceneSize = [1024,576];
      } else if (bodySize[0] <= 768 || bodySize[1] <= 432 ) { // 320
        version.l = '320x416';
        version.s = 3;
        this.sceneSize = [320, 416];
      } else { // 768
        version.l = '768x423';
        version.s = 3;
        this.sceneSize = [768, 432];
      }
      console.log('version : ', version.l);
      console.log(version.l);
    },

    buildScenes : function() {
      this.scenes = [];
      this.scenes.push(this.sub(Scene1));
      this.scenes.push(this.sub(Parallax));
    }




  });

});