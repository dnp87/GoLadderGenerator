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
	return this.body[x-1][y-1];
}

//editor mode, no rule enforcement
$pr.BoardPosition.prototype.editStone = function(x, y, stoneType) {
	var that = this;
	if(stoneType != $pr.BoardPosition.BlackStone
		&& stoneType != $pr.BoardPosition.WhiteStone
		&& stoneType != $pr.BoardPosition.Empty) {
		alert('invalid stone type');
	}
	else
	{
		that.body[x-1][y-1] = stoneType;
	}
}

$pr.BoardPosition.Empty = '';
$pr.BoardPosition.BlackStone = 'B';
$pr.BoardPosition.WhiteStone = 'W';