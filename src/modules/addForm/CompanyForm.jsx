import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const CompanyForm = ({ onClose, title }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [panNo, setPanNo] = useState("");

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),

    address: Yup.string().required("Address is required"),
  });

  const handleModalSave = () => {
    console.log("Name:", name);
    console.log("Address:", address);
    console.log("PhoneNo:", phoneNo);
    console.log("PanNo:", panNo);

    setName("");
    setAddress("");
    setPhoneNo("");
    setPanNo("");

    onClose();
  };
  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog modal-lg ">
        <div className="modal-content" style={{ borderRadius: "15px" }}>
          <div className="modal-header">
            <h5 className="modal-title">Add New {title}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <Formik
            initialValues={{
              name: "",
              address: "",
              phoneNo: "",
              panNo,
            }}
            validationSchema={validationSchema}
            onSubmit={handleModalSave}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className={`form-control mb-2 border ${
                      errors.name && touched.name
                        ? "border-danger"
                        : "border-dark"
                    } rounded`}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Name"
                    name="name"
                  />
                  {errors.name && touched.name && (
                    <div className="text-danger">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="name">Address</label>
                  <input
                    type="text"
                    className={`form-control mb-2 border ${
                      errors.address && touched.address
                        ? "border-danger"
                        : "border-dark"
                    } rounded`}
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Address"
                    name="name"
                  />
                  {errors.address && touched.address && (
                    <div className="text-danger">{errors.address}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="name">Phone Number</label>
                  <input
                    type="text"
                    className={`form-control mb-2 border ${
                      errors.phoneNo && touched.phoneNo
                        ? "border-danger"
                        : "border-dark"
                    } rounded`}
                    value={values.phoneNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Phone Number"
                    name="phoneNo"
                  />
                  {errors.phoneNo && touched.phoneNo && (
                    <div className="text-danger">{errors.phoneNo}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="address">Pan Number</label>
                  <input
                    className={`form-control border ${
                      errors.panNo && touched.panNo
                        ? "border-danger"
                        : "border-dark"
                    } rounded`}
                    value={values.panNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Pan Number"
                    name="panNo"
                  />
                  {errors.panNo && touched.panNo && (
                    <div className="text-danger">{errors.panNo}</div>
                  )}

                  <h2 className="col-6 mt-3">Add Custom Label</h2>
                </div>
              </div>
            )}
          </Formik>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleModalSave}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CompanyForm;
