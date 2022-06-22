import { useEffect, useState } from 'react'
import { Steps } from '@douyinfe/semi-ui'
import UploadData from './blocks/UploadData'
import Calculating from './blocks/Calculating'
import { CalculateMSS, Percentile } from './utils/MSScalc'
import Output from './blocks/Output'

const CALCULATE_TEXT = ['Calculate', 'Calculating', 'Calculated']

function App() {
  const [step, setStep] = useState(0)

  // ======================== step 1 finished callback ========================
  const [patientData, setPatientData] = useState<Modal.PatientData[]>([])
  const onGotData = (items: Modal.PatientData[]) => {
    setStep(1)
    setPatientData(items)
  }

  // ======================== step 2 ========================
  useEffect(() => {
    if (step === 1) {
      handleCalculate()
    }
  }, [step])
  
  const handleCalculate = () => {
    for (let i = 0; i < patientData.length; i++) {
      const element = patientData[i];
      Object.assign(element, CalculateMSS(element))
      if (element.metsZBMI) {
        element.metsZBMI = +(element.metsZBMI).toFixed(3)
        element.metsZBMIBody = +Percentile(element.metsZBMI).toFixed(3)
      }
      if (element.metsZWC) {
        element.metsZWC = +(element.metsZWC).toFixed(3)
        element.metsZWCBody = +Percentile(element.metsZWC).toFixed(3)
      }
    }
    setTimeout(() => {
      setStep(2)
    }, 1000);
  }

  // ======================== step3 callback ========================
  const replay = () => {
    setStep(0)
    setPatientData([])
  }

  return (
    <div className="w-full h-full p-10">
      <Steps type="basic" current={step}>
        <Steps.Step title="Upload Data" />
        <Steps.Step status={step === 1 ? 'process' : undefined} title={CALCULATE_TEXT[step]} />
        <Steps.Step title="Output" />
      </Steps>
      <div className="p-2 pt-10">
        {[<UploadData callback={onGotData} />, <Calculating />, <Output data={patientData} replay={replay} />][step]}
      </div>
    </div>
  )
}

export default App
