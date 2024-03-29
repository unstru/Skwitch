define('app/sequences/ScrollableSequence', [
	'Skwitch/Animation/Sequence',
	'toDOM'
], function(Sequence, toDOM) {

	return Sequence.extend({

		'+options' : {
			paragraphEl : null
		},

		'+init' : function(o) {
			this.paragraphContainer.appendChild(this.paragraphEl)
			this.detectHeight();
		},

		buildEl : function() {
			this.el =  toDOM({
				className : 'scrollable_sequence viewport sequence',
				style : {
					overflow : 'hidden',
					height : this.viewportHeight
				},
				children : [
					{
						className : 'paragraph_container',
						label : 'paragraphContainer',
						style : {
							position : 'absolute'
						}
					}
				]
			}, this);
		},

		detectHeight : function() {
			this.setViewportHeight();
			var pHeight = this.paragraphEl.offsetHeight;
			if (pHeight && pHeight < this.viewportHeight) {
				this.paragraphEl.offsetHeight = this.viewportHeight;
				pHeight = this.viewportHeight;
			}
			this.paragraphHeight = pHeight;
		},

		_renderScroll : function(scrollState) {
			this.setViewportHeight();
			var margin = (this.paragraphHeight - this.viewportHeight) * scrollState;
			if (margin)
				this.paragraphContainer.style.marginTop = - margin + 'px';
		},

		setViewportHeight : function() {
			this.viewportHeight = this.currentFrame.attribute.size.getValue()[1];
		}

	});

});