import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CreateSessionId } from "@/state/AuthenticationSlice";
import type { AppDispatch } from "@/state/Store";

export default function AuthCallback() {
  const [params] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const requestToken = params.get("request_token");
    console.log("AuthCallback - request_token:", requestToken);

    if (requestToken) {
      dispatch(CreateSessionId({ request_token: requestToken }));
      navigate("/", { replace: true });
    }
  }, [dispatch, navigate, params]);

  return <div className="text-white">Logging you in…</div>;
}
