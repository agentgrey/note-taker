import { DEFAULTIMG } from "../assets/home";

type PhotoViewerProps = {
  photo?: string;
  name?: string;
  size?: string;
  className?: string;
};

const PhotoViewer: React.FC<PhotoViewerProps> = ({ photo, name = "Credore", size, className }) => {
  return (
    <div
      style={{
        height: size ? size : "6rem",
        width: size ? size : "6rem",
      }}
      className={`${className || ""} rounded-full overflow-hidden shadow-xl`}
    >
      {photo ? (
        <div className="bg-slate-200 h-full w-full">
          <img
            className="h-full w-full object-cover"
            src={photo || DEFAULTIMG.src}
            alt="image"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="h-full w-full uppercase flex justify-center items-center text-4xl font-bold text-white bg-gradient-to-br from-blue-700 via-blue-200 to-blue-700">
          {name?.charAt(0)}
        </div>
      )}
    </div>
  );
};

export default PhotoViewer;