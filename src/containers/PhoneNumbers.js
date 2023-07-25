import React from 'react';
import { Outlet } from 'react-router';

// Components
import DemoCategoryWrapper from './MainWrapper';

const voiceSidebarData = [
  {
    name: 'Toll-Free Verification',
    route: '',
  },
  {
    name: 'Number Purchase',
    route: 'number-purchase',
  },
  {
    name: 'A2P 10DLC',
    route: 'a2p-10dlc',
  },
];

export const PhoneNumbers = () => (
  <DemoCategoryWrapper
    listItems={voiceSidebarData}
    headerText='📞 Phone Numbers'
  >
    <Outlet />
  </DemoCategoryWrapper>
);
