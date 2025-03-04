export type TypeRole = {
  id: string;
  name: "CASHIER" | "ADMIN";
};

export type TypeUser = {
  id: string;
  roleId: string;
  email: string;
  password: string;
  role: TypeRole;
};
