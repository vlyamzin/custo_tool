import React, {useState} from 'react';
import {BrowserRouter as Router, Link, Route, Switch, useParams, useHistory} from 'react-router-dom';
import './App.css';
import Home from './routes/home/components/Home';
import Previewer from './routes/previewer/components/Previewer';

function App() {
  const [updateStatus, updateHandler] = useState(false);

  function updatePreview(): void {
    updateHandler(!updateStatus);
  }

  return (
    <div className='App'>
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
      <div className='delimiter' />
      <Previewer updateIframe={updateStatus}/>
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
