import { useContext } from 'react';
import ReactDom from 'react-dom';
import LoginForModal from '../Login/LoginForModal';

import AuthContext from '../../store/auth-context';

const Modal = () => {
  
  const authCtx = useContext(AuthContext);

  return (
    <>
      {ReactDom.createPortal(
        <LoginForModal
          redirectUrl="./"
          isOpen={authCtx.loginModalOpened}
          callback={authCtx.toggleLoginModal}
        />,
        document.getElementById('modal')
      )}
    </>
  );
};

export default Modal;
