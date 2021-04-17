function init() {

  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var fonts = ["Times", "Arial", "Courier"];
  var fontSize = 28;
  var randomFontsInButtons = false;

  function getBorderCoords() {
    var x, y;
    if (Math.random() > 0.5) {
      if (Math.random() > 0.5) {
        x = 0; y = Math.random() * (canvas.height - fontSize);
      }
      else {
        x = canvas.width - fontSize; y = Math.random() * (canvas.height - fontSize);
      }
    }
    else {
      if (Math.random() > 0.5) {
        x = Math.random() * (canvas.width - fontSize); y = 0;
      }
      else {
        x = Math.random() * (canvas.width - fontSize); y = canvas.height - fontSize;
      }
    }
    return [x, y];
  }

  var canvas = document.getElementById("menu animation");
  var stage = new createjs.Stage(canvas);
  
  stage.enableMouseOver(10);

  // letters into the page
  for (var i = 0; i < 100; i++) {
    var lett = alphabet[Math.random() * alphabet.length | 0];
    var font = fonts[Math.random() * fonts.length | 0];
    var randomLetter = new createjs.Text(lett, fontSize + "px " + font, "#000000");

    randomLetter.x = 0;
    randomLetter.y = 0;
    randomLetter.speed = Math.random() * 2000 + 500;
    randomLetter.reveal = Math.random() * 4000 + 1000;
    randomLetter.alpha = 0;

    createjs.Tween.get(randomLetter, {loop: 0})
      .wait(randomLetter.reveal)
      .to({alpha: 1}, 500);

    if (i > 50) {
      createjs.Tween.get(randomLetter, {loop: -1})
        .to({x: 0, y: canvas.height - fontSize}, randomLetter.speed)
        .to({x: canvas.width - fontSize, y: canvas.height - fontSize}, randomLetter.speed)
        .to({x: canvas.width - fontSize, y: 0}, randomLetter.speed)
        .to({x: 0, y: 0}, randomLetter.speed);
    }
    else {
      createjs.Tween.get(randomLetter, {loop: -1})
        .to({x: canvas.width - fontSize, y: 0}, randomLetter.speed)
        .to({x: canvas.width - fontSize, y: canvas.height - fontSize}, randomLetter.speed)
        .to({x: 0, y: canvas.height - fontSize}, randomLetter.speed)
        .to({x: 0, y: 0}, randomLetter.speed);
    }

    stage.addChild(randomLetter);
  }

  function makeWordButton(word, xPos, yPos, time, fn) {

    var maxX = xPos;
    var maxY = yPos;
    var minX = xPos;
    var minY = yPos;

    var maxTime = 0;

    for (let i = 0; i < word.length; i++) {
      if (randomFontsInButtons) {var font = fonts[Math.random() * fonts.length | 0];}
      else {var font = fonts[0];}
      var letter = new createjs.Text(word[i], fontSize + "px " + font, "#000000");
      letter.finalX = xPos;
      letter.finalY = yPos;

      var coords = getBorderCoords();

      letter.x = coords[0];
      letter.y = coords[1];
      letter.speed = Math.random() * 2000 + 500;
      letter.reveal = Math.random() * 2000 + time + 2000;
      maxTime = Math.max(maxTime, letter.reveal + letter.speed);
      letter.alpha = 0;

      createjs.Tween.get(letter, {loop: 0})
        .wait(letter.reveal)
        .to({alpha: 1}, 500)
        .to({x: letter.finalX, y: letter.finalY}, letter.speed);

      stage.addChild(letter);

      xPos = letter.finalX + letter.getMeasuredWidth();

      if (letter.finalX + letter.getMeasuredWidth() > maxX) {maxX = xPos;}
      if (letter.finalY + letter.getMeasuredHeight() > maxY) {maxY = yPos + letter.getMeasuredHeight();}
      if (letter.finalX < minX) {minX = letter.finalX;}
      if (letter.finalY < minY) {minY = letter.finalY;}
    }

    function handleInteraction(event) {
        event.target.alpha = (event.type == "mouseover") ? 0.4 : 0.01; 
    }

    var rect = new createjs.Shape();
    rect.graphics.beginFill("#555555").drawRect(minX - 2, minY - 2, maxX - minX + 2, maxY - minY + 2);
    rect.alpha = 0;
    createjs.Tween.get(rect, {loop: 0})
        .wait(maxTime)
        .to({alpha: 0.01});
    
    rect.on("click", fn);
    rect.on("mouseover", handleInteraction);
    rect.on("mouseout", handleInteraction);

    stage.addChild(rect);

  }

  makeWordButton("About", 60, 60, 0, gotoAbout);
  makeWordButton("Poetry", 60, 95, 1500, gotoPoetry);
  makeWordButton("Stories", 60, 130, 3000, gotoStories);
  makeWordButton("QFAs", 60, 165, 4500, gotoQFA);

  function gotoAbout() {
    window.open ('index.html#about','_self',false);
  }

  function gotoPoetry() {
    window.open ('poetry.html','_self',false);
  }

  function gotoStories() {
    window.open ('stories.html','_self',false);
  }

  function gotoQFA() {
    window.open ('index.html#qaf','_self',false);
  }

  createjs.Ticker.addEventListener("tick", stage);
}
