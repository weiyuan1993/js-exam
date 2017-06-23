const questionList = [
  {
    name: "countChar",
    content: `
/**
 * Implement the function 'countChar'
 * to count the occurance of each character for the input string, 
 * and return an object containing those information.
 *
 * For example :
 *  input string: 'abca'
 *
 *  returned object: 
 *  {
 *     a: 2,
 *     b: 1,
 *     c: 1 
 *  }
 */

/**
 * Implement function body
 */
function countChar(s) {

}

/** DO NOT modify anything below **/

test((t) => {
  t.comment('should return character count in an object');
  {
    const result = countChar();
    t.equal(typeof result, 'object');
  }
  t.comment('should be able to count chars');
  {
    const input = 'abca';
    const result = countChar(input);
    t.equal(result.a, 2);
    t.equal(result.b, 1);
  }
  t.comment('should be able count some longer string as well');
  {
    const input = 'The Quick Brown Fox Jumps Over The Lazy Dog';
    const result = countChar(input);
    t.equal(result[' '], 8);
    t.equal(result.T, 2);
    t.equal(result.o, 3);
  }
})

/*********************************/
    `
  },
  {
    name: "adder",
    content: `
/**
 * Implement a function 'adder'
 * which behavior is like the following example
 * 
 * ex:
 *   addTen = adder(10) 
 *   addFive = adder(5) 
 *   
 *   addTen(10)  // return 20
 *   addFive(10) // return 15
*/

/**
 * Implement function body
 */
function adder() {
}

/** DO NOT modify anything below **/

test((t) => {
  t.comment('should return a function');
  {
    t.equal(typeof adder(), 'function');
  }
  t.comment('should be able to add two numbers');
  {
    const add5 = adder(5);
    t.equal(add5(10), 15);
    t.equal(add5(20), 25);
    
    t.equal(adder(40)(2), 42);
  }
})

/*********************************/
    `
  },
  {
    name: "batchRegister",
    content: `
/**
 * We'd like to dynamically create a bunch of element and register click event to each of them,
 * and once the click event is triggered, we can get the element's index information
 * by executing the callback we pass in.
 * However, there is a bug in 'batchRegister' function, so the passed index is always wrong.
 * Please modify 'batchRegister' function to fix the bug.
 */


/**
 * Function to batch register event
 *
 * Please modify this function body
 */
function batchRegister(eleList, callback = console.log) {
  for (var i = 0; i < eleList.length; i++) {
    var ele = eleList[i];
    ele.addEventListener('click', function() {
      callback(i);
    });
  }
}

/** DO NOT modify anything below **/

/**
 * Function to batch create elements
 */
const batchCreate = (count, elemName = 'button') => {
  return Array(count).fill(0).map(() => document.createElement(elemName));
}

test((t) => {
  t.comment('should log correspoding index in console');
  const log;
  try {
    log = sinon.spy(console, 'log');
  } catch(e) {}
  
  const btnCount = 5567;
  const btnList = batchCreate(btnCount);
  
  batchRegister(btnList);
  
  [5, 6, 56, 556, 5566].forEach(v => {
      btnList[v].click();
      sinon.assert.calledWith(log, v);
  })
  /*
  for(var i of [5, 6, 56, 556, 5566]) {
    btnList[i].click();
    sinon.assert.calledWith(log, i);
  }
  */
  
  console.log.restore();
})

/*********************************/
`
  },
  {
    name: "sequential",
    content: `
/**
 * Implement the function 'sequential'
 * to execute async functions in sequence.
 * 
 * 'sequential' takes an array of async functions as parameter,
 * and execute each of them after previous one has done.
 */

/**
 * Implement function body
 */
function sequential(tasks = []) {
	
}

/** DO NOT modify anything below **/

let result = [];

function asyncTask1(done) {
  setTimeout(() => {
    console.log('task 1 done');
    result.push(1);
    done(1);
  }, 500);
}
function asyncTask2(done) {
  setTimeout(() => {
    console.log('task 2 done');
    result.push(2);
    done(2);
  }, 400);
}
function asyncTask3(done) {
  setTimeout(() => {
    console.log('task 3 done');
    result.push(3);
    done(3);
  }, 300);
}

const tasks = [asyncTask1, asyncTask2, asyncTask3];

test((t) => {
  t.comment('should be able to run things in sequence');
  {
    result = [];
		const clock = sinon.useFakeTimers();
    //const log = sinon.spy(console, 'log');
    //try {
      sequential(tasks);
      //sinon.assert.notCalled(log);
      t.equal(result.length, 0);
      clock.tick(600);
      t.equal(result.length, 1);
      //sinon.assert.calledOnce(log);
      //sinon.assert.calledWith(log, 'task 1 done');
      clock.tick(600);
      t.equal(result.length, 3);
      //sinon.assert.callCount(log, 3);
      //sinon.assert.calledWith(log, 'task 3 done');
    //} catch(e) {}
    //console.log.restore();
  };
});


/*********************************/
    `
  }
];

export default questionList;