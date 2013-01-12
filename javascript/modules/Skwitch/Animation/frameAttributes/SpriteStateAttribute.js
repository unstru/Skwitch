define('Skwitch/Animation/frameAttributes/DisplayAttribute', [
	'../FrameAttribute'
], function(FrameAttribute) {

		'+options' : {
			value : 0
		},

		between : function(c0, c1, r) {
      return Math.abs(c0 + r*(c1 - c0));
    }

	});

});