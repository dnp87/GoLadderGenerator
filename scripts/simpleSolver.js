if (!$pr) {
    var $pr = {};
}

$pr.SimpleSolver = function()
{
    var that = this;
}

// todo: make it private
// returns an array of possible moves?
$pr.SimpleSolver.prototype.getNextWhiteMoves = function(boardPosition)
{
    var ladderGroup = boardPosition.getLadderGroup();
    var result = new Array();

    // candidates: empty board points ajacent to ladder
    var candidates = ladderGroup.getEmptyAdjacentPoints(boardPosition);
    for (let i = 0; i < candidates.length; i++)
    {
        let candidate = candidates[i];
        let tempBoardPosition = boardPosition.clone();
        tempBoardPosition.ReCalcGroupsAfterStone(candidate, $pr.BoardPosition.WhiteStone);
        if (tempBoardPosition.getLadderGroup(tempBoardPosition).getDameCount(tempBoardPosition) > 0)
        {
            result.push(candidate);
        }
    }
    return result;
}

// todo: make it private
// returns an array of possible moves?
$pr.SimpleSolver.prototype.getNextBlackMoves = function()
{

}

// pass here boardPosition's clone in order to get possible ladder solution
$pr.SimpleSolver.prototype.getSolutionPath = function(boardPosition)
{
    var ladderGroup = boardPosition.getLadderGroup();
    // возвращаем здесь массив точек до решения, успешного или нет...
    return true;
}
