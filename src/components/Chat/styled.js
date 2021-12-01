import styled from "styled-components";

export const ChatContainer = styled.div`
  display: grid;
  grid-template-columns: 100fr;
  grid-template-rows: 5fr 90fr 10fr;
  height: 100vh;
`;

export const ChatHeader = styled.div`
  background-color: rgb(243, 247, 249);
  width: 100%;
  border-bottom: 1px solid #dadada;
  padding: 10px 16px;

  display: flex;
  justify-content: space-between;
  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    color: rgba(49, 49, 49, 0.967);
    margin-left: 10px;
    margin-top: 4px;
    user-select: none;
  }
`;

export const ChatContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 8px 20px;
  overflow-y: auto;
  .me {
    background-color: rgb(24, 102, 167);
    align-self: flex-end;
    span {
      color: #f9f9f9;
    }
  }
`;

export const ChatMessage = styled.div`
  margin: 2px 0;
  min-width: 10vw;
  width: fit-content;
  max-width: 25vw;
  background-color: #dadada;
  border-radius: 5px;
  padding: 4px 12px;
  align-self: flex-start;
  span {
    font-size: .97rem;
  }
  position: relative;
  cursor: default;
`;

export const UsernameOnMessage = styled.div`
  position: absolute;
  top: -18px;
  left: 7px;
  font-size: 13px;
`;

export const BorderInput = styled.div`
  border-top: 1px solid #dadada;
`;




export const EmptyChat = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;

  justify-content: center;
  align-items: center;
`;

export const EmptyChatTextArea = styled.div`
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: rgba(49, 49, 49, 0.967);
  }
`;
