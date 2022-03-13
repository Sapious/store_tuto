import { useEffect } from "react";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Search from "./pages/Search";
import Categories from "./pages/categories";
import { setAuthToken } from "./utils/setAuthToken";
import { authcheck, logout } from "./actions/auth.actions";
function App() {
	useEffect(() => {
		// check for token in LS when app first runs
		if (localStorage.token) {
			// if there is a token set axios headers for all requests
			setAuthToken(localStorage.token);
		}
		// try to fetch a user, if no token or invalid token we
		// will get a 401 response from our API
		store.dispatch(authcheck());

		// log user out from all tabs if they log out in one tab
		window.addEventListener("storage", () => {
			if (!localStorage.token) store.dispatch(logout());
		});
	}, []);
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
							<Route path="/search" element={<Search />}></Route>
							<Route path="/categories" element={<Categories />}></Route>
							<Route path="/products/:slug" element={<ProductDetails />} />
						</Routes>
					</div>
					<Footer />
				</div>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
