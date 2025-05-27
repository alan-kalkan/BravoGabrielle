import Image from "next/image";

export default function Home() {
  return (
    <>
      <h1 style={{ color: "red", fontSize: "100px", textDecoration: "underline" }}>Hello chouchou</h1>
      <Image src="/numero.png" alt="Logo" width={1000} height={1000} />
    </>
  )
}
