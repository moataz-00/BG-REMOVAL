import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
    const { openSignIn } = useClerk(); // Access Clerk methods
    const { isSignedIn, user } = useUser(); // Call useUser as a hook

    return (
        <div className="flex items-center justify-between mx-4 py-3 lg:mx-44">
            {/* Logo */}
            <Link to="/">
                <img className="w-32 sm:w-44" src={assets.logo} alt="Logo" />
            </Link>

            {/* Sign-In or User Button */}
            {isSignedIn ? (
                <div>
                    <UserButton />
                </div>
            ) : (
                <button
                    onClick={() => openSignIn({})}
                    className="bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 text-sm rounded-full"
                >
                    Get Started <img className="w-3 sm:w-4" src={assets.arrow_icon} alt="Arrow Icon" />
                </button>
            )}
        </div>
    );
};

export default Navbar;