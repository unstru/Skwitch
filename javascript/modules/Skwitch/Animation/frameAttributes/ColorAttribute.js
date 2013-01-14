define('Skwitch/Animation/frameAttributes/ColorAttribute', [
	'../FrameAttribute',
	'objects/is'
], function(FrameAttribute, is) {

	return FrameAttribute.extend({

		'+options' : {
			value : [0,0,0]
		},

		format : function(unformated) {
			var formated;
			if (!is('array', unformated)) {
				formated = this.hexToRgb(unformated);
			} else {
				formated = unformated;
			}
			if (formated.length === 3) {
				formated.push(1);
			}
			return formated;
		},

		between : function(c0, c1, r)  {
     	var colorsRBG = [c0, c1].map(this.format.bind(this));
     	return (colorsRBG[1].minus(colorsRBG[0]).multiply(r)).add(colorsRBG[0]).map(function(c, i) { 
     		if (i !== 3) {
     			return parseInt(c,10);
     		} else {
     			return c;
     		}
     	});
    },

    hexToRgb : function(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    return result ? 
	    	result.splice(0,1) && result.map(function(c) { return parseInt(c, 16)})
	    : [0,0,0];
    }

	});

});