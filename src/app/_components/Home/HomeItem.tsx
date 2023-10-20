export default function HomeItem({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="card w-full h-full m-auto bg-base-100 shadow-xl  ">
      <figure className=" rounded-t-md w-full h-48 sm:h-60 relative overflow-hidden group"></figure>
      <div className="p-3 h-28 sm:h-auto md:card-body">
        <h2 className="card-title">
          <span className="truncate">{title}</span>
        </h2>

        <div className="card-actions justify-between my-2 sm:my-0">{body}</div>
      </div>
    </div>
  );
}
