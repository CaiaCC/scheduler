import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import  PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const{ interviewers, value, onChange} = props;
  const listItems = interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}  
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        onChange={event => onChange(interviewer.id)}
      />
    )
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listItems}</ul>
    </section>
  )  
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
  
  
  
  
  
