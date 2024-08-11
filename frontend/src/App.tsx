import { Provider } from "react-redux";
import "./App.css";
import RouteConfig from "./routes/RouteConfig";
import store from "./redux/app/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <RouteConfig />
      </Provider>
    </>
  );
}

export default App;
