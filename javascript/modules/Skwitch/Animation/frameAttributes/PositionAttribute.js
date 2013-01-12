define('Skwitch/Animation/frameAttributes/PositionAttribute', [
	'../FrameAttribute',
	'Geo/refs',
	'Geo/D2Point',
	'Geo/Coordinate',
  'objects/is'
], function(FrameAttribute, refs, Point, Coordinate, is) {

	return FrameAttribute.extend({
		
		format : function(unformatted) {
			var formatted;
			if (is('point', unformatted)) {
				formatted = unformatted;
			} else if (is('array', unformatted)) {
        formatted = this.arrayToPoint(unformatted);
			} else if (is('string', unformatted)) {
        if (unformatted === 'fromName') {
          formatted = this.getFromName();
        }
      }
			return formatted;
		},

    equals : function(value) {
      var r = this.getValue().equals(value);
      return r;
    },

    between : function(c0, c1, r) {
      c0 = c0.inRef('window'),
      c1 = c1.inRef('window');
      var c = c0.add(c1.minus(c0).multiply(r));
      return c;
    },


		arrayToPoint : function(unformattedPointInit) {
      var pointInit = [],
          defaultRef = 'scene';
      [0,1].each(function(i) {
        var unformattedCoordInit = unformattedPointInit[i],
            numberOrKeyword,
            ref;
        if (is('array', unformattedCoordInit)) {
          //case  [[left,window],[center,scene]]
          numberOrKeyword = unformattedCoordInit[0];
          ref = unformattedCoordInit[1] || defaultRef ;
        } else if (is('number', unformattedCoordInit)){
          // case '[0,0,window]'
          numberOrKeyword = unformattedCoordInit;
          ref = unformattedPointInit[2] || defaultRef;
        } else if (is('string', unformattedCoordInit)) { // case 'unchanged'
          numberOrKeyword = unformattedCoordInit;
          ref = unformattedPointInit[2] || defaultRef;
        }
        //console.log('number or keyword', numberOrKeyword);
        pointInit[i] = this.numberOrKeywordToCoordinate(numberOrKeyword, ref, i); //change me
      }.bind(this));
      return (new Point(pointInit[0], pointInit[1]));
		},


    numberOrKeywordToCoordinate : function(numberOrKeyword, ref, i) {
      var isKeyword = is('string', numberOrKeyword);
      if (isKeyword) {
				var keyword = numberOrKeyword;
        return this.keywordToCoordinate(keyword, ref, i);
      } else if (is('number', numberOrKeyword)){
				var number = numberOrKeyword;
        return (new Coordinate(number,ref, i));
      }
    },

		keywordToCoordinate : function(keyword, ref, i) {
			var sPlus = keyword.split('+'),
          sMinus = keyword.split('-'),
          plus = parseInt(sPlus[1]),
          minus = parseInt(sMinus[1]);
      if (sPlus.length > 1) {
        keyword = sPlus[0];
      }
      if (sMinus.length > 1) {
        keyword = sMinus[0];
      }
      var alias = {
        top : 'left',
        bottom : 'right'
      };
      if (alias[keyword]) {
        keyword = alias[keyword];
      }
      var coordinate = this['_from'+ keyword.capitalize()+'ToCoord'](ref, i);
      if (minus) {
        return coordinate.minus(minus);
      }
      if (plus) {
        return coordinate.add(plus);
      }
      return coordinate;
		},

   _fromUnchangedToCoord : function(ref, i) {
      return (this.frame.previousFrame.getValue('position').toArray(i));
      // return (this.points[this.points.length - 1].toArray(i));
    },

    _fromLeftToCoord : function(ref, i) {
      return (new Coordinate(0,'window',i)).minus(this.frame.getValue('size')[i]);
    },

    _fromRightToCoord : function(ref, i) {
      return (new Coordinate(this._a.rect[ref].getValue()[1][i], ref, i));
    },

    _fromCenterToCoord : function(ref, i) {
      return (new Coordinate(this._a.rect.window.getCenter()[i], 'window',i)).inRef(ref).minus(this.frame.getValue('size')[i]/2);
    },

    _fromFromNameToCoord : function(ref, i) {
      var d = this.getFromName('point').toArray(i);
      return d;
    },

    _setFromName : function() {
      var info = this.sequenceName.split('_-')[1];
      if (info) {
        var infoSplit = info.split('_'),
            position = infoSplit[1].split('x').map(function(p) { return parseInt(p)});
        this._fromName  = (new Point([position[0],'scene'], [position[1], 'scene']));
      }
    },

    getFromName : function(what) {
      if (!this._fromName) {
        this._setFromName();
      }
      if (this._fromName) {
        return this._fromName;
      } else {
        return false;
      }
    }


	});

});