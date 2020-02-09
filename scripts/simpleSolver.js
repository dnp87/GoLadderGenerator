if (!$pr) {
    var $pr = {};
}

$pr.SimpleSolver = function()
{
    var that = this;
}

// todo: make it private
// returns an array of possible moves?
$pr.SimpleSolver.getNextWhiteMove = function(boardPosition)
{
    var ladderGroup = boardPosition.getLadderGroup();

    // candidates: empty board points ajacent to ladder, that won't result in zero dame
}

// todo: make it private
// returns an array of possible moves?
$pr.SimpleSolver.getNextBlackMove = function()
{

}

// pass here boardPosition's clone in order to get possible ladder solution
$pr.SimpleSolver.prototype.getSolutionPath = function(boardPosition)
{
    var ladderGroup = boardPosition.getLadderGroup();
    // возвращаем здесь массив точек до решения, успешного или нет...
    return true;
}
