import {
  RiCheckLine,
  RiCloseLine,
  RiMapPinLine,
  RiBankCardLine,
  RiTruckLine,
} from "react-icons/ri";
import StarRating from "./StarRating";

export default function BuyPage({
  buyItem,
  address,
  setAddress,
  onPlaceOrder,
  onCancel,
}) {
  return (
    <div className="buy-page">
      <div className="buy-layout">
        <div className="buy-image-wrap">
          <img src={buyItem.image} alt={buyItem.name} />
        </div>
        <div className="buy-details">
          <p className="buy-category">{buyItem.category}</p>
          <h1 className="buy-name">{buyItem.name}</h1>
          <p className="buy-desc">{buyItem.desc}</p>
          <div className="buy-price">&#8377;{buyItem.price.toLocaleString()}</div>
          <StarRating rating={buyItem.rating} />
          <p className="buy-review">"{buyItem.review}"</p>

          <div className="buy-form">
            <label className="form-label">
              <RiMapPinLine size={13} style={{ marginRight: 6 }} />
              Delivery Address
            </label>
            <textarea
              className="buy-address"
              placeholder="Enter your full address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <label className="form-label">
              <RiBankCardLine size={13} style={{ marginRight: 6 }} />
              Payment Method
            </label>
            <div className="payment-options">
              {[
                { label: "Cash on Delivery", icon: <RiTruckLine size={15} /> },
                { label: "UPI", icon: <RiBankCardLine size={15} /> },
                { label: "Card", icon: <RiBankCardLine size={15} /> },
              ].map(({ label, icon }) => (
                <label key={label} className="pay-opt">
                  <input type="radio" name="pay" value={label} />
                  <span className="pay-opt-icon">{icon}</span>
                  <span>{label}</span>
                </label>
              ))}
            </div>

            <div className="buy-actions">
              <button className="place-btn" onClick={onPlaceOrder}>
                <RiCheckLine size={16} style={{ marginRight: 8 }} />
                Place Order
              </button>
              <button className="cancel-btn" onClick={onCancel}>
                <RiCloseLine size={16} style={{ marginRight: 6 }} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
