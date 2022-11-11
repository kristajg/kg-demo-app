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

export const Voice = () => (
  <DemoCategoryWrapper
    listItems={voiceSidebarData}
    headerText='📞 Voice Demo'
  >
    <Outlet />
  </DemoCategoryWrapper>
);
