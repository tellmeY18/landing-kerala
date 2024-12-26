import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div></div>
          <div className="w-full md:w-1/2 flex flex-col items-end text-right">
            <Image
              src="/keralacare-banner-logo.svg"
              alt="Kerala Care Logo"
              width={168}
              height={46}
            />
            <div className="text-sm text-gray-50 mt-6">
              {
                "KeralaCare is developed for the community in collaboration with the Open Healthcare Network — & — the Govt. of Kerala"
              }
            </div>
            <div className="text-sm text-gray-50 mt-6 font-semibold">
              Developed and Maintained by the people of Kerala
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
