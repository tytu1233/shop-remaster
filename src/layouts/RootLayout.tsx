import { NavLink, Outlet } from "react-router-dom";
import {
  Container,
  Header,
  NavigationContainer,
  Logo,
  LogoName,
  Navigation,
  SearchBox,
} from "./components/RootLayoutComponents";

const RootLayout = () => {
  return (
    <Container>
      <Header>
        <NavigationContainer>
          <Logo>
            <LogoName>Clothing-store</LogoName>
          </Logo>
          <SearchBox>
            <input type="text" />
          </SearchBox>
          <Navigation>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/test">Test</NavLink>
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
