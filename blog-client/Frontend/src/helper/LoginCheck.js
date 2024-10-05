import { useSelector } from 'react-redux';

const LoginCheck = () => {
  const user = useSelector(state => state?.user?.user);
    return !!user; 
};

export default LoginCheck;
