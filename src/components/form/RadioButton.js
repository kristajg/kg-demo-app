function RadioButton(props) {
  return (
    <div className='form-check'>
      <input
        className='form-check-input'
        type='radio'
        name='flexRadioDefault'
        id={`${props.id}Radio`}
        value={props.id}
        onChange={props.handleRadioChange}
        defaultChecked={props.isDefault}
      />
      <label className='form-check-label' htmlFor={`${props.id}Radio`}>
        {props.name}
      </label>
    </div>
  );
}

export default RadioButton;
