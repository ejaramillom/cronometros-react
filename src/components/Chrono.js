import React from 'react';
import ChronoDisplay from "./ChronoDisplay.js"
import ChronoControls from './ChronoControls.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, CardText } from 'reactstrap';

class Chrono extends React.Component{

  constructor(){
    super()
    this.state ={
        time: 0,
        status: 'Paused'
    }
  }

  start = () => {
    this.intervalHandler = setInterval(() => {
      const time = this.state.time + 100
      this.setState({
        time: time
      })
    }, 100)

    this.setState({
      status: 'Active'
    });
  }

  reset = () => {
    const status = this.state.status === 'Paused' ? 'Deactivated' : 'Active';
    const time = 0
      this.setState({
        time: time,
        status
    })
  }

  paused = () => {
    clearInterval( this.intervalHandler )
    this.setState({
      status: 'Paused'
    });
  }

  render(){
    const { time, status } = this.state;
    return( <div>
      <Card className="card text-center" key={ this.props.chrono.id }>
        <ChronoDisplay time = { time }/>
        <ChronoControls
          onStart = { this.start }
          onReset = { this.reset }
          onPause = { this.paused }
          status = { status }
        />
        <CardText className="btn-align ">
          <Button variant="light" className = "my-2 mx-2" color = "danger" onClick={ this.props.onDelete }>Borrar </Button>
          <Button variant="light" className = "my-2 mx-2" color = "success" onClick={ this.props.onEdit }>Editar </Button>
        </CardText>
      </Card>
    </div> )
  }
}

export default Chrono;
