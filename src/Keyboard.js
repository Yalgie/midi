import React, { Component } from 'react';
import WebMidi from 'webmidi';
import { keys } from './keys';

export class Keyboard extends Component {
  static defaultProps = {
    handleNotePress: null,
  }

  state = {
    input: null,
    output: null,
    activeNotes: [],
  }

  noteOn = (e) => {
    const note = `${e.note.name}${e.note.octave}`;
    const { activeNotes } = this.state;
    const { handleNotePress } = this.props; 
    const newActiveNotes = activeNotes
    newActiveNotes.push(note);

    this.setState({
      ...this.state,
      activeNotes: newActiveNotes,
    });

    handleNotePress(newActiveNotes);
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
        {!input && <p className="midi-text">No MIDI Detected</p>}
        {input && <p className="midi-text">{input.manufacturer} {input.name} Detected</p>}
        <div className="keyboard">
          <div className="white">
            {keys.filter(key => !key.note.includes("#")).map(key => {
              const active = activeNotes.includes(key.note);
              return <div className={active ? "active key" : "key"} key={key.note} id={key.note}></div>;
            })}
          </div>
          <div className="black">
            {keys.filter(key => key.note.includes("#")).map(key => {
              const active = activeNotes.includes(key.note);
              return <div className={active ? "active key" : "key"} key={key.note} id={key.note}></div>;
            })}
          </div>
        </div>
      </>
    );
  }
}