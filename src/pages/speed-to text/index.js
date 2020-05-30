import React, { useState, useEffect } from "react";
import MicRecorder from "mic-recorder-to-mp3";

import "./index.css";
import { speedToText } from "../../api";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default function SpeedtoText() {
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [output, setOutput] = useState("");

  useEffect(() => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Cấp phép");
        setIsBlocked(false);
      },
      () => {
        console.log("Quyền bị từ chối ");
        setIsBlocked(true);
      }
    );
  }, []);

  const startRecord = () => {
    if (isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true);
        })
        .catch((e) => console.error(e));
    }
  };

  const stopRecord = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        setBlobURL(blobURL);
        setIsRecording(false);
        // console.log({ blob, blobURL, buffer });

        // save(blob, 'example.mp3')

        speedToText(blob).then((data) =>
          setOutput(data.hypotheses[0].utterance)
        );
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="container-stt">
      <div>
        <button onClick={startRecord} disabled={isRecording}>
          Record
        </button>
        <button onClick={stopRecord} disabled={!isRecording}>
          Stop
        </button>
      </div>
      <div className="record">
        {!isRecording ? (
          <audio src={blobURL} controls="controls" />
        ) : (
          <img
            style={{ height: 150, width: 350 }}
            src="https://media2.giphy.com/media/aw6CWyyLQ8WyRuktxR/source.gif"
            alt="recording"
          />
        )}
      </div>
      <p>{!isRecording && output}</p>
    </div>
  );
}
