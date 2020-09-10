import React from "react";
import "components/Appointment/styles.scss";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status"
import Confirm from "./Confirm"
import Error from "./Error"
import useVisualMode from "../../hooks/useVisualMode.js";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDITING = "EDITING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  
  function onCancel() {back(EMPTY)};
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
  };

  function destroy(id) {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true))
  };
  
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onEdit={() => transition(EDITING)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      
      {mode === CREATE && (<Form interviewers={interviewers} onCancel={onCancel} onSave={save} />)}
      
      {mode === SAVING && <Status message="SAVING"/>}
      {mode === DELETING && <Status message="DELETING"/>}

      {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"} onCancel={() => {back()}} onDelete={destroy} id={id}/>}
      
      {mode === EDITING && <Form name={interview.student} interviewer={interview.interviewer.id} interviewers={interviewers} onCancel={onCancel} onSave={save} />}
      
      {mode === ERROR_SAVE && <Error message="Could not save the appointment." onClose={() => back()}/>}
      {mode === ERROR_DELETE && <Error message="Could not delete the appointment." onClose={() => back()}/>}

    </article>
  );
}
