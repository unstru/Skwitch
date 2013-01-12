define('animation/FrameAttribute', [
	'Seed/Seed'
], function(Seed) {

	return Seed.extend({

		'+options' : {
			unformatted : null,
			name : null,
			sequenceName : null,
			frame : null,
			betweenValues : null
		},

		'+init' : function() {
			if (this.unformatted !== null) {
				if (this.unformatted.between) {
					var between = this.unformatted.between,
							r = this.unformatted.r;
					this.betweenValues = between;
					this.value = this.between(between[0], between[1], r);
				} else if (this.format){
					this.value = this.format(this.unformatted);
				} else {
					this.value = this.unformatted;
				}
			}
		},

		setValueBetween : function(r) {
			if (this.betweenValues) {
				this.value = this.between(this.betweenValues[0], this.betweenValues[1],r);
			}
			return this.value;
		},

		getValue : function() {
			return this.value;
		}

	});

});