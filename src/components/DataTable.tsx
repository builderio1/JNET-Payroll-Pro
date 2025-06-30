import { ReactNode, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Grid3X3,
  List,
  LayoutGrid,
  Smartphone,
  SortAsc,
  SortDesc,
  TrendingUp,
  Activity,
  BarChart3,
  Layers,
  Sparkles,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => ReactNode;
  className?: string;
  mobileHidden?: boolean;
}

export interface Filter {
  key: string;
  label: string;
  type: "select" | "text";
  options?: Array<{ value: string; label: string }>;
}

type ViewMode = "table" | "card" | "grid" | "kanban" | "timeline";

interface DataTableProps {
  data: any[];
  columns: Column[];
  filters?: Filter[];
  searchPlaceholder?: string;
  onAdd?: () => void;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onView?: (row: any) => void;
  addButtonText?: string;
  className?: string;
  defaultView?: ViewMode;
  enableViewToggle?: boolean;
  cardTitleKey?: string;
  cardSubtitleKey?: string;
  cardImageKey?: string;
  enableStats?: boolean;
}

export function DataTable({
  data,
  columns,
  filters = [],
  searchPlaceholder = "Search...",
  onAdd,
  onEdit,
  onDelete,
  onView,
  addButtonText = "Add New",
  className,
  defaultView = "table",
  enableViewToggle = true,
  cardTitleKey,
  cardSubtitleKey,
  cardImageKey,
  enableStats = true,
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [viewMode, setViewMode] = useState<ViewMode>(defaultView);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  // Filter data based on search and filters
  const filteredData = data.filter((row) => {
    const matchesSearch = searchTerm
      ? Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;

    const matchesFilters = Object.entries(filterValues).every(([key, value]) =>
      value && value !== "all" ? String(row[key]) === value : true
    );

    return matchesSearch && matchesFilters;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortBy) return 0;

    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }

    const aStr = String(aValue).toLowerCase();
    const bStr = String(bValue).toLowerCase();

    if (sortOrder === "asc") {
      return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
    } else {
      return aStr > bStr ? -1 : aStr < bStr ? 1 : 0;
    }
  });

  const visibleColumns = columns.filter((col) => !col.mobileHidden);
  const mobileColumns = columns.filter((col) => !col.mobileHidden).slice(0, 2);

  // Count active filters
  const activeFiltersCount = Object.values(filterValues).filter(
    (value) => value && value !== "all"
  ).length;

  // Clear all filters
  const clearAllFilters = () => {
    setFilterValues({});
  };

  // Handle filter change
  const handleFilterChange = (filterKey: string, value: string) => {
    setFilterValues((prev) => ({
      ...prev,
      [filterKey]: value === "all" ? "" : value,
    }));
  };

  // Enhanced Card View with better visual hierarchy
  const CardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <AnimatePresence>
        {sortedData.map((row, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <Card className="relative overflow-hidden group h-full bg-gradient-to-br from-card to-card/80 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl">
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Card header with avatar/icon */}
              <CardHeader className="relative pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {cardImageKey && row[cardImageKey] ? (
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-lg">
                          {row[cardImageKey]}
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-success rounded-2xl border-2 border-background shadow-sm" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-lg">
                        {row[columns[0]?.key]?.toString().charAt(0) || "?"}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base text-foreground truncate group-hover:text-primary transition-colors">
                        {cardTitleKey
                          ? row[cardTitleKey]
                          : row[columns[0]?.key] || "Untitled"}
                      </h3>
                      {cardSubtitleKey && (
                        <p className="text-xs text-muted-foreground truncate">
                          {row[cardSubtitleKey]}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-success rounded-2xl animate-pulse" />
                    <Badge variant="secondary" className="text-xs rounded-2xl">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative pt-0">
                {/* Key metrics in grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {columns.slice(1, 5).map((column) => (
                    <div
                      key={column.key}
                      className="p-2 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">
                        {column.label}
                      </div>
                      <div className="text-sm font-semibold text-foreground truncate">
                        {column.render
                          ? column.render(row[column.key], row)
                          : row[column.key]}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress indicators for relevant data */}
                {row.progress && (
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-muted-foreground">
                        Progress
                      </span>
                      <span className="text-xs font-semibold">
                        {row.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-2xl h-1.5">
                      <div
                        className="bg-gradient-primary h-1.5 rounded-2xl transition-all duration-300"
                        style={{ width: `${row.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                {(onView || onEdit || onDelete) && (
                  <div className="flex gap-2 pt-2 border-t border-border/50">
                    {onView && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(row)}
                        className="flex-1 h-8 hover:bg-primary/10 hover:text-primary transition-all text-xs rounded-2xl"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    )}
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(row)}
                        className="flex-1 h-8 hover:bg-warning/10 hover:text-warning transition-all text-xs rounded-2xl"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(row)}
                        className="h-8 hover:bg-destructive/10 hover:text-destructive transition-all text-xs rounded-2xl"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  // Enhanced Grid View with modern layout
  const GridView = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
      <AnimatePresence>
        {sortedData.map((row, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2, delay: index * 0.02 }}
          >
            <Card className="aspect-square p-3 text-center hover:shadow-xl transition-all duration-300 group border-0 bg-gradient-to-br from-card to-card/60 rounded-2xl">
              <div className="h-full flex flex-col justify-center items-center gap-2">
                <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:shadow-xl transition-shadow">
                  {cardImageKey
                    ? row[cardImageKey]
                    : row[columns[0]?.key]?.toString().charAt(0) || "?"}
                </div>

                <div className="flex-1 flex flex-col justify-center min-h-0">
                  <h4 className="font-semibold text-sm mb-1 truncate group-hover:text-primary transition-colors">
                    {cardTitleKey
                      ? row[cardTitleKey]
                      : row[columns[0]?.key] || "Untitled"}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {cardSubtitleKey
                      ? row[cardSubtitleKey]
                      : row[columns[1]?.key] || ""}
                  </p>
                </div>

                {onView && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(row)}
                    className="w-full h-6 text-xs opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
                  >
                    View
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  // New Kanban View for better workflow visualization
  const KanbanView = () => {
    const statuses = [...new Set(data.map((item) => item.status))];

    return (
      <div className="flex gap-6 overflow-x-auto pb-4">
        {statuses.map((status) => (
          <div key={status} className="flex-shrink-0 w-80">
            <div className="bg-muted/20 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">{status}</h3>
                <Badge variant="outline">
                  {sortedData.filter((item) => item.status === status).length}
                </Badge>
              </div>

              <div className="space-y-3">
                {sortedData
                  .filter((item) => item.status === status)
                  .map((row, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer">
                        <h4 className="font-semibold mb-2">
                          {cardTitleKey
                            ? row[cardTitleKey]
                            : row[columns[0]?.key]}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {cardSubtitleKey
                            ? row[cardSubtitleKey]
                            : row[columns[1]?.key]}
                        </p>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">
                            {columns[2]?.label}: {row[columns[2]?.key]}
                          </span>
                          <div className="flex gap-1">
                            {onView && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onView(row)}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Enhanced Mobile View with better information architecture
  const MobileView = () => (
    <div className="space-y-3 md:hidden">
      <AnimatePresence>
        {sortedData.map((row, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
              <CardContent className="p-0">
                {/* Header section with avatar and primary info */}
                <div className="p-3 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {cardImageKey
                        ? row[cardImageKey]
                        : row[columns[0]?.key]?.toString().charAt(0) || "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base text-foreground truncate">
                        {cardTitleKey
                          ? row[cardTitleKey]
                          : row[columns[0]?.key]}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">
                        {cardSubtitleKey
                          ? row[cardSubtitleKey]
                          : row[columns[1]?.key]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content section with key information */}
                <div className="p-3">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {mobileColumns.slice(0, 4).map((column) => (
                      <div key={column.key} className="space-y-1">
                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {column.label}
                        </div>
                        <div className="text-sm font-semibold text-foreground">
                          {column.render
                            ? column.render(row[column.key], row)
                            : row[column.key]}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  {(onView || onEdit || onDelete) && (
                    <div className="flex gap-2 pt-2 border-t border-border/50">
                      {onView && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onView(row)}
                          className="flex-1 h-8 text-xs rounded-2xl"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      )}
                      {onEdit && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(row)}
                          className="flex-1 h-8 text-xs rounded-2xl"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(row)}
                          className="text-destructive hover:bg-destructive/10 h-8 text-xs rounded-2xl"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  const handleSort = (columnKey: string) => {
    if (sortBy === columnKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(columnKey);
      setSortOrder("asc");
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Enhanced Statistics Panel */}
      {enableStats && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{data.length}</p>
                <p className="text-xs text-muted-foreground">Total Records</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-success">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{filteredData.length}</p>
                <p className="text-xs text-muted-foreground">Filtered</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-warning">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {Math.round((filteredData.length / data.length) * 100)}%
                </p>
                <p className="text-xs text-muted-foreground">Match Rate</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-secondary">
                <Layers className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{columns.length}</p>
                <p className="text-xs text-muted-foreground">Columns</p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
      <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Enhanced Search */}
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 group-focus-within:text-primary transition-colors" />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 border-0 bg-muted/50 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all rounded-2xl"
            />
            {searchTerm && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                  className="h-6 w-6 p-0 hover:bg-muted rounded-2xl"
                >
                  ×
                </Button>
              </motion.div>
            )}
          </div>

          {/* Consolidated Filters Button */}
          {filters.length > 0 && (
            <DropdownMenu
              open={isFilterMenuOpen}
              onOpenChange={setIsFilterMenuOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-11 gap-2 border-0 bg-muted/50 hover:bg-muted transition-colors rounded-2xl",
                    activeFiltersCount > 0 &&
                      "bg-primary/10 border-primary/20 text-primary"
                  )}
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-1 h-5 w-5 p-0 justify-center text-xs bg-primary text-primary-foreground rounded-2xl"
                    >
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-80 p-0 border-0 shadow-xl bg-background/95 backdrop-blur-xl rounded-2xl"
                sideOffset={8}
              >
                {/* Filter Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-foreground">Filters</h3>
                    {activeFiltersCount > 0 && (
                      <Badge variant="outline" className="text-xs rounded-2xl">
                        {activeFiltersCount} active
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {activeFiltersCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground rounded-2xl"
                      >
                        Clear All
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFilterMenuOpen(false)}
                      className="h-7 w-7 p-0 hover:bg-muted rounded-2xl"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Filter Options */}
                <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                  {filters.map((filter) => (
                    <div key={filter.key} className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        {filter.label}
                      </label>
                      <Select
                        value={filterValues[filter.key] || "all"}
                        onValueChange={(value) =>
                          handleFilterChange(filter.key, value)
                        }
                      >
                        <SelectTrigger className="w-full h-9 border border-border/50 bg-background rounded-2xl">
                          <SelectValue placeholder={`Select ${filter.label}`} />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl">
                          <SelectItem value="all">
                            All {filter.label}
                          </SelectItem>
                          {filter.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>

                {/* Filter Menu Footer */}
                <div className="p-4 border-t border-border/50 bg-muted/20">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      Showing {filteredData.length} of {data.length} results
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFilterMenuOpen(false)}
                      className="h-7 px-3 text-xs rounded-2xl"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Enhanced Actions and View Toggle */}
        <div className="flex gap-3 items-center">
          {/* View Toggle */}
          {enableViewToggle && (
            <div className="flex gap-1 p-1 bg-muted/50 rounded-2xl">
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
                className="px-3 h-9 rounded-2xl"
              >
                <List className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Table</span>
              </Button>
              <Button
                variant={viewMode === "card" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("card")}
                className="px-3 h-9 rounded-2xl"
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Cards</span>
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="px-3 h-9 rounded-2xl"
              >
                <Grid3X3 className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Grid</span>
              </Button>
              <Button
                variant={viewMode === "kanban" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("kanban")}
                className="px-3 h-9 rounded-2xl"
              >
                <Layers className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Kanban</span>
              </Button>
            </div>
          )}

          <Separator orientation="vertical" className="h-8" />

          <Button variant="outline" size="sm" className="gap-2 h-9 rounded-2xl">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>

          {onAdd && (
            <Button
              onClick={onAdd}
              size="sm"
              className="gap-2 h-9 bg-gradient-primary hover:opacity-90 rounded-2xl"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">{addButtonText}</span>
              <span className="sm:hidden">Add</span>
            </Button>
          )}
        </div>
      </div>

      {/* Content Area with enhanced animations */}
      <AnimatePresence mode="wait">
        {viewMode === "card" ? (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CardView />
          </motion.div>
        ) : viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GridView />
          </motion.div>
        ) : viewMode === "kanban" ? (
          <motion.div
            key="kanban"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <KanbanView />
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Enhanced Desktop Table */}
            <Card className="hidden md:block border-0 shadow-xl overflow-hidden rounded-2xl">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-muted/50 to-muted/30 hover:from-muted/60 hover:to-muted/40">
                      {visibleColumns.map((column) => (
                        <TableHead
                          key={column.key}
                          className={cn(
                            "font-bold text-foreground h-10 cursor-pointer hover:bg-muted/50 transition-colors",
                            column.className
                          )}
                          onClick={() =>
                            column.sortable !== false && handleSort(column.key)
                          }
                        >
                          <div className="flex items-center gap-2">
                            {column.label}
                            {column.sortable !== false && (
                              <div className="flex flex-col">
                                {sortBy === column.key ? (
                                  sortOrder === "asc" ? (
                                    <SortAsc className="h-4 w-4 text-primary" />
                                  ) : (
                                    <SortDesc className="h-4 w-4 text-primary" />
                                  )
                                ) : (
                                  <div className="w-4 h-4 opacity-30">
                                    <SortAsc className="h-4 w-4" />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </TableHead>
                      ))}
                      {(onView || onEdit || onDelete) && (
                        <TableHead className="w-16 text-center">
                          Actions
                        </TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedData.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={
                            visibleColumns.length +
                            (onView || onEdit || onDelete ? 1 : 0)
                          }
                          className="text-center py-12"
                        >
                          <div className="flex flex-col items-center gap-4 text-muted-foreground">
                            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center">
                              <Search className="h-8 w-8" />
                            </div>
                            <div>
                              <p className="text-lg font-semibold mb-1">
                                No data found
                              </p>
                              <p className="text-sm">
                                Try adjusting your search or filters
                              </p>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      sortedData.map((row, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="group hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-all duration-200 border-b border-border/50"
                        >
                          {visibleColumns.map((column) => (
                            <TableCell
                              key={column.key}
                              className={cn("py-2", column.className)}
                            >
                              {column.render
                                ? column.render(row[column.key], row)
                                : row[column.key]}
                            </TableCell>
                          ))}
                          {(onView || onEdit || onDelete) && (
                            <TableCell className="text-center">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10 rounded-2xl"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="border-0 shadow-xl rounded-2xl"
                                >
                                  {onView && (
                                    <DropdownMenuItem
                                      onClick={() => onView(row)}
                                      className="gap-2"
                                    >
                                      <Eye className="h-4 w-4" />
                                      View
                                    </DropdownMenuItem>
                                  )}
                                  {onEdit && (
                                    <DropdownMenuItem
                                      onClick={() => onEdit(row)}
                                      className="gap-2"
                                    >
                                      <Edit className="h-4 w-4" />
                                      Edit
                                    </DropdownMenuItem>
                                  )}
                                  {onDelete && (
                                    <DropdownMenuItem
                                      onClick={() => onDelete(row)}
                                      className="gap-2 text-destructive focus:text-destructive"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          )}
                        </motion.tr>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Enhanced Mobile View */}
            <MobileView />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Results Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-between items-center p-4 bg-gradient-to-r from-muted/20 to-muted/10 rounded-2xl border border-border/50"
      >
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          <span>
            Showing{" "}
            <span className="font-semibold text-foreground">
              {sortedData.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">{data.length}</span>{" "}
            results
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground md:hidden">
          <Smartphone className="h-4 w-4" />
          <span>Mobile View</span>
        </div>
      </motion.div>
    </div>
  );
}
