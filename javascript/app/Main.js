define('app/Main', [
  'Function/bind',
  'Array/all',
  'String/all',
  'Skwitch/Timeline/Timeline',
  'Config/Config',
  'app/configs',
  'Geo/Ref',
  'Geo/Rect',
  'Skwitch/Animation/DOMView',
  'Seed/Seed',
  'toDOM',
  './animations/Scene1',
  './animations/DocAnimation'
], function(F, A, S, Timeline, Config, configs, Ref, Rect, View, Seed, toDOM, Scene1, DocAnimation) {

  return Seed.extend({

    '+init' : function() {
      this._a = this;
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
    },

    buildConfig : function() {
      this.config = this.sub(Config, { values : configs() });
    },

    buildTimeline : function() {
      this.timeline = this.sub(Timeline, {});
    },

    buildEl : function() {
      this.el = toDOM({
        attr : { 'class' : 'skwitch_container skwitch_window' }
      });
      this.body.el.appendChild(this.el);
    },

    buildRefsRects : function() {
      this.buildRects();
      this.buildRefs();
    },

    buildRects : function() {
      this.rect = {};
      this.bodySize = [document.body.offsetWidth, document.body.offsetHeight];
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
      var bodySize = this.bodySize,
          version = {};

      version.l = '1024x600';
      version.s = 10;
      this.sceneSize = [1024,600];
      this.config.set('version', version);
      return;
      if (bodySize[0] >= 1050 && bodySize[1] >= 830) { // 1280
        version.l = '1280x800';
        version.s = 12;
        this.sceneSize = [1280,800];
      } else if (bodySize[0] <= 760 || bodySize[1] <= 600 ) { // 320
        version.l = '320x480';
        version.s = 3;
        this.sceneSize = [320, 420];
      } else {

      }

    },

    buildScenes : function() {
      this.scenes = [];
      this.scenes.push(this.sub(Scene1));
      this.scenes.push(this.sub(DocAnimation, {
        parentEl : this.el
      }));
    }




  });

});