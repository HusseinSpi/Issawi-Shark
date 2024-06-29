import { FC, useEffect, useState } from "react";
import { userData } from "../../api/users";

interface User {
  userName: string;
  role: string;
  photo: string;
}

const OurTeam: FC = () => {
  const [people, setPeople] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await userData();
        const usersList = users.data.users
          .filter((user: User) => user.role === "investor")
          .map((user: User) => ({
            userName: user.userName,
            role: user.role,
            photo: user.photo,
          }));
        setPeople(usersList);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet our leadership
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae
            elementum enim vitae ullamcorper suspendisse.
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {people.map((person) => (
            <li key={person.userName}>
              <div className="flex items-center gap-x-6">
                <img
                  className="h-16 w-16 rounded-full"
                  src={person.photo}
                  alt={person.userName}
                />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-primaryColor">
                    {person.userName}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-secondaryColor">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OurTeam;
