$(document).ready(function()
{
	var cnv = $("#boardCanvas")[0];
	var ge = new $pr.GraphicsEngine(cnv, 600, 600, 30);
	ge.drawBoard();
	var board = new $pr.BoardPosition();
	
	$(cnv).click(function(e) {
		var coords = ge.getBoardCoords(e);
	})
});