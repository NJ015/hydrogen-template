import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    // <div className="txtin">
    //   <label htmlFor={props.id || props.name}>{label}</label>
    //   <input className="text-input" {...field} {...props} />
    //   {meta.touched && meta.error ? (
    //     <div className="error">{meta.error}</div>
    //   ) : null}
    // </div>
    <Box mb={2}>
      <TextField
        fullWidth
        label={label}
        {...field}
        {...props}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
      />
    </Box>
  );
};

const EditUser = ({ user, onClose }) => {
  return (
    <Formik
      initialValues={{
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        address: {
          street: user.address?.street || "",
          city: user.address?.city || "",
          geo: {
            lat: user.address?.geo?.lat || "",
            lng: user.address?.geo?.lng || "",
          },
        },
        phone: user.phone || "",
        website: user.website || "",
        company: {
          name: user.company?.name || "",
          catchPhrase: user.company?.catchPhrase || "",
          bs: user.company?.bs || "",
        },
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(40, "Must be 40 characters or less")
          .matches(
            /^(([a-zA-Z]+\s[a-zA-Z]+)+|[a-zA-Z]+)$/,
            "Name can only contain letters"
          )
          .required("Required"),
        username: Yup.string()
          .matches(/.*[a-zA-Z].*/, "Username should have at least 1 letter")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        phone: Yup.string()
          .matches(/^(\d+)$/, "Phone number is not valid")
          .required("Required"),
        address: Yup.object({
          street: Yup.string()
            .matches(/^[a-zA-Z]+$/, "Street can only contain letters")
            .required("Required"),
          city: Yup.string()
            .matches(/^[a-zA-Z]+$/, "City can only contain letters")
            .required("Required"),
          geo: Yup.object({
            lat: Yup.string().matches(
              /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/,
              "Invalid latitude"
            ),
            lng: Yup.string().matches(
              /^[-+]?((1[0-7]\d)|(0\d{0,1}))(\.\d+)?|180(\.0+)?$/,
              "Invalid longitude"
            ),
          }),
        }),
        website: Yup.string().url("Invalid URL"),
        company: Yup.object({
          name: Yup.string(),
          catchPhrase: Yup.string(),
          bs: Yup.string(),
        }),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const newUser = {
          name: values.name,
          username: values.username,
          email: values.email,
          address: {
            street: values.address.street || "Unknown Street",
            city: values.address.city || "Unknown City",
            geo: {
              lat: values.address.geo.lat || "0.0",
              lng: values.address.geo.lng || "0.0",
            },
          },
          phone: values.phone,
          website: values.website || "N/A",
          company: {
            name: values.company.name || "N/A",
            catchPhrase: values.company.catchPhrase || "N/A",
            bs: values.company.bs || "N/A",
          },
          pic: `https://robohash.org/${values.username}`,
        };
        fetch(`http://localhost:3000/user/${user._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then(() => {
            onClose();
          })
          .catch((error) => {
            console.error("Error updating user:", error);
          });
        setSubmitting(false);
      }}
    >
      <div className="Form">
        <div className="FormContent">
          <h2>Add New User</h2>
          <Form className="addUserForm">
            <MyTextInput
              label="Name"
              name="name"
              type="text"
              placeholder="John Doe"
            />
            <MyTextInput
              label="Username"
              name="username"
              type="text"
              placeholder="johndoe123"
            />
            <MyTextInput
              label="Email"
              name="email"
              type="email"
              placeholder="john.doe@example.com"
            />
            <MyTextInput
              label="Street"
              name="address.street"
              type="text"
              placeholder="Elm"
            />
            <MyTextInput
              label="City"
              name="address.city"
              type="text"
              placeholder="Springfield"
            />
            <MyTextInput
              label="Latitude"
              name="address.geo.lat"
              type="text"
              placeholder="Latitude"
            />
            <MyTextInput
              label="Longitude"
              name="address.geo.lng"
              type="text"
              placeholder="Longitude"
            />
            <MyTextInput
              label="Phone"
              name="phone"
              type="text"
              placeholder="1234567890"
            />
            <MyTextInput
              label="Website"
              name="website"
              type="text"
              placeholder="https://example.com"
            />
            <MyTextInput
              label="Company Name"
              name="company.name"
              type="text"
              placeholder="Company Name"
            />
            <MyTextInput
              label="Company Catchphrase"
              name="company.catchPhrase"
              type="text"
              placeholder="Catchphrase"
            />
            <MyTextInput
              label="Company BS"
              name="company.bs"
              type="text"
              placeholder="BS"
            />
            {/* <div className="updatebuttons">
              <button type="button" onClick={onClose}>
                Cancel
              </button>
              <button type="submit">Update User</button>
            </div> */}
            <Box mt={2} display="flex" justifyContent="space-between" gap="20px">
              <Button variant="contained" color="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Update User
              </Button>
            </Box>
          </Form>
        </div>
      </div>
    </Formik>
  );
};
export default EditUser;
