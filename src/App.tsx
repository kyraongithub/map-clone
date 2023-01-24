import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { Provider } from "react-redux";
import { store } from "context/redux";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {routes.map((item: any, key: number) => {
            return (
              <Route key={key} path={item?.path} element={<item.element />} />
            );
          })}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
