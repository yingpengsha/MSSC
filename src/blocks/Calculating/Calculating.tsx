import { Spin } from '@douyinfe/semi-ui';
import React from 'react'

interface Props {

}

const Calculating: React.FC<Props> = (props) => {
  return (
    <div className="h-300px w-full flex items-center justify-center">
      <Spin size="large"></Spin>
      <span className="ml-10px">Calculating……</span>
    </div>
  )
}

export default Calculating;