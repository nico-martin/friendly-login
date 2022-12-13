import { bearSvg, blink, closeEyes, openEyes, setProgress } from "./bear";

const $container: HTMLAnchorElement = document.querySelector(".login h1 a");
const $pwInput: HTMLInputElement = document.querySelector("input#user_pass");

$container.innerHTML = bearSvg;

const progressIndicator = document.createElement("span");
progressIndicator.classList.add("shfi-progress");
document.querySelector("#loginform").appendChild(progressIndicator);

const slider = document.createElement("input");
slider.type = "range";
slider.min = "1";
slider.max = "100";
slider.value = "1";
slider.oninput = (v) =>
  setProgress(Number((v.target as HTMLInputElement).value));

document.body.appendChild(slider);

window.setInterval(() => blink(), 5000);

$pwInput.addEventListener("focusin", () => closeEyes());
$pwInput.addEventListener("focusout", () => openEyes());
