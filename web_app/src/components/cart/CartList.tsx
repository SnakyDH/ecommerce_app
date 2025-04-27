import { useIsMobile } from "@/hooks/useIsMobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCartIcon } from "lucide-react";
import { ProductCardVertical } from "@/components/products/cards/ProductCardVertical";
import { Button } from "@/components/ui/button";
import { ProductCardHorizontal } from "@/components/products/cards/ProductCardHorizontal";

export function Cart() {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <button aria-label="Open cart">
            <ShoppingCartIcon size={32} color="#fff" />
          </button>
        </DrawerTrigger>
        <DrawerContent className="overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle className="flex flex-row gap-2 items-center">
              <ShoppingCartIcon size={32} />
              <span>Cart</span>
            </DrawerTitle>
          </DrawerHeader>
          <DrawerDescription>
            <div className="grid grid-cols-1 gap-4 px-3">
              {[
                {
                  id: 1,
                  name: "Product 1",
                  price: 100,
                  image: "/product.webp",
                  stock: 10,
                },
                {
                  id: 2,
                  name: "Product 2",
                  price: 200,
                  image: "/product.webp",
                  stock: 10,
                },
                {
                  id: 3,
                  name: "Product 3",
                  price: 300,
                  image: "/product.webp",
                  stock: 10,
                },
                {
                  id: 4,
                  name: "Product 4",
                  price: 400,
                  image: "/product.webp",
                  stock: 10,
                },
              ].map((item) => (
                <ProductCardHorizontal
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  stock={item.stock}
                  onAddToCart={() => {}}
                  onRemoveFromCart={() => {}}
                />
              ))}
            </div>
          </DrawerDescription>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Sheet>
      <SheetTrigger>
        <ShoppingCartIcon size={32} color="#fff" />
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex flex-row gap-2 items-center">
            <ShoppingCartIcon size={32} />
            <span>Cart</span>
          </SheetTitle>
        </SheetHeader>
        <div className="grid grid-cols-1 gap-4 px-3">
          {[
            {
              id: 1,
              name: "Product 1",
              price: 100,
              image: "/product.webp",
              stock: 10,
            },
            {
              id: 2,
              name: "Product 2",
              price: 200,
              image: "/product.webp",
              stock: 10,
            },
            {
              id: 3,
              name: "Product 3",
              price: 300,
              image: "/product.webp",
              stock: 10,
            },
            {
              id: 4,
              name: "Product 4",
              price: 400,
              image: "/product.webp",
              stock: 10,
            },
          ].map((item) => (
            <ProductCardVertical
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
              stock={item.stock}
              onAddToCart={() => {}}
              onRemoveFromCart={() => {}}
            />
          ))}
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <Button variant="outline">Cancel</Button>
        </DrawerFooter>
      </SheetContent>
    </Sheet>
  );
}
