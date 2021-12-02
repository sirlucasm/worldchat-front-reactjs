import styled from "styled-components";

export const MyChatList = styled.div`
  background-color: rgb(243, 247, 249);
  height: 100%;
`;

export const TitleArea = styled.div`
  width: 100%;
  border-bottom: 1px solid #dadada;
  border-right: 1px solid #dadada;
  padding: 16px 0;
  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    color: rgba(49, 49, 49, 0.967);
    margin-left: 10px;
    user-select: none;
  }
`;

export const ChatListContent = styled.div`
  max-height: 435px;
  overflow-y: auto;
  user-select: none;
`;

export const ContentTitle = styled.div`
  margin-top: 16px;
  margin-left: 10px;
  h3 {
    color: rgba(49, 49, 49, 0.767);
    font-size: .9rem;
  }
  margin-bottom: 10px;
`;

export const Lists = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px 10px;
  cursor: pointer;

  &:hover {
    background-color: rgba(225, 232, 236, .676);
  }

  &.disabled {
    cursor: not-allowed;
    &:hover {
      background-color: transparent;
    }
  }
`;

export const PicArea = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  -webkit-user-drag: none;
`;

export const InfoArea = styled.div`
  margin-left: 12px;
  position: relative;
  top: 3px;
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: rgba(49, 49, 49, 0.867);
  }
  span {
    font-size: .8rem;
    color: rgba(49, 49, 49, 0.667);
    position: relative;
    top: -6px;
  }
`;
