define('detect/detect',[
	'Config/Config'
], function(Config) {

	var values = function() {
		return {
	    device : function() {
	      return (this.get('isTablet')) ? "tablet" : this.get('isMobile') ? "mobile" : "desktop";
	    },
	    IEVersion : function() {
	      var rv = false; // Return value assumes failure.
	      if (navigator.appName == 'Microsoft Internet Explorer') {
	        var ua = navigator.userAgent,
	        re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	        if (re.exec(ua) != null)
	          rv = parseFloat( RegExp.$1 );
	      }
	      return rv;
	    },
	    isIE : function() {
	      return !!this.get('IEVersion');
	    },
	    isMobile : (/iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(navigator.userAgent.toLowerCase())),
	    isTablet : (/ipad|android 3|sch-i800|playbook|tablet|kindle|gt-p1000|sgh-t849|shw-m180s|a510|a511|a100|dell streak|silk/i.test(navigator.userAgent.toLowerCase())),
	    isIpad : function() {
	      return navigator.userAgent.match(/iPad/i) !== null;
	    }
	  };
	};

  var conf = new Config({
  	values : values()
  });
  // to do
  return conf.get.bind(conf);

});