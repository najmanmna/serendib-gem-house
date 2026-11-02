import { formatLKR } from "@/lib/format";

type ProductPriceProps = {
  price: number;
  salePrice?: number;
};

/** Shows the sale price prominently with the original price struck through beneath it. */
export function ProductPrice({ price, salePrice }: ProductPriceProps) {
  const onSale = salePrice !== undefined && salePrice < price;

  if (!onSale) {
    return <p className="text-base font-semibold text-navy">{formatLKR(price)}</p>;
  }

  return (
    <div>
      <p className="text-base font-semibold text-navy">
        <span className="sr-only">Sale price: </span>
        {formatLKR(salePrice)}
      </p>
      <p className="text-[0.8125rem] text-muted">
        <span className="sr-only">Original price: </span>
        <s>{formatLKR(price)}</s>
      </p>
    </div>
  );
}
