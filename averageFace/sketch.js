var imgs = [];
var avgImg;
var numOfImages = 30;
var randImage;

//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    //Display all the images in assets folder
    for (var i = 0 ; i < 30 ; i++){
        fileName = 'assets/'+i+'.jpg';
        img = loadImage(fileName);
        imgs.push(img);
    }
}
//////////////////////////////////////////////////////////
function setup() {
    // Creating canvas equal to twice the first image width and equal to first image height
    createCanvas(imgs[0].width * 2, imgs[0].height);
    //Set pixel density to one
    pixelDensity(1);
    //Empty buffer to save results of calculations
    avgImg = createGraphics(imgs[0].width, imgs[0].height);
    //Generate a random ineteger from 0 t0 29
    randImage = int(random(0,29));
}
//////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgs[randImage],0,0,imgs[randImage].width,imgs[randImage].height);
    
    //Acessing all the pixel data of img array
    for (var i = 0 ; i < imgs.length ; i++){
            imgs[i].loadPixels();
    }
    avgImg.loadPixels()
    
    //Mapping mouseX value between 0-1
    var mouseX_Val= map(mouseX, 0 ,canvas.width,0,1)
    mouseX_Val = constrain(mouseX_Val,0, 1)
    
    //Calculations for average image of all images
    for (var x = 0 ; x < imgs[0].width ; x++)
    {
        for (var y = 0 ; y < imgs[0].height ; y++)
        {     
            var sumR = 0, sumG = 0, sumB = 0;
            var index = ((imgs[0].width * x) + y) * 4; 
            
            for(var z = 0 ; z < numOfImages ; z++){
            sumR+= imgs[z].pixels[index + 0];
            sumG+= imgs[z].pixels[index + 1];   
            sumB+= imgs[z].pixels[index + 2]; 
            }
            
            //Getting pixel values of currently loaded random image from array
            var r=0,g=0,b=0;
            r= imgs[randImage].pixels[index + 0];
            g= imgs[randImage].pixels[index + 1];   
            b= imgs[randImage].pixels[index + 2]; 
            
            //Lerping through the 3 channels to transition the left image according to mouseX_Val(mouseX)
            var tRed = lerp(r,sumR/numOfImages,mouseX_Val)            
            var tGreen = lerp(g,sumG/numOfImages,mouseX_Val)
            var tBlue = lerp(b,sumB/numOfImages,mouseX_Val)
            
            avgImg.pixels[index] = tRed;            
            avgImg.pixels[index + 1] = tGreen;             
            avgImg.pixels[index + 2] = tBlue;
            avgImg.pixels[index + 3] = 255;
            
        }
    }
    //updating avgImg variable
    avgImg.updatePixels();
    //draw the avgImg
    image(avgImg,avgImg.width,0,avgImg.width,avgImg.height)
    noLoop();
}

//Function display a random image whenever a key is pressed
function keyPressed(){
    //Generate a random ineteger from 0 t0 29
    randImage = int(random(0,29));  
    image(imgs[randImage],0,0,imgs[randImage].width,imgs[randImage].height);
    loop();
}

//Function that runs the loop whenever mouse is pressed
function mousePressed(){
    loop();
}
