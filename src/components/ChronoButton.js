import React from 'react';
import { Button } from 'reactstrap';

const ChronoButton = ({ text, onClick, style }) => {
  return <Button
    onClick = { onClick }
    style = { style }
    variant = "raised"
    color = "primary"
    className = "mx-2 my-2"
  >
  { text }
  </Button>
}

export default ChronoButton;
