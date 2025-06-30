import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, Column, Filter } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Upload,
  Download,
  Plus,
  Users,
  Building,
  Mail,
  Phone,
  IndianRupee,
  TrendingUp,
  Calendar,
  MapPin,
  UserCheck,
  Clock,
  Award,
  Target,
  Activity,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for employees
const mockEmployees = [
  {
    empId: "E1001",
    name: "John Smith",
    designation: "Software Engineer",
    department: "Technology",
    location: "Mumbai",
    emailJnet: "john.smith@company.com",
    emailPersonal: "john@gmail.com",
    contact: "+91 9876543210",
    reportingManager: "Sarah Wilson",
    doj: "2023-01-15",
    variablePay: 10,
    grossCTC: 1200000,
    businessUnit: "JNET",
    offerType: "Full-time",
    employmentType: "Permanent",
    status: "Active",
    progress: 85,
  },
  {
    empId: "E1002",
    name: "Priya Sharma",
    designation: "Senior Developer",
    department: "Technology",
    location: "Bangalore",
    emailJnet: "priya.sharma@company.com",
    emailPersonal: "priya@gmail.com",
    contact: "+91 9876543211",
    reportingManager: "Sarah Wilson",
    doj: "2022-06-10",
    variablePay: 12,
    grossCTC: 1500000,
    businessUnit: "JNET",
    offerType: "Full-time",
    employmentType: "Permanent",
    status: "Active",
    progress: 92,
  },
  {
    empId: "T1001",
    name: "Rajesh Kumar",
    designation: "Sales Executive",
    department: "Sales",
    location: "Delhi",
    emailJnet: "rajesh.kumar@company.com",
    emailPersonal: "rajesh@gmail.com",
    contact: "+91 9876543212",
    reportingManager: "Michael Chen",
    doj: "2023-03-20",
    variablePay: 15,
    grossCTC: 800000,
    businessUnit: "Telecom",
    offerType: "Full-time",
    employmentType: "Contract",
    status: "Active",
    progress: 78,
  },
  {
    empId: "E1003",
    name: "Sarah Wilson",
    designation: "Team Lead",
    department: "Technology",
    location: "Mumbai",
    emailJnet: "sarah.wilson@company.com",
    emailPersonal: "sarah@gmail.com",
    contact: "+91 9876543213",
    reportingManager: "David Brown",
    doj: "2021-08-15",
    variablePay: 20,
    grossCTC: 2000000,
    businessUnit: "JNET",
    offerType: "Full-time",
    employmentType: "Permanent",
    status: "Active",
    progress: 96,
  },
  {
    empId: "E1004",
    name: "Michael Chen",
    designation: "Sales Manager",
    department: "Sales",
    location: "Chennai",
    emailJnet: "michael.chen@company.com",
    emailPersonal: "michael@gmail.com",
    contact: "+91 9876543214",
    reportingManager: "David Brown",
    doj: "2022-02-01",
    variablePay: 18,
    grossCTC: 1800000,
    businessUnit: "JNET",
    offerType: "Full-time",
    employmentType: "Permanent",
    status: "Active",
    progress: 88,
  },
  {
    empId: "E1005",
    name: "Lisa Anderson",
    designation: "HR Specialist",
    department: "HR",
    location: "Pune",
    emailJnet: "lisa.anderson@company.com",
    emailPersonal: "lisa@gmail.com",
    contact: "+91 9876543215",
    reportingManager: "David Brown",
    doj: "2023-05-12",
    variablePay: 8,
    grossCTC: 900000,
    businessUnit: "JNET",
    offerType: "Full-time",
    employmentType: "Permanent",
    status: "Inactive",
    progress: 65,
  },
];

