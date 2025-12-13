const Checkbox = ({
  options,
  label,
  handleInputChange,
  name,
  selectedValues,
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
                name={name}
                type="checkbox"
                value={opt.value}
                onChange={handleInputChange}
                checked={selectedValues?.includes(opt.value)}
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

export default Checkbox;
