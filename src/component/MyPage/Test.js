import React, { useState } from 'react';
import Button from '@mui/material/Button';

const Test = ({ memberInfo }) => {
    console.log(memberInfo);

    const [inputs, setInputs] = useState({
        name: memberInfo.name,
        nickName: memberInfo.nickName,
        email: memberInfo.email,
    });

    const { name } = inputs; // 비구조화 할당을 통해 값 추출

    const onChange = (e) => {
        const { value, name, nickName, email } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
            ...inputs, // 기존의 input 객체를 복사한 뒤
            [name]: value, // name 키를 가진 값을 value 로 설정
            [nickName]: value,
            [email]: value
        });
        console.log(value)
    };

    const onReset = () => {
        setInputs({
            name: memberInfo.name,
            nickName: memberInfo.nickName,
            email: memberInfo.email,
        })
        console.log(memberInfo.name)
    };

    return (
        <div>
            <span>테스트중입니다.</span>
            <div>
                <input name="name" placeholder="이름" onChange={onChange} value={name} />
                <button onClick={onReset}>초기화</button>
            </div>
            <div>
                {/* <input name="email" placeholder="닉네임" onChange={onChange} value={email} /> */}
                <button onClick={onReset}>초기화</button>
            </div>
            <Button type="submit" variant="contained" label={'margin="normal"'}>
                저장
            </Button>
        </div>
    )
}

export default Test;