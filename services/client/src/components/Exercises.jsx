import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/solarized_dark';

class Exercises extends Component {
  constructor (props) {
    super(props)
    this.state = {
      exercises: [],
      editor: {
        value: '# Enter your code here.'
      }
    };
    this.onChange = this.onChange.bind(this);
    this.submitExercise = this.submitExercise.bind(this);
  };
  componentDidMount() {
    this.getExercises();
  }
  getExercises() {
    const exercises = [
      {
        id: 0,
        body: 'Define a function called sum that takes two integers as arguments and returns their sum.'
      },
      {
        id: 1,
        body: 'Define a function called reverse that takes a string as an argument and returns the string in reversed order.'
      },
      {
        id: 2,
        body: 'Define a function called factorial that takes a random number as an argument and then returns the factorial of that given number.',
      }
    ];
    this.setState({ exercises: exercises });
  };
  onChange(value) {
    this.setState({
      editor: {
        value: value
      }
    });
  };
  submitExercise(event) {
    event.preventDefault();
    console.log(this.state.editor.value);
  };
  render() {
    return (
      <div>
        <h1>Exercises</h1>
        <hr/><br/>
          {!this.props.isAuthenticated &&
            <div>
              <div className="alert alert-warning">
                <span
                  className="glyphicon glyphicon-exclamation-sign"
                  aria-hidden="true">
                </span>
                <span>&nbsp;Please log in to submit an exercise.</span>
              </div>
              <br/>
            </div>
          }
          {this.state.exercises.length &&
            <div key={this.state.exercises[0].id}>
              <h4>{this.state.exercises[0].body}</h4>
                <AceEditor
                  mode="python"
                  theme="solarized_dark"
                  name={(this.state.exercises[0].id).toString()}
                  onLoad={this.onLoad}
                  fontSize={14}
                  height={'175px'}
                  showPrintMargin={true}
                  showGutter={true}
                  highlightActiveLine={true}
                  value={this.state.editor.value}
                  style={{
                    marginBottom: '10px'
                  }}
                  onChange={this.onChange}
                />
                {this.props.isAuthenticated &&
                  <Button
                    bsStyle="primary"
                    bsSize="small"
                    onClick={this.submitExercise}
                  >Run Code</Button>
                }
              <br/><br/>
            </div>
          }
      </div>
    )
  };
};

export default Exercises;
