import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

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
            <Link className="not-found__link" to={AppRoute.Root}>
              Go to main page
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}

export default NotFoundPage;
