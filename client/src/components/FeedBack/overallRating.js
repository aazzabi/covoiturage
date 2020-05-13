
import React, {useEffect, useState} from "react";
import  {FaStar } from "react-icons/fa";
import {addRating, countPeopleRating, countRating} from "../../services/FeedBack/FeedBackService";
import jwt_decode from "jwt-decode";

const OverallRating = ({profileOwenrId}) => {
    const [rating , setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [totalRating , setTotalRating] = useState(null);
    const [totalPeopleRating , setTotalPeopleRating] = useState(null);
    const [i , seti] = useState(0);
    var totalCount;
    var totalPeopleCount ;
    useEffect(() => {
        const countt = async () => {
            totalCount= await countRating("overall_rating",profileOwenrId);
            totalPeopleCount = await countPeopleRating("overall_rating",profileOwenrId);
            console.log(totalCount);
            setTotalRating(totalCount.data);
            setTotalPeopleRating(totalPeopleCount.data);
            if (i == 0)
            {

                seti(i+1) ;
            }

        };
        countt();
    });

    async function HandleRate (rateVal)
    {
        const selectedRate = rateVal;
        const LoggedUser = jwt_decode(localStorage.getItem("jwtToken"))._id;
        const data = {
            overall_rating: selectedRate,
        };
        await addRating(LoggedUser,profileOwenrId,data);

        totalCount= await countRating("overall_rating",profileOwenrId);
        totalPeopleCount = await countPeopleRating("overall_rating",profileOwenrId);
        console.log(totalCount);
        setRating(rateVal);
        setTotalRating(totalCount.data);
        setTotalPeopleRating(totalPeopleCount.data);

    }
    return (
        <div>
            {[...Array(5)].map((star,i) =>
            {
                const ratingValue = i+1 ;
                return (
                    <label>

                        <input
                        className="rating"
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => HandleRate(ratingValue)}
                        />

                        <FaStar
                            className={"star"}
                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                            size={20}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />

                    </label>
                )
            })}<br/><strong>Average Rate: {totalRating} Total rates: {totalPeopleRating}  </strong>
        </div>
    )
};
export default OverallRating;


















