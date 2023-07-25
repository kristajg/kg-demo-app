import twilioHighLevel from '../assets/images/twilioHighLevel.png';

function Home() {
  return (
    <div className='container'>
      <div className='container'>
        <img src={twilioHighLevel} alt='Twilio architecture slide' className='img-fluid' style={{ maxWidth: '95%' }} />
      </div>
    </div>
  );
}

export default Home;
