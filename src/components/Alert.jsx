import { useSelector } from "react-redux"
const Alert = () => {
  const {alertText,alertType} = useSelector((state) => state.store)
      return <div className={`alert alert-${alertType} form-font`}>{alertText}</div>
}

export default Alert
