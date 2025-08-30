import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios'
import toast from 'react-hot-toast'

export default function LoginModal() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password
    }
    // console.log(userInfo);
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, userInfo)  //here data is sending to backend and then to database
      .then((res) => {
        console.log(res.data.user);
        localStorage.setItem("User", JSON.stringify(res.data.user))//here data from backend response is added to localstorage
        document.getElementById('my_modal_3').close();
        toast.success(`Login Successful Welcome Back ${res.data.user.fullname}`);
        setTimeout(() => {
          navigate("/")
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data.message);
          toast.error(err.response.data.message)
        }
      })
  }
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">

          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form >

          <h3 className="font-bold text-lg">Login!</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/*  email*/}
            <div className='mt-6 space-y-3' >
              <span className='text-xl text-black font-semibold'>Email</span>
              <br />
              <input
                type="email" placeholder='Enter your email'
                className='outline-none text-xl bg-transparent ' name='email'
                {...register("email", { required: true })}
              />
              {errors.password && <span className='text-sm text-red-500'>This field is required</span>}
            </div>
            {/* password */}
            <div className='mt-6 space-y-2'>
              <span className='text-xl text-black font-semibold'>Password</span>
              <br />
              <input
                type="password" placeholder='Enter your password'
                className='outline-none text-xl bg-transparent' name='password'
                {...register("password", { required: true })}
              />
              {errors.password && <span className='text-sm text-red-500'>This field is required</span>}
            </div>
            {/* buttons */}
            <div className='mt-8 flex justify-between items-center'>
              <button className='btn bg-black text-white hover:bg-white hover:text-black' type='submit'>Login</button>
              <p>Not registered? <span className='underline text-blue-500 cursor-pointer'><Link to="/signup">Sign up</Link></span></p>  {/* used link to redirect to that route*/}
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}