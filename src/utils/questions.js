const questionList = [
  {
    name: 'countChar',
    content:`
/**
 * Implement the function 'countChar'
 * to count the occurance of each character for the input string, 
 * and return an object containing those information.
 *
 * For example :
 *  input string: 'abca'
 *
 *	returned object: 
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
    name: 'adder',
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
  }
]

export default questionList;