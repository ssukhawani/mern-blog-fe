const InputWithError = ({
  label,
  placeholder,
  type = "text",
  register,
  name,
  requiredMessage,
  pattern,
  errors,
  hidden = false,
  multiple = false,
  autoComplete,
}) => {
  return (
    <div className="mb-5 w-full">
      {!hidden && (
        <label
          htmlFor={name}
          className={`form__${label}_label text-[14px] font-medium`}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, {
          required: requiredMessage,
          pattern: pattern && {
            value: pattern.regex,
            message: pattern.message,
          },
        })}
        className="w-full h-[56px] p-[18px] border border-[#A6B0C3] rounded-lg"
        required
        hidden={hidden}
        multiple={multiple}
        autoComplete={autoComplete}
      />
      <p className="text-red-600 ml-3 text-left w-full">
        {errors[name]?.message}
      </p>
    </div>
  );
};

export default InputWithError;
