define('app/scenes/Scene1', [
	'Skwitch/Animation/Animation'
], function(Animation) {

	return Animation.extend({

		'+options' : {
			start : 0,
			end : 430,
			sequencesInit : function() {
				return [
					{
						type : 'domDesc',
						domDesc : {
							style : {
								backgroundColor : '#000'
							}
						},
						framesInit : [
							[
								{
									position : [100, 100, 'window'],
									size : [100, 100]
								},
								0
							],
							[
								{
									position : ['center', 'center', 'scene']
								},
								20
							]
						]
					}
				]
			}
		}


	});

});