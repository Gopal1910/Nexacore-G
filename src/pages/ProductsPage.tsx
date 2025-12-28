import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Package, ChevronLeft, ChevronRight, Filter } from "lucide-react";

// Mock data - 30 products
const mockProducts = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: [
    "Quantum Processor X1", "Neural Interface v3", "Holographic Display",
    "Cyber Arm MK-IV", "Nano Battery Cell", "Plasma Core Unit",
    "AI Companion Chip", "Stealth Module Alpha", "Bio-Scanner Pro",
    "Energy Shield Gen", "Gravity Boots X", "Mind Link Device",
    "Fusion Reactor Mini", "Teleport Beacon", "Time Dilator",
    "Dark Matter Cell", "Photon Blade Kit", "Cryo Chamber Pod",
    "Mech Suit Frame", "Neural Bypass Kit", "Sonic Amplifier",
    "Quantum Entangler", "Plasma Rifle Mod", "Shield Generator",
    "Drone Core Unit", "Holo Projector", "Nano Repair Bot",
    "Power Cell Ultra", "Stealth Cloak", "Cyber Eye Lens"
  ][i],
  price: Math.floor(Math.random() * 9000) + 1000,
  category: ["Hardware", "Software", "Augmentation", "Energy", "Defense"][Math.floor(Math.random() * 5)],
  stock: Math.floor(Math.random() * 500),
  status: Math.random() > 0.3 ? "Active" : "Inactive"
}));

const ITEMS_PER_PAGE = 10;

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || product.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        {/* Header */}
        <div className="flex flex-col gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-wider gradient-text">Product Catalog</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage your inventory matrix</p>
          </div>
          <div className="cyber-line" />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-11 pl-10 pr-8 rounded-lg border border-border/50 bg-input/50 text-sm font-orbitron text-foreground backdrop-blur-sm transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {paginatedProducts.map((product, index) => (
            <Card 
              key={product.id} 
              variant="stat"
              className="group animate-fade-in"
              style={{ animationDelay: `${0.05 * index}s` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 group-hover:shadow-neon transition-all duration-300">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{product.name}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">{product.category}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.status === "Active" 
                      ? "bg-primary/20 text-primary border border-primary/30" 
                      : "bg-muted text-muted-foreground border border-border/50"
                  }`}>
                    {product.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Price</p>
                    <p className="text-lg font-bold text-primary">${product.price.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground text-xs">Stock</p>
                    <p className={`text-lg font-bold ${product.stock < 50 ? "text-destructive" : "text-foreground"}`}>
                      {product.stock}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4 animate-fade-in">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Results info */}
        <p className="text-center text-xs text-muted-foreground">
          Showing {paginatedProducts.length} of {filteredProducts.length} products
        </p>
      </div>
    </DashboardLayout>
  );
};

export default ProductsPage;
