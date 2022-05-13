const menu = [
  {
    icon: "dashboard-fill",
    text: "Dashboard",
    link: "/index",
  },
  {
    icon: "users-fill",
    text: "Clientes",
    active: false,
    subMenu: [
      {
        text: "Cliente Juridico",
        link: "/juridico",
      },
      {
        text: "Cliente Natural",
        link: "/natural",
      },
    ],
  },
  {
    icon: "user-fill",
    text: "Usuario Administrador",
    link: "/users",
  },
  {
    icon: "calendar-alt-fill",
    text: "Agenda",
    link: "/calendar",
  },
  {
    icon: "user-list-fill",
    text: "Asesores",
    link: "/adviser",
  },
  {
    icon: "swap-alt-fill",
    text: "Operaciones",
    link: "/operation",
  },
  {
    icon: "book-fill",
    text: "Biblioteca de Clientes",
    link: "/customers-library",
  },
  {
    icon: "building-fill",
    text: "Empresas",
    link: "/company",
  },
  {
    icon: "coin-alt-fill",
    text: "Comisiones",
    link: "/commissions",
  },
  {
    icon: "setting-fill",
    text: "Roles",
    link: "/roles",
  },
  {
    icon: "package-fill",
    text: "Productos",
    link: "/products",
  },
];
export default menu;
