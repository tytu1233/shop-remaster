import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../store/types/store.type";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import {
  openSearchBox,
  closeSearchBox,
  selectExpand,
  selectIsSearching,
  startSearching,
  stopSearching,
} from "../../store/slices/search/search.slice";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";

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

const SearchInput = styled.input`
  padding-left: 48px;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  outline: none;
  font-size: 16px;
  border: 1px solid transparent;

  &:focus {
    border-color: rgba(0, 0, 0, 0.3);
  }
`;

interface Props {
  o?: {
    isSearching: boolean;
  };
}

const SearchContainera = styled.div<Props>`
  position: relative;
  width: ${(props) => (props.o?.isSearching ? 70 : 30)}%;
  height: 48px;
  background: #f2f2f2;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;

  @media only screen and (max-width: 768px) {
    width: 90%;
    order: 3;
  }
`;

const IconButton = styled.button`
  position: relative;
  height: 36px;
  width: 36px;
  border: none;
  z-index: 1;
  cursor: pointer;
  background: none;
  outline: none !important;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    background: none;
    border: none;
    left: 0;
    height: 100%;
    border-radius: 50%;
    z-index: -1;
    background: #000;
    transition: 0.2 ease;
    transform: scale(0.6);
    opacity: 0;
  }

  &:hover {
    background: none;
    border: none;
    &::after {
      background: none;
      border: none;
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const SearchContainer = (props: ConnectorProps) => {
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
                flexWrap: "wrap",
              }}
            >
              <p>Clothing-store</p>
              <SearchContainera
                o={{
                  isSearching: props.getIsSearching,
                }}
              >
                <IconButton>
                  <SearchOutlined
                    style={{
                      fontSize: "20px",
                    }}
                  />
                </IconButton>
                <SearchInput
                  onFocus={() => props.startSearching()}
                  onBlur={() => props.stopSearching()}
                />
              </SearchContainera>
              <CloseOutlined
                onClick={() => props.closeSearchBox()}
                style={{ fontSize: "40px" }}
              />
            </div>
            <div
              style={{
                display: "flex",
              }}
            ></div>
          </ExpandedDiv>
        </SearchBox>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  getExpand: selectExpand(state),
  getIsSearching: selectIsSearching(state),
});

const mapDispatchToProps = {
  openSearchBox,
  closeSearchBox,
  startSearching,
  stopSearching,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>;

export default connector(SearchContainer);
