function setup() {
    createCanvas(800,800)
    background(0)
    let title = createDiv("SUPER DAVID BROS.")
    title.position(85, 200);
    title.style("font-size", "3.5rem")
    title.style("font-family", "Times New Roman");
    title.style("color", color(255, 255, 53))
    //title.style("background-color", color(255, 0, 0))
    title.style("padding", "1.5rem")
    title.style("border-radius", "0.75vw")
    title.mouseOver(() => {
        title.style("font-size", "3.6rem")
        title.style("background-color", color(240, 50,50))
        title.style("color", color(240, 240, 73))
    })
    title.mouseOut(() => {
        title.style("font-size", "3.5rem")
        title.style("background-color", color(0, 0,0))
        title.style("color", color(255, 255, 53))
    })
}

function draw() {

}