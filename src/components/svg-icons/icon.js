import React from 'react';

const Icon = props => (
  <div>
    <img src={props.icon} alt={props.alt} style={props.style}/>
  </div>
);

export default Icon;