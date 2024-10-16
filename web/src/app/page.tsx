import Link from "next/link";

const Home = () => {
  return (
    <div
      className="w-full bg-center bg-cover h-[38rem]"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80')",
      }}>
      <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-white lg:text-4xl">
            Build your new <span className="text-[#c9802c]">Gallery</span> Now!
          </h1>
          <button className="w-full px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-[#a5743c] rounded-md lg:w-auto hover:bg-[#533c21] focus:outline-none focus:bg-[#a5743c]">
            <Link href="/home" />
            <p>Let&lsquo;s start it</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
