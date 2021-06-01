import React, {useState} from 'react';
import './App.css';
import Previewer from './components/previewer/Previewer';
import {Col, Row} from 'antd';
import {ConfigProvider} from './services/config.provider';
import FormType from "./FormType";
import PlatformLoader from "./components/platform-loader/PlatformLoader";


function App() {
  const [panelsProportion, setProportion] = useState({rightSide: 12, leftSide: 12});

  function onFullscreen(status: boolean): void {
    if(status) {
      setProportion({rightSide: 24, leftSide: 0});
    } else {
      setProportion({rightSide: 12, leftSide: 12})
    }
  }

  return (
    <div className='App'>
      <Row gutter={[24, 24]}>
        <ConfigProvider>
          <Col span={panelsProportion.leftSide} className={'separator'} style={{height: '100%', overflow: 'auto'}}>
            <PlatformLoader/>
            <FormType />
          </Col>
          <Col span={panelsProportion.rightSide}>
            <Previewer toggleFullscreen={onFullscreen}/>
          </Col>
        </ConfigProvider>
      </Row>
    </div>
  );
}

export default App;
