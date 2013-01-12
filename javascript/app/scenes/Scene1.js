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
							},
							className : 'sequence'
						},
						framesInit : [
							[
								{
									position : [0, 0, 'window'],
									size : [100, 100],
									rotate : 0,
									opacity : 1
								},
								0
							],
							[
								{
									position : ['center', 'center', 'scene']
								},
								20
							],
							[
								{},
								25
							],
							[
								{
									size : [200,100],
									position : ['center', 'center', 'scene']
								},
								30
							],
							[
								{
									size : [200,400],
									position : ['center', 'center', 'scene']
								},
								35
							],
							[
								{
									rotate : 180
								},
								40
							],
							[
								{
									position : ['center', 'center', 'scene'],
									size : 'scene'
								},
								45
							],
							[
								{
									size : 'window',
									position : ['center', 'center', 'window']
								},
								50
							],
							[
								{
									position : ['right', 'center', 'scene']
								},
								55
							],
							[
								{
									position : ['left', 'center', 'scene']
								},
								60
							]
						]
					}
				]
			}
		}


	});

});