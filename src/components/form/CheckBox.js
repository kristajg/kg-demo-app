function CheckBox(props) {
  return (
    <div className='form-check'>
      <input
        className='form-check-input'
        type='checkbox'
        value={props.id ? props.id : ''}
        id={`${props.id}Check`}
        onClick={e => props.handleCheckChange(e)}
      />
      <label className='form-check-label' htmlFor={`${props.id}Check`}>
        {props.text}
      </label>
    </div>
  );
}

export default CheckBox;
