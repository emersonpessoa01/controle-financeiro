import React from "react";

export default function Spinner() {
  const { flexRow, span } = styles;
  return (
    <div style={flexRow}>
      <div className="preloader-wrapper small active">
        <div className="spinner-layer spinner-green-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      <span style={span}>Aguarde...</span>
    </div>
  );
}

const styles = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  span: {
    marginLeft: "10px",
    fontSize: "1.2rem",
  },
};
