import { Link, NavLink, Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar() {
    const notify = () => toast.error("Working Progress!");

    const navLinks = [
        { link: "MEN", route: "/men" },
        { link: "WOMEN", route: "/women" },
    ];

    return (
        <div className="text-[20px] bc-red w-full text-white">
            <div className="flex flex-col items-center justify-center w-full lg:w-[930px] xl:w-[1130px] 2xl:w-full">
                <div className="flex items-center justify-between w-full p-[1rem] text-[14px] bg-[#e6e7e8] font-grey lg:hidden">
                    <p>Download Our App & Get 10% Additional Cashback On All Orders</p>
                    <div className="flex flex-nowrap ml-[1rem]">
                        <button className="border-2 border-black rounded-[10px] px-[1rem] py-[5px]">
                            OPEN APP
                        </button>
                    </div>
                </div>

                <div className="flex justify-center w-full lg:justify-between 2xl:justify-around">
                    <div className="flex flex-1 w-full text-[14px] font-bold lg:ml-[8rem] xl:ml-[15rem]">
                        {navLinks.map(item => {
                            const { link, route } = item;

                            return (
                                <NavLink key={link} to={route} className={({ isActive }) =>
                                    isActive ? "bg-white font-grey w-1/2 lg:w-min"
                                        : "w-1/2 bc-red text-white border-x-[0.5px] border-black hover:bg-[#df7c7c] lg:w-min"}>
                                    <div className="flex items-center justify-center w-full px-[25px] py-[12px]">
                                        {link}
                                    </div>
                                </NavLink>
                            );
                        })}
                    </div>

                    <Outlet />

                    <div className="text-[13px] items-center hidden lg:flex xl:pr-[3.5rem]">
                        <div className="m-[10px]">
                            <Link to={"/profile/orders"}>TRACK ORDER</Link>
                        </div>
                        <button onClick={notify}>
                            <div className="m-[10px]">
                                CONTACT US
                            </div>
                        </button>
                        <div className="m-[10px]">
                            <button className="button">
                                <a href="https://play.google.com/store/apps/details?id=com.thesouledstore">DOWNLOAD APP</a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                // theme="colored"
            />
        </div>
    );
}
