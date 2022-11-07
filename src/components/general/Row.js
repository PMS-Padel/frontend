import React from 'react'
import styled from 'styled-components'

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

function Row({style, children}) {
  return (
    <FlexRow style={style}>
      {children}
    </FlexRow>
  )
}

export default Row