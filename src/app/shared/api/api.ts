const CORS = 'https://cors-anywhere.herokuapp.com/';
// export const baseUrl = 'http://209.145.58.10:8080';
export const baseUrl = 'https://e-commerce-demo-api.sdex.online';

// export const baseUrl = 'https://dev-ecommerce-api.sdex.online';

export const corsBaseUrl = `${CORS} https://dev-ecommerce-api.sdex.online`;

// account
export const userRegister = `${baseUrl}/api/Account/Register`;
export const userLogin = `${baseUrl}/api/Account/Login`;
export const userChangePassword = `${baseUrl}/api/Account/changePasswod`;
export const updatedUserProfile = `${baseUrl}/api/Account/UpdateUser`;

// product
export const ApiProducts = `${baseUrl}/api/Product`;
export const productDetails = `${baseUrl}/api/Product/Details`;
export const getProductByCategory = `${baseUrl}/api/Product/GetProductsByCategory`;
export const getSubCatogiresProducts =`${baseUrl}/api/PoductCategory/GetCategory`
export const getProductByBrand = `${baseUrl}/api/Product/ProductSearch`;
export const getAllProducts = `${baseUrl}/api/Product/ProductSearch`;
export const getAllAds=`${baseUrl}/api/Advertisement/GetAll`

// Order
export const createOrder = `${baseUrl}/api/Order/Create`;
export const listOfOrder = `${baseUrl}/api/Order/GetByUser`;
export const getOrderDetails = `${baseUrl}/api/Order/GetOrderDetails`;

// Shipping Address
export const createShippingAddress = `${baseUrl}/api/ShippingAddress/Create`;
export const getShippingByUserId = `${baseUrl}/api/ShippingAddress/GetByUserId`;
export const removeShippingAddress = `${baseUrl}/api/ShippingAddress/Delete/`;
export const updateShippingAddress = `${baseUrl}/api/ShippingAddress/Update`;

// payment
export const createPayment = `${baseUrl}/api/Payment/MakePaymentAsync`;

// brands
export const getAllBrands = `${baseUrl}/api/Brand/GetFeaturedBrands`;

// slider
export const getSlider = `${baseUrl}/api/Slider/List`;

// Category
export const getAllCategory = `${baseUrl}/api/PoductCategory/GetCategories`;

// saerch items
export const searchItems = `${baseUrl}/api/Product/ProductSearch`

// whishlist
export const createWhishlist = `${baseUrl}/api/UserWish/Create`;
export const getWhishlist = `${baseUrl}/api/UserWish/GetByUser`;
export const removeWhishlist = `${baseUrl}/api/UserWish/Delete`;

// refund on order
export const createRefundOrderAPI = `${baseUrl}/api/Refund/Create`;
export const getAllRefund = `${baseUrl}/api/Refund/GetAll`;
