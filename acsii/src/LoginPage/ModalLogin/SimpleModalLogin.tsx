import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SimpleModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const SimpleModalLogin = ({ isOpen, onClose }: SimpleModalLoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    general?: string;
  }>({});

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

   
  };

  const handleSignUp = () => {
    onClose();
    navigate("/sign-up");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}

      <div className="absolute inset-0 " onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-black/95 border-2 border-[#61dca3] rounded-lg p-16 w-full max-w-2xl mx-4 shadow-2xl shadow-[#61dca3]/20">
        <h2 className="text-[#61dca3] font-mono text-2xl mb-8 text-center">
          TERMINAL LOGIN
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="bg-red-500/10 border border-red-500 rounded p-3 mb-4">
              <p className="text-red-500 text-sm font-mono">{errors.general}</p>
            </div>
          )}

          <div>
            <label className="block text-[#61dca3] font-mono text-[18px] !mb-2">
              &gt; USERNAME:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username)
                  setErrors({ ...errors, username: undefined });
              }}
              disabled={isLoading}
              className={`w-full bg-transparent border rounded px-4 !mb-4 !py-2 text-[#61dca3] font-mono transition-all duration-300 ${
                errors.username
                  ? "border-red-500"
                  : "border-[#2b4539] focus:border-[#61dca3]"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              placeholder="Enter username..."
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1 font-mono">
                {errors.username}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[#61dca3] font-mono text-[18px] !mb-2">
              &gt; PASSWORD:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password)
                  setErrors({ ...errors, password: undefined });
              }}
              disabled={isLoading}
              className={`w-full bg-transparent border rounded px-4  !mb-3 !py-2 text-[#61dca3] font-mono transition-all duration-300 ${
                errors.password
                  ? "border-red-500"
                  : "border-[#2b4539] focus:border-[#61dca3]"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              placeholder="Enter password..."
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 font-mono">
                {errors.password}
              </p>
            )}
            <p className="text-[#61dca3] text-xs mt-1 font-mono !mb-5">
              Length: {password.length}
            </p>
          </div>

          <div className="space-y-4 ">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-transparent border-2 border-[#61dca3] text-[#61dca3] font-mono py-4 h-10 rounded hover:bg-[#61dca3] hover:text-black transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "[ LOGGING IN... ]" : "[ LOGIN ]"}
            </button>

            <button
              type="button"
              onClick={handleSignUp}
              disabled={isLoading}
              className={`w-full bg-transparent border-2 border-[#61b3dc] text-[#61b3dc] font-mono py-4 h-10 rounded hover:bg-[#61b3dc] hover:text-black transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              [ SIGN UP ]
            </button>
          </div>
        </form>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#61dca3] hover:text-[#61b3dc] cursor-pointer text-xl font-mono"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default SimpleModalLogin;
