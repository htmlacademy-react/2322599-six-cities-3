import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function ServerErrorPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>6 cities. Server error</title>
      </Helmet>

      <main className="page__main">
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h1>500 Server Error</h1>
          <p>Sorry, the server is temporarily unavailable.</p>
          <p>Please try again later or contact support.</p>
          <Link to={AppRoute.Root} className="button" style={{ marginTop: '20px' }}>
            Go to main page
          </Link>
        </div>
      </main>
    </>
  );
}

export default ServerErrorPage;
