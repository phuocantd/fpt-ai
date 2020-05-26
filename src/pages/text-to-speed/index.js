import React, { useState } from "react";
import { Input, Select, Radio } from "antd";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";
// import axios from "axios";
import fetch from "node-fetch";

import "./index.css";

const { TextArea } = Input;
const { Option } = Select;

const voices = {
  new: [
    { name: "Northern Accent: Ban Mai (female)", value: "banmai" },
    { name: "Northern Accent: Lê Minh (male)", value: "leminh" },
    { name: "Northern Accent: Thu Minh (female)", value: "thuminh" },
    { name: "Central Accent: Mỹ An (female)", value: "myan" },
    { name: "Central Accent: Gia Huy (male)", value: "giahuy" },
    { name: "Southern Accent: Lan Nhi (female)", value: "lannhi" },
  ],
  old: [
    { name: "Northern Accent: Thu Dung (female)", value: "thudung" },
    { name: "Northern Accent: Cao Chung (male)", value: "caochung" },
    { name: "Northern Accent: Hà Tiểu Mai (female)", value: "caochung" },
  ],
};

export default function TextToSpeed() {
  const [text, setText] = useState("");
  const [type, setType] = useState("new");
  const [voice, setVoice] = useState("banmai");
  const [speed, setSpeed] = useState("3");
  const [playing, setPlaying] = useState(false);

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const handleChangeType = (e) => {
    setType(e.target.value);
    setVoice(voices[e.target.value][0].value);
  };

  const handleChangeVoice = (value) => {
    setVoice(value);
  };

  const handleChangSpeed = (value) => {
    setSpeed(value);
  };

  const handleTextDefault = () => {};

  const handleReset = () => {};

  const handleListen = () => {
    // axios({
    //   method: "GET",
    //   url: "https://api.fpt.ai/hmi/tts/v5",
    //   headers: {
    //     voice: "leminh",
    //     "api-key": "f5htaWIU8LDrF0qds4N5LiASRxKM26mo",
    //   },
    //   body: "xin chào các bác",
    // })
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err));
    const body = "Xin chào các bạn, đây là đâu? tôi là ai?";

    fetch("https://api.fpt.ai/hmi/tts/v5", {
      method: "post",
      body,
      headers: {
        voice: "leminh",
        "Content-Type": "application/json",
        "api-key": "f5htaWIU8LDrF0qds4N5LiASRxKM26mo",
      },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  return (
    <div>
      <h1>Text to Speed</h1>
      <TextArea
        placeholder="Input text ..."
        rows={7}
        value={text}
        onChange={handleChangeText}
      />
      <div className="control">
        <div>
          <p>Loại giọng</p>
          <Radio.Group
            name="radiogroup"
            defaultValue={type}
            className="ratio"
            value={type}
            onChange={handleChangeType}
          >
            <Radio value="new">Giọng đọc mới</Radio>
            <Radio value="old">Giọng đọc cũ</Radio>
          </Radio.Group>
          <Select
            value={voice}
            className="select-voice"
            onChange={handleChangeVoice}
          >
            {voices[type].map((item) => (
              <Option key={item.value} value={item.value}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <p>Voice</p>
          <Select value={speed} onChange={handleChangSpeed}>
            <Option value="0">Giọng đọc cũ</Option>
            <Option value="1">Rất chậm</Option>
            <Option value="2">Chậm</Option>
            <Option value="3">Bình thường</Option>
            <Option value="4">Nhanh</Option>
            <Option value="5">Rất nhanh</Option>
            <Option value="6">Cực nhanh</Option>
          </Select>
        </div>
        <div className="btn-group">
          <button type="button" onClick={handleTextDefault}>
            Show default text
          </button>
          <button
            type="button"
            onClick={handleReset}
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            Reset
          </button>
          <button
            type="button"
            style={{ background: "#00f", color: "#fff" }}
            onClick={handleListen}
          >
            {playing ? <PauseOutlined /> : <CaretRightOutlined />}
            {playing ? "Stop the speed" : "Listen to speed"}
          </button>
        </div>
      </div>
    </div>
  );
}
