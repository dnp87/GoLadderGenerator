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

$pr.BoardPosition.Empty = '';
$pr.BoardPosition.BlackStone = 'B';
$pr.BoardPosition.WhiteStone = 'W';

$pr.BoardPosition.prototype.clone = function() {
  var that = this;
  return $.extend(true, {}, that);
}

$pr.BoardPosition.prototype.removeGroup = function(group)
{
  var that = this;
  var ind = that.groups.indexOf(group);
  if( ind != -1 )
  {
       for( var i = 0; i < group.body.length; i++ )
       {
         var p = group.body[i];
         that.editStone(p.x, p.y, $pr.BoardPosition.Empty);
       }
       that.groups.splice(ind, 1);
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
	var that = this;
	for( var x = 1; x <= that.body.length; x++ ) {
		for( var y = 1; y < that.body[x-1].length; y++ ) {
      var st = that.getPosition(x, y);
      if (st) {
        var groupFound = false;
        for( var g = 0; g < that.groups.length; g++ ) {
          var group = that.groups[g];
          if(group.color == st && group.adjacentTo(x, y)) {
            group.addStone(x, y);
            groupFound = true;
          }
        }
        if(!groupFound) {
          that.groups.push(new $pr.StoneGroup(st, x, y));
        }
      }
		}
	}
}

$pr.BoardPosition.prototype.ReCalcGroupsAfterStone = function(x,y) {
	//recalculate existing groups
  groups.pus
}

$pr.BoardPosition.prototype.CreateLadder = function() {
	var that = this;
	that.editStone(4, 15, $pr.BoardPosition.BlackStone);
	that.editStone(3, 16, $pr.BoardPosition.BlackStone);
	that.editStone(4, 17, $pr.BoardPosition.BlackStone);
	that.editStone(5, 17, $pr.BoardPosition.BlackStone);

	that.editStone(4, 16, $pr.BoardPosition.WhiteStone);
	that.editStone(5, 16, $pr.BoardPosition.WhiteStone);
}
