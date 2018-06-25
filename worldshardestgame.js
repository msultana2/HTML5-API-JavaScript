/*
    Kent State University
    CS 44105/54105 Web Programming I
    Fall 2017
    Assignment 3
    The World’s Hardest Game 2 Remake
    helper.js
    Author 1: Abdulkareem Alali, aalali1@kent.edu
    Author 2: Most Arjuman Sultana, msultana@kent.edu
*/

var newStyle = document.createElement("style");
newStyle.appendChild(document.createTextNode('@font-face {font-family: mono45-headline;src: url("https://use.typekit.net/af/2242e8/00000000000000003b9afa2a/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff2"),url("https://use.typekit.net/af/2242e8/00000000000000003b9afa2a/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff"),url("https://use.typekit.net/af/2242e8/00000000000000003b9afa2a/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("opentype");'));
document.head.appendChild(newStyle);

const DARKBLUE = "rgb(0,0,139)";
const BACKGROUND_IMAGE = "images/world-hardest-game-2-bg-level-1.png";
const SCREENS = {
    screen3 : {
        gameCenterWall : {
            top : 100,
            bottom : 355,
            }
    }
}
const BALLS = {
    pair1 : {
        ball1 : ["p1b1", 400, 150, 11, 5, DARKBLUE],
        ball2 : ["p1b2", 443, 150, 11, 5, DARKBLUE]
    },
    pair2 : {
        ball1 : ["p1b1", 486, 305, 11, 5, DARKBLUE],
        ball2 : ["p1b2", 529, 305, 11, 5, DARKBLUE]
    },
    pair3 : {
        ball1 : ["p1b1", 572, 150, 11, 5, DARKBLUE],
        ball2 : ["p1b2", 615, 150, 11, 5, DARKBLUE]
    }
}

const gamePiece = {
	gamePieceDim : [20, 20, "red", 250, 220]
}

const COINS = {
    coin1: [419, 260, 11],
    coin2: [506, 174, 11],
    coin3: [592, 260, 11]
}

var obs;
var volume;
var music;
var coinSound;
var pauseState = false;
var muteState = false;
var deaths = 0;
var coinArray;
var coin1;
var coin2;
var coin3;
var coinCollector;

window.addEventListener("load", function () {
    
    screen1();
    
    var spanNode = document.createElement("span");
    spanNode.innerHTML = '<input type="button" id="begin" style=" text-align:center;width: 200px;height: 40px;background-color: transparent;border: none;color: white; font-size: 40px; position: relative; bottom: 100px;right: 600px;" value="BEGIN">';
    
    setTimeout(function () {
        screen1withBegin();
        document.body.children[0].children[0].appendChild(spanNode);

        document.getElementById("begin").onclick = function () {
            screen2();
        };

        document.getElementById("begin").onmouseover = function () { 
            document.getElementById("begin").style.color = "grey";
        };

        document.getElementById("begin").onmouseout = function () { 
        document.getElementById("begin").style.color = "white";
    };
    }, 2000);

});

function screen1() {

    var removeMenu = document.body.children[0].children[0].children[0];
    removeMenu.style.display = "none";
    var canvas = document.querySelector("canvas");
    var ctx = canvas.getContext("2d");

    var grd = ctx.createLinearGradient(canvas.width*3/5, 0, canvas.width*3/5, canvas.height);

    grd.addColorStop(0, "Black");
    grd.addColorStop(0.5, "#444");
    grd.addColorStop(1, "Black");

    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("THE WORLD'S",  170, 100);

    ctx.beginPath();
    ctx.font = "bold 150px mono45-headline, monospace"
    ctx.strokeStyle = "white";
    ctx.lineWidth = 0.5;
    ctx.strokeText("HARDEST GAME", 500, 221);
    ctx.shadowColor = "white";
    ctx.shadowOffsetX = 0; 
    ctx.shadowOffsetY = 0; 
    ctx.shadowBlur = 2;
    ctx.font = "150px mono45-headline, monospace";
    ctx.textBaseline = "alphabetic";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.fillStyle = "#234E8B";
    ctx.fillText("HARDEST GAME", 500, 221);
    ctx.strokeText("HARDEST GAME", 500, 221); 
    ctx.textBaseline = "alphabetic";
    ctx.closePath();

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("VERSION 2.0",835, 255);
    ctx.fillStyle = "white";

    ctx.fillRect(200, 350, 600, 15);
    ctx.font = "13px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("This is the world's hardest game. It is harder than any game you have ever played, or ever will play", 500, 380);
}

