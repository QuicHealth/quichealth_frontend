import React from "react";
import { connect } from "react-redux";
import { InputNameContainer, InputLabel, Text } from "../RegisterBody";
import { InputContainer, SettingInput, SettingsForm } from "./Setting";
import useForm from "../../utils/useForm";
import { updatePassword } from "../../redux/actions/AuthActions";
import { SaveChanges, SectionFive } from "../HealthProfile";
import { userAuth } from "../../Validations/UserValidation";

function UpdateLogin({ updatePassword }) {
  const {
    handleChange,
    values,
    errors,
    disabledSubmit,
    setDisabledSubmit,
    setIsSubmit,
    setErrors,
    setValues,
  } = useForm("updateProfile");

  const updateProfile = (e) => {
    e.preventDefault();

    const formError = userAuth(values);
    setErrors(formError);
    setDisabledSubmit(true);
    setIsSubmit(true);

    const noErrors = Object.keys(formError).length === 0;
    if (noErrors) {
      updatePassword(values);
    }
    setValues({});
  };
  return (
    <SettingsForm className="update">
      <div>
        <InputLabel htmlFor="">Change Password</InputLabel>
        <InputNameContainer className="update">
          <InputContainer>
            <SettingInput
              name="old_password"
              border={errors.old_password && "2px solid red !important"}
              value={values.old_password}
              onChange={handleChange}
              type="password"
              placeholder="Current Password"
            />
            {errors.old_password && (
              <Text color="red">{errors.old_password}</Text>
            )}
          </InputContainer>
          <InputContainer></InputContainer>
        </InputNameContainer>
        <br />
        <InputNameContainer className="update">
          <InputContainer>
            <SettingInput
              name="password"
              border={errors.password && "2px solid red !important"}
              value={values.password}
              onChange={handleChange}
              type="password"
              placeholder="New Password"
            />
            {errors.password && <Text color="red">{errors.password}</Text>}
          </InputContainer>
          <InputContainer></InputContainer>
        </InputNameContainer>
        <br />
        <InputNameContainer className="update">
          <InputContainer>
            <SettingInput
              name="password_confirmation"
              border={
                errors.password_confirmation && "2px solid red !important"
              }
              value={values.password_confirmation}
              onChange={handleChange}
              type="password"
              placeholder="Confirm new password"
            />
            {errors.password_confirmation && (
              <Text color="red">{errors.password_confirmation}</Text>
            )}
          </InputContainer>

          <InputContainer></InputContainer>
        </InputNameContainer>
        <br />
        <SectionFive className="update">
          <div>
            {" "}
            <SaveChanges
              disabled={disabledSubmit}
              onClick={updateProfile}
              className="update"
            >
              Save changes
            </SaveChanges>
          </div>
          <div></div>
        </SectionFive>
      </div>
    </SettingsForm>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    updatePassword: (value) => dispatch(updatePassword(value)),
  };
};

export default UpdateLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateLogin);
