# Code Explanation: Canonical - Part of Duets in Latent Spaces

This document provides an explanation of the key parts of the code used in the project "Canonical: Part of Duets in Latent Spaces."

## Global Variables

- **snapShots**: This array stores snapshots captured from the user's webcam.
- **counter**: Tracks the current snapshot in the cycle of images.
- **total**: The total number of snapshots (131) that will be cycled through.
- **song**: Stores the loaded sound file (`canon-in-d.mp3`) to be played during interaction.
- **videoRecorder**: This variable holds the instance of the p5.js video recorder used to record the canvas and webcam feed.
- **capture**: Stores the live feed from the user's webcam.
- **videoPlayback**: Used to store and manage playback of the recorded video.
- **go**: A boolean flag to indicate when the webcam is ready to start capturing snapshots.

## Setup Function

The `setup()` function runs once at the start of the program. It performs several initialization tasks:

- **Canvas Creation**: The canvas is created to fill the entire window using `createCanvas(windowWidth, windowHeight)`.
- **Sound Loading**: The sound file `canon-in-d.mp3` is loaded using the `loadSound()` function. Once loaded, the `loaded()` callback is triggered.
- **Webcam Capture**: A video capture object is created using `createCapture(VIDEO, ready)`, and the webcam feed is hidden from view using `capture.hide()`. This feed is displayed on the canvas through the `draw()` function.
- **Video Recorder**: A p5.js `VideoRecorder` instance is initialized, and a callback is set to handle when the recorded video is ready for playback.

## Window Resizing

The `windowResized()` function ensures that the canvas dynamically adjusts to changes in the window size by calling `resizeCanvas(windowWidth, windowHeight)`.

## Draw Function (Main Loop)

The `draw()` function is the core of the program and is called repeatedly to update the canvas:

- **Snapshot Capture**: If the webcam is ready (when `go` is `true`), frames from the webcam are captured and stored in the `snapShots[]` array.
- **Grid Layout**: The webcam frames (snapshots) are displayed in a grid of 10 rows by 12 columns, which are dynamically calculated based on the canvas size. The width and height of each grid cell are determined by dividing the canvas width by 12 (columns) and the canvas height by 10 (rows).
- **Frame Cycling**: The program continuously cycles through the captured frames, creating a looping animation where old frames are overwritten as new ones are captured.

## Key Controls

The program uses key-based controls for interaction:

1. **Play/Stop Music (`p`)**: When the `p` key is pressed, the `togglePlaying()` function is called to either play or stop the background music. The music is controlled using the p5.js `sound` library.
   
2. **Start Recording (`r`)**: Pressing the `r` key starts recording the current canvas and webcam feed. This action triggers the `startRecording()` function, which calls `videoRecorder.start()`.

3. **Stop Recording (`s`)**: The `s` key stops the recording process via the `stopRecording()` function, which invokes `videoRecorder.stop()`.

4. **Download Video (`d`)**: Pressing the `d` key downloads the recorded video using the `downloadVideo()` function. This is done by calling `videoRecorder.save()`.

5. **Play Recorded Video (`q`)**: The `q` key plays the recorded video through the `playVideo()` function, which plays back the video created by the recorder.

## Sound and Playback Functions

- **togglePlaying()**: This function handles playing and stopping the background music. It checks if the sound file is already playing and either starts or stops it accordingly.
  
- **startRecording()**: This function triggers the video recording by calling `videoRecorder.start()` and logs the start of recording to the console.

- **stopRecording()**: Stops the current recording by calling `videoRecorder.stop()`.

- **playVideo()**: Plays the recorded video if it is available.

- **downloadVideo()**: This function allows the user to download the recorded video by calling `videoRecorder.save()`.

## Video Playback

When the recording process is completed, the `showPlayback()` function is triggered. This function creates a new video element using the URL of the recorded video and hides it from view (it will be displayed on the canvas).

---

This explanation covers the key sections of the code and how the different components work together to capture webcam frames, play music, and allow users to record, download, and play back video.
