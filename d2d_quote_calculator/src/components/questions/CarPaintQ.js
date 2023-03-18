import low from "../../assets/images/low.png";
import medium from "../../assets/images/medium.jpg";
import high from "../../assets/images/high.webp";

function CarPaintQ(props) {
  return (
    <div>
      <h1>
        Select all conditions present that you would like fixed before coating
      </h1>

      <div className="imageSelection">
        <input
          type="checkbox"
          name="waterSpots"
          id="waterSpots"
          className="paintSelect input-hidden"
          onChange={props.handleChange()}
          checked={props.state.waterSpots}
        />
        <label for="waterSpots" className="aLabel">
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
          className="paintSelect  input-hidden"
          onChange={props.handleChange()}
          checked={props.state.swirls}
        />
        <label for="swirls" className="aLabel">
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
          className="paintSelect input-hidden"
          onChange={props.handleChange()}
          checked={props.state.scratches}
        />
        <label for="scratches" className="aLabel">
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
          className="paintSelect input-hidden"
          onChange={props.handleChange()}
          checked={props.state.perfPaint}
        />
        <label for="perfPaint" className="aLabel">
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
