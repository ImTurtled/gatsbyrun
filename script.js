/* VARIABLES */
let bgimg;
let gatsby;
let gimg;
let girlimg1;
let girls = [];
let score = 0;
let highScore = 0;
let lastScoreThreshold = 0; // Track the last score threshold for speed changes
let homeimg;
let screen;
let font;
let d1;
let carbg;
let ee;
let we;
let twocarbg;
let greenlightbg;
let watcherbg;
let nickbg;
let girlsSpawned = 0; // NEW: Track how many girls have been spawned
const maxGirls = 5; // NEW: Maximum number of girls to spawn
let talkingbg;
let flowersbg;
let mebg;
let endbg;

//Buttons
let startButton;
let startButton2;
let instructionsButton;
let eeButton;
let weButton;
let nextButton;
let fgButton;

// Spawn control variables
let lastSpawnTime = 0;
const minSpawnInterval = 500;   // Minimum time between spawns (0.5 seconds)
const maxSpawnInterval = 3000;  // Maximum time between spawns (3 seconds)

/* PRELOAD LOADS FILES */
function preload() {
  font = loadFont("assets/PressStart2P-Regular.ttf");
  bgimg = loadImage("assets/goodbg.png");
  gimg = loadImage("assets/g2.png");
  girlimg1 = loadImage("assets/girl1.png");
  homeimg = loadImage("assets/homescreen.jpg");
  d1 = loadImage("assets/daisy1.png");
  carbg = loadImage("assets/car.png");
  ee = loadImage("assets/ee.jpg");
  we = loadImage("assets/we.jpg");
  twocarbg = loadImage("assets/twocar.png");
  greenlightbg = loadImage("assets/greenlight.png");
  watcherbg = loadImage("assets/watcher.png");
  nickbg = loadImage("assets/nicky.png");
  talkingbg = loadImage("assets/talking2.png");
  flowersbg = loadImage("assets/flowers.png");
  mebg = loadImage("assets/me.png");
  endbg = loadImage("assets/end.png");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(800, 450);
  textFont(font);
  gatsby = new Gatsby();
  screen = 0;
  //Buttons
  textSize(8);
  stroke("black");
  strokeWeight(0);
  instructionsButton = new Sprite(100, 350, 100, 50, "k");
  instructionsButton.color = "#1fdb1f";
  instructionsButton.text = "How to Play"
  startButton = new Sprite(700, 350, 100, 50, "k");
  startButton.color = "#1fdb1f";
  startButton.text = "START!";
  textSize(16);
  startButton2 = new Sprite(-700, -350, 150, 75, "k");
  startButton2.stroke = "black";
  startButton2.strokeWeight = 1;
  startButton2.color = "#1fdb1f";
  startButton2.text = "START!";

  textSize(16);
  eeButton = new Sprite(-700, -350, 150, 75, "k");
  eeButton.color = "#1fdb1f";
  eeButton.text = "Story\nMode";
  weButton = new Sprite(-700, -350, 150, 75, "k");
  weButton.color = "#1fdb1f";
  weButton.text = "Endless\nMode";

  nextButton = new Sprite(-700,-350,100,50,"k");
  nextButton.stroke = "#1fdb1f";
  nextButton.strokeWeight = 1;
  nextButton.color = "#1fdb1f";
  nextButton.text = "Next"

  textSize(14);
  fgButton = new Sprite(-700,-350,220,75,"k");
  fgButton.stroke = "#1fdb1f";
  fgButton.strokeWeight = 1;
  fgButton.color = "#1fdb1f";
  fgButton.text = "Find Nick -\nStart the Game";
}

function keyPressed() {
  if (screen == 3 || screen==7) {
    if (key == ' ') {
      gatsby.jump();
    }
  
    // Restart the game when 'R' is pressed
    if (key == 'r' || key == 'R') {
      restartGame();
    }
  
    //exit if e pressed
    if (key == 'e' || key == 'E') {
      score = 0;
      screen = 0;
      restartGame()
      loop();
    }
  }
  else if (screen == 12) {
    //exit if e pressed
    if (key == 'e' || key == 'E') {
      score = 0;
      screen = 0;
      restartGame();
      loop();
    }
  }
}
// Function to restart the game
function restartGame() {
  score = 0;
  lastScoreThreshold = 0; // Reset the score threshold tracker
  girls = [];
  girlsSpawned = 0; // NEW: Reset girls spawned counter
  gatsby = new Gatsby();
  loop();
}

