objects = [];
video = "";
Status = "";

function preload(){
    video = createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas = createCanvas(800 , 600);
    canvas.center();
}

function draw(){
    image(video , 0 , 0 , 800 , 600);
    if(Status != ""){
        object_detector.detect(video , gotResults);

        for(i = 0 ; i < objects.length ; i++){
            document.getElementById("status").innerHTML = "Status = Objects detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are  : " + objects.length;
            
            fill("#00ffc3");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("#ff2f00");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
}

function start(){
    object_detector = ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}

function modelLoaded(){
    console.log("model is loaded !!!");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResults(error , results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        objects = results;
    }
}
