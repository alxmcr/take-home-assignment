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
  const [margin, setMargin] = React.useState(0);

  const handleChange = event => {
    setTextInput(event.target.value);
  };

  const handleMargin = event => {
    setMargin(parseInt(event.target.value));
  }

  const handleSubmit = event => {
    event.preventDefault();
    transformText(textInput, margin);
  };

  const transformText = (input = "", margin = 0) => {
    let output = "";
    const paragraphsFormatted = []
    const paragraphs = input.split(DOUBLE_LINE_BREAK);
    const paragraphsValid = paragraphs.filter(paragraph => paragraph !== EMPTY)

    paragraphsValid.forEach(paragraph => {
      const maxLengthByLineWithMargin = MAX_LENGTH_BY_LINE - margin;
      const paragraphFormatted = transformParagraph(paragraph, maxLengthByLineWithMargin, margin);
      paragraphsFormatted.push(paragraphFormatted);
    })

    output = generatorMargin(margin, LINE_BREAK)
      + paragraphsFormatted.join(DOUBLE_LINE_BREAK)
      + generatorMargin(margin + 1, LINE_BREAK);

    setTextOutput(output);
  }

  const transformParagraph = (paragraph = "", maxLengthByLine = 0, margin = 0) => {
    let paragraphFormatted = "";
    const paragraphReplaceLineBreak = paragraph.replaceAll(LINE_BREAK, SPACE);
    const words = paragraphReplaceLineBreak.split(SPACE);
    const wordsValid = words.filter(word => word !== EMPTY)
    let line = "";
    wordsValid.forEach((word) => {
      const currentLineLength = line.length;
      const wordLength = word.length;
      const lineLength = currentLineLength + wordLength;
      if (lineLength + margin <= maxLengthByLine) {
        line += word + " ";
      } else {
        paragraphFormatted = paragraphFormatted + addLeftMargin(line.trimEnd(), margin, SPACE);

        if (line === "") {
          line = word;
        } else {
          line = "\n" + generatorMargin(margin, SPACE) + word + " ";
        }
      }
    })
    paragraphFormatted = paragraphFormatted + addLeftMargin(line.trimEnd(), margin, SPACE);

    return paragraphFormatted;
  }

  const addLeftMargin = (line = "", margin = 0, character = " ") => {
    return generatorMargin(margin, character) + line;
  }

  const generatorMargin = (quantity = 0, character = " ") => {
    let margin = "";
    let counter = 0;

    while (counter < quantity) {
      margin += character;
      counter++;
    }
    return margin;
  }

  const handleReset = () => {
    setTextInput("");
    setTextOutput("");
    setMargin(0);
  };

  return (
    <div className="App">
      <header>
        <h1>Career Lab | Take-Home Assignment</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label htmlFor="margin">Margin:</label>
        <input type="number" name="margin" id="margin" value={margin} onChange={handleMargin} />
        <label>
          <textarea onChange={handleChange} value={textInput} />
        </label>
        <input type="submit" value="Submit" />
        <input type="reset" value="Reset" onClick={handleReset} />
      </form>
      <div id="result">
        {textOutput}
      </div>
    </div>
  );
}

export default App;
