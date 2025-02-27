interface TextareaProps {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  }
  
  const Textarea: React.FC<TextareaProps> = ({ placeholder, value, onChange }) => {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        rows={4}
      />
    );
  };
  
  export default Textarea;