import React from 'react';
import Sidebar2 from '../components/layout/Sidebar2';

const TestSidebarPage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar2 />
      <div style={{ marginLeft: '16px' }}>Hello from test page</div>
    </div>
  );
};

export default TestSidebarPage;
