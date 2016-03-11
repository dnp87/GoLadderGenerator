if (!$pr) {
    var $pr = {};
}

$pr.GraphicsEngine = function(cnv, width, height, gridOffset) {	
	this.canvas = cnv;	
	if( width ) {
		this.canvas.width = width;
	}
	if( height ) {
		this.canvas.height = height;
	}
	
	this.gridOffset = gridOffset;	
}

$pr.GraphicsEngine.prototype.drawBoard = function() {
	var that = this;
	var ctx = that.canvas.getContext("2d");
	ctx.fillStyle = "#FFBB68";
	ctx.fillRect(0, 0, that.canvas.width, that.canvas.height);
	
	ctx.fillStyle = "#000000";
	ctx.lineWidth = 1;
    var step = Math.floor((that.canvas.width - that.gridOffset*2)/19);
	
	for( var i = 0; i < 19; i++ ) {
		ctx.beginPath();
		ctx.moveTo(that.gridOffset, that.gridOffset + step*i + 0.5);
		ctx.lineTo(that.canvas.width - that.gridOffset, that.gridOffset + step*i  + 0.5);
		ctx.stroke();		
		ctx.closePath();
	}
}