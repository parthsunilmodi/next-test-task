import Link from 'next/link';

export default function Home() {
  return (
    <main className="h-screen">
      <div className="flex max-[425px]:flex-col justify-evenly items-center h-full">
        <Link href="core" className="text-[60px] h-[420px] max-w-[500px] shadow-md cursor-pointer flex justify-center items-center w-full h-[20%] max-w-sm p-4 bg-[#ddd] border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 pointer">
          <h1 className="text-white">Core</h1>
        </Link>
        <Link href="filter-section/applications" className="text-[60px] h-[420px] max-w-[500px] shadow-md cursor-pointer flex justify-center items-center w-full h-[20%] max-w-sm p-4 bg-[#ddd] border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <h1 className="text-white">Filter Section</h1>
        </Link>
      </div>
    </main>
  );
}
