if (!$pr) {
    var $pr = {};
}

$pr.StoneGroup = function() {
	var that = this;
	that.body = new Array(); //list of stone coords
}

//get dame count for group on a given board
$pr.StoneGroup.prototype.getDameCount = function(board) {

}

//checks whether current group is the one running away in a ladder
$pr.StoneGroup.prototype.isLadderGroup = function() {
	return false;//todo
}