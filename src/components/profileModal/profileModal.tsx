"use client";
import { useState } from "react";
import Image from "next/image";
import profileImage from "../../../assets/profileIcon.png";
import { signOut } from "next-auth/react";


const ProfileModal = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="relative">
      <button
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200"
        onMouseEnter={() => setOpenModal(true)}
      >
        <Image
          src={profileImage}
          width={40}
          height={40}
          className="rounded-full"
          alt="user profile image"
        />
      </button>

      {openModal && (
        <div
          onMouseLeave={() => setOpenModal(false)}
          className="absolute top-full right-0 me-1 md:me-2 mt-2 w-48 bg-white rounded shadow-md z-10 flex flex-col items-center justify-center"
        >
          <div className="px-4 pt-4 text-center">
            <Image
              src={profileImage}
              width={80}
              height={80}
              className="rounded-full mx-auto"
              alt="profile Image"
            />

            <p className="font-semibold text-black pt-1">Md Karman</p>
          </div>

          <ul className="text-center">
            <li className="px-4 pt-2 cursor-pointer pb-2 text-black hover:bg-gray-100">
              Profile
            </li>
          </ul>

          <div className="border-t border-gray-200 pt-2 pb-4">
            <button
              className="text-sm text-gray-700 hover:text-gray-900"
              onClick={() => {
                signOut();

              }}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileModal;
