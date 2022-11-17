import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  padding: 20px 0;
  flex-direction: ${({ direction }) => direction || "row"};
  align-items: ${({ align }) => align || "center"};
  justify-content: ${({ justify }) => justify || "center"};
`;

function Flex(props) {
  return <FlexContainer {...props}>{props.children}</FlexContainer>;
}

export default Flex;
