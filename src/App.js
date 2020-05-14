import React, { Component } from 'react';
import Chrono from './components/Chrono';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';
import './App.css';

class App extends Component {

  constructor( props ) {
    super( props );
    this.state = {
      chronos: [
        { id: 0,
          title: "Hacer proyecto",
          project: "Cronometros",
          edit: true,
          time: 120,
          status: "Paused"
        },
      ],
      cancel: false
    }
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleCancel(){
    this.setState({
      cancel: true,
    })
  }

  add( event ){
    event.preventDefault()
    const title = event.target[ 'title' ].value
    const project = event.target[ 'project' ].value
    const not_ahead = this.state.cancel
    const id = this.state.chronos.length

    if( not_ahead ){
      event.target.reset()
      this.setState({
        cancel: false
      })
    }
    else {
      const newChrono = {
        id: id,
        title: title,
        project: project,
        edit: true,
        time: 0,
        status: 'Deactivated',
        count: 0
      }
      this.setState({
        chronos: [...this.state.chronos, newChrono],
      })
      event.target.reset()
    }
  }

  edit( id, event ) {
    const newChronos = this.state.chronos.map( chrono => {
      if ( chrono.id === id ){
        chrono.edit = !chrono.edit
      }
      return chrono
    })
    this.setState({
      chronos: newChronos
    })
  }

  update ( id, event )  {
    event.preventDefault()
    const title = event.target[ 'title' ].value
    const project = event.target[ 'project' ].value
    const newChronos = this.state.chronos.map( chrono => {
      if ( chrono.id === id ){
        chrono.edit = !chrono.edit
        chrono.title = title
        chrono.project = project
      }
      return chrono
    })
    this.setState({
      chronos: newChronos
    })
  }

  delete ( id )  {
    const i = this.state.chronos[ id ]
    clearInterval( i.count );
    this.state.chronos.splice( id, 1 )
    const newChronos = this.state.chronos.map(( chrono, id ) => {
      if ( true ){
        chrono.id = id
      }
      return chrono
    });

    this.setState({
      chronos: newChronos
    })
  }

  render() {
    return (
      <div className = "container">
        <div className = "row">
          <div className = "col-sm-6 col-sm-offset-6 mx-auto">
          <h1 className = "text-center"> Cronómetros | La app </h1>
            <form onSubmit = { this.add.bind( this ) } >
              <div className = 'form-group'>
                <label htmlFor = "title">Titulo </label>
                <input type = "text" className = "form-control" name = "title" />
              </div>
              <div className = 'form-group'>
                <label htmlFor = "project">Proyecto </label>
                <input type = "text" className = "form-control" name = "project" />
              </div>
              <div className = "flex-container">
                <div className = "item text-center my-3">
                  <button type = "submit" className = "btn btn-primary" name = "go_ahead">Crear </button>
                </div>
                <div className = "item text-center my-3">
                  <button type = "submit" className = "btn btn-secondary" name = "not_ahead" value = { this.state.cancel } onClick = { this.handleCancel.bind( this )}>Cancelar </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        { this.state.chronos.map (( chrono, id ) =>
          <div className = "row" key = { id }>
            { chrono.edit ?
              <div className = "col-sm-6 col-sm-offset-6 mx-auto">
                <form>
                <Card>
                <CardBody>
                  <CardTitle><strong>{ chrono.title }</strong></CardTitle>
                  <CardSubtitle className = "mb-2 text-muted">{ chrono.project }</CardSubtitle>
                  <Chrono
                    chrono = { chrono }
                    id = { id }
                    onDelete = {() => this.delete( id )}
                    onEdit = {() => this.edit( chrono.id )}
                  />
              </CardBody>
                </Card>
                </form>
              </div>
              :
              <div className = "col-sm-6 col-sm-offset-6 mx-auto">
                <form onSubmit = { this.update.bind( this, chrono.id )}>
                  <div>
                    <label htmlFor = "title">Titulo </label>
                    <input type = "text" className = "form-control" defaultValue = { chrono.title } name="title" />
                  </div>
                  <div>
                    <label htmlFor = "project">Proyecto </label>
                    <input type = "text" className = "form-control" defaultValue = { chrono.project } name = "project" />
                  </div>
                  <div className = "flex-container">
                    <div className = "item text-center my-4">
                      <button type = "submit" className = "btn btn-primary" >Actualizar </button>
                    </div>
                    <div className = "item text-center my-4">
                      <button type = "submit" className = "btn btn-secondary" onClick = { this.edit.bind( this, chrono.id )}>Cancelar </button>
                    </div>
                  </div>
                </form>
              </div>
            }
          </div>
        )}
      </div>
    )
  }
}

export default App;
