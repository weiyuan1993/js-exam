import _ from 'underscore';
import sinon from 'sinon';
import vm from 'vm';
import spy from './spy';
import getPatchedTape from './tape';
import { calendarFormat } from '../../node_modules/moment';

const wrapCode = (code = '') => {
  return code.replace(/for *\(.*\{|while *\(.*\{|do *\{/g, (loopHead) => {
    return `let count = 0;
      const detector = (c) => {
        if (c > 100000) {
          throw new Error('infinite');
        }
      }
      ${loopHead}
      detector(count++);
    `;
  });
}

const runCode = (code, wrappedConsole) => {
  const test = getPatchedTape();
  // should hijack setTimeout before pass to sandbox
  const clock = sinon.useFakeTimers();
  const sandbox = {
    setTimeout: window.setTimeout, // need to be passed also...
    console: wrappedConsole,
    sinon,   
    describe: test,
    test,
    clock,
    spy
  };
  const script = new vm.Script(wrapCode(code));
  const context = new vm.createContext(sandbox);
  script.runInContext(context);
  clock.restore();
}
const debouncedRunCode = _.debounce(runCode, 200);

export default debouncedRunCode ;