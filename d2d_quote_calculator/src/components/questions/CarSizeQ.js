import smartCar from "../../assets/images/smartcar.png";
import porsche from "../../assets/images/Porsche.png";
import tesla from "../../assets/images/tesla.png";
import truck from "../../assets/images/truck.png";
import van from "../../assets/images/van.png";

function CarSizeQ(props) {
  return (
    <div>
      <h1>What's the size of your vehicle?</h1>
      <div className="imageSelection">
        <input
          type="radio"
          name="paint"
          id="smartCar"
          className="input-hidden"
          onChange={() => props.handleRadioButton("smartCar")}
        />
        <label for="smartCar">
          <p className="imageDesc">Smart car</p>
          <img src={smartCar} alt="Low paint defect" className="paintImage" />
        </label>

        <input
          type="radio"
          name="paint"
          id="porsche"
          className="input-hidden"
          onChange={() => props.handleRadioButton("porsche")}
        />
        <label for="porsche">
          <p className="imageDesc">2 Door Porsche</p>
          <img src={porsche} alt="Medium paint defect" className="paintImage" />
        </label>

        <input
          type="radio"
          name="paint"
          id="tesla"
          className="input-hidden"
          onChange={() => props.handleRadioButton("tesla")}
        />
        <label for="tesla">
          <p className="imageDesc">Tesla</p>
          <img src={tesla} alt="High paint defect" className="paintImage" />
        </label>

        <input
          type="radio"
          name="paint"
          id="truck"
          className="input-hidden"
          onChange={() => props.handleRadioButton("truck")}
        />
        <label for="truck">
          <p className="imageDesc">4 Door Truck</p>
          <img src={truck} alt="High paint defect" className="paintImage" />
        </label>

        <input
          type="radio"
          name="paint"
          id="van"
          className="input-hidden"
          onChange={() => props.handleRadioButton("passengerVan")}
        />
        <label for="van">
          <p className="imageDesc">Passenger Van</p>
          <img src={van} alt="High paint defect" className="paintImage" />
        </label>
        <div className="divider"></div>
      </div>

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

export default CarSizeQ;
