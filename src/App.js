/** @format */

import Button from './components/general/Button';
import Row from './components/general/Row';

function App() {
  return (
    <div>
      <Button onClick={() => console.log('click')}>Texto</Button>
      <Row>
        <div>Teste 1</div>
        <div>Teste 2</div>
        <div>Teste 3</div>
      </Row>
      <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
        Learn React
      </a>
    </div>
  );
}

export default App;
