import React from 'react';
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';

function Slash(props) {
  return (
    <div style={{
    'background-color': 'rgba(232, 164, 4, 0.2)',
    'border-left': 'solid #e8a404',
    'border-width': '7px',
    'border-radius': '12px',
    'padding': 10,
    'margin': 10,
    'margin-left': -2
    }}>
      <div style={{display: 'flex', 'flex-direction': 'row'}}>
      <h5 style={{color: 'white', fontSize: 32, 'margin-right': '5px'}}>{'{/}'}</h5>
      <h5 style={{color: 'white', fontSize: 17, 'margin-top': '10px'}}>{props.title}</h5>
      </div>
      <div>{props.children}</div>
    </div>
  );
}

function Ephemeral(props) {
  return (
    <div style={{
    'background-color': 'rgba(216, 212, 220, 0.2)',
    'border-left': 'solid #d8d4dc',
    'border-width': '7px',
    'border-radius': '12px',
    'padding': 10,
    'margin': 10,
    'margin-left': -2
    }}>
      <div style={{display: 'flex', 'flex-direction': 'row'}}>
      <img src="/img/ghost.png/" alt="admin_shield"></img>
      <h5 style={{color: 'white', fontSize: 17, 'margin-left': '5px', 'margin-top': '10px'}}>{props.title}</h5>
      </div>
      <div>{props.children}</div>
    </div>
  );
}

function Administrator(props) {
  return (
    <div style={{
    'background-color': 'rgba(15, 161, 211, 0.2)',
    'border-left': 'solid #5BC4E8',
    'border-width': '7px',
    'border-radius': '12px',
    'padding': 10,
    'margin': 10,
    'margin-left': -2
    }}>
      <div style={{display: 'flex', 'flex-direction': 'row'}}>
      <img src="/img/is_admin_32x.png/" alt="admin_shield"></img>
      <h5 style={{color: 'white', fontSize: 17, 'margin-left': '5px', 'margin-top': '5px'}}>{props.title}</h5>
      </div>
      <div>{props.children}</div>
    </div>
  );
}

const AdmonitionTypes = {
  ...DefaultAdmonitionTypes,

  'slash': Slash,
  'ephemeral': Ephemeral,
  'admin': Administrator,
};

export default AdmonitionTypes;