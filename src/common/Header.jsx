import * as React from "react";
import { Link } from "react-router-dom";
import {
  Blocks,
  House,
  Logs,
  ShoppingCart,
  User,
  UserCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useUser } from "@/context/AuthContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/redux/slice/cart.slice";
import { fetchCartDetails } from "@/redux/actions/cart.action";
import { useEffect } from "react";

const components = [
  {
    title: "Toys",
    href: "/products?category=toys",
    description:
      "You can find Premium quality toys from Gadget Shop and make your collections perfect.",
  },
  {
    title: "Books",
    href: "/products?category=books",
    description: "For Book Lovers, we have every variety of books...",
  },
  {
    title: "Laptops",
    href: "/products?category=laptop",
    description:
      "All types of Latops you can explore and purchase. checkout now",
  },
  {
    title: "Mobile Phones",
    href: "/products?category=mobilePhones",
    description: "I phone Lover or Android lover?.... whatever explore here.",
  },
  {
    title: "Tablets",
    href: "/products?category=tablets",
    description: "Explore the variety of Tablets in Gadget Shop",
  },
  {
    title: "Others",
    href: "/products?category=others",
    description: "Miscellaneous gadgets are there...",
  },
  {
    title: "All",
    href: "/products?category=all",
    description: "Miscellaneous gadgets are there...",
  },
];

function ListItem({ title, children, href, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenication, logout } = useUser();

  const cartData = useSelector((state) => state.cartReducer.data);
  const cart = cartData;
  const items = cart?.cartItem || [];

  useEffect(() => {
    dispatch(fetchCartDetails());
  }, [user]);

  return (
    <>
    {/* responsive update */}

      <div className="sticky top-0 z-[999] flex items-center justify-around p-4 bg-gradient-to-r from-gray-900 to-blue-200">
        {/*  logo */}
        <Link to="/">
          <div className="border-1 p-2 rounded-sm border-purple-300 gap-2 flex text-white ">
            <span>
              {" "}
              <Blocks />
            </span>
            Gadget Shop
          </div>
        </Link>

        <NavigationMenu viewport={false} className="">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="[&>svg]:hidden cursor-pointer">
                <Link to="/">Home</Link>
              </NavigationMenuTrigger>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent className="z-50">
                <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[500px] ">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to="/aboutus">About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem></NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="relative">
                <div className="flex items-center gap-1">
                  Profile
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      {items.length}
                    </span>
                  )}
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent className={` z-50`}>
                <ul className="grid w-[200px] gap-4 ">
                  <li>
                    {isAuthenication ? (
                      <>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/signin"
                            onClick={() => {
                              logout();
                              dispatch(clearCart());
                            }}
                            className="flex-row items-center gap-2 "
                          >
                            <User />
                            Logout
                          </Link>
                        </NavigationMenuLink>

                        <NavigationMenuLink asChild>
                          <Link
                            to="/my-orders"
                            className="flex-row items-center gap-2 "
                          >
                            <Logs />
                            My orders
                          </Link>
                        </NavigationMenuLink>
                      </>
                    ) : (
                      <>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/signin"
                            className="flex-row items-center gap-2 "
                          >
                            <User />
                            SignIn
                          </Link>
                        </NavigationMenuLink>

                        <NavigationMenuLink asChild>
                          <Link
                            to="signup"
                            className="flex-row items-center gap-2"
                          >
                            <UserCheck />
                            SignUp
                          </Link>
                        </NavigationMenuLink>
                      </>
                    )}

                    <NavigationMenuLink asChild>
                      <Link
                        to="/cart"
                        className="flex-row items-center gap-2 relative"
                      >
                        <ShoppingCart />
                        Cart
                        {items.length > 0 && (
                          <span className="absolute -top-0 right-[7rem] bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                            {items.length}
                          </span>
                        )}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {isAuthenication && (
              <>
                <NavigationMenuItem className="rounded-xl py-1 px-2 ml-2 bg-gray-700 text-white">
                  Welcome back, {user}
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
};

export default Header;