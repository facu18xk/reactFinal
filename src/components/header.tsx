import { Icons } from "@/components/icons";
import { useAuth } from "@/features/auth/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const Header = () => {

  

  const user = JSON.parse(localStorage.getItem('user') || '{}');


  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="w-full px-2 md:px-10 xl:px-26 py-4 bg-background border-b flex items-center justify-between">
      <div className="flex gap-x-8 items-center">
        <div className="flex gap-x-2">
            <Icons.logo />
            <span className="tracking-tighter font-semibold hidden sm:block">FIUNI Mini ERP</span>
        </div>
        <nav className="flex gap-x-4">
            <Link to="/customers" className="text-sm font-medium text-muted-foreground hover:text-primary">Customers</Link>
            <Link to="/products" className="text-sm font-medium text-muted-foreground hover:text-primary">Products</Link>
        </nav>
      </div>

      <div className="flex gap-x-6 items-center">
        <Avatar>
          <AvatarImage src="https://avatar.iran.liara.run/public/20" />
          <AvatarFallback></AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <span className="text-sm">{user.full_name}</span>
          <span className="text-sm text-muted-foreground">{user.email}</span>
        </div>
        
        <Button variant={"outline"} size={"sm"} onClick={handleLogout}>
          <Icons.logOut />
          Salir
        </Button>
      </div>
    </header>
  );
};

export default Header;
