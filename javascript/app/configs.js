define('app/configs',[
], function(r) {

	return function() {
    return {
      // Timeline config 
      initState : 90,
      fps : function() {
        if (this.get('isMobile')) {
          return 30;
        } else if (this.get('isTablet')) {
          return 80;
        } else  {
          return 80;
        }
      },
      fDelta : function() {
        if (this.get('isTablet')) {
          return 1.2;
        } else if (this.get('isMobile')){
          return 1.5;
        } else {
          return 1.05;
        }
      },
      minFDelta : 1.01,
      maxFDelta : 1.1,
      maxFinalStatesDelta : 0.01,
      totalDuration : 170,
      elHeight : 43000/2,
      scrollFactor : 60,
      interactionName : !!('ontouchstart' in window) ? 'touch' : 'scroll',
      device : function() {
        return (this.get('isTablet')) ? "tablet" : this.get('isMobile') ? "mobile" : "desktop";
      },
      // These detections should not be here
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
      isIpad : function() {
        return navigator.userAgent.match(/iPad/i) !== null;
      },
      interval : function() {
        return ();
      }
    };
  };

});
