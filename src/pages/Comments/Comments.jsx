import React, { useCallback, useEffect, useState } from "react";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import { deleteItem, getAllItem, updateItem, getOneItem } from "../../services/CommentServices";
import Loading from "components/loading/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommentTable from "./CommentTable";
import AlertDialog from "components/dialog/AlertDialog";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

const columns = [
  { id: "id", label: "ID", minWidth: 10, type: "text", isShow: true },
  {
    id: "displayName",
    label: "Họ tên",
    minWidth: 170,
    type: "text",
    isShow: true,
  },
  {
    id: "date_comment",
    label: "Ngày bình luận",
    minWidth: 170,
    type: "text",
    isShow: true,
  },
  {
    id: "productId",
    label: "Mã sản phẩm",
    minWidth: 150,
    type: "text",
    isShow: true,
  },
  {
    id: "rating",
    label: "Đánh giá",
    minWidth: 120,
    type: "text",
    isShow: true,
  },
  {
    id: "content",
    label: "Bình luận",
    minWidth: 200,
    type: "text",
    isShow: true,
  },
  {
    id: "display",
    label: "Trạng thái",
    minWidth: 170,
    type: "number",
    isShow: false,
    format: (value) => (value === 1 ? "Hiển thị" : "Không hiển thị"),
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  textField: {
    fontWeight: 500,
  },
  button: {
    margin: "0",
    float: "right",
    height: "100%",
  },
});

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenDeletedialog = (id) => {
    getOneItem(id)
      .then((res) => setItem(res.data))
      .catch((err) => console.log(err));
    setOpenDeleteDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDeleteDialog(false);
  };

  const setNewPage = (page) => {
    setPage(page);
  };

  const setNewRowsPerPage = (newRows) => {
    setRowsPerPage(newRows);
    setPage(0);
  };

  const handleChangePage = (newPage) => {
    setNewPage(newPage);
  };

  const handleSaveItem = (data) => {
    updateItem(data)
      .then((res) => {
        getData();
        toast.success(res.data.message);
      })
      .catch((err) => toast.error("Cập nhật trạng thái không thành công"));
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        toast.success("Xoá bình luận thành công");
        getData();
      })
      .catch((err) => toast.error("Xoá bình luận không thành công"));
    handleCloseDialog();
  };

  const getData = useCallback(() => {
    let searchObj = {};
    searchObj.limit = rowsPerPage;
    searchObj.page = page + 1;
    getAllItem(searchObj)
      .then((res) => {
        setComments([...res.data.content]);
        setTotalElements(res.data.totalElements);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [page, rowsPerPage]);

  useEffect(() => {
    document.title = "E-Shop Admin | Comments";
    getData();
  }, [getData]);

  return (
    <div>
      <h2 className="page-header">Quản lý bình luận</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {loading ? (
                    <Loading />
                  ) : (
                    <Paper className={classes.root}>
                      <CommentTable
                        className={classes.table}
                        data={comments}
                        columns={columns}
                        handleOpenDeletedialog={handleOpenDeletedialog}
                        totalElements={totalElements}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={setNewRowsPerPage}
                        handleSaveItem={handleSaveItem}
                      />
                    </Paper>
                  )}
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
      <AlertDialog
        open={openDeleteDialog}
        onClose={handleCloseDialog}
        title="Đánh giá"
        item={item}
        onSubmit={handleDeleteItem}
      />
    </div>
  );
}
