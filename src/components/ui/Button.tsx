

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ children, variant = "primary", ...props }) => {
  return (
    <button
      {...props}
      className={`mt-4 px-4 py-3 rounded-lg font-medium transition ${
        variant === "primary" ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-200 text-black hover:bg-gray-300 "
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
