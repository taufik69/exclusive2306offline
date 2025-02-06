import { useEffect, useState } from "react";
import {
  useGetAllCartQuery,
  usePlaceOrderMutation,
} from "../../Features/Api/exclusiveApi";
import { instance } from "../../components/Axios/AxiosInstance";
import axios from "axios";

const Checkout = () => {
  const { data, inLoading, isError } = useGetAllCartQuery();
  const [placeOrder] = usePlaceOrderMutation();
  const totalPrice = data?.data?.cart?.reduce(
    (initalvalue, item) => {
      const { product, quantity } = item;

      initalvalue.totalAmount +=
        parseInt(product.price.replace(/,/g, "")) * quantity;
      initalvalue.user = item.user;
      return initalvalue;
    },
    { totalAmount: 0, user: {} }
  );

  useEffect(() => {
    if (data && data?.data?.cart?.length > 0) {
      // Set user information into localStorage only when valid cart data exists
      const user = data.data.cart[0]?.user;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    }
  }, [data]); // Only run when data changes

  const userInfo = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    firstName: userInfo.FirstName,
    lastName: "Doe",
    email: userInfo.Email_Adress,
    phone: 1234567890,
    address1: "123 Main Street",
    address2: "Apt 4B",
    city: "Dhaka",
    district: "Dhaka",
    postcode: 1207,
    paymentmethod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [loading, setloading] = useState(false);

  const orderinfo = {
    customerinfo: {
      firstName: formData.firstName || "taufik",
      lastName: formData.lastName || "isalm",
      email: formData.email || "example.com",
      phone: formData.phone || 1234567890,
      address1: formData.address1 || "example.com",
      address2: formData.address2 || "example.com",
      city: formData.city || "example.com",
      district: formData.district || "Dhaka",
      postcode: formData.postcode || 1207,
    },
    paymentinfo: {
      paymentmethod: formData.paymentmethod.toLocaleLowerCase(),
    },
  };
  //   handleplaceOrder
  const handleplaceOrder = async () => {
    try {
      setloading(true);
      const response = await placeOrder(orderinfo);
      if (response?.data) {
        window.location.href = response.data.payemntURl;
      }
    } catch (error) {
      console.error("error from handleplaceorder", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="container my-10">
      <div class="font-popins bg-white">
        <div class="max-lg:max-w-xl mx-auto w-full">
          <div class="grid lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 max-lg:order-1 p-6 !pr-0 max-w-4xl mx-auto w-full">
              <div class="text-center max-lg:hidden">
                <h2 class="text-3xl font-bold text-gray-800 inline-block border-b-2 border-gray-800 pb-1">
                  Checkout
                </h2>
              </div>

              <form className="lg:mt-16" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Shipping info
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-8 mt-8">
                    {[
                      "firstName",
                      "lastName",
                      "email",
                      "phone",
                      "address1",
                      "address2",
                      "city",
                      "district",
                      "postcode",
                    ].map((field) => (
                      <div key={field}>
                        <input
                          type={
                            field === "email"
                              ? "email"
                              : field === "phone" || field === "postcode"
                              ? "number"
                              : "text"
                          }
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          placeholder={field.trim()}
                          onFocus={(e) =>
                            e.target.name == "email"
                              ? e.target.value
                              : e.target.name == "firstName"
                              ? e.target.value
                              : (e.target.value = "")
                          }
                          className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-16">
                  <h2 className="text-xl font-bold text-gray-800">
                    Payment method
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 mt-4">
                    <div className="flex items-center">
                      <div
                        class="flex items-center"
                        onClick={() =>
                          setFormData({ ...formData, paymentmethod: "online" })
                        }
                      >
                        {formData.paymentmethod == "online" ? (
                          <input
                            type="checkbox"
                            className="w-5 h-5 mr-3"
                            checked
                          />
                        ) : (
                          <input type="checkbox" className="w-5 h-5 mr-3" />
                        )}

                        <label for="card" class=" flex gap-2 cursor-pointer">
                          <img
                            src="https://readymadeui.com/images/visa.webp"
                            class="w-12"
                            alt="card1"
                          />
                          <img
                            src="https://readymadeui.com/images/american-express.webp"
                            class="w-12"
                            alt="card2"
                          />
                          <img
                            src="https://readymadeui.com/images/master.webp"
                            class="w-12"
                            alt="card3"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        class={
                          formData.paymentmethod == "cash"
                            ? "focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                            : "focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                        }
                        onClick={() =>
                          setFormData({ ...formData, paymentmethod: "cash" })
                        }
                      >
                        Cash on Delivery
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-8">
                  <button
                    type="button"
                    className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                  >
                    Back
                  </button>
                  {loading ? (
                    <button
                      type="submit"
                      className="min-w-[150px] px-6 py-3.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Loading ..
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="min-w-[150px] px-6 py-3.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      onClick={handleplaceOrder}
                    >
                      Confirm Payment
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div class="bg-gray-100 lg:h-screen lg:sticky lg:top-0 lg:max-w-[430px] w-full lg:ml-auto">
              <div class="relative h-full">
                <div class="p-6 overflow-auto max-lg:max-h-[450px] lg:h-[calc(100vh-50px)]">
                  <h2 class="text-xl font-bold text-gray-800">Order Summary</h2>

                  <div class="space-y-6 mt-8">
                    {data?.data?.cart?.map((item) => (
                      <div class="flex gap-4">
                        <div class="w-[124px] h-[100px] flex items-center justify-center p-4 shrink-0 bg-gray-200 rounded-lg">
                          <img
                            src={
                              item.product.image[0] ||
                              "https://readymadeui.com/images/product10.webp"
                            }
                            class="w-full object-cover"
                          />
                        </div>

                        <div class="w-full">
                          <h3 class="text-sm text-gray-800 font-bold">
                            {item.product.name}
                          </h3>
                          <ul class="text-xs text-gray-800 space-y-1 mt-2">
                            <li class="flex flex-wrap gap-4">
                              Size <span class="ml-auto">S</span>
                            </li>
                            <li class="flex flex-wrap gap-4">
                              Quantity{" "}
                              <span class="ml-auto">{item.quantity}</span>
                            </li>
                            <li class="flex flex-wrap gap-4">
                              Total Price{" "}
                              <span class="ml-auto">
                                $
                                {item.quantity *
                                  parseInt(
                                    item.product.price.replace(/,/g, "")
                                  )}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div class="lg:absolute lg:left-0 lg:bottom-0 bg-gray-200 w-full p-4">
                  <h4 class="flex flex-wrap gap-4 text-sm text-gray-800 font-bold">
                    Total{" "}
                    <span class="ml-auto">${totalPrice?.totalAmount || 0}</span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
