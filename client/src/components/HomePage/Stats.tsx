import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersData } from "../../redux/thunk/userThunks";
import { getAllProjects } from "../../redux/thunk/projectThunks";
import { getAllComments } from "../../redux/thunk/commentThunks";
import { RootState } from "../../redux/store";

interface Stat {
  id: number;
  name: string;
  value: string;
}

const Stats: FC = () => {
  const dispatch = useDispatch();
  const [stats, setStats] = useState<Stat[]>([]);

  const users = useSelector((state: RootState) => state.user);
  const projects = useSelector((state: RootState) => state.project);
  const comments = useSelector((state: RootState) => state.comment);

  useEffect(() => {
    dispatch(fetchUsersData());
    dispatch(getAllProjects());
    dispatch(getAllComments());
  }, [dispatch]);

  useEffect(() => {
    if (users.data?.data?.users && projects.data && comments.data) {
      setStats([
        {
          id: 1,
          name: "Users",
          value: users.data.data.users.length.toString(),
        },
        { id: 2, name: "Projects", value: projects.data.length.toString() },
        { id: 3, name: "Comments", value: comments.data.length.toString() },
      ]);
    }
  }, [users, projects, comments]);

  return (
    <section className="bg-thirdColor py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col">
              <dt className="text-lg font-medium leading-6 text-gray-900">
                {stat.name}
              </dt>
              <dd className="mt-2 text-5xl font-extrabold text-primaryColor">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Stats;
