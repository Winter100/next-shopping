import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <div className="m-auto">
      <div className="my-4">
        <div className="mx-auto mt-14">
          <h2 className="sr-only">Loading</h2>
          <div className=" grid grid-cols-2 px-2 gap-2 md:grid-cols-3 mt-1 m-auto">
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="mb-4 md:mb-2 w-full md:w-full sm:h-full m-auto"
                >
                  <Skeleton height={290} />
                  <Skeleton count={3} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
