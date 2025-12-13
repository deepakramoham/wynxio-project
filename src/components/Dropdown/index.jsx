const Dropdown = ({
  options,
  label,
  name,
  handleInputChange,
  selectedValue,
}) => {
  return (
    <div>
      <div>
        <label htmlFor={name}>{label}</label>
      </div>
      <select
        name={name}
        id={name}
        onChange={handleInputChange}
        value={selectedValue}
      >
        <option value="">Select Course</option>
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
