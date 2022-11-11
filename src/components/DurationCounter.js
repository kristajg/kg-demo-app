import React, { useState } from 'react';

export const DurationCounter = () => {
  const [startTime, updateTime] = useState(0);
  return (
    <div>
      call duration counter goes here {startTime}
    </div>
  );
}
