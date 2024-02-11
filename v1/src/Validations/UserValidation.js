export const userAuth = (values, emr) => {
  let errors = {};
  let isValid = true;

  //email check
  if (values.hasOwnProperty("email")) {
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Email is invalid";
    } else if (typeof values.email !== "string") {
      errors.email = "Email is must be characters";
    }
  }

  //Password check
  if (values.hasOwnProperty("old_password")) {
    if (!values.old_password) {
      errors.old_password = "Current password is required";
    } else if (values.old_password.length < 7) {
      errors.old_password = "Password must be at least 6 characters";
    }
  }

  //Password check
  if (values.hasOwnProperty("password")) {
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 7) {
      errors.password = "Password must be at least 6 characters";
    }
  }

  //Password confirmation
  if (values.hasOwnProperty("password_confirmation")) {
    if (!values.password_confirmation) {
      errors.password_confirmation = "Password confirmation is required";
    } else if (values.password !== values.password_confirmation) {
      errors.password_confirmation = "password must match";
    }
  }

  //name check
  if (values.hasOwnProperty("firstname")) {
    if (!values.firstname) {
      errors.firstname = "Firstname is required";
    } else if (values.firstname.length > 26) {
      errors.firstname = "Must be 25 characters or less";
    } else if (typeof values.firstname !== "string") {
      errors.firstname = "Firstname must be characters";
    }
  }

  if (values.hasOwnProperty("lastname")) {
    if (!values.lastname) {
      errors.lastname = "Lastname is required";
    } else if (values.lastname.length > 26) {
      errors.lastname = "Must be 25 characters or less";
    }
  }

  if (emr) {
    if (values.hasOwnProperty("diagnosis")) {
      if (!values.diagnosis) {
        errors.diagnosis = "Diagnosis field is required";
      }
    }

    if (values.hasOwnProperty("treatments")) {
      if (!values.treatments) {
        errors.treatment = "Treatment field is required";
      }
    }
  }

  if (values.hasOwnProperty("phone")) {
    if (!values.phone) {
      errors.phone = "Mobile number is required";
    } else if (values.phone.length < 3) {
      errors.phone = "Must be at least 25 characters or less";
    }
  }

  if (values.hasOwnProperty("gender")) {
    if (!values.gender) {
      errors.gender = "Gender is required";
    }
  }

  if (values.hasOwnProperty("dob")) {
    if (!values.day || !values.month || !values.year) {
      errors.dob = "DOB is required";
    } else if (typeof values.dob !== "string") {
      errors.dob = "DOB must be characters";
    }
  }

  if (values.hasOwnProperty("day")) {
    if (!values.day) {
      errors.day = "day is required";
    }
  }

  if (values.hasOwnProperty("month")) {
    if (!values.month) {
      errors.month = "month is required";
    }
  }

  if (values.hasOwnProperty("year")) {
    if (!values.year) {
      errors.year = "year is required";
    }
  }

  if (
    !emr &&
    (values.hasOwnProperty("length") ||
      values.hasOwnProperty("treatments") ||
      values.hasOwnProperty("others") ||
      values.hasOwnProperty("purpose"))
  ) {
    if (!values.length) {
      errors.length = "This field is required";
    }
    if (!values.treatments) {
      errors.treatments = "Treatment field is required";
    }
    if (!values.others) {
      errors.others = "This field is required";
    }
    if (!values.purpose) {
      errors.purpose = "This field is required";
    }
  }
  return errors;
};
