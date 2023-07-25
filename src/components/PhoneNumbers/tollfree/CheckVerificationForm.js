export default function CheckVerificationForm({ handleResetForm, handleSubmit, handleTextChange, tollFreeValue, formSubmitted }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="tollFreeValue" className="form-label">Enter the Toll-Free Number</label>
        <input
          type="text"
          className="form-control"
          id="tollFreeValue"
          aria-describedby="tollFreeHelp"
          onChange={handleTextChange}
          value={tollFreeValue}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={formSubmitted ? handleResetForm : handleSubmit}
      >
        {formSubmitted ? 'Restart' : 'Submit'}
      </button>
    </form>
  );
}