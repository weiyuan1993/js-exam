let recorder = null;

export function startRecording() {
  /* eslint-disable camelcase, indent */
  if (typeof RecordRTC_Extension === 'undefined') {
    console.log('RecordRTC chrome extension is either disabled or not installed.');
    return;
  }
  /* eslint-disable-rule no-undef */
  if (recorder === null) {
    recorder = new window.RecordRTC_Extension();
    recorder.startRecording({
      enableScreen: true,
      enableMicrophone: true,
    });
  }
  /* eslint-enable-rule no-undef */
}

export function stopRecording(callback) {
  if (recorder !== null) {
    recorder.stopRecording(blob => {
      if (blob) {
        console.log(blob.size, blob);
        const url = URL.createObjectURL(blob);
        callback(blob, url);
      }
      recorder = null;
    });
  }
}
