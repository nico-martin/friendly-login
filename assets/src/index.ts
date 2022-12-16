import { bearSvg, blink, closeEyes, openEyes, setProgress } from "./bear";
import { loadModels, startVideo } from "./faceDetection";

const $container: HTMLAnchorElement = document.querySelector(".login h1 a");
const $pwInput: HTMLInputElement = document.querySelector("input#user_pass");

$container.innerHTML = bearSvg;

const progressIndicator = document.createElement("span");
progressIndicator.classList.add("shfi-progress");
document.querySelector("#loginform").appendChild(progressIndicator);

/**
 * Eye functions
 */

window.setInterval(() => blink(), 5000);
$pwInput.addEventListener("focusin", () => closeEyes());
$pwInput.addEventListener("focusout", () => openEyes());

/**
 * Video
 */

let smiling = null;
let progress = 0;
const submit: HTMLButtonElement = document.querySelector("#wp-submit");

const updateProgress = (newProgress) => {
  if (newProgress <= 0) {
    newProgress = 0;
  } else if (newProgress >= 100) {
    newProgress = 100;
    submit.removeAttribute("disabled");
    clearInterval(smilingInterval);
  }
  progress = newProgress;
  setProgress(newProgress);
};

loadModels().then(() =>
  startVideo((value) => {
    submit.setAttribute("disabled", "true");
    smiling = value >= 0.9;
  })
);

let smilingInterval = window.setInterval(() => {
  smiling ? updateProgress(progress + 1) : updateProgress(progress - 1);
}, 20);
