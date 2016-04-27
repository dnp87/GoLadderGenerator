if (!$pr) {
    var $pr = {};
}

$pr.State = function() {
  var that = this;
  that.mode = 0;  //editStone
  that.currStoneType = $pr.BoardPosition.BlackStone;
}

$pr.State.prototype.toggleStone = function() {
  var that = this;
  switch(that.currStoneType) {
    case $pr.BoardPosition.BlackStone:
      that.currStoneType = $pr.BoardPosition.WhiteStone;
      break;
    case $pr.BoardPosition.WhiteStone:
      that.currStoneType = $pr.BoardPosition.BlackStone;
      break;
    default:

  }
}
