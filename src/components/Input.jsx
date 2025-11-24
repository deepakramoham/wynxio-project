const Input = (props) => {
  return (
    <>
      <input
        name={props?.name}
        ref={props?.ref}
        value={props?.value}
        type={props?.type}
        placeholder={props?.placeholder}
        onChange={props?.onChange}
        className={`${props?.className}`}
      />
      <div>{props?.error}</div>
    </>
  );
};
export default Input;