/* DRAW LOOP REPEATS */
function draw() {
  if (screen == 0) {
    homeScreen();
  }
  else if (screen == 1) {
    instructionsScreen();
  }
  else if (screen == 2) {
    chooseScreen();
  }
  else if (screen == 3) {
    endlessGame();
  }
  else if (screen == 4) {
    greenLightScreen();
  }
  else if (screen == 5) {
    partyScreen();
  }
  else if (screen == 6) {
    nickPartyScreen();
  }
  else if (screen == 7) {
    storyModeGame();
  }
  else if (screen == 8) {
    nickAndGatsby();
  }
  else if (screen == 9) {
    gatsbyAndDaisy();
  }
  else if (screen ==10) {
    wait();
  }
  else if (screen ==11) {
    hehe();
  }
  else if(screen ==12) {
    end();
  }



}

function homeScreen() {
  background(homeimg);
  noStroke();
  fill("#1fdb1f");
  textAlign(CENTER, CENTER);
  textSize(64);
  text("Gatsby Run", width / 2, height / 6);
  textSize(18);
  text("Sammie Faella: Humanities Capstone", width / 2, height * 9 / 10)
  image(gimg, 30, 150, 150, 150);
  image(d1, 620, 150, 150, 150);

  instructionsButton.pos = { x: 100, y: 350 };
  startButton.pos = { x: 700, y: 350};
  if (instructionsButton.mouse.presses()) {
    instructionsButton.pos = { x: -100, y: -100 };
    startButton.pos = { x: -200, y: -200 };
    screen = 1;
  }
  else if (startButton.mouse.presses()) {
    instructionsButton.pos = { x: -100, y: -100 };
    startButton.pos = { x: -200, y: -200 };
    screen = 2;
  }

}

function instructionsScreen() {
  background(carbg);
  drawSpeechBubble(250, 150, 450, 80, 14, "Press Spacebar to Jump! \n Avoid the other women - \n Gatsby only has eyes for Daisy.");
  startButton2.pos = { x: 700, y: 300 };
  if (startButton2.mouse.presses()) {
    startButton2.pos = { x: -200, y: -200 };
    screen = 2;
  }

}

function chooseScreen() {
  background(255);
  image(ee, 0, 0, width / 2, height / 2);
  image(we, 400, 0, width / 2, height / 2);
  image(twocarbg, 0, 225, width, height / 2);
  noStroke();
  fill("black");
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Choose Your Game Mode", width / 2, 30);

  drawSpeechBubble(145, 250, 250, 50, 8, "East Egg:\nYou want the rich experience\nPlay Story Mode");
  drawSpeechBubble2(405, 250, 250, 50, 8, "West Egg:\nYou are straight to the point\nPlay Endless Mode");

  eeButton.pos = { x: 325, y: 188 };
  weButton.pos = { x: 475, y: 188 };
  if (eeButton.mouse.presses()) {
    eeButton.pos = { x: -200, y: -200 };
    weButton.pos = { x: -200, y: -200 };
    screen = 4;
  }
  if (weButton.mouse.presses()) {
    weButton.pos = { x: -200, y: -200 };
    eeButton.pos = { x: -200, y: -200 };
    screen = 3;
  }
}


function endlessGame() {
  // Truly random spawn system with bounds
  let currentTime = millis();

  // Check if it's time for a potential spawn
  if (currentTime - lastSpawnTime > minSpawnInterval) {
    // Random check within our time window
    // The longer it's been since the last spawn, the higher the chance
    let timeElapsed = currentTime - lastSpawnTime;
    let spawnChance = map(timeElapsed, minSpawnInterval, maxSpawnInterval, 0.1, 1);

    if (random() < spawnChance || timeElapsed > maxSpawnInterval) {
      girls.push(new Girl());
      lastSpawnTime = currentTime;
    }
  }

  background(bgimg);

  // Update and display girls
  for (let i = girls.length - 1; i >= 0; i--) {
    let girl = girls[i];
    girl.move();
    girl.show();

    // Check for collision with gatsby
    if (gatsby.hits(girl)) {
      console.log('game over');

      // Update high score if current score is higher
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
      }

      // Display game over text
      fill("#1fdb1f");
      stroke("black");
      strokeWeight(4);
      textSize(48);
      textAlign(CENTER);
      text("GAME OVER", width / 2, height / 2 - 30);
      textSize(24);
      text("Final Score: " + score, width / 2, height / 2 + 20);
      text("High Score: " + highScore, width / 2, height / 2 + 50);
      text("Press R to restart", width / 2, height / 2 + 80);
      text("Press E to exit", width/2, height/2 + 110);

      noLoop();
    }
    // Remove girls that have moved off-screen
    if (girl.x < -girl.s) {
      score++;
      girls.splice(i, 1);

      // Check if we've crossed a 10-point threshold
      if (Math.floor(score / 10) > Math.floor(lastScoreThreshold / 10)) {
        // Update speeds for all existing girls
        updateAllGirlSpeeds();
        console.log("Speed increased! New speed: " + calculateGirlSpeed(score));
      }
      lastScoreThreshold = score;

    }
  }

  gatsby.show();
  gatsby.move();

  // Display score
  stroke("black");
  strokeWeight(4);
  fill("#1fdb1f");
  textSize(24);
  textAlign(LEFT);
  text("Score: " + score, 20, 30);
  text("High Score: " + highScore, 20, 60);
}

