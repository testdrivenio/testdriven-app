import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import AceEditor from 'react-ace';
import 'brace/mode/python';
import 'brace/theme/solarized_dark';

const Exercise = (props) => {
  return (
    <div key={props.exercise.id}>
      <h4>{props.exercise.body}</h4>
        <AceEditor
          mode="python"
          theme="solarized_dark"
          name={(props.exercise.id).toString()}
          fontSize={14}
          height={'175px'}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={props.editor.value}
          style={{marginBottom: '10px'}}
          onChange={props.onChange}
        />
        {props.isAuthenticated &&
          <div>
            <Button
              bsStyle="primary"
              bsSize="small"
              onClick={(evt) => props.submitExercise(evt, props.exercise.id)}
              disabled={props.editor.button.isDisabled}
            >Run Code
            </Button>
          {props.editor.showGrading &&
            <h4>
              &nbsp;
              <Glyphicon glyph="repeat" className="glyphicon-spin"/>
              &nbsp;
              Grading...
            </h4>
          }
          {props.editor.showCorrect &&
            <h4>
              &nbsp;
              <Glyphicon glyph="ok" className="glyphicon-correct"/>
              &nbsp;
              Correct!
            </h4>
          }
          {props.editor.showIncorrect &&
            <h4>
              &nbsp;
              <Glyphicon glyph="remove" className="glyphicon-incorrect"/>
              &nbsp;
              Incorrect!
            </h4>
          }
          </div>
        }
      <br/><br/>
    </div>
  )
};

export default Exercise;
