if (!$pr) {
    var $pr = {};
}

$pr.GraphicsEngine = function(cnv) {	
	this.canvas = cnv;	
}

$pr.GraphicsEngine.prototype.drawBoard = function() {
	var that = this;
	var ctx = that.canvas.getContext("2d");
	ctx.fillStyle = "#FFBB68";
	ctx.fillRect(0, 0, that.canvas.width, that.canvas.height);
}