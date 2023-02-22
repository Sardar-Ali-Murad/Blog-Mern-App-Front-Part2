import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  let {user}=useSelector((state)=>state.store)

  if (user===null) {
    return <Navigate to='/register' />;
  }
  return children;
};

export default ProtectedRoute;
