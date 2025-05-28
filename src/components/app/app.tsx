import MainPage from '../../pages/main-page/main-page';
import { Settings } from '../../const';

type AppProps = {
  settings: typeof Settings;
}

function App({ settings }: AppProps): JSX.Element {
  return (
    <MainPage
      offersCount={settings.OffersCount}
      city={settings.City}
    />
  );
}

export default App;
