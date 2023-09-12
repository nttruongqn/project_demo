import * as React from 'react';
import { FaStar } from "react-icons/fa";

export interface IRatingStarProps {
    setRatingNumber: (ratingNumber: number) => void;
}

export function RatingStar ({ setRatingNumber }: IRatingStarProps) {
const colors = {
    orange: "#ffba5a",
    grey: "#a9a9a9"
}

const [currentValue, setCurrentValue] = React.useState(0);
const [hoverValue, setHoverValue] = React.useState<any>(undefined);

const handleClick = (value: number) => {
    setCurrentValue(value)
    setRatingNumber(value)
}

const handleMouseOver = (value: number) => {
    setHoverValue(value)
}

const handleMouseLeaver = (undefined: any) => {
    setHoverValue(undefined)
}

const Stars = Array(5).fill(0)
  const styles = {
    Star: {
        display: "flex",
    }
  }

  return (
    <div>
        <div style={styles.Star}>
            {Stars.map((_, index) => {
                return (
                    <FaStar
                    key={index}
                    size={24}
                    style={
                      {
                        marginRight: 10,
                        cursor: "pointer"
                      }
                    }
                    onClick={() => handleClick(index + 1)}
                    onMouseMove={() => handleMouseOver(index + 1)}
                    onMouseLeave={handleMouseLeaver}
                    color={(currentValue || hoverValue) > index ? colors.orange : colors.grey }
                    />
                )
            })}
        </div>
    </div>
  );
}
