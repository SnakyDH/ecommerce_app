import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

function ProductsGrid() {
  return (
    <div className="grid-products">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
        <Card
          key={item}
          className="
          pt-0"
        >
          <CardHeader className="p-0">
            <picture className="w-full">
              <img src="/product.webp" alt="logo" className="rounded-t-lg" />
            </picture>
            <CardTitle>[PRODUCT NAME]</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              [PRODUCT STOCK]: <span>[STOCK]</span>
            </p>
            <p>
              [PRODUCT Price]: <span>[Price]</span>
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button>
              <PlusIcon />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export { ProductsGrid };
