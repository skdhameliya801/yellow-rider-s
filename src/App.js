import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import { CONSTANTS } from './CONSTANTS';

function App() {

  console.log("3")
  
  // let i_am_rider = () => {
  //   let rider_data = JSON.parse(localStorage.getItem("l_r_d"))

  //   if(rider_data != null){
  //     window.location.href = "/passenger_list"
  //   }
  //   else{
  //     window.location.href = "/login"
  //   }
  // }

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <>
      {/* <div className="d-flex justify-content-center align-items-center p-5" style={{"height":"100vh"}}>
        <div className='p-5' style={{"backgroundColor":"yellow"}}>
          <h1 className='text-center'>Yellow Ride</h1>
          <button className='btn btn-success p-5 m-5'>I am Rider</button>
          <button className='btn btn-success p-5 m-5'>I am Passenger</button>
        </div>
      </div> */}

      {/* <div className='container justify-content-center align-items-center'>
        <div className="row">
          <div className="col">
            <input type="text" className="form-control" placeholder="First name" aria-label="First name" />
          </div>
          <div className="col">
            <input type="text" className="form-control" placeholder="Last name" aria-label="Last name" />
          </div>
        </div>
      </div> */}

<div className="d-flex flex-column vh-100">
      <header className="p-3">
        {/* Header content */}
        <h1 className='text-center mt-5'>Welcome to <b>{CONSTANTS.app_name}</b></h1>
      </header>
      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center">
          {/* First centered div */}
          <div className="container text-center">
            <div className="row">
              <div className="col-12">

                  <Link to={"/passenger_form"} className='text-black' style={{"textDecoration":"none"}}>
                    <div className='passenger_div bg-light p-5 rounded-5'>
                      <h5>I am Passenger</h5>
                    </div>
                  </Link>
                
              </div>
              <div className="col-12 mt-5">
                
                {/* <Link to={"/login"} className='text-black' style={{"textDecoration":"none"}}> */}
                <Link to={"/choose"} className='text-black' style={{"textDecoration":"none"}}>
                    <div className='rider_div bg-success p-5 rounded-5'>
                      <h5>I am Rider</h5>
                    </div>
                  </Link>
                
            </div>
            </div>
            {/* <div className="row mt-5">
              <div className='passenger_div bg-success p-5'>
                  I am Passenger
              </div>
            </div> */}
          </div>
          
        </div>
        <div className="d-flex align-items-center justify-content-center">
          {/* Second centered div */}
          
          
        </div>
      </main>
      <footer className="p-3 mb-5">
        {/* Footer content */}
        {/* <h4 className='text-center'>Have a nice ride...!</h4> */}
        <div className='container'>
          <div className='row text-center'>
            <div className='col-6'>
              <a href="https://chat.whatsapp.com/ENwHWuC1fVRHde8cPVN6xx" target='_blank'>Join WhatsApp Group</a>
            </div>
            <div className='col-6'>
              <a href="https://chat.whatsapp.com/D5XRiKtIl2s2wmrg24tQaM" target='_blank'>Join WhatsApp Community</a>
            </div>
          </div>
        </div>
      </footer>
    </div>

    </>
  );
}

export default App;
