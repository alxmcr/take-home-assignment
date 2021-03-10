import './App.css';
import React from "react";

const EMPTY = "";
const DOUBLE_LINE_BREAK = "\n\n";

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
    let output = input;
    /*
        if input.length <= 1,
        it means it has only character or is an empty string and
        it's not necessary to format something
    */
    if (input.length > 1) {
      output = "";
      const paragraphs = input.split(DOUBLE_LINE_BREAK);
      const paragraphsValid = paragraphs.filter(paragraph => paragraph !== EMPTY)

      const paragraphsFormatted = []

      paragraphsValid.forEach(paragraph => {
        const paragraphFormatted = transformParagraph(paragraph);
        paragraphsFormatted.push(paragraphFormatted);
      })
      output = paragraphsFormatted.join(DOUBLE_LINE_BREAK);
    }
    setTextOutput(output);
  }

  const transformParagraph = (paragraph = "") => {
    let paragraphFormatted = paragraph;
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
