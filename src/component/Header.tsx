import { Radio, Space, Typography } from 'antd'
import React from 'react'

function Header({ view, setView, title }: { view?: string, setView?: React.Dispatch<React.SetStateAction<string>>, title: string }) {

  return (
    <Space style={{alignItems: "center", justifyContent: "space-between", padding: 16}} direction="horizontal"> 
      <Typography.Title level={3}>{title}</Typography.Title>
      {setView && 
        <Radio.Group value={view} onChange={(e) => setView(e.target.value)} size="middle">
          <Radio.Button value="card">Card View</Radio.Button>
          <Radio.Button value="list">List View</Radio.Button>
        </Radio.Group>
      }
    </Space>
  )
}

export default Header