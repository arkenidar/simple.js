outputMarker = 0;
inputMarker = 0;
if(typeof prompt==='undefined') prompt = require('readline-sync').prompt;

memory = new Array(100).fill(0);
programIndex = 0;
pathSel = 0;

programNot = [
	['PATHSEL',	'IN',		2,	1],	// 00) read pathSel
	['OUT',		'ZERO', 	0,	0],	// 01) print 0
	['OUT',		'ONE',		0,	0],	// 02) print 1
];

programArray =	[
	[5,		'IN',		1,	1],	// 00) read x
	[6,		'IN',		2,	2],	// 01) read i.0
	[7,		'IN',		3,	3],	// 02) read i.1
	['PATHSEL',	6,		4,	5],	// 03) first level path separation
	['PATHSEL',	7,		6,	7],	// 04) second level path separation
	['PATHSEL',	7,		8,	9],	// 05) second level path separation
	[8,		5,		10, 	10],	// 06) a[0] = x (a[i]=x with i=0)
	[9,		5,		10,	10],	// 07) a[1] = x (a[i]=x with i=1)
	[10,		5,		10,	10],	// 08) a[2] = x (a[i]=x with i=2)
	[11,		5,		10,	10],	// 09) a[3] = x (a[i]=x with i=3)
	['OUT',		8,		11,	11],	// 10) print a[0]
	['OUT',		9,		12,	12],	// 11) print a[1]
	['OUT',		10,		13,	13],	// 12) print a[2]
	['OUT',		11,		0,	0],	// 13) print a[3]
];

program = programArray;

while(true){
	
	instruction = program[programIndex];
	
	// move operation from origin to destination

	// origin
	origin = instruction[1];

	if('number'===typeof origin) origin = memory[origin];
	else
	if(origin=='ZERO') origin = 0;
	else if(origin=='ONE') origin = 1;
	else if(origin=='IN') {
		origin = parseInt(prompt());
		console.log(origin+'\t\t in: '+inputMarker++);
		if(origin!=0 && origin!=1){
			console.log('quit');
			break;
		}
	}

	// copy origin to destination
	destination = instruction[0];

	if('number'===typeof destination) memory[destination] = origin;
	else
	if(destination=='PATHSEL') pathSel = origin;
	else if(destination=='OUT') console.log(origin+'\t\t out: '+outputMarker++);

	// path selection
	programIndex=instruction[2+pathSel];
}

