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
    activeNotes: [],
  }

  noteOn = (e) => {
    const note = `${e.note.name}${e.note.octave}`;
    const { activeNotes } = this.state;
    const newActiveNotes = activeNotes
    newActiveNotes.push(note);

    this.setState({
      ...this.state,
      activeNotes: newActiveNotes,
    });
  }

  noteOff = (e) => {
    const note = `${e.note.name}${e.note.octave}`;
    const { activeNotes } = this.state;
    const noteIndex = activeNotes.indexOf(note);
    const newActiveNotes = activeNotes
    newActiveNotes.splice(noteIndex, 1);

    this.setState({
      ...this.state,
      activeNotes: newActiveNotes,
    });
  }

  componentDidMount() {
    WebMidi.enable(() => {
      this.setState({
        ...this.state,
        input: WebMidi.inputs[0],
        output: WebMidi.outputs[0],
      });
      this.state.input && this.state.input.addListener('noteon', "all", this.noteOn);
      this.state.input && this.state.input.addListener('noteoff', "all", this.noteOff);
    });
  }

  render() {
    const { input, activeNotes } = this.state;

    return (
      <>
        {!input && <p>No MIDI Detected</p>}
        {input && <p>{input.manufacturer} {input.name} Detected</p>}
        <div className="keyboard">
          <div className="white">
            {keys.filter(key => !key.includes("#")).map(key => {
              const active = activeNotes.includes(key);
              return <div className={active ? "active key" : "key"} key={key} id={key}></div>;
            })}
          </div>
          <div className="black">
            {keys.filter(key => key.includes("#")).map(key => {
              const active = activeNotes.includes(key);
              return <div className={active ? "active key" : "key"} key={key} id={key}></div>;
            })}
          </div>
        </div>
      </>
    );
  }
}