import React from "react";

import "components/DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {
  const {name, spots, selected, setDay} = props;
  const dayListItemClass = classnames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots===0
  });

  const formatSpots =(spot) => {
    return `${spot ? spot : 'no'} ${spot === 1 ? 'spot' : 'spots'} remaining`
  }
  
  return (
    <li
    data-testid="day"
    className={dayListItemClass}
    onClick={setDay}
    selected={selected}
    >
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}