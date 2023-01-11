import { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useHttpRequest from '../../hook/use-http';
import PaperUI from '../UI/PaperUI';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setpasswordConfirm] = useState('');
  const [name, setName] = useState('');

  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { sendPostRequest } = useHttpRequest();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return alert('비밀번호화 비밀번호 확인이 같지 않습니다. 다시 확인해주세요!');
    }
    await sendPostRequest({
      endpoint: '/members/signup',
      bodyData: {
        name: name,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      },
    });
  }

  function HandleChange(e) {
    //  console.log(onSubmit(e));
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'passwordConfirm':
        setpasswordConfirm(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      default:
    }
  }
  return (
    <PaperUI title="Sign Up">
      <form onSubmit={onSubmitHandler} noValidate>
        <TextField
          id="name"
          label="name"
          name="name"
          type="text"
          margin="normal"
          required
          fullWidth
          value={name}
          onChange={HandleChange}
        />
        <TextField
          id="email"
          label="email"
          type="email"
          margin="normal"
          name="email"
          required
          fullWidth
          value={email}
          onChange={e => HandleChange(e)}
        />
        <TextField
          id="password"
          label="password"
          type="password"
          margin="normal"
          name="password"
          required
          fullWidth
          inputRef={passwordRef}
          // value={password}
          // onChange={e => HandleChange(e)}
        />
        <TextField
          id="passwordConfirm"
          label="passwordConfirm"
          type="password"
          margin="normal"
          name="passwordConfirm"
          required
          fullWidth
          inputRef={passwordConfirmRef}
          // value={passwordConfirm}
          // onChange={e => HandleChange(e)}
        />
        <Button type="submit" variant="contained" label={'margin="normal"'}>
          회원가입
        </Button>
      </form>
    </PaperUI>
  );
};

export default SignUp;