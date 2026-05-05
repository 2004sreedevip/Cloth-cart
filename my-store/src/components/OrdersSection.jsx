import { RiShoppingBagLine, RiCheckLine } from "react-icons/ri";

export default function OrdersSection({ orders }) {
  return (
    <div className="page-section">
      <div className="section-header">
        <h2 className="section-title">Your Orders</h2>
        <span className="section-sub">
          {orders.length} order{orders.length !== 1 ? "s" : ""}
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <RiShoppingBagLine size={48} />
          </div>
          <p>No orders yet. Start shopping!</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((o) => (
            <div key={o.orderId} className="order-card">
              <img src={o.image} alt={o.name} />
              <div className="order-info">
                <p className="order-name">{o.name}</p>
                <p className="order-cat">{o.category}</p>
                <p className="order-price">&#8377;{o.price.toLocaleString()}</p>
                <span className="order-status">
                  <RiCheckLine size={12} style={{ marginRight: 4 }} />
                  Confirmed
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
