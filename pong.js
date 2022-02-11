//Elementos
var btIniciar;
var bola;
var cpu;
var jogador;
var painelPontos;

//Controle de Animação
var game, frames;

//Posições
var posBolaX, posBolaY;
var posJogadorX, posJogadorY;
var posCpuX, posCpuY;

//Direções de acorddo com teclas
var dirJogY;

//Posicoes Iniciais
const posJogIniY=180, posCpuIniY = 180, posBolaIniX = 475, posBolaIniY = 240;

//Tamanhos
const campoX = 0, campoY = 0, campoW = 960, campoH = 500;
const barraW = 20, barraH = 140, bolaW = 20, bolaH = 20;

//Direções
var dirBolaX, dirBolaY;
var cpuY;

//Velocidade
var velBola, velCpu, velJogador;

//Controle
var pontosJogador = 0;
var pontosCpu = 0;
var tecla;
var jogo = false;


function game(){
    if(jogo){
        controlaJog();
        controlaBola();
        controlaCpu2()
    }
    frames = requestAnimationFrame(game);
}

function iniciaJogo(){
    if (!jogo) {
        cancelAnimationFrame(frames);
        jogo = true;
        dirJogY = 0;
        posBolaX = posBolaIniX;
        posBolaY = posBolaIniY;
        posJogadorX = 0;
        posJogadorY = posJogIniY;
        posCpuY = posCpuIniY;
        posCpuX = 930;
        velBola = velCpu = velJogador = 8;
        dirBolaY = 0;
        dirBolaX = Math.random() > 0.5? 1: -1
        game();
    }
}   

function inicializar(){
    btIniciar = document.getElementById('btIniciar');
    jogador = document.getElementById('dvJogador');
    cpu = document.getElementById('dvCpu');
    bola = document.getElementById('dvBola');
    painelPontosJogador = document.getElementById('txtPontosJogador');
    painelPontosCpu = document.getElementById('txtPontosCPU');

    btIniciar.addEventListener("click", iniciaJogo);
    document.addEventListener("keydown", event => teclaDw(event))
    document.addEventListener("keyup", event => teclaUp(event))
}


function teclaDw(event){
    tecla = event.key;
    if (tecla == 'ArrowUp'){ //Tecla Cima
        dirJogY = -1;
    } else if(tecla == 'ArrowDown'){ //Tecla Baixo
        dirJogY = 1;
    }
}

function teclaUp(event){
    tecla = event.key;
    if (tecla == 'ArrowUp'){ //Tecla Cima
        dirJogY = 0;
    } else if(tecla == 'ArrowDown'){ //Tecla Baixo
        dirJogY = 0;
    }
}

function controlaJog(){
    if(jogo){
        posJogadorY += velJogador * dirJogY;
        if( (posJogadorY + barraH > campoH) || (posJogadorY < 0) ){
            posJogadorY += (velJogador * dirJogY) * -1;
        }
        jogador.style.top = `${posJogadorY}px`;
    }
}

function controlaBola(){
    posBolaX += velBola * dirBolaX;
    posBolaY += velBola * dirBolaY;

    //Colisao Jogador
    if ((posBolaX <= posJogadorX+barraW) && (posBolaY+bolaH >= posJogadorY) && (posBolaY <= posJogadorY + barraH)){
        dirBolaX *= -1;
        dirBolaY = ((posBolaY + (bolaH/2)) - (posJogadorY+ (barraH/2)))/32;
    }
    //Colisao CPU
    else if ((posBolaX >= posCpuX) && (posBolaY+bolaH >= posCpuY) && (posBolaY <= posCpuY + barraH)){
        dirBolaX *= -1;
        dirBolaY = ((posBolaY + (bolaH/2)) - (posCpuY+ (barraH/2)))/32;
    }
    //Limites
    if (posBolaY > 480 || posBolaY <= 0){
        dirBolaY *= -1;
    }

    //Saiu da tela
    if(posBolaX + bolaW >= campoW){
        golJogador();
    } else if (posBolaX <= -bolaW/2){
        golCpu();
    }

    bola.style.left = `${posBolaX}px`;
    bola.style.top = `${posBolaY}px`;
}

function golJogador(){
    velBola = 0;
    pontosJogador++;
    painelPontosJogador.value = pontosJogador;
    jogo = false;
    setTimeout(iniciaJogo, 2000);
}


function golCpu(){
    velBola = 0;
    pontosCpu++;
    painelPontosCpu.value = pontosCpu;
    jogo = false;
    setTimeout(iniciaJogo, 2000);
}

function controlaCpu(){
    if(jogo){
        if((dirBolaX > 0) && (posBolaX > campoW/2)){    //Mover CPU
            if(posBolaY+(bolaH/2) > (posCpuY + (barraH/2)) + velCpu){ //Mover para baixo
                if(posCpuY+barraH<=campoH){
                    posCpuY += velCpu;
                }
                else if(posBolaY+(bolaH/2) < (posCpuY + (barraH/2)) - velCpu){//Mover para cima
                    posCpuY -= velCpu; 
                }
            }
        }else{  //Posicionar CPU no centro
            if(posCpuY + (barraH/2) < campoH/2){
                posCpuY += velCpu;
            } else if(posCpuY + (barraH/2) > campoH/2){
                posCpuY -= velCpu;
            }
        }
        cpu.style.top = `${posCpuY}px`;
    }
}


function controlaCpu2(){
    meioBola = posBolaY + bolaH/2
    meioBarra = posCpuY + barraH/2
    
    if (meioBola > meioBarra+10  || meioBola < meioBarra-10){
        if (meioBola < meioBarra){
            if (posCpuY > bolaH/2){
                posCpuY -= velCpu;   
            }
        }
        else if(meioBola > meioBarra) {
            if (posCpuY < campoH - barraH - bolaH/2){
                posCpuY += velCpu;
            }
        }
    }
    cpu.style.top = `${posCpuY}px`;
}

window.addEventListener("load", inicializar);