import smartCar from "../../assets/images/smartcar.png";
import porsche from "../../assets/images/Porsche.png";
import tesla from "../../assets/images/tesla.png";
import truck from "../../assets/images/truck.png";
import van from "../../assets/images/van.png";
import suv from "../../assets/images/suv.png";



function CarSizeQ(props) {
  return (
    <div>
      <h1>What's the size of your vehicle?</h1>
      <div className="imageSelection">
        <input
          type="radio"
          name="paint"
          id="smartCar"
          className="paintSelect input-hidden"
          onChange={() => props.handleRadioButton("smartCar")}
          checked={props.state.vehicleSize === "smartCar"}
        />
        <label for="smartCar" className="aLabel">
          <p className="imageDesc">Smart car</p>
          <img src={smartCar} alt="Low paint defect" className="paintImage" />
        </label>

        <input
          type="radio"
          name="paint"
          id="porsche"
          className="paintSelect input-hidden"
          onChange={() => props.handleRadioButton("porsche")}
          checked={props.state.vehicleSize === "porsche"}
        />
        <label for="porsche" className="aLabel">
          <p className="imageDesc">2 Door Porsche</p>
          <img src={porsche} alt="Medium paint defect" className="paintImage" />
        </label>

        <input
          type="radio"
          name="paint"
          id="tesla"
          className="paintSelect input-hidden"
          onChange={() => props.handleRadioButton("tesla")}
          checked={props.state.vehicleSize === "tesla"}
        />
        <label for="tesla" className="aLabel">
          <p className="imageDesc">Tesla</p>
          <img src={tesla} alt="High paint defect" className="paintImage" />
        </label>

        <input
          type="radio"
          name="paint"
          id="suv"
          className="paintSelect input-hidden"
          onChange={() => props.handleRadioButton("suv")}
          checked={props.state.vehicleSize === "suv"}
        />
        <label for="suv" className="aLabel">
          <p className="imageDesc">SUV</p>
          <img src={suv} alt="High paint defect" className="paintImage" />
        </label>

        <input
          type="radio"
          name="paint"
          id="truck"
          className="paintSelect input-hidden"
          onChange={() => props.handleRadioButton("truck")}
          checked={props.state.vehicleSize === "truck"}
        />
        <label for="truck" className="aLabel">
          <p className="imageDesc">4 Door Truck</p>
          <img src={truck} alt="High paint defect" className="paintImage" />
        </label>

        <input
          type="radio"
          name="paint"
          id="passengerVan"
          className="paintSelect input-hidden"
          onChange={() => props.handleRadioButton("passengerVan")}
          checked={props.state.vehicleSize === "passengerVan"}
        />
        <label for="passengerVan" className="aLabel">
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
