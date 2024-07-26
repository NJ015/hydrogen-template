import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeForm } from "./userSlice";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
// import CloseIcon from "@mui/icons-material/Close";

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

    <TextField
      fullWidth
      label={label}
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      q
    />
  );
};

export default function AddUserForm({ addUser }) {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: "",
        username: "",
        email: "",
        address: {
          street: "",
          city: "",
          geo: {
            lat: "",
            lng: "",
          },
        },
        phone: "",
        website: "",
        company: {
          name: "",
          catchPhrase: "",
          bs: "",
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
          website: values.website || "https://NotAvailable.com",
          company: {
            name: values.company.name || "N/A",
            catchPhrase: values.company.catchPhrase || "N/A",
            bs: values.company.bs || "N/A",
          },
          pic: `https://robohash.org/${values.username}`,
        };

        fetch("http://localhost:3000/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }).catch((error) => {
          console.error("Error adding user:", error);
        });
        addUser(newUser);
        dispatch(closeForm());
        setSubmitting(false);
      }}
    >
      <div className="Form">
        <div className="FormContent">
          <span className="closeButton" onClick={() => dispatch(closeForm())}>
            X
          </span>
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
            {/* <button type="submit">Add User</button> */}

            <Button variant="contained" type="submit">
              Add User
            </Button>
          </Form>
        </div>
      </div>
    </Formik>
  );
}
