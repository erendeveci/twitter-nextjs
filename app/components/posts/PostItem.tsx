import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLike from "@/hooks/useLike";

import { formatDistanceToNowStrict } from "date-fns";

import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";

import Avatar from "@/app/components/avatar/Avatar";
interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}
const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const goToPost = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/posts/${data.id}`);
    },
    [router, data.id]
  );

  const onLike = useCallback(
    async (event: any) => {
      event.stopPropagation();
      if (!currentUser) {
        loginModal.onOpen();
      }

      toggleLike();
    },
    [loginModal, currentUser, toggleLike]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) return null;

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <div
      className="p-5 
                border-b-[1px]
              border-neutral-800
                cursor-pointer
              hover:bg-neutral-900
                transition
              "
    >
      <div onClick={goToPost} className="flex flex-row gap-4 items-center">
        <Avatar userId={data.user.id} />

        <div>
          <div className="flex flex-row gap-2 items-center">
            <p
              onClick={goToUser}
              className="
              text-white
              font-semibold
              cursor-pointer
              hover:underline
            "
            >
              {data.user.name}
            </p>

            <span
              onClick={goToUser}
              className="text-neutral-500
            cursor-pointer
            hover:underline
            hidden
            md:block"
            >
              @{data.user.username}
            </span>

            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>

          <div className="flex flex-row gap-10 mt-3">
            <div className="flex flex-row gap-2 items-center text-neutral-500 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>

            <div
              onClick={onLike}
              className="flex flex-row gap-2 items-center text-neutral-500 cursor-pointer transition hover:text-red-500"
            >
              <LikeIcon color={hasLiked ? "red" : ""} size={20} />
              <p>{data.likedIds.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
