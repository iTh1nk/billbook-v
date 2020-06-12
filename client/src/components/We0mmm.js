import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import "./We0mmm.css";
import toaster from "toasted-notes";

function We0mmm() {
  useEffect(() => {
    toaster.notify(
      <div style={{ fontWeight: "bold", color: "#e95421" }}>
        "Cycle 04-09 Bill Statement is READY!”
      </div>,
      {
        duration: null,
      }
    );
  }, []);

  // const imgStyle = {
  //   display: "block",
  //   marginTop: "5em",
  //   marginLeft: "auto",
  //   marginRight: "auto",
  //   width: "18em",
  //   boxShadow: "20px 20px 50px black"
  // };
  const ifWeb = "https://coronavirus.1point3acres.com/#stat";
  // const ifWeb = "https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik";
  const ifWebStyle = {
    width: "18em",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "20px 20px 50px black",
  };
  // const wStyle = {
  //   marginTop: ".8em",
  //   marginBottom: ".8em",
  //   color: "white",
  //   width: "18em",
  //   marginLeft: "auto",
  //   marginRight: "auto",
  //   boxShadow: "20px 20px 50px black",
  // };
  return (
    <>
      <div style={{ width: "12em", marginLeft: "auto", marginRight: "auto" }}>
        <a href="/login/">
          <img
            // style={imgStyle}
            className="img-style"
            src="/favicon.ico"
            // className="App-logo"
            alt="No Logins? No Worries!"
          />
        </a>
      </div>
      {/* <div style={wStyle}></div> */}
      <hr />
      <div style={ifWebStyle}>
        {/* <iframe
            id="inlineFrameExample"
            title="Inline Frame Example"
            width="230"
            height="350"
            src={ifWeb}
          ></iframe> */}
        <iframe
          allow="autoplay *; encrypted-media *;"
          frameborder="0"
          height="150"
          style={{
            width: "100%",
            maxWidth: "660px",
            overflow: "hidden",
            background: "transparent",
          }}
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          src="https://embed.music.apple.com/us/album/mojito/1517801027?i=1517801028"
        ></iframe>
      </div>
    </>
  );
}

export default We0mmm;