import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faLinkedin,
  faYoutube,
  faGooglePlus,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <>
      <footer className="flex flex-col items-center bg-zinc-100 text-center text-surface dark:bg-neutral-700 dark: mt-6">
        <div className="container p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            <div className="mb-6">
              <h5 className="mb-2.5 font-bold uppercase ">Website</h5>
              <p className="text-left">
                Welcome to Whigsby, your premier destination for all things
                fashion and lifestyle. Discover a curated selection of the
                latest trends in clothing, accessories, and home decor, all
                handpicked to elevate your style. With a focus on quality and
                affordability, Whigsby offers a seamless shopping experience,
                from browsing to checkout. Whether you're updating and adding a
                touch of elegance to your home, Whigsby has you covered. Shop
                now and redefine your style with Whigsby.
              </p>
            </div>

            <div className="mb-6">
              <h5 className="mb-2.5 font-bold uppercase">Products</h5>

              <ul className="mb-0 list-none leading-8">
                <li>
                  <a href="#!"> The providers</a>
                </li>
                <li>
                  <a href="#!">Creativity</a>
                </li>
                <li>
                  <a href="#!">SourceFiles</a>
                </li>
                <li>
                  <a href="#!">Bootstrap 5</a>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h5 className="mb-2.5 font-bold uppercase">Useful links</h5>

              <ul className="mb-0 list-none leading-8">
                <li>
                  <a href="#!"> Your Account</a>
                </li>
                <li>
                  <a href="#!"> Become an Affiliates</a>
                </li>
                <li>
                  <a href="#!"> Shipping Rates</a>
                </li>
                <li>
                  <a href="#!">Help</a>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h5 className="mb-2.5 font-bold uppercase">Contact-us</h5>
              <p>
                <i className="fas fa-home mr-3 leading-8"></i> New Yourk, NY
                2333.US
              </p>
              <p>
                <i className="fas fa-envelope mr-3 leading-8"></i>
                providers@gmail.com
              </p>

              <p>
                <i className="fas fa-phone mr-3 leading-8"></i> +92 90234887471
              </p>

              <p>
                <i className="fas fa-print mr-3 leading-8"></i> +01 355 6557
              </p>
            </div>
          </div>
        </div>

        <div className="w-full bg-black/5 p-4 text-center">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 text-center">
                <ul className="list-unstyled list-inline flex flex-row gap-4 justify-center py-2">
                  <li className="list-inline-item">
                    <a href="#" className="btn-floating btn-sm">
                      <FontAwesomeIcon icon={faFacebook} />
                    </a>
                  </li>

                  <li className="list-inline-item">
                    <a href="#" className="btn-floating btn-sm">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  </li>

                  <li className="list-inline-item">
                    <a href="#" className="btn-floating btn-sm">
                      <FontAwesomeIcon icon={faGooglePlus} />
                    </a>
                  </li>

                  <li className="list-inline-item">
                    <a href="#" className="btn-floating btn-sm ">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                  </li>

                  <li className="list-inline-item">
                    <a href="#" className="btn-floating btn-sm ">
                      <FontAwesomeIcon icon={faYoutube} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <p>
            <p>Copyright @ 2024 Whigsby All Right Reserved.</p>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
