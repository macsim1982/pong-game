const gravity = 0.005;
let computerForce = 0.2;
let humanForce = 0.2;

let dx = 5;
let dy = 8;
let speed = 1;
let paused = true;

let x = window.innerWidth / 2;
let y = window.innerHeight / 2;

let pointerX = 0;
let pointerY = 0;

const lerp = (start, end, amt) => (1 - amt) * start + amt * end;
const scores = {
  top: 0,
  bottom: 0
};
const el = document.querySelector(".ball");
const courtEl = document.querySelector(".court");
const scoresEL = document.querySelector(".scores");
const paddles = document.querySelectorAll(".paddle");
const ballEl = document.querySelector(".ball");


const writeScore = (scores, court) => {
    if (y < court.top) {
        scores.top +=1;
      } else {
        scores.bottom +=1;
      }

      scoresEL.innerHTML = `${scores.top}:${scores.bottom}`;

      setWinner('top', 'bottom');
      setWinner('bottom', 'top');

      console.log(scores);
}
const setWinner = (winner, looser) => {
    if (scores[winner] > 8) {
        scoresEL.innerHTML = winner === 'top' ? `&nbsp;&nbsp;${scores[looser]}:win` : `win:${scores[looser]}&nbsp;&nbsp;`;
        scores['top'] = 0;
        scores['bottom'] = 0;
    }
}
const frame = function() {
  if (!paused) {
    const court = courtEl.getBoundingClientRect();
    const ball = ballEl.getBoundingClientRect();

    if (x < court.left || x > court.left + court.width - ball.width) {
      dx = -dx;
    }

    if (y < court.top || y > court.top + court.height - ball.height) {
      writeScore(scores, court);

    //   paused = true;

      x = window.innerWidth / 2;
      y = window.innerHeight / 2;
      speed = 0.5;
    }

    [...paddles].forEach((paddle, index) => {

      speed *= 1 - gravity;

      let rect = paddle.getBoundingClientRect();
      paddle.style.left = lerp(rect.left, x - rect.width / 2, computerForce) + "px";

    //   if (index == 0)
    //     paddle.style.left = lerp(rect.left, x - rect.width / 2, computerForce) + "px";

    //   if (index === 1)
    //     paddle.style.left = lerp(rect.left, pointerX, humanForce) + "px";


      if (
        x >= rect.left - ball.width &&
        x <= rect.left - ball.width + (rect.width + ball.width) &&
        y >= rect.top - ball.width &&
        y <= rect.top - ball.height + (rect.height + ball.height)
      ) {
        dy = -dy;
        speed = 1;
        dx = (rect.left - x + rect.width / 2) / -10;
      }
    });

    x += dx * speed * 2;
    y += dy * speed;

    el.style.left = x + "px";
    el.style.top = y + "px";

    window.requestAnimationFrame(frame);
  }
};
let timer = 0;
const onStart = () => {
  if (paused) {
    paused = false;
    window.requestAnimationFrame(frame);
  }
};

const onMove = (e) => {
  e.preventDefault();
  const t = e.changedTouches ? e.changedTouches[0] : e;
  pointerX = t.pageX;
  pointerY = t.pageY;
};

export const pongInit = function () {
    // document.addEventListener('click', onStart)
    // document.addEventListener('mousemove', onMove);

    document.addEventListener('pointerdown', onStart)
    document.addEventListener('pointermove', onMove);

    window.requestAnimationFrame(frame);
};
