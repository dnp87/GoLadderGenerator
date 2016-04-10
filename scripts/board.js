//legend for board: '' - empty, 'b' - black, 'w' - white

if (!$pr) {
    var $pr = {};
}

$pr.BoardPosition = function() {
	var that = this;
	that.body = new Array(19); //simple cell-by-cell presentation
	that.groups = new Array();

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

$pr.BoardPosition.prototype.StoneInAnyGroup = function(x, y) {
	var that = this;
	for( var i = 0; i < that.groups.length; i++ ) {
		if( that.groups[i].hasStone(x,y) )
		{
			return true;
		}
	}
	return false;
}

//calculate groups from an empty board
$pr.BoardPosition.prototype.CalcGroups = function() {

}

$pr.BoardPosition.prototype.ReCalcGroupsAfterStone = function(x,y) {
	//recalculate existing groups
}

$pr.BoardPosition.Empty = '';
$pr.BoardPosition.BlackStone = 'B';
$pr.BoardPosition.WhiteStone = 'W';