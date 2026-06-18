import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import loginBg from "../assets/light-bg.png";
import loginbg2 from "../assets/dark_bg.png";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);
    try {
      if (isSignUp) {
        if (!name || !email || !password) {
          throw new Error("All fields are required");
        }
        const registeredUser = await signup(name, email, password);
        setIsSignUp(false);
        if (registeredUser && registeredUser.email) {
          setEmail(registeredUser.email);
        }
        setPassword("");
        setName("");
        setSuccessMsg("Registration successful! Please enter your password to log in.");
      } else {
        if (!email || !password) {
          throw new Error("Email and password are required");
        }
        await login(email, password);
        navigate("/dashboard");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
      <div
        className="
          w-full
          max-w-5xl
          h-[600px]
          rounded-[40px]
          overflow-hidden
          flex
          dark:bg-[#121218]/45
          bg-white
          shadow-[0_20px_80px_rgba(0,0,0,0.35)]
          border
          dark:border-white/10
          border-gray-150
          backdrop-blur-xl
        "
      >
        {/* LEFT SIDE IMAGE */}
        <div className="hidden md:block w-1/2 h-full relative">
          <img
            src={loginBg}
            alt="light-login"
            className="w-full h-full object-cover dark:hidden"
          />
          <img
            src={loginbg2}
            alt="dark-login"
            className="w-full h-full object-cover hidden dark:block"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        {/* RIGHT SIDE FORM */}
        <div
          className="
            w-full
            md:w-1/2
            h-full
            dark:bg-white/5
            bg-[#FAF9F6]
            flex
            items-center
            justify-center
            relative
            overflow-hidden
          "
        >
          {/* Glow Effect */}
          <div className="absolute top-[-100px] right-[-100px] w-[250px] h-[250px] bg-purple-400/20 blur-[120px] rounded-full" />

          <div className="relative z-10 w-full max-w-md px-8">
            <h1 className="text-3xl font-bold dark:text-white text-gray-800 mb-3">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>

            <p className="text-sm dark:text-gray-200 text-gray-600 mb-4">
              {isSignUp
                ? "Start managing your expenses with ExpenseAI."
                : "Continue managing your expenses with ExpenseAI."}
            </p>

            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-xs px-4 py-2 rounded-xl mb-4 text-center">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-500 text-xs px-4 py-2 rounded-xl mb-4 text-center">
                {successMsg}
              </div>
            )}

            {/* Google Button */}
            <div className="flex justify-center mb-4">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  if (credentialResponse.credential) {
                    try {
                      setErrorMsg("");
                      setLoading(true);
                      await loginWithGoogle(credentialResponse.credential);
                      navigate("/dashboard");
                    } catch (err: any) {
                      setErrorMsg(err.message || "Google Login failed");
                    } finally {
                      setLoading(false);
                    }
                  }
                }}
                onError={() => {
                  setErrorMsg("Google Sign-In failed. Please try again.");
                }}
                shape="pill"
              />
            </div>

            <div className="flex items-center gap-4 my-4">
              <div className="flex-1 h-[1px] dark:bg-white/20 bg-gray-200" />
              <span className="dark:text-gray-300 text-gray-500 text-xs">OR</span>
              <div className="flex-1 h-[1px] dark:bg-white/20 bg-gray-200" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="
                    w-full
                    dark:bg-white/5
                    bg-white
                    border
                    dark:border-white/20
                    border-gray-200
                    rounded-2xl
                    px-5
                    py-2
                    dark:text-white
                    text-gray-800
                    placeholder:text-gray-400
                    outline-none
                    focus:border-purple-400
                    transition-all
                  "
                />
              )}

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="
                  w-full
                  dark:bg-white/5
                  bg-white
                  border
                  dark:border-white/20
                  border-gray-200
                  rounded-2xl
                  px-5
                  py-2
                  dark:text-white
                  text-gray-800
                  placeholder:text-gray-400
                  outline-none
                  focus:border-purple-400
                  transition-all
                "
              />

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="
                  w-full
                  dark:bg-white/5
                  bg-white
                  border
                  dark:border-white/20
                  border-gray-200
                  rounded-2xl
                  px-5
                  py-2
                  dark:text-white
                  text-gray-800
                  placeholder:text-gray-400
                  outline-none
                  focus:border-purple-400
                  transition-all
                "
              />

              {!isSignUp && (
                <div className="flex items-center justify-between text-xs dark:text-gray-200 text-gray-600">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-cyan-400" />
                    Remember me
                  </label>
                  <button
                    type="button"
                    className="dark:hover:text-cyan-300 hover:text-purple-600 transition-all"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  py-3
                  rounded-2xl
                  font-semibold
                  text-white
                  bg-gradient-to-r
                  from-[#7C3AED]
                  via-[#8B5CF6]
                  to-[#06B6D4]
                  hover:scale-[1.02]
                  disabled:opacity-50
                  disabled:scale-100
                  transition-all
                  duration-300
                  shadow-[0_10px_30px_rgba(124,58,237,0.35)]
                "
              >
                {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Login"}
              </button>
            </form>

            <p className="text-center dark:text-gray-300 text-gray-600 mt-6 text-sm">
              {isSignUp ? "Already have an account?" : "Don’t have an account?"}
              <span
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className="
                  ml-2
                  dark:text-cyan-300
                  text-purple-600
                  cursor-pointer
                  dark:hover:text-cyan-200
                  hover:text-purple-500
                "
              >
                {isSignUp ? "Log In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;