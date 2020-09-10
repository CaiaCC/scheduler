import React, {useState} from 'react';
import "components/Appointment/styles.scss";

import InterviewerList from "../InterviewerList"
import Button from "../Button"

export default function Form(props) {
  const {interviewers, onSave, onCancel} = props;
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  
  function reset() {
    setName("");
    setInterviewer(null);
  };
  function cancel() {
    reset();
    onCancel();
  };
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return
    }
    setError("");
    onSave(name, interviewer);
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            type="text"
            placeholder="Enter Student Name"
            name="name"
            value={name}
            onChange={event => setName(event.target.value)}
            onSubmit={event => event.preventDefault()}
            // required
            /*This must be a controlled component*/
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList 
          interviewers={interviewers} 
          value={interviewer} 
          onChange={setInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={validate} >Save</Button>
        </section>
      </section>
    </main>
  );
};
