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

describe('countChar', () => {
  it('should return character count in an object', () => {
    const result = countChar();
    expect(typeof result).to.equal('object');
  })
	
  it('should be able to count chars', () => {
    const input = 'abca';
    const result = countChar(input);
    expect(result.a).to.equal(2);
    expect(result.b).to.equal(1);
  })
  
  it('should be able count some longer string as well', () => {
    const input = 'The Quick Brown Fox Jumps Over The Lazy Dog';
    const result = countChar(input);
    expect(result[' ']).to.equal(8);
    expect(result.T).to.equal(2);
    expect(result.o).to.equal(3);
  })
})

/*********************************/
    `
  }, {
    name: 'adder',
    content: `
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

describe('countChar', () => {
	it('should return character count in an object', () => {
		const result = countChar();
		expect(typeof result).to.equal('object');
	})
	
  it('should be able to count chars', () => {
    const input = 'abca';
    const result = countChar(input);
    expect(result.a).to.equal(2);
    expect(result.b).to.equal(1);
  })
  
  it('should be able count some longer string as well', () => {
    const input = 'The Quick Brown Fox Jumps Over The Lazy Dog';
    const result = countChar(input);
    expect(result[' ']).to.equal(8);
    expect(result.T).to.equal(2);
    expect(result.o).to.equal(3);
  })
})

/*********************************/
    `
  }
]

export default questionList;