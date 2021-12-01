import { useEffect, useState } from 'react';
import {
  MyToast
} from './ToastStyled';

export default function Toast({
  error,
  message
}) {
  const [className, setClassName] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (error || message) {
      setShow(true);
      setClassName('toast-notify');
      setTimeout(() => {
        setClassName('toast-notify-exit');
        setTimeout(() => {
          setClassName('');
          setShow(false);
        }, 1000)
      }, 4000);
    }
  }, [error, message]);

  return (
    <>
      {
        (error || message) && show ?
          <MyToast borderColor={error ? '#ab0707' : '#07ab22'} className={className} id="toast">
            { error || message }
          </MyToast>
          :
          <></>
      }
    </>
  );
}
