import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="text-center flex flex-col gap-3">
        <h1 className="font-bold text-gray-700 text-3xl">Oops!</h1>
        <p className="text-xl">Sorry, an unexpected error has occurred.</p>
        <p className="text-lg">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
