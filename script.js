var char1 = document.getElementsByTagName("img")[0];
var char2 = document.getElementsByTagName("img")[1];
var char3 = document.getElementsByTagName("img")[2];
var char4 = document.getElementsByTagName("img")[3];

char1.addEventListener("click", function c1() {
    player_img = loadImage("doraemon.png");
    draw();
});

char2.addEventListener("click", function c1() {
    player_img = loadImage("Riruru.png");
    draw();
});
char3.addEventListener("click", function c1() {
    player_img = loadImage("Zandacraus.png");
    draw();
});
char4.addEventListener("click", function c1() {
    player_img = loadImage("Gian");
    draw();
});