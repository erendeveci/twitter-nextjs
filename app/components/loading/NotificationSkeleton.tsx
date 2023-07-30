import React, { Fragment } from "react";
interface LoadingSkeletonProps {
  count: number;
}

const NotificationSkeleton: React.FC<LoadingSkeletonProps> = ({ count }) => {
  return (
    <Fragment>
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="w-full p-6 gap-4  rounded-md  mt-6  border-b-[1px] border-neutral-800"
          >
            <div className="flex animate-pulse flex-row items-center  h-full justify-center  gap-4">
              <div className="flex w-full flex-col  gap-3">
                <div className=" bg-gray-300 h-6 rounded-md "></div>
              </div>
            </div>
          </div>
        ))}
    </Fragment>
  );
};

export default NotificationSkeleton;
