import {
  isRouteErrorResponse,
  useRouteError,
  Link
} from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError() as Error;
  console.error(error);

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data}</p>
      <Link to="/">Back to Data Loading</Link>
    </div>
  );
};

export default ErrorPage;
