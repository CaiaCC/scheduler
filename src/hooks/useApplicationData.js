import {useState, useEffect} from "react";
import axios from 'axios';
import {updatedSpotsRemaining} from "../helpers/selectors"

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = day => setState({...state, day});
  
  const daysUrl = '/api/days';
  const appointmentsUrl = '/api/appointments';
  const interviewersUrl = '/api/interviewers';

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(daysUrl)),
      Promise.resolve(axios.get(appointmentsUrl)),
      Promise.resolve(axios.get(interviewersUrl))
    ])
    .then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
    .catch(e => console.log(e));
  }, []);
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const url = `${appointmentsUrl}/${id}`;
    const promise = axios.put(url, appointments[id])
      .then((res) => {
        setState({...state, appointments});
        setState(updatedSpotsRemaining);
        return res;
      })

    return promise;
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }; 
    const url = `${appointmentsUrl}/${id}`;
    const promise = axios.delete(url)
      .then(res => {
        setState({...state, appointments});
        setState(updatedSpotsRemaining);
        
        return res;
      });
    
    return promise;
  };
  
  return {state, setDay, bookInterview, cancelInterview};
};
