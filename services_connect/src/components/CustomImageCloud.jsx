import { Cloud } from "react-icon-cloud";
import img_1 from "../assets/1.png";
import img_2 from "../assets/2.png";
import img_3 from "../assets/3.png";
import img_4 from "../assets/4.png";
import img_5 from "../assets/5.png";
import img_6 from "../assets/6.png";
import img_7 from "../assets/7.png";
import img_8 from "../assets/8.png";


const images = [img_1, img_2, img_3, img_4, img_5, img_6, img_7, img_8];

const IconCloud = () => {
  const options = {
    clickToFront: 500,
    depth: 0.5, 
    reverse: true,
    wheelZoom: false,
    imageScale: 2,
    initial: [0.07, 0.07],
    outlineColour: "#0000",
    tooltip: "native",
    tooltipDelay: 0,
    dragControl: false,
    noSelect: true,
    maxSpeed: 0.04,
    minSpeed: 0.04,
    freezeActive: false,
    shuffleItems: false,
    
  };

  return (
    <div
    style={{
      width: "1000px",
      height: "1000px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Cloud  options={options}>
      {images.map((image, index) => (
        <a key={index} href="#!" onClick={(e) => e.preventDefault()}>
          <img
            src={image}
            alt={`Custom Icon ${index + 1}`}
            height="80"
            width="80"
            
          />
        </a>
      ))}
    </Cloud>
    </div>
  );
};

export default IconCloud;
