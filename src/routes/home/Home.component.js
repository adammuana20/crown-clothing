import Directory from '../../components/directory/Directory.component'
import categoriesData from '../../components/categoriesData'

const Home = () => {
  return (
        <Directory categories={ categoriesData }  />
  );
}

export default Home;