import React, { Component } from 'react';
import { mappedKeys, keys } from './keys';

export class Staff extends Component {
  static defaultProps = {
    altoRange: ["C3", "C5"],
    bassRange: ["A2", "C4"],
    trebleRange: ["C4", "G5"],
    showSnF: false,
  }

  state = {
    cleff: 'treble',
    note: null,
    noteSize: 25 / 2,
    noteOffset: null,
  }

  getKeys = (range) => {
    const { showSnF } = this.props;
    const start = mappedKeys[range[0]].index;
    const end = mappedKeys[range[1]].index + 1;
    const pool = keys
      .slice(start, end)
      .filter(key => 
        showSnF || (!showSnF && key.note.indexOf("#") < 0) ? key : null
      )

    return pool[Math.floor(Math.random() * pool.length)];
  }

  setNewNote = () => {
    const {
      trebleRange,
      bassRange,
      altoRange,
      handleNoteChange,
    } = this.props;
    const { cleff, noteSize } = this.state;
    let note = null;
    let noteIndex = 0;

    if (cleff === "treble") {
      note = this.getKeys(trebleRange);
      noteIndex = note.trebleIndex;
    } else if (cleff === "bass") {
      note = this.getKeys(bassRange);
      noteIndex = note.bassIndex;
    } else if (cleff === "alto") {
      note = this.getKeys(altoRange);
      noteIndex = note.altoIndex;
    }

    this.setState({
      ...this.state,
      note,
      noteOffset: (noteSize * noteIndex) + "px",
    })

    handleNoteChange(note.note);
  }

  componentDidMount() {
    this.setNewNote();
  }

  componentDidUpdate() {
    const { feedback } = this.props;

    if (feedback === 'correct') this.setNewNote();
  }

  render() {
    const { noteOffset } = this.state;
    const { feedback } = this.props;

    return (
      <>
        <div className="staff">
          <div className="clef"></div>
          {/* <div className="key-sig"></div>
          <div className="time-sig"></div> */}
          <div className="staff-line"></div>
          <div className="staff-line"></div>
          <div className="staff-line"></div>
          <div className="staff-line"></div>
          <div className="staff-line"></div>
          <div 
            className={feedback} 
            id="note"
            style={{
              bottom: noteOffset
            }}
          />
        </div>
      </>
    );
  }
}