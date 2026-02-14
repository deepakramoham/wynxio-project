import { useDispatch } from "react-redux";
import { logOut } from "../features/user/userSlice";
import { useJwt } from "react-jwt";
import { useRef, useEffect } from "react";

const useTokenExpiration = (accessToken) => {
  const timerId = useRef(null);
  const dispatch = useDispatch();

  const { decodedToken, isExpired } = useJwt(accessToken);

  useEffect(() => {
    if (!accessToken || !decodedToken) {
      return;
    }

    const onExpire = () => {
      dispatch(logOut());
      localStorage.removeItem("user");
    };

    if (decodedToken?.exp && decodedToken?.iat && !isExpired) {
      const timeOut = decodedToken?.exp - decodedToken?.iat;
      timerId.current = setTimeout(onExpire, timeOut * 1000);
    }

    return () => {
      clearTimeout(timerId.current);
    };
  }, [accessToken, decodedToken, isExpired, dispatch]);
};

export default useTokenExpiration;
