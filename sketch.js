// Canonical: part of Duets in Latent Spaces
// Concept and programming by Marlon Barrios Solano

// Variables for snapshots and controlling playback/recording
var snapShots = []; // Array to store webcam snapshots
var counter = 0; // Counter to track the current snapshot
var total = 131; // Total number of snapshots to cycle through
var song; // Variable to hold the sound file
let videoRecorder; // Variable to hold the video recorder object
let capture; // Variable to hold the webcam capture
let videoPlayback; // Variable to hold the playback video element
let go = false; // Flag to indicate when the webcam feed is ready

// Constants for grid layout
const rows = 10; // Fixed number of rows for the grid
const cols = 12; // Fixed number of columns for the grid

// Setup function runs once when the program starts
function setup() {
  // Create a canvas that covers the entire window
  let canvas = createCanvas(windowWidth, windowHeight);

  // Load the sound file and call the 'loaded' function when ready
  song = loadSound("canon-in-d.mp3", loaded);

  // Set the background color to black
  background(0);

  // Start capturing the webcam video, with 'ready' as the callback when ready
  capture = createCapture(VIDEO, ready);

  // Set the capture resolution for the webcam feed
  capture.size(160, 120);

  // Hide the capture element (so it only shows in the canvas)
  capture.hide();

  // Initialize a new video recorder instance to record the canvas
  videoRecorder = new p5.VideoRecorder();

  // Set the callback to handle the video once the recording is ready
  videoRecorder.onFileReady = showPlayback;
}

// Function to handle resizing the canvas when the window size changes
function windowResized() {
  // Dynamically resize the canvas to always cover the entire window
  resizeCanvas(windowWidth, windowHeight);
}

// Function called when the sound file is loaded
function loaded() {
  console.log('Sound file loaded');
}

// Function called when the webcam capture is ready
function ready() {
  go = true; // Set the flag to true to start capturing snapshots
}

// The draw function runs in a loop and updates the canvas
function draw() {
  // If the webcam is ready, capture the frame and store it in the array
  if (go) {
    snapShots[counter] = capture.get(); // Capture the current frame
    counter++; // Increment the counter
    if (counter == total) {
      counter = 0; // Loop back to the start when reaching the total number of snapshots
    }
  }

  // Calculate the width and height of each cell based on the canvas size
  var w = width / cols; // Cell width is canvas width divided by the number of columns
  var h = height / rows; // Cell height is canvas height divided by the number of rows
  var x = 0; // Starting x-coordinate for the first cell
  var y = 0; // Starting y-coordinate for the first cell

  // Loop through the snapshots array and display each one in the grid
  for (var i = 0; i < snapShots.length; i++) {
    var index = (i + frameCount) % snapShots.length; // Get the current snapshot to display
    image(snapShots[index], x, y, w, h); // Draw the snapshot on the canvas

    // Update the x-coordinate to move to the next column
    x += w;

    // If the x-coordinate exceeds the canvas width, reset it and move to the next row
    if (x >= width) {
      x = 0;
      y += h; // Move down to the next row
    }

    // Stop the loop if the y-coordinate exceeds the canvas height (i.e., no more rows)
    if (y >= height) {
      break;
    }
  }
}

// Function to handle key presses for controlling the interface
function keyPressed() {
  // 'p' to toggle playing or stopping the sound
  if (key === 'p') {
    togglePlaying();
  }

  // 'r' to start recording the canvas and sound
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

  // 'q' to play the recorded video
  if (key === 'q') {
    playVideo();
  }
}

// Function to toggle playing or stopping the sound
function togglePlaying() {
  if (!song.isPlaying()) {
    song.play(); // Play the song if it's not currently playing
    song.setVolume(0.5); // Set the volume to 50%
    console.log("Music Playing");
  } else {
    song.stop(); // Stop the song if it's already playing
    console.log("Music Stopped");
  }
}

// Function to start recording the canvas and sound
function startRecording() {
  console.log("Recording started");
  videoRecorder.start(); // Start the video recorder
}

// Function to stop recording
function stopRecording() {
  console.log("Recording stopped");
  videoRecorder.stop(); // Stop the video recorder
}

// Function to play the recorded video
function playVideo() {
  if (videoPlayback) {
    videoPlayback.play(); // Play the recorded video
    console.log("Playing recorded video");
  }
}

// Function to download the recorded video file
function downloadVideo() {
  if (videoRecorder.url) {
    videoRecorder.save("canonical"); // Save the video file with the name 'canonical'
    console.log("Video downloaded");
  }
}

// Function to handle the video playback once recording is ready
function showPlayback() {
  videoPlayback = createVideo(videoRecorder.url); // Create a video element with the recorded video
  videoPlayback.hide(); // Hide the video element (it will be displayed on the canvas)
  console.log("Recording ready for playback");
}
