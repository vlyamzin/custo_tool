import React, {useState} from 'react';
import {BrowserRouter as Router, Link, Route, Switch, useParams, useHistory} from 'react-router-dom';
import './App.css';
import Home from './routes/home/components/Home';
import Previewer from './shared/components/previewer/Previewer';
import {Col, Divider, Row} from 'antd';

function App() {
  const [updateStatus, updateHandler] = useState(false);

  function updatePreview(status: boolean): void {
    updateHandler(status);
  }

  return (
    <div className='App'>
      <Row gutter={[24, 24]}>
        <Col span={12} className={'separator'}>
          <Router>
            <main>
              {/*<Link to='/'>Home</Link>*/}
              <Button/>
              <Link to='/platform/1'>Platform 1</Link>
              <Switch>
                <Route exact={true} path='/'>
                  <Home onLoadFinished={updatePreview}/>
                </Route>
                <Route path='/platform/:id' children={<MyForm />} />
              </Switch>
            </main>
          </Router>
        </Col>
        <Col span={12}>
          <Previewer isPlatformLoaded={updateStatus}/>
        </Col>
      </Row>
    </div>
  );
}

interface MyRouteParams {
  id: string;
}

function MyForm () {
  const { id } = useParams<MyRouteParams>();
  return (
    <div>This is my {id}</div>
  )
}

function Button() {
  const history = useHistory();
  const navigate = () => {
    history.push('/');
  }

  return (
    <button onClick={navigate}>Home</button>
  )
}

export default App;
