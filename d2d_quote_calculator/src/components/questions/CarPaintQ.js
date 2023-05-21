import waterspots from "../../assets/images/waterspots.jpg";
import swirls from "../../assets/images/swirls.png";
import scratches from "../../assets/images/scratches.jpg";
import perfPaint from "../../assets/images/camaro.jpg";

function CarPaintQ(props) {
  return (
    <div>
      <h1>
        Select all conditions present that you would like fixed
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
            src={waterspots}
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
            src={swirls}
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
            src={scratches}
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
            src={perfPaint}
            alt="Mclaren car, perfect paint!"
            className="paintImage"
          />
        </label>

        <div className="divider"></div>
      </div>

      <div className="btn-toolbar">
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
          disabled={
            !props.state.waterSpots &&
            !props.state.swirls &&
            !props.state.scratches &&
            !props.state.perfPaint
          }
          type="button"
          className="btn btn-primary mx-auto"
          onClick={() => {
            props.changeQuestion(1, props.question);
          }}
        >
          Next
        </button>

    
      </div>
    </div>
  );
}

export default CarPaintQ;
