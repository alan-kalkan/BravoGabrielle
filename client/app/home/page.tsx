import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 style={{ backgroundColor: "red", width: "fit-content", margin: "0 auto" }}>Home</h1>
      <Link href="/booking"> <h1 style={{ color: "red", fontSize: "100px", textDecoration: "underline" }}>Booking</h1></Link>
      <Link href="/aboutMe"> <h1 style={{ color: "red", fontSize: "100px", textDecoration: "underline" }}>About Me</h1></Link>
      <Link href="/gallery"> <h1 style={{ color: "red", fontSize: "100px", textDecoration: "underline" }}>Gallery</h1></Link>
      <Link href="/shop"> <h1 style={{ color: "red", fontSize: "100px", textDecoration: "underline" }}>Shop</h1></Link>
    </div>
  )
}