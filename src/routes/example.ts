import { exampleController } from "../controllers";

export default {
  path: "/",
  method: "get",
  action: exampleController.example,
};
