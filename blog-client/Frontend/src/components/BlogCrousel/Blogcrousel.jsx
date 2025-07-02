import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function BlogCarousel({ blogs }) {
  // blogs = [{id, title, image, description}]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="bg-gray-900 py-12 px-6">
      <h2 className="text-center text-4xl font-semibold text-gray-50 mb-10">
        Our Blog
      </h2>

      <Slider {...settings}>
        {blogs.map((blog) => (
          <div key={blog.id} className="px-4">
            <img src={blog.image} alt={blog.title} className="rounded-md mb-4" />
            <h3 className="text-gray-50 font-semibold text-lg mb-2">
              {blog.title}
            </h3>
            <p className="text-gray-400 mb-4">
              {blog.description}
            </p>
          </div>
        ))}
      </Slider>

      <div className="text-center mt-10">
        <Link to="/blog">
          <button className="bg-green-500 text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-green-400">
            Explore More
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BlogCarousel;
