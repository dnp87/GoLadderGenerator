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

  $("#solve_for_me_btn").click(function()
  {
    let solver = new $pr.SimpleSolver(board);
    let path = solver.getSolutionPath(board);
    let nextIsBlack = true;

    let delay = 300;
    for(let i = 0; i < path.length; i++){
      let nextStone = nextIsBlack ? $pr.BoardPosition.BlackStone : $pr.BoardPosition.WhiteStone;
      placeSolveStone(path[i], nextStone);
      nextIsBlack = !nextIsBlack;
      sleep(delay);
    }
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
