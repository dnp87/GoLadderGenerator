var state;
var cng;
var ge;
var board;

//hackaround
function sleep(ms) {
  ms += new Date().getTime();
  while (new Date() < ms){}
} 

$(document).ready(function()
{
  state = new $pr.State();
  cnv = $("#boardCanvas")[0];
  ge = new $pr.GraphicsEngine(cnv, 600, 600, 30);
  ge.drawBoard();
  board = new $pr.BoardPosition();

  $(cnv).click(function(e) {
    var coords = ge.getBoardCoords(e);
    if( coords ) {
      if( state.mode == 0 ) {
        placeEditStone(coords);
      }
      else {
        placeSolveStone(coords, state.currStoneType);
      }
    }
  })

  $("#start_solving_btn").click(function() {
    state.mode = 1;//solve
    board.CalcGroups();
    switchUi(state.mode);
  })

  function doMoves(path, delay)
  {
    var nextIsBlack = true;
    var i = 0;

    doMove = function()
    {
      placeSolveStone(path[i], nextIsBlack ? $pr.BoardPosition.BlackStone : $pr.BoardPosition.WhiteStone);
      nextIsBlack = !nextIsBlack;
      i++;

      if(i < path.length)
      {
        setTimeout(doMove, delay);
      }
    }

    doMove();
  }

  $("#solve_for_me_btn").click(function()
  {
    let solver = new $pr.SimpleSolver(board);
    let path = solver.getSolutionPath(board);
    
    doMoves(path, 300);
  })



  board.CreateLadder();
  board.CalcGroups();
  ge.drawBoard();
  ge.drawStones(board);
});


function placeEditStone(coords)
{
  var stoneType = $(":input[name='editor_stonecolor']:checked").val();
  if( board.getPosition(coords.x, coords.y) != $pr.BoardPosition.Empty )
  {
    stoneType = $pr.BoardPosition.Empty;
  }
  board.editStone(coords.x, coords.y, stoneType);
  ge.drawBoard();
  ge.drawStones(board);
}

function placeSolveStone(coords, color)
{
  if(!board.getPosition(coords.x, coords.y)) {
    board.ReCalcGroupsAfterStone(coords, color);
    state.toggleStone();
    ge.drawBoard();
    ge.drawStones(board);
  }
}

function switchUi(mode)
{
  switch (mode) {
    case 0:
      $(".editor_specific").show();
      $("#modeMessage").text("Initial position editor");
      break;
    case 1:
      $(".editor_specific").hide();
      $("#modeMessage").text("Solving a problem");
      break;
    default:
  }
}