const columns: Column[] = [
  {
    key: "empId",
    label: "Employee ID",
    render: (value) => (
      <div className="font-mono text-sm bg-gradient-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 shadow-sm">
        {value}
      </div>
    ),
  },
  {
    key: "name",
    label: "Employee",
    render: (value, row) => (
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-11 w-11 ring-2 ring-primary/20 shadow-lg">
            <AvatarImage src={`/placeholder-avatar-${row.empId}.jpg`} />
            <AvatarFallback className="bg-gradient-primary text-white font-semibold text-sm">
              {value
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {/* Status indicator on avatar */}
          <div
            className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-background shadow-sm ${
              row.status === "Active"
                ? "bg-gradient-success"
                : "bg-gradient-warning"
            }`}
          />
        </div>
        <div>
          <div className="font-semibold text-foreground text-sm">{value}</div>
          <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
            <Building className="h-3 w-3" />
            {row.designation}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "department",
    label: "Department",
    render: (value, row) => (
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            value === "Technology"
              ? "bg-gradient-primary"
              : value === "Sales"
                ? "bg-gradient-success"
                : value === "HR"
                  ? "bg-gradient-warning"
                  : "bg-gradient-secondary"
          }`}
        />
        <div>
          <span className="font-medium text-sm">{value}</span>
          <div className="text-xs text-muted-foreground">
            {row.businessUnit}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "location",
    label: "Location",
    render: (value) => (
      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPin className="h-4 w-4" />
        <span className="text-sm">{value}</span>
      </div>
    ),
  },
  {
    key: "emailJnet",
    label: "Email",
    render: (value) => (
      <div className="flex items-center gap-2 text-sm max-w-[200px]">
        <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <span className="truncate">{value}</span>
      </div>
    ),
    mobileHidden: true,
  },
  {
    key: "contact",
    label: "Contact",
    render: (value) => (
      <div className="flex items-center gap-2 text-sm">
        <Phone className="h-4 w-4 text-muted-foreground" />
        <span className="font-mono">{value}</span>
      </div>
    ),
    mobileHidden: true,
  },
  {
    key: "grossCTC",
    label: "Annual CTC",
    render: (value) => (
      <div className="flex items-center gap-1 font-semibold text-green-600">
        <IndianRupee className="h-4 w-4" />
        <span>{(value / 100000).toFixed(1)}L</span>
      </div>
    ),
  },
  {
    key: "variablePay",
    label: "Variable Pay",
    render: (value) => (
      <div className="flex items-center gap-1 text-orange-600 font-medium">
        <TrendingUp className="h-4 w-4" />
        <span>{value}%</span>
      </div>
    ),
    mobileHidden: true,
  },
  {
    key: "doj",
    label: "Date of Joining",
    render: (value) => (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>{new Date(value).toLocaleDateString()}</span>
      </div>
    ),
    mobileHidden: true,
  },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <Badge
        variant={value === "Active" ? "default" : "secondary"}
        className={cn(
          "font-medium",
          value === "Active"
            ? "bg-gradient-success hover:opacity-90"
            : "bg-gradient-warning hover:opacity-90"
        )}
      >
        {value}
      </Badge>
    ),
  },
];

const filters: Filter[] = [
  {
    key: "businessUnit",
    label: "Business Unit",
    type: "select",
    options: [
      { value: "JNET", label: "JNET" },
      { value: "Telecom", label: "Telecom" },
    ],
  },
  {
    key: "department",
    label: "Department",
    type: "select",
    options: [
      { value: "Technology", label: "Technology" },
      { value: "Sales", label: "Sales" },
      { value: "HR", label: "HR" },
      { value: "Finance", label: "Finance" },
    ],
  },
  {
    key: "offerType",
    label: "Offer Type",
    type: "select",
    options: [
      { value: "Full-time", label: "Full-time" },
      { value: "Part-time", label: "Part-time" },
      { value: "Contract", label: "Contract" },
    ],
  },
  {
    key: "employmentType",
    label: "Employment Type",
    type: "select",
    options: [
      { value: "Permanent", label: "Permanent" },
      { value: "Contract", label: "Contract" },
      { value: "Intern", label: "Intern" },
    ],
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "Active", label: "Active" },
      { value: "Inactive", label: "Inactive" },
    ],
  },
];

