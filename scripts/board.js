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

$pr.BoardPosition.prototype.addGroup = function(group)
{
  var that = this;
  for( var i = 0; i < group.body.length; i++ )
  {
    var p = group.body[i];
    that.editStone(p.x, p.y, group.color);
  }
  that.groups.push(group);
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

$pr.BoardPosition.prototype.getLadderGroup = function()
{
  // hmm, es6...
  function isLadderGroup(value, index, array) {
    return value.isLadderGroup();
  }

   return this.groups.find(isLadderGroup);
}

//calculate groups from an empty board
$pr.BoardPosition.prototype.CalcGroups = function() {
  var that = this;
  that.groups = new Array();

   // todo: fix this. Algorithms needs to merge groups after calc.
   // faulty: scenario is empty triangle group 
   //  *  - stone A
  //  ** - stones B, C
  // where stones A and B are initially considered to be in different groups
  // since they have no KNOWN common neighhbout at the time of calculation
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
            break;
          }
        }
        if(!groupFound) {
          that.groups.push(new $pr.StoneGroup(st, x, y));
        }
      }
		}
	}
}

//recalculate existing groups after stone placement
$pr.BoardPosition.prototype.ReCalcGroupsAfterStone = function(stone, color) {
  var that = this;

  //choosing groups of the same color adjacent to the new stone;
  var adjacentSameColorGroups = that.groups.filter(function(el) {
    return el.color == color && el.adjacentTo(stone.x, stone.y);
  });

  if( adjacentSameColorGroups.length > 0 ) {
    //merging group(s) with new stone
    var newGroup = $pr.StoneGroup.MergeGroups(adjacentSameColorGroups);

    for( var i = 0; i < adjacentSameColorGroups.length; i++ ) {
      that.removeGroup(adjacentSameColorGroups[i]);
    }
    newGroup.addStone(stone.x, stone.y);
    that.addGroup(newGroup);
  }
  else {
    var ng = new $pr.StoneGroup(color, stone.x, stone.y);
    that.addGroup(ng);
  }

  //now delete groups with 0 dame
  while(true) {
    var removeOccured = false;
    for(var g = 0; g < that.groups.length; g++) {
      if(that.groups[g].getDameCount(that) == 0)
      {
        that.removeGroup(that.groups[g]);
        continue;
      }
    }

    if(!removeOccured) {
      break;
    }
  }
}

$pr.BoardPosition.prototype.CreateLadder = function() {
	var that = this;
    //that.editStone(4, 15, $pr.BoardPosition.BlackStone);
    //that.editStone(3, 16, $pr.BoardPosition.BlackStone);
    //that.editStone(4, 17, $pr.BoardPosition.BlackStone);
    //that.editStone(5, 17, $pr.BoardPosition.BlackStone);

  that.editStone(4, 16, $pr.BoardPosition.WhiteStone);
  that.editStone(5, 16, $pr.BoardPosition.WhiteStone);
  that.editStone(5, 15, $pr.BoardPosition.WhiteStone);
}
