// components/Footer.tsx
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
// import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0063A4] text-white relative">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + Description */}
        <div>
          <div className="flex items-center gap-2">
            {/* <Image src="/logo.svg" alt="StackJunior" width={30} height={30} /> */}
            <Link href={"/"}><h2 className="text-xl font-bold"><span className="text-white">
             JP Elite<span className="text-[#FF0B80]"> Virtual Solution</span>
          </span></h2></Link>
          </div>
          <p className="mt-4 text-sm">
            Is an ed-tech platform that trains inquisitive learners the concepts of virtual assistant  and other tech skills
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            
            <li><Link href="/about">About JP</Link></li>
            <li><Link href="#">Courses</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Send Feedback</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-semibold mb-2">Socials</h4>
          <div className="flex gap-4 text-xl">
            <FaFacebookF className="cursor-pointer hover:text-[#FF0B80] duration-500 transition"/>
            <FaTwitter className="cursor-pointer hover:text-[#FF0B80] duration-500 transition" />
            <FaInstagram className="cursor-pointer hover:text-[#FF0B80] duration-500 transition" />
            <FaYoutube className="cursor-pointer hover:text-[#FF0B80] duration-500 transition" />
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-2">Contact Us</h4>
          <p className="text-sm">+234 xxx xxx xxxx</p>
          <p className="text-sm mt-1">+234 xxx xxx xxxx</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#00426D] py-4 text-center text-sm">
  &copy;{new Date().toLocaleString("default", { month: "long", year: "numeric" })} -{" "}
  <span className="text-white">
    JP Elite<span className="text-[#FF0B80]"> Virtual Solution</span>
  </span>. All Rights Reserved.
</div>


     
    </footer>
  );
}
