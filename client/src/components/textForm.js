import React, { useState, useEffect } from "react";
import "./textForm.scss";
import axios from "axios";

function TextForm() {
  const [textData, setTextData] = useState({
    text: "",
    Sentences: "",
    Paragraphs: "",
    Words: "",
    Characters_including_spaces: "",
    Characters_excluding_spaces: "",

    Words_per_sentence: "",
    Characters_per_word: "",
  });
  const [wordFreq, setWordFreq] = useState({
    freq: {},
  });

  const BASEURL = "http://localhost:4000";
  async function submit(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/postText", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        data: textData.text,
      })
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
  }

  async function getData(e) {
    await axios
      .get("http://localhost:4000/textOutput")
      .then((res) => {
        setTextData(res.data);
        setWordFreq({ freq: res.data.freq });
        console.log(wordFreq);
      })
      .catch((err) => console.log(err));
  }
  function handleTextChange(e) {
    setTextData({ text: e.target.value });
  }

  //   console.log(wordFreq);
  return (
    <div className="form-group">
      <textarea
        name="textEntered"
        value={textData.text}
        id="formGroupExampleInput"
        cols="30"
        rows="10"
        className="form-control textInput mx-auto w-75 my-4"
        onChange={(e) => handleTextChange(e)}
        form="txtform"
      ></textarea>
      <form
        method="POST"
        id="txtform"
        onSubmit={function (e) {
          submit(e);
          getData(e);
        }}
      >
        {/* <input
          type="text"
          name="textEntered"
          value={textData.text}
          id="formGroupExampleInput"
          className="form-control textInput mx-auto w-75 my-4"
          onChange={(e) => handleTextChange(e)}
        /> */}
        <button type="submit" className="btn btn-primary mt-0 mb-5">
          submit
        </button>
      </form>

      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between align-items-center mx-auto w-50">
          Sentences
          <span className="badge badge-primary badge-pill text-primary">
            {textData.Sentences}
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center mx-auto w-50">
          Paragraphs
          <span className="badge badge-primary badge-pill text-primary">
            {textData.Paragraphs}
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center mx-auto w-50">
          Words
          <span className="badge badge-primary badge-pill text-primary">
            {textData.Words}
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center mx-auto w-50">
          Characters_including_spaces
          <span className="badge badge-primary badge-pill text-primary">
            {textData.Characters_including_spaces}
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center mx-auto w-50">
          Characters_excluding_spaces
          <span className="badge badge-primary badge-pill text-primary">
            {textData.Characters_excluding_spaces}
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center mx-auto w-50">
          Words_per_sentence
          <span className="badge badge-primary badge-pill text-primary">
            {textData.Words_per_sentence}
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center mx-auto w-50">
          Characters_per_word
          <span className="badge badge-primary badge-pill text-primary">
            {textData.Characters_per_word}
          </span>
        </li>
      </ul>

      <h3 className="freq-Header">Freq Of Words</h3>
      <ul className="list-group freq-words mt-0">
        {Object.entries(wordFreq.freq).map(([key, val], i) => (
          <li
            key={i}
            className="list-group-item d-flex justify-content-between align-items-center mx-auto w-50 hover-overlay "
          >
            {key}
            <span className="badge badge-primary badge-pill text-primary">
              {val}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TextForm;
