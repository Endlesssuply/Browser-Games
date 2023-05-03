var p5_helloworld = function( sketch ) {
    sketch.setup = function() {
        sketch.createCanvas(400, 400);
        sketch.background(55)
        sketch.textAlign(sketch.CENTER)
        sketch.textSize(50)
        sketch.fill(255, 255, 53)
        sketch.text('Hello World', 200, 200)
        sketch.frameRate(2)
        i = 0
    }

    sketch.draw = function() {
        sketch.ellipse(25 + 80 * (i % 5), 25 + 80 * (Math.floor(i / 5)), 50, 50)
        sketch.rect(-25 + 80 * (i % 5), 25 + 80 * (Math.floor(i / 5)), 50, 50)
        i++
        if (i == 23) {
            sketch.noLoop()
        }
    }
}