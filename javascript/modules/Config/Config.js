define('Config/Config', [
  'Seed/Seed'
], function(Seed) {

  return Seed.extend({

    '+options' : {
      values : null
    },

    '+init' : function() {
      this.bindAllFunctionValues();
      this.initValues = {};
      for (var i in this.values) {
        if (this.values.hasOwnProperty(i)) {
          if (typeof this.values[i] === 'function') {
            this.initValues[i] = this.values[i]();
          } else {
            this.initValues[i] = this.values[i];
          }
        }
      }
    },

    getInit : function(name) {
      return this.initValues[name];
    },

    bindAllFunctionValues : function() {
      for (var i in this.values) if (this.values.hasOwnProperty(i)) {
        if (typeof this.values[i] === 'function') {
          this.values[i] = this.values[i].bind(this);
        }
      }
    },

    reset : function(key) {
      this.values[key] = this.initValues[key];
    },

    set : function(key, value) {
      this.values[key] = value;
    },

    get : function(name, o) {
      if (!o || !o.current) {
        return this.initValues[name];
      }
      return typeof this.values[name] === 'function' ? this.values[name]() : this.values[name];
    }

  });

});