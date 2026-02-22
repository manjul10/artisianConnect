"use client";

import Image from "next/image";
import { Quote } from "lucide-react";

const Testimonial = () => {
  return (
    <div className="w-full bg-[#EFF2F6] py-24">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="relative inline-block">
          {/* Opening Quote */}
          <Quote className="absolute -top-8 -left-12 w-12 h-12 text-[#9dabc0] fill-current opacity-50 transform -scale-x-100" />

          <p className="text-gray-500 text-sm leading-8 tracking-wide px-8">
            He this him it conduct, the suppose their if she is cold wanted
            undertaking, shall must the out <br className="hidden md:block" />
            examples, wanted which would retired taking arranged the
            personalities occasion one of the dense,{" "}
            <br className="hidden md:block" />
            be crew have phase her her. Presented I to for a thoughts day when
            derived
          </p>

          {/* Closing Quote */}
          <Quote className="absolute -bottom-8 -right-12 w-12 h-12 text-[#9dabc0] fill-current opacity-50" />
        </div>

        <div className="mt-12 flex flex-col items-center justify-center space-y-3">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
            <Image
              src="https://picsum.photos/id/64/200/200" // Portrait of Woman
              alt="Mirja Khan"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="text-gray-900 font-bold text-lg">Mirja Khan</h4>
            <p className="text-gray-400 text-xs">Customer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
