$(document).ready(function()
{
	var cnv = $("#myCanvas")[0];
	var ge = new $pr.GraphicsEngine(cnv, 600, 600, 30);
	ge.drawBoard();
	
	$(cnv).click(function(e) {
		var coords = ge.getBoardCoords(e);
	})
});