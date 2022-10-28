import React, { Component } from 'react';
import { Outlet } from 'react-router';

// Components
import DemoCategoryWrapper from './MainWrapper';

const voiceSidebarData = [
  {
    name: 'Place Call',
    route: '',
  },
  {
    name: 'IVR',
    route: 'ivr',
  },
  {
    name: 'Power Dialer',
    route: 'powerdialer',
  },
];

class Voice extends Component {
  render() {
    return (
      <DemoCategoryWrapper
        listItems={voiceSidebarData}
        headerText='📞 Voice Demo'
      >
        <Outlet />
      </DemoCategoryWrapper>
    );
  }
}

export default Voice;
