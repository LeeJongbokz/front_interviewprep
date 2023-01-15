import { useEffect, useContext } from 'react';
import queryString from 'query-string';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { BACKEND_BASE_URL } from '../global_variables';
import AuthContext from '../store/auth-context';


const AuthCallback = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { code } = queryString.parse(search);

  const authCtx = useContext(AuthContext);

  const { platform } = useParams();

  useEffect(() => {
    const fetchAuthAPI = async() => {
      const res = await fetch(`${BACKEND_BASE_URL}/members/auth/${platform}/callback?code=${code}`);
      const oAuthData = await res.json();
      authCtx.oAuthLogin(oAuthData).then((data) => { 
        if(data.success !== true){
          alert('인증정보가 올바르지 않습니다.');
          return;
        } else {
          navigate('/');
        }
        return;
        
      });
    }
    fetchAuthAPI();
  }, [code]);

  return <>{platform},{code}</>;
};

export default AuthCallback;
