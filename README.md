## Welcome to Skwitch

Skwitch is a javascript library to do timeline based animations.

The timeline is linked with the scroll of your navigator and is mobile and tablet compatible, so you can do Parallax™ websites everywhere !

See it in action : [demo](http://cagosta.github.com/Skwitch/)

It's a work in progress but was already used in production.  
I would be glad to have feedback and help you using it, feel free to contact me !  

### Install

Because of the heavy-javascript nature of Skwitch, I advise you to clone this repo-demo and see it in action instead of including it in your project :

```bash
git clone -b master git@github.com:cagosta/Skwitch.git  
cd Skwitch
git submodule init && git submodule update
```

It is then provided as [AMD modules](requirejs.org)

### Abstract

Skwitch flavour timeline and interpolations to do heavy animated websites.  
It is divided into 2 main modules : Skwitch/Timeline and Skwitch/Animation.  

#### Skwitch/Timeline
The timeline was developped to solve the lack of window.onscroll triggers on iPad/iPhone safari. It could be separated from Skwitch/Animation.  
It triggers a 'tick' event on interaction ( such as scroll or touch ) much more time than window.onscroll, with a smooth effect.  
It also provide 'magnets', wich are the key instants of your application wich are targeted by default on click or whenever you want.  
You can find the current app magnets definitions in `Skwitch/Timeline/magnets/magnets` ( javascript/modules/Skwitch/Timeline/magnets/magnets)

Many configurations are available for optimisation, see app/configs.js  

Exemple code : 

```javascript
this.timeline.on('tick', function(appState) {
	// appState is similar to window.body.scrollTop 
	// update anything you want fluid, smooth and touch-compatible with appState
});
``` 

#### Skwitch/Animation  

Skwitch/Animation will allow two easily build animations thanks to keywords, keyframes and interpolations.  
It subscribes to Skwitch/Timeline and thanks to keyframes animate your views.  
Although it currently depends on Skwitch/Timeline, it could be used just to do animations thank's to a whatever triggers 'tick', state. ( to do ? ).  

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

Will create a div element that, from the instant 0 to the instant 10 ( appState ) : 
- goes from the left of your navigator to the right  ( 'hidden' left, 'hidden' right )  
- change width and height from 100/100 to the size of the window  
- change color from black to white

For the ScrollableSequence, see it in action in the current demo-repo ( app/sequences/ScrollableSequence and app/animations/Parralax )


### Dependencies

I advise you before starting to take a look at [Seed.js](https://github.com/piercus/Seed) which is quite simple and provide 'Elegant inheritance, attributes and events, both for client-side and server-side JavaScript.'  

Skwitch is provided as AMD modules, [require.js](requirejs.org) is included.  


Also, you might want to see [toDOM](https://github.com/cagosta/toDOM) which is not needed but recommended to build DOM elements.  
If toDOM do not interest you, you can also build your elements with `<html>` and insert it into animations.  
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
Or better, you could create a JSequence that inherits from Skwitch/Animation/Sequence that handle $el where you could put your view related logic. 


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

As a summary, if you want to create a new interpolation / attribute : 
* create another Skwitch/Animation/framesAttributes/[AttributeName]Attribute that inherits from Skwitch/Animation/FrameAttribute  
* add it into Skwitch/Animation/framesAttributes/all  
* create another Sequence or update Animation/Sequence with you _render[AttributeName] function

I created app/sequences/ScrollableSequence as an exemple.  

Also, do not forget to create a 'equal' function in [AttributeName]Attribute if attribute comparaison cannot be handle by native === ( like Array ). This will help avoid unnecessary DOM updates.  


### Class descriptions  

( Work in progress )

Animation/Animation  
An animation has notion of time and manipulate it.  
- build the sequences  
- subscribe to Skwitch/Timeline   
- become a timeline that trigger a tick, wich is just appState - this.start  

Animation inherits from sequence and can have a element, which can help you put animations into animations. ( although it is not stable and yet recommended )

Animation/Sequence  

- build the keyframes  
- build the current frame which can be interpolation of keyframes  
- is a view  
- render the attributes when needed

Animation/Frame  
A frame is a representation at an instant t of the state of an object.    
It :
- build the frame attributes
- has as many attributes as needed in the animation  
- instanciate FrameAttribute

Animation/FrameAttribute  
It is where the logic of interpolation and keywords helpers is.
It's an abstract class, each attribute should inherit of it.
It : 
- format the frameAttribute init  
- define what means to be between A and B.


### Limitations
* Opacity for IE<=8 ( because of CCS3, be careful and think about animations with no opacity change if you want IE<=8 )
* Canvas ( because of the design of Sequence to work with DOM, canvas can work but is not optimised. )

Also,
* Be careful if you work with other libraries that augment native prototypes like [Array](https://github.com/cagosta/Array)



### To Do

* Comment the whole code
* Doc
* Compile sources
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