import DashboardHeader from "@/components/dashboardHeader/dashboardHeader";
import { user } from "@/constants/apiUrl";
import ProfileModal from "@/modals/profileModal";
import { Session, getServerSession } from "next-auth";
import Link from "next/link";
import sortArrow from "../../../../assets/sortArrow.svg";
import Image from "next/image";
const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const session: Session | null = await getServerSession();

  const res = await fetch(`${user}/${session?.user?.email}`);
  const resData = (await res.json()) as UserResponseData;

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-screen px-3 md:px-8 mt-3 md:mt-5 flex flex-row">
        <DashboardHeader headerMessage={resData?.data?.name} />
        <div className="ms-auto">
          <ProfileModal
            userName={session?.user?.name}
            userId={resData.data._id}
          />
        </div>
      </div>
      <div className="h-full w-[100vw] flex items-center justify-center">
        <div className="relative overflow-x-auto shadow-md rounded-2xl">
          <table className="h-[40rem] w-[95%] md:w-[80%] lg:w-[70%] 2xl:w-[50%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <div className="flex gap-1 items-center">
                    Player Name
                    <Link href="#">
                      <Image
                        src={sortArrow}
                        width={14}
                        height={14}
                        alt="Sorting Arrow"
                      />
                    </Link>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex gap-1 items-center">Result</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex gap-1 items-center">
                    Date
                    <Link href="#">
                      <Image
                        src={sortArrow}
                        width={14}
                        height={14}
                        alt="Sorting Arrow"
                      />
                    </Link>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">White</td>
                <td className="px-6 py-4">Laptop PC</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4">Black</td>
                <td className="px-6 py-4">Accessories</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
