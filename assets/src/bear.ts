export const bearSvg = `<div class='shfi-smiley'>
  <svg viewBox='0 0 100 100' version='1.1'>
    <circle id='earLeft' cx='20' cy='25' r='15' fill='var(--shfi-c-earinner)' stroke='var(--shfi-c-fur)' stroke-width='5' />
    <circle id='earRight' cx='80' cy='25' r='15' fill='var(--shfi-c-earinner)' stroke='var(--shfi-c-fur)' stroke-width='5' />
    <circle id='head' cx='50' cy='55' r='40' fill='var(--shfi-c-fur)' />
    <ellipse id='mouthWrapper' cx='50' cy='76' rx='22' ry='12' fill='var(--shfi-c-mouthwrapper)'/>
    <ellipse id='nose' cx='50' cy='64' rx='8' ry='5' fill='var(--shfi-c-node)'/>
    <ellipse id='eyeLeft' cx='35' cy='45' rx='4' ry='7' fill='var(--shfi-c-eye)'/>
    <path id='eyebrowLeft' d='M 27 35 a 0 0 0 0 0 15 0' stroke='var(--shfi-c-eyebrow)' stroke-width='1' fill-opacity='0' opacity='0.4' transform='rotate(20,35,45)' />
    <ellipse id='eyeRight' cx='65' cy='45' rx='4' ry='7' fill='var(--shfi-c-eye)'/>
    <path id='eyebrowRight' d='M 57 35 a 0 0 0 0 0 15 0' stroke='var(--shfi-c-eyebrow)' stroke-width='1' fill-opacity='0' opacity='0.4' transform='rotate(-20,65,45)' />
    <path id='mouth' d='M 38 78 a 15 10 0 0 1 24 0' stroke='var(--shfi-c-mouth)' stroke-width='1' fill-opacity='0' />
  </svg>
</div>`;

export const getRelativeValue = (min, max, step) => {
  const range = max - min;
  return min + (range / 100) * step;
};

export const setProgress = (value) => {
  const mouth: SVGPathElement = document.querySelector(
    ".shfi-smiley svg path#mouth"
  );
  const eyebrowLeft = document.querySelector(
    ".shfi-smiley svg path#eyebrowLeft"
  );
  const eyebrowRight = document.querySelector(
    ".shfi-smiley svg path#eyebrowRight"
  );

  const progress: HTMLDivElement = document.querySelector(".shfi-progress");
  if (progress) {
    progress.style.width = `${value}%`;
  }

  const mouthRadius =
    value <= 50
      ? getRelativeValue(15, 50, value * 2)
      : getRelativeValue(50, 13, value * 2 - 100);
  const clockwise: boolean = value <= 50;

  mouth.setAttribute(
    "d",
    `M 38 ${getRelativeValue(78, 76, value)} a ${mouthRadius} 10 0 0 ${
      clockwise ? "1" : "0"
    } 24 0`
  );

  eyebrowLeft.setAttribute(
    "transform",
    `rotate(${20 - getRelativeValue(0, 20, value)},35,45)`
  );
  eyebrowLeft.setAttribute("opacity", String(getRelativeValue(0.4, 0, value)));
  eyebrowRight.setAttribute(
    "transform",
    `rotate(${(20 - getRelativeValue(0, 20, value)) * -1},65,45)`
  );
  eyebrowRight.setAttribute("opacity", String(getRelativeValue(0.4, 0, value)));
};

export const blink = () => {
  const eyeLeft: SVGEllipseElement = document.querySelector(
    ".shfi-smiley svg #eyeLeft"
  );
  if (eyeLeft.ry.baseVal.value !== 7) return;
  closeEyes();
  window.setTimeout(() => openEyes(), 100);
};

export const closeEyes = () => {
  const eyeLeft: SVGEllipseElement = document.querySelector(
    ".shfi-smiley svg #eyeLeft"
  );
  const eyeRight: SVGEllipseElement = document.querySelector(
    ".shfi-smiley svg #eyeRight"
  );
  eyeRight.setAttribute("ry", "1");
  eyeLeft.setAttribute("ry", "1");
};

export const openEyes = () => {
  const eyeLeft: SVGEllipseElement = document.querySelector(
    ".shfi-smiley svg #eyeLeft"
  );
  const eyeRight: SVGEllipseElement = document.querySelector(
    ".shfi-smiley svg #eyeRight"
  );
  eyeRight.setAttribute("ry", "7");
  eyeLeft.setAttribute("ry", "7");
};
