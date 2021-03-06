import ReactDOM from 'react-dom'
import ScatterLine from '../src/ScatterLine'
import demoData from './demoData.json'
import './demo.scss'

ReactDOM.render(
  <ScatterLine 
    data={demoData}
    width={300}
    height={200}
  />,
  document.getElementById('demo-chart')
)
