
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, LightbulbIcon, ThermometerIcon, ShieldIcon, SettingsIcon, MenuIcon, XIcon, LogOutIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

const navItems = [
  { name: "Dashboard", path: "/", icon: <Home className="h-5 w-5" /> },
  { name: "Devices", path: "/devices", icon: <LightbulbIcon className="h-5 w-5" /> },
  { name: "Climate", path: "/climate", icon: <ThermometerIcon className="h-5 w-5" /> },
  { name: "Security", path: "/security", icon: <ShieldIcon className="h-5 w-5" /> },
  { name: "Settings", path: "/settings", icon: <SettingsIcon className="h-5 w-5" /> },
];

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (mobileMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen, isMobile]);

  useEffect(() => {
    if (isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [location.pathname, isMobile]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    toast.success("تم تسجيل الخروج بنجاح");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <>
      {/* Mobile Navigation */}
      {isMobile && (
        <>
          <div className="fixed top-0 left-0 right-0 h-16 bg-background z-40 border-b flex items-center justify-between px-4">
            <div className="flex items-center">
              <span className="font-bold text-xl">Smart Home</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                aria-label="تسجيل الخروج"
              >
                <LogOutIcon size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                aria-label="القائمة"
              >
                {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
              </Button>
            </div>
          </div>
          
          {mobileMenuOpen && (
            <div className="fixed inset-0 bg-background z-30 pt-16">
              <nav className="flex flex-col space-y-1 p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-3 rounded-md px-3 py-4 text-sm font-medium",
                      location.pathname === item.path
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="hidden md:flex h-screen w-64 flex-col border-r bg-sidebar fixed">
          <div className="flex h-16 items-center border-b px-6">
            <h2 className="text-lg font-semibold">Smart Home</h2>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium",
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          <div className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {user.name.charAt(0)}
                </div>
                <span className="ml-2 text-sm font-medium">{user.name}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                aria-label="تسجيل الخروج"
              >
                <LogOutIcon size={20} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
