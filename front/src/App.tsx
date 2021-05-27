import React from 'react';
import './App.css';
import Previewer from './components/previewer/Previewer';
import {Col, Row} from 'antd';
import {ConfigProvider} from './services/config.provider';
import FormType from "./FormType";
import PlatformLoader from "./components/platform-loader/PlatformLoader";


function App() {
  return (
    <div className='App'>
      <Row gutter={[24, 24]}>
        <ConfigProvider>
          <Col span={12} className={'separator'} style={{height: '100%', overflow: 'auto'}}>
            <PlatformLoader/>
            <FormType />
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
