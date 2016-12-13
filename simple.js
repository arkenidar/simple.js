programs = {}

programs.not = {
        instructions: [
                ['PATHSEL',     'IN',           2,      1],     // 00) read pathSel
                ['OUT',         'ZERO',         0,      0],     // 01) print 0
                ['OUT',         'ONE',          0,      0],     // 02) print 1
        ],
        memorySize: 0,
};

programs.array =  {
        instructions: [
                [0,             'IN',           1,      1],     // 00) read x
                [1,             'IN',           2,      2],     // 01) read i.0
                [2,             'IN',           3,      3],     // 02) read i.1
                ['PATHSEL',     1,              4,      5],     // 03) first level path separation
                ['PATHSEL',     2,              6,      7],     // 04) second level path separation
                ['PATHSEL',     2,              8,      9],     // 05) second level path separation
                [3,             0,              10,     10],    // 06) a[0] = x (a[i]=x with i=0)
                [4,             0,              10,     10],    // 07) a[1] = x (a[i]=x with i=1)
                [5,             0,              10,     10],    // 08) a[2] = x (a[i]=x with i=2)
                [6,             0,              10,     10],    // 09) a[3] = x (a[i]=x with i=3)
                ['OUT',         3,              11,     11],    // 10) print a[0]
                ['OUT',         4,              12,     12],    // 11) print a[1]
                ['OUT',         5,              13,     13],    // 12) print a[2]
                ['OUT',         6,              0,      0],     // 13) print a[3]
        ],
        memorySize: 7,
};

programs.test = {
        instructions: [[0, 'ONE', 'EXIT', 'EXIT']],
        memorySize: 1,
};

////////////////////////////////////////////////////

programToLoad = programs.array;

program = programToLoad.instructions;

outputMarkerCounter = 0;
inputMarkerCounter = 0;
if(typeof prompt==='undefined') prompt = require('readline-sync').prompt;

memory = new Array(programToLoad.memorySize).fill(0);
programIndex = 0;
pathSel = 0;

function validIndex(array, index){
        return Number.isInteger(index) &&
        index>=0 && index<=(array.length-1);
}

function validInstruction(instruction){
        // check for 4 fields
        if(instruction.length!=4) return false;

        // check field with index 1
        if(!validIndex(memory, instruction[1]) &&
         instruction[1]!='ZERO' && instruction[1]!='ONE' && instruction[1]!='IN') return false;
        
        // check field with index 0
        if(!validIndex(memory, instruction[0]) &&
         instruction[0]!='PATHSEL' && instruction[0]!='OUT') return false;
        
        // check field with index 2
        if(!validIndex(program, instruction[2]) && instruction[2]!='EXIT') return false;

        // check field with index 3
        if(!validIndex(program, instruction[3]) && instruction[3]!='EXIT') return false;

        // all validity checks are successfully passed
        return true;
}

function validProgram(program){
        for(var i=0; i<program.length; i++)
                if(!validInstruction(program[i])) return false;
        return true;
}

function validMemory(memory){
        for(var i=0; i<memory.length; i++)
                if(memory[i]!=0 && memory[i]!=1) return false;
        return true;
}

console.info('validMemory:    '+validMemory(memory));
console.info('validProgram:   '+validProgram(program));

while(true){
        
        instruction = program[programIndex];
        
        // move operation from origin to destination

        // origin
        origin = instruction[1];

        console.info('origin:         '+origin);

        if(validIndex(memory, origin)) origin = memory[origin];
        else
        if(origin=='ZERO') origin = 0;
        else if(origin=='ONE') origin = 1;
        else if(origin=='IN') {
                origin = parseInt(prompt());
                console.log(origin+'\t\t in: #'+inputMarkerCounter++);
                if(origin!=0 && origin!=1){
                        console.error('forced exit: input is not 0 nor 1');
                        break;
                }
        } else {
                console.error('forced exit: instruction not valid (origin field not valid)');
                break; 
        }

        if(origin!=0 && origin!=1){
                console.error('forced exit: origin is not 0 nor 1');
                break;
        }

        // copy origin to destination
        destination = instruction[0];
        
        console.info('destination:    '+destination);

        if(validIndex(memory, destination)) memory[destination] = origin;
        else
        if(destination=='PATHSEL') pathSel = origin;
        else if(destination=='OUT') console.log(origin+'\t\t out: #'+outputMarkerCounter++);
        else {
                console.error('forced exit: instruction not valid (destination field not valid)');
                break; 
        }

        // path selection

        if(pathSel!=0 && pathSel!=1){
                console.error('forced exit: pathSel is not 0 nor 1');
                break;
        }

        nextProgramIndex = instruction[2+pathSel];
        if(validIndex(program, nextProgramIndex)) programIndex=nextProgramIndex;
        else
        if(nextProgramIndex=='EXIT'){
                programIndex=nextProgramIndex;
                console.info('exit');
                break; 
        } else {
                console.error('forced exit: instruction not valid (nextProgramIndex field not valid)');
                break; 
        }
}

