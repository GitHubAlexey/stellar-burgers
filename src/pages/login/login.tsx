import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { errorSelector, loginUser } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMessage = useSelector(errorSelector);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userLoginData = {
      email,
      password
    };

    dispatch(loginUser(userLoginData)).then((res) => {
      if (res.payload) {
        setEmail('');
        setPassword('');
        navigate('/');
      }
    });
  };

  return (
    <LoginUI
      errorText={errorMessage}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
