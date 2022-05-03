import { Button, makeStyles, LinearProgress } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import { API_URL } from '../../constants';
import { addProduct, getOneItem, updateProduct } from 'services/ProductServices';
// import { uploadImage } from 'services/UploadFileService';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import './style.css'
import InputField from 'components/input/InputField';
import SelectField from 'components/input/SelectField';
import { getAllCategory } from 'services/CategoryServices';
import ImageUploading from "react-images-uploading";
import { useHistory } from 'react-router';
import { storage } from 'utils/firebase'
import { getAll as getAllColor } from 'services/ColorServices';

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});

const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none',
    },
    button: {
        padding: '12px 24px',
        fontWeight: 600,
        fontSize: '1.3rem',
        marginRight: 15,
        marginBottom: 30
    }
}))

const properties = [
    {
        category: 'laptop',
        items: [
            {
                label: 'Công nghệ màn hình',
                name: 'screen',
                type: 'text',
                required: false
            },
            {
                label: 'Kích thước màn hình',
                name: 'screen_size',
                type: 'text',
                required: false
            },
            {
                type: "text",
                label: "Độ phân giải",
                name: "display_resolution",
                required: false
            },
            {
                type: "text",
                label: "Hệ điều hành",
                name: "operatorSystem",
                required: false
            },
            {
                type: "text",
                label: "Thông tin RAM",
                name: "ram",
                required: false
            },
            {
                type: "text",
                label: "Thông tin PIN",
                name: "pin",
                required: false
            },
            {
                type: "text",
                label: "Thông tin Chip",
                name: "chip",
                required: false
            },
            {
                type: "text",
                label: "Thông tin thiết kế",
                name: "design",
                required: false
            },
            {
                type: "text",
                label: "Chất liệu",
                name: "material",
                required: false
            },
            {
                type: "text",
                label: "Thông tin trọng lượng & kích thước",
                name: "sizeWeight",
                required: false
            },
            {
                type: "text",
                label: "Thông tin CPU",
                name: "cpu",
                required: false
            },
            {
                type: "text",
                label: "Thông tin phần cứng",
                name: "hardWare",
                required: false
            },
            {
                type: "text",
                label: "Thông tin card màn hình",
                name: "card",
                required: false
            },
            {
                type: "text",
                label: "Thông tin BUS",
                name: "bus",
                required: false
            },
        ]
    },
    {
        category: 'dien-thoai',
        items: [
            {
                label: 'Công nghệ màn hình',
                name: 'screen',
                type: 'text',
                required: false
            },
            {
                label: 'Kích thước màn hình',
                name: 'screen_size',
                type: 'text',
                required: false
            },
            {
                type: "text",
                label: "Độ phân giải",
                name: "display_resolution",
                required: false
            },
            {
                type: "text",
                label: "Hệ điều hành",
                name: "operatorSystem",
                required: false
            },
            {
                type: "text",
                label: "Thông tin RAM",
                name: "ram",
                required: false
            },
            {
                type: "text",
                label: "Thông tin PIN",
                name: "pin",
                required: false
            },
            {
                type: "text",
                label: "Thông tin Chip",
                name: "chip",
                required: false
            },
            {
                type: "text",
                label: "Thông tin thiết kế",
                name: "design",
                required: false
            },
            {
                type: "text",
                label: "Chất liệu",
                name: "material",
                required: false
            },
            {
                type: "text",
                label: "Thông tin trọng lượng & kích thước",
                name: "sizeWeight",
                required: false
            },
            {
                type: 'text',
                label: 'Thông tin CAMERA trước',
                name: 'frontCamera',
                required: false
            },
            {
                type: 'text',
                label: 'Thông tin CAMERA sau',
                name: 'behindCamera',
                required: false
            },
            {
                type: 'text',
                label: 'Thông tin bộ nhớ trong',
                name: 'internalMemory',
                required: false
            },
            {
                type: 'text',
                label: 'Thông tin SIM',
                name: 'sim',
                required: false
            },
            {
                type: 'number',
                label: 'Số sim',
                name: 'number_sim',
                required: false
            },
            {
                type: 'text',
                label: 'Phụ kiện đi kèm',
                name: 'accessory',
                required: false
            }
        ]
    },
    {
        category: 'may-tinh-bang',
        items: [
            {
                label: 'Công nghệ màn hình',
                name: 'screen',
                type: 'text',
                required: false
            },
            {
                label: 'Kích thước màn hình',
                name: 'screen_size',
                type: 'text',
                required: false
            },
            {
                type: "text",
                label: "Độ phân giải",
                name: "display_resolution",
                required: false
            },
            {
                type: "text",
                label: "Hệ điều hành",
                name: "operatorSystem",
                required: false
            },
            {
                type: "text",
                label: "Thông tin RAM",
                name: "ram",
                required: false
            },
            {
                type: "text",
                label: "Thông tin PIN",
                name: "pin",
                required: false
            },
            {
                type: "text",
                label: "Thông tin Chip",
                name: "chip",
                required: false
            },
            {
                type: "text",
                label: "Thông tin thiết kế",
                name: "design",
                required: false
            },
            {
                type: "text",
                label: "Chất liệu",
                name: "material",
                required: false
            },
            {
                type: "text",
                label: "Thông tin trọng lượng & kích thước",
                name: "sizeWeight",
                required: false
            },
            {
                type: 'text',
                label: 'Thông tin CAMERA trước',
                name: 'frontCamera',
                required: false
            },
            {
                type: 'text',
                label: 'Thông tin CAMERA sau',
                name: 'behindCamera',
                required: false
            },
            {
                type: 'text',
                label: 'Thông tin bộ nhớ trong',
                name: 'internalMemory',
                required: false
            },
            {
                type: 'text',
                label: 'Thông tin SIM',
                name: 'sim',
                required: false
            },
            {
                type: 'number',
                label: 'Số sim',
                name: 'number_sim',
                required: false
            },
            {
                type: 'text',
                label: 'Phụ kiện đi kèm',
                name: 'accessory',
                required: false
            }
        ]
    },
    {
        category: 'may-anh',
        items: [
            {
                label: 'Model',
                name: 'model',
                type: 'text',
                required: false
            },
            {
                type: 'text',
                label: 'Công nghệ xử lý hình ảnh',
                name: 'image_processing',
                required: false
            },
            {
                type: 'text',
                label: 'Chất lượng hình ảnh',
                name: 'image_quality',
                required: false
            },
            {
                type: 'text',
                label: 'Chất lượng video',
                name: 'video_quality',
                required: false
            },
            {
                type: 'text',
                label: 'Thẻ nhớ tương thích',
                name: 'memory_card',
                required: false
            },
            {
                label: 'Công nghệ màn hình',
                name: 'screen_camera',
                type: 'text',
                required: false
            },
            {
                label: 'Kích thước màn hình',
                name: 'screen_size_camera',
                type: 'text',
                required: false
            },
            {
                type: 'text',
                label: 'Tốc độ chụp',
                name: 'shutter_speed',
                required: false
            },
            {
                type: "text",
                label: "Chất liệu",
                name: "material",
                required: false
            },
            {
                type: "text",
                label: "Thông tin trọng lượng & kích thước",
                name: "sizeWeight",
                required: false
            },
        ]
    },
    {
        category: 'tivi',
        items: [
            {
                type: 'number',
                label: 'Năm ra mắt',
                name: 'year',
                required: false
            },
            {
                type: 'text',
                label: 'Độ phân giải màn hình',
                name: 'display_resolution_tv',
                required: false
            },
            {
                type: 'select',
                label: 'Loại Tivi',
                name: 'type_tv',
                required: false
            },
            {
                type: 'text',
                label: 'Ứng dụng có sẵn',
                name: 'app_avaiable',
                required: false
            },
            {
                type: 'text',
                label: 'USB',
                name: 'usb',
                required: false
            },
            {
                type: 'select',
                label: 'TV 3D',
                name: 'is3D',
                required: false
            },
            {
                type: 'number',
                label: 'Số loa',
                name: 'speaker',
                required: false
            },
            {
                type: 'text',
                label: 'Công nghệ âm thanh',
                name: 'techlonogy_sound',
                required: false
            },
            {
                type: 'text',
                label: 'Component Video',
                name: 'component_video',
                required: false
            },
            {
                type: 'text',
                label: 'Cổng HDMI',
                name: 'hdmi',
                required: false
            },
            {
                type: 'text',
                label: 'Điều khiển tivi bằng điện thoại',
                name: 'control_by_phone',
                required: false
            },
            {
                type: 'text',
                label: 'Công nghệ xử lý hình ảnh',
                name: 'image_processing_tv',
                required: false
            },
            {
                type: "text",
                label: "Chất liệu",
                name: "material",
                required: false
            },
            {
                type: "text",
                label: "Thông tin trọng lượng & kích thước",
                name: "sizeWeight",
                required: false
            },
        ]
    },
    {
        category: 'may-giat',
        items: [
            {
                type: 'text',
                label: 'Khối lượng giặt',
                name: 'wash_weight',
                required: false
            },
            {
                type: 'text',
                label: 'Chế độ giặt',
                name: 'wash_mode',
                required: false
            },
            {
                type: 'select',
                label: 'Giặt nhanh',
                name: 'is_fast',
                required: false
            },
            {
                type: 'select',
                label: 'Loại lồng giặt',
                name: 'wash_tub',
                required: false
            },
            {
                type: 'text',
                label: 'Kiểu động cơ',
                name: 'type_engine',
                required: false
            },
            {
                type: 'select',
                label: 'Máy giặt Inverter',
                name: 'is_inverter',
                required: false
            },
            {
                type: "text",
                label: "Chất liệu lồng giặt",
                name: "material",
                required: false
            },
            {
                type: "text",
                label: "Thông tin trọng lượng & kích thước",
                name: "sizeWeight",
                required: false
            },
        ]
    },
    {
        category: 'thiet-bi-phu-kien',
        items: [
            {
                type: 'text',
                label: 'Model',
                name: 'accessory_model',
                required: false
            },
            {
                type: 'text',
                label: 'Tính năng',
                name: 'feature',
                required: false
            },
            {
                type: "text",
                label: "Chất liệu",
                name: "material",
                required: false
            },
            {
                type: "text",
                label: "Trọng lượng & kích thước",
                name: "sizeWeight",
                required: false
            },
        ]
    }
]

