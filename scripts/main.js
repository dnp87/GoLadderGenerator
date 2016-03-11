$(document).ready(function()
{
	var cnv = $("#myCanvas")[0];
	var ge = new $pr.GraphicsEngine(cnv, 550, 550, 20);
	ge.drawBoard();
});