define('app/animations/Scene1', [
	'Skwitch/Animation/Animation',
	'toDOM',
	'objects/is'
], function(Animation, toDOM, is) {

	return Animation.extend({

		'+options' : {
			start : 0,
			end : 430,
			keyInstant : {
				
			},
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
								5
							],
							[
								{
								},
								20
							],
							[
								{
									display : false
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
						name : 'play',
						domDesc : {
							className : 'sequence',
							style : {
								zIndex : 1
							},
							children : [
								{
									tag : 'h1',
									innerHTML : 'LET\'S PLAY'
								}
							]
						},
						className : 'sequence',
						framesInit : [
							[
								{
									position : [10, 210, 'window'],
									size : [600,70],
									opacity : 0,
									rotate : 0,
									color : '#ffffff'
								},
								0
							],
							[
								{
								},
								10
							],
							[
								{
									opacity : 1
								},
								20
							],
							[
								{
								},
								30
							],
							[
								{
									position : [['center','scene'],'center','scene' ],
									rotate : 30
								},
								40
							],
							[
								{},
								50
							],
							[
								{
									rotate : 0,
									position : ['center+250', 'center', 'scene']
								},
								55
							],
							[
								{
									color : [0,255,255]
								},
								60
							],
							[
								{
									color : [255,0,0]
								},
								65
							],
							[
								{
									color : [255,255,0]
								},
								75
							],
							[
								{
									color : '#ffffff',
									position : ['unchanged', 'top','scene']
								},
								85
							]
						]
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
								{},
								10
							],
							[
								{
									opacity : 0
								},
								20
							],
							[
								{
									display : false
								},
								30
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
								5
							],
							[
								{},
								10
							],
							[
								{
									position : [0,0,'window'],
									size : ['window']
								},
								20
							],
							[
								{
									position : [-300,0,'window']
								},
								25
							],
							[
								{
									position : [0,0,'window']
								},
								30
							],
							[
								{
									position : ['center', 'center', 'window'],
									size : ['scene']
								},
								40
							],
							[
								{},
								50
							],
							[
								{
									position : ['center+150', 'center+10', 'scene'],
									size : [440,80]
								},
								55
							],
							[
								{
								},
								60
							],
							[
								{

								},
								65
							],
							[
								{
									position : ['center','center'],
									size : ['window']
								},
								75
							],
							[
								{
									position : ['center','top','window']
								},
								85
							]
						]
					}
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
				this.appStateEl.innerHTML = Math.round(state*100)/100;
			}.bind(this), this);
		},

		initEvents : function() {
			this.between(0, 200, {
				enter : function() {
					console.log('enter 65-200');
					this.appStateEl.style.display = 'block';
				}.bind(this),
				out : function() {
					console.log('out 65-200');
					this.appStateEl.style.display = 'none';
				}.bind(this),
				during : function(r, state) {
					//console.log('between 65-200',r);
				}
			});
		}

	});

});