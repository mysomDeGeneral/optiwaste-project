import React from 'react';
import CollectorRoute from '@/components/collector-route';


const CollectorPage = () => {
  const requestAddress = "AOK6806973"; // Replace with actual address

  return (
    <div>
      <h1>Collector Route</h1>
      <CollectorRoute requestAddress={requestAddress} />
    </div>
  );
};

export default CollectorPage;
