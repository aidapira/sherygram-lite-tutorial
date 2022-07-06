import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app, fireDb} from "../firebaseConfig"
import { doc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

function Register() {
    const { loading } = useSelector(store=> store)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    const register = () => {
        const auth = getAuth(app);
        dispatch({type: 'showLoading'})
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userData = {
                    email: user.email,
                    profilePicUrl: '',
                    bio: 'Hi, I am using Sheygram-lite'
                }
                setDoc(doc(fireDb, 'users', user.uid), userData)
                dispatch({type: 'hideLoading'})
                toast.success("Registration Successful")
                navigate('/login')
            })
            .catch((error) => {
                console.log(error)
                dispatch({type: 'hideLoading'})
                toast.error("Something went wrong")
            });
    }

    useEffect(() => {
        if(localStorage.getItem("sheygram-lite-user")) {
            navigate('/login')
        }
    })

    return (
        <div className="h-screen flex justify-between flex-col overflow-x-hidden bg-primary">
            {loading && <Loader />} 
            {/* top corner */}
            <div className="flex justify-start">
                <div className="h-40 bg-white w-96 transform: -skew-x-[25deg] -ml-10 flex items-center justify-center">
                    <h1 className="text-center text-6xl font-semibold skew-x-[25deg] text-primary">SHEY</h1>
                </div>
            </div>

            {/* form */}
            <div className="flex justify-center bg-primary">
                <div className="w-[420px] flex-col space-y-5 card p-10">
                    <h1 className="text-4xl text-gray-400 font-semibold">Get In</h1>
                    <hr />
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email"
                        className="border border-gray-600 h-10 rounded-sm focus:border-gray-500 pl-5 bg-transparent text-gray-400"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        className="border border-gray-600 h-10 rounded-sm focus:border-gray-500 pl-5 bg-transparent text-gray-400"
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="confirm password"
                        className="border border-gray-600 h-10 rounded-sm focus:border-gray-500 pl-5 bg-transparent text-gray-400"
                    />
                    <div className="flex justify-end">
                        <button className="bg-white h-10 rounded-sm text-primary px-10" onClick={register}>Register</button>
                    </div>
                    <hr />
                    <Link to="/login" className="text-[14px] text-gray-400">ALREADY REGISTERED? CLICK HERE TO LOGIN</Link>
                </div>
            </div>

            {/* bottom corner */}
            <div className="flex justify-end">
                <div className="h-40 w-96 bg-white transform: skew-x-[25deg] -mr-10 flex items-center justify-center">
                    <h1 className="text-center text-6xl font-semibold -skew-x-[25deg] text-primary">SHEY</h1>
                </div>
            </div>
        </div>
    )
}

export default Register