import './App.css';
import { JsonInterpreter } from './SampleComponent';

// export const sampleInput = {
//   date: '2021-10-27T07:49:14.896Z',
//   hasError: false,
//   fields: [
//     {
//       id: '4c212130',
//       prop: 'iban',
//       value: 'DE81200505501265402568',
//       hasError: false,
//     },
//   ],
// };

function App() {
  return (
    <>
      <div>
        <JsonInterpreter />
      </div>
    </>
  );
}

export default App;
