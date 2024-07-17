import React from 'react';
// import CollectorRoute from '@/components/collector-route';
import CollectorMap from '@/components/collector-route';


const CollectorPage = () => {
  const requestAddress = "AOK6806973"; // Replace with actual address

  return (
    <div>
      <h1>Collector Route</h1>
      <CollectorMap requestAddress={requestAddress} />
    </div>
  );
};

export default CollectorPage;
