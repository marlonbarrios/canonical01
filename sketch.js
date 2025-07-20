// Canonical: part of Duets in Latent Spaces
// Concept and programming by Marlon Barrios Solano
// Code fixed and refined by Gemini

// --- Configuration ---
const rows = 10; // Fixed number of rows for the grid
const cols = 12; // Fixed number of columns for the grid
const total = rows * cols; // Total number of snapshots to match the grid

// --- State Variables ---
let snapShots = []; // Array to store webcam snapshots
let capture; // Webcam capture object
let song; // Sound file

let counter = 0; // Counter to track the current snapshot being written
let go = false; // Flag to indicate when the webcam feed is ready
let isBufferReady = false; // Flag to check if the snapshot buffer is full

// --- Recording Variables ---
let videoRecorder;
let videoPlayback;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  // Initialize webcam capture
  capture = createCapture(VIDEO, () => {
    go = true; // Set the ready flag when the camera stream starts
    console.log("Webcam ready.");
  });
  capture.size(160, 120);
  capture.hide();

  // Load the sound file. Make sure 'canon-in-d.mp3' is in your project folder.
  song = loadSound("canon-in-d.mp3", () => {
    console.log('Sound file loaded.');
  });

  // Initialize the video recorder
  videoRecorder = new p5.VideoRecorder();
  videoRecorder.onFileReady = showPlayback;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  // --- Step 1: Continuously capture frames to fill our buffer ---
  // We check capture.width to ensure the video has fully initialized
  if (go && capture.width > 0) {
    snapShots[counter] = capture.get(); // Store the current frame
    counter = (counter + 1) % total; // Increment counter and loop back

    // Check if the buffer has been filled for the first time
    if (!isBufferReady && counter === 0 && snapShots.length >= total) {
      isBufferReady = true;
      console.log("Snapshot buffer is full. Starting animation.");
    }
  }

  // --- Step 2: Draw the grid only when the buffer is ready ---
  if (isBufferReady) {
    const w = width / cols;
    const h = height / rows;

    // Loop through each cell of the grid from top to bottom
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {

        // **FIX:** Calculate an index that reverses the vertical order.
        // This makes the bottom row (j=9) correspond to a recent frame (less delay)
        // and the top row (j=0) correspond to an older frame (more delay).
        const reversedRow = (rows - 1) - j;
        const timeDelayIndex = reversedRow * cols + i;

        // Combine with frameCount to create the animated ripple effect
        // The '% total' ensures the index wraps around within the array's bounds.
        const snapshotIndex = (frameCount + timeDelayIndex) % total;

        // Draw the corresponding snapshot in the grid cell
        if (snapShots[snapshotIndex]) {
          image(snapShots[snapshotIndex], i * w, j * h, w, h);
        }
      }
    }
  } else {
    // Show a loading message until the buffer is full
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    text('Loading camera buffer...', width / 2, height / 2);
  }
}

// --- User Interaction Functions ---

function keyPressed() {
  switch (key.toLowerCase()) {
    case 'p':
      togglePlaying();
      break;
    case 'r':
      startRecording();
      break;
    case 's':
      stopRecording();
      break;
    case 'd':
      downloadVideo();
      break;
    case 'q':
      playVideo();
      break;
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(0.5);
    console.log("Music Playing (Press 'p' to stop)");
  } else {
    song.stop();
    console.log("Music Stopped (Press 'p' to play)");
  }
}

function startRecording() {
  if (videoRecorder.recording) {
    console.log("Already recording.");
    return;
  }
  console.log("Recording started (Press 's' to stop)");
  videoRecorder.start();
}

function stopRecording() {
  if (!videoRecorder.recording) {
    console.log("Not currently recording.");
    return;
  }
  console.log("Recording stopped");
  videoRecorder.stop();
}

function playVideo() {
  if (videoPlayback) {
    videoPlayback.play();
    console.log("Playing recorded video");
  } else {
    console.log("No video has been recorded yet. Press 'r' to record, then 's' to stop.");
  }
}

function downloadVideo() {
  if (videoRecorder.url) {
    videoRecorder.save("canonical_delay_video");
    console.log("Video download initiated.");
  } else {
     console.log("No video has been recorded yet. Press 'r' to record, then 's' to stop.");
  }
}

function showPlayback() {
  videoPlayback = createVideo(videoRecorder.url);
  videoPlayback.hide(); // Hide the default video element
  console.log("Recording ready for playback. Press 'q' to play or 'd' to download.");
}
