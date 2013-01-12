define('app/animations/DocAnimation', [
	'Skwitch/Animation/Animation',
	'toDOM',
	'app/sequences/ScrollableSequence',
	'objects/extend'
], function(Animation, toDOM, ScrollSequence, extend) {

	return Animation.extend({

		'+options' : {
			start : 15, 
			end : 100,
			paragraphs : [
				{
					innerHTML : [
						'Skwitch is a javascript library//',
						'to do timeline based animations'
					],
					tag : 'h3'
				},
				{
					innerHTML : [
						'Let\' see what it can do ..'
					],
					tag : 'h3'
				},
				{
					innerHTML : [
						"Let\'s display the current app state"
					]
				},
				{
					innerHTML : [
						'And play with another square'
					]
				}
			]
		},

		buildSequencesInit : function() {
			return this.paragraphs.map(this.buildParagraphSequenceInit.bind(this));
		},

		buildParagraphSequenceInit : function(p, i) {
			var o = this.paragraphs[i];
			o = extend({
				tag : 'h3',
				className : 'baseline'
			}, o);
			var pInnerHTML = '<' + o.tag + '>' + o.innerHTML.join('').split('//').join('<br/>') + '</' + o.tag + '>',
					width = 500,
					position = ['right-' + width , 200, 'scene'],
					viewPortHeight  = 250,
					size = [width, viewPortHeight],
					appearDuration = 5,
					displayDuration = 20,
					appearStart = i * displayDuration,
					appearEnd = (i +1) * displayDuration,
					scrollStart = appearStart + appearDuration,
					scrollEnd = appearEnd - appearDuration;
			return {
				type : 'cstr',
				cstr : ScrollSequence,
				parentEl : this.parentEl,
				paragraphEl : toDOM({
					className : o.className,
					innerHTML : pInnerHTML
				}),
				framesInit : [
					[
						{
							position : position,
							size : size,
							scroll : 0,
							opacity : 0
						},
						appearStart
					],
					[
						{
							opacity : 1
						},
						scrollStart
					],
					[
						{
							scroll : 1
						},
						scrollEnd
					],
					[
						{
							opacity : 0
						},
						appearEnd
					]
				]
			}
		}

	});

});