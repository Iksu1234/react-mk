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
  });

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
          <input
            id={`r${index}`}
            type="number"
            min={1}
            max={10}
            step={0.1}
            placeholder="rating 1-10"
          ></input>
        </div>
      ))}
      <div>
        <button id="sendBtn" onClick={sendRatings}>
          Send ratings
        </button>
      </div>
    </div>
  );
  function sendRatings() {
    const ratings = [];
    try {
      for (let i = 0; i < jsonData.images.length; i++) {
        const rating = Number(document.getElementById(`r${i}`).value);
        if (rating < 1 || rating > 10 || isNaN(rating)) {
          alert("Ratings must be between 1 and 10");
          return;
        } else {
          ratings.push(rating);
        }
      }
      axios.post("/ratings", ratings, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(ratings);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  }
}

export default ImgBox;
