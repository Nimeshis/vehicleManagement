import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import * as Yup from "yup";
import fetchDataFromAPI from "../api/api";

const AddForm = ({ onClose, title, apiEndPoint, onDataPosted }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    status: Yup.boolean().required("Status is required"),
    description: Yup.string().required("Description is required"),
    customFields: Yup.array().of(
      Yup.object().shape({
        key: Yup.string(),
        type: Yup.string(),
        value: Yup.string(),
      })
    ),
  });

  const handleModalSave = async (values, resetForm) => {
    try {
      const customLabels = values.customFields.map((field) => ({
        key: field.key,
        type: field.type,
        // Convert value to number if type is "number"
        value: field.type === "number" ? parseFloat(field.value) : field.value,
      }));

      const dataToSend = {
        name: values.name,
        description: values.description,
        status: values.status,
        custom_labels: customLabels,
      };

      const response = await fetchDataFromAPI("POST", apiEndPoint, dataToSend);
      console.log("response :>> ", JSON.stringify(response));
      console.log("response.data", response.data);

      if (response && response.data) {
        onDataPosted(response.data);
        onClose();
      } else {
        throw new Error("Failed to submit form data: Invalid response");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content" style={{ borderRadius: "15px" }}>
          <div className="modal-header">
            <h5 className="modal-title">Add {title}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <Formik
            initialValues={{
              name: "",
              description: "",
              status: false,
              customFields: [{ key: "", type: "", value: "" }],
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleModalSave(values);
              setSubmitting(false);
            }}
          >
            {({ values, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col">
                      <label htmlFor="name">Name</label>
                      <Field
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Enter Name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="status">Status</label>
                      <Field as="select" className="form-control" name="status">
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                      </Field>
                      <ErrorMessage
                        name="status"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <Field
                      as="textarea"
                      className="form-control"
                      name="description"
                      placeholder="Enter Description"
                      style={{ height: "100px" }}
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <h>Custom Label</h>
                  <FieldArray name="customFields">
                    {({ push, remove }) => (
                      <div>
                        {values.customFields.map((field, index) => (
                          <div className="row" key={index}>
                            <div className="col">
                              <Field
                                type="text"
                                name={`customFields.${index}.key`}
                                className="form-control"
                                placeholder="Enter Key"
                              />
                              <ErrorMessage
                                name={`customFields.${index}.key`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col">
                              <Field
                                as="select"
                                name={`customFields.${index}.type`}
                                className="form-control"
                              >
                                <option value="">Select Type</option>
                                <option value="string">String</option>
                                <option value="number">Number</option>
                                <option value="date">Date</option>
                              </Field>
                              <ErrorMessage
                                name={`customFields.${index}.type`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col">
                              {values.customFields[index].type === "date" ? (
                                <Field
                                  type="date"
                                  name={`customFields.${index}.value`}
                                  className="form-control"
                                />
                              ) : values.customFields[index].type ===
                                "number" ? (
                                <Field
                                  type="number"
                                  name={`customFields.${index}.value`}
                                  className="form-control"
                                  placeholder="Enter Value"
                                />
                              ) : (
                                <Field
                                  type="text"
                                  name={`customFields.${index}.value`}
                                  className="form-control"
                                  placeholder="Enter Value"
                                />
                              )}
                              <ErrorMessage
                                name={`customFields.${index}.value`}
                                component="div"
                                className="text-danger"
                              />
                            </div>
                            <div className="col">
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="btn btn-danger"
                              >
                                -
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => push({ key: "", type: "", value: "" })}
                          className="btn btn-primary mt-3"
                        >
                          Add Custom Label
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>
                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
