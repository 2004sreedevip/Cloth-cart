import { RiShoppingCartLine } from "react-icons/ri";
import Section from "./Section";

export default function CartSection({ cart, onRemove, onBuy }) {
  return (
    <Section
      title="Your Cart"
      subtitle={`${cart.length} item${cart.length !== 1 ? "s" : ""}`}
      emptyIcon={<RiShoppingCartLine size={48} />}
      items={cart}
      onRemove={onRemove}
      onBuy={onBuy}
    />
  );
}
