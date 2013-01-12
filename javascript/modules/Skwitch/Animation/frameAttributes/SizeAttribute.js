define('Skwitch/Animation/frameAttributes/SizeAttribute', [
	'animation/FrameAttribute',
  'core/is'
], function(FrameAttribute, is) {

	return FrameAttribute.extend({
		
		// if attributeName ['position','opacity']
		// { point : [0, 0, 'window']} => { point : [0,0, 'window']}, opacity : lastFrame || null }
		// { point : [['left','top', 'scene'], ['left']]}
		// { style : { opacity : 0}}
		// { style : 'hidden' }
		// [0, 0, 'window'] => *Point()
		// [['left', 'windo'],['top', 'scene']] => Point
		// both combined
		format : function(unformatted) {
      var formatted = [],
          nSize,
          oSize;

      var ref,
          isRefSize = (unformatted.length === 1);
      if (is('array',unformatted)) { // case [100,100,'window'] or ['100%', '100%', 'scene'] or ['scene']
        if (unformatted.length > 2) { // case [100,100,'window'] or ['100%', '100%', 'scene']
          ref = unformatted[2],
              nSize = [],
              oSize = unformatted;
          [0,1].each(function(i){
            if (typeof oSize[i] === 'string') {
              var percentage = oSize[i].split('%')[0] / 100;
              nSize[i] = this._a.rect[ref].getValue()[1][i] * percentage;
            } else {
              nSize[i] = oSize[i];
            }
          }.bind(this));
          formatted = nSize;
        } else if (unformatted.length === 1) {
          ref = unformatted[0];
          formatted = this._a.rect[ref].getValue()[1];
        } else { // case [100,100]
          formatted = unformatted;
        }
      } else if (is('string', unformatted) ) { // case 'window' or 'scene' or 'fromName'
        if (unformatted === 'fromName') { //case from name
          this._setFromName();
          formatted = this.getFromName('size');
        } else {
          ref = unformatted;
          formatted =  this._a.rect[ref].getValue()[1];
        }
      }
      return formatted;
		},

    between : function(c0, c1, r) {
      return c0.add(c1.minus(c0).multiply(r) ) ;
    },

    _setFromName : function() {
      var info = this.sequenceName.split('_-')[1];
      if (info) {
        var infoSplit = info.split('_'),
          size = infoSplit[0].split('x').map(function(p) { return parseInt(p)});
        this._fromName = size;
      }
    },

    getFromName : function() {
      if (!this._fromName) {
        this._setFromName();
      }
      if (this._fromName) {
        return this._fromName;
      } else {
        return false;
      }
    }


	});

});