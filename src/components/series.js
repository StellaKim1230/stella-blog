import * as React from "react"
import styled from "styled-components"
import { navigate } from "gatsby"

const Contanier = styled.div`
  display: flex;
  gap: 8px;
`

const CategoryButton = styled.button`
  cursor: pointer;
  border-radius: 8px;
`

const Series = () => {
  return (
    <Contanier>
      <CategoryButton onClick={() => navigate(`/?series=http`)}>
        HTTP
      </CategoryButton>
      <CategoryButton onClick={() => navigate(`/?series=etc`)}>
        ETC
      </CategoryButton>
      <CategoryButton onClick={() => navigate(`/?series=http`)}>
        회고록
      </CategoryButton>
    </Contanier>
  )
}

export default Series
