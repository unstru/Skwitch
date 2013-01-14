// This is ugly, please add /* to AMD !

define('Skwitch/Animation/frameAttributes/all', [
	'./DisplayAttribute',
	'./OpacityAttribute',
	'./PositionAttribute',
	'./RotateAttribute',
	'./ScrollAttribute',
	'./SizeAttribute',
	'./SpriteStateAttribute',
	'./ColorAttribute'
], function(DisplayAttribute, OpacityAttribute, PositionAttribute, RotateAttribute, ScrollAttribute, SizeAttribute, SpriteStateAttribute, ColorAttribute) {

	return{
		DisplayAttribute : DisplayAttribute,
		OpacityAttribute : OpacityAttribute,
		PositionAttribute : PositionAttribute,
		RotateAttribute : RotateAttribute,
		ScrollAttribute : ScrollAttribute,
		SizeAttribute : SizeAttribute,
		SpriteStateAttribute : SpriteStateAttribute,
		ColorAttribute : ColorAttribute
	};

});