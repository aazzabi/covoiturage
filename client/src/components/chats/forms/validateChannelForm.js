export default function validate(values) {
  let errors = {};

  if (!values.title) errors.title = "* title is required";
  else if (!/\S{2,50}/.test(values.title))
    errors.title = "* title must have 2-50 characters. (No Spaces)";
  console.log(errors);
  return errors;
}
