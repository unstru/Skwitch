define('app/configs',[
], function(r) {

	return function() {
    return {
      initState : 0.2,
      fps : function() {
        if (this.get('isMobile')) {
          return 30;
        } else {
          return 120;
        }
      },
      fDelta : function() {
        if (this.get('isIpad')) {
          return 1.1;
        } else if (this.get('isMobile')){
          return 1.5;
        } else {
          return 1.2;
        }
      },
      interactionName : !!('ontouchstart' in window) ? 'touch' : 'scroll',
      isIpad : function() {
        return navigator.userAgent.match(/iPad/i) !== null;
      },
      IEVersion : function() {
        var rv = -1; // Return value assumes failure.
        if (navigator.appName == 'Microsoft Internet Explorer') {
          var ua = navigator.userAgent,
          re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
          if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
        }
        return rv;
      },
      isIE : function() {
        return this.get('IEVersion') !== -1;
      },
      isMobile : (/iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(navigator.userAgent.toLowerCase())),
      isTablet : (/ipad|android 3|sch-i800|playbook|tablet|kindle|gt-p1000|sgh-t849|shw-m180s|a510|a511|a100|dell streak|silk/i.test(navigator.userAgent.toLowerCase())),
      device : function() {
        return (this.get('isTablet')) ? "tablet" : this.get('isMobile') ? "mobile" : "desktop";
      },
      cufoniseFor : [],//['Linux', 'UNIX'],
      buildSecurity : function() {
        if (this.get('isIpad')) {
          return 20;
        } else {
          return 200;
        }
      },
      isTouch : window.isTouch,
      doDestroyScenes : function() {
        return this.get('isIpad');
      },
      os : (function() {
        var OSName="Unknown OS";
        if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
        if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
        if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
        if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
        return OSName;
      })(),
      isToCufonise : function() {
      },
      minFDelta : 1.01,
      maxFDelta : 1.1,
      totalDuration : 450,
      elHeight : 43000/2,
      maxFinalStatesDelta : 0.01,
      scrollFactor : 10,
      intervalBeforeInteractionEnd : 500,
      interval : function() {
        return (1000 / this.get('fps'));
      }
    };
  };

});