function screen2() {
    
    var beginGame = document.getElementById("begin");
    beginGame.parentNode.removeChild(beginGame);
    var canvas = document.querySelector("canvas");
    var ctx = canvas.getContext("2d");

    var sndGrd = ctx.createLinearGradient(150, 300, 150, 0);
   
    sndGrd.addColorStop(0, "#b7c2ff");
    sndGrd.addColorStop(0.5, "#b7c2ff");
 
    ctx.fillStyle = sndGrd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center";
    ctx.font = "bold 50px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("YOU DON'T STAND A CHANCE.", canvas.width / 2, canvas.height / 2);
	
    setTimeout(function () {
        var removeMenu = document.body.children[0].children[0].children[0];
        removeMenu.style.display = "flex";
        startGame();
    }, 2000);
}

function startGame(){
    game.init();
    obs = new obstacles(game);    
    volume = new sound("soundeffects/RealisticPunch.mp3");
    music = new sound("soundeffects/World'sHardestGame2ThemeSong.mp3");
    coinSound = new sound("soundeffects/CoinCollect.wav");
    music.play();
    coinArray = new coinsObstacle();
    window.addEventListener("keydown", pauseByKeyboard, false);
    window.addEventListener("keydown", muteByKeyboard, false);
    document.getElementById("pauseState").addEventListener("click", gamePauseStatus);
    document.getElementById("mutegame").addEventListener("click", gameMuteStatus)    
}

