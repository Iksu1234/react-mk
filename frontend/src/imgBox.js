import React, { useState, useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import axios from "axios";

function ImgBox() {
  const [jsonData, setJsonData] = useState({ images: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/images");
        setJsonData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
