let x = 400;
let y = 400;
let flag = true;
let timer = 1;
let display_pink = false;
let pink_locationx;
let pink_locationy;
let alpha = 0;

function setup() {
    bg = createCanvas(800, 800);
    background(0);
    textAlign(CENTER);
    textSize(50);
    fill(255, 255, 53);
    text('Hello World', 200, 200);
    stroke(55);

}

function draw() {
    // fading out the old stuff
    background(0, 0, 0, 25 - alpha/10);

    // drawing the snake
    fill(255, 255, 53, 50 + alpha);
    ellipse(x, y, 50, 50);
    x+= (mouseX - x) * 0.05;
    y+= (mouseY - y) * 0.05;

    // background dots
    fill(55);
    ellipse(random(800), random(800), 50, 50);

    // the pink dot
    if (display_pink) {
        fill(255, 20, 147)
        ellipse(pink_locationx, pink_locationy, 50, 50);
    }
    if (sqrt((pink_locationx - x)**2 + (pink_locationy - y)**2) < 50 & display_pink) {
        text('Noice', random(100, 700), random(100, 700));
        display_pink = false;
        timer = 1;
        // scuffed difficulty progression
        // thicc snake, long snake and death of the screen
        alpha += 10;
    }

    if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
        timer --;
    }
    if (timer == 0 & !display_pink) {
        display_pink = true;
        // needs a better way to spawn it sufficiently far away
        //red_locationx = random((x + random(800)) % 800);
        //red_locationy = random((y + random(800)) % 800);
        pink_locationx = random(50, 750);
        pink_locationy = random(50, 750);
        // funi
        // bg.display = createCanvas(800, 800);
    }
}


function mousePressed() {
    flag = !flag;
    if (flag) {
        loop();
    }
    else {
        noLoop();
    }
}