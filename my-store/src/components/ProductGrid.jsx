import { RiHeartLine, RiShoppingCartLine } from "react-icons/ri";
import StarRating from "./StarRating";

export default function ProductGrid({ products, addToWishlist, addToCart, setBuyItem }) {
  return (
    <div className="product-grid">
      {products.map((p) => (
        <div className="product-card" key={p.id}>
          <div className="product-img-wrap">
            <img src={p.image} alt={p.name} className="product-img" />
            <div className="product-hover-actions">
              <button onClick={() => addToWishlist(p)} title="Add to Wishlist">
                <RiHeartLine size={17} />
              </button>
              <button onClick={() => addToCart(p)} title="Add to Cart">
                <RiShoppingCartLine size={17} />
              </button>
            </div>
            <span className="product-category-tag">{p.category}</span>
          </div>

          <div className="product-info">
            <h3 className="product-name">{p.name}</h3>
            <p className="product-desc">{p.desc}</p>
            <StarRating rating={p.rating} />
            <div className="product-price">&#8377;{p.price.toLocaleString()}</div>
            <div className="card-actions">
              <button
                className="card-wishlist-btn"
                onClick={() => addToWishlist(p)}
                title="Add to Wishlist"
              >
                <RiHeartLine size={16} />
              </button>
              <button
                className="card-cart-btn"
                onClick={() => addToCart(p)}
                title="Add to Cart"
              >
                <RiShoppingCartLine size={16} />
              </button>
              <button className="buy-now-btn" onClick={() => setBuyItem(p)}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
