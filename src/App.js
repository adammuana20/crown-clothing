import Directory from './components/directory/Directory.component';
import categoriesData from './components/categoriesData'

const App = () => {
  return (
    <Directory categories={ categoriesData }  />
  );
}

export default App;