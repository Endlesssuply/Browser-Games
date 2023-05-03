r = 200
inside = 0.0
total = 0.0
bestPi = 0

function setup() {
    createCanvas(400, 420);
    textAlign(CENTER)
    strokeWeight(2)
}

function draw() {
    translate(r, r)
    for (let i = 0; i < 100; i++) {
        x = random(-r, r)
        y = random(-r, r)
        total++
        if (x * x + y * y < r * r) {
            inside++
            stroke('red')
            point(x, y)

        }
        else {
            stroke('white')
            point(x, y)
        }
    }


    pi = 4 * (inside / total)
    if (abs(PI - pi) < abs(PI - bestPi)) {
        bestPi = pi
        erase()
        rect(-200, 210, 400, 10)
        noErase()
        stroke('white')
        text(pi, 0, 220)
    }
}
