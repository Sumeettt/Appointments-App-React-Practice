// Write your code here
import './index.css'

const FILLED_STAR_URL =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
const EMPTY_STAR_URL =
  'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

const AppointmentItem = props => {
  const {eachAppointment, onStarringAnAppointment} = props
  const {id, title, date, isStarred} = eachAppointment
  const starImage = isStarred ? FILLED_STAR_URL : EMPTY_STAR_URL

  const onClickingStarButton = () => {
    onStarringAnAppointment(id)
  }

  return (
    <li className="appointment-item">
      <div className="appointment-title-star">
        <p className="appointment-title">{title}</p>
        <button
          type="button"
          className="star-button"
          data-testid="star"
          onClick={onClickingStarButton}
        >
          <img src={starImage} alt="star" />
        </button>
      </div>
      <p className="appointment-date">{`Date:  ${date}`}</p>
    </li>
  )
}

export default AppointmentItem
