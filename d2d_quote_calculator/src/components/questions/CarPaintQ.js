import low from "../../assets/images/low.png";
import medium from "../../assets/images/medium.jpg";
import high from "../../assets/images/high.webp";

function CarPaintQ(props) {
    return (
        <div>
        <h1>What does your car paint look like?</h1>
        <div className="imageSelection">
          <input
            type="radio"
            name="paint"
            id="low"
            className="input-hidden"
            onChange={() => props.handleRadioButton("low")}
          />
          <label for="low">
            <p className="imageDesc">Low paint defects</p>
            <img src={low} alt="Low paint defect" className="paintImage" />
          </label>

          <input
            type="radio"
            name="paint"
            id="medium"
            className="input-hidden"
            onChange={() => props.handleRadioButton("medium")}
          />
          <label for="medium">
            <p className="imageDesc">Medium paint defects</p>
            <img
              src={medium}
              alt="Medium paint defect"
              className="paintImage"
            />
          </label>

          <input
            type="radio"
            name="paint"
            id="high"
            className="input-hidden"
            onChange={() => props.handleRadioButton("high")}
          />
          <label for="high">
            <p className="imageDesc">High paint defects</p>
            <img src={high} alt="High paint defect" className="paintImage" />
          </label>
          <div className="divider"></div>
        </div>
        <button
          type="button"
          className="btn btn-primary mx-auto"
          onClick={() => {
            props.changeQuestion(-1, props.question);
          }}
        >
          Back
        </button>

        <button
          disabled={props.vehicleSize.length === 0}
          type="button"
          className="btn btn-primary mx-auto"
          onClick={() => {
            props.changeQuestion(1, props.question);
          }}
        >
          Next
        </button>
      </div>
    );
}

export default CarPaintQ