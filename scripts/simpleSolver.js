if (!$pr) {
    var $pr = {};
}

$pr.SimpleSolver = function()
{
    var that = this;
}

// todo: make it private
$pr.SimpleSolver.getNextWhiteMove = function()
{

}

// todo: make it private
$pr.SimpleSolver.getNextBlackMove = function()
{

}

$pr.SimpleSolver.prototype.getSolutionPath = function(boardPosition)
{
    var ladderGroup = boardPosition.getLadderGroup();
    // возвращаем здесь массив точек до решения, успешного или нет...
    return true;
}
