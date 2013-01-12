define('Skwitch/Animation/frameAttributes/AbstractRateAttribute', [
	'../FrameAttribute'
], function(FrameAttribute) {

	return FrameAttribute.extend({

		'+options' : {
		},

		between : function(c0, c1, r) {
      return Math.abs(c0 + r*(c1 - c0));
    }

	});

});