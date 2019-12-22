import React, { Component } from 'react';
import { Keyboard } from './Keyboard';
import { Staff } from './Staff';

export class App extends Component {
  state = {
    activeNote: null,
    feedback: '',
  }

  handleNoteChange = (note) => {
    this.setState({
      ...this.state,
      activeNote: note,
      feedback: '',
    })
  }

  handleNotePress = (notes) => {
    const { activeNote } = this.state;
    const feedback = notes.includes(activeNote) ? 'correct' : 'incorrect';

    this.setState({
      ...this.state,
      feedback,
    })
  }

  render() {
    const { feedback } = this.state;
    return (
      <div className="App">
        <Keyboard handleNotePress={this.handleNotePress} />
        <Staff feedback={feedback} handleNoteChange={this.handleNoteChange} />
      </div>
    )
  }
}

export default App;
