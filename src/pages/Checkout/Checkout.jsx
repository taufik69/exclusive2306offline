import { useState } from "react";

const Checkout = () => {
    const [formData, setFormData] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        phone: 1234567890,
        address1: "123 Main Street",
        address2: "Apt 4B",
        city: "Dhaka",
        district: "Dhaka",
        postcode: 1207,
        paymentmethod: "online",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };



    return (
        <div className="container my-10">
            <div class="font-popins bg-white">
                <div class="max-lg:max-w-xl mx-auto w-full">
                    <div class="grid lg:grid-cols-3 gap-6">
                        <div class="lg:col-span-2 max-lg:order-1 p-6 !pr-0 max-w-4xl mx-auto w-full">
                            <div class="text-center max-lg:hidden">
                                <h2 class="text-3xl font-bold text-gray-800 inline-block border-b-2 border-gray-800 pb-1">Checkout</h2>
                            </div>

                            <form className="lg:mt-16">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Shipping info</h2>
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
                                                    type={field === "email" ? "email" : field === "phone" || field === "postcode" ? "number" : "text"}
                                                    name={field}
                                                    value={formData[field]}
                                                    onChange={handleChange}
                                                    placeholder={field.trim()}
                                                    onFocusCapture={(e) => e.target.value = ""}
                                                    className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-16">
                                    <h2 className="text-xl font-bold text-gray-800">Payment method</h2>
                                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                                        <div className="flex items-center">
                                            <div class="flex items-center">
                                                
                                                <label for="card" class=" flex gap-2 cursor-pointer">
                                                    <img src="https://readymadeui.com/images/visa.webp" class="w-12" alt="card1" />
                                                    <img src="https://readymadeui.com/images/american-express.webp" class="w-12" alt="card2" />
                                                    <img src="https://readymadeui.com/images/master.webp" class="w-12" alt="card3" />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                        <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cash on Delivery</button>   
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-4 mt-8">
                                    <button type="button" className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                                        Back
                                    </button>
                                    <button type="submit" className="min-w-[150px] px-6 py-3.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                        Confirm Payment
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div class="bg-gray-100 lg:h-screen lg:sticky lg:top-0 lg:max-w-[430px] w-full lg:ml-auto">
                            <div class="relative h-full">
                                <div class="p-6 overflow-auto max-lg:max-h-[450px] lg:h-[calc(100vh-50px)]">
                                    <h2 class="text-xl font-bold text-gray-800">Order Summary</h2>

                                    <div class="space-y-6 mt-8">
                                        <div class="flex gap-4">
                                            <div class="w-[124px] h-[100px] flex items-center justify-center p-4 shrink-0 bg-gray-200 rounded-lg">
                                                <img src='https://readymadeui.com/images/product10.webp' class="w-full object-contain" />
                                            </div>

                                            <div class="w-full">
                                                <h3 class="text-sm text-gray-800 font-bold">Naruto: Split Sneakers</h3>
                                                <ul class="text-xs text-gray-800 space-y-1 mt-2">
                                                    <li class="flex flex-wrap gap-4">Size <span class="ml-auto">37</span></li>
                                                    <li class="flex flex-wrap gap-4">Quantity <span class="ml-auto">2</span></li>
                                                    <li class="flex flex-wrap gap-4">Total Price <span class="ml-auto">$40</span></li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div class="flex gap-4">
                                            <div class="w-[124px] h-[100px] flex items-center justify-center p-4 shrink-0 bg-gray-200 rounded-lg">
                                                <img src='https://readymadeui.com/images/product11.webp' class="w-full object-contain" />
                                            </div>

                                            <div class="w-full">
                                                <h3 class="text-sm text-gray-800 font-bold">VelvetGlide Boots</h3>
                                                <ul class="text-xs text-gray-800 space-y-1 mt-2">
                                                    <li>Size <span class="float-right">37</span></li>
                                                    <li>Quantity <span class="float-right">2</span></li>
                                                    <li>Total Price <span class="float-right">$40</span></li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div class="flex gap-4">
                                            <div class="w-[124px] h-[100px] flex items-center justify-center p-4 shrink-0 bg-gray-200 rounded-lg">
                                                <img src='https://readymadeui.com/images/product14.webp' class="w-full object-contain" />
                                            </div>

                                            <div class="w-full">
                                                <h3 class="text-sm text-gray-800 font-bold">Echo Elegance</h3>
                                                <ul class="text-xs text-gray-800 space-y-1 mt-2">
                                                    <li>Size <span class="float-right">37</span></li>
                                                    <li>Quantity <span class="float-right">2</span></li>
                                                    <li>Total Price <span class="float-right">$40</span></li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div class="flex gap-4">
                                            <div class="w-[124px] h-[100px] flex items-center justify-center p-4 shrink-0 bg-gray-200 rounded-lg">
                                                <img src='https://readymadeui.com/images/product12.webp' class="w-full object-contain" />
                                            </div>

                                            <div class="w-full">
                                                <h3 class="text-sm text-gray-800 font-bold">Naruto: Split Sneakers</h3>
                                                <ul class="text-xs text-gray-800 space-y-1 mt-2">
                                                    <li class="flex flex-wrap gap-4">Size <span class="ml-auto">37</span></li>
                                                    <li class="flex flex-wrap gap-4">Quantity <span class="ml-auto">2</span></li>
                                                    <li class="flex flex-wrap gap-4">Total Price <span class="ml-auto">$40</span></li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div class="flex gap-4">
                                            <div class="w-[124px] h-[100px] flex items-center justify-center p-4 shrink-0 bg-gray-200 rounded-lg">
                                                <img src='https://readymadeui.com/images/product9.webp' class="w-full object-contain" />
                                            </div>

                                            <div class="w-full">
                                                <h3 class="text-sm text-gray-800 font-bold">VelvetGlide Boots</h3>
                                                <ul class="text-xs text-gray-800 space-y-1 mt-2">
                                                    <li>Size <span class="float-right">37</span></li>
                                                    <li>Quantity <span class="float-right">2</span></li>
                                                    <li>Total Price <span class="float-right">$40</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="lg:absolute lg:left-0 lg:bottom-0 bg-gray-200 w-full p-4">
                                    <h4 class="flex flex-wrap gap-4 text-sm text-gray-800 font-bold">Total <span class="ml-auto">$240.00</span></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Checkout