import { Button, Grid } from '@material-ui/core'
import Loading from 'components/loading/Loading';
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserLogin, updateInfo } from 'redux/actions/AuthActions';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});

export default function InfoShipper() {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        id: '',
        fullName: '',
        username: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        cccd: '',
        shift: ''
    });

    const getData = () => {
        getUserLogin()
            .then(res => {
                setUser(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            username: user?.username,
            email: user?.email,
            fullName: user?.fullName,
            phone: user?.phone,
            dateOfBirth: user?.dateOfBirth
        }
        // console.log(data)
        updateInfo(data)
            .then((res) => {
                toast.success(res.data.message, {
                    position: "bottom-center",
                    theme: 'dark',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setLoading(false);
                getData();
            })
            .catch((err) => {
                toast.error(err.response.data.message, {
                    position: "bottom-center",
                    theme: 'dark',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                getData();
            })
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <h2 className="page-header">Quản lý thông tin cá nhân</h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    {loading ? (
                                        <Loading />
                                    ) : (
                                        <Grid className="" container spacing={2}>
                                            <Grid item sm={3} xs={3}></Grid>
                                            <Grid item sm={6} xs={6}>
                                                <ValidatorForm onSubmit={handleSubmit}>
                                                    <div className="card">
                                                        <div className="card__header">
                                                            <h3>Tài khoản đăng nhập</h3>
                                                        </div>
                                                        <div className="card__body">
                                                            <div className="input-text">
                                                                <TextValidator
                                                                    fullWidth
                                                                    type="text"
                                                                    name="username"
                                                                    value={user?.username}
                                                                    disabled
                                                                    inputProps={{
                                                                        style: { color: 'blue' },
                                                                    }}
                                                                    onChange={handleInputChange}
                                                                    label={
                                                                        <span>
                                                                            <span style={{ color: "red" }}>*</span>
                                                                            Tên tài khoản
                                                                        </span>
                                                                    }
                                                                    validators={["required"]}
                                                                    errorMessages={["Trường này không được để trống"]}
                                                                />
                                                            </div>
                                                            <div className="input-text">
                                                                <TextValidator
                                                                    fullWidth
                                                                    type="text"
                                                                    name="email"
                                                                    value={user?.email}
                                                                    onChange={handleInputChange}
                                                                    label={
                                                                        <span>
                                                                            <span style={{ color: "red" }}>*</span>
                                                                            Email
                                                                        </span>
                                                                    }
                                                                    validators={["required"]}
                                                                    errorMessages={["Trường này không được để trống"]}
                                                                />
                                                            </div>
                                                            <div className="input-text">
                                                                <TextValidator
                                                                    fullWidth
                                                                    type="text"
                                                                    name="fullName"
                                                                    value={user?.fullName}
                                                                    onChange={handleInputChange}
                                                                    label={
                                                                        <span>
                                                                            <span style={{ color: "red" }}>*</span>
                                                                            Họ và tên
                                                                        </span>
                                                                    }
                                                                    validators={["required"]}
                                                                    errorMessages={["Trường này không được để trống"]}
                                                                />
                                                            </div>
                                                            <div className="input-text">
                                                                <TextValidator
                                                                    fullWidth
                                                                    type="number"
                                                                    name="phone"
                                                                    value={user?.phone}
                                                                    onChange={handleInputChange}
                                                                    label={
                                                                        <span>
                                                                            <span style={{ color: "red" }}>*</span>
                                                                            Số điện thoại
                                                                        </span>
                                                                    }
                                                                    validators={["required"]}
                                                                    errorMessages={["Trường này không được để trống"]}
                                                                />
                                                            </div>

                                                            <div className="input-text">
                                                                <TextValidator
                                                                    fullWidth
                                                                    style={{ margin: '5px 0' }}
                                                                    type="date"
                                                                    name="dateOfBirth"
                                                                    value={user?.dateOfBirth}
                                                                    onChange={handleInputChange}
                                                                    placeholder=""
                                                                    label={
                                                                        <span>
                                                                            <span style={{ color: "red" }}>*</span>
                                                                            Ngày sinh
                                                                        </span>
                                                                    }
                                                                    validators={["required"]}
                                                                    errorMessages={["Ngày sinh không được để trống"]}
                                                                />
                                                            </div>
                                                            <div className="input-text">
                                                                <TextValidator
                                                                    fullWidth
                                                                    style={{ margin: '5px 0' }}
                                                                    type="text"
                                                                    name="cccd"
                                                                    value={user?.cccd}
                                                                    onChange={handleInputChange}
                                                                    placeholder=""
                                                                    label={
                                                                        <span>
                                                                            <span style={{ color: "red" }}>*</span>
                                                                            Số CCCD
                                                                        </span>
                                                                    }
                                                                    validators={["required"]}
                                                                    errorMessages={["CCCD không được để trống"]}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="card__footer">
                                                            <Grid item sm={12} xs={12}>
                                                                <Button
                                                                    variant="outlined" color="secondary"
                                                                    style={{ margin: '10px 0', width: '100%' }}
                                                                    className="btn btn--e-transparent-brand-b-2"
                                                                    type="submit"
                                                                >Cập nhật thông tin</Button>
                                                            </Grid>
                                                        </div>
                                                    </div>
                                                </ValidatorForm>
                                            </Grid>
                                            <Grid item sm={3} xs={3}></Grid>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
