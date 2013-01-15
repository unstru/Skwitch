## Welcome to Skwitch

Skwitch is a javascript library to do timeline based animations.

The timeline is linked with the scroll of your navigator and is mobile and tablet compatible, so you can do Parallax™ websites everywhere !

**[Demo](http://cagosta.github.com/Skwitch/)**

### Install

```bash
git clone -b master git@github.com:cagosta/Skwitch.git  
cd Skwitch
git submodule init && git submodule update
```

### Get started

* Clone this repo, as seen above 
* Open your browser ..
* Play with javascript/app/animations/Scene1.js  
* Play with configs in javascript/app/configs.js
* See javascript/app/Main.js 
* Play with javascript/app/animations/Parallax.js
* Read below  

It's a work in progress, but was already used in production.  
I would be glad to have feedbacks and help you using it, feel free to contact me !  


### Abstract

It is divided into 2 main modules : Skwitch/Timeline and Skwitch/Animation.  

#### Skwitch/Animation  

Skwitch/Animation will allow two easily build animations thanks to keywords, keyframes and interpolations.  
It subscribes to Skwitch/Timeline (see below) and thanks to 'keyframes' animate your views.  

Exemple code :  

```javascript

var myAnim = Animation.extend({
	
	'+options' : {
		start : 0,
		end : 10,
		sequencesInit :	[
			{
				domDesc : { // see https://github.com/cagosta/toDOM
					className : 'sequence'
				},
				framesInit : [
					[
						{
							position : ['left','center', 'window'],
							size : [100,100],
							color : '#00000'
						},
						0
					],
					[
						{
							position : ['right', 'center', 'window'],
							size : ['window'],
							color : '#ffffff'
						},
						10
					]
				],
			},
			{
				cstr : ScrollableSequence,
				paragraphEl : toDOM({
					innerHTML : 'A very long text..'
				}),
				framesInit : [
					[
						{
							scroll : 0,
							position : [[0, 'scene'], [0, 'window']],
							size : [100,10]
						},
						5
					],
					[
						{
							scroll : 1
						},
						10
					]
				]
			}
		]
	}

});

```

Will create a div element that, from the instant 0 to the instant 10 : 
- goes from the left of your navigator to the right  ( 'hidden' left, 'hidden' right )  
- change width and height from 100/100 to the size of the window  
- change color from black to white


For the ScrollableSequence, see it in action in the current demo repo ( app/sequences/ScrollableSequence and app/animations/Parralax )

Although it currently depends on Skwitch/Timeline, Skwitch/Animation could be used just to do animations thanks to a whatever triggers 'tick', state. 


#### Skwitch/Timeline
The timeline was developped to solve the lack of window.onscroll triggers on iPad/iPhone safari. It could be separated from Skwitch/Animation.  
It triggers a 'tick' event on interaction ( such as scroll or touch ) much more time than window.onscroll, with a smooth effect.  

Many configurations are available for optimisation, see javascript/app/configs.js   
Exemple config :   
* Timeline total duration ( wich is abstracted )
* Frame per second

##### Magnets
It also provides 'magnets', wich are the key instants of your application, targeted by default on click or whenever you want.  
You can find the current app magnets definitions in `Skwitch/Timeline/magnets/magnets` ( javascript/modules/Skwitch/Timeline/magnets/magnets)


Exemple code : 

```javascript
this.timeline.on('tick', function(appState) {
	// appState is similar to window.body.scrollTop 
	// update anything you want fluid, smooth and touch-compatible with appState
});
``` 

### Dependencies

I advise you before starting to take a look at [Seed.js](https://github.com/piercus/Seed) which is quite simple and provide 'Elegant inheritance, attributes and events, both for client-side and server-side JavaScript.'  

Skwitch is provided as AMD modules, [require.js](requirejs.org) is included.  

#### toDOM and SEO
Also, you might want to see [toDOM](https://github.com/cagosta/toDOM) which is not needed but recommended to build DOM elements.  
If toDOM do not interest you, because you do not like it or you want to be SEO-friendly, you can also build your elements with `<html>` into your .html and insert it into your animations.  

For instance if we take the code above :

```javascript
...
{
	'+options' : {
		sequencesInit : [
			{
				el : $('#my_div')[0],
				framesInit : [
					...
				]
			}
		]
	}
}
...

```
Or better, you could create a JSequence that inherits from Skwitch/Animation/Sequence that handle $el and where you could put your view-related logic. 


### Custom interpolations and keywords.

The currently supported interpolations are :  
* color  
* position
* rotation
* size  
* display ( true/false for 'none/block')

The logic that defines what means to be between attribute A and a attribute B is into `javascript/modules/Skwitch/Animation/frameAttributes`.
What define how to render an attribute is in Animation/Sequence.  

If you want to render an attribute ( size, position .. ) differently, you could just update Animation/Sequence or inherit from it and write your own _renderSize or _renderPosition method.

As a summary, if you want to create a new interpolations / attributes : 
* create another Skwitch/Animation/framesAttributes/[AttributeName]Attribute that inherits from Skwitch/Animation/FrameAttribute  
* add it into Skwitch/Animation/framesAttributes/all  
* create another Sequence or update Animation/Sequence with you _render[AttributeName] function

I created app/sequences/ScrollableSequence as an exemple.  

Also, do not forget to create a 'equal' function in [AttributeName]Attribute if attribute comparaison cannot be handle by native === ( like Array ). This will help avoid unnecessary DOM updates.  



### Limitations
* Opacity for IE<=8 ( because of CCS3, be careful and think about animations with no opacity change if you want IE<=8 )
* Canvas ( because of the design of Sequence to work with DOM, canvas can work but is not optimised. )

Also,
* Be careful if you work with other libraries that augment native prototypes like [Array](https://github.com/cagosta/Array)

### Class description
[ Work in progress in the wiki ](https://github.com/cagosta/Skwitch/wiki)


### To Do

* Comment the whole code
* Doc
* Provide a easy-to use Timeline
* Separate Skwitch/Animation and Skiwtch/Timeline  ?? ( Try with tween.js )
* Do better Timeline.tweener
* Separate Animation/Frame between Animation/KeyFrame and Animation/InterpolatedFrame that causes some ugly parts is Sequence
* Do 'rightNotHidden' and 'bottomNotHidden' ( reverse [0,'window']) attributes
* Do a CanvasSequence 
* Do a SVGSequence
* Think and implement BezierCurve for position
* Think about a better way of defining how to render attribute than _render[AttributeName]
* Update Geo/Point with the soon coming new version


### Why ? 

Another scrolling library ?
Some reasons :  
* touch device support
* total control for optimisation  
* avoid callbacks spaghettis
* javascript-only  
* exercise 


### Author 

* [Cyril Agosta](http://github.com/cagosta)  ( Hire me !)

And for the modules under ( Seed, Geo .. )
* [Pierre Cole](http://github.com/piercus)  
* [Sam Ton That](http://github.com/KspR)

### Licence  

MIT, see LICENCE.txt