define('Skwitch/Timeline/interactions/all', [
	'./ScrollInteraction',
	'./TouchInteraction'
], function( ScrollInteraction, TouchInteraction) {

	return {
		ScrollInteraction : ScrollInteraction,
		TouchInteraction : TouchInteraction
	};

});