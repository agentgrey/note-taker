import { Home } from "@mui/icons-material";
import Link from "next/link";



const Breadcrumbs = ({ links }: any) => {
  return (
    <div className="py-2 flex md:gap-4 gap-1 items-center tracking-wide flex-wrap">
      <Link href="/">
        <span className="md:px-4 px-2 py-1 bg-slate-50 shadow-sm rounded-full hover:shadow-lg md:text-sm text-xs font-medium text-gray-600 cursor-pointer transition-all ease-in-out duration-300">
          <Home className="!text-theme" fontSize="small" /> Home
        </span>
      </Link>
      {links?.map((item: any) => (
        <div key={item?.id} className="flex md:gap-4 gap-1 items-center">
          <span className='text-black'>/</span>
          <Link href={item?.link}>
            <span className="px-4 py-1 cursor-pointer shadow-sm bg-slate-50 rounded-full md:text-sm text-xs font-medium text-gray-600 hover:shadow-lg transition-all ease-in-out duration-300">
              {item?.page}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;