var game = {
    canvas: null,
    ctx : null,
    init : function() {

    	this.coinradiusX = 11;
    	this.coinradiusY = 11;

        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.interval = setInterval(update, 20);

        window.addEventListener("keydown", function (e) {
            game.key = e.keyCode;
        });
        window.addEventListener("keyup", function (e) {
            game.key = false;
        });   
    },
    drawBackground: function(){
        if (this.ctx != undefined){
            var img = new Image;
            img.src = BACKGROUND_IMAGE;
            this.ctx.drawImage(img, 0, 0);
        }
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    getContext: function(){
        return this.ctx;
    }
}

function pauseByKeyboard(e) {
     if(e.ctrlKey && e.keyCode == 80)
     	gamePauseStatus();
}

function muteByKeyboard(e) {
	 if(e.ctrlKey && e.keyCode == 77)
	 	music.mute();
}

function gameMuteStatus() {
	   music.mute();
}

function gamePauseStatus() {
    pauseState = (pauseState)? false:true;
}

function obstacles(game){
    //create the array of balls that will be animated
    this.game = game;
    this.balls = [ ball.construct(BALLS.pair1.ball1),
                   ball.construct(BALLS.pair1.ball2),
                   ball.construct(BALLS.pair2.ball1),
                   ball.construct(BALLS.pair2.ball2),
                   ball.construct(BALLS.pair3.ball1),
                   ball.construct(BALLS.pair3.ball2)
                ];

    this.gamepiece = playerFunctionality.construct(gamePiece.gamePieceDim);  
  
    this.animate = function(){
        //loop through the balls array
        //draw the balls
        this.game.drawBackground();
        for (var i = 0; i < this.balls.length; i++){
            this.balls[i].animate(this.game.getContext());
        }

        this.gamepiece.updateGamePiece();
        updateGamePiecePlace();
        coinArray.update();
    }
}

function ball(name, x, y, radius, speed, color){
    this.name = name,
    this.x = x,
    this.y = y,
    this.radius = radius,
    this.speed = speed,
    this.color = color,
    this.animate = function(ctx){
        //Draw ball
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
      
        //Animate
        var wall = SCREENS.screen3.gameCenterWall;        
        if (this.y - this.radius + this.speed < wall.top
         || this.y + this.radius + this.speed > wall.bottom){
          this.speed = -this.speed;
        }
        this.y += this.speed;
    }
}

// Player functionality
function playerFunctionality(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color; 
    this.x = x;
    this.y = y;    
    this.speedX = 0;
    this.speedY = 0;   
    this.updateGamePiece = function() {
        ctx = game.getContext();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);   
    }

    this.collisionWithBall = function(otherobj) {
        var left = this.x;
        var right = this.x + (this.width);
        var top = this.y;
        var bottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.radius);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.radius);
        var crash = true;
        if ((bottom < othertop) || (top > otherbottom) || (right < otherleft) || (left > otherright)) {
            crash = false;
        }
        return crash;
    }

    this.newPosition = function() {
        
        this.x += this.speedX;
        this.y += this.speedY;

        gameCompleted(this.x);

        console.log("x: "+this.x+" y: "+this.y); 
        this.verticalWall();
        this.horizontalWall();       
    }

    this.verticalWall = function() {
    	if(((this.x > 213 && this.x < 367) && this.y < 144)|| ((this.x > 635 && this.x < 790) && this.y < 144)) 
    		this.y = 144;
    	if(((this.x > 213 && this.x < 367) && this.y > 293) || ((this.x > 635 && this.x < 790) && this.y > 293))
    		this.y = 293;
    	if(this.y < 100)
    		this.y = 100;
    	if(this.y > 335)
    		this.y = 335;
    }

    this.horizontalWall = function() {
    	if((this.x < 384 && (this.y > 99 && this.y < 141)) || (this.x < 384 && (this.y < 336 && this.y > 297)))
    		this.x = 385;
    	if((this.x > 619 && (this.y > 99 && this.y < 141)) || (this.x > 619 && (this.y < 336 && this.y > 297)))
    		this.x = 619;
    	if(this.x < 214)
    		this.x = 214;
    	if(this.x > 789)
    		this.x = 789;
    }

     this.collisionhWithCoin = function (otherobj) {
        var left = this.x;
        var right = this.x + (this.width);
        var top = this.y;
        var bottom = this.y + (this.height);
        var otherleft = otherobj[0];
        var otherright = otherobj[0] + (otherobj[2]);
        var othertop = otherobj[1];
        var otherbottom = otherobj[1] + (otherobj[2]);
        var crash = true;
        if ((bottom < othertop) || (top > otherbottom) || (right < otherleft) || (left > otherright)) {
            crash = false;
        }
        return crash;
    }

}

function gameCompleted(destinationArea) {

    if(coinCollector == 3 && destinationArea > 719)
    {
        music.stop();
        alert("You Made It!");
        document.getElementById("deathscount").innerHTML=0;
        game.stop();
    }
}

function updateGamePiecePlace()
{
	obs.gamepiece.speedX = 0;
	obs.gamepiece.speedY = 0;
	if (game.key && game.key == 37) {obs.gamepiece.speedX = -3; }
    if (game.key && game.key == 39) {obs.gamepiece.speedX = 3; }
    if (game.key && game.key == 38) {obs.gamepiece.speedY = -3; }
    if (game.key && game.key == 40) {obs.gamepiece.speedY = 3; }
    obs.gamepiece.newPosition();
	obs.gamepiece.updateGamePiece();
}

// sound implementation
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    
    document.body.appendChild(this.sound);
    
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
    this.mute = function(){
        muteState = (this.sound.muted)? false:true;
        this.sound.muted = muteState;
    }    
}

