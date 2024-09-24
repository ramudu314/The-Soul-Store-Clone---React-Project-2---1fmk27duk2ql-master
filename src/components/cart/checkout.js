import { useContext, useState } from "react"
import { UserContext } from "../../context/userContext"
import OrederBill from "./orderSectionForCart/OrderBill";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddAddressModal from "../modals/addAddressModal";
import DropDown from "./dropDown";
import CreditCard from "./orderSectionForCart/creditCard";
import NetBanking from "./orderSectionForCart/netbanking";
import Swal from "sweetalert2";
import { Box } from "@mui/material";








export default function Checkout() {
    const navigate = useNavigate();
    const isChecked= useParams();
    const {user}= useContext(UserContext);
    const {itemsInCart} = useContext(UserContext);

    const [isDropdownOpened, setIsDropdownOpened]= useState(false);

    const [paymentMethod, setPaymentMethod]= useState({
        wallet: false,
        card: false,
        netBanking: false,
    });

    const [isModalOpen, setIsModalOpen]= useState(false);
    const[upiId,setUpiId] = useState("");
    const [isCard,setIsCard]= useState(false)

    const [upiWallet, setUpiWallet]= useState({
        paytm: false,
        phonepe: false,
        freecharge:false,
    })
    const handlePay = () => {
        
            Swal.fire("Success", "Payment Successful", "success");

        
        navigate("/");
        itemsInCart.length === 0;
        console.log(itemsInCart.length);
        
    };
    const handleIsCard = ()=>{
        setIsCard((prve) => !prve);
    }

    function handleWallet(event) {
        const id= event.currentTarget.id;

        setUpiWallet((old) => {

            return {...Object.fromEntries(Object.keys(old).map(key => { 
                return [key, (key === id)]
            }))
        }
        })
    }
    function isValid_UPI_ID(upi_Id) {
        let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]/;
        if (upi_Id == null || upi_Id === "") {
            return false;
        }
        if (regex.test(upi_Id)) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="flex justify-center w-full font-bold text-[10px] 
                border-b border-[#eee] px-[5px] py-[1rem] 
                md:text-[14px] lg:px-[1rem]">
                <div className="font-green pointer-events-none">
                    <p className="px-[5px]">MY BAG</p>
                </div>

                <div className="flex items-center font-green">
                    <p className="px-[5px]">- - - - - - - - - -</p>
                    <div className="pointer-events-none">
                        <p className="px-[5px]">ADDRESS</p>
                    </div>
                </div>
                
                <div className="flex items-center font-green">
                    <p className="px-[5px]">- - - - - - - - - -</p>
                    <div className="pointer-events-none">
                        <p className="px-[5px]">PAYMENT</p>
                    </div>
                </div>
            </div>

            <div className="w-full xl:max-w-[1500px] flex flex-col justify-center items-center py-[10px] px-[1rem]">
            
                <div className="w-full flex flex-col items-center md:flex-row md:justify-center md:items-start">

                    <div className=" w-full lg:w-[500px] xl:w-[700px]">
                        
                       


                        <div className="w-full mt-[1rem]">
                            <p>Payment Options</p>

                            <div className="w-full flex items-center justify-between mt-[1rem] bg-[#f2f2f2] p-[10px] sm:p-[1rem]">
                                <div className="flex items-center">
                                    <div className="w-[1.5rem] h-[1.5rem]">
                                        <img src="https://tss-static-images.gumlet.io/icons/tss-money.png" alt="ICON" />
                                    </div>

                                    <p className="ml-[10px] text-[14px]">TSS Money</p>
                                </div>

                                <div className="flex items-center text-[12px] pointer-events-none">
                                    <p>(Balance: ₹ 0.00)</p>
                                    <p className="h-[13px] px-[6px] ml-[8px] border border-[#999] rounded-full"></p>
                                </div>
                            </div>

                            <div className="my-[1rem]">


                                <div>
                                    
                                    <DropDown name={"Pay with UPI" }
                                        isDropdownOpened={isDropdownOpened}
                                        setIsDropdownOpened={setIsDropdownOpened}
                                        paymentMethod={paymentMethod}
                                        setPaymentMethod={setPaymentMethod}
                                        target="wallet">

                                         {
                                            (isDropdownOpened && paymentMethod["wallet"]) &&
                                                <div className="py-[1rem] px-[2rem]">
                                                    <div className="w-full text-[15px]">



                                                    <Box className="pl-[56px] max-[410px]:pl-[20px] pb-[16px] overflow-hidden h-auto transition-all duration-200 ease-in-out ">
                                                <Box>
                                                    <input
                                                        type="text"
                                                        onChange={(e) =>
                                                            setUpiId(
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Enter UPI ID. Eg: 9876543210@upi"
                                                        className="w-[100%] box-border bg-[#fafafa] border-[1px] border-solid border-[#1a1a1d] rounded-[4px] p-[12px] mb-[10px] focus-visible:outline-none h-[41px] text-[14px] "
                                                    />

                                                    {/* bg-[#58585f] text-[#9a9393] */}
                                                    <button
                                                        className={`w-[100%] flex flex-row justify-center items-center mt-[12px] rounded-[4px] text-[14px] font-[600]  p-[12px] border-[1px] [word-spacing:3px] bg-[#1a1a1d] text-[#fff] ${
                                                            isValid_UPI_ID(
                                                                upiId
                                                            )
                                                                ? "bg-[#1a1a1d] text-[#fff] cursor-pointer"
                                                                : "bg-[#58585f] text-[#d4d4d4] cursor-not-allowed"
                                                        } `}
                                                        onClick={() =>
                                                            handlePay()
                                                        }
                                                        disabled={
                                                            !isValid_UPI_ID(
                                                                upiId
                                                            )
                                                        }
                                                    >
                                                        Continue To Pay 
                                                        {/* {paymentDetails.amount} */}
                                                    </button>
                                                </Box>
                                            </Box>
                                                        {/* <div className="w-full flex items-center justify-between py-[10px] px-[1rem] rounded-[4px] cursor-pointer
                                                            hover:bg-[#f2f2f2]"
                                                            id="paytm"
                                                            onClick={(e) => handleWallet(e)}>
                                                            <div className="flex items-center">
                                                                <div className="w-[2.5rem] h-[2.5rem] rounded-full">
                                                                    <img src="https://cdn.icon-icons.com/icons2/730/PNG/512/paytm_icon-icons.com_62778.png" 
                                                                        alt="paytm" className={`w-full h-full rounded-full 
                                                                            ${upiWallet["paytm"] ? "border-[3px] border-[#37bdae]" : "" }`} />
                                                                </div>

                                                                <p className="ml-[1rem]">Paytm</p>
                                                            </div>
                                                            
                                                            <div className="flex items-center ">
                                                                <input type="radio" name="upi" value="paytm"
                                                                    className="w-[1rem] h-[1rem] cursor-pointer" 
                                                                    onClick={(e) => handleWallet(e)}
                                                                    defaultChecked={upiWallet["paytm"]} />
                                                            </div>
                                                        </div> */}


                                                        {/* <div className="w-full flex items-center justify-between py-[10px] px-[1rem] rounded-[4px] cursor-pointer
                                                            hover:bg-[#f2f2f2]"
                                                            id="phonepe"
                                                            onClick={(e) => handleWallet(e)}>
                                                            <div className="flex items-center">
                                                                <div className="w-[2.5rem] h-[2.5rem] rounded-full">
                                                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEVfJZ////9ZF5ycg8D39PpfH6BcIJ5XEZu1n9F2SKxVDJpkK6Lx7PfCsdlRAJhbHJ2GYrXOv+Hr5fP9+/5jLqGBWbLSxeNoM6RtOqdzQ6v08Picf8J8Ua9uPKiNarnFtNrl3e6njsjaz+eVdr7XzOa4pNOvmM3f1uumjcjm3u+/q9fDstlxRKjIudyXeb/FCSTHAAAEc0lEQVR4nO3d63LaOhSGYVlxJSJAAgzlZMIpDYVs9v1f3jbZmaTFWspM4mJp9Xv/dSad8TMhliULWwiEEEIIIYQQQgghhBBCCCHEI1XV9jH8uZS04r4sZ8a4tg/lT6SMnW93i6Io8t75wTIzKmlMeRpl740Gtu2Dai6l7Ww/zLOr+myIpnw6FNe8S9+ZEO2jT/fSmgVRbklglnU4EM1zQJgtTdvH9/XcPiTMJrLtA/x65kdIWMwZjIv2KUTsTRlcw4WJG82BeBcishgWw0QWFzfmIUTcMhgzPiA+6LaPr4HMwHtt+to9g2FR6DJAzGcMhkUhy9oE6r2RYDBmCLkKEHccTqjCzRc0kcdUyokRTWQxlRKqGyBymEpVRHGgiQMOY4ZQjiYWKw5jRkX8ThIXLMYMoSxN3DgeRD0kiUMWJ9RqNtUniSf+xJ9ciB2SuOcwlRIhYlGyGBZDKxv5jMUJNUQcSSZEs6SIj0zONoHFGx5TKREi8phKVekJtXjDYypVJSfUb5HDXamX5IxYvCnuWUylRGDxhsVdqZfknFjZ2HA52wg3Jogs7kq95NTRT4xuKiXtt88lNbF4s9VXP2hbvZ9q9r380/mF2fWPHX+M2xsoHTm0NVt7dxvN+TbCbN3WFNnS60sN97Ml4u2EGX/hXTvXrDcUDts52dxQ2NL13A2FI/bCYztCw16o6WVsJkI15S4UgfuCTIRqGtgvw0IoXBnYL9NkLY34F+K3c2h/XlPlLa5RKbtadt7yf2gPTx2qk180/P2nttNW1xmV1K8Z1/Meb99qIrPyC5e//4947kx1CSH5R6Tu/cKWphIfB2EtCKMLwloQRheEtSCMLghrQRhdENaCMLogrAVhdEFYC8LogrAWhNEFYS0IowvCWhBGFyGk96cnJ3T+LfgHPkLt34F/JI83OaH1b8DPx9Rd6uSE1Ea3ko2Q2ujWoTYxJyeUxLdgyR1NyQnJL2CUxH6Y5IRCEPvcqGdCpSe01AOF7vyXNekJDbGLKysGXmJ6Qkd+Vbt48HxQlZmlJhSWEmbZs7a/PG1HKWnstOO/kI1aGNo1fJ5MtTVGG2N195/9M/0UsIiFMvjEyyzf7Nb9zvp82IR33kYsFKqRTcMxC00j31CIWahWTeyKjlkYeiAUE6ESDfwSoxYKHXwMNAchNdNnJFTzL39OIxcKGX47AgOhsFvuwg9eHcBB+FViAkJh/+UuFHpOPIKGjVA42fn0qJGGsJpnrD778JNUhELZ8Sk0X1ycBokLL2tNen/2Lsbkm87E2nnyQnF5lpQsl/3dcfH6V5n3Nrv13WBqtUtwNZHo8qpAqcT4Urc6BVX/+n/ZjY3wNaWuX9jJTVgPwvSDMP0gTD8I0w/C9IMw/SBMPwjTj3pqHx+hIJ6dxUhI7CpmJHT+BVNGQmKbGCeh6voWxTkJhfO9smQSzUP2mshNH6+BPF6k+56yk2Hx6404Nq+3es9ZMx+8NeMHvKTcW6z+BhFCCCGEEEIIIYQQQgghhBBCCCH01/UfYcNS0Fh2weUAAAAASUVORK5CYII=" 
                                                                        alt="phonepe" className={`w-full h-full rounded-full 
                                                                            ${upiWallet["phonepe"] ? "border-[3px] border-[#37bdae]" : "" }`} />
                                                                </div>

                                                                <p className="ml-[1rem]">PhonePe</p>
                                                            </div>
                                                            
                                                            <div className="flex items-center ">
                                                                <input type="radio" name="upi" value="phonepe"
                                                                    className="w-[1rem] h-[1rem] cursor-pointer" 
                                                                    onClick={(e) => handleWallet(e)}
                                                                    defaultChecked={upiWallet["phonepe"]} />
                                                            </div>
                                                        </div> */}


                                                        {/* <div className="w-full flex items-center justify-between py-[10px] px-[1rem] rounded-[4px] cursor-pointer
                                                            hover:bg-[#f2f2f2]"
                                                            id="freecharge"
                                                            onClick={(e) => handleWallet(e)}>
                                                            <div className="flex items-center">
                                                                <div className="w-[2.5rem] h-[2.5rem] rounded-full">
                                                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2xFVvPRzTh4k1egOU2pJbiedczBZm-JQ7_w&usqp=CAU" 
                                                                        alt="freecharge" className={`w-full h-full rounded-full 
                                                                            ${upiWallet["freecharge"] ? "border-[3px] border-[#37bdae]" : "" }`} />
                                                                </div>

                                                                <p className="ml-[1rem]">FreeCharge</p>
                                                            </div>
                                                            
                                                            <div className="flex items-center ">
                                                                <input type="radio" name="upi" value="freecharge"
                                                                    className="w-[1rem] h-[1rem] cursor-pointer" 
                                                                    onClick={(e) => handleWallet(e)}
                                                                    defaultChecked={upiWallet["freecharge"]} />
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </div>
                                        } 
                                        
                                    </DropDown>
                                </div> 
                                <div style={{ marginTop:"20px", marginBottom:"10px"}}> Other Options 
                                </div>
                                 

                            
                                <div>                                    
                                    <DropDown 
                                    name={"Credit & Debit Cards" }
                                        isDropdownOpened={isDropdownOpened}
                                        setIsDropdownOpened={setIsDropdownOpened}
                                        paymentMethod={paymentMethod}
                                        setPaymentMethod={setPaymentMethod}
                                        target="card">
                                            
                                            {
                                                (isDropdownOpened && paymentMethod["card"]) &&
                                                <CreditCard />
                                            }

                                    </DropDown>
                                </div>
                                
                            


                                 {/* <div>
                                    <DropDown name={"Netbanking" }
                                        isDropdownOpened={isDropdownOpened}
                                        setIsDropdownOpened={setIsDropdownOpened}
                                        paymentMethod={paymentMethod}
                                        setPaymentMethod={setPaymentMethod}
                                        target="netBanking">

                                            {
                                                (isDropdownOpened && paymentMethod["netBanking"]) &&
                                                <NetBanking />
                                            }

                                    </DropDown>
                                </div>  */}
                            </div>
                        </div>
                        {
                            isModalOpen && <AddAddressModal isOpen={isModalOpen} 
                                onClose={() => setIsModalOpen(false)}
                                heading={"Edit Address"} />
                        }
                    </div>

                    <div className="w-full mt-[1rem] md:w-[23rem] md:ml-[2rem] md:mt-[1px]">
                        <OrederBill isChecked= {isChecked.true === "true"} />

                        <Link to={"/"}>
                            <button onClick={()=>{
                                handlePay();
                            }}  className="w-full mt-[1rem] py-[8px] font-green text-[13px] font-bold border border-[#117a7a] 
                                duration-500
                                hover:bg-[#117a7a] hover:text-white md:border md:rounded-[5px]">
                                CONFIRM ORDER
                                
                            </button>
                            
                        </Link>
                    </div>
                </div>
                
            </div>
        </div>
    )
}  