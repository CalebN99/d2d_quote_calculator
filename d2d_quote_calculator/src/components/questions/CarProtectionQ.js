import medium from "../../assets/images/medium.jpg";

function CarProtectionQ(props) {
  return (
    <div>
      <h1>Select all items you would like protected</h1>
      <div className="imageSelection">
        <input
          type="checkbox"
          name="wheels"
          id="wheels"
          className="paintSelect input-hidden"
          onChange={props.handleChange()}
          checked={props.state.wheels}
        />
        <label for="wheels" className="aLabel">
          <p className="imageDesc">Wheels</p>
          <img src={medium} alt="Car Wheel" className="paintImage" />
        </label>

        <input
          type="checkbox"
          name="windshield"
          id="windshield"
          className="paintSelect input-hidden"
          onChange={props.handleChange()}
          checked={props.state.windshield}
        />
        <label for="windshield" className="aLabel">
          <p className="imageDesc">Windshield</p>
          <img src={medium} alt="Car windshield" className="paintImage" />
        </label>

        <input
          type="checkbox"
          name="allWindows"
          id="allWindows"
          className="paintSelect input-hidden"
          onChange={props.handleChange()}
          checked={props.state.allWindows}
        />
        <label for="allWindows" className="aLabel">
          <p className="imageDesc">All Windows</p>
          <img src={medium} alt="Car Windows" className="paintImage" />
        </label>

        <input
          type="checkbox"
          name="paint"
          id="paint"
          className="paintSelect input-hidden"
          onChange={props.handleChange()}
          checked={props.state.paint}
        />
        <label for="paint" className="aLabel">
          <p className="imageDesc">Paint</p>
          <img src={medium} alt="Car paint" className="paintImage" />
        </label>

        <input
          type="checkbox"
          name="trimLights"
          id="trimLights"
          className="paintSelect input-hidden"
          onChange={props.handleChange()}
          checked={props.state.trimLights}
        />
        <label for="trimLights" className="aLabel">
          <p className="imageDesc">Trim & Lights</p>
          <img src={medium} alt="Car Trim & Lights" className="paintImage" />
        </label>
        <div className="divider"></div>
      </div>

      <button
        type="button"
        className="btn btn-primary mx-auto"
        onClick={() => {
          props.openModal(true)
        }}
      >
        Submit
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

export default CarProtectionQ;
