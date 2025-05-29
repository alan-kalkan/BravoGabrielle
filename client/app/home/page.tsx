import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 style={{ backgroundColor: "red", width: "fit-content", margin: "0 auto" }}>Home</h1>
      <Link href="/booking"> <h1 style={{ color: "red", fontSize: "100px", textDecoration: "underline" }}>Booking</h1></Link>
      <Link href="/aboutMe"> <h1 style={{ color: "red", fontSize: "100px", textDecoration: "underline" }}>About Me</h1></Link>
      <Link href="/gallery"> <h1 style={{ color: "red", fontSize: "100px", textDecoration: "underline" }}>Gallery</h1></Link>
      <Link href="/shop"> <h1 style={{ color: "red", fontSize: "100px", textDecoration: "underline" }}>Shop</h1></Link>
      {/* <Image src="/bg/background.jpeg" alt="background" width={1000} height={1000} style={{ position: "absolute", top: 0, left: 0, minWidth: "100%", minHeight: "100%", objectFit: "cover" }} /> */}
    </div>
  )
}