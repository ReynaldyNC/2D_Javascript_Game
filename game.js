var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 415;
document.body.appendChild(canvas);

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
    
    bgReady = true;
};
bgImage.src = "images/bg.jpg";

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function(){

    heroReady = true;
};
heroImage.src = "images/hero.png";

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){

    monsterReady = true;
};
monsterImage.src = "images/monster.png";

var hero = {
    speed: 256
};
var monster = {};
var monsterCaught = 0;

var keysDown = {};

addEventListener("keydown",function (key){
    keysDown[key.keyCode] = true;
},false);
addEventListener("keyup",function (key){
    delete keysDown[key.keyCode];
},false);

var reset = function(){

    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

var update = function(modifier){
    if(38 in keysDown){
        hero.y -= hero.speed * modifier;
    }
    if(40 in keysDown){
        hero.y += hero.speed * modifier;
    }
    if(37 in keysDown){
        hero.x -= hero.speed * modifier;
    }
    if(39 in keysDown){
        hero.x += hero.speed * modifier;
    }
    
    if(
        hero.x <= (monster.x + 32) && monster.x <= (hero.x + 32) && hero.y <= (monster.y + 32) && monster.y <= (hero.y + 32)
    ){
        ++monsterCaught;
        reset();
    }
};

var render = function(){
    if(bgReady){
        ctx.drawImage(bgImage, 0, 0);
    }
    if(heroReady){
        ctx.drawImage(heroImage, hero.x, hero.y);
    }
    if(monsterReady){
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Monster Caught: " + monsterCaught, 20, 20);
    ctx.fillText("Time: " + count, 20, 50);

    if(finished == true){
        ctx.fillText("Game Over!", 200, 220);
    }

};
var count = 30;
var finished = false;
var counter = function(){
    count = count - 1;


    if(count <= 0)
    {
        
        clearInterval(counter);
        
        finished = true;
        count = 0;
        
        monsterReady = false;
        heroReady = false;
    }
}

setInterval(counter, 1000);

var main = function(){

    update(0.02);
    
    render();
    
    requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

reset();
main();