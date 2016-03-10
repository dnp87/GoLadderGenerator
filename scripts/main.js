$(document).ready(function()
{
	var cnv = $("#myCanvas")[0];
	var ge = new $pr.GraphicsEngine(cnv, 10);
	ge.drawBoard();
});