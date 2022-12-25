import React from "react";
import Layout from "../components/Layout";
import Image from "next/image";
import Link from "next/link"

export default function view() {
  return (
    <Layout>
      <div className="flex flex-col justify-around  w-[100%] items-center font-bold mb-3">
        <div className="flex flex-row justify-around w-[90%] mt-3">
          <div className="hover:transform hover:scale-110">
            <h3 className="text-center font-bold mb-3">Lecturer</h3>
            <Link href="/View/teacher"><Image
              src="/Lecturer.png"
              width={300}
              height={300}
              alt="lecturer image"
            />
            </Link>
          </div>
          <div className="hover:transform hover:scale-110">
            <h3 className="text-center font-bold mb-3">Subjects</h3>
            <Link href="/View/subject"><Image
              src="/book.png"
              width={200}
              height={200}
              alt="lecturer image"
            />
            </Link>
          </div>
        </div>
        <div className="hover:transform hover:scale-110">
          <h3 className="text-center font-bold mb-3">classroom</h3>
          <Link href="/View/classroom"><Image
            src="/Class.png"
            width={500}
            height={500}
            alt="classromm image"
          />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
