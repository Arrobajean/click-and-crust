import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Monograma con los colores de marca: fondo verde bosque y la inicial en ámbar.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c1410",
          color: "#dda03f",
          fontSize: 44,
          fontWeight: 700,
          borderRadius: 14,
        }}
      >
        C
      </div>
    ),
    size,
  );
}
