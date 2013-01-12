define('Skwitch/Animation/frameAttributes/DisplayAttribute', [
	'../FrameAttribute'
], function(FrameAttribute) {

	return FrameAttribute.extend({

		'+options' : {
			value : true
		},

		between : function(c0, c1)  {
      return c0 && c1;
    }

	});

});