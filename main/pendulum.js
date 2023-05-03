// not sure why, but acts like a precision and speed parameter for the simulation
// the smaller the value, the more precise and slower the simulation

// a buncha variables for later use
let flag = true;
let g, pendulum_count, alpha;
let pause_button, random_button, chaos_button, clear_button, reset_button;
let pnum_slider, g_slider, trail_slider;
let plist = [];

class Pendulum {
    constructor(mass1, mass2, length1, length2, angle1, angle2, colour) {
        this.mass1 = mass1;
        this.mass2 = mass2;
        this.l1 = length1;
        this.l2 = length2;
        this.a1 = angle1;
        this.a2 = angle2;
        this.a1_v = 0;
        this.a2_v = 0;
        this.colour = colour;
    }

    update() {
        // calculate the acceleration
        let num1 = -g * (2 * this.mass1 + this.mass2) * sin(this.a1);
        let num2 = -this.mass2 * g * sin(this.a1 - 2 * this.a2);
        let num3 = -2 * sin(this.a1 - this.a2) * this.mass2;
        let num4 = this.a2_v * this.a2_v * this.l2 + this.a1_v * this.a1_v * this.l1 * cos(this.a1 - this.a2);
        let den1 = this.l1 * (2 * this.mass1 + this.mass2 - this.mass2 * cos(2 * this.a1 - 2 * this.a2));
        let a1_a = (num1 + num2 + num3 * num4) / den1;

        let num5 = 2 * sin(this.a1 - this.a2);
        let num6 = this.a1_v * this.a1_v * this.l1 * (this.mass1 + this.mass2);
        let num7 = g * (this.mass1 + this.mass2) * cos(this.a1);
        let num8 = this.a2_v * this.a2_v * this.l2 * this.mass2 * cos(this.a1 - this.a2);
        let den2 = this.l2 * (2 * this.mass1 + this.mass2 - this.mass2 * cos(2 * this.a1 - 2 * this.a2));
        let a2_a = (num5 * (num6 + num7 + num8)) / den2;

        // calculate the coordinates
        let x1 = this.l1 * sin(this.a1);
        let y1 = this.l1 * cos(this.a1);
        let x2 = x1 + this.l2 * sin(this.a2);
        let y2 = y1 + this.l2 * cos(this.a2);

        // draw the pendulum
        stroke(this.colour);
        line(0, 0, x1, y1);
        line(x1, y1, x2, y2);

        // update the angle and velocity
        this.a1_v += a1_a;
        this.a2_v += a2_a;
        this.a1 += this.a1_v;
        this.a2 += this.a2_v;

        // comment out to remove friction (makes them bug out and disappear with high g)
        // this.a1_v *= 0.999;
        // this.a2_v *= 0.999;
    }
}

function setup() {
    bg = createCanvas(500, 500);
    background(0);
    strokeWeight(2);
    // comment in if you want to slow down the simulation
    // frameRate(20);

    // pause button
    pause_button = createButton('PAUSE');
    pause_button.position(0, 500);
    pause_button.mousePressed(function () {
        flag = !flag;
        if (flag) {
            loop();
        }
        else {
            noLoop();
        }
    });

    // create the pendulums
    // num random pendulum in the upper right quartile
    random_button = createButton('RANDOM');
    random_button.position(59, 500);
    random_button.mouseClicked(function () {
        for (let i = 0; i < pendulum_count; i++) {
            plist.push(new Pendulum(1, 1, random(100, 200), random(100, 200), random(PI/2, PI),
                random(PI/2, PI), color(random(255), random(255), random(255), 150)));
        }
    });
    // num close pendulums (meant to demonstrate chaos theory)
    chaos_button = createButton('CHAOS');
    chaos_button.position(133, 500);
    chaos_button.mouseClicked(function () {
        for (let i = 0; i < pendulum_count; i++) {
            plist.push(new Pendulum(1, 1, 100, 100, PI/2 - 0.01 * i,
                PI/2 - 0.01 * i, color(random(255), random(255), random(255), 150)));
        }
    });
    clear_button = createButton('CLEAR');
    clear_button.position(195, 500);
    clear_button.mouseClicked(function () {
        // clears the list and the canvas
        plist = [];
        background(0);
    });
    reset_button = createButton('RESET');
    reset_button.position(350, 500);
    reset_button.mouseClicked(function () {
        // clears the list and the canvas
    });

    // slider to change the g value
    g_slider = createSlider(0, 1, 0.1, 0.01);
    g_slider.position(260, 500);
    g_slider.style('width', '80px');
    // slider to change the number of pendulums
    pnum_slider = createSlider(1, 100, 10);
    pnum_slider.position(260, 530);
    pnum_slider.style('width', '80px');
    // slider to change the trail length, alpha = 0 is especially cool
    trail_slider = createSlider(0, 255, 255);
    trail_slider.position(260, 560);
    trail_slider.style('width', '80px');
}

function draw() {
    translate(width/2, 250);
    g = g_slider.value();
    pendulum_count = pnum_slider.value();
    alpha = trail_slider.value();
    background(0, 0, 0, alpha);
    for (let i = 0; i < plist.length; i++) {
        plist[i].update();
    }
}