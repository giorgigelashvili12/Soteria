import { ChartSpline } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import * as React from "react";
import { Link } from "react-router-dom";

export default function Reports() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="w-50">
      {" "}
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="transition-all"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between bg-white text-stone-600 hover:bg-stone-200 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ChartSpline className="size-4.5" />
              <span className="font-semibold">Reports</span>
            </div>
            <ChevronsUpDown
              className={`size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="flex flex-col gap-1 pl-9 pr-2 transition-all ease-in">
          <div className="rounded-md border border-stone-100 bg-stone-50 px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 cursor-pointer">
            <Link to="">Reporting</Link>
          </div>
          <div className="rounded-md border border-stone-100 bg-stone-50 px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 cursor-pointer">
            <Link to="">Custom Reports</Link>
          </div>
          <div className="rounded-md border border-stone-100 bg-stone-50 px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 cursor-pointer">
            <Link to="">Soteria Lens</Link>
          </div>
          <div className="rounded-md border border-stone-100 bg-stone-50 px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 cursor-pointer">
            <Link to="">Data Management</Link>
          </div>
          {/*<div className="rounded-md border border-stone-100 bg-stone-50 px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 cursor-pointer">
            Discounts
          </div>
          <div className="rounded-md border border-stone-100 bg-stone-50 px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 cursor-pointer">
            Payment Links
          </div>*/}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
