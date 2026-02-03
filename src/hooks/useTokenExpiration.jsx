import { useDispatch } from "react-redux";
import { logOut } from "../features/user/userSlice";
import { useJwt } from "react-jwt";
import { useEffect } from "react";

const useTokenExpiration = (accessToken) => {
  let timerId;
  const dispatch = useDispatch();


  const { decodedToken, isExpired } = useJwt(accessToken);

  const onExpire = () => {
    dispatch(logOut());
    localStorage.removeItem("user");
  };

  useEffect(() => {
    if (!accessToken || !decodedToken) {
      return;
    }
    if (decodedToken?.exp && decodedToken?.iat && !isExpired) {
      const timeOut = decodedToken?.exp - decodedToken?.iat;
      timerId = setTimeout(onExpire, timeOut * 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [accessToken, decodedToken]);
};

export default useTokenExpiration;
