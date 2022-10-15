// Alert Options:
// primary
// secondary
// success
// danger
// warning
// info
// light
// dark

export default function Alert({ alertType = 'primary', alertText = '', isVisible = false, styleClasses = '' }){
  return (
    <div>
      <div
        className={`alert alert-${alertType} ${isVisible ? '' : 'd-none'} ${styleClasses}`}
        role='alert'
      >
        {alertText}
      </div>
    </div> 
  )
}
