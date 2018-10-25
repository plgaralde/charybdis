'use strict';
	
function cc ( d = [] )
{
	var h = 'height',
		w = 'width',
		s = ' ',
		c = ',',
		x = 'x',
		y = 'y',
		
		doc = document,
		dpn = function dpn ( a, b ) { return doc.createElementNS ( svgns, 'polygon' ); },
		cid = function cid ( a ) { return doc.getElementById ( a ); },
		waD = cid ( 'workarea' ),
		waH = waD.getAttribute ( h ),
		waW = waD.getAttribute ( w ),
		waX = waW / 2,
		waY = waH / 2,
		
		gap = 8.5,
		tle = cid ( 'timeline' ),
		gcn = 0,
		gcr = '#000000',
		
		tp = { context : tle,
			grid : { count : 12 }
		},
		tl = { context : tle.getContext ( '2d' ),
			min : 4.711, max : 13.5 * Math.PI,
			inc : 0, tha : 0
		},
		tg = { context : tl.context,
			min : 4.711,
			inc : 0, tha : 0
		},
		go = { obj : { cnt : 1000 },
			min : 4.71,
			inc : 0, tha : 0
		},
		
		g, l, d, p, t,
		
		svgns = 'http://www.w3.org/2000/svg';
	
	function mc ( a, b = 1 ) { return Math.cos ( a ) * b; }
	function ms ( a, b = 1 ) { return Math.sin ( a ) * b; }
	function ps ( ax, c, a, g ) { return c + a * ( mc ( a ) * ( ax == x ) + ms ( a ) * ( ax == y ) ) * g; }
	function px ( a, b ) { return ps ( x, waX, a, b ); }
	function py ( a, b ) { return ps ( y, waY, a, b ); }
	function ad ( a ) { return 2 * Math.PI / a; }
	
	tp.context.setAttribute ( h, waH );
	tp.context.setAttribute ( w, waW );
	
	tl.inc = ad ( 1000 );
	tl.tha = tl.min;
	tl.context.strokeStyle = gcr;
	
	tg.context.lineWidth = 0.1;
	tg.inc = ad ( tp.grid.count );
	tg.tha = tg.min;
	tg.context.strokeStyle = gcr;
	
	while ( tl.tha < tl.max ) {	tl.context.lineTo ( px ( tl.tha, gap ), py ( tl.tha, gap ) );
		tl.tha = tl.tha + tl.inc;
	}
	tl.context.stroke ();
	
	for ( g = 0; g <= tp.grid.count; g++ ) { l = tg.tha;
		tg.context.beginPath ();
		tg.context.moveTo ( px ( tg.tha, gap ), py ( tg.tha, gap ) );
		
		while ( l < tl.max ) {	if ( tp.grid.count * 5 == gcn++ ) { break; }
			l = l + tg.inc;
		}
		tg.context.lineTo ( px ( l, gap ), py ( l, gap ) );
		tg.context.stroke ();
		
		tg.tha = tg.tha + tg.inc;
		gcn = 0;
	}
	
	waD.innerHTML = '';
	
	go.inc = ad ( 60 );
	go.tha = tg.min;
	
	while ( go.tha + go.inc < tl.max ) { var g0 = dpn (),
		g1 = dpn (),
		t = go.tha,
		m = t + 0.08,
		n = t + 0.02,
		x1 = px ( n, gap ),
		x2 = px ( m, gap ),
		y1 = py ( n, gap ),
		y2 = py ( m, gap );
		
		p = [
			x1 + c + y1 + s + 
			x2 + c + y2 + s + 
			( x2 + mc ( m, 15 ) ) + c + ( y2 + ms ( m, 15 ) ) + s +
			( x1 + mc ( t, 15 ) ) + c + ( y1 + ms ( t, 15 ) ),
			
			( x1 + mc ( t, 40 ) ) + c + ( y1 + ms ( t, 40 ) ) + s + 
			( x2 + mc ( m, 40 ) ) + c + ( y2 + ms ( m, 40 ) ) + s + 
			( x2 + mc ( m, 45 ) ) + c + ( y2 + ms ( m, 45 ) ) + s +
			( x1 + mc ( t, 45 ) ) + c + ( y1 + ms ( t, 45 ) )
		];
		
		g0.setAttributeNS ( null, 'points', p[ 0 ] );
		g0.setAttributeNS ( null, 'style', 'fill: #dddddd;' );
		g1.setAttributeNS ( null, 'points', p[ 1 ] );
		g1.setAttributeNS ( null, 'style', 'fill: #999999;' );
		
		if ( d.length != 0 ) {
			if ( d[ gcn ] == 1 ) {
				//waD.appendChild ( g0 );
				waD.appendChild ( g1 );
			}
		}
		
		if ( go.obj.cnt == gcn++ ) { break; }
		go.tha = go.tha + go.inc;
	}
}
	
var d = [
	1, 1, 1, 1, 1,
	1, 0, 0, 1, 1,
	0, 0, 1, 0, 1,
	0, 0, 0, 1, 1,
	0, 0, 1, 1, 0,
	0, 0, 0, 0, 0,
	1, 1, 0, 0, 1,
	0, 0, 1, 0, 1,
	1, 1, 0, 0, 1,
	1, 0, 1, 0, 1,
	0, 0, 1, 0, 1,
	1, 1, 0, 1, 1,
	
	0, 0, 1, 1, 1,
	0, 1, 0, 1, 0,
	1, 1, 0, 1, 1,
	1, 0, 0, 0, 0,
	1, 1, 1, 0, 1,
	1, 1, 0, 0, 1,
	1, 1, 1, 0, 0,
	0, 1, 0, 1, 0,
	0, 1, 1, 0, 0,
	1, 1, 0, 0, 1,
	1, 1, 1, 1, 0,
	1, 0, 1, 0, 1,
	
	1, 0, 1, 1, 1,
	1, 1, 1, 0, 1,
	0, 1, 0, 0, 1,
	1, 1, 0, 1, 0,
	1, 1, 0, 1, 0,
	1, 1, 1, 1, 1,
	0, 1, 1, 1, 1,
	0, 0, 0, 0, 1,
	0, 1, 0, 1, 1,
	1, 0, 1, 1, 1,
	1, 0, 0, 1, 1,
	1, 1, 1, 0, 0
	];
	
cc ( d );
