import styled from "styled-components";

export const MyToast = styled.div`
  position: absolute;
  top: 20px;
  right: 100px;
  width: 300px;
  box-shadow: 0px 5px 15px -1px rgba(0,0,0,0.3);
  border-radius: 4px;
  padding: 7px 12px;
  font-size: 15px;
  background: #fff;
  border-left: 12px solid ${props => props.borderColor};

  &.toast-notify {
    animation: toastNotify .5s ease-in 0s 1 normal forwards;
  }

  &.toast-notify-exit {
    animation: toastNotifyExit .5s ease-in 0s 1 normal forwards;
  }

  @keyframes toastNotify {
    0% {
      opacity: 0;
      transform: translateX(50px);
    }

    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes toastNotifyExit {
    0% {
      opacity: 1;
      transform: translateX(0);
    }

    100% {
      opacity: 0;
      transform: translateX(50px);
    }
  }
`;
