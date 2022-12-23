import error from '../images/Error404.gif';

const ErrorPage = () => (
  <div className="h-100" id="error-page">
    <div className="d-flex flex-column row blockquote text-center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
    <div className="col d-flex text-center">
      <img src={error} className="rounded-circle mx-auto d-block" alt="Error404" />
    </div>
  </div>
);

export default ErrorPage;
