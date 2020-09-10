import React from 'react';
import DayListItem from "./DayListItem"

export default function DayList(props){
	const {day, days, setDay} = props;
  const listItems = days.map(dayObj => 
    <DayListItem 
			key={dayObj.id}
			name={dayObj.name}
			spots={dayObj.spots}
			selected={dayObj.name === day}
			setDay={event => setDay(dayObj.name)}  
		/>
	)

	return (
		<ul>
    {listItems}
		</ul>
	)
}
