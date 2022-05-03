import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import { authentication } from '../utils/Authentication'
import * as pages from "pages/index";

const Routes = () => {
  return (
    <Switch>
      <AdminRouter path="/" exact component={pages.DashboardPage} />
      <Route path="/admin/login" exact component={pages.LoginPage} />
      <AdminRouter path="/admin/change-password" exact component={pages.ChangePasswordPage} />
      <AdminRouter path="/admin/dashboard" exact component={pages.DashboardPage} />
      <AdminRouter path="/admin/dashboard2" exact component={pages.DashboardPage1} />
      <AdminRouter path="/admin/customers" component={pages.CustomersPage} />
      <AdminRouter path="/admin/sellers" component={pages.SellerPage} />
      <AdminRouter exact path="/admin/products/list" component={pages.ProductAllPage} />
      <AdminRouter exact path="/admin/products/:category" component={pages.ProductsPage} />
      <AdminRouter path="/admin/product/create" component={pages.ProductCreateAndUpdatePage} />
      <AdminRouter path="/admin/product/view/:id" component={pages.ProductCreateAndUpdatePage} />
      <AdminRouter path="/admin/product/update/:id" component={pages.ProductCreateAndUpdatePage} />
      <AdminRouter path="/admin/discount" component={pages.DiscountPage} />

      <CommonRouter path="/admin/orders" component={pages.OrdersPage} />
      <CommonRouter path="/admin/order/detail/:id" component={pages.OrderDetailPage} />

      <AdminRouter path="/admin/comments" component={pages.CommentsPage} />
      <AdminRouter path="/admin/users" component={pages.UsersPage} />
      <AdminRouter path="/admin/categories" component={pages.CategoriesPage} />
      <AdminRouter path="/admin/brands" component={pages.BrandsPage} />
      <AdminRouter path="/admin/colors" component={pages.ColorsPage} />
      <AdminRouter path="/admin/payments" component={pages.PaymentsPage} />
      <AdminRouter path="/admin/shipments" component={pages.ShipmentsPage} />
      <AdminRouter path="/admin/slides" component={pages.SlidesPage} />
      <AdminRouter path="/admin/promotions" component={pages.PromotionsPage} />
      <AdminRouter path="/admin/shop-info" component={pages.ShopInfoPage} />
      <AdminRouter path="/admin/suppliers" component={pages.SuppliersPage} />
      <AdminRouter path="/admin/subcategories" component={pages.SubcategoriesPage} />
      <AdminRouter exact path="/admin/inventory/:category" component={pages.InventoryPage} />
      <AdminRouter exact path="/admin/inventory/view-detail/:id" component={pages.InventoryListProductPage} />
      <AdminRouter exact path="/admin/inventory/new-import/product" component={pages.InventoryAddProductPage} />
      <AdminRouter exact path="/admin/inventory/update-import/:id" component={pages.InventoryActionsPage} />
      <AdminRouter exact path="/admin/inventory/:category/detail/:id" component={pages.InventoryDetailPage} />

      <CommonRouter exact path="/admin/report/product" component={pages.ReportProductPage} />
      <CommonRouter exact path="/admin/report/view-product/:id" component={pages.ReportListProductInOrder} />
      <AdminRouter exact path="/admin/report/customer" component={pages.ReportCustomer} />
      <AdminRouter exact path="/admin/report/category" component={pages.ReportCategory} />
      <AdminRouter exact path="/admin/report/view-category/:id" component={pages.ReportDetailProductByCategory} />
      <AdminRouter exact path="/admin/report/brand" component={pages.ReportBrand} />
      <AdminRouter exact path="/admin/report/view-brand/:id" component={pages.ReportDetailProductByBrand} />
      <AdminRouter exact path="/admin/report/supplier" component={pages.ReportSupplierPage} />
      <AdminRouter exact path="/admin/report/view-supplier/:id" component={pages.ReportSupplierInOrder} />
      <AdminRouter exact path="/admin/report/view-customer/:id" component={pages.ReportListOrdersByCustomer} />
      <AdminRouter exact path="/admin/report/business-performance" component={pages.ReportBusinessPerformance} />
      <AdminRouter exact path="/admin/report/seller-performance" component={pages.ReportSellerPerformance} />
      <AdminRouter exact path="/admin/report/seller" component={pages.ReportSellerPage} />

      <SellerRouter exact path="/seller/dashboard" component={pages.DashboardSellerPage} />
      <SellerRouter exact path="/seller/orders" component={pages.OrderSellerPage} />
      <SellerRouter exact path="/seller/info" component={pages.InfoSellerPage} />
    </Switch>
  );
};

function AdminRouter({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        authentication.isAuthentication() && authentication.isAuthorizationAdmin() ?
          <Component {...props} /> :
          <Redirect to="/admin/login" />
      )}
    />
  )
}

function CommonRouter({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        authentication.isAuthentication() && authentication.isAuthorization() ?
          <Component {...props} /> :
          <Redirect to="/admin/login" />
      )}
    />
  )
}

function SellerRouter({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        authentication.isAuthentication() && authentication.isAuthorizationSeller() ?
          <Component {...props} /> :
          <Redirect to="/admin/login" />
      )}
    />
  )
}

export default Routes;
