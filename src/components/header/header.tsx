import Image from "next/image";
import Link from "next/link";
import loginIcon from '../../../assets/loginIcon.png'
export default function Header({
  heading,
  paragraph,
  linkName,
  linkUrl = "#",
}: HeaderProps) {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <Image
          alt="Game Logo"
          className="h-14 w-14"
          width={100}
          height={100}
          src={loginIcon}
        />
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600 mt-5">
        {paragraph}{" "}
        <Link
          href={linkUrl}
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
}
