import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Uppercase","success");
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
     props.showAlert("Converted to Lowercase","success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleClearText = () => {
    let newText = "";
    setText(newText);
    props.showAlert("Cleared the text","success");
    setVowelCount(0);
  };

 const handleCopy = () => {
    let text = document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText(text.value);
    props.showAlert("Copied to clipboard!","success");
 }


  const handleVowelCount = () => {
    let count = 0;
    for (let char of text.toLowerCase()) {
      if ("aeiou".includes(char)) {
        count++;
      }
    }
    setVowelCount(count);
  };

  const speak = () => {
    let msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
    const toogle = document.getElementById("toggle");
    if (toogle.textContent === "Speak") {
      toogle.innerHTML = "Stop";
    } else {
      toogle.innerHTML = "Speak";
      if ((toogle.innerHTML = "Speak")) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/)
    setText(newText.join(" "));
    props.showAlert("Removed extra spaces","success");
  };

  const [text, setText] = useState("");
  const [vowelCount, setVowelCount] = useState(0);

  return (
    <>
      <div className="container" style={{color : props.mode === 'dark' ? 'white' : 'black'}}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            style={{backgroundColor : props.mode === 'dark' ? '#020c2e' : 'white', color : props.mode === 'dark' ? 'white' : 'black' }}
            className="form-control"
            value={text}
            onChange={handleOnChange}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <button className="btn btn-primary mx-2" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary mx-2" onClick={handleLoClick}>
          Convert to Lowercase
        </button>
        <button className="btn btn-primary mx-2" onClick={handleClearText}>
          Clear text
        </button>
        <button className="btn btn-primary mx-2" onClick={handleVowelCount}>
          Count Vowels
        </button>
        <button className="btn btn-primary mx-2" onClick={handleExtraSpaces}>
          Remove Extra Spaces
        </button>
        <button className="btn btn-primary mx-2" onClick={handleCopy}>
          Copy Text
        </button>
        <button
          type="submit"
          onClick={speak}
          className="btn btn-warning mx-2 my-2"
          id="toggle"
        >
          Speak
        </button>
      </div>
      <div className="container my-3" style={{color : props.mode === 'dark' ? 'white' : 'black'}}>
        <h1>Your text summary</h1>
        <p>
          {text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length} words and {text.length} characters
        </p>
        <p>{0.008 * text.split(" ").length} Minutes to Read</p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Enter something in the text box above to preview it here"}</p>
        <h2>Total Vowel count</h2>
        <p>{vowelCount}</p>
      </div>
    </>
  );
}
