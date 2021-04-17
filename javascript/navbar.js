function init() {

  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var fonts = ["Times", "Arial", "Courier"];
  var fontSize = 28;
  var randomFontsInButtons = false;

  var canvas = document.getElementById("nav bar");
  var stage = new createjs.Stage(canvas);
  
  stage.enableMouseOver(10);

  // letters into the page
  for (var i = 0; i < 100; i++) {
    var lett = alphabet[Math.random() * alphabet.length | 0];
    var font = fonts[Math.random() * fonts.length | 0];
    var randomLetter = new createjs.Text(lett, fontSize + "px " + font, "#000000");

    randomLetter.speed = Math.random() * 3000 + 1000;
    randomLetter.reveal = Math.random() * 1000 + 250;
    randomLetter.wait = Math.random() * 500; 
    randomLetter.disappear = Math.random() * 1000 + 1500;
    randomLetter.alpha = 0;
    randomLetter.y = 0;

    createjs.Tween.get(randomLetter, {loop: 0})
      .wait(randomLetter.reveal)
      .to({alpha: 1}, 500)
      .wait(randomLetter.disappear)
      .to({alpha: 0}, 500);

    if (i > 50) {
      randomLetter.x = -5 * Math.random() * fontSize;
    
      createjs.Tween.get(randomLetter, {loop: -1})
        .to({x: canvas.width + fontSize, y: 0}, randomLetter.speed);
    }
    else {
      randomLetter.x = canvas.width + 5 * fontSize;
    
      createjs.Tween.get(randomLetter, {loop: -1})
        .to({x: -1 * fontSize, y: 0}, randomLetter.speed);
    }

    stage.addChild(randomLetter);
  }

  function makeWordButtonNav(word, xPos, yPos, fn) {

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

      if (Math.random() > 0.5) {letter.x = 0;}
      else {letter.x = canvas.width - fontSize;}
      
      letter.y = 0;
      letter.speed = Math.random() * 2000 + 500;

      letter.reveal = Math.random() * 2000 + 1000;
      maxTime = Math.max(maxTime, letter.reveal + letter.speed);
      letter.alpha = 0;

      createjs.Tween.get(letter, {loop: 0})
        .wait(letter.reveal)
        .to({alpha: 1}, 500)
        .to({x: letter.finalX, y: letter.finalY}, letter.speed);

      stage.addChild(letter);

      xPos = letter.finalX + letter.getMeasuredWidth();
      if (letter.finalX > maxX) {maxX = xPos;}
      if (letter.finalY + letter.getMeasuredHeight() > maxY) {maxY = letter.finalY + letter.getMeasuredHeight();}
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

  makeWordButtonNav("Home", 0, 0, gotoHome);
  makeWordButtonNav("Random", 334, 0, gotoRandom);

  function gotoHome() {
    window.open ('index.html','_self',false);
  }
  function gotoRandom() {
    pages = ["index.html", "index.html",
             "poetry.html", "poetry.html", "poetry.html", "poetry.html",
             "stories.html", "stories.html", "stories.html", "stories.html",
             "notes.html",
             "submit.html"];
    page = pages[Math.random() * pages.length | 0];
    window.open (page,'_self',false);
  }

  createjs.Ticker.addEventListener("tick", stage);
}
