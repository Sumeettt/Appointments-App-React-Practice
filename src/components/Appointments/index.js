// Write your code here
import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

const APPOINTMENTS_IMG =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentList: [],
    isFilterActive: false,
  }

  onEnteringTitle = event => {
    const inputTitle = event.target.value
    this.setState({
      title: inputTitle,
    })
  }

  onEnteringDate = event => {
    const inputDate = event.target.value

    this.setState({
      date: inputDate,
    })
  }

  onSubmittingForm = event => {
    event.preventDefault()
    const {title, date} = this.state
    // If date is empty
    // if (!date) {
    // alert("Enter Valid Title")
    //  console.log('Please select a date')
    //  return
    // }
    console.log(!date)
    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidV4(),
      title,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onStarringAnAppointment = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    this.setState(prevState => ({isFilterActive: !prevState.isFilterActive}))
  }

  getFilteredAppointmentList = () => {
    const {isFilterActive, appointmentList} = this.state

    if (isFilterActive) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {title, date, appointmentList, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'

    const filteredAppointmentList = this.getFilteredAppointmentList()

    return (
      <div className="app-container">
        <div className="appointment-card">
          <div className="input-card">
            <form onSubmit={this.onSubmittingForm}>
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="title">TITLE</label>
              <input
                id="title"
                className="input"
                type="text"
                placeholder="Title"
                value={title}
                onChange={this.onEnteringTitle}
              />
              <label htmlFor="date">DATE</label>
              <input
                id="date"
                className="input"
                type="date"
                value={date}
                onChange={this.onEnteringDate}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <div className="img-container">
              <img
                className="appointments-img"
                src={APPOINTMENTS_IMG}
                alt="appointments"
              />
            </div>
          </div>
          <hr />
          <div className="appointments-container">
            <div className="heading-starred-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                className={`filter-style ${filterClassName}`}
                type="button"
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-list-container">
              {filteredAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  eachAppointment={eachAppointment}
                  key={eachAppointment.id}
                  onStarringAnAppointment={this.onStarringAnAppointment}
                  starred={this.state}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
