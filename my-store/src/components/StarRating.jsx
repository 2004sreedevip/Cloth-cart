import { RiStarFill, RiStarLine } from "react-icons/ri";

export default function StarRating({ rating }) {
  const filled = Math.round(parseFloat(rating));

  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((s) =>
        s <= filled ? (
          <RiStarFill key={s} className="star filled" />
        ) : (
          <RiStarLine key={s} className="star" />
        )
      )}
      <span className="rating-num">{rating}</span>
    </div>
  );
}
