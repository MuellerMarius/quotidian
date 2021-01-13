import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="App">{t('title')}</div>
    </div>
  );
}

export default App;
