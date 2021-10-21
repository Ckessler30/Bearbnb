import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { addSpot } from "../../store/allSpots";
import { addSpotPic, fetchSpot, updateSpot } from "../../store/currentSpot";

function EditSpot() {
  const { spotId } = useParams();
  const spot = useSelector(state => state.currSpot )
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session);
  const [spotName, setSpotName] = useState(spot.name);
  const [spotPrice, setSpotPrice] = useState(spot.price);
  const [description, setDescription] = useState(spot.description);
  const [numBedrooms, setNumBedrooms] = useState(spot.numBedrooms);
  const [numBeds, setNumBeds] = useState(spot.numBeds);
  const [numBaths, setNumBaths] = useState(spot.numBaths);
  const [totalGuests, setTotalGuests] = useState(spot.totalGuests);
  const [pic1, setPic1] = useState(spot.spotPics ? spot.spotPics[0] : null);
  const [pic2, setPic2] = useState(spot.spotPics ? spot.spotPics[1] : null);
  const [pic3, setPic3] = useState(spot.spotPics ? spot.spotPics[2] : null);

  const [errors, setErrors] = useState([]);

  useEffect(()=> {
    dispatch(fetchSpot(spotId))
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSpot = {
      name: spotName,
      price: spotPrice,
      description,
      num_bedrooms: numBedrooms,
      num_baths: numBaths,
      num_beds: numBeds,
      total_guests: totalGuests,
      id: spotId
    };
    const data = await dispatch(updateSpot(newSpot));
    console.log("RIGHT HERE", data);
    if (data && !data.errors) {
      const newPic = await dispatch(
        addSpotPic({ spotId: data.id, imgUrl: pic1 })
      );
      if (pic2) {
        await dispatch(addSpotPic({ spotId: data.id, imgUrl: pic2 }));
      }
      if (pic3) {
        await dispatch(addSpotPic({ spotId: data.id, imgUrl: pic3 }));
      }
      return history.push(`/rooms/${data.id}`);
    }
    if (data.errors) {
      setErrors(data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {errors.length > 0 && errors.map((error) => <p>{error}</p>)}
        <div>
          <h3>Your Listing Name</h3>
          <input
            type="text"
            placeholder="What is the name of your getaway?"
            onChange={(e) => setSpotName(e.target.value)}
            value={spotName}
            required
          />
        </div>
        <div>
          <h3>Price per night</h3>
          <input
            type="number"
            placeholder={"$" + 0}
            onChange={(e) => setSpotPrice(e.target.value)}
            value={spotPrice}
            required
          />
          <h3>Your {spot.spotType} description</h3>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>
        <div>
          <p>How many bedrooms?</p>
          <input
            type="number"
            onChange={(e) => setNumBedrooms(e.target.value)}
            value={numBedrooms}
            required
          />
          <p>How many bathrooms?</p>
          <input
            type="number"
            onChange={(e) => setNumBaths(e.target.value)}
            value={numBaths}
            required
          />
          <p>How many beds?</p>
          <input
            type="number"
            onChange={(e) => setNumBeds(e.target.value)}
            value={numBeds}
            required
          />
          <p>What is the max occupancy?</p>
          <input
            type="number"
            onChange={(e) => setTotalGuests(e.target.value)}
            value={totalGuests}
            required
          />
        </div>
        <div>
          <h3>Add more pictures</h3>
          <input
            type="text"
            placeholder="Picture Url"
            onChange={(e) => setPic1(e.target.value)}
            value={pic1}
          />
          <input
            type="text"
            placeholder="Picture Url"
            onChange={(e) => setPic2(e.target.value)}
            value={pic2}
          />
          <input
            type="text"
            placeholder="Picture Url"
            onChange={(e) => setPic3(e.target.value)}
            value={pic3}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditSpot;