import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

export const ErrorPage = () => {
  const navigate = useNavigate();

  const error = useRouteError() as Error;

  if (!isRouteErrorResponse(error)) return null;

  return (
    <section id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <button onClick={() => navigate(-1)}>go back</button>
    </section>
  );
};