function greenLightScreen() {
  background(greenlightbg);
  noStroke();
  fill("#1fdb1f");
  textAlign(CENTER, CENTER);
  textSize(15);
  text("Gatsby waits on the dock at night,\nstaring at the green light -\nthe symbol of his one true love.\nHe thought he had a great plan:\nhost the largest parties,\nand surely Daisy would\nshow up eventually.", 545, height/2);
  nextButton.pos = {x:675,y:375};
  if (nextButton.mouse.presses()) {
    screen+=1;
  }
}

function partyScreen() {
  background(watcherbg);
  noStroke();
  fill("#1fdb1f");
  textAlign(CENTER, CENTER);
  textSize(15);
  text("Gatsby watched night\nafter night,\nignoring all of his\nesteemed visitors,\nbut Daisy never\nshowed up.", 640, height/2);
  if (nextButton.mouse.presses()) {
    nextButton.pos = { x: -200, y: -200 };
    screen+=1;
  }
}

function nickPartyScreen() {
  background(nickbg);
  noStroke();
  fill("#1fdb1f");
  textAlign(CENTER,CENTER);
  textSize(15);
  text("Tonight was different.\nTonight, someone was here\nwho might know how to\nfind Daisy. Gatsby just\nhad to find him.",600,height/3);
  fgButton.pos = {x:675,y:350};
  if (fgButton.mouse.presses()) {
    fgButton.pos = { x: -200, y: -200 };
    screen+=1;
  }
}

function storyModeGame() {
  if (girlsSpawned < maxGirls) {
    // Truly random spawn system with bounds
    let currentTime = millis();

    // Check if it's time for a potential spawn
    if (currentTime - lastSpawnTime > minSpawnInterval) {
      // Random check within our time window
      // The longer it's been since the last spawn, the higher the chance
      let timeElapsed = currentTime - lastSpawnTime;
      let spawnChance = map(timeElapsed, minSpawnInterval, maxSpawnInterval, 0.1, 1);

      if (random() < spawnChance || timeElapsed > maxSpawnInterval) {
        girls.push(new Girl());
        girlsSpawned++; // NEW: Increment the counter
        lastSpawnTime = currentTime;
      }
    }
  }

  background(bgimg);

  // Update and display girls
  for (let i = girls.length - 1; i >= 0; i--) {
    let girl = girls[i];
    girl.move();
    girl.show();

    // Check for collision with gatsby
    if (gatsby.hits(girl)) {
      console.log('game over');

      // Update high score if current score is higher
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
      }

      // Display game over text
      fill("#1fdb1f");
      stroke("black");
      strokeWeight(4);
      textSize(48);
      textAlign(CENTER);
      text("GAME OVER", width / 2, height / 2 - 30);
      textSize(24);
      text("Final Score: " + score, width / 2, height / 2 + 20);
      text("High Score: " + highScore, width / 2, height / 2 + 50);
      text("Press R to restart", width / 2, height / 2 + 80);
      text("Press E to exit", width/2, height/2 + 110);

      noLoop();
    }
    // Remove girls that have moved off-screen
    if (girl.x < -girl.s) {
      score++;
      girls.splice(i, 1);

      // Check if we've crossed a 10-point threshold
      if (Math.floor(score / 10) > Math.floor(lastScoreThreshold / 10)) {
        // Update speeds for all existing girls
        updateAllGirlSpeeds();
        console.log("Speed increased! New speed: " + calculateGirlSpeed(score));
      }
      lastScoreThreshold = score;

    }
  }



  // NEW: Check if game is complete (50 girls passed and no girls left on screen)
  if (score >= maxGirls) {
    /*// Display victory text
    fill("#1fdb1f");
    stroke("black");
    strokeWeight(4);
    textSize(48);
    textAlign(CENTER);
    text("YOU WIN!", width / 2, height / 2 - 30);
    textSize(24);
    text("Gatsby dodged 50 partygoers", width / 2, height / 2 + 20);
    text("Final Score: " + score, width / 2, height / 2 + 50);
    text("Press R to restart", width / 2, height / 2 + 80);
    text("Press E to exit", width/2, height/2 + 110);*/

    //noLoop();
    screen = 8;
    //return; // Exit the function early
  }

  gatsby.show();
  gatsby.move();

  // Display score
  stroke("black");
  strokeWeight(4);
  fill("#1fdb1f");
  textSize(24);
  textAlign(LEFT);
  text("Partygoers Dodged: " + score + "/" + maxGirls, 20, 30); // NEW: Show progress
}


