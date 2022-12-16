import { vars } from "./vars";
import * as faceapi from "face-api.js";

const videoSize = { width: 1200, height: 720 };

export const loadModels = () =>
  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(
      `${vars.pluginUrl}assets/dist/models/`
    ),
    faceapi.nets.faceLandmark68Net.loadFromUri(
      `${vars.pluginUrl}assets/dist/models/`
    ),
    faceapi.nets.faceRecognitionNet.loadFromUri(
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
    const displaySize = videoSize;
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      detections.length >= 1
        ? onHappyChange(detections[0].expressions.happy)
        : onHappyChange(0);
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }, 100);
  });

  // @ts-ignore
  navigator.getUserMedia(
    { video: videoSize },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
};
