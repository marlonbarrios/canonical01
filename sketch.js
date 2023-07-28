// Space-time Loop 1: Webcam Generative Dances
// Bottom-up 
// Concept and programming by Marlon barrios Solano

var snapShots = [];
var counter = 0;
var total = 125;
var song;
let canvas;

let videoRecorder;
let capture;
let videoPlayback;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);

  song = loadSound("canon-in-d.mp3", loaded);
  background(0);
  capture = createCapture(VIDEO, ready);
  canvas.position(x, y);

  capture.size(width/10, height/10);

  // Create a webcam capture with video and audio
  capture = createCapture({ video: true, audio: true });

  // Mute webcam audio to prevent feedback
  capture.volume(0);

  // Hide capture element (because it will be displayed on canvas instead)
  capture.hide();

  // Create a new VideoRecorder instance with webcam capture as input
  videoRecorder = new p5.VideoRecorder();

  // Set callback for when recording is completed and video file has been created
  videoRecorder.onFileReady = showPlayback;
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(0.5);
  } else {
    song.stop();
  }
}

function loaded() {
  console.log('loaded');
}

var go = false;

function ready() {
  go = true;
}

function draw() {
  if (go) {
    snapShots[counter] = capture.get();
    counter++;
    if (counter == total) {
      counter = 0;
    }
  }

  var w = width / 10;
  var h = height / 10;
  var x = 0;
  var y = 0;
  for (var i = 0; i < snapShots.length; i++) {
    var index = (i + frameCount) % snapShots.length;
    image(snapShots[index], x, y, w, h);
    x = x + w;
    if (x > width) {
      x = 0;
      y = y + h;
    }
  }
}

function startRecording() {
  videoRecorder.start();
}

function showPlayback() {
  // Create video element to display recording
  videoPlayback = createVideo(videoRecorder.url);
  
  // Hide video element (because it will be displayed on canvas instead)
  videoPlayback.hide();
}

function keyPressed() {
  if (keyCode === 80) { // 'p' key for playing the song
    togglePlaying();
  } else if (keyCode === 82) { // 'r' key for starting recording
    startRecording();
  } else if (keyCode === 83) { // 's' key for stopping recording
    videoRecorder.stop();
  } else if (keyCode === 84) { // 't' key for pausing recording
    videoRecorder.pause();
  } else if (keyCode === 68) { // 'd' key for downloading the video file
    videoRecorder.save("canonical");
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);
}
