const Home = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold p-10 text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
        Wellcome To Gallery Input Page
      </h1>
      click here to start Producing
      <Button>
        <Link href="/home">Painting</Link>
      </Button>
    </div>
  );
};

export default Home;
