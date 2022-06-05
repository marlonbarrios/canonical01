//Space-time Loop 1: Webcam Generative Dances
//bottom-up 
//Concept and programming by Marlon barrios Solano


var button;
var snapShots = [];
var counter = 0;
var total = 131;
var song;

let videoRecorder;
let capture;
let recordButton, pauseButton, resumeButton, playButton, stopButton, downloadButton;
let videoPlayback;


function setup() {
  let canvas = createCanvas(800, 600);
  let htmlCanvas = canvas.canvas;
  song = loadSound("canon-in-d.mp3", loaded)
  background(0);
capture = createCapture(VIDEO, ready);
  // image(capture, 0,0);
 capture.position(420, 650); 

canvas.position(100,50); 

canvas.style('width', '800px')
  canvas.style( 'height:', '600px')
  

 capture.size(160, 120);
 //  Create a webcam capture with video and audio
  //  When the stream is ready, setup the buttons
  capture = createCapture({ video: true, audio: true }, setupButtons);
  //  Mute webcam audio to prevent feedback
  capture.volume(0);
  //  Hide capture element (because it will be displayed on canvas instead)
  capture.hide();
  
  //  Create a new VideoRecorder instance
  //    with webcam capture as input
  videoRecorder = new p5.VideoRecorder();
  //  Set callback for when recording is completed
  //    and video file has been created
  videoRecorder.onFileReady = showPlayback;
 
}

function togglePlaying(){
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(0.5);
  

    button.html('Stop Sound')
  } else {
    song.stop();
    button.html('Start Sound Again')
  }
}

function loaded() {
  console.log('loaded')
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
      if (counter == 131) {
        counter = 0;
      }
    }
  }
 

  var  w = 80;
  var  h = 60;
  var  x = 0;
  var  y= 0;
  for ( var i = 0; i < snapShots.length; i++) {
 
    var index = (i + frameCount) % snapShots.length;

    image(snapShots[index], x,y,w,h);
    x = x + w;
    if ( x > width) {
      x = 0;
      y = y + h;
    }
  }
}


//  Create buttons and hide all except record
function setupButtons() {
  button = createButton("Play  Pachebel Cannon in D");
  button.mousePressed(togglePlaying);
  button.position(900,100)
  // playButton = createButton("Play Recording");
  // playButton.hide();
  recordButton = createButton("Record Canvas and Sound");
  recordButton.position(900,300)
  recordButton.mousePressed(startRecording);
  pauseButton = createButton("Pause Recording");
  pauseButton.position(900,330)
  pauseButton.hide();
  resumeButton = createButton("Resume Recording");
  resumeButton.position(900,360)
  resumeButton.hide();
  stopButton = createButton("Stop Recording");
  stopButton.position(900,390)
  stopButton.hide();
  downloadButton = createButton("Download Video File");
  downloadButton.position(900,420)
  downloadButton.hide();
}


function startRecording() {
  //  Set buttons to manage recording
  //    and show hidden buttons
  pauseButton.mousePressed(() => videoRecorder.pause());
  pauseButton.show();
  resumeButton.mousePressed(() => videoRecorder.resume());
  resumeButton.show();
  stopButton.mousePressed(() => videoRecorder.stop());
  stopButton.show();
  //  Start recording
  videoRecorder.start();
}

function showPlayback() {
  //  Create video element to display recording
  videoPlayback = createVideo(videoRecorder.url);
  
  //  Hide video element (because it will be displayed on canvas instead)
  videoPlayback.hide();
  
  //  Set buttons to manage playback
  // playButton.mousePressed(() => videoPlayback.play());
  // playButton.show();
  pauseButton.mousePressed(() => videoPlayback.pause());
  resumeButton.mousePressed(() => videoPlayback.play());
  stopButton.mousePressed(() => videoPlayback.stop());
  downloadButton.mousePressed(() => videoRecorder.save("canonical"));
  downloadButton.show();
}



