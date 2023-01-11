// TODO : 보일러플레이트 코드를 여기에 넣음.

const LoginForm = () => {
  return (
    <>
      <form onSubmit={onSubmitHandler} ref={formRef} noValidate>
        <TextField
          id="email"
          label="email"
          type="email"
          margin="normal"
          inputRef={emailRef}
          autoComplete="on"
          required
          fullWidth
        />
        <TextField
          id="password"
          label="passwords"
          type="password"
          margin="normal"
          inputRef={passwordRef}
          autoComplete="off"
          required
          fullWidth
        />
        <ButtonGroup fullWidth sx={{ marginTop: 2 }}>
          <Button type="submit" variant="contained">
            로그인
          </Button>
          <Button variant="outlined" component={Link} to="/signup">
            회원가입
          </Button>
        </ButtonGroup>
      </form>
      <DividingLine />
      <IconGroup />
    </>
  );
};

export default LoginForm;
