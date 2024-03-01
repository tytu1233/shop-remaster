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
            <NavLink to="/test">Test</NavLink>
            <NavLink to="/app">App</NavLink>
          </Navigation>
        </NavigationContainer>
      </Header>
      <main>
        <Outlet />
      </main>
      <div>footer</div>
    </Container>
  );
};

export default RootLayout;
