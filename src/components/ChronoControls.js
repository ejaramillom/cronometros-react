import React from 'react';
import ChronoButton from './ChronoButton';

const ChronoControls = ({ status, onStart, onReset, onPause })=>{
  return (
    <div>
    <ChronoButton text = "Comenzar"
      onClick = { onStart }
      style={{ display: ( status === 'Deactivated'? 'inline': 'none' )}}/>
    <ChronoButton text = "Pausar"
      style={{ display: ( status === 'Active'? 'inline': 'none')}}
      onClick ={ onPause }/>
    <ChronoButton text = "Continuar"
      style={{ display: ( status === 'Paused'? 'inline': 'none' )}}
      onClick ={ onStart }/>
    <ChronoButton text = "Reiniciar"
      style={{ display: ( status === 'Paused' ? 'inline': 'none' )}}
      onClick ={ onReset }/>
    </div>
  )
}

export default ChronoControls;
