import fetchDataFromAPI from "@app/modules/api/api";
import CustomLabel from "@app/modules/customLabel/CustomLabel";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const AddUser = () => {
  const [country, setCountry] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const newData = await fetchDataFromAPI("GET", "company");

      console.log(newData);
      setData(newData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-5 align-items-center">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          companyId: "", // Added companyId to initialValues
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required("First Name is required"),
          lastName: Yup.string().required("Last Name is required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
          companyId: Yup.string().required("Vehicle Group is required"), // Added companyId to validationSchema
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {(
          { isSubmitting, handleBlur, handleChange, values, errors, touched } // Destructured handleChange, values, errors, touched from Formik props
        ) => (
          <Form
            className="border border-dark p-5 shadow-lg"
            style={{
              borderRadius: "20px",
              width: "80%",
              height: "max-content",
              margin: "0 auto",
              marginTop: "-35px",
            }}
          >
            <h1 className="mb-4 text-center">Registration</h1>
            <div className="row">
              <div className="mb-3 col-6">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <Field type="text" name="firstName" className="form-control" />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3 col-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <Field type="text" name="lastName" className="form-control" />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-6">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="country">Country</label>
                <select
                  className="form-control border border-dark rounded"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  onBlur={handleBlur}
                  name="country"
                >
                  <option value="">Select Country</option>
                  <option value="Nepal">Nepal</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-6">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3 col-6">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label htmlFor="companyId" className="form-label">
                  Company Name
                </label>
                <Field
                  as="select"
                  id="companyId"
                  name="companyId"
                  className={`form-control ${
                    errors.companyId && touched.companyId ? "is-invalid" : ""
                  }`}
                  value={values.companyId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {data.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </Field>
                {errors.companyId && touched.companyId && (
                  <div className="invalid-feedback">{errors.companyId}</div>
                )}
              </div>
            </div>
            <h2> Custom Label</h2>
            <CustomLabel />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddUser;
