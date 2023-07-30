"use client";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { FaFeather } from "react-icons/fa";

const SidebarTweetButton = () => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const onClick = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <div onClick={onClick}>
      <div
        className="
        mt-6
        lg:hidden
        rounded-full
        h-14
        w-14
        flex
        items-center
        justify-center
        bg-sky-500
        hover:bg-opacity-80
        transition
        cursor-pointer
        "
      >
        <FaFeather size={24} color="white" />
      </div>

      <div
        className="
      mt-6 
      
      hidden
      lg:block
      px-4
      py-2
      rounded-full
      bg-sky-500
      hover:bg-opacity-90
      cursor-pointer 
      transition
      
      "
      >
        <p
          className="
        text-center
        font-semibold
        text-white
        text-[16px]
        "
        >
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;