define('Skwitch/Animation/frameAttributes/RotateAttribute', [
	'../FrameAttribute'
], function(FrameAttribute) {

	return FrameAttribute.extend({

		'+options' : {
		},

		between : function(c0, c1, r) {
      return Math.round(c0 + r*(c1 - c0)) % 360;
    }

	});

});