function ProductActions(props) {

    const classes = useStyles();
    const history = useHistory();

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        categories: [],
        subcategories: [],
        brands: [],
        suppliers: []
    })

    const [colors, setColors] = useState([]);

    const maxNumber = 69;
    // const [imagesUpload, setImagesUpload] = useState([]);

    const [urlMainImage, setUrlMainImage] = useState('');
    const [urlsListImage, setUrlsListImage] = useState([]);
    const [progressMainUpload, setProgressMainUpload] = useState(0);
    const [progressListUpload, setProgressListUpload] = useState(0);


    const [product, setProduct] = useState({
        id: null,
        type: null,
        name: '',
        sku: '',
        model: '',
        price: 0,
        list_price: 0,
        description: '',
        category: '',
        subcategory: '',
        brand: '',
        supplier: '',
        sizeWeight: null,
        material: null,

        // color
        colors: [],

        // main & child image
        mainImage: '',
        images: [],

        // thông tin vận chuyển
        weight: 0,
        length: 0,
        width: 0,
        height: 0,

        // electric 
        screen: null,
        screen_size: null,
        operatorSystem: null,
        display_resolution: null,
        camera: null,
        ram: null,
        chip: null,
        pin: null,
        design: null,
        releaseTime: null,

        // phone
        frontCamera: null,
        behindCamera: null,
        internalMemory: null,
        sim: null,
        number_sim: null,
        accessory: null,

        // laptop
        cpu: null,
        bus: null,
        hardWare: null,
        card: null,

        // camera
        image_processing: null,
        image_quality: null,
        video_quality: null,
        memory_card: null,
        screen_camera: null,
        screen_size_camera: null,
        shutter_speed: null,

        // tivi
        year: null,
        display_resolution_tv: null,
        type_tv: null,
        app_avaiable: null,
        usb: null,
        is3D: null,
        speaker: null,
        techlonogy_sound: null,
        component_video: null,
        hdmi: null,
        image_processing_tv: null,

        // wash
        wash_weight: null,
        wash_mode: null,
        is_fast: null,
        wash_tub: null,
        is_inverter: null,

        // accessory - phu kien
        feature: null,
        accessory_model: null

    });

    const onChangeUploadMainImage = (imageList, addUpdateIndex) => {
        const image = imageList[0].file;
        const now = new Date().getTime();
        const uploadTask = storage.ref(`images/product/${now + '_' + image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgressMainUpload(progress);
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images/product")
                    .child(now + '_' + image.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrlMainImage(url);
                        toast.success("Upload hình ảnh thành công!");
                    });
            }
        );
    };

    const onChangeUploadImage = (imageList, addUpdateIndex) => {
        const imageFiles = imageList.map(item => item.file);
        // uploadImage(imageFiles)
        //     .then((res) => {
        //         setImagesUpload([
        //             ...imagesUpload,
        //             ...res.data
        //         ]);
        //     })
        //     .catch((err) => console.log(err))
        const promises = [];
        const now = new Date().getTime();
        imageFiles.map((image) => {
            const uploadTask = storage.ref(`images/product/${now + '_' + image.name}`).put(image);
            promises.push(uploadTask);
            return uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgressListUpload(progress);
                },
                (error) => {
                    console.log(error);
                },
                async () => {
                    await storage
                        .ref("images/product")
                        .child(now + '_' + image.name)
                        .getDownloadURL()
                        .then((urls) => {
                            setUrlsListImage((prevState) => [...prevState, urls]);
                        });
                }
            );
        });
        Promise.all(promises)
            .then(() => toast.success("Upload hình ảnh thành công!"))
            .catch(() => toast.warning("Upload hình ảnh không thành công!"));
    };

    const handleRemoveImage = (image) => {
        const newArray = urlsListImage.filter((item) => item !== image);
        // setImagesUpload(newArray);
        var desertRef = storage.refFromURL(`${image}`);
        desertRef.delete().then(function () {
            toast.success("Xoá hình ảnh thành công!")
            setUrlsListImage(newArray)
        }).catch(function (error) {
            toast.error("Xoá hình ảnh không thành công!")
        });
    }

    const handleRemoveMainImage = () => {
        var desertRef = storage.refFromURL(urlMainImage);
        desertRef.delete().then(function () {
            toast.success("Xoá hình ảnh thành công!")
            setUrlMainImage('')
            setProgressMainUpload(0)
        }).catch(function (error) {
            toast.error("Xoá hình ảnh không thành công!")
        });
    }

    const handleRemoveAllImage = () => {
        const promises = [];
        urlsListImage.map(url => promises.push(storage.refFromURL(`${url}`).delete()))
        Promise.all(promises)
            .then(() => {
                progressListUpload(0);
                setUrlsListImage([]);
                toast.success("Xoá hình ảnh thành công!");
            })
            .catch(() => toast.warning("Xoá hình ảnh không thành công!"));
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setProduct({
            ...product,
            type: product.category === "sach" ? 1 : 2,
            [e.target.name]: value,
        });
    };

    const handleChangeEditor = (newValue, editor) => {
        setProduct({
            ...product,
            description: editor.getContent({ format: 'text' })
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let newData = { ...product };
        const mainImage = urlMainImage
        const images = urlsListImage;
        switch (newData.category) {
            case 'laptop':
                newData.type = 1;
                break;
            case 'dien-thoai':
                newData.type = 1;
                break;
            case 'dienthoai':
                newData.type = 1;
                break;
            case 'may-tinh-bang':
                newData.type = 1;
                break;
            case 'maytinhbang':
                newData.type = 1;
                break;
            case 'may-anh':
                newData.type = 2;
                break;
            case 'mayanh':
                newData.type = 2;
                break;
            case 'camera':
                newData.type = 2;
                break;
            case 'tivi':
                newData.type = 3;
                break;
            case 'may-giat':
                newData.type = 4;
                break;
            case 'thiet-bi-phu-kien':
                newData.type = 5;
                break;
            case 'phu-kien':
                newData.type = 5;
                break;
            default:
                newData.type = 1;
                break;
        }
        if (newData.id) {
            newData.images = images;
            newData.mainImage = mainImage;
            updateProduct(newData)
                .then(() => {
                    toast.success("Cập nhật sản phẩm thành công");
                    history.push('/admin/products/list');
                })
                .catch(() => {
                    toast.error("Cập nhật sản phẩm không thành công");
                })
        } else {
            newData.images = images;
            newData.mainImage = mainImage;
            addProduct(newData)
                .then(() => {
                    toast.success("Thêm sản phẩm thành công");
                    history.push('/admin/products/list');
                })
                .catch(() => {
                    toast.error("Thêm sản phẩm không thành công");
                })
        }

    }

    let title = props.match.params.id ? `Cập nhật thông tin sản phẩm có id: ${props.match.params.id}` : "Thêm mới sản phẩm";

    const fetchData = useCallback(() => {
        let searchObj = {};
        searchObj.limit = 1000;
        searchObj.page = 0;
        searchObj.display = 1;
        getAllCategory(searchObj)
            .then(res => {
                setData({
                    ...data,
                    categories: res.data.content,
                })
            }, [])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchDataOther = useCallback(() => {

        const config = { headers: headers };
        if (product.category !== '') {
            const getAllSubcategory = axios.get(`${API_URL}/api/subcategory/category?category=${product.category}`);
            const getAllBrand = axios.get(`${API_URL}/api/brand/all`, config);
            const getAllSupplier = axios.get(`${API_URL}/api/supplier/all?page=${0}&limit=${1000}`, config);
            axios.all([getAllSubcategory, getAllBrand, getAllSupplier]).then(
                axios.spread((...allData) => {
                    const allSubcategory = allData[0].data;
                    const allBrand = allData[1].data.content;
                    const allSupplier = allData[2].data.content;
                    setData({
                        ...data,
                        subcategories: allSubcategory,
                        brands: allBrand,
                        suppliers: allSupplier
                    })
                })
            )
        } else {
            setData({
                ...data,
                subcategories: [],
                brands: [],
                suppliers: []
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product.category])

    useEffect(() => {
        const search = {
            page: 0,
            limit: 1000
        }
        getAllColor(search)
            .then(res => {
                setColors(res.data.content);
            })
    }, [])

    useEffect(() => {
        fetchData();
        fetchDataOther();
        const id = props.match.params.id;
        if (id) {
            getOneItem(id)
                .then((res) => {
                    setProduct(res.data)
                    setUrlsListImage([
                        ...urlsListImage,
                        ...res.data.images
                    ])
                    setUrlMainImage(res.data.mainImage)
                    setLoading(false);
                })
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData, fetchDataOther, props.match.params.id])

    return <> {
        loading ? <LinearProgress color="secondary" /> : (
            <div>
                <h2 className="page-header">{title}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="glOjBk list-cusomer-order">
                                    <h2 className="heading">
                                        Thông tin cơ bản
                                    </h2>
                                </div>
                                <div className="card__body">
                                    <div className="row">
                                        <div className="col-12">
                                            <InputField
                                                type="text"
                                                label="Tên sản phẩm"
                                                name="name"
                                                value={product && product?.name}
                                                onChange={handleChange}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <InputField
                                                type="text"
                                                label="Mã sản phẩm"
                                                name="sku"
                                                value={product.sku ? product.sku : ""}
                                                onChange={handleChange}
                                                required={false}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <SelectField
                                                label="Danh mục"
                                                value={product.category || ""}
                                                name="category"
                                                onChange={handleChange}
                                                data={data?.categories}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <SelectField
                                                label="Danh mục con"
                                                value={product.subcategory || ""}
                                                name="subcategory"
                                                onChange={handleChange}
                                                data={data?.subcategories}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <SelectField
                                                label="Thương hiệu"
                                                value={product.brand || ""}
                                                name="brand"
                                                onChange={handleChange}
                                                data={data?.brands}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <InputField
                                                type="number"
                                                label="Giá niêm yết"
                                                name="list_price"
                                                value={product.list_price || ''}
                                                onChange={handleChange}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <InputField
                                                type="number"
                                                label="Giá bán"
                                                name="price"
                                                value={product.price || ''}
                                                onChange={handleChange}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <SelectField
                                                label="Màu sắc"
                                                value={product.colors || ['']}
                                                name="colors"
                                                onChange={handleChange}
                                                data={colors.map((item) => {
                                                    return {
                                                        name: item.name,
                                                        code: item.name
                                                    }
                                                })}
                                                required={true}
                                                multiple={true}
                                            />
                                        </div>
                                        <div className="col-12 tiny-editor-margin">
                                            <Editor
                                                initialValue="<p></p>"
                                                apiKey="0oiczdkt4b8lgo9kjmvrzsscibe0knl9d1cru6fr22ie2189"
                                                value={product?.description}
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="glOjBk list-cusomer-order">
                                    <h2 className="heading">
                                        Thông tin thêm
                                    </h2>
                                    <p style={{ color: 'red' }}>
                                        {product.category === '' ? 'Vui lòng chọn danh mục sản phẩm' : null}
                                    </p>
                                </div>

                                <div className="card__body">
                                    <div className="row">
                                        {
                                            properties.map((property) => {
                                                return property.category === product.category ? (
                                                    property.items.map((input, index) => {
                                                        if (input.type === 'select') {
                                                            return <div className="col-6">
                                                                <SelectField
                                                                    key={index}
                                                                    label={input.label}
                                                                    name={input.name}
                                                                    value={product[`${input.name}`] || ""}
                                                                    onChange={handleChange}
                                                                    multiple={false}
                                                                    data={
                                                                        input.name === 'wash_tub' ? [
                                                                            {
                                                                                code: 'Ngang',
                                                                                name: 'Ngang'
                                                                            },
                                                                            {
                                                                                code: 'Dọc',
                                                                                name: 'Dọc'
                                                                            }
                                                                        ] : input.name === 'type_tv' ? [
                                                                            {
                                                                                code: '1',
                                                                                name: 'Smart TV'
                                                                            },
                                                                            {
                                                                                code: '0',
                                                                                name: 'Inverter TV'
                                                                            }
                                                                        ] : [
                                                                            {
                                                                                code: "0",
                                                                                name: 'Có'
                                                                            },
                                                                            {
                                                                                code: "1",
                                                                                name: 'Không'
                                                                            }
                                                                        ]
                                                                    }
                                                                    required={input.required}
                                                                />
                                                            </div>
                                                        }
                                                        return <div className="col-6">
                                                            <InputField
                                                                key={index}
                                                                type={input.type}
                                                                label={input.label}
                                                                name={input.name}
                                                                value={product[`${input.name}`] || ""}
                                                                onChange={handleChange}
                                                                required={input.required}
                                                            />
                                                        </div>
                                                    })
                                                ) : ""
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="glOjBk list-cusomer-order">
                                    <h2 className="heading">
                                        Thông tin vận chuyển
                                    </h2>
                                </div>
                                <div className="card__body">
                                    <div className="row">
                                        <div className="col-12">
                                            <SelectField
                                                label="Nhà cung cấp"
                                                value={product.supplier || ""}
                                                name="supplier"
                                                onChange={handleChange}
                                                data={data?.suppliers}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <InputField
                                                type="number"
                                                label="Cân nặng sau khi đóng gói (gram)"
                                                name="weight"
                                                value={product.weight || ""}
                                                onChange={handleChange}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-4">
                                            <InputField
                                                type="number"
                                                label="Chiều dài (sau khi đóng gói)"
                                                name="length"
                                                value={product.length || ""}
                                                onChange={handleChange}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-4">
                                            <InputField
                                                type="number"
                                                label="Chiều rộng (sau khi đóng gói)"
                                                name="width"
                                                value={product.width || ""}
                                                onChange={handleChange}
                                                required={true}
                                            />
                                        </div>
                                        <div className="col-4">
                                            <InputField
                                                type="number"
                                                label="Chiều cao (sau khi đóng gói)"
                                                name="height"
                                                value={product.height || ""}
                                                onChange={handleChange}
                                                required={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="glOjBk list-cusomer-order">
                                    <h2 className="heading">
                                        Hình ảnh sản phẩm
                                    </h2>
                                </div>
                                <div className="card__body">
                                    <div className="row">
                                        <div className="col-12 tiny-editor-margin">
                                            <ImageUploading
                                                value={product.mainImage}
                                                onChange={onChangeUploadMainImage}
                                                maxNumber={1}
                                                dataURLKey="data_url"
                                            >
                                                {({
                                                    onImageUpload,
                                                    dragProps
                                                }) => (
                                                    <div className="upload__image-wrapper">
                                                        <Button
                                                            className={classes.button}
                                                            variant="outlined"
                                                            color="primary"
                                                            component="span"
                                                            onClick={onImageUpload}
                                                            {...dragProps}
                                                        >
                                                            Thêm ảnh chính
                                                        </Button>
                                                        {progressMainUpload > 0 ? <progress className="progress-bar" value={progressMainUpload} max="100" /> : ''}
                                                        <div className="image-wrapper">
                                                            <div className="image-wrapper-item">
                                                                {
                                                                    urlMainImage !== '' ? <img src={urlMainImage} alt="" /> : ''
                                                                }
                                                                <div className="overlay"></div>
                                                                <div className="image-item__btn-wrapper">
                                                                    <button onClick={handleRemoveMainImage}>
                                                                        <i className='bx bx-trash' ></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </ImageUploading>
                                        </div>
                                        <div className="col-12 tiny-editor-margin">
                                            <ImageUploading
                                                multiple
                                                value={product.images}
                                                onChange={onChangeUploadImage}
                                                maxNumber={maxNumber}
                                                dataURLKey="data_url"
                                            >
                                                {({
                                                    onImageUpload,
                                                    dragProps
                                                }) => (
                                                    <div className="upload__image-wrapper">
                                                        <Button
                                                            className={classes.button}
                                                            variant="outlined"
                                                            color="primary"
                                                            component="span"
                                                            onClick={onImageUpload}
                                                            {...dragProps}
                                                        >
                                                            Thêm ảnh phụ
                                                        </Button>
                                                        {progressListUpload > 0 ? <progress className="progress-bar" value={progressListUpload} max="100" /> : ''}
                                                        <div className="image-wrapper">
                                                            <button onClick={handleRemoveAllImage} className="btn-remove-all">Xoá tất cả</button>
                                                            {
                                                                urlsListImage.map((image, index) => (
                                                                    <div key={index} className="image-wrapper-item">
                                                                        <img src={image} alt="" />
                                                                        <div className="overlay"></div>
                                                                        <div className="image-item__btn-wrapper">
                                                                            <button onClick={() => handleRemoveImage(image)}>
                                                                                <i className='bx bx-trash' ></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                )}
                                            </ImageUploading>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        type="submit"
                                        // onClick={handleSubmit}
                                        className={classes.button}
                                    >
                                        {
                                            product.id ? "Cập nhật" : "Lưu sản phẩm"
                                        }
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        size="large"
                                        className={classes.button}
                                        onClick={() => history.push('/admin/products/list')}
                                    >
                                        Quay lại
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
    </>
}

export default ProductActions;