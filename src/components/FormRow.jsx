import "./index.css"

const FormRow = ({ type, name, value, handleChange,label,placeholder }) => {
    return (
      <div className='form-row'>

        <label htmlFor={name} className='form-label labelText l'>
        <p className="labelText">{label || name}</p>  
        </label>
        <input
        placeholder={placeholder}
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          style={{padding:"20px"}}
          className='form-input form-font' 
        />
      </div>
    )
  }
  
  export default FormRow
  