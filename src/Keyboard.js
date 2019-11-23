import React, { Component } from 'react';
import WebMidi from 'webmidi';


const keyList = [
  ["C"],
  ["C#", "D_"],
  ["D"],
  ["D#", "E_"],
  ["E"],
  ["F"],
  ["F#", "G_"],
  ["G"],
  ["G#", "A_"],
  ["A"],
  ["A#", "B_"],
  ["B"],
];

const keys = ["A0", "A#0", "B0"];

var key = 0;
var octave = 1;
for (var i = 0; i < 85; i++) {
    keys.push(keyList[key][0] + "" + octave)
    key++;
    if (key === 12) {
        key = 0;
        octave++;
    }
}

console.log(keys)

export class Keyboard extends Component {
  state = {
    input: null,
    output: null,
  }

  keyDown = (e) => {
    console.log(`${e.note.name}${e.note.octave}`);
  }
  componentDidMount() {
    WebMidi.enable(() => {
      this.setState({
        input: WebMidi.inputs[0],
        output: WebMidi.outputs[0],
      });
      this.state.input && this.state.input.addListener('noteon', "all", this.keyDown);
    });
  }
  render() {
    const { input } = this.state;
    return (
      <>
        {!input && <p>No MIDI Detected</p>}
        <div className="keyboard">
          <div className="white">
            {keys.filter(key => !key.includes("#")).map(key => {
              return <div className="key" key={key} id={key}></div>;
            })}
          </div>
          <div className="black">
            {keys.filter(key => key.includes("#")).map(key => {
              return <div className="key" key={key} id={key}></div>;
            })}
          </div>
        </div>
      </>
    );
  }
}