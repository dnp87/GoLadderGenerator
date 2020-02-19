if (!$pr) {
    var $pr = {};
}

$pr.SimpleSolver = function()
{
    var that = this;
}

// possible W's moves with ladder group dame count. TODO: make it private?
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
        let dameCount = tempBoardPosition.getLadderGroup(tempBoardPosition).getDameCount(tempBoardPosition);
        if (dameCount)
        {
            result.push({point: candidate, dame: dameCount});
        }
    }
    return result;
}

// W's moves with max ladder group dame count. TODO: make it private?
$pr.SimpleSolver.prototype.getNextWhiteMove = function(boardPosition)
{
    let that = this;
    let moves = that.getNextWhiteMoves(boardPosition);
    let maxDame = Math.max(moves.map(c => c.dame));
    return moves.filter(v => v.dame == maxDame)[0];
}

// possible B's moves with ladder group dame count. TODO: make it private?
$pr.SimpleSolver.prototype.getNextBlackMoves = function(boardPosition)
{
    var result = new Array();

    var candidates = ladderGroup.getEmptyAdjacentPoints(boardPosition);
    for (let i = 0; i < candidates.length; i++)
    {
        let candidate = candidates[i];
        let initialDameCount = boardPosition.getLadderGroup(boardPosition).getDameCount(boardPosition);
        let boardPlusMove = boardPosition.clone(); 

        boardPlusMove.ReCalcGroupsAfterStone(candidate, $pr.BoardPosition.BlackStone);
        if (boardPlusMove.getLadderGroup(boardPlusMove).getDameCount(boardPlusMove) < initialDameCount)
        {
            let whiteCands = this.getNextWhiteMoves(boardPlusMove);
            let maxWhiteDame =  Math.max(whiteCands.map(wc => wc.dame));

            result.push({point: candidate, dame: maxWhiteDame});
        }
    }

    return result;
}

// W's moves with max ladder group dame count. TODO: make it private?
$pr.SimpleSolver.prototype.getNextBlackMove = function(boardPosition)
{
    let that = this;
    let moves = that.getNextBlackMoves(boardPosition);
    let minDame = Math.min(moves.map(c => c.dame));
    return moves.filter(v => v.dame == maxDame)[0];
}

// pass here boardPosition's clone in order to get possible ladder solution
$pr.SimpleSolver.prototype.getSolutionPath = function(boardPosition)
{
    var ladderGroup = boardPosition.getLadderGroup();
    // возвращаем здесь массив точек до решения, успешного или нет...
    return true;
}
