import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../store/types/store";
import { selectAccessToken } from "../../store/slices/user/user.slice";
import Slider from "react-slick";

type PropsType = object & ConnectorProps;

const MainContainer = (props: PropsType) => {
  const settings = {
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
      style={{
        margin: "auto 5%",
        padding: "5px",
      }}
    >
      <Slider {...settings}>
        <div>
          <img
            style={{
              width: "100%",
              height: "500px",
            }}
            src="https://img.pakamera.net/i1/1/379/obrazy-i-plakaty-12320957_6788571379.jpg"
          />
          <h3>1{props.getToken}</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
};
const mapStateToProps = (state: RootState) => ({
  getToken: selectAccessToken(state),
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>;

export default connector(MainContainer);
