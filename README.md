# Canonical of a Metalogical Structure

*Concept and programming by Marlon Barrios Solano*  
*Part of Duets in Latent Space*

## Overview

**Canonical of a Metalogical Structure** is an interactive audiovisual project built using p5.js. This work merges real-time webcam imagery with the timeless structure of Pachelbel’s Canon in D. Its title reflects two core ideas:

- **Canonical:** Referring to a recognized, standard pattern or model. Here, it describes the fixed, structured way in which snapshots are captured, arranged, and replayed.
- **Metalogical Structure:** Emphasizing an underlying framework that governs the organization and transformation of data—in this case, the self-referential logic used to assemble and display snapshots in a dynamic grid. This meta-level organization evokes a deeper conceptual order inherent in both art and logic.

The piece creates a dialogue between the recurring patterns of Pachelbel’s Canon and the evolving mosaic of webcam captures, forming a unique sensory experience.

## Live Demo

- [View the Live App](https://marlonbarrios.github.io/canonical01/)
- [Watch the YouTube Demo](https://www.youtube.com/watch?v=MNHn37pawjw)

## Features

- **Live Webcam Capture:**  
  Continuously captures frames from your webcam and stores them as snapshots.
  
- **Dynamic Grid Display:**  
  Organizes the snapshots into a fixed grid (10 rows x 12 columns) that cycles through the captured images, creating a constantly evolving visual mosaic that reflects a canonical order.
  
- **Audio Integration:**  
  Utilizes Pachelbel’s Canon in D—a piece celebrated for its layered, repeating progression—to underscore the visual rhythm and reinforce the notion of an underlying, timeless structure.
  
- **Video Recording:**  
  Records the canvas (including snapshots and audio) using a built-in video recorder. Users can play back or download the resulting video.
  
- **Interactive Controls:**  
  Keyboard commands enable you to:
  - **P:** Toggle audio playback.
  - **R:** Start recording the canvas and audio.
  - **S:** Stop recording.
  - **D:** Download the recorded video.
  - **Q:** Play the recorded video.

## How It Works

1. **Setup:**
   - A full-window canvas is created.
   - The audio file (“canon-in-d.mp3”), inspired by Pachelbel’s Canon, is loaded.
   - The webcam feed is initiated, with frames continuously captured into an array.
   - A video recorder is set up to capture the evolving canvas.

2. **Snapshot Capture & Grid Display:**
   - As soon as the webcam feed is active, snapshots are taken at regular intervals.
   - These snapshots are arranged into a structured grid, with the display updating in a cyclic, canonical pattern.

3. **Audio & Structure:**
   - The piece leverages the formal structure of Pachelbel’s Canon, whose repeating and interweaving themes resonate with the grid’s cyclic display of images.
   - The music underscores the visual rhythm, emphasizing the idea of an ordered, yet ever-changing metalogical structure.

4. **Recording & Playback:**
   - Users can record the entire session—including both visuals and audio—and later play back or download the recording.

## Installation and Usage

### Prerequisites

- A modern web browser.
- The p5.js library and the p5.VideoRecorder module (included via script tags or module imports).

### Running the Project

1. **Clone the Repository:**  
   Download or clone the repository to your local machine.
   
2. **Open the Project:**  
   Open the `index.html` file in your web browser.
   
3. **Interact with the Experience:**
   - **Press P** to toggle the music (Pachelbel’s Canon in D).
   - **Press R** to start recording the visual and audio performance.
   - **Press S** to stop recording.
   - **Press D** to download the recorded video.
   - **Press Q** to play back the recorded video.

## Code Structure

- **Global Variables:**  
  Manages snapshots, counters, audio file, video recorder, and webcam capture.

- **Setup Function:**  
  Initializes the canvas, loads the audio, and sets up the webcam and video recorder.

- **Draw Loop:**  
  Continuously captures webcam frames, stores them, and displays them in a grid that evolves over time.

- **Event Handlers:**  
  - `keyPressed()`: Listens for keyboard inputs to control audio and recording functions.
  - Additional functions manage starting/stopping recording, toggling audio, and handling video playback and download.

## License

This project is licensed under the MIT License.  
© Marlon Barrios Solano, 2025
