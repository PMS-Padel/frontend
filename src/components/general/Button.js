/** @format */

import React from 'react';
import styled from 'styled-components';

const SimpleButton = styled.button`
  padding: 10px 20px;
  background-color: #052f53;
  color: #fff;
  font-size: 20px;
`;

function Button({ children, onClick }) {
  return (
    <SimpleButton type='button' onClick={onClick}>
      {children}
    </SimpleButton>
  );
}

export default Button;
