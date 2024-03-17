import { NavLink, Outlet } from "react-router-dom";
import {
  Container,
  Header,
  NavigationContainer,
  Logo,
  LogoName,
  Navigation,
  SearchBox,
} from "./style/RootLayoutStyle";
import SearchContainer from "../pages/search/SearchContainer";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <Container>
      <Header>
        <NavigationContainer>
          <Logo>
            <LogoName>Clothing-store</LogoName>
          </Logo>
          <SearchBox>
            <SearchContainer />
          </SearchBox>
          <Navigation>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/cart">Cart</NavLink>
            <NavLink to="/app">App</NavLink>
            <NavLink to="/register">Register</NavLink>
          </Navigation>
        </NavigationContainer>
      </Header>
      <main>
        <Outlet />
      </main>
      <div>footer</div>
      <ToastContainer autoClose={3000} newestOnTop position="bottom-right" />
    </Container>
  );
};

export default RootLayout;