export default function Employees() {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleView = (employee: any) => {
    setSelectedEmployee(employee);
  };

  const handleEdit = (employee: any) => {
    setSelectedEmployee(employee);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (employee: any) => {
    console.log("Delete employee:", employee);
  };

  const handleAdd = () => {
    setSelectedEmployee(null);
    setIsAddDialogOpen(true);
  };

  // Calculate statistics
  const totalEmployees = mockEmployees.length;
  const activeEmployees = mockEmployees.filter(
    (e) => e.status === "Active"
  ).length;
  const departments = new Set(mockEmployees.map((e) => e.department)).size;
  const totalPayroll = mockEmployees.reduce((sum, e) => sum + e.grossCTC, 0);
  const avgPerformance = Math.round(
    mockEmployees.reduce((sum, e) => sum + (e.progress || 0), 0) /
      mockEmployees.length
  );

  const headerStats = [
    {
      label: "Total Employees",
      value: totalEmployees,
      icon: <Users className="h-4 w-4" />,
      color: "from-primary/80 to-primary/60",
    },
    {
      label: "Active Employees",
      value: activeEmployees,
      icon: <UserCheck className="h-4 w-4" />,
      color: "from-success/80 to-success/60",
    },
    {
      label: "Departments",
      value: departments,
      icon: <Building className="h-4 w-4" />,
      color: "from-warning/80 to-warning/60",
    },
    {
      label: "Avg Performance",
      value: `${avgPerformance}%`,
      icon: <Target className="h-4 w-4" />,
      color: "from-accent/80 to-accent/60",
    },
  ];

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader
        title="Employee Information"
        description="Manage employee data from HRMS and POS systems with advanced filtering, analytics, and comprehensive employee lifecycle management."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "HR Management" },
          { label: "Employees" },
        ]}
        badge="Enhanced"
        stats={headerStats}
        compact={true}
      >
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 hover:bg-primary/10"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download Template</span>
            <span className="sm:hidden">Template</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="gap-2 hover:bg-secondary/80"
          >
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Bulk Upload</span>
            <span className="sm:hidden">Upload</span>
          </Button>
          {/* <Button
            variant="default"
            size="sm"
            className="gap-2 bg-gradient-primary hover:opacity-90 shadow-lg"
            onClick={handleAdd}
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Employee</span>
            <span className="sm:hidden">Add</span>
          </Button> */}
        </div>
      </PageHeader>

      {/* Enhanced Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <DataTable
          data={mockEmployees}
          columns={columns}
          filters={filters}
          searchPlaceholder="Search by Employee ID, Name, Email, Department..."
          onAdd={handleAdd}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          addButtonText="Add Employee"
          cardTitleKey="name"
          cardSubtitleKey="designation"
          cardImageKey="empId"
          enableStats={true}
          defaultView="card"
        />
      </motion.div>

      {/* Enhanced Employee Details Dialog */}
      <AnimatePresence>
        {selectedEmployee && !isAddDialogOpen && (
          <Dialog
            open={!!selectedEmployee}
            onOpenChange={() => setSelectedEmployee(null)}
          >
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto border-0 shadow-2xl bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl">
              <DialogHeader className="pb-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16 ring-4 ring-primary/20 shadow-xl">
                    <AvatarImage
                      src={`/placeholder-avatar-${selectedEmployee.empId}.jpg`}
                    />
                    <AvatarFallback className="bg-gradient-primary text-white font-bold text-xl">
                      {selectedEmployee.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                      {selectedEmployee.name}
                    </DialogTitle>
                    <p className="text-lg text-muted-foreground mt-1">
                      {selectedEmployee.designation} •{" "}
                      {selectedEmployee.department}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge
                        variant={
                          selectedEmployee.status === "Active"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          selectedEmployee.status === "Active"
                            ? "bg-gradient-success"
                            : "bg-gradient-warning"
                        }
                      >
                        <Activity className="h-3 w-3 mr-1" />
                        {selectedEmployee.status}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-primary/20 text-primary"
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        Joined {new Date(selectedEmployee.doj).getFullYear()}
                      </Badge>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-muted/30 p-1 rounded-xl">
                  <TabsTrigger value="personal" className="rounded-lg">
                    Personal Info
                  </TabsTrigger>
                  <TabsTrigger value="employment" className="rounded-lg">
                    Employment
                  </TabsTrigger>
                  <TabsTrigger value="salary" className="rounded-lg">
                    Salary Details
                  </TabsTrigger>
                  <TabsTrigger value="performance" className="rounded-lg">
                    Performance
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6 border-0 bg-gradient-to-br from-primary/5 to-primary/10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-gradient-primary">
                          <Users className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-lg">
                          Basic Information
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                            Employee ID
                          </Label>
                          <p className="font-mono text-lg font-semibold mt-1">
                            {selectedEmployee.empId}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                            Full Name
                          </Label>
                          <p className="text-lg font-semibold mt-1">
                            {selectedEmployee.name}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                            Location
                          </Label>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <p className="text-lg">
                              {selectedEmployee.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 border-0 bg-gradient-to-br from-success/5 to-success/10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-gradient-success">
                          <Mail className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-lg">
                          Contact Information
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                            Personal Email
                          </Label>
                          <p className="text-lg mt-1">
                            {selectedEmployee.emailPersonal}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                            JNET Email
                          </Label>
                          <p className="text-lg mt-1">
                            {selectedEmployee.emailJnet}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                            Contact Number
                          </Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <p className="text-lg font-mono">
                              {selectedEmployee.contact}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="employment" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6 border-0 bg-gradient-to-br from-warning/5 to-warning/10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-gradient-warning">
                          <Building className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-lg">
                          Role & Department
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                            Designation
                          </Label>
                          <p className="text-lg font-semibold mt-1">
                            {selectedEmployee.designation}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                            Department
                          </Label>
                          <p className="text-lg mt-1">
                            {selectedEmployee.department}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                            Business Unit
                          </Label>
                          <p className="text-lg mt-1">
                            {selectedEmployee.businessUnit}
                          </p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 border-0 bg-gradient-to-br from-accent/5 to-accent/10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-gradient-secondary">
                          <Award className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-lg">
                          Employment Details
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                            Date of Joining
                          </Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <p className="text-lg">
                              {new Date(
                                selectedEmployee.doj
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                            Employment Type
                          </Label>
                          <p className="text-lg mt-1">
                            {selectedEmployee.employmentType}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                            Reporting Manager
                          </Label>
                          <p className="text-lg mt-1">
                            {selectedEmployee.reportingManager}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="salary" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6 border-0 bg-gradient-to-br from-green-500/5 to-green-500/10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                          <IndianRupee className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-lg">Compensation</h3>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                            Annual CTC
                          </Label>
                          <div className="flex items-center gap-2 mt-2">
                            <IndianRupee className="h-6 w-6 text-green-600" />
                            <p className="text-3xl font-bold text-green-600">
                              {(selectedEmployee.grossCTC / 100000).toFixed(1)}L
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            ₹{selectedEmployee.grossCTC.toLocaleString()} per
                            annum
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                            Variable Pay
                          </Label>
                          <div className="flex items-center gap-2 mt-2">
                            <TrendingUp className="h-5 w-5 text-orange-600" />
                            <p className="text-2xl font-bold text-orange-600">
                              {selectedEmployee.variablePay}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 border-0 bg-gradient-to-br from-blue-500/5 to-blue-500/10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                          <BarChart3 className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-lg">
                          Salary Breakdown
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-sm text-muted-foreground">
                            Base Salary
                          </span>
                          <span className="font-semibold">
                            ₹
                            {Math.round(
                              selectedEmployee.grossCTC * 0.7
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-sm text-muted-foreground">
                            HRA
                          </span>
                          <span className="font-semibold">
                            ₹
                            {Math.round(
                              selectedEmployee.grossCTC * 0.15
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-sm text-muted-foreground">
                            Other Allowances
                          </span>
                          <span className="font-semibold">
                            ₹
                            {Math.round(
                              selectedEmployee.grossCTC * 0.15
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 font-semibold text-lg">
                          <span>Total CTC</span>
                          <span className="text-green-600">
                            ₹{selectedEmployee.grossCTC.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="performance" className="space-y-6 mt-6">
                  <Card className="p-6 border-0 bg-gradient-to-br from-purple-500/5 to-purple-500/10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                        <Target className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg">
                        Performance Overview
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 block">
                          Overall Performance
                        </Label>
                        <div className="relative">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground">
                              Progress
                            </span>
                            <span className="text-sm font-semibold">
                              {selectedEmployee.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3">
                            <motion.div
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full shadow-lg"
                              initial={{ width: 0 }}
                              animate={{
                                width: `${selectedEmployee.progress}%`,
                              }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                        </div>

                        <div className="mt-6 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              Goal Achievement
                            </span>
                            <span className="font-semibold">
                              {Math.round(selectedEmployee.progress * 0.9)}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              Team Rating
                            </span>
                            <span className="font-semibold">
                              {selectedEmployee.progress > 90
                                ? "Excellent"
                                : selectedEmployee.progress > 80
                                  ? "Good"
                                  : selectedEmployee.progress > 70
                                    ? "Average"
                                    : "Needs Improvement"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 block">
                          Key Metrics
                        </Label>
                        <div className="space-y-4">
                          <div className="p-4 rounded-xl bg-muted/30">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                Productivity
                              </span>
                              <span className="text-2xl font-bold text-green-600">
                                {Math.round(selectedEmployee.progress * 1.1)}%
                              </span>
                            </div>
                          </div>
                          <div className="p-4 rounded-xl bg-muted/30">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                Quality Score
                              </span>
                              <span className="text-2xl font-bold text-blue-600">
                                {Math.round(selectedEmployee.progress * 0.95)}%
                              </span>
                            </div>
                          </div>
                          <div className="p-4 rounded-xl bg-muted/30">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                Collaboration
                              </span>
                              <span className="text-2xl font-bold text-purple-600">
                                {Math.round(selectedEmployee.progress * 1.05)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
