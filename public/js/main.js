$(function() {
  'use strict';

  function makeDistortionCurve(amount) {
    var k = typeof amount === 'number' ? amount : 50,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;
    for (; i < n_samples; ++i) {
      x = i * 2 / n_samples - 1;
      curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
    }
    return curve;
  };

  var sound, oscillator, gain, distortion, originalYPosition, originalFrequency,
    frequencies = [
      262, 277, 294, 311, 330, 349, 370, 392, 415, 440, 466, 494, 523,
      392, 415, 440, 466, 494, 523, 554, 587, 622, 659, 698, 740, 784, 831, 880
    ],
    instrumentNode = document.getElementById('instrument'),
    instrumentWidth = instrument.offsetWidth,
    instrumentHeight = instrument.offsetHeight,
    mouseXPosition = window.clientX,
    mouseYPosition = window.clientY;

  instrument.style.background = 'repeating-linear-gradient(to right, #999999, #999999 50%, #333333 50%, #333333)';
  instrument.style.backgroundSize = ((instrumentWidth / frequencies.length) * 2) + 'px 100%';

  var audioContext = (window.AudioContext || window.webkitAudioContext);
  console.log(audioContext)
  sound = new audioContext();

  instrument.addEventListener('mousedown', function(e) {

    mouseYPosition = e.clientY;
    mouseXPosition = e.clientX;
    originalYPosition = mouseYPosition;

    oscillator = sound.createOscillator();

    oscillator.type = 'square';

    originalFrequency = frequencies[Math.floor((mouseXPosition / instrumentWidth) * frequencies.length)];
    console.log('frequency ', originalFrequency)
    console.log('mouseX position ', mouseXPosition);


    oscillator.frequency.value = originalFrequency;
    oscillator.start();

    distortion = sound.createWaveShaper();
    distortion.curve = makeDistortionCurve(500);
    distortion.oversample = '4x';

    gain = sound.createGain();
    gain.gain.value = 0.1;

    oscillator.connect(distortion);
    distortion.connect(gain);
    gain.connect(sound.destination);

    instrument.addEventListener('mousemove', function(e) {

      var distanceY = e.clientY - originalYPosition;
      mouseXPosition = e.clientX;
      instrumentWidth = instrument.offsetWidth;


      gain.gain.value = mouseXPosition/instrumentWidth;
      oscillator.frequency.value = originalFrequency + distanceY;

      instrument.style.backgroundSize = ((instrumentWidth / frequencies.length) * 2) + 'px 100%';

    }, false); // mousemove
  }, false); //mousedown

  instrument.addEventListener('mouseup', function() {
    oscillator.stop();
    instrument.removeEventListener('mousemove');
  })


})
