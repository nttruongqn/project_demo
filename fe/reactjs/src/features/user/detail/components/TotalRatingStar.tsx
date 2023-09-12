import * as React from 'react';
import { FaRegStar, FaStar, FaStarHalf, FaStarHalfAlt } from 'react-icons/fa';

export interface ITotalRatingStarProps {
    totalNumberRating: number;
}

export function TotalRatingStar({ totalNumberRating }: ITotalRatingStarProps) {
    const [isDecimal, setIsDecimal] = React.useState(false);

    React.useEffect(() => {
        if (totalNumberRating % 1 !== 0) {
            setIsDecimal(true)
        } else {
            setIsDecimal(false)
        }
    }, [totalNumberRating])

    const Stars = Array(Math.floor(totalNumberRating)).fill(0);
    const remainingStars = Array(5 - (Stars.length)).fill(0);
    const hasDecimalRemainingStars = Array(4 - (Stars.length)).fill(0);

    const colors = {
        orange: "#ffba5a",
        grey: "#a9a9a9"
    }

    const styles = {
        Star: {
            display: "flex",
            gap: 4,
        }
    }

    return (
        <div style={styles.Star}>
            {
                Stars.map((item, index) =>
                (

                    <FaStar key={index} color={colors.orange} size={20} />

                ))}

            {isDecimal && <FaStarHalfAlt color={colors.orange} size={20} />}
            {isDecimal ? hasDecimalRemainingStars.map((_, index) => (
                <FaRegStar key={index} color={colors.orange} size={21} />
            )) : remainingStars.map((_, index) =>
            (<FaRegStar key={index} color={colors.orange} size={21} />
            ))}
        </div>

    )
}
