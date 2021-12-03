import styled from "styled-components";

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModalFormArea = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalContent = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 40vh;
  max-height: 40vh;
  overflow-y: auto;
`;

export const ModalItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  background: #fbfbfb;
  margin-bottom: 12px;
  border-radius: 8px;
  width: 80%;
`;

export const NoContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
  span {
    font-size: 17px;
    letter-spacing: 1px;
    font-style: italic;
    color: #6a6a6a;
  }
`;

export const ProfileName = styled.img`
  border-radius: 50%;
  width: 27px;
  height: 27px;
  margin-right: 8px;
`;

export const Username = styled.span`
  font-size: 16px;
  color: #565656;
  user-select: none;
`;

export const IconProfilePic = styled.span`
  i {
    color: #ababab;
    font-size: 17px;
    margin-right: 8px;
  }
`;
