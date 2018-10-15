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
`,
    test: `
test('countChar test', (t) => {
  t.subtest('should return character count in an object', t => {
    const result = countChar();
    t.equal(typeof result, 'object');
  });
  t.subtest('should be able to count chars', t => {
    const input = 'abca';
    const result = countChar(input);
    t.equal(result.a, 2);
    t.equal(result.b, 1);
  });
  t.subtest('should be able count some longer string as well', t => {
    const input = 'The Quick Brown Fox Jumps Over The Lazy Dog';
    const result = countChar(input);
    t.equal(result[' '], 8);
    t.equal(result.T, 2);
    t.equal(result.o, 3);
  });
})

`
  },
  {
    name: "forEach, map and reduce",
    content: `
/**
 * Implement the function 'forEach, map and reduce'
 *
 */

/**
 * Implement function body
 */
const myForEach = function (array, callback) {

}

const myMap = function (array, callback) {

}

const myReduce = function (array, callback, initValue) {

}

`,
    test: `
test('forEach, map and reduce test', (t) => {
  t.subtest('should execute forEach correctly', t => {
    let count = 0;
    myForEach([1, 2, 3, 4], (val, index) => count += val * index * index);
    t.equal(count, 50);
  });
  t.subtest('should execute map correctly', t => {
    const result = myMap([1, 2, 3, 4], (val, index) => val * index * index);
    t.equal(result[0], 0);
    t.equal(result[2], 12);
  });
  t.subtest('should execute reduce correctly', t => {
    const result = myReduce([10, 2, 3], (cal, val, index) => cal + val * index, 0);
    t.equal(result, 8);
  });
});

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

`,
    test: `
test('adder test', (t) => {
  t.subtest('should return a function', t => {
    t.equal(typeof adder(), 'function');
  });
  t.subtest('should be able to add two numbers', t => {
    const add5 = adder(5);
    t.equal(add5(10), 15);
    t.equal(add5(20), 25);

    t.equal(adder(40)(2), 42);
  });
})

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

`,
    test: `
function asyncTask1(done) {
  setTimeout(() => {
    console.log('task 1 done');
    done(1);
  }, 500);
}
function asyncTask2(done) {
  setTimeout(() => {
    console.log('task 2 done');
    done(2);
  }, 400);
}
function asyncTask3(done) {
  setTimeout(() => {
    console.log('task 3 done');
    done(3);
  }, 300);
}

const tasks = [asyncTask1, asyncTask2, asyncTask3];

test('sequential test', (t) => {
  const log = spy(console, 'log');
  sequential(tasks);
  t.equal(log.callCount(), 0);
  clock.tick(600);
  t.equal(log.callCount(), 1);
  t.ok(log.calledWith('task 1 done'));
  clock.tick(600);
  t.equal(log.callCount(), 3);
  t.ok(log.calledWith('task 3 done'));
});

    `
  },
  {
    name: 'parallel',
    content: `
/**
 * Implement the function 'parallel'
 * to execute async functions at once.
 *
 * 'parallel' takes an array of async functions as parameter,
 * and execute each of them in the same time.
 *
 */

/**
 * Implement function body
 */
function parallel(tasks = [], callback) {
}

`,
    test: `
function asyncTask1(done) {
  setTimeout(() => {
    console.log('task 1 done');
    done(1);
  }, 500);
}
function asyncTask2(done) {
  setTimeout(() => {
    console.log('task 2 done');
    done(2);
  }, 400);
}
function asyncTask3(done) {
  setTimeout(() => {
    console.log('task 3 done');
    done(3);
  }, 300);
}

const tasks = [asyncTask1, asyncTask2, asyncTask3];

test('parallel test', t => {
  t.subtest('should run all tasks at once', t => {
    const spyLog = spy(console, 'log');
    parallel(tasks, (result) => { /* do nothing */ });
    t.equal(spyLog.callCount(), 0);
    clock.tick(600);
    t.equal(spyLog.callCount(), 3);
  });

  t.subtest('should get task result in an array', t => {
    let obj = {};
    parallel(tasks, (result) => {
      obj.result = result;
    });
    clock.tick(600);
    t.deepEqual(obj.result, [1, 2, 3]);
  });

  t.subtest('should trigger callback only once', t => {
    let count = 0;
    const callback = () => count++;

    parallel(tasks, callback);
    clock.tick(300);
    t.equal(count, 0);
    clock.tick(600);
    t.equal(count, 1);
  });
});

`
  },
  {
    name: 'combineReducers',
    content: `
// http://redux.js.org/docs/api/combineReducers.html
function combineReducers(reducers) {
}

function calc(state = 0, action) {
  switch(action.type) {
    case 'ADD':
      return state + 1;
    case 'DEC':
      return state - 1;
    default:
      return state;
  }
}

function calledCount(state = 0, action) {
  if(action.type == 'CALL') {
    return state + 1;
  }
  return state;
}

`,
    test: `
test('combineReducers', t => {
  const reducer = combineReducers({
    calc: calc,
    calls: calledCount,
  });

  t.subtest('should init states', t => {
    let state = {};
    state = reducer(state, {type: ''});
    t.equal(state.calc, 0);
    t.equal(state.calls, 0);
  });

  t.subtest('should handle actions', t => {
    let state = {};
    state = reducer(state, {type: 'ADD'});
    t.equal(state.calc, 1);
    state = reducer(state, {type: 'ADD'});
    t.equal(state.calc, 2);
  });
})
`
  },
  {
    name: 'explain',
    content: `
// explain the purpose of following code;
// modify variable name and/or code style when appropriate;
// add comments where you see fit
function foo(a, b) {
  var c = [];
  for(var i0 = 0, i1 = 0; i0 < a.length && i1 < b.length; ) {
    if(a[i0] < b[i1]) {
      c.push(a[i0++]);
    }
    if(a[i0] >= b[i1]) {
      c.push(b[i1++]);
    }
  }
  if(i0 < a.length) {
    for(var i = i0; i < a.length; i++) {
      c.push(a[i]);
    }
  }
  if(i1 < b.length) {
    for(var i = i1; i < b.length; i++) {
      c.push(b[i]);
    }
  }
  return c;
}

console.log(foo([1,4,5], [2,3,6]))
`
  },
  {
    name: 'mergeSort',
    content: `
// implement function merge, so mergeSort can run correctly
function merge(arr1, arr2) {
  // TODO enter your code here
  return arr1;
}

function mergeSort(arr) {
  if(arr.length <= 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const sortedArr1 = mergeSort(arr.slice(0, mid));
  const sortedArr2 = mergeSort(arr.slice(mid));
  return merge(sortedArr1, sortedArr2);
}

`,
    test: `
test('mergeSort', t => {
  t.deepEqual(mergeSort([6,3,5,10,2,100,4,1]),[1,2,3,4,5,6,10,100]);
  const randomNumbers = Array.from({length: 20})
    .map(() => Math.floor(Math.random() * 100));
  const sorted = randomNumbers.slice(0).sort((a, b) => a - b);
  t.deepEqual(mergeSort(randomNumbers), sorted);
})
`
  },
];

export default questionList;
