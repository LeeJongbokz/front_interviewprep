// import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

const IconGroup = () => {
  
  const g_cid = '80280358649-hm15q6p5a80eucd3ofo9qrq52tjha4pu.apps.googleusercontent.com';
  const n_cid = 'MjpqAsnF4kQLyR6YjJ3A';
  const k_cid = '749543c2fcac96b16a784cd0579d6dc0';

  const getRedirectURI = (platform) => {
    return encodeURI(`http://localhost:3000/members/auth/${platform}/callback`);
  } 

  // testIDPW
  // naver : lst5518 / jeh1871263^

  return (
    <Stack direction="row" justifyContent="space-evenly">
      <IconButton
        component="a"
        rel="noreferrer"
        href={`https://accounts.google.com/o/oauth2/v2/auth?scope=profile%20email&response_type=code&state=&redirect_uri=${getRedirectURI("google")}&client_id=${g_cid}`}
      >
        <img src="/logo/google-logo.svg" alt="google" style={{ width: 50 }} />
      </IconButton>
      <IconButton
        component="a"
        rel="noreferrer"
        href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${n_cid}&redirect_uri=${getRedirectURI("naver")}`}
      >
        <img src="/logo/naver-logo.svg" alt="naver" style={{ width: 50 }} />
      </IconButton>
      <IconButton
        component="a"
        rel="noreferrer"
        href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${k_cid}&redirect_uri=${getRedirectURI("kakao")}`}
      >
        <img src="/logo/kakaotalk-logo.svg" alt="kakaotalk" style={{ width: 50 }} />
      </IconButton>
    </Stack>
  );
};

export default IconGroup;
