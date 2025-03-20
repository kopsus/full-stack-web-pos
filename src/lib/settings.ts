type RouteAccessMap = {
  [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
  "/category": ["admin", "cashier"],
  "/dashboard": ["admin", "cashier"],
  "/history": ["admin", "cashier"],
  "/payment": ["admin"],
  "/product": ["admin", "cashier"],
  "/shift": ["cashier"],
  "/topping": ["admin", "cashier"],
  "/user": ["admin"],
  "/voucher": ["admin", "cashier"],
};
