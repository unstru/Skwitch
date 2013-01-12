define('app/animations/Scene1', [
	'Skwitch/Animation/Animation',
	'toDOM',
	'objects/is'
], function(Animation, toDOM, is) {

	return Animation.extend({

		'+options' : {
			start : 0,
			end : 430,
			sequencesInit : function() {
				return [
					{
						type : 'domDesc',
						name : 'hello',
						domDesc : {
							className : 'sequence',
							style : {
								zIndex : 1
							},
							children : [
								{
									tag : 'h1',
									innerHTML : 'HELLO !'
								}
							]
						},
						className : 'sequence',
						framesInit : [
							[
								{
									position : [10, 210, 'window'],
									size : [400,360],
									color : '#ffffff'
								},
								0
							],
							[
								{
									color : [0,0,0]
								},
								10
							],
							[
								{},
								60
							],
							[
								{
									opacity : 0
								},
								70
							],
							[
								{
									display : false
								},
								71
							]
						],
					},
					{
						type : 'domDesc',
						name : 'welcome_to',
						domDesc : {
							className : 'sequence', 
							children : [
								{
									tag : 'h2',
									innerHTML : 'WELCOME TO <br/> SKWITCH'
								}
							],
							style : {
								zIndex : 1
							}
						},
						framesInit : [
							[	
								{
									color : '#ffffff',
									position : [10,360,'window'],
									size : [475,75],
									opacity : 1,
									display : true
								},
								0
							],
							[
								{
								},
								60
							],
							[
								{
									opacity : 0
								},
								70
							],
							[
								{
									display : false
								},
								71
							]
						]
					},
					{
						type : 'domDesc',
						name : 'square1',
						domDesc : {
							style : {
								backgroundColor : '#000'
							},
							className : 'sequence'
						},
						framesInit : [
							[
								{
									position : [0, 200, 'window'],
									size : [310, 110],
									rotate : 0,
									opacity : 1
								},
								0
							],
							[
								{
									position : [0, 345, 'window'],
									size : [467,132]
								},
								20
							],
							[
								{},
								60
							],
							[
								{
									position : ['center', 0, 'window'],
									size : [180,45]
								},
								70
							]
						]
					},
					(this.square2Init = {
						type : 'domDesc',
						name : 'square2',
						domDesc : {
							style : {
								backgroundColor : '#000'
							},
							className : 'sequence square_2'
						},
						framesInit : [
							[
								{
									position : ['center', 0, 'window'],
									size : [180,45],
									display : false
								},
								0
							],
							[
								{
									display : true
								},
								79
							],
							[
								{
									position : [0, 'center', 'window'],
									size : [300,300]
								},
								90
							]
						]
					})
				]
			}
		},

		'+init' : function() {
			this.buildAppStateEl();
			this.initEvents();
		},

		buildAppStateEl : function() {
			this.appStateEl = toDOM({
				className : 'state',
				style : {
					display : 'none'
				}
			});
			this.parentEl.appendChild(this.appStateEl);
			this._a.timeline.on('tick', function(state) {
				this.appStateEl.innerHTML = state;
			}.bind(this), this);
		},

		initEvents : function() {
			var toString = function(o) {
				var s = '{<br/>', value, valueToString;
				for (var i in o) if (o.hasOwnProperty(i)) {
					value = o[i];
					if (is('array', value)) {
						valueToString = '[' + value + ']';
					} else {
						valueToString = '' + value;
					}
					s += i + ' : ' + valueToString + ',<br/>'
				}
				s += '}';
				return s;
			};
			var square2 = this.sequence.square2;
			this.between(88, 90, {
				enter : function() {
					square2.el.innerHTML = toString(this.square2Init.framesInit[2][0])
				}.bind(this)
			});
			this.between(65, 200, {
				enter : function() {
					this.appStateEl.style.display = 'block';
				}.bind(this)
			});
		}

	});

});