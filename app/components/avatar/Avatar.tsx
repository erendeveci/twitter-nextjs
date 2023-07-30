import React, { useCallback } from "react";
import { useRouter } from "next/navigation";

import useUser from "@/hooks/useUser";
import Image from "next/image";
interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter();

  const { data: fetchedUser } = useUser(userId);

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${userId}`;

      router.push(url);
    },
    [router, userId]
  );

  return (
    <div
      className={`
     ${hasBorder ? "border-2 border-black" : ""}
     ${isLarge ? "h-32" : "h-12"}
     ${isLarge ? "w-32" : "w-12"}
     rounded-full
     hover:opacity-60
     transition
     cursor-pointer
     relative
    bg-slate-400
    `}
    >
      <Image
        fill
        src={fetchedUser?.profileImage || "/images/placeholder.png"}
        alt="Avatar"
        style={{
          objectFit: "cover",
          borderRadius: "100px",
        }}
        onClick={onClick}
      />
    </div>
  );
};

export default Avatar;
