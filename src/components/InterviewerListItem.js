import React from 'react';
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, onChange} = props;
  const interviewersListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });
  const interviewersItemImageClass = classNames("interviewers__item-image", {
    "interviewers__item-image--selected": selected,
  })
  
  return (
    <li
      className={interviewersListItemClass}
      onClick={onChange}
      id={id}
    >
      <img
        className={interviewersItemImageClass}
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}