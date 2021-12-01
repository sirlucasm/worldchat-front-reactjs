import styled from 'styled-components';

export const AuthGrid = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 65fr 35fr;
  grid-template-rows: 100fr;
`;

export const AuthColumn1 = styled.div`
  background-color: rgb(24, 102, 167);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AuthColumn2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: -14rem;
`;

export const LogoArea = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;

  img {
    width: 90px;
    height: 90px;
    -webkit-user-drag: none;
  }
  .title-area {
    h3 {
      font-size: 2em;
      margin-left: 7px;
      color: #fff;
      font-family: 'Raleway', sans-serif;
      user-select: none;
    }
  }
`;

export const ContentArea = styled.div`
  margin-top: 10rem;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  align-self: flex-end;
  margin-right: 5rem;

  img {
    width: 256px;
    height: 256px;
    margin-top: 4rem;
    -webkit-user-drag: none;
  }
  .description-area{
    text-align: right;
    h3 {
      font-size: 1.4em;
      margin-left: 7px;
      color: #fff;
      width: 30vw;
      font-family: 'Raleway', sans-serif;
    }
  }
`;
