$(document).ready(function()
{
	var cnv = $("#myCanvas")[0];
	var ge = new $pr.GraphicsEngine(cnv, 580, 580, 20);
	ge.drawBoard();
});