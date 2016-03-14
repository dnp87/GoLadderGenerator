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
    var step = (that.canvas.width - that.gridOffset*2)/18;
	
	//horizonal lines
	for( var i = 0; i < 20; i++ ) {
		ctx.beginPath();
		ctx.moveTo(that.gridOffset, that.gridOffset + step*i + 0.5);
		ctx.lineTo(that.canvas.width - that.gridOffset, that.gridOffset + step*i  + 0.5);
		ctx.stroke();		
		ctx.closePath();
	}
	
	//vertical lines
	for( var i = 0; i < 20; i++ ) {
		ctx.beginPath();
		ctx.moveTo(that.gridOffset + step*i + 0.5, that.gridOffset );
		ctx.lineTo(that.gridOffset + step*i  + 0.5, that.canvas.height - that.gridOffset);
		ctx.stroke();		
		ctx.closePath();
	}
		
	//star points
	for( var i = 0; i < 3; i++ ) {	
		for( var j = 0; j < 3; j++ ) {
			ctx.beginPath();
			ctx.arc(that.gridOffset + step*(3+j*6) + 0.5, that.gridOffset + step*(3+i*6)   + 0.5, 2, 0, 2*Math.PI);
			ctx.stroke();
		}
	}
}