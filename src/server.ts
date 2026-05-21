import app from "./app";

const main = () => {
  app.listen("5000", () => {
    console.log("DevPulse listening on port 5000");
  });
};
main()
