// import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

const IconGroup = () => {
  const state = 'TEST';

  const n_cid = 'MjpqAsnF4kQLyR6YjJ3A';
  const n_redirectURI = encodeURI('http://interviewprep.kro.kr/members/auth/naver/callback');

  const g_cid = '80280358649-hm15q6p5a80eucd3ofo9qrq52tjha4pu.apps.googleusercontent.com';
  const g_state = "";
  const g_redirectURI = encodeURI('http://interviewprep.kro.kr/members/auth/google/callback');

  const k_cid = '749543c2fcac96b16a784cd0579d6dc0';
  const k_redirectURI = encodeURI('http://interviewprep.kro.kr/members/auth/kakao/callback');
  //   https://accounts.google.com/o/oauth2/v2/auth?
  //  scope=&
  //  response_type=code&
  //  state=security_token%3D138r5719ru3e1%26url%3Dhttps%3A%2F%2Foauth2.example.com%2Ftoken&
  //  redirect_uri=com.example.app%3A/oauth2redirect&
  //  client_id=client_id

  // https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}

  return (
    <Stack direction="row" justifyContent="space-evenly">
      <IconButton
        component="a"
        target="_blank"
        rel="noreferrer"
        href={`https://accounts.google.com/o/oauth2/v2/auth?scope=&response_type=&state=${g_state}&redirect_url=${g_redirectURI}&client_id=${g_cid}`}
      >
        <img src="/logo/google-logo.svg" alt="google" style={{ width: 50 }} />
      </IconButton>
      <IconButton
        component="a"
        target="_blank"
        rel="noreferrer"
        href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${n_cid}&redirect_uri=${n_redirectURI}&state=${state}`}
      >
        <img src="/logo/naver-logo.svg" alt="naver" style={{ width: 50 }} />
      </IconButton>
      <IconButton
        component="a"
        target="_blank"
        rel="noreferrer"
        href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${k_cid}&redirect_uri=${k_redirectURI}`}
      >
        <img src="/logo/kakaotalk-logo.svg" alt="kakaotalk" style={{ width: 50 }} />
      </IconButton>
    </Stack>
  );
};

export default IconGroup;
