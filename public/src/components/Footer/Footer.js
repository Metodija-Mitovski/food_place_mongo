//styles
import "../../styles/footer/footer.css";

//logo
import logo_white from "../../assets/logo/logo_white.svg"

const Footer = () => {
  return (
    <footer>
      <div className="footer-content-wrapper">
        <img src={logo_white} alt="" />
        <ul className="footer-list">
          <li>breakfast</li>
          <li>lunch</li>
          <li>brunch</li>
          <li>dinner</li>
        </ul>
        <div className="copyright">
          <span>Baby's food place</span>
          <span>copyright &copy; 2021</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
