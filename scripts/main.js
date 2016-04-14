$(document).ready(function()
{
  var cnv = $("#boardCanvas")[0];
  var ge = new $pr.GraphicsEngine(cnv, 600, 600, 30);
  ge.drawBoard();
  var board = new $pr.BoardPosition();

  $(cnv).click(function(e) {
    var coords = ge.getBoardCoords(e);
    if( coords ) {
      var stoneType = $(":input[name='editor_stonecolor']:checked").val();
      if( board.getPosition(coords.x, coords.y) != $pr.BoardPosition.Empty )
      {
        stoneType = $pr.BoardPosition.Empty;
      }
      debugger;
      board.editStone(coords.x, coords.y, stoneType);
      ge.drawBoard();
      ge.drawStones(board);
    }
  })

  $("#start_solving_btn").click(function() {    
  })

  board.CreateLadder();
  ge.drawBoard();
  ge.drawStones(board);
});
