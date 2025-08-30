import LoginModal from './LoginModal'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from "axios";
import toast from 'react-hot-toast';

export default function SignUp() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    //when submitting the signup form => we need to add this (req.body) data to the database
    const onSubmit = async (data) => {
        let userInfo = {
            fullname: data.fullname,
            email: data.email,
            password: data.password
        }
        console.log(userInfo);
        //sending the data to backend with help of api
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, userInfo)  //this userInfo is sent to backend api as req.body formdata
            .then((res) => {   //we send the user data as response from backend api
                console.log(res.data.user);
                localStorage.setItem("User", JSON.stringify(res.data.user))
                toast.success(`SignUp Sucessful Welcome ${res.data.user.fullname}`)
                setTimeout(() => {
                    navigate('/');
                    window.location.reload();
                }, 2000);
            })
            .catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.message)
                }
            })
    }
    return (
        <div className='flex justify-center mt-40'>
            <div>
                <div className="modal-box min-w-[500px] border-2 border-black">

                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" ><Link to='/'>✕</Link></button>
                    </form>

                    <h3 className="font-bold text-lg">Sign Up!</h3>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/*  email*/}
                        <div className='mt-6 space-y-3' >
                            <span className='text-xl text-black font-semibold'>Email</span>
                            <br />
                            <input type="email" placeholder='Enter your email'
                                className='outline-none text-xl bg-transparent ' name='email'
                                {...register("email", { required: true })}
                            />
                            {errors.password && <span className='text-sm text-red-500'>This field is required</span>}
                        </div>

                        {/*  Name*/}
                        <div className='mt-6 space-y-3' >
                            <span className='text-xl text-black font-semibold'>Name</span>
                            <br />
                            <input type="text" placeholder='Enter your Name'
                                className='outline-none text-xl bg-transparent ' name='fullname'
                                {...register("fullname", { required: true })}
                            />
                            {errors.name && <span className='text-sm text-red-500'>This field is required</span>}
                        </div>

                        {/* password */}
                        <div className='mt-6 space-y-2'>
                            <span className='text-xl text-black font-semibold'>Password</span>
                            <br />
                            <input type="password" placeholder='Enter your password'
                                className='outline-none text-xl bg-transparent' name='password'
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span className='text-sm text-red-500'>This field is required</span>}
                        </div>

                        {/* buttons */}
                        <div className='mt-8 flex justify-between items-center'>
                            <button className='btn bg-black text-white hover:bg-white hover:text-black hover:border-black'>Sign Up</button>
                            <p>Already have account? <span className='underline text-blue-500 cursor-pointer' onClick={() => { document.getElementById('my_modal_3').showModal() }}>Login</span></p>
                            <LoginModal />
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
