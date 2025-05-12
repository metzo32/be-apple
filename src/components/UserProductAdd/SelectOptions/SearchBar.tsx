import { IoSearchSharp } from "react-icons/io5";

export default function SearchBar() {
  return (
    <div className="w-[260px] md:w-full xl:w-[500px] flex items-center justify-center gap-5">
      <div className="w-full h-[35px] px-3 border-2 border-custombg rounded-full bg-bglight flex justify-end">
        <button type="button" className="text-primary">
          <IoSearchSharp />
        </button>
      </div>
    </div>
  );
}
