export function login_validation(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
}

export function signup_validation(values) {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.jobTitle) {
    errors.jobTitle = "Job Title is required";
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = "Phone Number is required";
  } else if (!/^\d{10}$/i.test(values.phoneNumber)) {
    errors.phoneNumber = "Invalid phone number format";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be greater then 8";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}

export function edit_validation(values) {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.jobTitle) {
    errors.jobTitle = "Job Title is required";
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = "Phone Number is required";
  } else if (!/^\d{10}$/i.test(values.phoneNumber)) {
    errors.phoneNumber = "Invalid phone number format";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (
    (values.password.length !== 0 && values.password.length < 8) ||
    values.password.length > 20
  ) {
    errors.password = "Must be greater then 8";
  }

  return errors;
}