function totalDeaths()
{
        var deathscount = document.getElementById("deathscount");
        for (i = 0; i < obs.balls.length; i += 1) {
            if (obs.gamepiece.collisionWithBall(obs.balls[i])) {
                volume.play();
                deaths += 1;
                deathscount.innerHTML = deaths;
                music.stop();
                game.stop();
                game.clear();
                startGame();
                return;
            }
        }
}

// update loop of the game
function update() {
    if (pauseState) { return; }
    else {
    	totalDeaths();
    	coinRepetition();
    	game.clear();
    	obs.animate();
	}
}

// Coins Functionality
function coinsObstacle() {
    this.coin1 = true;
    this.coin2 = true;
    this.coin3 = true;

    this.update = function () {
       
        ctx = game.getContext();
        ctx.fillStyle = "Green";
        
        if (game.coinradiusX != 0) {
            game.coinradiusX -= 1;
        }
        else {
            game.coinradiusX = 12;
        }
        if (this.coin1 == true) {
            ctx.beginPath();
            ctx.ellipse(COINS.coin1[0], COINS.coin1[1], game.coinradiusX, game.coinradiusY, 0, 0, Math.PI * 2, true);
            ctx.fill();
        }
        if (this.coin2 == true) {
            ctx.beginPath();
            ctx.ellipse(COINS.coin2[0], COINS.coin2[1], game.coinradiusX, game.coinradiusY, 0, 0, Math.PI * 2, true);
            ctx.fill();
        }
        if (this.coin3 == true) {

            ctx.beginPath();
            ctx.ellipse(COINS.coin3[0], COINS.coin3[1], game.coinradiusX, game.coinradiusY, 0, 0, Math.PI * 2, true);
            ctx.fill();
        }
    }
}

function coinRepetition() {
var coins=0;

      for (coins = 0; coins < 3; coins++) {

            coinCollector = 0;
        
            if (obs.gamepiece.collisionhWithCoin(COINS.coin1)) {
                coinSound.play();
                coinArray.coin1 = false;
            }
        
            if (obs.gamepiece.collisionhWithCoin(COINS.coin2)) {
                coinSound.play();
                coinArray.coin2 = false;
            }
        
            if (obs.gamepiece.collisionhWithCoin(COINS.coin3)) {
                coinSound.play();
                coinArray.coin3 = false;
            }
        
            if(coinArray.coin1 == false && coinArray.coin2 == false && coinArray.coin3 == false)
            {
                coinCollector = 3;
            }
           
        }
}

function screen1withBegin() {
    var canvas = document.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    
    var grd = ctx.createLinearGradient(canvas.width*3/5, 0, canvas.width*3/5, canvas.height);
    
    grd.addColorStop(0, "Black");
    grd.addColorStop(0.5, "#444");
    grd.addColorStop(1, "Black");
    
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.textAlign = "center";
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("THE WORLD'S", 170, 100);
    
    ctx.beginPath();
    ctx.font = "bold 150px mono45-headline, monospace"
    ctx.strokeStyle = "white";
    ctx.lineWidth = 0.5;
    ctx.strokeText("HARDEST GAME", 500, 221);
    ctx.shadowColor = "white";
    ctx.shadowOffsetX = 0; 
    ctx.shadowOffsetY = 0; 
    ctx.shadowBlur = 2;
    ctx.font = "150px mono45-headline, monospace";
    ctx.textBaseline = "alphabetic";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.fillStyle = "#234E8B";
    ctx.fillText("HARDEST GAME", 500, 221);
    ctx.strokeText("HARDEST GAME", 500, 221); 
    ctx.textBaseline = "alphabetic";
    ctx.closePath();
    ctx.font = "30px Arial";
    ctx.fillStyle = "White";
    ctx.fillText("VERSION 2.0", 835, 255);

}