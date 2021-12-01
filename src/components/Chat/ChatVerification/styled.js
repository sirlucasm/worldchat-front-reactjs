import styled from "styled-components";

export const ChatError = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    font-size: 1.09rem;
    font-weight: 600;
    color: rgba(49, 49, 49, 0.967);
  }
  &.btn-area {
    margin-top: 6px;
  }
`;

export const ChatQuestion = styled.div`
  margin-top: 10px;
  span {
    font-size: .96rem;
  }
`;
