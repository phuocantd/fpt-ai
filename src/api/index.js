import fetch from "node-fetch";

export const textToSpeed = (body, voice, speed) =>
  fetch("https://api.fpt.ai/hmi/tts/v5", {
    method: "post",
    body,
    headers: {
      voice,
      speed,
      "Content-Type": "application/json",
      "api-key": process.env.REACT_APP_APT_KEY,
    },
  }).then((res) => res.json());

export const speedToText = (blob) =>
  fetch("https://api.fpt.ai/hmi/asr/general", {
    method: "post",
    body: blob,
    headers: {
      "Content-Type": "",
      "api-key": process.env.REACT_APP_APT_KEY,
    },
    redirect: "follow",
  }).then((res) => res.json());
