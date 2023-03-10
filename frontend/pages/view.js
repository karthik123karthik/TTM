import React from "react";
import Layout from "../components/Layout";
import Image from "next/image";
import Link from "next/link";
import { motion as m } from "framer-motion";

export default function view() {
  return (
    <Layout>
      <m.div
        initial={{ opacity: 0, scale: 0.7}}
        animate={{ opacity: 1, scale: 1}}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-around  mt-12 w-[100%] items-center font-bold mb-3"
      >
        <h1 className="text-2xl font-extrabold">VIEW DETAILS</h1>
        <div className="flex flex-row justify-around w-[90%] mt-3">
          <div className="hover:transform hover:scale-75">
            <h3 className="text-center font-bold mb-3">Lecturer</h3>
            <Link href="/View/Lecturer">
              <Image
                src="/Lecturer.png"
                width={300}
                height={300}
                alt="lecturer image"
              />
            </Link>
          </div>
          <div className="hover:transform hover:scale-75">
            <h3 className="text-center font-bold mb-3">Subjects</h3>
            <Link href="/View/subject">
              <Image
                src="/book.png"
                width={200}
                height={200}
                alt="lecturer image"
              />
            </Link>
          </div>
        </div>
        <div className="hover:transform hover:scale-75">
          <h3 className="text-center font-bold mb-3">classroom</h3>
          <Link href="/View/classroom">
            <Image
              src="/class2.png"
              width={300}
              height={300}
              alt="classromm image"
            />
          </Link>
        </div>
      </m.div>
    </Layout>
  );
}
