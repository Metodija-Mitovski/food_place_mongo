import config from "../../config/config";

//components
import Recipes from "../../components/Recipes/Recipes";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

//styles
import "../../styles/recipes/recipes.css";

const Home = () => {
    return (<>
        <Header />
        <div id="home">
            <Recipes
                section_title="fresh &#38; new"
                url={`${config.api.recipes}/latest`}
            />
            <Recipes
                section_title="most popular recipes"
                url={`${config.api.recipes}/top-rated`}
            />
        </div>
        <Footer />
    </>

    );
};

export default Home;
