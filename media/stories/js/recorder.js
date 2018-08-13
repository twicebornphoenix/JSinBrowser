'use strict';

if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function (constraints) {
    var getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }
    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}

function createThumbnail(video) {
  return new Promise((done, fail) => {
    const preview = document.createElement('video');
    preview.src = URL.createObjectURL(video);
    preview.addEventListener('loadeddata', () => preview.currentTime = 2);
    preview.addEventListener('seeked', () => {
      const snapshot = document.createElement('canvas');
      const context = snapshot.getContext('2d');
      snapshot.width = preview.videoWidth;
      snapshot.height = preview.videoHeight;
      context.drawImage(preview, 0, 0);
      snapshot.toBlob(done);
    });
  });
}

function record(app) {
  return new Promise((done, fail) => {
    app.mode = 'preparing';
    navigator.mediaDevices.getUserMedia(app.config)
      .then(stream => {
        app.mode = 'recording';
        app.preview.srcObject = stream;

        let recorder = new MediaRecorder(stream);
        let chunks = [];
        recorder.addEventListener('dataavailable', e => chunks.push(e.data));
        recorder.addEventListener('stop', e => {
          const recorded = new Blob(chunks, {'type': recorder.mimeType});

          chunks = null;
          app.preview.srcObject = null;
          stream.getTracks().forEach(track => track.stop());
          recorder = stream = null;

          createThumbnail(recorded)
            .then(photo => {
              app.mode = 'sending';
              done({video: recorded, frame: photo});
            });
        });
        recorder.start(1000);

        setTimeout(() => {recorder.stop()}, app.limit);
      })
      .catch(er => {fail(er)});
  });
}
