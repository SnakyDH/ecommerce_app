import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { MinusIcon, PlusIcon } from "lucide-react";

interface ProductCardHorizontalProps {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
}

export function ProductCardHorizontal(props: ProductCardHorizontalProps) {
  const { id, name, price, image, stock, onAddToCart, onRemoveFromCart } =
    props;
  return (
    <Card key={id} className="p-0 flex flex-row relative overflow-hidden">
      <div className="bg-red-500 absolute top-0 right-0 text-white rounded-tr-md rounded-bl-md p-1 text-xs z-10">
        <span>{stock}</span>
      </div>
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-l-md"
        />
      </div>
      <CardContent className="flex-1 py-2 pl-3 pr-2 flex flex-col justify-between">
        <CardTitle className="text-sm mb-1">{name}</CardTitle>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">
            <span>${price}</span>
            <span className="text-xs font-normal"> USD</span>
          </p>
          <div className="flex flex-row gap-2 justify-start items-center">
            <Button
              variant={"outline"}
              size={"icon"}
              className="h-6 w-6"
              onClick={onRemoveFromCart}
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
            <span className="w-4 text-center text-sm">1</span>
            <Button
              variant={"outline"}
              size={"icon"}
              className="h-6 w-6"
              onClick={onAddToCart}
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
