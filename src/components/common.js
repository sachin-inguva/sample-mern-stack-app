import { Card } from "react-bootstrap";
import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 15px;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: ${({ direction = "row" }) => direction};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
`;

export const StyledCard = styled(Card)`
  cursor: pointer;
  transition: all 0.5s ease;
  :hover {
    box-shadow: -1px 2px 20px 0px #0000006b;
  }
`;
