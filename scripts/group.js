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
$pr.StoneGroup.prototype.getDameCount = function(board) {

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
