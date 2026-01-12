import * as React from "react";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Link } from "react-router-dom";

export default function ProductCatalog() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="w-50">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full flex flex-col gap-1"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between bg-white text-stone-600 hover:bg-stone-200 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Package className="size-4.5" />
              <span className="font-semibold">Product Catalog</span>
            </div>
            <ChevronsUpDown
              className={`size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="">
          <div className="flex flex-col gap-1 pl-9 pr-2 py-1">
            <div className="rounded-md border border-stone-100 bg-stone-50 px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 cursor-pointer">
              <Link to="/dashboard/product-catalog">Items</Link>
            </div>
            <div className="rounded-md border border-stone-100 bg-stone-50 px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 cursor-pointer">
              <Link to="/dashboard/product-catalog">Services</Link>
            </div>
            <div className="rounded-md border border-stone-100 bg-stone-50 px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 cursor-pointer">
              <Link to="">Custom Attributes</Link>
            </div>
            <div className="rounded-md border border-stone-100 bg-stone-50 px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 cursor-pointer">
              <Link to="">Discounts</Link>
            </div>
            <div className="rounded-md border border-stone-100 bg-stone-50 px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 cursor-pointer">
              <Link to="">Payment Links</Link>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
