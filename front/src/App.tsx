import React from 'react';
import './App.css';
import PlatformLoader from './components/platform-loader/PlatformLoader';
import Previewer from './components/previewer/Previewer';
import {Col, Row} from 'antd';
import PlatformBuilder from './components/platform-builder/PlatformBuilder';
import {ConfigProvider} from './services/config.provider';


function App() {
  return (
    <div className='App'>
      <Row gutter={[24, 24]}>
        <ConfigProvider>
          <Col span={12} className={'separator'}>
            <PlatformLoader />
            <PlatformBuilder />
          </Col>
          <Col span={12}>
            <Previewer />
          </Col>
        </ConfigProvider>
      </Row>
    </div>
  );
}

export default App;
