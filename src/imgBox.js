import React from "react";
import jsonData from "./images.json";
import Zoom from "react-medium-image-zoom";

function ImgBox() {
  return (
    <div className="pageWrapper">
      {jsonData.images.map((image, index) => (
        <div>
          <p className="imageText">{`${image.desc}`}</p>
          <div className="imageWrapper">
            <div key={index} className="img-box">
              {image.imageLinks.map((link, linkIndex) => (
                <Zoom>
                  <img
                    key={linkIndex}
                    src={link.imageLink}
                    alt={`${image.person} - ${image.desc}`}
                  />
                </Zoom>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImgBox;
