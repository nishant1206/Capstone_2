var player, player_img1, player_img2, player_img3, player_img4;
var backface, backface_img;
var edge;
var ob, ob_img, ob_inverted, ob_inverted_img, bullet_group, bullet_img;
var Dora_Cake, Dora_Cake_img, DoraCake_group;
var backface2_img;

var char1 = document.getElementsByTagName("img")[0];
var char2 = document.getElementsByTagName("img")[1];
var char3 = document.getElementsByTagName("img")[2];
var char4 = document.getElementsByTagName("img")[3];
var char5 = document.getElementsByTagName("img")[4];
var char_change_button = document.getElementById("change_char");
var body = document.getElementsByTagName("body")[0];

var game_state = "play";

var points = 0;

var score = 0;

localStorage["HighScore"] = 0;

// var input = document.createElement("input");

function preload() {
    player_img1 = loadImage("doraemon.png");
    player_img2 = loadImage("Riruru.png");
    player_img3 = loadImage("Zandacraus.png");
    player_img4 = loadImage("gian.png");
    backface_img = loadImage("backface.jpg");
    backface2_img = loadImage("backface2.png");
    backface3_img = loadImage("backface3.jpg");
    ob_img = loadImage("gian.png");
    ob_inverted_img = loadImage("suneo.png");
    Dora_Cake_img = loadImage("DoraCake.gif");
    bullet_img = loadImage("bullet.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    //background
    backface = createSprite(windowWidth / 2, windowHeight / 2);
    backface.addImage(backface_img);
    backface.scale = 1;
    backface.velocityX = -2;

    //player
    player = createSprite(windowWidth / 10, windowHeight / 2);
    char1.addEventListener("click", function() {
        player.scale = 0.3356;
        player.addImage(player_img1);
        var Canvas = document.createElement("script");
        Canvas.setAttribute("src", "sketch.js");
        window.scrollTo(0, windowHeight);
        var body = document.getElementsByTagName("body")[0];
        body.style.overflow = "hidden";
        // player.debug = true;
        player.setCollider("rectangle", 0, 0, player.width + 20, player.height + 100);
        char_change_button.style.display = "flex";
        char_change_button.style.justifyContent = "center";
    });
    char2.addEventListener("click", function() {
        player.scale = 0.4;
        player.addImage(player_img2);
        var Canvas = document.createElement("script");
        Canvas.setAttribute("src", "sketch.js");
        window.scrollTo(0, windowHeight);
        body = document.getElementsByTagName("body")[0];
        body.style.overflow = "hidden";
        player.setCollider("rectangle", 0, 0, player.width + 20, player.height + 100);
        char_change_button.style.display = "flex";
        char_change_button.style.justifyContent = "center";
    });
    char3.addEventListener("click", function() {
        player.addImage(player_img3);
        var Canvas = document.createElement("script");
        Canvas.setAttribute("src", "sketch.js");
        window.scrollTo(0, windowHeight);
        body = document.getElementsByTagName("body")[0];
        body.style.overflow = "hidden";
        player.setCollider("rectangle", 0, 0, player.width + 20, player.height + 100);
        char_change_button.style.display = "flex";
        char_change_button.style.justifyContent = "center";
    });
    char4.addEventListener("click", function() {
        player.addImage(player_img4);
        var Canvas = document.createElement("script");
        Canvas.setAttribute("src", "sketch.js");
        window.scrollTo(0, windowHeight);
        body = document.getElementsByTagName("body")[0];
        body.style.overflow = "hidden";
        player.setCollider("rectangle", 0, 0, player.width + 20, player.height + 100);
        char_change_button.style.display = "flex";
        char_change_button.style.justifyContent = "center";
    });
    char5.addEventListener("click", function() {
        player.scale = 0.125;
        player.addImage(ob_inverted_img);
        var Canvas = document.createElement("script");
        Canvas.setAttribute("src", "sketch.js");
        window.scrollTo(0, windowHeight);
        body = document.getElementsByTagName("body")[0];
        body.style.overflow = "hidden";
        player.setCollider("rectangle", 0, 0, player.width + 20, player.height + 100);
        char_change_button.style.display = "flex";
        char_change_button.style.justifyContent = "center";
    });

    char_change_button.addEventListener("click", function() {
        body.style.overflow = "visible";
        window.scrollTo(0, 0);
        char_change_button.style.display = "none";
    });

    player.scale = 0.5;
    // player.debug = true;
    player.setCollider("rectangle", 0, 0, player.width, player.height);

    //creating Edges
    edge = createEdgeSprites();

    //Creating Obsticles Groups
    ob = new Group();
    ob_inverted = new Group();
    DoraCake_group = new Group();
    bullet_group = new Group();
}

function draw() {

    if (game_state == "play") {
        if (keyDown("space")) {
            player.velocityY = -4;
        }
        player.velocityY = player.velocityY + 0.2;

        if (keyDown("right")) {
            player.x = player.x + 10;
        }

        if (keyDown("left")) {
            player.x = player.x - 10;
        }

        if (player.isTouching(edge[0]) || player.isTouching(edge[1]) || player.isTouching(edge[2]) || player.isTouching(edge[3]) || player.isTouching(ob) || player.isTouching(ob_inverted) || player.isTouching(bullet_group)) {
            game_state = "over";
        }

        if (backface.x <= windowWidth / 4) {
            backface.x = windowWidth / 2;
        }

        if (frameCount % 2 == 0) {
            score++;
        }
        if (score > 300) {
            backface.scale = 4;
            backface.addImage(backface3_img);
        }
        if (score > 500) {
            backface.scale = 1.5;
            backface.addImage(backface2_img);
        }
    }

    obsticles();
    obsticles_2();
    bullet();
    doracake();

    if (DoraCake_group.isTouching(player)) {
        points++;
        DoraCake_group.destroyEach();
    }

    drawSprites();

    fill(rgb(255, 255, 255));
    textSize(40);
    text("Points : " + points, windowWidth / 4.5, 40)
    text("Score : " + score, windowWidth / 1.5, 40);
    text("HighScore : " + localStorage["HighScore"], windowWidth / 2.5, 40)

    if (game_state == "over") {
        backface.velocityX = 0;
        player.velocityY = 0;
        DoraCake_group.setVelocityXEach(0);
        ob.setVelocityXEach(0);
        ob_inverted.setVelocityXEach(0);
        bullet_group.setVelocityXEach(0);
        DoraCake_group.destroyEach();
        if (score > localStorage["HighScore"]) {
            localStorage["HighScore"] = score;
        }
        fill(rgb(255, 255, 255));
        textSize(80);
        text("Game Over !", windowWidth / 3, windowHeight / 2);
        textSize(40);
        text("\n Points : " + points + " and " + "HighScore : " + localStorage["HighScore"], windowWidth / 3.25, windowHeight / 1.75);
        text("Press 'r' To Restart", windowWidth / 2.75, windowHeight / 1.25);

        if (keyDown("r")) {
            obst.x = windowWidth + 50;
//             player.x = windowWidth / 10;
//             player.y = windowHeight / 2;
//             game_state = "play";
            reset();
        }
    }
}

function obsticles() {
    if (frameCount % 121 == 0) {
        var obst_spawn = random(windowHeight / 8, windowHeight - 100);
        var obst = createSprite(windowWidth + 50, obst_spawn, 40, random(windowHeight / 4, windowHeight / 1.8));
        obst.velocityX = -5;
        obst.collide = edge[2];
        // obst.scale = random(1, 2);
        obst.addImage(ob_img);
        // obst.debug = true;
        obst.setCollider("rectangle", 0, 0, 150, 200);
        ob.add(obst);
    }
}

function obsticles_2() {
    if (frameCount % 142 == 0) {
        var obst2_spawn = random(windowHeight / 8, windowHeight);
        var obst_2 = createSprite(windowWidth + 50, obst2_spawn, 40, random(windowHeight / 4, windowHeight / 1.8));
        obst_2.scale = 0.25;
        obst_2.velocityX = -5;
        // obst_2.debug = true;
        obst_2.setCollider("rectangle", 0, 0, 280, 650);
        obst_2.addImage(ob_inverted_img);
        ob_inverted.add(obst_2);
    }
}

function bullet() {
    if (frameCount % 102 == 0) {
        var bullet = random(windowHeight / 8, windowHeight);
        var bullet_go = createSprite(windowWidth + 50, bullet, 60, 20);
        bullet_go.addImage(bullet_img);
        // bullet_go.debug = true;
        bullet_go.setCollider("rectangle", 0, 0, 160, 50);
        bullet_go.velocityX = -8;
        bullet_group.add(bullet_go);
    }
}

function doracake() {
    if (frameCount % 198 == 0) {
        var dora = createSprite(windowWidth + 80, random(40, windowHeight - 60));
        dora.addImage(Dora_Cake_img);
        dora.velocityX = -5;
        dora.scale = 0.5;
        dora.depth = player.depth - 1;
        DoraCake_group.add(dora);
    }
}

function reset() {
    score = 0;
    game_state = "play";
    player.x = windowWidth / 10;
    player.y = windowHeight / 2;
}
