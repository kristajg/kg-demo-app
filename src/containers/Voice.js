import React from 'react';
import { Outlet } from 'react-router';

// Components
import DemoCategoryWrapper from './MainWrapper';

const voiceSidebarData = [
  {
    name: 'Soft Phone',
    route: '',
  },
  {
    name: 'Studio + Dialogflow',
    route: 'ivr',
  },
  // {
  //   name: 'Power Dialer',
  //   route: 'powerdialer',
  // },
];

export const Voice = () => (
  <DemoCategoryWrapper
    listItems={voiceSidebarData}
    headerText='📞 Programmable Voice Demo'
  >
    <Outlet />
  </DemoCategoryWrapper>
);
