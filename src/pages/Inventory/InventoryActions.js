import { Button, Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { getOneItem } from 'services/ProductServices';
import { importProduct, updateImportProduct } from 'services/InventoryService'
import queryString from 'query-string';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from 'react-router-dom';
import { Editor } from "@tinymce/tinymce-react";
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});

function InventoryActions(props) {

    const [data, setData] = useState({
        original_price: 0,
        import_quantity: 0,
        note: ''
    });

    const [product, setProduct] = useState({});
    const { id } = useParams();

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value,
        });
    };

    const handleChangeEditor = (newValue, editor) => {
        setData({
            ...data,
            note: editor.getContent({ format: 'text' })
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const search = queryString.parse(props.location.search);
        const productId = search.productId;
        const color = search.color;
        const dataSubmit = {
            id,
            productId,
            color,
            inventory_details: [{ ...data }]
        }
        if (id && id !== null) {
            updateImportProduct(dataSubmit)
                .then(() => {
                    toast.success("Thêm số lượng sản phẩm thành công");
                    props.history.goBack();
                })
                .catch(err => alert("Error"));
        } else {
            importProduct(dataSubmit)
                .then(() => {
                    toast.success("Thêm số lượng sản phẩm thành công");
                    props.history.goBack();
                })
                .catch(err => alert("Error"));
        }
    }

    useEffect(() => {
        const value = queryString.parse(props.location.search);
        const productId = value.productId;
        getOneItem(parseInt(productId))
            .then(res => setProduct(res.data))
            .catch(err => alert("Error"))

    }, [props.location.search])

    const value = queryString.parse(props.location.search);
    const productId = value.productId;
    const color_params = value.color;
    let title = "";
    if (productId && color_params) {
        title += `Cập nhật số lượng cho sản phẩm có ID: ${productId} và màu sắc: ${color_params}`
    } else {
        title += `Cập nhật số lượng cho sản phẩm có ID: ${productId}`
    }

    return (
        <div>
            <h2 className="page-header">{title}</h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Grid container spacing={3}>
                                <Grid item md={12}>
                                    <TextField
                                        type="text"
                                        label="Tên sản phẩm"
                                        name="name"
                                        fullWidth
                                        value={product.name ? product.name : ""}
                                        variant="outlined"
                                        // disabled
                                        onChange={handleChange}
                                        InputProps={{
                                            readOnly: true,
                                            color: 'secondary'
                                        }}
                                    />
                                </Grid>
                                <Grid item md={12}>
                                    <TextField
                                        type="text"
                                        label="Giá niêm yết"
                                        name="list_price"
                                        fullWidth
                                        value={product.list_price ? product.list_price : 0}
                                        variant="outlined"
                                        onChange={handleChange}
                                        InputProps={{
                                            readOnly: true,
                                            color: 'secondary'
                                        }}
                                    />
                                </Grid>
                                <Grid item md={12}>
                                    <TextField
                                        type="text"
                                        label="Giá bán"
                                        name="price"
                                        fullWidth
                                        value={product.price ? product.price : 0}
                                        variant="outlined"
                                        onChange={handleChange}
                                        InputProps={{
                                            readOnly: true,
                                            color: 'secondary'
                                        }}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <TextField
                                        type="number"
                                        label="Số lượng nhập"
                                        name="import_quantity"
                                        value={data.import_quantity ? data.import_quantity : ""}
                                        fullWidth
                                        variant="outlined"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={6}>
                                    <TextField
                                        type="number"
                                        label="Giá gốc"
                                        name="original_price"
                                        value={data.original_price ? data.original_price : ""}
                                        fullWidth
                                        variant="outlined"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={12}>
                                    <Editor
                                        initialValue=""
                                        apiKey="0oiczdkt4b8lgo9kjmvrzsscibe0knl9d1cru6fr22ie2189"
                                        value={data?.note}
                                        init={{
                                            height: 400,
                                            menubar: false,
                                            plugins: [
                                                'advlist autolink lists link image charmap print preview anchor',
                                                'searchreplace visualblocks code fullscreen',
                                                'insertdatetime media table paste code help wordcount'
                                            ],
                                            toolbar: 'undo redo | formatselect | ' +
                                                'bold italic backcolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'link | image |' +
                                                'removeformat | help',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                        }}
                                        onEditorChange={handleChangeEditor}
                                    />
                                </Grid>
                                <Grid item md={12}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        onClick={handleSubmit}
                                    >
                                        Cập nhật
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default InventoryActions;