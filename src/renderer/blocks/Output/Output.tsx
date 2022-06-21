import { Button } from '@douyinfe/semi-ui'
import React, { useEffect, useRef } from 'react'
import { utils, WorkBook, write } from 'xlsx'

interface Props {
  data: Modal.PatientData[]
}

const Output: React.FC<Props> = (props) => {
  const workbook = useRef<WorkBook>(utils.book_new())

  useEffect(() => {
    if (!workbook.current.Sheets['Sheet1']) {
      workbook.current.SheetNames.push('Sheet1')
      console.log(Object.keys(props.data[0]), ...props.data.map(Object.values));
      const source = utils.aoa_to_sheet([Object.keys(props.data[0]), ...props.data.map(Object.values)])
      workbook.current.Sheets['Sheet1'] = source
    }
  }, [])

  const handleDownload = () => {
    if (props.data.length) {
      const output = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + write(workbook.current, { bookType: 'xlsx', type: 'base64' })
      const a = document.createElement("a"); 
      a.href = output 
      a.download = "Result.xlsx"; 
      a.click(); 
    }
  }

  return (
    <Button onClick={handleDownload}>
      Download
    </Button>
  )
}

export default Output;