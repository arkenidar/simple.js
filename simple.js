if(typeof prompt==='undefined')prompt = require('readline-sync').prompt;

memory = new Array(100).fill(0);
programIndex = 0;
pathsel = 0;

programNot = [
	['PATHSEL',	'IN',	2,		1],		// 0) read pathsel
	['OUT',		'ZERO', 0,		0],		// 1) print 0
	['OUT',		'ONE',	0,		0],		// 2) print 1
];

programArray =	[
	[5,			'IN',	1,		1],		// 0) read x
	[6,			'IN',	2,		2],		// 1) read i.0
	[7,			'IN',	3,		3],		// 2) read i.1
	['PATHSEL',	6,		4,		5],		// 3) first level path separation
	['PATHSEL',	7,		6,		7],		// 4) second level path separation
	['PATHSEL',	7,		8,		9],		// 5) second level path separation
	[8,			5,		10, 	10],	// 6) a[0] = x (a[i]=x with i=0)
	[9,			5,		10,		10],	// 7) a[1] = x (a[i]=x with i=1)
	[10,		5,		10,		10],	// 8) a[2] = x (a[i]=x with i=2)
	[11,		5,		10,		10],	// 9) a[3] = x (a[i]=x with i=3)
	['OUT',		8,		11,		11],	// 10) print a[0]
	['OUT',		9,		12,		12],	// 11) print a[1]
	['OUT',		10,		13,		13],	// 12) print a[2]
	['OUT',		11,		0,		0],		// 13) print a[3]
];

program = programArray;

while(true){
	
	instruction = program[programIndex]
	
	// move operation
	origin = instruction[1]
	if(origin=='IN') {
		origin = parseInt(prompt());
		if(origin!=0 && origin!=1){
			console.log('quit');
			break;
		}
	}
	else if(origin=='ZERO') origin = 0;
	else if(origin=='ONE') origin = 1;
	else origin = memory[origin]

	destination = instruction[0]
	if(destination=='PATHSEL') pathsel = origin;
	else if(destination=='OUT') console.log(origin);
	else memory[destination] = origin;

	// path selection
	programIndex=instruction[2+pathsel];
}

