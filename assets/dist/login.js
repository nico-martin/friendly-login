System.register("bear", [], function (exports_1, context_1) {
    "use strict";
    var bearSvg, getRelativeValue, setProgress, blink, closeEyes, openEyes;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("bearSvg", bearSvg = "<div class='shfi-smiley'>\n  <svg viewBox='0 0 100 100' version='1.1'>\n    <circle id='earLeft' cx='20' cy='25' r='15' fill='var(--shfi-c-earinner)' stroke='var(--shfi-c-fur)' stroke-width='5' />\n    <circle id='earRight' cx='80' cy='25' r='15' fill='var(--shfi-c-earinner)' stroke='var(--shfi-c-fur)' stroke-width='5' />\n    <circle id='head' cx='50' cy='55' r='40' fill='var(--shfi-c-fur)' />\n    <ellipse id='mouthWrapper' cx='50' cy='76' rx='22' ry='12' fill='var(--shfi-c-mouthwrapper)'/>\n    <ellipse id='nose' cx='50' cy='64' rx='8' ry='5' fill='var(--shfi-c-node)'/>\n    <ellipse id='eyeLeft' cx='35' cy='45' rx='4' ry='7' fill='var(--shfi-c-eye)'/>\n    <path id='eyebrowLeft' d='M 27 35 a 0 0 0 0 0 15 0' stroke='var(--shfi-c-eyebrow)' stroke-width='1' fill-opacity='0' opacity='0.4' transform='rotate(20,35,45)' />\n    <ellipse id='eyeRight' cx='65' cy='45' rx='4' ry='7' fill='var(--shfi-c-eye)'/>\n    <path id='eyebrowRight' d='M 57 35 a 0 0 0 0 0 15 0' stroke='var(--shfi-c-eyebrow)' stroke-width='1' fill-opacity='0' opacity='0.4' transform='rotate(-20,65,45)' />\n    <path id='mouth' d='M 38 78 a 15 10 0 0 1 24 0' stroke='var(--shfi-c-mouth)' stroke-width='1' fill-opacity='0' />\n  </svg>\n</div>");
            exports_1("getRelativeValue", getRelativeValue = function (min, max, step) {
                var range = max - min;
                return min + (range / 100) * step;
            });
            exports_1("setProgress", setProgress = function (value) {
                var submit = document.querySelector("#wp-submit");
                submit && value !== 100
                    ? submit.setAttribute("disabled", "true")
                    : submit.removeAttribute("disabled");
                var mouth = document.querySelector(".shfi-smiley svg path#mouth");
                var eyebrowLeft = document.querySelector(".shfi-smiley svg path#eyebrowLeft");
                var eyebrowRight = document.querySelector(".shfi-smiley svg path#eyebrowRight");
                var progress = document.querySelector(".shfi-progress");
                if (progress) {
                    progress.style.width = "".concat(value, "%");
                }
                var mouthRadius = value <= 50
                    ? getRelativeValue(15, 50, value * 2)
                    : getRelativeValue(50, 13, value * 2 - 100);
                var clockwise = value <= 50;
                mouth.setAttribute("d", "M 38 ".concat(getRelativeValue(78, 76, value), " a ").concat(mouthRadius, " 10 0 0 ").concat(clockwise ? "1" : "0", " 24 0"));
                eyebrowLeft.setAttribute("transform", "rotate(".concat(20 - getRelativeValue(0, 20, value), ",35,45)"));
                eyebrowLeft.setAttribute("opacity", String(getRelativeValue(0.4, 0, value)));
                eyebrowRight.setAttribute("transform", "rotate(".concat((20 - getRelativeValue(0, 20, value)) * -1, ",65,45)"));
                eyebrowRight.setAttribute("opacity", String(getRelativeValue(0.4, 0, value)));
            });
            exports_1("blink", blink = function () {
                var eyeLeft = document.querySelector(".shfi-smiley svg #eyeLeft");
                if (eyeLeft.ry.baseVal.value !== 7)
                    return;
                closeEyes();
                window.setTimeout(function () { return openEyes(); }, 100);
            });
            exports_1("closeEyes", closeEyes = function () {
                var eyeLeft = document.querySelector(".shfi-smiley svg #eyeLeft");
                var eyeRight = document.querySelector(".shfi-smiley svg #eyeRight");
                eyeRight.setAttribute("ry", "1");
                eyeLeft.setAttribute("ry", "1");
            });
            exports_1("openEyes", openEyes = function () {
                var eyeLeft = document.querySelector(".shfi-smiley svg #eyeLeft");
                var eyeRight = document.querySelector(".shfi-smiley svg #eyeRight");
                eyeRight.setAttribute("ry", "7");
                eyeLeft.setAttribute("ry", "7");
            });
        }
    };
});
System.register("index", ["bear"], function (exports_2, context_2) {
    "use strict";
    var bear_1, $container, $pwInput, progressIndicator, slider;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (bear_1_1) {
                bear_1 = bear_1_1;
            }
        ],
        execute: function () {
            $container = document.querySelector(".login h1 a");
            $pwInput = document.querySelector("input#user_pass");
            $container.innerHTML = bear_1.bearSvg;
            progressIndicator = document.createElement("span");
            progressIndicator.classList.add("shfi-progress");
            document.querySelector("#loginform").appendChild(progressIndicator);
            slider = document.createElement("input");
            slider.type = "range";
            slider.min = "1";
            slider.max = "100";
            slider.value = "1";
            slider.oninput = function (v) {
                return bear_1.setProgress(Number(v.target.value));
            };
            document.body.appendChild(slider);
            window.setInterval(function () { return bear_1.blink(); }, 5000);
            $pwInput.addEventListener("focusin", function () { return bear_1.closeEyes(); });
            $pwInput.addEventListener("focusout", function () { return bear_1.openEyes(); });
        }
    };
});
