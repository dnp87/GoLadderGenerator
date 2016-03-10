if (!$pr) {
    var $pr = {};
}

$pr.GraphicsEngine = function(cnv, gridOffset) {	
	this.canvas = cnv;
	this.gridOffset = gridOffset;	
}

$pr.GraphicsEngine.prototype.drawBoard = function() {
	var that = this;
	var ctx = that.canvas.getContext("2d");
	ctx.fillStyle = "#FFBB68";
	ctx.fillRect(0, 0, that.canvas.width, that.canvas.height);
	
	ctx.fillStyle = "#000000";
	ctx.lineWidth=1;
    var step = (that.canvas.width - that.gridOffset*2)/19;

	ctx.beginPath();
	ctx.moveTo(that.gridOffset, that.gridOffset);
	ctx.lineTo(that.canvas.width - that.gridOffset, that.gridOffset);
	ctx.stroke();		
	ctx.closePath();
	/*for( var i = 0; i < 19; i++ ) {
		ctx.beginPath();
		ctx.moveTo(that.gridOffset, step*i);
		ctx.lineTo(that.canvas.width - that.gridOffset, step*i);
		ctx.stroke();		
		ctx.closePath();
	}*/
}