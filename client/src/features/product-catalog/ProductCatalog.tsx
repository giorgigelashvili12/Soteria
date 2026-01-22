"use client";

import { useEffect, useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  MoreHorizontal,
  Plus,
  Search,
  Copy,
  Trash2,
  AlertTriangle,
} from "lucide-react";

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
import type { Product, ProductI } from "../@types";

export default function ProductCatalog() {
  const [data, setData] = useState<Product[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
          "https://soteria-q27e.onrender.com/api/v1/products/dashboard-list",
          {
            credentials: "include",
          },
        );
        const fetchedData = await res.json();
        if (res.ok) {
          const normalized = fetchedData.map((p: ProductI) => ({
            ...p,
            id: p.id || p._id?.toString(),
          }));
          setData(normalized);
        }
      } catch (e) {
        console.error("Load failed", e);
      }
    };
    loadProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      const res = await fetch(
        "https://soteria-q27e.onrender.com/api/v1/products/prod",
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
        setData((prev) => [...prev, result.product]);
        setIsAddOpen(false);
        setNewProduct({ name: "", sku: "", price: "", currency: "GEL" });
        Success({ title: "Created", description: "Product added." });
      }
    } catch (e) {
      Error("Rejected request");
      console.error(e);
    }
  };

  const confirmDelete = async () => {
    if (!selectedId) return;
    setLoading(true);
    try {
      const res = await fetch(
        "https://soteria-q27e.onrender.com/api/v1/products/del",
        {
          method: "POST",
          body: JSON.stringify({ id: selectedId }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        },
      );

      if (res.ok) {
        setData((prev) => prev.filter((p) => p.id !== selectedId));
        setIsDeleteOpen(false);
        Success({ title: "Deleted", description: "Product removed." });
      } else {
        alert("Delete failed on server.");
      }
    } catch (e) {
      Error("Rejected request");
      console.error(e);
    } finally {
      setLoading(false);
      setSelectedId(null);
    }
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "id",
      header: "Product ID",
      cell: ({ row }) => (
        <code className="text-xs bg-muted px-1 py-0.5 rounded">
          {row.original.id}
        </code>
      ),
    },
    { accessorKey: "sku", header: "SKU" },
    { accessorKey: "name", header: "Name" },
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
              onClick={() => navigator.clipboard.writeText(row.original.id)}
            >
              <Copy className="mr-2 h-4 w-4" /> Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => {
                setSelectedId(row.original.id);
                setIsDeleteOpen(true);
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
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
          <p className="text-muted-foreground">Manage your merchant catalog.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Name</Label>
                <Input
                  className="col-span-3"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">SKU</Label>
                <Input
                  className="col-span-3"
                  value={newProduct.sku}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, sku: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Price</Label>
                <Input
                  type="number"
                  className="col-span-3"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddProduct}>Save Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="pl-8"
        />
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
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="w-5 h-5" />
              <DialogTitle>Confirm Deletion</DialogTitle>
            </div>
            <DialogDescription>
              Are you sure you want to delete this product? This cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
