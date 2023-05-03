function createMenuButton(text, x = 0, y = 0, size = 350, fontSize = 2, behaviour, hasHover = true) {
    BANANA_YELLOW = color(239, 241, 53);
    LIGHT_BANANA_YELLOW = color(255, 255, 73);
    PINK = color(255, 105, 180);
    LIGHT_PINK = color(255, 125, 200);
    let button = createButton(text);
    button.position(x, y);
    button.size(size);
    button.style("color", PINK);
    button.style("background-color", BANANA_YELLOW);
    button.style("padding", "1rem");
    button.style("font-size", fontSize + "rem");
    button.style("font-weight", "bold");
    button.style("border-radius", "0.75rem");
    // TODO: fix
    // button.center();
    // TODO: potentially add additional behaviour with mouseClicked()
    button.mousePressed(behaviour)
    if (hasHover) {
        button.mouseOver(() => {
            button.style("color", LIGHT_BANANA_YELLOW);
            button.style("background-color", LIGHT_PINK);
        })
        button.mouseOut(() => {
            button.style("color", PINK);
            button.style("background-color", BANANA_YELLOW);
        })
    }
    return button;
}

function createTitle(text, x, y, size, fontSize) {
    let title = createDiv(text);
    title.position(x, y);
    title.style("font-size", fontSize + "rem");
    title.style("font-family", "Times New Roman");
    title.style("color", color(239, 241, 53));
    title.style("background-color", color(0, 0, 0))
    title.style("padding", "1rem");
    title.style("border-radius", "0.75vw");
    title.mouseOver(() => {
        title.style("background-color", color(240, 50,50));
    })
    title.mouseOut(() => {
        title.style("background-color", color(0, 0,0));
    })
}

function setup() {
    createCanvas(400, 400);
    background(0);
    title = createTitle("SUPER DAVID BROS.", 25, 50, 350, 2);
    playButton = createMenuButton("PLAY", 25, 200,350, 2.2);
    exitButton = createMenuButton("EXIT", 25, 300,350, 2.2);
}