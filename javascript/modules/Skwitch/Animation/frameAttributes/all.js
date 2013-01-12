// This is ugly, please add /* to AMD !

define('Skwitch/Animation/frameAttributes/all', [
	'./DisplayAttribute',
	'./OpacityAttribute',
	'./PositionAttribute',
	'./RotateAttribute',
	'./ScrollAttribute',
	'./SizeAttribute',
	'SpriteStateAttribute'
], function(DisplayAttribute, OpacityAttribute, PositionAttribute, RotateAttribute, ScrollAttribute, SizeAttribute, SpriteStateAttribute) {

	return{
		DisplayAttribute : DisplayAttribute,
		OpacityAttribute : OpacityAttribute,
		PositionAttribute : PositionAttribute,
		RotateAttribute : RotateAttribute,
		ScrollAttribute : ScrollAttribute,
		SizeAttribute : SizeAttribute,
		SpriteStateAttribute : SpriteStateAttribute
	};

});