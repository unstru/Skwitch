define('app/animations/Parallax', [
	'Skwitch/Animation/Animation',
	'toDOM',
	'app/sequences/ScrollableSequence'
], function(Animation, toDOM, ScrollableSequence) {

	return Animation.extend({

		'+options' : {
			start : 75,
			end : 150,
			elements : 150
		},

		'+init' : function() {
			// this.changeFDeltaDuringParallax();
		},

		changeFDeltaDuringParallax : function() {
			this.between(10,30, {
				enter : function() {

				}.bind(this)
			});
		},

		buildSequencesInit : function() {
			var sequencesInit = [];
			for (var i = 0; i < this.elements; i++) {
				sequencesInit.push(this.buildSequenceInit(i));
			}
			sequencesInit.push(this.buildScrollSequenceInit());
			return sequencesInit;
		},

		buildScrollSequenceInit : function() {
			return {
				type : 'cstr',
				cstr : ScrollableSequence,
				paragraphEl : toDOM({
					className : 'sequence parallax',
					children : [
						{
							tag : 'h1',
							innerHTML : 'PARALLAX!'
						},
						{
							tag : 'h1',
							innerHTML : 'MAXIMUM WOW!'
						}
					]
				}),
				framesInit : [
					[
						{
							size : [600,70],
							position : [['center+250', 'scene'], ['bottom', 'window']],
							opacity : 0,
							scroll : 0
						},
						0
					],
					[
						{
							opacity : 1,
							position : ['unchanged', ['center', 'scene']]
						},
						10
					],
					[
						{
						},
						15
					],
					[
						{
							scroll : 0.5
						},
						20
					],
					[
						{
						},
						25
					],
					[
						{
							scroll : 1
						},
						30
					],
					[
						{

						},
						65
					],
					[
						{
							opacity : 0
						},
						70
					]
				]
			}
		},

		buildSequenceInit : function(i) {
			var rand = Math.random,
					size = [10,10].multiply(Math.round(rand() * 10)).add(10),
					duration = 10 * rand() + 5, // 5 -> 35
					start = rand() * (this.end - this.start),
					end = start + duration;
					position = this._a.rect.window.getValue()[1].multiply(rand()).minus(size.divide(2)),
					positionX = position[0],
					doRotate  = (start > 30),
					rotation = 720 * rand() - 360;
			return {
				type : 'domDesc',
				domDesc : {
					className : 'sequence',
					style : {
						backgroundColor : '#000'
					}
				},
				framesInit : [
					[
						{
							position : [positionX, 'bottom', 'window'],
							size : size,
							rotate : 0
						},
						start
					],
					[
						{
							position : ['unchanged', 'top-100', 'window'],
							rotate : (doRotate ? rotation : 0)
						},
						end
					]
				]
			}
		}


	});

});