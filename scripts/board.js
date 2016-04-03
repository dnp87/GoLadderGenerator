//legend for board: '' - empty, 'b' - black, 'w' - white

if (!$pr) {
    var $pr = {};
}

$pr.BoardPosition = function() {
	var that = this;
	that.body = new Array(19);
	for(var i = 0; i < 19; i++ ) {
		that.body[i] = new Array(19);
		for (var j = 0; j < that.body[i].length; j++) {
			that.body[i][j] = '';
		};
	}
}

$pr.BoardPosition.prototype.getPosition = function(x, y) {
	return this.body[x][y];
}

$pr.BoardPosition.prototype.placeStone = function(x, y, stoneType) {
	var that = this;
	if(stoneType != that.proto.BlackStone && stoneType != that.proto.WhiteStone) {
		alert('invalid stone type');
	}
	else
	{
		//todo: add other function or place complete logic here
		that.body[x][y] = stoneType;
	}
}

$pr.BoardPosition.Empty = '';
$pr.BoardPosition.BlackStone = 'B';
$pr.BoardPosition.WhiteStone = 'W';