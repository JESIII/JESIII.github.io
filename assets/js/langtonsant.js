//John Scales
//CWID 888865730
//Class Number 335-04
//13602 Loumont st.
//Whittier, CA 90601
//24 September 2019
//Turk & Propp's Ant #12
//This file contains al of the functions for js-1.html

// Draw stuff
// ------------------------------------------------------------
function draw_triangle( rctx, rp1x, rp1y, rp2x, rp2y, rp3x, rp3y)
{
    rctx.save( );

    // BL Triangle.
    rctx.beginPath( );
    rctx.moveTo( rp1x*10, rp1y*10 ); // 50, 250
    rctx.lineTo( rp2x*10, rp2y*10 ); // 50, 350
    rctx.lineTo( rp3x*10, rp3y *10); // 150, 350
    rctx.closePath();
    rctx.stroke();
    rctx.fillStyle = 'white';
    rctx.fill();
    rctx.restore( );
}
function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }
  for (var i = 0; i<rows; i++){
    for (var j = 0; j<rows; j++){
      arr[i][j] = 0;
    }
  }
  return arr;
}
async function draw_ant( ctx , posx, posy, color)
{
	ctx.save( );
	if (color == 0) fill = 'black';
	if (color == 1) fill = 'red';
	if (color == 2) fill = 'yellow';
	if (color == 3) fill = 'blue';
  ctx.beginPath();
  ctx.fillStyle = fill;
  ctx.rect(posx*10 + 1, posy*10 + 2, 7, 7);
  ctx.fill( );
  ctx.stroke( );
  ctx.restore( );
}

function goleft(ant, ctx){
  draw_ant(ctx, ant.x, ant.y, ant.color);
	if(ant.dir == 0){
		ant.dir = 3;
    draw_triangle(context, ant.x+0.1- 1, ant.y+0.4, ant.x + .8- 1, ant.y+.1, ant.x+.8- 1, ant.y+.8);

		ant.x = ant.x - 1;
	}
	else if(ant.dir == 1){
		ant.dir = 0;
    draw_triangle(context, ant.x+0.4, ant.y+0.1- 1, ant.x + .8, ant.y+.8- 1, ant.x+0.1, ant.y+.8- 1);

		ant.y = ant.y - 1;
	}
	else if(ant.dir == 2){
		ant.dir = 1;
    draw_triangle(context, ant.x+0.1+ 1, ant.y+0.1, ant.x + .8+ 1, ant.y+.4, ant.x+.1+ 1, ant.y+.8);

		ant.x = ant.x + 1;
	}
	else if(ant.dir == 3){
		ant.dir = 2;
    draw_triangle(context, ant.x+0.1, ant.y+0.1+ 1, ant.x + .8, ant.y+.1+ 1, ant.x+.4, ant.y+.8+ 1);
		ant.y = ant.y + 1;
	}
}
function goright(ant, ctx){
  draw_ant(ctx, ant.x, ant.y, ant.color);
	if(ant.dir == 0){
		ant.dir = 1;
    draw_triangle(context, ant.x+0.1+ 1, ant.y+0.1, ant.x + .8+ 1, ant.y+.4, ant.x+.1+ 1, ant.y+.8);
		ant.x = ant.x + 1;
	}
	else if(ant.dir == 1){
		ant.dir = 2;
    draw_triangle(context, ant.x+0.1, ant.y+0.1+ 1, ant.x + .8, ant.y+.1+ 1, ant.x+.4, ant.y+.8+ 1);
		ant.y = ant.y + 1;
	}
	else if(ant.dir == 2){
		ant.dir = 3;
    draw_triangle(context, ant.x+0.1- 1, ant.y+0.4, ant.x + .8- 1, ant.y+.1, ant.x+.8- 1, ant.y+.8);
		ant.x = ant.x - 1;
	}
	else if(ant.dir == 3){
		ant.dir = 0;
    draw_triangle(context, ant.x+0.4, ant.y+0.1- 1, ant.x + .8, ant.y+.8- 1, ant.x+0.1, ant.y+.8- 1);
		ant.y = ant.y - 1;
	}
}

// =====================================================  draw_grid ====
function draw_grid( rctx, rminor, rmajor, rstroke, rfill )
{
    rctx.save( );
    rctx.strokeStyle = rstroke;
    rctx.fillStyle = rfill;
    let width = rctx.canvas.width;
    let height = rctx.canvas.height;
    for ( var ix = 0; ix < width; ix += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( ix, 0 );
        rctx.lineTo( ix, height );
        rctx.lineWidth = ( ix % rmajor == 0 ) ? .5 : .5;
        rctx.stroke( );
        if ( ix % rmajor == 0 ) { rctx.fillText( ix/10, ix, 10 ); }
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( 0, iy );
        rctx.lineTo( width, iy );
        rctx.lineWidth = ( iy % rmajor == 0 ) ? .5 : .5;
        rctx.stroke( );
        if ( iy % rmajor == 0 ) {rctx.fillText( iy/10, 0, iy + 10 );}
    }
    rctx.restore( );
}
