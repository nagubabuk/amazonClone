import logo from '../../src/logo.svg'

function Navbar() {
  return (
    <div>
      <div style={{height:"60px",backgroundColor:'black'}}>
        <div>
          <img src={logo} style={{height:'40px'}}/>
        </div>
      </div>
    </div>
  )
}

export default Navbar