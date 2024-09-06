
import Dashboard from "../pages/Dashboard"
export default function Home() {
  return (
    <div className=' p-10 flex flex-col bg-neutral-300'>
        <h1 className="text-4xl mb-10 text-center text-white">Dashboard of charts</h1>
        <div className="mb-20 ml-40 text-center">
      <Dashboard />
      </div>
    </div>
  );
}
