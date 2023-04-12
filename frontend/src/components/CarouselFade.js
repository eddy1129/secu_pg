import Carousel from "react-bootstrap/Carousel";
import classes from "./CarouselFade.module.css";
import image1 from "../assets/carousel-img-1.png";
import image2 from "../assets/carousel-img-2.png";
import image3 from "../assets/carousel-img-3.png";

function CarouselFade() {
  return (
    <Carousel fade interval={1000} className={classes.carousel}>
      <Carousel.Item>
        <img className="d-block w-100" src={image1} alt="First slide" />
        <Carousel.Caption>
          <h3>Build your career with iBookStore</h3>
          <p>Unlock knowledge for your future.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={image2} alt="Second slide" />
        <Carousel.Caption>
          <h3>Unlimited resources</h3>
          <p>Explore books and workshops developed by experienced engineers</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={image3} alt="Third slide" />
        <Carousel.Caption>
          <h3>Join our community</h3>
          <p>
            Ask your questions and share your ideas. We are here to help you.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFade;