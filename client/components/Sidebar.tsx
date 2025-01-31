import Link from "next/link";
import { usePathname } from "next/navigation";
import { whiteLogo } from "@public";
import Image from "next/image";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

interface link {
  name: string;
  href: string;
  icon: string;
}
const sidebarLinks: link[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "fas fa-home",
  },
  {
    name: "Challenges & Hackathons",
    href: "/dashboard/challenges&hackathons",
    icon: "fas fa-print",
  },
  {
    name: "Community",
    href: "/dashboard/community",
    icon: "fas fa-user-plus",
  },
];
const sidebarUtilities: link[] = [
  {
    name: "Setting",
    href: "/dashboard/setting",
    icon: "fas fa-sliders",
  },
  {
    name: "Help Center",
    href: "/help-center",
    icon: "fas fa-headphones",
  },
  {
    name: "Make family & friends",
    href: "/dashboard/make-family&friends",
    icon: "fas fa-clipboard",
  },
];

const Sidebar: FC = () => {
  const { user } = useSelector((state: RootState) => state.user); // Accessing user, status, and error

  const pathname = usePathname();

  return (
    <div className="sticky top-0 h-screen left-0 w-full lg:max-w-[19rem] md:max-w-[14rem] max-w-[4rem] bg-primary text-white py-4 px-2 flex flex-col justify-between">
      <div className="w-full mb-4">
        <Image src={whiteLogo} alt="logo" className="h-8 w-auto mb-8" />
        <ul>
          {sidebarLinks.map((item, index) => (
            <Link href={item.href} key={index}>
              <li
                className={`w-full ${
                  pathname === item.href
                    ? "!bg-white text-primary"
                    : pathname.startsWith(item.href) &&
                      index !== 0 &&
                      "!bg-white text-primary"
                } mb-1 py-2 px-3 text-sm rounded-sm flex hover:bg-white/20`}
              >
                <i className={`${item.icon} md:pr-2 max-md:text-xl`}></i>
                <span className=" md:flex flex-col items-start hidden">
                  {item.name}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="w-full mb-4">
        <ul>
          {sidebarUtilities.map((item, index) => (
            <Link href={item.href} key={index}>
              <li
                className={`w-full ${
                  pathname === item.href
                    ? "!bg-white text-primary"
                    : pathname.startsWith(item.href) &&
                      index !== 0 &&
                      "!bg-white text-primary"
                } mb-1 py-2 px-3 text-sm rounded-sm hover:bg-white/20 flex items-center max-md:justify-center`}
              >
                <i
                  className={`${
                    index !== 0 ? item.icon : "hidden"
                  } md:pr-2 max-md:text-xl`}
                ></i>
                {index === 0 && (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="fill-current md:h-[15px] h-[20px] md:pr-2"
                    >
                      <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                    </svg>
                  </>
                )}
                <span className="md:flex flex-col items-start hidden">
                  {item.name}
                </span>
              </li>
            </Link>
          ))}
        </ul>
        <div className="w-full flex items-center gap-2 flex-wrap md:justify-end justify-center">
          {user?.profile?.image ? (
            <Image
              src={user.profile.image} // Use the determined image source
              alt="profile image"
              width={40} // Set appropriate width and height
              height={40}
              className="h-10 !aspect-square rounded-full flex-0 object-cover"
            />
          ) : (
            <i className="fas fa-user p-3 text-primary bg-white/50 rounded-full flex-0"></i>
          )}
          <div className="flex-1 w-full my-auto md:flex flex-col items-start hidden">
            <p className="body-2 font-semibold">{user?.fullName}</p>
            <p className="text-sm leading-none text-white/70">{user?.email}</p>
          </div>
          <div className="md:!w-7 flex-0 flex w-full items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="fill-current h-7 !w-5 flex-0"
            >
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
