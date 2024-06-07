import { ContentHeader } from "@components";
import CircularProgress from "@mui/material/CircularProgress";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import fetchDataFromAPI from "../modules/api/api";

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const newData = await fetchDataFromAPI("GET", "customLabel");
      const transformedData = transformData(newData);
      setData(transformedData);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const transformData = (data) => {
    return data.map((item) => ({
      ...item,
    }));
  };
  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 100,
      },
      {
        accessorKey: "data_id",
        header: "Data_Id",
        size: 100,
      },
      {
        accessorKey: "module",
        header: "Module",
        size: 100,
      },
      {
        accessorKey: "key",
        header: "Key",
        size: 150,
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 200,
      },
      {
        accessorKey: "value",
        header: "Value",
        size: 200,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
  });

  return (
    <div>
      <ContentHeader title="CustomLabel" />
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
                  <i className="fa fa-plus ml-2  mr-2" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            <div className="card-body">
              {loading ? (
                <CircularProgress />
              ) : (
                <MaterialReactTable table={table} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
