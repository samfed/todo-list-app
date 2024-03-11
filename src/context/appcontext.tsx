import { createContext } from "react";

const data = [
  {
    key: "1",
    title: "Buy milk",
    description: "1 litre from AH",
  },
  {
    key: "2",
    title: "call rohit",
    description: "to discuss new idea",
  },
  {
    key: "3",
    title: "transfer money to home",
    description: "for electricity bill payment",
  },
];
const AppContext = createContext(data);

export default AppContext;
