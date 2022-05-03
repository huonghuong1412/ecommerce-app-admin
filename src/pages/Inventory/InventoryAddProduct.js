import { Button, Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { getOneItem } from 'services/ProductServices';
import { getAllColorNotExsistProduct, importProduct } from 'services/InventoryService'
import queryString from 'query-string';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import SelectField from 'components/input/SelectField';
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});

function InventoryAddProduct(props) {

    const [data, setData] = useState({
        original_price: 0,
        import_quantity: 0,
        note: ''
    });

    const [product, setProduct] = useState({});
    const [colors, setColors] = useState([]);
    const [selectedColor, setSelectedColor] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value,
        });
    };

    const handleSelectedChange = (e) => {
        const value = e.target.value;
        setSelectedColor(value);
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
        const dataSubmit = {
            productId,
            color: selectedColor,
            inventory_details: [{ ...data }]
        }
        // console.log(dataSubmit);
        importProduct(dataSubmit)
            .then(() => {
                toast.success("Thêm số lượng sản phẩm thành công");
                props.history.goBack();
            })
            .catch(err => alert("Error"));
    }

    useEffect(() => {
        const value = queryString.parse(props.location.search);
        const productId = value.productId;
        getOneItem(parseInt(productId))
            .then(res => setProduct(res.data))
            .catch(err => alert("Error"))

    }, [props.location.search])

    useEffect(() => {
        const value = queryString.parse(props.location.search);
        const productId = value.productId;
        getAllColorNotExsistProduct(productId)
            .then(res => {
                setColors(res.data);
            })
    }, [props.location.search])

    const value = queryString.parse(props.location.search);
    const productId = value.productId;
    const title = `Cập nhật số lượng cho sản phẩm có ID: ${productId}`;

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
                                    <SelectField
                                        label="Màu sắc"
                                        value={selectedColor || ""}
                                        name="selectedColor"
                                        onChange={handleSelectedChange}
                                        data={colors.map((item) => {
                                            return {
                                                name: item.name,
                                                code: item.name
                                            }
                                        })}
                                        required={true}
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
export default InventoryAddProduct;