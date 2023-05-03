var p5_gradient = function(sketch) {
    sketch.setup = function() {
        sketch.createCanvas(800, 800);
        sketch.noStroke();
        sketch.colorMode(sketch.HSB, 800);
        for (let i = 0; i < 800; i++) {
            for (let j = 0; j < 800; j++) {
                sketch.stroke(i, j, 800);
                sketch.point(i, j);
            }
        }
    }

    sketch.draw = function() {
        if (sketch.mouseIsPressed) {
            sketch.fill(120, 230, 100, 10)
            sketch.rect(sketch.mouseX - 40, sketch.mouseY - 40, 80, 80, sketch.random(80), sketch.random(80), sketch.random(80), sketch.random(80));
        }
    }
}