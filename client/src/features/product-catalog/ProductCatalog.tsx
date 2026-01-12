"use client";

import { useEffect, useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Trash, MoreHorizontal, Plus, Search, Copy } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Error } from "../messages/Error";
import { Success } from "../messages/Success";
import type { Product } from "../@types";
import type { ProductI } from "../@types";

export default function ProductCatalog() {
  const [data, setData] = useState<Product[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    price: "",
    currency: "GEL",
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(
          "https://soteria-q27e.onrender.com/api/v1/products/all",
          {
            credentials: "include",
          },
        );

        const data = await res.json();

        if (res.ok) {
          const normalized = data.map((p: ProductI) => ({
            ...p,
            id: p.id || p._id?.toString(),
          }));
          setData(normalized);
          Success({
            title: "Products loaded",
            description: (
              <ul className="list-disc list-inside text-sm">
                <li>Products loaded.</li>
              </ul>
            ),
          });
        } else {
          Error({
            title: "Unexpected error",
            description: (
              <ul className="list-disc list-inside text-sm">
                {/*@ts-expect-error ki arsebibs. */}
                <li>${res.msg || "rejected request"}</li>
              </ul>
            ),
          });
        }
      } catch (e: unknown) {
        console.error("Failed to load", e);
        Error({
          title: "Failed to load",
          description: (
            <ul className="list-disc list-inside text-sm">
              <li>Failed to load</li>
            </ul>
          ),
        });
      }
    };

    loadProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      const res = await fetch(
        "https://soteria-q27e.onrender.com/api/v1/products/",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...newProduct,
            price: Math.round(parseFloat(newProduct.price) * 100),
          }),
        },
      );

      if (res.ok) {
        const result = await res.json();
        const added = result.product;
        setData((prev) => [
          ...prev,
          {
            id: added.id,
            name: added.name,
            sku: added.sku,
            price: added.price,
            currency: added.currency,
          },
        ]);
        setIsAddOpen(false);
        setNewProduct({ name: "", sku: "", price: "", currency: "GEL" });
        Success({
          title: "Product Created",
          description: "Your product is now in the catalog.",
        });
      } else {
        const err = await res.json();
        Error({
          title: "Failed to create",
          description: err.msg || "Check your fields.",
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this product?")) {
      setData((prev) => prev.filter((p) => p.id !== id));
    }

    try {
      const res = await fetch(
        "https://soteria-q27e.onrender.com/api/v1/products/",
        {
          method: "DELETE",
          body: JSON.stringify({ id }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );

      if (res.ok) {
        setData((prev) => prev.filter((p: ProductI) => p.id !== id));
      } else {
        Error({
          title: "Failed to delete",
          description: (
            <ul className="list-disc list-inside text-sm">
              <li>Couldn't delete</li>
            </ul>
          ),
        });
      }
    } catch (e: unknown) {
      console.error("unexpected", e);
      Error({
        title: "Failed to delete",
        description: (
          <ul className="list-disc list-inside text-sm">
            <li>Unexpected error</li>
          </ul>
        ),
      });
    }
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "id",
      header: "Product ID",
      cell: ({ row }) => (
        <code className="text-xs bg-muted px-1 py-0.5 rounded text-muted-foreground">
          {row.original.id}
        </code>
      ),
    },
    {
      accessorKey: "sku",
      header: "SKU",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const amount = (row.original.price || 0) / 100;
        return new Intl.NumberFormat("en-GE", {
          style: "currency",
          currency: row.original.currency || "GEL",
        }).format(amount);
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(row.original.id);
                Success({
                  title: "Copied",
                  description: "Product ID copied to clipboard",
                });
              }}
            >
              <Copy className="mr-2 h-4 w-4" /> Copy ID
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(row.original.sku);
                Success({
                  title: "Copied",
                  description: "SKU copied to clipboard",
                });
              }}
            >
              <Copy className="mr-2 h-4 w-4" /> Copy SKU
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleDelete(row.original.id)}
              className="text-red-600 hover:text-red-600"
            >
              <Trash className="mr-2 h-4 w-4 text-red-600 hover:text-red-600" />{" "}
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId: (row) => row.id,
  });

  return (
    <div className="w-full p-8 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your merchant catalog and pricing.
          </p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-linear-to-r from-emerald-500 to-emerald-600 cursor-pointer">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Enter the details for your new catalog item.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="sku" className="text-right">
                  SKU
                </Label>
                <Input
                  id="sku"
                  className="col-span-3"
                  value={newProduct.sku}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, sku: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="col-span-3"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleAddProduct}>
                Save Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search SKUs or names..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {data.length > 0
                    ? "Data exists but rows aren't rendering..."
                    : "No products found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
