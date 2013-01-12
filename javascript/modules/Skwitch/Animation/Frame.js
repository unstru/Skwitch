define('animation/Frame', [
	'Seed/Seed',
	'./frameAttributes/all'
	], function(Seed, frameAttributes) {

	return Seed.extend({

		'+options' : {
			unformattedAttributesInit : null,
			attributesName : [],
			previousFrame : null,
			sequenceName : null,
			instant : null,
			betweenIndexes : null,
			index : null,
			between : null,
			r : null
		},

		isFrame : true,

		'+init' : function() {
			if (this.attributesName.has('size')) {
				this.attributesName.removeOneValue('size');
				this.attributesName.unshift('size');
			}
			if (this.unformattedAttributesInit) {
				this.formatedAttributeInit =  this.formatAttributesInit(this.unformattedAttributesInit);
				this.attribute = {};
				this.attributesName.each(function(attrName) {
					this.attribute[attrName] = this.buildAttribute(attrName);
				}.bind(this));
			} else if (this.between) {
				this.buildFromBetweens();
			}
		},


		isBetween : function(frames) {
			if (!this.between) {
				return false;
			}
			return this.between.equals(frames);
		},

		buildFromBetweens : function() {
			this.attribute = {};
			this.formatedAttributeInit = {};
			this.attributesName.each(function(attrName) {
				this.formatedAttributeInit[attrName] = {
					between : this.between.map(function(frame) { return frame.getValue(attrName);}),
					r : this.r
				};
				this.attribute[attrName] = this.buildAttribute(attrName);
			}.bind(this));
		},


		getValue : function(attrName) {
			return this.attribute[attrName].getValue();
		},

		getValues : function() {
			var r = {};
			this.attributesName.map(function(attrName) {
				r[attrName] = this.attribute[attrName].getValue();
			}.bind(this));
			return r;
		},

		update : function() {
			if (this.between) {
				this.buildFromBetweens();
			}
		},

		setValuesBetween : function(r) {
			this.attributesName.each(function(attrName) {
				this.attribute[attrName].setValueBetween(r);
			}.bind(this));
		},

		buildAttribute : function(attrName) {
			var cstr = frameAttributes[attrName.capitalize() + 'Attribute'];
			if (!cstr) {
				console.log('[debug] no constructor for ', attrName, 'attribute.');
			}
			return this.sub(frameAttributes[attrName.capitalize() + 'Attribute'], {
				name : attrName,
				unformatted : this.formatedAttributeInit[attrName],
				sequenceName : this.sequenceName,
				frame : this
			});
		},

		formatAttributesInit : function() {
			var formatted = {},
					unformatted = this.unformattedAttributesInit;
			this.attributesName.each(function(attrName) {
				if (!(attrName in unformatted)) {
					if (this.previousFrame) {
						formatted[attrName] = this.previousFrame.getValue(attrName);
					} else {
						if (attrName === 'display') { // temporary
							formatted.display = true;
						} else if (attrName === 'size') {
							formatted.size = [1,1];
						} else {
							// console.log('defaut, what ? ');
						}
					}
				} else {
					formatted[attrName] = unformatted[attrName];
				}
			}.bind(this));
			return formatted;
		} // overide me

	});

});