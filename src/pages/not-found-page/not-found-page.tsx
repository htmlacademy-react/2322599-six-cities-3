import { Helmet } from 'react-helmet-async';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>6 cities. Page not found</title>
      </Helmet>

      <main className="page__main page__main--not-found">
        <div className="container">
          <section className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__text">Page not found</p>
            <a className="not-found__link" href="main.html">Go to main page</a>
          </section>
        </div>
      </main>
    </>
  );
}

export default NotFoundPage;