function nickAndGatsby() {
  background(talkingbg);
  noStroke();
  fill("#1fdb1f");
  textAlign(CENTER, CENTER);
  textSize(15);
  text("Gatsby was able to avoid the partygoers\nfor long enough to find Nick, who helped\narrange a meeting with Daisy.", 315, 400);
  nextButton.pos = {x:685,y:400};
  if (nextButton.mouse.presses()) {
    screen+=1;
  }
}

function gatsbyAndDaisy() {
  background(flowersbg);
  noStroke();
  fill("#1fdb1f");
  textAlign(CENTER, CENTER);
  textSize(15);
  text("Gatsby and Daisy met up.\nThey fell in love again like\nnothing had changed.", 250, 400);
  nextButton.pos = {x:685,y:400};
  if (nextButton.mouse.presses()) {
    screen+=1;
  }
}

function wait() {
  background(flowersbg);
  noStroke();
  fill("#1fdb1f");
  textAlign(CENTER, CENTER);
  textSize(15);
  text("Gatsby and Daisy met up.\nThey fell in love again like\nnothing had changed.", 250, 400);
  drawSpeechBubble2(590,125,200,200,24,"Wait,\ndidn't\nGatsby\ndie?")
  nextButton.pos = {x:685,y:400};
  if (nextButton.mouse.presses()) {
    screen+=1;
  }
}

function hehe() {
  background(mebg);
  drawSpeechBubble(475,25,300,120,16,"Yeah...we can just\nforget about that.\nToo depressing for\na video game.")
  drawArrowWithText(30,70,100,70,"Me","#1fdb1f");
  if (nextButton.mouse.presses()) {
    nextButton.pos = { x: -200, y: -200 };
    screen+=1;
  }
}

function end() {
  background(endbg);
  noStroke();
  fill("#1fdb1f");
  textAlign(CENTER, CENTER);
  textSize(10);
  text("Gatsby's dedication and\nloyalty allowed him\nto be reunited with Daisy.\nHis riches could have\nlanded him with any girl.\nHowever, all of his actions\nwere with the single goal of\ngetting back to Daisy\nand making himself into\na man she deserved,\nno matter how hopeless\nit may have seemed.", 150, 100);
  textSize(8);
  text("\"Gatsby believed in the green light,\nthe orgastc future that year by year\nrecedes before us.\nIt eluded us then, but that's no matter -\ntomorrow we will run faster,\nstrech out our arms farther....\nAnd one fine morning-\nSo we beat on, boats against the current\nborne back ceaselessly into the past.\"",625,75);
  textSize(10);
  text("The end.\nPress 'E' to exit",700,400);
  
}




// Function to calculate girl speed based on score
function calculateGirlSpeed(currentScore) {
  return 16 + (Math.floor(currentScore / 10) * 3);
}

// Function to update speeds for all girls
function updateAllGirlSpeeds() {
  for (let girl of girls) {
    girl.updateSpeed(score);
  }
}

function drawSpeechBubble(x, y, w, h, ts, message) {
  // Main bubble (rounded rectangle)
  fill("#1fdb1f");
  stroke(0);
  strokeWeight(2);
  rect(x, y, w, h, 10); // rounded corners

  // Speech bubble tail (triangle pointing down-left)
  triangle(x + 30, y + h, x + 10, y + h + 20, x + 50, y + h);

  // Text inside bubble
  fill("black");
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(ts);
  text(message, x + w / 2, y + h / 2);
}

function drawSpeechBubble2(x, y, w, h, ts, message) {
  // Main bubble (rounded rectangle)
  fill("#1fdb1f");
  stroke(0);
  strokeWeight(2);
  rect(x, y, w, h, 10); // rounded corners

  // Speech bubble tail (triangle pointing down-right)
  triangle(x + w - 30, y + h, x + w - 10, y + h + 20, x + w - 50, y + h);

  // Text inside bubble
  fill("black");
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(ts);
  text(message, x + w / 2, y + h / 2);
}


function drawArrowWithText(x1, y1, x2, y2, txt, col) {
  push();
  stroke(col);
  strokeWeight(3);
  fill(col);

  // Draw line
  line(x1, y1, x2, y2);

  // Calculate arrow head
  let angle = atan2(y2 - y1, x2 - x1);
  let arrowSize = 15;

  // Draw arrow head
  push();
  translate(x2, y2);
  rotate(angle);
  noStroke();
  triangle(0, 0, -arrowSize, -arrowSize/2, -arrowSize, arrowSize/2);
  pop();

  // Draw text along the arrow
  push();
  translate((x1 + x2) / 2, (y1 + y2) / 2);
  rotate(angle);
  textAlign(CENTER, BOTTOM);
  textSize(16);
  fill(col);
  noStroke();
  text(txt, 0, -5);
  pop();

  pop();
}



