import twilioHighLevel from '../assets/twilioHighLevel.png';

function Home() {
  return (
    <div className='container'>
      <div className='container'>
        <img src={twilioHighLevel} alt='Twilio High Level Slide' className='img-fluid' style={{ maxWidth: '95%' }} />
      </div>
    </div>
  );
}

export default Home;