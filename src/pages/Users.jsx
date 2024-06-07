import fetchDataFromAPI from "@app/modules/api/api";
import { ContentHeader } from "@components";
import CircularProgress from "@mui/material/CircularProgress";
import { MaterialReactTable } from "material-react-table";
import { useEffect, useMemo, useState } from "react";

const Users = () => {
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
      const newData = await fetchDataFromAPI("GET", "users");
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

  const handleEditSubmit = async (editedData) => {
    try {
      await fetchDataFromAPI("PUT", "users", editedData, editedData.id);
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
      { accessorKey: "username", header: "Username", size: 150 },
      { accessorKey: "email", header: "Email", size: 200 },
      { accessorKey: "password", header: "Password", size: 200 },
    ],
    []
  );

  console.log("Data:", data);

  return (
    <div>
      <ContentHeader title="Users" />
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
                <MaterialReactTable columns={columns} data={data} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Users;
