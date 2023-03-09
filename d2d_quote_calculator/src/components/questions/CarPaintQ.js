import low from "../../assets/images/low.png";
import medium from "../../assets/images/medium.jpg";
import high from "../../assets/images/high.webp";

function CarPaintQ(props) {
  return (
    <div>
      <h1>
        Select all conditions present that you would like fxied before coating
      </h1>

      <div className="imageSelection">
        <input
          type="checkbox"
          name="waterSpots"
          id="waterSpots"
          className="input-hidden"
          onChange={props.handleChange()}
          checked={props.state.waterSpots}
        />
        <label for="waterSpots">
          <p className="imageDesc">Water Spots</p>
          <img
            src={low}
            alt="Water Spot defect in car paint"
            className="paintImage"
          />
        </label>

        <input
          type="checkbox"
          name="swirls"
          id="swirls"
          className="input-hidden"
          onChange={props.handleChange()}
        />
        <label for="swirls">
          <p className="imageDesc">Swirls</p>
          <img
            src={medium}
            alt="Swirl defect in car paint"
            className="paintImage"
          />
        </label>

        <input
          type="checkbox"
          name="scratches"
          id="scratches"
          className="input-hidden"
          onChange={props.handleChange()}
        />
        <label for="scratches">
          <p className="imageDesc">Scratches</p>
          <img
            src={medium}
            alt="Scratch defect in car paint"
            className="paintImage"
          />
        </label>

        <input
          type="checkbox"
          name="perfPaint"
          id="perfPaint"
          className="input-hidden"
          onChange={props.handleChange()}
        />
        <label for="perfPaint">
          <p className="imageDesc">Nothing, my paint is Perfect!</p>
          <img
            src={medium}
            alt="Scratch defect in car paint"
            className="paintImage"
          />
        </label>

        <div className="divider"></div>
      </div>

      <button
        disabled={!props.state.waterSpots && !props.state.swirls && !props.state.scratches && !props.state.perfPaint}
        type="button"
        className="btn btn-primary mx-auto"
        onClick={() => {
          props.changeQuestion(1, props.question);
        }}
      >
        Next
      </button>

      <button
        type="button"
        className="btn btn-primary mx-auto"
        onClick={() => {
          props.changeQuestion(-1, props.question);
        }}
      >
        Back
      </button>
    </div>
  );
}

export default CarPaintQ;
