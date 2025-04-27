import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MinusIcon, PlusIcon } from "lucide-react";

interface ProductCardVerticalProps {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
}

export function ProductCardVertical(props: ProductCardVerticalProps) {
  const { id, name, price, image, stock, onAddToCart, onRemoveFromCart } =
    props;
  return (
    <Card key={id} className="p-0 flex flex-row relative">
      <div className="bg-red-500 absolute top-0 right-0 text-white rounded-tr-lg rounded-bl-lg p-2">
        <span>{stock}</span>
      </div>
      <CardHeader className="flex-2 block p-0">
        <img
          src={image}
          alt={name}
          className="rounded-l-lg w-full h-full object-cover"
        />
      </CardHeader>
      <CardContent className="flex-1 py-2">
        <CardTitle>{name}</CardTitle>
        <div className="flex flex-col gap-2">
          <p>
            <span>${price}</span>
          </p>
          <div className="flex flex-row gap-2 justify-between items-center">
            <span>
              <Button
                variant={"outline"}
                size={"icon"}
                onClick={onRemoveFromCart}
              >
                <MinusIcon />
              </Button>
            </span>
            <span>1</span>
            <span>
              <Button variant={"outline"} size={"icon"} onClick={onAddToCart}>
                <PlusIcon />
              </Button>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
