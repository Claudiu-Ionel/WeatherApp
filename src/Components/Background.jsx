import { useState, useEffect } from "react";

const backgroundImgArray = [
  {
    id: 1,
    path: "./images/Clouds/jason-blackeye-ap3LXI0fPJY-unsplash.jpg",
    authorName: "Jason Blackeye",
    authorPath: "https://unsplash.com/@jeisblack",
    locationName: "Greece",
    locationPath: "https://goo.gl/maps/mrPxXDfNy9JYEPnT8",
    category: ["Clouds"],
  },
  {
    id: 2,
    path: "./images/Clear/niklas-tidbury-r2vxqvKXng8-unsplash.jpg",
    authorName: "Niklas Tidbury",
    authorPath: "https://unsplash.com/@ntidbury",
    locationName: "Plattenbödeli, Rüte, Switzerland",
    locationPath: "https://goo.gl/maps/qAxVzTfTrcBR4ANJ9",
    category: ["Clear"],
  },
  {
    id: 3,
    path: "./images/Snow/jessica-fadel-SH4GNXNj1RA-unsplash.jpg",
    authorName: "Jessica Fadel",
    authorPath: "https://unsplash.com/@jessicalfadel",
    locationName: "Thornton, United States",
    locationPath: "https://goo.gl/maps/o1Cvb1HYSpC2p1r78",
    category: ["Snow"],
  },
  {
    id: 4,
    path: "./images/RainDrizzle/jessica-knowlden-uUySeXRQqA4-unsplash.jpg",
    authorName: "Jessica Knowlden",
    authorPath: "https://unsplash.com/@mybibimbaplife",
    locationName: "Chicago, United States",
    locationPath: "https://goo.gl/maps/C6xB3DEhLy9CeeA86",
    category: ["Rain"],
  },
  {
    id: 5,
    path: "./images/RainDrizzle/kelly-sikkema-BcErkVtF0as-unsplash.jpg",
    authorName: "Kelly Sikkema",
    authorPath: "https://unsplash.com/@kellysikkema",
    locationName:
      "Arnold Arboretum of Harvard University, Boston, United States",
    locationPath: "https://goo.gl/maps/jobBrc3Ya3bURHTs6",
    category: ["Drizzle"],
  },
  {
    id: 6,
    path: "./images/Thunderstorm/cooper-baumgartner-1N8iqSsn7ls-unsplash.jpg",
    authorName: "Cooper Baumgartner",
    authorPath: "https://unsplash.com/@cooper_baumgartner",
    locationName: "Indiana, United States",
    locationPath: "https://goo.gl/maps/ruNw6PeqcMrfMGid8",
    category: ["Thunderstorm"],
  },
  {
    id: 7,
    path: "./images/Mist/de-wet-cilliers-DKLD8DG_W2M-unsplash.jpg",
    authorName: "De wet Cilliers",
    authorPath: "https://unsplash.com/@heydewet",
    locationName: "Magoebaskloof",
    locationPath: "https://goo.gl/maps/SibwXcTaNGzDCjJbA",
    category: ["Mist"],
  },
];

function Background() {
  let [bgCategory, setBgCategory] = useState("Snow");

  return (
    <>
      {backgroundImgArray.map((i) => {
        let {
          id,
          path,
          authorName,
          authorPath,
          locationName,
          locationPath,
          category,
        } = i;
        if (i.category == bgCategory) {
          return (
            <div
              className={
                bgCategory == "Clear"
                  ? "bg bgClear"
                  : bgCategory == "Clouds"
                  ? "bg bgClouds"
                  : bgCategory == "Mist"
                  ? "bg bgMist"
                  : bgCategory == "Rain"
                  ? "bg bgMist"
                  : bgCategory == "Drizzle"
                  ? "bg bgDrizzle"
                  : bgCategory == "Snow"
                  ? "bg bgSnow"
                  : bgCategory == "Thunderstorm"
                  ? "bg bgThunderstorm"
                  : "bg"
              }
              key={i.id}
            >
              <section className="bgInfo">
                <a href={i.authorPath} className="bgAuthorname">
                  Author: {i.authorName}
                </a>
                <a href={i.locationPath} className="bglocation">
                  Location: {i.locationName}
                </a>
              </section>
            </div>
          );
        }
      })}
    </>
  );
}

export default Background;
