import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StarRatings from 'react-star-ratings'
import { addNewReview } from '../../store/reviews'

import './CreateReview.css'

function CreateReview({spot}) {
    const {user} = useSelector(state => state.session)
    const dispatch = useDispatch()
    const [cleanRating, setCleanRating] = useState(0)
    const [accurRating, setAccurRating] = useState(0)
    const [checkInRating, setCheckInRating] = useState(0)
    const [commRating, setCommRating] = useState(0)
    const [locationRating, setLocationRating] = useState(0)
    const [valueRating, setValueRating] = useState(0)
    const [reviewText, setReviewText] = useState(null)
    const [errors, setErrors] = useState([])
    // console.log(user)
    const changeRating = (newRating, name) => {
        // console.log(newRating)
        // console.log(name)
        if(name === "cleanRating"){
            setCleanRating(newRating)
        }
        if(name === "accurRating"){
            setAccurRating(newRating)
        }
        if(name === "checkInRating"){
            setCheckInRating(newRating)
        }
        if(name === "commRating"){
            setCommRating(newRating)
        }
        if(name === "locationRating"){
            setLocationRating(newRating)
        }
        if(name === "valueRating"){
            setValueRating(newRating)
        }
    }

    const handleSubmit = () => {
        if(cleanRating && accurRating && commRating && locationRating && checkInRating && valueRating && reviewText){
            const newReview = {
                userId: user.id,
                spotId: spot.id,
                cleanRating,
                accurRating,
                commRating,
                locationRating,
                checkInRating,
                valueRating,
                reviewText
            }
            dispatch(addNewReview(newReview))
            setAccurRating(0)
            setCleanRating(0)
            setCommRating(0)
            setLocationRating(0)
            setCheckInRating(0)
            setValueRating(0)
            setReviewText('')
        }else{
            const newErrors = ["Please fill out all ratings and submit a review"]
            setErrors(newErrors)
        }
    }


    return (
        <div>
            <div className="create-rev-rating">
                <p>Cleanliness</p>
            <StarRatings rating={cleanRating} changeRating={changeRating} name="cleanRating" starRatedColor="red" starDimension="20px"/>
            </div>
            <div className="create-rev-rating">
            <p>Accuracy</p>
            <StarRatings rating={accurRating} changeRating={changeRating} name="accurRating" starRatedColor="red" starDimension="20px"/>
            </div>
            <div className="create-rev-rating">
            <p>Check-In</p>
            <StarRatings rating={checkInRating} changeRating={changeRating} name="checkInRating" starRatedColor="red" starDimension="20px"/>
            </div>
            <div className="create-rev-rating">
            <p>Communication</p>
            <StarRatings rating={commRating} changeRating={changeRating} name="commRating" starRatedColor="red" starDimension="20px"/>
            </div>
            <div className="create-rev-rating">
            <p>Location</p>
            <StarRatings rating={locationRating} changeRating={changeRating} name="locationRating" starRatedColor="red" starDimension="20px"/>
            </div>
            <div className="create-rev-rating">
            <p>Value</p>
            <StarRatings rating={valueRating} changeRating={changeRating} name="valueRating" starRatedColor="red" starDimension="20px"/>
            </div>
            <div>
                <h3>Please write your review here</h3>
                {errors.length > 0 && errors.map(error => (
                    <div>
                        <p>{error}</p>
                    </div>
                ))}
                <textarea name="" id="" cols="30" rows="5" onChange={(e)=>setReviewText(e.target.value)} value={reviewText}></textarea>
            </div>
            <button onClick={handleSubmit}>Submit Review</button>
            
        </div>
    )
}

export default CreateReview
