import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/home">      <h1 style={{ color: "red", fontSize: "100px", textDecoration: "underline" }}>Hello chouchou, ici screamer dacceuil - clique sur moi</h1>
      </Link>
      <Link href="/booking"> <h1 style={{ color: "red", fontSize: "100px", textDecoration: "underline" }}>Booking</h1></Link>
      <Image src="/numero.png" alt="Logo" width={1000} height={1000} />
    </>
  )
}
