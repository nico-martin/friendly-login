import { vars } from "./vars";
import * as faceapi from "face-api.js";

const videoSize = { width: 1200, height: 720 };

export const loadModels = () =>
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(
      `${vars.pluginUrl}assets/dist/models/`
    ),
    faceapi.nets.faceExpressionNet.loadFromUri(
      `${vars.pluginUrl}assets/dist/models/`
    ),
  ]);

export const startVideo = (onHappyChange: (value: number) => void) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("shfi-videoWrapper");
  document.body.appendChild(wrapper);

  const video = document.createElement("video");
  video.autoplay = true;
  video.classList.add("shfi-video");
  wrapper.appendChild(video);

  video.addEventListener("play", () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    canvas.classList.add("shfi-canvas");
    wrapper.append(canvas);
    faceapi.matchDimensions(canvas, videoSize);
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      detections.length >= 1
        ? onHappyChange(detections[0].expressions.happy)
        : onHappyChange(0);
    }, 100);
  });

  // @ts-ignore
  navigator.getUserMedia(
    { video: videoSize },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
};
