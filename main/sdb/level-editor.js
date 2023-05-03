let entities = [];
let flag = false;
let precision = 50;

class Entity {
    constructor(x , y) {
        this.x = x;
        this.y = y;
        this.offsetX = 0;
        this.offsetY = 0;
        this.sizeX = precision;
        this.sizeY = precision;
        this.initialSizeX = this.sizeX;
        this.initialSizeY = this.sizeY;
        this.color = color(255);
        this.wasClicked = false;
        this.isDragged = false;
    }

    scuffed_distance() {
        return (mouseX - this.offsetX >= this.x &&
            mouseX - this.offsetX <= this.x + this.sizeX &&
            mouseY - this.offsetY>= this.y &&
            mouseY - this.offsetY <= this.y + this.sizeY)
    }


    render() {
        fill(this.color);
        rect(this.x + this.offsetX, this.y + this.offsetY, this.sizeX, this.sizeY);
    }

    clicked() {
        if (this.scuffed_distance()) {
            this.color = color(random(10, 255), random(10, 255), random(10, 255));
            this.wasClicked = true;
        }
        else {
            if (this.wasClicked) {
                this.x = floor(mouseX / precision) * precision - this.offsetX;
                this.y = floor(mouseY / precision) * precision - this.offsetY;
                this.wasClicked = false;
            }
        }
    }

    doubleClick() {
        if (this.scuffed_distance()) {
        }
    }

    controls() {
        if (keyCode === UP_ARROW) {
            this.offsetY -= 50;
        } else if (keyCode === DOWN_ARROW) {
            this.offsetY += 50;
        }
        if (keyCode === LEFT_ARROW) {
            this.offsetX -= 50;
        } else if (keyCode === RIGHT_ARROW) {
            this.offsetX += 50;
        }
    }
}


function mousePressed() {
    for (let i = 0; i < entities.length; i++) {
        entities[i].clicked();
    }
}

function doubleClicked() {
    for (let i = 0; i < entities.length; i++) {
        entities[i].doubleClick();
    }
}


function setup() {
    createCanvas(600, 600);
    background(0);
    entities.push(new Entity(100, 100));
    entities.push(new Entity(200, 200));
    entities.push(new Entity(300, 300));
    entities.push(new Entity(400, 400));
    button = createButton("bruh moment");
    button.mouseClicked(() => {
        flag = !flag
    });
}

function draw() {
    background(55);
    fill(255);
    for (let i = 0; i < entities.length; i++) {
        entities[i].render();
        if (keyIsDown(SHIFT) && (entities[i].scuffed_distance() || entities[i].isDragged)) {
            entities[i].isDragged = true;
            entities[i].sizeX = entities[i].initialSizeX + floor(abs(mouseX - entities[i].x) / precision) * precision - entities[i].offsetX;
            entities[i].sizeY = entities[i].initialSizeY + floor(abs(mouseY - entities[i].y) / precision) * precision - entities[i].offsetY;
        }
        else {
            entities[i].isDragged = false;
        }
    }
    if (flag) {
        for (let i = 0; i < width; i+= precision) {
            line(i, 0, i, height);
            line(0, i, width, i);
        }
    }
}

function keyPressed() {
    for (let i = 0; i < entities.length; i++) {
        entities[i].controls();
    }
}

// TODO: fix the bug where the entities are not being saved correctly
// TODO: add a button to save the entities
// write a function that takes in a list of entities and returns a string that can be written to a file
// the string should be in the format of a json file
// the json file should be in the format of a list of objects
// each object should have the following properties:
// x, y, sizeX, sizeY, offsetX, offsetY
function saveEntities(entities) {
    let data = [];
    for (let i = 0; i < entities.length; i++) {
        data.push({
            x: entities[i].x,
            y: entities[i].y,
            sizeX: entities[i].sizeX,
            sizeY: entities[i].sizeY,
            offsetX: entities[i].offsetX,
            offsetY: entities[i].offsetY
        });
    }
    return JSON.stringify(data);
}

// write a function that takes in a string and returns a list of entities
// the string should be in the format of a json file
// the json file should be in the format of a list of objects
// each object should have the following properties:
// x, y, sizeX, sizeY, offsetX, offsetY
function loadEntities(data) {
    data = JSON.parse(data);
    let entities = [];
    for (let i = 0; i < 4; i++) {
        let entity = new Entity(data[i].x, data[i].y);
        entity.sizeX = data[i].sizeX;
        entity.sizeY = data[i].sizeY;
        entity.offsetX = data[i].offsetX;
        entity.offsetY = data[i].offsetY;
        entities.push(entity);
    }
    return entities;
}