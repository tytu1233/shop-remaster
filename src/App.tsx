import { ConnectedProps, connect } from "react-redux";
import { StoreStateType } from "./store/types/store";
import { authenticateUser } from "./store/slices/user/thunks/user.thunks";

type PropsType = object & ConnectorProps;

const App = (props: PropsType) => {
  const a = async () => {
    const call = await fetch("http://localhost:8080/api/v1/demo", {
      headers: {
        Authorization: `Bearer ${props.getToken}`,
      },
    });
    console.log(JSON.stringify(call.body));
  };

  return (
    <>
      <div>
        <p>name: {props.getToken}</p>
        <button onClick={() => props.authenticateUser()}>Change name</button>
        <button onClick={a}>Call secured</button>
      </div>
    </>
  );
};
const mapStateToProps = (state: StoreStateType) => ({
  getToken: state.auth.token,
});

const mapDispatchToProps = {
  authenticateUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>;

export default connector(App);
