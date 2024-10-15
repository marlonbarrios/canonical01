// Space-time Loop 1: Webcam Generative Dances
// Concept and programming by Marlon barrios Solano

var snapShots = [];
var counter = 0;
var total = 131;
var song;
let videoRecorder;
let capture;
let videoPlayback;
let go = false;

function setup() {
  // Create canvas to cover the entire window
  let canvas = createCanvas(windowWidth, windowHeight);
  song = loadSound("canon-in-d.mp3", loaded);
  background(0);

  // Capture webcam video
  capture = createCapture(VIDEO, ready);
  capture.size(160, 120);
  capture.hide();

  // Create a new VideoRecorder instance
  videoRecorder = new p5.VideoRecorder();
  videoRecorder.onFileReady = showPlayback;
}

function windowResized() {
  // Resizes canvas dynamically when window size changes
  resizeCanvas(windowWidth, windowHeight);
}

function loaded() {
  console.log('Sound file loaded');
}

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

  var w = 80;
  var h = 60;
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

// Key controls interface
function keyPressed() {
  // 'p' to play or stop the song
  if (key === 'p') {
    togglePlaying();
  }

  // 'r' to start recording
  if (key === 'r') {
    startRecording();
  }

  // 's' to stop recording
  if (key === 's') {
    stopRecording();
  }

  // 'd' to download the recorded video
  if (key === 'd') {
    downloadVideo();
  }

  // 'q' to play the video recording
  if (key === 'q') {
    playVideo();
  }
}

// Function to toggle the music playing
function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(0.5);
    console.log("Music Playing");
  } else {
    song.stop();
    console.log("Music Stopped");
  }
}

// Start recording
function startRecording() {
  console.log("Recording started");
  videoRecorder.start();
}

// Stop recording
function stopRecording() {
  console.log("Recording stopped");
  videoRecorder.stop();
}

// Play the recorded video
function playVideo() {
  if (videoPlayback) {
    videoPlayback.play();
    console.log("Playing recorded video");
  }
}

// Download the recorded video
function downloadVideo() {
  if (videoRecorder.url) {
    videoRecorder.save("canonical");
    console.log("Video downloaded");
  }
}

// Show the video playback after recording
function showPlayback() {
  videoPlayback = createVideo(videoRecorder.url);
  videoPlayback.hide(); // hide video element (display on canvas)
  console.log("Recording ready for playback");
}
