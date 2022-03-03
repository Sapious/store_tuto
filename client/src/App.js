import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className="flex flex-col align-center h-screen ">
					<Header />
					<div className="max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8">
						<Routes>
							<Route path="/login" element={<Login />}></Route>
							<Route path="/register" element={<Register />}></Route>
							<Route path="/" element={<Home />}></Route>
						</Routes>
					</div>
					<Footer />
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
