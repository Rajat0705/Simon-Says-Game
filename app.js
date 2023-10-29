let gamePlay = [];
let userPlay = [];
let colors = ["yellow", "red", "green", "purple"]
let level = 0;
let started = false;
let highScore = 0;

let h3 = document.querySelector("h3");
document.addEventListener("keypress", function () {
    if (started == false)
    {
        console.log("Game Started!");
        started = true;        
        levelUp();
    }    
})

function boxFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn, color) {
    btn.classList.add(`user${color}`);
    setTimeout(() => {
        btn.classList.remove(`user${color}`);
    }, 250);
}

function levelUp(event) {
    userPlay = [];
    level++;
    h3.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = colors[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gamePlay.push(randColor);
    console.log(`GamePlay: ${gamePlay}`);
    boxFlash(randBtn);
}

function match(idx) {
    if (gamePlay[idx] == userPlay[idx]) {
        if (gamePlay.length == userPlay.length) {
            setTimeout(levelUp,400);
        }
    } else {
        if ((level-1) > highScore)
        {
            highScore = level - 1;
        }
        h3.innerHTML = `Game Over! Your score is <b>${level-1}</b>. <br> <b style="color: darkgreen;">Highest Score: ${highScore}</b> <br> Please press any key to restart`;
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector('body').style.backgroundColor = "white";
            gamePlay = [];
            userPlay = [];
            level = 0;
            started = false;
        }, 250);
    }
}

function btnPress() {
    if (level != 0) {
        let color = this.getAttribute('id');
        userFlash(this, color);
        userPlay.push(color);
        console.log(`USerPlay: ${userPlay}`);

        match(userPlay.length - 1);
    }
}

let allBtns = document.querySelectorAll(".box");
for (btn of allBtns)
{
    btn.addEventListener("click", btnPress)
}