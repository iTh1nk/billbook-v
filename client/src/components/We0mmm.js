/*
 * Created(Part) on Mon Jul 13 2020
 *
 * Copyright (c) 2020 We0mmm
 */

import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import "./We0mmm.css";
import toaster from "toasted-notes";

function We0mmm() {
  useEffect(() => {
    toaster.notify(
      <div style={{ fontWeight: "bold", color: "#e95421" }}>
        {/* "Cycle 07-09 Bill Statement is READY!” */}
        New statement will be available soon...
      </div>,
      {
        duration: null,
      }
    );
  }, []);

  const ifWeb = "https://coronavirus.1point3acres.com/#stat";
  // const ifWeb = "https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik";
  const ifWebStyle = {
    width: "18em",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "20px 20px 50px black",
  };
  return (
    <>
      <div style={{ width: "12em", marginLeft: "auto", marginRight: "auto" }}>
        <a href="/login/">
          <img
            className="img-style"
            src="/favicon.ico"
            alt="No Logins? No Worries!"
          />
        </a>
      </div>
      <hr />
      <div style={ifWebStyle}>
        {/* <iframe
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
        ></iframe> */}
      </div>
      <div
        style={{
          margin: "auto",
          textAlign: "left",
          color: "white",
          backgroundColor: "black",
          width: "18em",
          padding: "1em",
          fontWeight: "bold",
          borderRadius: "1em",
        }}
      >
        <p style={{ textAlign: "" }}>
          New version of Billbook(web) is coming out...
        </p>
        <p style={{ textAlign: "", textDecoration: "underline" }}>
          <a
            href="https://billbook-v2.vercel.app/"
            style={{ color: "lightgreen" }}
          >
            Take a peek
            <img
              src="/eye.png"
              alt="eye"
              className="App-logo"
              style={{ width: "1.5em", height: "1.5em", marginLeft: "1em" }}
            />
          </a>
        </p>
      </div>
    </>
  );
}

export default We0mmm;
