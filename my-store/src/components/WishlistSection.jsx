import { RiHeartLine } from "react-icons/ri";
import Section from "./Section";

export default function WishlistSection({ wishlist, onRemove, onBuy }) {
  return (
    <Section
      title="Wishlist"
      subtitle={`${wishlist.length} saved item${wishlist.length !== 1 ? "s" : ""}`}
      emptyIcon={<RiHeartLine size={48} />}
      items={wishlist}
      onRemove={onRemove}
      onBuy={onBuy}
    />
  );
}
