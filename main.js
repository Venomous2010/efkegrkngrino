noseX = 0;
noseY = 0;
difference = 0;
rightwristX = 0;
leftwristX = 0;

function setup(){
    video = createCapture(VIDEO);
    video.size(500, 500);

    canvas = createCanvas(475, 450);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, moelLoaded);
    poseNet.on('pose', gotPoses);
}

function moelLoaded(){
    console.log("poseNet initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX + " noseY = " + noseY);

        leftwristX = results[0].pose.leftWrist.x;
        rightwristX = results[0].pose.rightWrist.x;
        difference = floor(leftwristX - rightwristX);
        console.log("leftwristx = " + leftwristX + " rightwristX = " +  rightwristX + " difference = " + difference);
    }
}

function draw(){
    background('white');
    document.getElementById("square_size").innerHTML = "height and width of the square is " + difference + "px";
    fill('#F90093');
    stroke('#F90093');
    square(noseX, noseY, difference);
}