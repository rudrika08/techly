import React from "react";
import "./Homepage.css";

function Home() {
  return (
    <div className="container">

      {/* Title Section */}
      <h1 className="title">
       Life Is Poetry — Let’s<br />
        Compose It Together
      </h1>

      {/* Cards Section */}
      <div className="grid-container">
        {/* Image Card 1 */}
        <div className="card-image">
          {/* Provide your own image src here */}
          <img src="https://cdn.prod.website-files.com/66ffb182a2a1dbe73904d0b5/68519f956355379625c99b39_Young-person-typing-with-a-laptop.jpg" alt="Developer Typing" />
        </div>

        {/* Image Card 2 */}
        <div className="card-image">
          {/* Provide your own image src here */}
          <img src="https://cdn.prod.website-files.com/66ffb182a2a1dbe73904d0b5/6851a039c8e2705444340731_stock-photo-173806065.jpg" alt="Circuit Board" />
        </div>

        {/* Text Card 3 */}
        <div className="card-text">
          <div className="icon-container">
         <img src="https://cdn.prod.website-files.com/66ffb182a2a1dbe73904d0b5/6851a2da737a4d4080d06cf6_download.png" alt="Logo" />
          </div>
          <p>Together, we’ll master the intricacies of programming and rise above the challenges of the tech & world</p>
          <button className="explore-button">Explore More</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
