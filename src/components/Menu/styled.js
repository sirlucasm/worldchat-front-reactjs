import styled from "styled-components";

export const MyMenu = styled.div`
  height: 100%;
  background-color: #252525;
  position: relative;
`;

export const LogoArea = styled.div`
  background-color: rgb(24, 102, 167);
  padding: 8px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    cursor: pointer;
    width: 40px;
    height: 40px;
    -webkit-user-drag: none;
  }
`;

export const MenuItems = styled.div`
  width: 100%;
`;

export const Item = styled.div`
  cursor: pointer;
  transition: .1s;
  width: 100%;
  text-align: center;
  padding: 15px 0;
  &:hover {
    background-color: #353535;
    i {
      color: rgb(24, 102, 167);
    }
  }
  i {
    color: #fff;
    font-size: 19px;
  }
`;

export const DownsideItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 20px;
  width: 100%;
  &.profile {
    background-color: #f9f9f9;
    cursor: pointer;
    border-radius: 50%;
    margin-top: 10px;
    &.img {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      -webkit-user-drag: none;
    }
  }
`;

export const UpsideItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
