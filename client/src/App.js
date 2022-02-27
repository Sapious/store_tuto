import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />}></Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
