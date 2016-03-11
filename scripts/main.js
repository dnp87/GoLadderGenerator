$(document).ready(function()
{
	var cnv = $("#myCanvas")[0];
	var ge = new $pr.GraphicsEngine(cnv, 520, 520, 20);
	ge.drawBoard();
});