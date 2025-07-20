// Canonical: part of Duets in Latent Spaces
// Concept and programming by Marlon Barrios Solano
// Code fixed and refined by Gemini for a clear, sequential bottom-to-top delay

// --- Configuration ---
const rows = 10;
const cols = 12;
const total = rows * cols; // Total snapshots needed to fill the grid delay

// --- State Variables ---
let snapShots = [];
let capture;
let song;

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
  capture.size(160, 120);
  capture.hide();

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

  // --- Step 1: Continuously fill the circular buffer with new frames ---
  if (go && capture.width > 0) {
    snapShots[counter] = capture.get(); // Store the current frame
    counter = (counter + 1) % total; // Move to the next slot

    // The buffer is considered "ready" once it has been completely filled one time.
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
        
        // --- CORE LOGIC FOR BOTTOM-TO-TOP DELAY ---

        // 1. Calculate a "delay amount" for each cell.
        // We want the most delay at the top-left (value: total-1)
        // and the least delay at the bottom-right (value: 0).
        const delayAmount = ((rows - 1 - j) * cols) + ((cols - 1 - i));

        // 2. Determine the index of the newest frame in our buffer.
        // The 'counter' variable points to the *oldest* frame slot,
        // so the newest frame is the one right behind it.
        const newestFrameIndex = (counter - 1 + total) % total;

        // 3. Find the correct snapshot by subtracting the delay from the newest frame.
        // This makes cells with a large 'delayAmount' go further back in time.
        // Adding 'total' before the modulo (%) ensures the result is always positive.
        const snapshotIndex = (newestFrameIndex - delayAmount + total) % total;
        
        if (snapShots[snapshotIndex]) {
          image(snapShots[snapshotIndex], i * w, j * h, w, h);
        }
      }
    }
  } else {
    // Display a loading message until the buffer is full
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(24);
    const loadedPercentage = snapShots.length / total * 100;
    text(`Loading... ${floor(loadedPercentage)}%`, width / 2, height / 2);
  }
}


// --- User Interaction Functions (Unchanged) ---

function keyPressed() {
  switch (key.toLowerCase()) {
    case 'p': togglePlaying(); break;
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
    console.log("Music Playing");
  } else {
    song.stop();
    console.log("Music Stopped");
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
