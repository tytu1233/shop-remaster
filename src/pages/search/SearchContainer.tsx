import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../store/types/store";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import {
  openSearchBox,
  closeSearchBox,
  selectExpand,
} from "../../store/slices/search/search.slice";
import { CloseOutlined } from "@ant-design/icons";

type PropsType = object & ConnectorProps;

const SearchBox = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: black;
`;

const ExpandedDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const SearchContainer = (props: PropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        inputRef?.current?.blur();
        props.closeSearchBox();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    <>
      <input
        type="text"
        ref={inputRef}
        onFocus={() => {
          props.openSearchBox();
        }}
      />

      {props.getExpand && (
        <SearchBox>
          <ExpandedDiv>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <p>Clothing-store</p>
              <input type="text" />
              <CloseOutlined
                onClick={() => props.closeSearchBox()}
                style={{ fontSize: "50px" }}
              />
            </div>
            <div
              style={{
                display: "flex",
              }}
            >
              <p>{String(props.getExpand)}</p>
            </div>
          </ExpandedDiv>
        </SearchBox>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  getExpand: selectExpand(state),
});

const mapDispatchToProps = {
  openSearchBox,
  closeSearchBox,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>;

export default connector(SearchContainer);
