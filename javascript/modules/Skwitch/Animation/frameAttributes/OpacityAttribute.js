define('Skwitch/Animation/frameAttributes/OpacityAttribute', [
	'../FrameAttribute'
], function(FrameAttribute) {

	return r.FrameAttribute.extend({

		'+options' : {
			value : 1
		},

		between : function(c0, c1, r) {
      return Math.abs(c0 + r*(c1 - c0));
    }

	});

});