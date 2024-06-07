import CustomLabel from "@app/modules/customLabel/CustomLabel";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";

const VehicleTypeForm = ({ onClose, title, apiEndPoint, onDataPosted }) => {
  const handleModalSave = async (values) => {
    console.log(values);
    try {
      const response = await axios.post(
        `http://192.168.1.116:3000/${apiEndPoint}`,
        values
      );
      console.log("Data posted successfully:", response.data);

      onClose();
      onDataPosted(response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
    console.log(values);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),

    displayName: Yup.string().required("Display Name is required"),
    numberOfTires: Yup.number().required("Number of Tires is required"),
  });

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
              displayName: "",
              numberOfSeats: "",
              numberOfTires: "",
              description: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleModalSave(values);
              setSubmitting(false);
            }}
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
                  <label htmlFor="name">Display Name</label>
                  <input
                    type="text"
                    className={`form-control mb-2 border ${
                      errors.displayName && touched.displayName
                        ? "border-danger"
                        : "border-dark"
                    } rounded`}
                    value={values.displayName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Display Name"
                    name="displayName"
                  />
                  {errors.displayName && touched.displayName && (
                    <div className="text-danger">{errors.displayName}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="name"> Number Of Seats</label>
                  <input
                    type="text"
                    className={`form-control mb-2 border ${
                      errors.numberOfSeats && touched.numberOfSeats
                        ? "border-danger"
                        : "border-dark"
                    } rounded`}
                    value={values.numberOfSeats}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter   Number Of Seats"
                    name="numberOfSeats"
                  />
                  {errors.numberOfSeats && touched.numberOfSeats && (
                    <div className="text-danger">{errors.numberOfSeats}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="displayName"> Number Of Tires</label>
                  <input
                    className={`form-control border ${
                      errors.numberOfTires && touched.numberOfTires
                        ? "border-danger"
                        : "border-dark"
                    } rounded`}
                    value={values.numberOfTires}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Number of Tires"
                    name="numberOfTires"
                  />
                  {errors.numberOfTires && touched.numberOfTires && (
                    <div className="text-danger">{errors.numberOfTires}</div>
                  )}

                  <label htmlFor="displayName"> Description</label>
                  <textarea
                    className={`form-control border ${
                      errors.description && touched.description
                        ? "border-danger"
                        : "border-dark"
                    } rounded`}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Description"
                    name="description"
                  />
                  {errors.description && touched.description && (
                    <div className="text-danger">{errors.description}</div>
                  )}
                  <h2 className="col-6 mt-3">Add Custom Label</h2>

                  <CustomLabel />
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
export default VehicleTypeForm;
