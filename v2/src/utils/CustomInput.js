import styled from "styled-components";
import { useField } from "formik";

export const InputLabel = styled.label`
  color: var(--grey);
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.7em 1em;
  border-radius: 8px;
  border: ${(props) => props.border || "1px solid #d5d5d5"};
  width: 100%;
  margin-top: 0.5em;
  font-size: 16px;

  &.disabled-input {
    opacity: 0.5;
    pointer-events: none;
  }

  &::placeholder {
    color: #d5d5d5;
    font-size: 14px;
  }

  @media only Screen and (max-width: 700px) {
    font-size: 12px;
    padding: 1em;

    &.notmobile {
      display: none;
    }
    &::placeholder {
      font-size: 12px;
    }
  }
`;

export const Text = styled.p`
  color: ${(props) => props.color || "#4d4d4d"};
  text-align: left;
  position: relative;
  //left: 0.5em;
  top: 0.5em;
  font-size: 0.9em;

  &.name {
    left: 0.5em;
  }
  &.gender {
    top: -0.1em;
    left: 0.5em;
  }
  @media (max-width: ${500}px) {
    font-size: 9px;
  }
`;

const TextArea = styled.textarea`
  height: 8em;
  width: 100%;
  margin-top: 0.5em;
  border-radius: 8px;
  border: ${(props) => props.border || "1px solid #d5d5d5"};
  font-size: 13px;
  overflow: auto;
  outline: none;
  resize: none;
  padding: 1em;
  &.healthProfile {
    display: none;
  }

  @media only Screen and (max-width: 768px) {
    display: block;
  }
`;

export const CustomTextArea = ({ label, className, placeholder, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      {label && <InputLabel htmlFor="">{label}</InputLabel>}
      <div>
        <TextArea
          {...field}
          {...props}
          className={className}
          placeholder={placeholder}
          border={meta.touched && meta.error && "1px solid red"}
        />
        {meta.touched && meta.error && <Text color="red">{meta.error}</Text>}
      </div>
    </>
  );
};

const GenericCustomInput = ({
  label,
  Component,
  componentImg,
  field,
  meta,
  setShowPassword,
  showPassword,
  ...props
}) => {
  //const [field, meta] = useField(props);
  return (
    <>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <div style={{ position: "relative" }}>
        <Input
          {...field}
          border={meta.touched && meta.error && "1px solid red"}
          {...props}
          className={props.props.disabled && "disabled-input"}
          disabled={props.props.disabled}
        />
        {Component && (
          <Component
            src={componentImg}
            alt="eye"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>
      {meta.touched && meta.error && <Text color="red">{meta.error}</Text>}
    </>
  );
};

const SpecificCustomInput = ({ className, field, meta, ...props }) => {
  return (
    <>
      <div style={{ position: "relative" }}>
        <Input
          {...field}
          border={meta.touched && meta.error && "1px solid red"}
          className={className}
          {...props}
          disabled={props.disabled}
        />
        {meta.touched && meta.error && <Text color="red">{meta.error}</Text>}
      </div>
    </>
  );
};

const CustomInput = ({
  specific,
  label,
  Component,
  componentImg,
  className,
  placeholder,
  type,
  setShowPassword,
  showPassword,
  ...props
}) => {
  const [field, meta] = useField(props);
  return specific ? (
    <SpecificCustomInput
      field={field}
      props={props}
      meta={meta}
      className={className}
      placeholder={placeholder}
      type={type}
    />
  ) : (
    <GenericCustomInput
      label={label}
      Component={Component}
      componentImg={componentImg}
      field={field}
      meta={meta}
      placeholder={placeholder}
      type={type}
      props={props}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
    />
  );
  // <>
  //   <InputLabel htmlFor={label}>{label}</InputLabel>
  //   <div style={{ position: "relative" }}>
  //     <Input
  //       {...field}
  //       border={meta.touched && meta.error && "1px solid red"}
  //       {...props}
  //     />
  //     {Component && <Component src={componentImg} alt="eye" />}
  //   </div>
  //   {meta.touched && meta.error && <Text color="red">{meta.error}</Text>}
  // </>
};

export default CustomInput;
