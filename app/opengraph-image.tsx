/* eslint-disable @next/next/no-img-element */



import { ImageResponse } from "next/server";

export default async function handler(req, res) {
  const sfPro = await fetch(
    new URL("./fonts/SF-Pro-Display-Medium.otf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  const image = (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        backgroundImage:
          "linear-gradient(to bottom right, #E0E7FF 25%, #ffffff 50%, #CFFAFE 75%)",
      }}
    >
      <img
        src={`https://${process.env.VERCEL_URL || "precedent.dev"}/logo.png`}
        alt="Precedent Logo"
        className="w-20 h-20 mb-4 opacity-95"
      />
      <h1
        style={{
          fontSize: "100px",
          fontFamily: "SF Pro",
          background:
            "linear-gradient(to bottom right, #000000 21.66%, #78716c 86.47%)",
          backgroundClip: "text",
          color: "transparent",
          lineHeight: "5rem",
          letterSpacing: "-0.02em",
        }}
      >
        Jean Daly
      </h1>
    </div>
  );

  const img = new ImageResponse(image, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "SF Pro",
        data: sfPro,
      },
    ],
  });

  img.send(res);
}
