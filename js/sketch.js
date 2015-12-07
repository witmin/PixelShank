// variables for canvas
var canvas;
var canvasPosX = 40;
var canvasPosY = 40;
var canvasWidth = 800;
var canvasHeight = 600;

// Lines Array
var lines = [];

// variables for the line
var sX = null;
var sY = null;
var eX = null;
var eY = null;

// Load image
var img = new Image();
var imgLoaded = false;
// Clicked detection. If it is odd, !finished, if the time is even, finished drawing a line;
var finished = true;

function loadSystemImage(btnId) {
    var tempImg = new Image()
        , f = document.getElementById(btnId).files[0]
        , url = window.URL || window.webkitURL
        , src = url.createObjectURL(f);
    tempImg.src = src;
    tempImg.onload = function () {
        canvas.width = tempImg.width;
        canvas.height = tempImg.height;
        resizeCanvas(canvas.width, canvas.height);
    };
    img = loadImage(tempImg.src);
    img.width = tempImg.width;
    img.height = tempImg.height;
    imgLoaded = true;
    var initBtn = document.getElementById("init-image-loader-button");
    var toolbar = document.getElementById("toolbar");
    initBtn.className = initBtn.className + ' hide';
    toolbar.className = "";
    // After import a new image. Erase the previous marked lines.
    lines = [];
}

function preload() {
    img = loadImage("img/init.png");
    canvasWidth = img.width;
    canvasHeight = img.height;
}

function saveImage() {
    var imgToExport = document.getElementById("defaultCanvas0").toDataURL("image/png");
    var saveBtn = document.getElementById("save-button");
    saveBtn.href = imgToExport.replace("image/png", "image/octet-stream");
}

function setup() {
// Initialize the canvas
    canvas = createCanvas(10, 10);
    canvas.position(canvasPosX, canvasPosY);
    canvas.class = 'main-canvas';
    background(55, 55, 55, 0);
}

function windowResized() {
    resizeCanvas(img.width, img.height);
}

function draw() {
    background(55);
    image(img, 0, 0);
    var templine = new Line(sX, sY, eX, eY);

    // Preview the temp lien
    if (!finished) {
        templine.preview();
    }

    for (var i = 0; i < lines.length; i++) {
        lines[i].display();
    }
}

function mouseClicked() {
    // Detect the line finied status and the mouse should be within the canvas area
    if (imgLoaded && finished && mouseX >= 0 && mouseY >= 0 && mouseX <= img.width && mouseY <= img.height) {
        sX = mouseX;
        sY = mouseY;
        finished = false;
        console.log("Clicked, start point: " + lines.length);
    } else if (imgLoaded && !finished && mouseX >= 0 && mouseY >= 0 && mouseX <= img.width && mouseY <= img.height) {
        eX = mouseX;
        eY = mouseY;
        finished = true;
        var line = new Line(sX, sY, eX, eY);
        lines.push(line);
        console.log("Clicked, end point: " + lines.length);
    }

}

// UNDO - Remove Last Line when keyPressed Ctrl+Z
function undo() {
    if (lines !== null) {
        lines.splice(-1, 1);
    }
}
// Clear marked lines on the canvas
function clearLines(){
    if (lines !== null) {
        lines.splice(0, lines.length);
        console.log("cleared lines");
    }
}

// Line Measure Class
function Line(sX, sY, eX, eY) {
    // Start and End point of the line
    this.sX = sX;
    this.sY = sY;
    this.eX = eX;
    this.eY = eY;

    // font size for Size Text
    this.fontSize = 12;

    // Divider length on each point
    this.dividerLineSize = 3;

    // Color for the line and text when preview
    this.previewColorR = 255;
    this.previewColorG = 155;
    this.previewColorB = 100;

    // Color for the line and text
    this.lineColorR = 200;
    this.lineColorG = 100;
    this.lineColorB = 255;
}

Line.prototype = {
    // Preview the line when start drawing the line. Also show the pixel length text
    preview: function () {
        strokeWeight(1);
        stroke(this.previewColorR, this.previewColorG, this.previewColorB);

        // Distance on axis X > Y
        var distanceX = abs(this.sX - mouseX);
        var distanceY = abs(this.sY - mouseY);
        var compareXY = distanceX - distanceY;
        if (compareXY > 0) {
            // Horizontal
            line(this.sX, this.sY, mouseX, this.sY);
            // start divider line
            line(this.sX, this.sY - this.dividerLineSize, this.sX, this.sY + this.dividerLineSize);
        } else if (compareXY < 0) {
            // Vertical
            line(this.sX, this.sY, this.sX, mouseY);
            // start divider line
            line(this.sX - this.dividerLineSize, this.sY, this.sX + this.dividerLineSize, this.sY);
        } else {
            line(this.sX, this.sY, mouseX, mouseY);
        }
        //    Print Length Pixel
        textSize(this.fontSize);
        fill(this.previewColorR, this.previewColorG, this.previewColorB);
        stroke(255);
        strokeWeight(0);
        // Change the flost to int and convert the int to string.
        var previewLineLength = int(dist(this.sX, this.sY, mouseX, mouseY));
        var valueText = previewLineLength.toString() + "px";

        // Position of the text
        text(valueText, mouseX + this.fontSize, mouseY + this.fontSize);
    },
    // After the start point and end point clicked, display the line
    display: function () {
        strokeWeight(1);
        stroke(this.lineColorR, this.lineColorG, this.lineColorB);

        // Distance on axis X > Y
        var distanceX = abs(this.sX - this.eX);
        var distanceY = abs(this.sY - this.eY);
        var compareXY = distanceX - distanceY;

        if (compareXY > 0) {
            // Horizontal
            this.eY = this.sY;
            // start divider line
            line(this.sX, this.sY - this.dividerLineSize, this.sX, this.sY + this.dividerLineSize);
            // End divider line
            line(this.eX, this.eY - this.dividerLineSize, this.eX, this.eY + this.dividerLineSize);
        } else if (compareXY < 0) {
            // Vertical
            this.eX = this.sX;
            // start divider line
            line(this.sX - this.dividerLineSize, this.sY, this.sX + this.dividerLineSize, this.sY);
            // End divider line
            line(this.eX - this.dividerLineSize, this.eY, this.eX + this.dividerLineSize, this.eY);
        }

        line(this.sX, this.sY, this.eX, this.eY);

        // Show the line length in px
        this.printLengthPixel();
    },

    //Print line length pixel value next to the line
    printLengthPixel: function () {
        textSize(this.fontSize);
        fill(this.lineColorR, this.lineColorG, this.lineColorB);
        stroke(255, 255, 255);
        strokeWeight(0);
        // Change the flost to int and convert the int to string.
        this.lineLength = int(dist(this.sX, this.sY, this.eX, this.eY));
        var valueText = this.lineLength.toString() + "px";

        // Position of the text
        var textX;
        var textY;

        if (this.sX === this.eX) {
            // Vertical line
            textX = this.sX + this.fontSize;
            if (this.eY > this.sY) {
                textY = this.sY + abs(this.eY - this.sY) / 2;
            } else {
                textY = this.eY + abs(this.sY - this.eY) / 2;
            }
        } else if (this.sY === this.eY) {
            textY = this.sY - this.fontSize / 2;
            // Horizontal line
            if (this.eX > this.sX) {
                textX = this.sX + abs(this.eX - this.sX) / 2 - this.fontSize * 2;
            } else {
                textX = this.eX + abs(this.sX - this.eX) / 2 - this.fontSize * 2;
            }
        }
        text(valueText, textX, textY);
    }
};