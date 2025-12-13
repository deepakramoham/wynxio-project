const RadioButton = ({
  options,
  name,
  label,
  handleInputChange,
  selectedValue,
}) => {
  return (
    <>
      <div>
        <span>
          {label}
          <span style={{ color: "red" }}>*</span>
        </span>
      </div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {options?.map((opt) => (
          <div
            key={opt.value}
            style={{ display: "flex", gap: "5px", alignItems: "center" }}
          >
            <div>
              <input
                id={opt.value}
                value={opt.value}
                checked={opt.value === selectedValue}
                type="radio"
                name={name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor={opt.value}>{opt.label}</label>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RadioButton;
