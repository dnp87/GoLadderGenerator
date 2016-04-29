if (!$pr) {
    var $pr = {};
}

$pr.GraphicsEngine = function(cnv, width, height, gridOffset) {
	this.canvas = cnv;
	this.boardCanvasId = cnv.id;

	if( width ) {
		this.canvas.width = width;
	}
	if( height ) {
		this.canvas.height = height;
	}

	this.gridOffset = gridOffset;
	this.lineStep = (this.canvas.width - this.gridOffset*2)/18;
}

$pr.GraphicsEngine.prototype.drawBoard = function() {
	var that = this;
	var ctx = that.canvas.getContext("2d");
	ctx.fillStyle = "#FFBB68";
	ctx.strokeStyle = "#000000";
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

$pr.GraphicsEngine.prototype.drawStones = function(position) {
  if(!position) {
    console.log("no board position specified");
    return;
  }

	var that = this;
	var ctx = that.canvas.getContext("2d");
	for (var x = 1; x <= 19; x++) {
		for (var y = 1; y <= 19; y++) {
			var pt = position.getPosition(x, y)
			if( pt ) {
				if( pt == $pr.BoardPosition.BlackStone) {
					ctx.fillStyle = "#000000";
					ctx.strokeStyle = "#FFFFFF";
				}
				if( pt == $pr.BoardPosition.WhiteStone) {
					ctx.fillStyle = "#FFFFFF";
					ctx.strokeStyle = "#000000";
				}
				ctx.beginPath();
				ctx.arc(that.gridOffset + that.lineStep*(x-1) + 0.5, that.gridOffset + that.lineStep*(y-1)  + 0.5, that.lineStep/2, 0, 2*Math.PI);
				ctx.fill();
				ctx.stroke();
			}
		};
	};
}

$pr.GraphicsEngine.prototype.getBoardCoords = function(e) {

	var that = this;
	var getPosition = function(event) {
		var x = new Number();
		var y = new Number();
		var canvas = document.getElementById(that.boardCanvasId);
		var multX = canvas.width/canvas.clientWidth;
		var multY = canvas.height/canvas.clientHeight;

		if (event.x != undefined && event.y != undefined)
		{
		  x = event.x;
		  y = event.y;
		}
		else // Firefox method to get the position
		{
		  x = event.clientX + document.body.scrollLeft +
			  document.documentElement.scrollLeft;
		  y = event.clientY + document.body.scrollTop +
			  document.documentElement.scrollTop;
		}

		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;
		x *= multX;
		y *= multY;
		return { "x" : x, "y" : y }
  }

  var that = this;
  var step = (that.canvas.width - that.gridOffset*2)/18;//implying on square canvas

  var coords = getPosition(e);
  coords.x = Math.round(coords.x / step);
  coords.y = Math.round(coords.y / step);
  //alert("x: " + coords.x + ", y: " + coords.y);
  if( coords.x >= 1 && coords.x <= 19 && coords.y >= 1 && coords.y <= 19) {
    return coords;
  }
  else
  {
    return null;
  }
}
