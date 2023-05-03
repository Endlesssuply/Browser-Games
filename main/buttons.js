function setup() {
    createCanvas(800, 800);
    button1 = createButton('elaborate')
    button1.mousePressed(function () {
        background(random(255), random(255), random(255))
    })
    button2 = createButton('consise')
    button2.mousePressed(() => {
        background(random(255), random(255), random(255))
    })
    button3 = createButton('weird')
    button3.mousePressed(() => background(random(255), random(255), random(255)))
}