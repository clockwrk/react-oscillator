$(function(){
  'use strict';

  var sound, oscillator, gain, distortion, originalYPosition, originalFrequency,
      frequencies = [
        65,	69,	73,	78,	82,	87,	93, 98,	104,	110,	117, 124, 262,	277,	294,	311,	330,	349,	370,
        392, 415,	440,	466,	494, 1047,	1109,	1175,	1245,	1319,	1397,	1480,	1568,	1661,	1760,	1865,	1976
      ],
      instrumentNode = document.getElementById('instrument'),
      instrumentWidth = instrument.offsetWidth,
      instrumentHeight = instrument.offsetHeight,
      mouseXPosition = window.clientX,
      mouseYPosition = window.clientY;

  instrument.style.background = 'repeating-linear-gradient(to right, #999999, #999999 50%, #333333 50%, #333333)';
  instrument.style.backgroundSize = ((instrumentWidth/frequencies.length)*2) + 'px 100%';

var audioContext = (window.audioContext || window.webkitAudioContext);
sound = new audioContext();

instrument.addEventListener('mousedown', function(e){
    oscillator =  sound.createOscillator();

    oscillator.type = 'sine';
    oscillator.value = 110;
    oscillator.start();

    oscillator.connect(sound.destination);

    instrument.addEventListener('mousemove', function(e){
      instrument.style.backgroundSize = ((instrumentWidth/frequencies.length)*2) + 'px 100%';

    }, false); // mousemove
}, false); //mousedown

instrument.addEventListener('mouseup', function() {
  oscillator.stop();
  instrument.removeEventListener('mousemove');
})


})
