import React from 'react';

const ChronoDisplay = ({ time }) => {
  const centiseconds = ( "0" + ( Math.floor( time / 10 ) % 100 )).slice( -2 );
  const seconds = ( "0" + ( Math.floor( time / 1000 ) % 60 )).slice( -2 );
  const minutes = ( "0" + ( Math.floor( time / 60000 ) % 60 )).slice( -2 );
  const hours = ( "0" + Math.floor( time / 3600000 )).slice( -2 );

  return(
    <div>
      <h1> { hours } : { minutes } : { seconds } : { centiseconds } </h1>
    </div>
  )
}

export default ChronoDisplay
