import PaintingForm from "@/components/PaintingForm";
export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-semibold p-10 text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
        Painting input
        <PaintingForm />
      </h1>
    </div>
  );
}
