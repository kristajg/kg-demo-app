import Sidebar from '../components/Sidebar';

function DemoCategoryWrapper(props) {
  return (
    <div className='container-fluid ps-0'>
      <div className='row'>
        <div className='col-2'>
          <Sidebar listItems={props.listItems} />
        </div>
        <div className='col-10'>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default DemoCategoryWrapper;