// Canonical: part of Duets in Latent Spaces
// Concept and programming by Marlon Barrios Solano
// Code fixed and refined by Gemini for a clear, sequential bottom-to-top delay

// --- Configuration ---
const rows = 10;
const cols = 12;
const total = rows * cols; // Total snapshots needed to fill the grid delay
const captureWidth = 160;
const captureHeight = 120;

// --- State Variables ---
let snapShots = [];
let capture;
let song;
let flippedCapture; // Graphics buffer for flipping the camera

let counter = 0; // Tracks the write position in our circular buffer
let go = false; // Flag for when webcam is ready
let isBufferReady = false; // Flag to start drawing only when buffer is full

// --- Recording Variables ---
let videoRecorder;
let videoPlayback;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  // Initialize webcam capture
  capture = createCapture(VIDEO, () => {
    go = true;
    console.log("Webcam ready. Filling buffer...");
  });
  capture.size(captureWidth, captureHeight);
  capture.hide();

  // **NEW**: Create a graphics buffer to handle the horizontal flip
  flippedCapture = createGraphics(captureWidth, captureHeight);

  // Load sound file (ensure 'canon-in-d.mp3' is in your project folder)
  song = loadSound("canon-in-d.mp3", () => console.log('Sound file loaded.'));

  // Initialize video recorder
  videoRecorder = new p5.VideoRecorder();
  videoRecorder.onFileReady = showPlayback;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  // --- Step 1: Continuously fill the circular buffer with new, flipped frames ---
  if (go && capture.width > 0) {
    // **NEW**: Flip the capture image horizontally
    flippedCapture.push();
    flippedCapture.translate(captureWidth, 0); // Move to the right edge
    flippedCapture.scale(-1, 1); // Flip horizontally
    flippedCapture.image(capture, 0, 0, captureWidth, captureHeight); // Draw the original capture
    flippedCapture.pop();

    // Store the *flipped* image in our snapshots array
    snapShots[counter] = flippedCapture.get();
    counter = (counter + 1) % total; // Move to the next slot

    // The buffer is "ready" once it has been completely filled one time.
    if (!isBufferReady && snapShots.length === total) {
      isBufferReady = true;
      console.log("Buffer is full. Displaying the sequential delay.");
    }
  }

  // --- Step 2: Draw the grid only when the buffer is ready ---
  if (isBufferReady) {
    const w = width / cols;
    const h = height / rows;

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        // --- CORE LOGIC FOR BOTTOM-TO-TOP DELAY (Unchanged) ---
        const delayAmount = ((rows - 1 - j) * cols) + ((cols - 1 - i));
        const newestFrameIndex = (counter - 1 + total) % total;
        const snapshotIndex = (newestFrameIndex - delayAmount + total) % total;
        
        if (snapShots[snapshotIndex]) {
          image(snapShots[snapshotIndex], i * w, j * h, w, h);
        }
      }
    }
  } else {
    // Display a loading message
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    const loadedPercentage = snapShots.length / total * 100;
    text(`Loading... ${floor(loadedPercentage)}%`, width / 2, height / 2);
  }
}

// --- User Interaction Functions ---

function keyPressed() {
  // **MODIFIED**: Check for spacebar for play/pause
  if (key === ' ') {
    togglePlaying();
    return; // Prevent other keys from being checked
  }

  switch (key.toLowerCase()) {
    case 'r': startRecording(); break;
    case 's': stopRecording(); break;
    case 'd': downloadVideo(); break;
    case 'q': playVideo(); break;
  }
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(0.5);
    console.log("Music Playing (Press SPACEBAR to stop)");
  } else {
    song.stop();
    console.log("Music Stopped (Press SPACEBAR to play)");
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
    console.log("No video recorded yet. Press 'r' then 's'.");
  }
}

function downloadVideo() {
  if (videoRecorder.url) {
    videoRecorder.save("canonical_delay_video");
    console.log("Video download initiated.");
  } else {
     console.log("No video recorded yet. Press 'r' then 's'.");
  }
}

function showPlayback() {
  videoPlayback = createVideo(videoRecorder.url);
  videoPlayback.hide();
  console.log("Recording ready. Press 'q' to play or 'd' to download.");
}
