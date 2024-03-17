import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  selectExpand,
  selectIsSearching,
} from "../../store/slices/search/search.slice";
import { RootState } from "../../store/types/store.type";
import { ConnectedProps, connect } from "react-redux";
import { useRegisterUserMutation } from "../../store/api/authentication/authApiSlice";
import { userSchema } from "./schema/UserSchemas";

const RegisterContainer = (props: ConnectorProps) => {
  type ValidationSchema = z.infer<typeof userSchema>;

  const [addUser, { isLoading }] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const response = await addUser(data).unwrap();
    console.log(response);
  };

  if (isLoading) {
    return <div>LOADING NA BOATOSCIIIIIi{props.getIsSearching}</div>;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Registration form
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              margin: "20px 0",
            }}
          >
            <label style={{ textAlign: "center" }}>First name</label>
            <input
              style={{
                width: "20%",
                height: "30px",
                borderRadius: "5px",
                padding: "5px 0",
              }}
              {...register("firstName")}
              placeholder="First Name"
              type="text"
            />
            {errors.firstName && <span>{errors.firstName.message}</span>}
          </div>
          <div>
            <input
              {...register("lastName")}
              placeholder="Last Name"
              type="text"
            />
            {errors.lastName && <span>{errors.lastName.message}</span>}
          </div>
          <div>
            <input {...register("email")} placeholder="Email" type="text" />
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email.message}</span>
            )}
          </div>
          <div>
            <input
              {...register("password")}
              placeholder="Password"
              type="password"
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <button type="submit">Add user</button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  getExpand: selectExpand(state),
  getIsSearching: selectIsSearching(state),
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>;

export default connector(RegisterContainer);
