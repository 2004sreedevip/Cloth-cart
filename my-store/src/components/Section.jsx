import { RiCloseLine } from "react-icons/ri";

export default function Section({ title, subtitle, emptyIcon, items, onRemove, onBuy }) {
  return (
    <div className="page-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <span className="section-sub">{subtitle}</span>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">{emptyIcon}</div>
          <p>Nothing here yet. Keep browsing!</p>
        </div>
      ) : (
        <div className="product-grid">
          {items.map((i) => (
            <div className="product-card" key={i.id}>
              <div className="product-img-wrap">
                <img src={i.image} alt={i.name} className="product-img" />
                <span className="product-category-tag">{i.category}</span>
              </div>
              <div className="product-info">
                <h3 className="product-name">{i.name}</h3>
                <p className="product-price">&#8377;{i.price?.toLocaleString()}</p>
                <div className="section-card-actions">
                  {onBuy && (
                    <button className="buy-now-btn" onClick={() => onBuy(i)}>
                      Buy Now
                    </button>
                  )}
                  <button className="remove-btn" onClick={() => onRemove(i.id)}>
                    <RiCloseLine size={14} style={{ marginRight: 4 }} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
