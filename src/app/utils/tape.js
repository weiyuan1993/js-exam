import { createHarness } from 'tape';

const tryCatchPatch = t => (description, testBlock) => {
  try {
    t.comment(description);
    testBlock(t);
  } catch (e) {
    t.fail(e);
  }
};

const combinePatch = (tape, patches) => (...args) => {
  console.log('#combinePatch', tape, patches);
  const [cb] = args.slice(-1);
  if (typeof cb !== 'function') {
    throw new Error('should provide callback');
  }
  tape(...args.slice(0, -1), (t) => {
    for (let key in patches) {
      t[key] = patches[key](t);
    }
    try {
      console.log('#combinePatch taped t', t);
      cb(t);
    } catch (e) {
      t.fail(e);
    }
  });
};

const getPatchedTape = (onUpdate) => {
  const harness = createHarness();
  const stream = harness.createStream({ objectMode: true });
  console.log('#stream', stream)
  // stream.off('data', onUpdate); //#debug
  stream.on('data', onUpdate);
  console.log('#getPatchedTape / update tape action here!!!');
  return combinePatch(harness, {
    subtest: tryCatchPatch,
    should: tryCatchPatch
  });
};

export default getPatchedTape ;