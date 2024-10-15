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

const rows = 10; // Fixed number of rows
const cols = 12; // Fixed number of columns

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

  // Calculate the width and height of each grid cell based on canvas size
  var w = width / cols;
  var h = height / rows;
  var x = 0;
  var y = 0;

  // Loop through the snapshots and place them in the grid
  for (var i = 0; i < snapShots.length; i++) {
    var index = (i + frameCount) % snapShots.length;
    image(snapShots[index], x, y, w, h);
    x += w;
    if (x >= width) {
      x = 0;
      y += h;
    }
    if (y >= height) {
      break; // Ensure we don't exceed the available rows
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
