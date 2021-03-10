import './App.css';
import React from "react";

const EMPTY = "";
const SPACE = " ";
const LINE_BREAK = "\n";
const DOUBLE_LINE_BREAK = "\n\n";
const MAX_LENGTH_BY_LINE = 80;

function App() {
  const [textInput, setTextInput] = React.useState(`This is
a badly formatted file. This line is pretty long! It's way more than 80 characters! I feel a line wrap coming on!

This      is a second paragraph with extraneous whitespace.`);
  const [textOutput, setTextOutput] = React.useState('');

  const handleChange = event => {
    setTextInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    transformText(textInput);
  };

  const transformText = input => {
    let output = "";
    const paragraphsFormatted = []
    const paragraphs = input.split(DOUBLE_LINE_BREAK);
    const paragraphsValid = paragraphs.filter(paragraph => paragraph !== EMPTY)

    paragraphsValid.forEach(paragraph => {
      const paragraphFormatted = transformParagraph(paragraph);
      paragraphsFormatted.push(paragraphFormatted);
    })

    if (paragraphsFormatted.length > 1) {
      output = paragraphsFormatted.join(DOUBLE_LINE_BREAK);
    } else {
      output = paragraphsFormatted;
    }
    setTextOutput(output);
  }

  const transformParagraph = (paragraph = "") => {
    let paragraphFormatted = "";
    const paragraphReplaceLineBreak = paragraph.replaceAll(LINE_BREAK, SPACE);
    const words = paragraphReplaceLineBreak.split(SPACE);
    const wordsValid = words.filter(word => word !== EMPTY)
    let line = "";
    wordsValid.forEach((word) => {
      const currentLineLength = line.length;
      const wordLength = word.length;
      const lineLength = currentLineLength + wordLength;

      if (lineLength <= MAX_LENGTH_BY_LINE) {
        if (line === "") {
          line = word;
        } else {
          line = line + " " + word;
        }
      } else {
        paragraphFormatted = paragraphFormatted + line;
        if (line === "") {
          line = word;
        } else {
          line = "\n" + word;
        }
      }
    })
    paragraphFormatted = paragraphFormatted + line;
    return paragraphFormatted;
  }

  return (
    <div className="App">
      <header>
        <h1>Career Lab | Take-Home Assignment</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea onChange={handleChange} value={textInput}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
      <div id="result">
        {textOutput}
      </div>
    </div>
  );
}

export default App;
