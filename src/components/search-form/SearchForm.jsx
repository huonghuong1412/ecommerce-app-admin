import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../redux/constants";
import InputField from "components/input/InputField";
import SelectField from "components/input/SelectField";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    margin: "5px 0",
    width: "33.33%",
  },
  input: {
    flex: 1,
    fontSize: "1.3rem",
  },
  text: {
    fontSize: "1.3rem",
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  wrapperSelect: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  searchWrapper: {
    float: "right",
    margin: "15px 0",
  },
}));

const statusSearch = [
  {
    name: "Tất cả",
    code: 2,
  },
  {
    name: "Hiển thị",
    code: 1,
  },
  {
    name: "Không hiển thị",
    code: 0,
  },
];

export default function SearchForm({ params }) {
  const classes = useStyles();
  const history = useHistory();

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const name = params.name;
  const sku = params.sku;
  const category = params.category;
  const brand = params.brand;
  const display = params.display;

  const [data, setData] = useState({
    name: name ? name : "",
    sku: sku ? sku : "",
    category: category ? category : "",
    brand: brand ? [brand] : [],
    display: display ? display : 2,
  });
  const [categoriesAndBrands, setCategoriesAndBrands] = useState({
    categories: [],
    brands: [],
  });

  const handleOnChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const getData = useCallback(() => {
    const config = { headers: headers };
    const getAllCategory = axios.get(`${API_URL}/api/category/all`, config);
    const getAllBrand = axios.get(`${API_URL}/api/brand/all`, config);
    axios.all([getAllCategory, getAllBrand]).then(
      axios.spread((...allData) => {
        const allCategory = allData[0].data.content;
        const allBrand = allData[1].data.content;
        setCategoriesAndBrands({
          ...categoriesAndBrands,
          categories: allCategory,
          brands: allBrand,
        });
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    const search = {
      ...data,
      brand: data.brand.join(","),
    };
    history.push(
      `?name=${search.name}&sku=${search.sku}&brand=${search.brand}&category=${search.category}&display=${search.display}`
    );
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.root}>
          <InputField
            type="text"
            label="Tên sản phẩm"
            name="name"
            value={data.name ? data.name : ""}
            onChange={handleOnChange}
          />
        </div>
        <div className={classes.root}>
          <InputField
            type="text"
            label="SKU"
            name="sku"
            value={data.sku ? data.sku : ""}
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div className={classes.wrapperSelect}>
        <div className={classes.root}>
          <SelectField
            label="Thương hiệu"
            value={data.brand}
            name="brand"
            multiple={true}
            isShowAll={true}
            onChange={handleOnChange}
            data={categoriesAndBrands?.brands}
          />
        </div>
        <div className={classes.root}>
          <SelectField
            label="Danh mục"
            value={data.category}
            name="category"
            multiple={false}
            isShowAll={true}
            onChange={handleOnChange}
            data={categoriesAndBrands?.categories}
          />
        </div>
        <div className={classes.root}>
          <SelectField
            label="Trạng thái"
            value={data.display}
            name="display"
            multiple={false}
            isShowAll={false}
            onChange={handleOnChange}
            data={statusSearch}
          />
        </div>
      </div>
      <div className={classes.searchWrapper}>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          className={classes.button}
          onClick={handleSubmit}
          startIcon={<Search />}
        >
          <Link to="#">Tìm kiếm</Link>
        </Button>
      </div>
    </>
  );
}
