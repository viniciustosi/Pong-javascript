//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadexBolinha = 6;
let velocidadeyBolinha = 6;

//variaveis da nossa raquete
let xRaquete = 5;
let yRaquete = 150;
let RaqueteComprimento = 10;
let RaqueteAltura = 90;

//variaveis oponente
let xRaqueteCPU = 585;
let yRaqueteCPU = 150;
let VelocidadeYCPU = 0;
let chanceDeErrar = 0;

let colidiu = false;

//variaveis placar
let MeusPontos = 0;
let CPUpontos = 0;

//sons do jogo
let raquetada;
let ponto;
let triha;

function preload (){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostrabolinha ();
  movimentabolinha ();
  vericacolisaoborda ();
  mostraraquete (xRaquete, yRaquete);
  mostraraquete (xRaqueteCPU, yRaqueteCPU);
  movimentaminharaquete ();
  //verificacolisaocomaraquete ();
  MovimentaRaqueteCPU ();
  VerificaColisaoRaquete (xRaquete, yRaquete);
  VerificaColisaoRaquete (xRaqueteCPU, yRaqueteCPU);
  incluiPlacar ();
  MarcaPonto ();
  calculaChanceDeErrar();
  bolinhaNaoFicaPresa();
}

//funções

function mostrabolinha ()
{
  circle (xBolinha, yBolinha, diametro)
}

function movimentabolinha ()
{
 yBolinha += velocidadeyBolinha;
 xBolinha += velocidadexBolinha;
}

function vericacolisaoborda ()
{
  if (xBolinha + raio> width ||
      xBolinha - raio < 0 ){
    velocidadexBolinha *=-1;
      }
  if (yBolinha + raio> height ||
    yBolinha - raio < 0){
      velocidadeyBolinha *=-1;
    }
}  

function mostraraquete (x,y)
{
  rect (x, y, RaqueteComprimento, RaqueteAltura);
}

function movimentaminharaquete ()
{
  if (keyIsDown(UP_ARROW)){
    yRaquete -=10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete +=10;
  }
}

function verificacolisaocomaraquete ()
{
  if (xBolinha - raio < xRaquete + RaqueteComprimento && yBolinha - raio < yRaquete + RaqueteAltura && yBolinha + raio > yRaquete) 
  {
    velocidadexBolinha *=-1;
    raquetada.play();
  }
  }

function VerificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, RaqueteComprimento, RaqueteAltura, xBolinha, yBolinha, diametro);
    if (colidiu) {
        velocidadexBolinha *= -1;
        raquetada.play();
    }
}

function MovimentaRaqueteCPU ()
{
  VelocidadeYCPU = yBolinha - yRaqueteCPU - RaqueteComprimento / 2 - 30;
  yRaqueteCPU += VelocidadeYCPU + chanceDeErrar
  calculaChanceDeErrar()
}


function calculaChanceDeErrar() {
  if (CPUpontos >= MeusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 29){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 40){
    chanceDeErrar = 40
    }
  }
}

function incluiPlacar ()
{
  stroke (255)
  textAlign (CENTER);
  textSize (16);
  fill (color (255, 140, 0));
  rect (150, 10, 40, 20);
  fill (255);
  text (MeusPontos, 170, 26);
  fill (color (255, 140,0));
  rect (450, 10, 40 ,20);
  fill (255);
  text (CPUpontos, 470, 26);
 
  
}

function MarcaPonto ()
{
  if (xBolinha > 590) {
    MeusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    CPUpontos += 1;
    ponto.play();
  }
}


function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}

