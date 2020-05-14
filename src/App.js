import React, { Component } from 'react';
import Chrono from './components/Chrono';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, ListGroupItem, FormGroup, Label, Form, Button, ButtonGroup, ListGroup, Input } from 'reactstrap';
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
          time: 1200,
          status: "Paused"
        },
      ],
      editTitle: '',
      editProject: '',
      edit: [],
      no: false,
      cancel: false
    }
    this.handleCancel = this.handleCancel.bind( this )
    this.editTitleChange = this.editTitleChange.bind( this );
    this.editProjectChange = this.editProjectChange.bind( this );
  }

  handleCancel(){
    this.setState({
      cancel: true,
    })
  }

  handleEdit( id, event ) {
    this.setState({
      chronos: this.state.chronos.map(( chrono ) =>
        chrono.id === id ? { id: id, title: this.state.editTitle, project: this.state.editProject } : chrono
      ),
      editTitle: '',
      editProject: '',
      edit: []
    })
    event.preventDefault();
  }

  editTitleChange( event ) {
   this.setState({
     editTitle: event.target.value
   });
 }

 editProjectChange( event ) {
   this.setState({
     editProject: event.target.value
   });
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
      }
      this.setState({
        chronos: [...this.state.chronos, newChrono],
      })
      event.target.reset()
    }
  }

  editCancel(event){
    this.setState({
      edit: []
    });
    event.preventDefault();
  }

  edit( id, event ){
    var found = this.state.chronos.find( function( chrono ) {
      return chrono.id === id;
    });
    this.setState({
      no: !this.state.no,
      edit: this.state.edit.concat( found ),
    });
    event.preventDefault();
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

    const edits =
      <div>
        { this.state.edit.map(( edit ) =>
          <div className = "row">
            <div className = "col-sm-6 col-sm-offset-6 mx-auto">
              <Form onSubmit={ this.handleEdit.bind( this, edit.id )} key = { edit.id }>
                <ListGroupItem >
                  <FormGroup >
                    <Label>Titulo </Label>
                    <Input type = "text" placeholder = { edit.title } onChange = { this.editTitleChange } required/>
                    <Label >Proyecto </Label>
                    <Input type = "text" placeholder = { edit.project } onChange = { this.editProjectChange } required/>
                  </FormGroup>
                  <ButtonGroup bsSize = "large">
                    <Button type = "submit" bsStyle="primary" >Actualizar </Button>
                    <Button onClick = { this.editCancel.bind( this ) } bsStyle="danger">Cancelar </Button>
                  </ButtonGroup>
                </ListGroupItem>
              </Form>
            </div>
          </div>
        )}
      </div>

    return (
      <div className = "container">
        <div className = "row">
          <div className = "col-sm-6 col-sm-offset-6 mx-auto">
          <h1 className = "text-center"> Cronómetros | La app </h1>
            <Form onSubmit = { this.add.bind( this ) } >
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
            </Form>
          </div>
        </div>

        { this.state.chronos.map (( chrono, id ) =>
          <Row key = { id }>
            <Col md={6} mdOffset={6} mx-auto>
              <Form>
              <Card>
                <CardBody>
                  <CardTitle><strong>{ chrono.title }</strong></CardTitle>
                  <CardSubtitle className = "mb-2 text-muted">{ chrono.project }</CardSubtitle>
                  <Chrono
                    chrono = { chrono }
                    id = { id }
                    onDelete = {() => this.delete( id )}
                  />
                </CardBody>
                <Button onClick = { this.edit.bind( this, id ) } bsStyle = "success">Editar </Button>
              </Card>
              </Form>
            </Col>
          </Row>
        )}

        <Row>
          <Col md = { 6 } mdOffset = { 6 }>
            <ListGroup>
              <div>
                { edits }
              </div>
            </ListGroup>
          </Col>
        </Row>
    </div>













    )
  }
}

export default App;
