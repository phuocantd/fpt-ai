import React, { useState } from "react";
import { Input, Select, Radio, Spin, Space } from "antd";
// import axios from "axios";
// import fetch from "node-fetch";

import "./index.css";
import { textToSpeed } from "../../api";

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
    { name: "Southern Accent: Hà Tiểu Mai (female)", value: "hatieumai" },
    { name: "Central Accent: Ngọc Lam (female)", value: "ngoclam" },
    { name: "Northern Accent: Male", value: "male" },
    { name: "Northern Accent: Female", value: "female" },
  ],
};

export default function TextToSpeed() {
  const [text, setText] = useState("Bạn đang làm gì đó!!!");
  const [type, setType] = useState("new");
  const [voice, setVoice] = useState("banmai");
  const [speed, setSpeed] = useState("0");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   textToSpeed(text).then((data) => {
  //     setUrl(data.async)
  //   });
  // }, [text]);

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

  const handleTextDefault = () => {
    setText("Bạn đang làm gì đó!!!");
  };

  const handleReset = () => {
    setText("");
  };

  const handleLoadFile = () => {
    if (text !== "")
      textToSpeed(text, voice, parseInt(speed)).then((data) => {
        setLoading(true);
        setTimeout(() => {
          console.log("save:", data.async);
          setLoading(false);
          setUrl(data.async);
        }, 5000);
        // console.log("loading:", data.async);
      });
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
          <p>Tốc độ</p>
          <Select value={speed} onChange={handleChangSpeed}>
            <Option value="-3">Cực chậm</Option>
            <Option value="-2">Rất chậm</Option>
            <Option value="-1">Chậm</Option>
            <Option value="0">Bình thường</Option>
            <Option value="1">Nhanh</Option>
            <Option value="2">Rất nhanh</Option>
            <Option value="3">Cực nhanh</Option>
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
            onClick={handleLoadFile}
          >
            Tạo file
          </button>
          <div style={{ marginTop: 20 }}>
            {loading ? (
              <Space size="middle">
                <Spin size="large" />
              </Space>
            ) : (
              <audio controls src={url}>
                Audio
              </audio>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
