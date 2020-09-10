export function getAppointmentsForDay(state, day) {
  const { days, appointments } = state;
  const filteredDay = days.filter((obj) => obj.name === day);

  if (days.length===0 || filteredDay.length === 0) return [];
  
  return filteredDay[0].appointments
    .filter(appointmentId => appointments[appointmentId]) 
    .map(appointmentId =>appointments[appointmentId]);
}

export function getInterviewersForDay(state, day) {
  const { days, interviewers } = state;
  const filteredDay = days.filter((obj) => obj.name === day);

  if (days.length===0 || filteredDay.length === 0) return [];
  
  return filteredDay[0].interviewers
    .filter(interviewerId => interviewers[interviewerId])
    .map(interviewerId => interviewers[interviewerId]);
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  
  const {interviewers} = state;
  const {interviewer} = interview;

  if (interviewers[interviewer]) {
    return {...interview, interviewer: {...interviewers[interviewer]}};
  }
};

export function updatedSpotsRemaining(state){
  const { days, appointments } = state;
  const newDays = days.map(day => {
    const spots = day.appointments
      .filter(appointmentsId => {
        return appointments[appointmentsId].interview === null
      })
      .length;

    return {...day, spots}
  })

  return {...state, days: newDays}
}