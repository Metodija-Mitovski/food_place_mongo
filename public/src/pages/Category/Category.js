import { useParams } from "react-router-dom";
import config from "../../config/config";

//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Recipes from "../../components/Recipes/Recipes";

const Category = () => {
    const { category } = useParams();

    return (<>
        <Header />
        <Recipes
            section_title={category}
            url={`${config.api.recipes}/${category}`}
        />
        <Footer />
    </>

    );
};

export default Category;
