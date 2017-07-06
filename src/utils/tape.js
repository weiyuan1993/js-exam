const tryCatchPatch = (t) => (description, testBlock) => {
  try {
    t.comment(description);
    testBlock(t);
  } catch(e) {
    t.fail(e);
  }
}

const combinePatch = (tape, patches) => (...args) => {
  const [cb] = args.slice(-1);
  if(typeof cb !== 'function') {
    throw new Error('should provide callback');
  }
  tape(...args.slice(0, -1), t => {
    for ( let key in patches ){
      t[key] = patches[key](t)
    }
    try {
      cb(t);
    } catch (e){
      t.fail(e);
    }
  })
};

const getPatchedTape = () => {
	delete require.cache[require.resolve('tape')];
	const tape = require('tape'); 
	require('tape-dom')(tape);
	return combinePatch(tape,{
    subtest : tryCatchPatch ,
    should : tryCatchPatch
  }) ;
}

export default getPatchedTape ;