import { ConnectedProps, connect } from "react-redux";
import { RootState } from "./store/types/store";
import {
  selectAccessToken,
  setToken,
  signOut,
} from "./store/slices/user/user.slice";
import { useSignInMutation } from "./store/api/authentication/authApiSlice";

type PropsType = object & ConnectorProps;

const App = (props: PropsType) => {
  const [signIn, { isError, isLoading: elo, isSuccess }] = useSignInMutation();

  const a = async () => {
    const user = {
      email: "tytu@gmail.com",
      password: "Komputer12.",
    };

    const authenticationData = await signIn(user).unwrap();
    console.log(authenticationData);
    props.setToken(authenticationData);
  };

  return (
    <>
      <div>
        <p>Success: {isSuccess}</p>
        <p>Error: {isError}</p>
        <p>isLoading: {elo}</p>
        <p>name: {props.getToken}</p>
        <button onClick={a}>Call authentication</button>
      </div>
    </>
  );
};
const mapStateToProps = (state: RootState) => ({
  getToken: selectAccessToken(state),
});

const mapDispatchToProps = {
  setToken,
  signOut,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>;

export default connector(App);
