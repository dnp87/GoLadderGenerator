var _mode = 0;//edit
var _currSolveType = $pr.BoardPosition.BlackStone;

$(document).ready(function()
{
  var cnv = $("#boardCanvas")[0];
  var ge = new $pr.GraphicsEngine(cnv, 600, 600, 30);
  ge.drawBoard();
  var board = new $pr.BoardPosition();

  $(cnv).click(function(e) {
    var coords = ge.getBoardCoords(e);
    if( coords ) {
      if( _mode == 0 ) {
        placeEditStone(coords);
      }
      else {
        placeSolveStone(coords);
      }
    }
  })

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

  function placeSolveStone(coords)
  {
    alert('todo');
  }

  $("#start_solving_btn").click(function() {
    _mode = 1;//solve
    board.CalcGroups();
  })

  board.CreateLadder();
  ge.drawBoard();
  ge.drawStones(board);
});
