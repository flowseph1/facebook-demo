import React from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

function Login() {
    console.log(process.env.FACEBOOK_CLIENT_ID);
    return (
        <div className="grid place-items-center">
            <Image
                src="https://links.papareact.com/t4i"
                height="400"
                width="400"
                objectFit="contain"
                alt=""
            />
            <h1
                onClick={signIn}
                className="p-5 bg-blue-500 rounded-full text-white text-center cursor-pointer"
            >
                Login with FaceBook
            </h1>
        </div>
    );
}

export default Login;
