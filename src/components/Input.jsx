const Input = (props) => {
  return (
    <div className="input-item">
      <input
        name={props?.name}
        ref={props?.ref}
        value={props?.value}
        type={props?.type}
        placeholder={props?.placeholder}
        onChange={props?.onChange}
        className={`${props?.className}`}
      />
      <div className="input-error">{props?.error}</div>
    </div>
  );
};
export default Input;
