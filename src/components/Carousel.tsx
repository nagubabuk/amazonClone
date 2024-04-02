import Slider, { CustomArrowProps } from "react-slick"

import { Link } from "react-router-dom";

interface CustomArrowPropsWithDirection extends CustomArrowProps {
  direction: 'prev' | 'next';
}

const CustomArrow: React.FC<CustomArrowPropsWithDirection> = ({ onClick, direction }) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    onClick && onClick(event);
  };

  return (
    <div
      className={`absolute top-1/2 ${direction === 'prev' ? 'left-0' : 'right-0'} transform -translate-y-1/2`}
      onClick={handleClick}
      style={{ zIndex: 999, fontSize:30,padding:10}} >
      {direction === 'prev' ? '<' : '>'}
    </div>
  );
};
const Carousel: React.FC = () => {
  const imagesData=[
    {
      link:'products/kitchen',
      info:'kitchen',
      path: process.env.PUBLIC_URL + "/images/carouselimg1.jpg"
    },
    {
      link: 'products/kitchen',
      info: 'home furniture',
      path: process.env.PUBLIC_URL + "/images/carousel2houseHolds.jpg"
    },
    {
      link: 'products/kitchen',
      info: 'makeup products img',
      path: process.env.PUBLIC_URL + "/images/carousel3makeup.jpg"
    },
    {
      link: 'products/kitchen',
      info: 'floor cleaner img',
      path: process.env.PUBLIC_URL + "/images/carousel4floorcleaner.jpg"
    }
  ]
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomArrow direction="prev" />,
    nextArrow: <CustomArrow direction="next" />,
  };

  return (
    <div>
      <Slider {...settings}>
        {imagesData.map((image, index) => (
          <div key={index}>
            <Link to={image.link}>
              <img style={{ height: '50vh', width: '100vw'}} src={image.path} alt={image.info} />
            </Link>
          </div>
        ))}
      </Slider>
    
    </div>
  )
}

export default Carousel
