
const Entradas =({id, iconName, inputType, placeholder, onChange, value}) => {
    return(
    <div className="input-group mb-3">
        <span className="input-group-text"><i className={iconName}></i></span>
        <input 
        id={id }
        type={inputType} 
        className="form-control" 
        placeholder={placeholder}
        onChange={onChange}
        value={value}/>
    </div>
    )
}

export default Entradas