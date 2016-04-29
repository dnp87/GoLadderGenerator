if (!$pr) {
    var $pr = {};
}

$pr.StoneGroup = function(color, x, y) {
	var that = this;
	that.color = color;
	if(color != $pr.BoardPosition.BlackStone && color != $pr.BoardPosition.WhiteStone ) {
		throw "Valid group color not specified";
	}
	that.body = new Array(); //list of stone coords
  if (x && y) {
    that.body.push({"x": x, "y": y});
  }
}

//get dame count for group on a given board
$pr.StoneGroup.compareStone = function (x, y)
{
  return function(elem, index, arr) {
    return elem.x == x && elem.y == y;
  }
}

$pr.StoneGroup.prototype.getDameCount = function(board) {
  var that = this;
  var accounted = new Array();
  var result = 0;

  for( var i = 0; i < that.body.length; i++ ) {
    var el = that.body[i];
    var adjPoints = new Array();
    if( el.x > 1) {
      adjPoints.push({ x: el.x - 1, y: el.y });
    }
    if( el.x < 19) {
      adjPoints.push({ x: el.x + 1, y: el.y });
    }
    if( el.y > 1) {
      adjPoints.push({ x: el.x, y: el.y - 1 });
    }
    if( el.y < 19) {
      adjPoints.push({ x: el.x, y: el.y + 1 });
    }

    for( var j = 0; j < adjPoints.length; j++ )
    {
      var p = adjPoints[j];
      if(!accounted.some($pr.StoneGroup.compareStone(p.x, p.y))) {
        accounted.push(p);
        if( board.getPosition(p.x, p.y) == $pr.BoardPosition.Empty ) {
          result++;
        }
      }
    }
  }
  return result;
}

//checks whether current group is the one running away in a ladder
$pr.StoneGroup.prototype.isLadderGroup = function() {
	return hasStone(4, 16);
}

$pr.StoneGroup.prototype.hasStone = function(x, y) {
	var that = this;
	for( var i = 0; i < that.body.length; i++ ) {
		var el = that.body[i];
		if( el.x == x && el.y == y) {
			return true;
		}
	}
	return false;
}

$pr.StoneGroup.prototype.addStone = function(x, y) {
  var that = this;
  if(!that.hasStone(x, y)) {
    that.body.push({"x": x, "y": y});
  }
}

//adjacency by horizontality or verticality
$pr.StoneGroup.prototype.adjacentTo = function(x, y) {
	var that = this;
	for( var i = 0; i < that.body.length; i++ ) {
		var elem = that.body[i];
		if( Math.abs(elem.x - x) == 1 && Math.abs(elem.y - y) == 0
			||
			Math.abs(elem.x - x) == 0 && Math.abs(elem.y - y) == 1) {
			return true;
		}
	}
	return false;
}
