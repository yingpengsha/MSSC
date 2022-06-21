import React, { useState } from 'react'
import { Spin, Upload } from '@douyinfe/semi-ui';
import { OnChangeProps } from '@douyinfe/semi-ui/lib/es/upload';
import { read } from 'xlsx'
import { isString, isNumber } from 'lodash-es'
import { BMIAdult, BMIZscore } from '../../utils/BMI';
import { Percentile } from '../../utils/MSScalc';

interface Props {
  callback: (items: Modal.PatientData[]) => void
}

const TABLE_HEADER: (keyof Modal.PatientData)[] = ['id', 'age', 'sex', 'race', '_height', '_weight', 'waist', 'sbp', 'hdl', 'triglyceride', 'glucose']

const UploadData: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false)

  const onUpload = async (object: OnChangeProps) => {
    setLoading(true)
    const { currentFile } = object
    const { Sheets, SheetNames } = await read(await currentFile.fileInstance?.arrayBuffer())
    const firstSheetData = Sheets[SheetNames[0]]
    const result: Modal.PatientData[] = []

    for (const [key, element] of Object.entries(firstSheetData)) {
      if (key.startsWith('!') || (+key.slice(1) !== +key.slice(1)) || element.t === 's' || key[0] > 'K') continue
      const columnIndex = key[0].charCodeAt(0) - 65
      const rowIndex: number = +key.slice(1) - 2
      if (!result[rowIndex]) {
        result[rowIndex] = Object.create(null)
      }
      result[rowIndex][TABLE_HEADER[columnIndex]] = +element.v
    }
    for (let i = 0; i < result.length; i++) {
      const element = result[i];
      element['bmi'] = +BMIAdult(element['_weight'], element['_height']).toFixed(3)
      element['bmiZScore'] = +BMIZscore(element['_weight'], element['_height'], element['sex'], element['age']).toFixed(3)
      element['bmiZBody'] = +Percentile(element.bmi).toFixed(2)
    }

    props.callback(result)
    setLoading(false)
  }

  return (
    <Spin spinning={loading} tip="正在读取文件信息……">
      <Upload
        action={''}
        draggable={true}
        dragMainText={'点击上传文件或拖拽文件到这里'}
        dragSubText="仅支持 .xlsx, .xls 文件"
        accept=".xlsx,.xls"
        limit={1}
        uploadTrigger="custom"
        onChange={onUpload}
      >

      </Upload>
    </Spin>
  )
}

export default UploadData;