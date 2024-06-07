import AddForm from "@app/modules/addForm/AddForm";
import EditForm from "@app/modules/addForm/EditForm";
import fetchDataFromAPI from "@app/modules/api/api";
import { ContentHeader } from "@components";
import { Delete, Edit } from "@mui/icons-material";
import { Modal } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { MRT_ActionMenuItem, MaterialReactTable } from "material-react-table";
import { useEffect, useMemo, useState } from "react";

const Document = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModaL, setShowModaL] = useState(false);
  const [editData, setEditData] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const newData = await fetchDataFromAPI("GET", "documents");
      setData(transformData(newData));
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const transformData = (data) => {
    return data.map((item) => ({
      ...item,
      status: item.status ? "True" : "False",
    }));
  };

  const handleAddButtonClick = () => {
    setShowModaL(true);
  };

  const handleModalClose = () => {
    setShowModaL(false);
    setEditData(null);
  };

  const handleDataPosted = async (newData) => {
    setData((prevData) => [...prevData, transformData([newData])[0]]);
  };

  const handleDelete = async (row) => {
    const id = row.original.id;
    console.log(id);
    try {
      await fetchDataFromAPI("DELETE", "documents", null, null, id);
      alert("Deleted Successfully!");

      setData((prevData) => prevData.filter((item) => item.id !== id));
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Error deleting element:", error);
    }
  };

  const handleEdit = (id) => {
    const rowData = data.find((item) => item.id === id);
    setEditData(rowData);
    setShowModal(true);
  };

  const handleEditSubmit = async (editedData) => {
    try {
      await fetchDataFromAPI("PUT", "documents", editedData, editedData.id);
      handleUpdate(editedData);
      setShowModal(false);
      setEditData(null);
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleUpdate = (updatedData) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === updatedData.id ? { ...item, ...updatedData } : item
      )
    );
  };

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID", size: 100 },
      { accessorKey: "name", header: "Name", size: 150 },
      { accessorKey: "description", header: "Description", size: 200 },
      { accessorKey: "created_on", header: "Created On", size: 200 },
      { accessorKey: "modified_on", header: "Modified On", size: 200 },
      { accessorKey: "status", header: "Status", sortable: true, size: 100 },
    ],
    []
  );

  console.log("Data:", data);

  return (
    <div>
      <ContentHeader title="Document" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  style={{
                    fontSize: "1rem",
                    backgroundColor: "blue",
                    color: "white",
                  }}
                  data-widget="add"
                  data-toggle="tooltip"
                  title="Add"
                  onClick={handleAddButtonClick}
                >
                  <i className="fa fa-plus ml-2 mr-2" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            <div className="card-body">
              {loading ? (
                <CircularProgress />
              ) : (
                <MaterialReactTable
                  columns={columns}
                  data={data}
                  enableRowActions
                  renderRowActionMenuItems={({ row, table }) => [
                    <MRT_ActionMenuItem
                      icon={<Edit />}
                      key="edit"
                      label="Edit"
                      onClick={() => {
                        handleEdit(row.original.id);
                      }}
                      table={table}
                    />,
                    <MRT_ActionMenuItem
                      icon={<Delete />}
                      key="delete"
                      label="Delete"
                      onClick={() => {
                        handleDelete(row);
                      }}
                      table={table}
                    />,
                  ]}
                />
              )}

              <Modal
                open={showModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 8,
                  }}
                >
                  <EditForm
                    initialData={editData}
                    onClose={handleModalClose}
                    onUpdate={handleEditSubmit}
                  />
                </div>
              </Modal>
            </div>
            {showModaL && (
              <AddForm
                onClose={handleModalClose}
                title="Document"
                apiEndPoint="documents"
                onDataPosted={handleDataPosted}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Document;
