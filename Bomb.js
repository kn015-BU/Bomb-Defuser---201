let password = generateRandomPassword(); // Call the function to generate a random password
let userInput = [];
let buttonSize = 80;
let buttons = [];
let gameOver = false;
let explosion = [];
let explosionSound;

function preload() {
  explosionSound = loadSound('Explosion.mp3');
}

function generateRandomPassword() {
  let passwordLength = 4; // Adjust the length of the password as needed
  let randomPassword = [];

  for (let i = 1; i <= passwordLength; i++) {
    randomPassword.push(i);
  }

  // Shuffle the elements of the array
  for (let i = randomPassword.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomPassword[i], randomPassword[j]] = [randomPassword[j], randomPassword[i]];
  }

  return randomPassword;
}

function setup() {
  createCanvas(400, 300);
  textAlign(CENTER, CENTER);

  // Create four buttons with numbers 1 to 4
  for (let i = 1; i <= 4; i++) {
    buttons.push(new Button(i, i - 1, 4));
  }
}

function draw() {
  background("#3498db");

  // Display buttons
  for (let button of buttons) {
    button.display();
  }

  // Display user input
  fill("#4CAF50"); // Terminal green color
  rect(width / 4, height / 3, width / 2, 60); // Adjust the position and size as needed
  fill(255);
  textSize(36);
  text(userInput.join(" "), width / 2, height / 3 + 30);


  // Check if the user's input matches the password
  if (!gameOver && userInput.length === password.length) {
    checkPassword();
  }

  // Display explosion animation
  for (let exp of explosion) {
    exp.display();
  }
}

function mousePressed() {
  if (!gameOver) {
    // Check if any button was pressed
    for (let button of buttons) {
      if (button.isMouseOver()) {
        userInput.push(button.value);
        if (userInput.length > password.length) {
          userInput.shift(); // Remove the first element if the array is too long
        }
      }
    }
  }
}

function checkPassword() {
  let correct = true;
  for (let i = 0; i < password.length; i++) {
    if (userInput[i] !== password[i]) {
      correct = false;
      break;
    }
  }

  if (correct) {
    console.log("Bomb defused! You guessed the correct password.");
  } else {
    console.log("Boom! Incorrect password. Game over.");
    explode();
    explosionSound.play(); // Play the explosion sound
  }

  gameOver = true;
}

function explode() {
  for (let i = 0; i < 100; i++) {
    let speed = random(2, 6);
    let angle = random(0, TWO_PI);
    let col = color(random(255), random(255), random(255));
    explosion.push(new Particle(width / 2, height / 2, speed * cos(angle), speed * sin(angle), col));
  }
}
class Button {
  constructor(value, index, totalButtons) {
    this.value = value;
    this.width = buttonSize;
    this.height = buttonSize;
    this.x = (width - totalButtons * this.width) / 2 + index * this.width;
    this.y = height - this.height;
  }

  display() {
    fill("#2ecc71");
    rect(this.x, this.y, this.width, this.height, 10);
    fill(255);
    textSize(32);
    text(this.value, this.x + this.width / 2, this.y + this.height / 2);
  }

  isMouseOver() {
    return mouseX > this.x && mouseX < this.x + this.width &&
           mouseY > this.y && mouseY < this.y + this.height;
  }
}

class Particle {
  constructor(x, y, speedX, speedY, col) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.radius = random(5, 15);
    this.alpha = 255;
    this.col = col;
  }

  display() {
    fill(this.col.levels[0], this.col.levels[1], this.col.levels[2], this.alpha);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 5;
  }
}